import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);


export interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  unit: string; 
  is_available: boolean;
  updated_at: string;
}

export interface LPGSize {
  id: string;
  size_kg: number; 
  price: number;
  is_available: boolean;
  updated_at: string;
}

export interface Order {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  client_type: "individual" | "business";
  message?: string;
  order_type: "contact" | "lpg_order";
  order_details?: {
    size_kg?: number;
    quantity?: number;
    total_price?: number;
  };
  status: "pending" | "contacted" | "completed";
  created_at: string;
}


export const defaultProducts: Omit<Product, "id" | "updated_at">[] = [
  {
    name: "Premium Motor Spirit (PMS)",
    code: "PMS",
    price: 650,
    unit: "litre",
    is_available: true,
  },
  {
    name: "Automotive Gas Oil (AGO)",
    code: "AGO",
    price: 1200,
    unit: "litre",
    is_available: true,
  },
  {
    name: "Dual Purpose Kerosene (DPK)",
    code: "DPK",
    price: 1100,
    unit: "litre",
    is_available: true,
  },
  {
    name: "Liquefied Petroleum Gas (LPG)",
    code: "LPG",
    price: 1100,
    unit: "kg",
    is_available: true,
  },
];

export const defaultLPGSizes: Omit<LPGSize, "id" | "updated_at">[] = [
  { size_kg: 6, price: 6600, is_available: true },
  { size_kg: 12.5, price: 13750, is_available: true },
  { size_kg: 25, price: 27500, is_available: true },
  { size_kg: 50, price: 55000, is_available: true },
];
