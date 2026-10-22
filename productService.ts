import {
  deleteDoc,
  doc,
  getDocs,
  collection,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { products as seedProducts } from "./products";
import type { Product, ProductCategory } from "./types";

const PRODUCT_COLLECTION = "products";

const allowedCategories: ProductCategory[] = [
  "IEMs",
  "Wireless",
  "Cables",
  "Ear tips",
  "Cases",
  "DACs",
];

function cleanText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function cleanNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function productFromData(id: string, data: Record<string, unknown>): Product {
  const category = cleanText(data.category);
  const stockQuantity = Math.max(0, Math.trunc(cleanNumber(data.stockQuantity)));
  const imageUrl = cleanText(data.imageUrl);
  const imageUrls = Array.isArray(data.imageUrls)
    ? data.imageUrls.map((url) => cleanText(url)).filter(Boolean).slice(0, 8)
    : [];

  return {
    id,
    slug: cleanText(data.slug, id),
    name: cleanText(data.name, "Untitled product"),
    category: allowedCategories.includes(category as ProductCategory)
      ? (category as ProductCategory)
      : "IEMs",
    price: Math.max(0, cleanNumber(data.price)),
    image: cleanText(data.image, "KZ").slice(0, 4).toUpperCase(),
    imageUrl,
    imageUrls: imageUrls.length > 0 ? imageUrls : imageUrl ? [imageUrl] : [],
    description: cleanText(data.description),
    specs: Array.isArray(data.specs)
      ? data.specs.map((spec) => cleanText(spec)).filter(Boolean).slice(0, 8)
      : [],
    inStock: stockQuantity > 0,
    stockQuantity,
    lowStockThreshold: Math.max(0, Math.trunc(cleanNumber(data.lowStockThreshold, 3))),
    isActive: typeof data.isActive === "boolean" ? data.isActive : true,
    featured: typeof data.featured === "boolean" ? data.featured : false,
  };
}

function productToFirestore(product: Product) {
  const stockQuantity = Math.max(0, Math.trunc(product.stockQuantity));

  return {
    slug: product.slug.trim(),
    name: product.name.trim(),
    category: product.category,
    price: Math.max(0, Number(product.price)),
    image: product.image.trim().slice(0, 4).toUpperCase(),
    imageUrl: product.imageUrl.trim(),
    imageUrls: product.imageUrls.map((url) => url.trim()).filter(Boolean).slice(0, 8),
    description: product.description.trim(),
    specs: product.specs.map((spec) => spec.trim()).filter(Boolean).slice(0, 8),
    inStock: stockQuantity > 0,
    stockQuantity,
    lowStockThreshold: Math.max(0, Math.trunc(product.lowStockThreshold)),
    isActive: product.isActive,
    featured: product.featured,
    updatedAt: serverTimestamp(),
  };
}

export async function getPublicProducts(): Promise<Product[]> {
  if (!db) {
    return seedProducts.filter((product) => product.isActive);
  }

  const snapshot = await getDocs(
    query(collection(db, PRODUCT_COLLECTION), where("isActive", "==", true)),
  );
  const liveProducts = snapshot.docs
    .map((productDoc) => productFromData(productDoc.id, productDoc.data()))
    .filter((product) => product.isActive);

  return liveProducts.length > 0 ? liveProducts : seedProducts;
}

export async function getAdminProducts(): Promise<Product[]> {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const snapshot = await getDocs(collection(db, PRODUCT_COLLECTION));
  return snapshot.docs.map((productDoc) =>
    productFromData(productDoc.id, productDoc.data()),
  );
}

export async function saveProduct(product: Product): Promise<void> {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const productId = product.id || product.slug;
  await setDoc(
    doc(db, PRODUCT_COLLECTION, productId),
    {
      ...productToFirestore(product),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function deleteProduct(productId: string): Promise<void> {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  await deleteDoc(doc(db, PRODUCT_COLLECTION, productId));
}
