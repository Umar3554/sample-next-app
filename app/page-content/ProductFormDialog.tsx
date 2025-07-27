import { ProductForm } from "@/components/ProductForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductFormDialogProps } from "@/lib/types";

export const ProductFormDialog = ({
    isOpen,
    setIsOpen,
    currentProduct,
    onSubmit,
    onCancel
}: ProductFormDialogProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
            className="max-w-2xl card-gradient backdrop-blur-sm text-card-foreground border border-border/50 p-6 rounded-xl space-y-4"
        >
            <DialogHeader>
                <DialogTitle>
                    {currentProduct ? 'Edit Product' : 'Create New Product'}
                </DialogTitle>
            </DialogHeader>
            <ProductForm
                product={currentProduct || undefined}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </DialogContent>
    </Dialog>
);