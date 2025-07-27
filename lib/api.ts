// lib/api.ts
import { Product } from "./types";

const API_BASE = "https://dummyjson.com";

export async function getProducts(
  limit: number = 20,
  skip: number = 0
): Promise<{ products: Product[]; total: number }> {
  const res = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createProduct(
  product: Omit<Product, "id">
): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateProduct(
  id: number,
  product: Partial<Product>
): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
}
