import { Button } from "@/components/ui/button";
import { EmptyStateProps } from "@/lib/types";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export const EmptyState = ({ searchTerm, onCreate }: EmptyStateProps) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 rounded-lg border border-dashed border-border"
    >
        <h2 className="text-2xl font-semibold text-foreground dark:text-foreground mb-2">
            {searchTerm ? 'No matches found' : 'No products yet'}
        </h2>
        <p className="text-muted-foreground dark:text-muted-foreground mb-6">
            {searchTerm
                ? 'Try adjusting your search terms'
                : 'Create your first product to get started'}
        </p>
        {!searchTerm && (
            <Button
                onClick={onCreate}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
            </Button>
        )}
    </motion.div>
);