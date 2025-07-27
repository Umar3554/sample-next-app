// components/DeleteConfirmationDialog.tsx
'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { DeleteConfirmationDialogProps } from '@/lib/types';


export function DeleteConfirmationDialog({
    isOpen,
    setIsOpen,
    productTitle,
    onConfirm,
}: DeleteConfirmationDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="card-gradient backdrop-blur-sm border border-border/50 p-6 rounded-xl max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-foreground">
                        Confirm Deletion
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-foreground">
                            {productTitle}
                        </span>
                        ? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm();
                            setIsOpen(false);
                        }}
                        className="bg-gradient-to-br from-destructive to-red-700 hover:from-red-700 hover:to-destructive transition-all"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Product
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}