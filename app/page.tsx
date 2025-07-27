
'use client';

import { useState, useEffect } from 'react';
import { EmptyStateProps, ErrorDisplayProps, Product, ProductFormDialogProps, ProductGridProps, SearchBarProps, ThemeToggleProps } from '@/lib/types';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { ProductForm } from '@/components/ProductForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, Sun, Moon } from 'lucide-react';
import { ProductFormData } from '@/lib/validation';
import { motion } from 'framer-motion';
import { ThemeToggle } from './page-content/ThemeToggle';
import { SearchBar } from './page-content/SearchBar';
import { LoadingSpinner } from './page-content/LoadingSpinner';
import { ErrorDisplay } from './page-content/ErrorDisplay';
import { EmptyState } from './page-content/EmptyState';
import { ProductGrid } from './page-content/ProductGrid';
import { ProductFormDialog } from './page-content/ProductFormDialog';

export default function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme ? (savedTheme as 'light' | 'dark') : systemPrefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: ProductFormData) => {
    try {
      const newProduct = await createProduct(data);
      setProducts([newProduct, ...products]);
      closeForm();
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  const handleUpdate = async (data: ProductFormData) => {
    if (!currentProduct) return;
    try {
      const updatedProduct = await updateProduct(currentProduct.id, data);
      setProducts(products.map(p => p.id === currentProduct.id ? updatedProduct : p));
      closeForm();
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const openCreateForm = () => {
    setCurrentProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const term = searchTerm.toLowerCase();

    return (
      (product.title?.toLowerCase() || '').includes(term) ||
      (product.description?.toLowerCase() || '').includes(term) ||
      (product.brand?.toLowerCase() || '').includes(term) ||
      (product.category?.toLowerCase() || '').includes(term)
    );
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} retry={fetchProducts} />;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Product Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your products efficiently</p>
          </div>

          <div className="flex gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Button
              onClick={openCreateForm}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            onCreate={openCreateForm}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ProductFormDialog
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        currentProduct={currentProduct}
        onSubmit={currentProduct ? handleUpdate : handleCreate}
        onCancel={closeForm}
      />
    </div>
  );
}