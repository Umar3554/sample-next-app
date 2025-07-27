import { ProductCard } from "@/components/ProductCard";
import { ProductGridProps } from "@/lib/types";
import { motion } from "framer-motion";

export const ProductGrid = ({ products, onEdit, onDelete }: ProductGridProps) => (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
            <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
            >
                <ProductCard
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </motion.div>
        ))}
    </motion.div>
);