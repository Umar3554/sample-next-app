import { ProductFormData } from "./validation";

// lib/types.ts
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail?: string;
  images?: string[];
}

export interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export interface ErrorDisplayProps {
  error: string;
  retry: () => void;
}

export interface EmptyStateProps {
  searchTerm: string;
  onCreate: () => void;
}

export interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export interface ProductFormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentProduct: Product | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

export interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  productTitle: string;
  onConfirm: () => void;
}
