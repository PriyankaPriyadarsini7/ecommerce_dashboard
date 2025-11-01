export interface Product {
  id?: number;
  title: string;
  description?: string;
  price: number;
  stock?: number;
  category?: string;
  thumbnail?: string;
  rating?: number;
  images?: string[];

  // offline metadata
  __localId?: string;
  __synced?: boolean;
  __pendingOp?: "add" | "update" | "delete" | null;
}
