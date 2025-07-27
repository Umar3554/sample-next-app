// lib/validation.ts
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  price: z.number().min(0, "Price must be positive"),
  discountPercentage: z.number().min(0).max(100),
  rating: z.number().min(0).max(5),
  stock: z.number().min(0),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;
