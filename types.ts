export type ProductCategory =
  | "IEMs"
  | "Wireless"
  | "Cables"
  | "Ear tips"
  | "Cases"
  | "DACs";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  imageUrl: string;
  imageUrls: string[];
  description: string;
  specs: string[];
  inStock: boolean;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  featured: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = "new" | "confirmed" | "fulfilled" | "cancelled";

export type OrderInquiryInput = {
  customerName: string;
  contact: string;
  address: string;
  notes: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
};

export type AdminOrder = OrderInquiryInput & {
  id: string;
  status: OrderStatus;
  createdAt: Date | null;
};
