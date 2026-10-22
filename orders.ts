import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { OrderInquiryInput } from "./types";

const MAX_TEXT_LENGTHS = {
  customerName: 80,
  contact: 120,
  address: 240,
  notes: 500,
};

const MAX_ITEMS = 20;
const MAX_QUANTITY = 10;
const MAX_SUBTOTAL = 100000;

function cleanText(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeOrderInquiry(order: OrderInquiryInput): OrderInquiryInput {
  const items = order.items
    .slice(0, MAX_ITEMS)
    .map((item) => ({
      productId: cleanText(item.productId, 80),
      name: cleanText(item.name, 120),
      quantity: Math.min(Math.max(Math.trunc(item.quantity), 1), MAX_QUANTITY),
      unitPrice: Number(item.unitPrice),
    }))
    .filter(
      (item) =>
        item.productId.length > 0 &&
        item.name.length > 0 &&
        Number.isFinite(item.unitPrice) &&
        item.unitPrice >= 0,
    );

  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0,
  );

  return {
    customerName: cleanText(order.customerName, MAX_TEXT_LENGTHS.customerName),
    contact: cleanText(order.contact, MAX_TEXT_LENGTHS.contact),
    address: cleanText(order.address, MAX_TEXT_LENGTHS.address),
    notes: cleanText(order.notes, MAX_TEXT_LENGTHS.notes),
    items,
    subtotal,
  };
}

function assertValidOrder(order: OrderInquiryInput) {
  if (!order.customerName || !order.contact || !order.address) {
    throw new Error("Please add your name, contact, and delivery city/address.");
  }

  if (order.items.length === 0) {
    throw new Error("Add at least one product before sending an inquiry.");
  }

  if (!Number.isFinite(order.subtotal) || order.subtotal <= 0 || order.subtotal > MAX_SUBTOTAL) {
    throw new Error("The cart total is invalid. Please review your cart and try again.");
  }
}

export async function submitOrderInquiry(
  order: OrderInquiryInput,
): Promise<string> {
  if (!db) {
    throw new Error(
      "Firebase is not configured. Add your Firebase environment variables in Vercel or .env.local.",
    );
  }

  const safeOrder = normalizeOrderInquiry(order);
  assertValidOrder(safeOrder);

  const inquiry = await addDoc(collection(db, "orders"), {
    ...safeOrder,
    status: "new",
    createdAt: serverTimestamp(),
  });

  return inquiry.id;
}
