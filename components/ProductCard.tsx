// components/ProductCard.tsx
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product, ProductCardProps } from '@/lib/types';
import Image from 'next/image';
import { Pencil, Trash2, Star } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const [isClient, setIsClient] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const discountedPrice = product.price * (1 - product.discountPercentage / 100);

    const neonClass = useMemo(() => {
        const colors = ['neon-shadow-blue', 'neon-shadow-purple', 'neon-shadow-pink'];
        return colors[product.id % colors.length];
    }, [product.id]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Card
                    className={`flex flex-col h-full text-card-foreground border border-border/60 rounded-xl overflow-hidden card-hover card-gradient ${isHovered ? neonClass : ''
                        }`}
                >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-card to-muted">
                        {isClient ? (
                            <>
                                <Image
                                    src={product.thumbnail ?? '/placeholder.png'}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                {product.discountPercentage > 0 && (
                                    <div className="absolute top-2 right-2 bg-gradient-to-br from-red-500 to-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        -{product.discountPercentage}%
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-card/50 animate-pulse" />
                        )}
                    </div>

                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-lg line-clamp-1 font-semibold">
                                {product.title}
                            </CardTitle>
                            <div className="flex flex-col items-end min-w-max">
                                <span className="text-lg font-bold text-primary bg-gradient-to-r from-primary/10 to-transparent px-2 py-1 rounded-lg">
                                    ${discountedPrice.toFixed(2)}
                                </span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-xs text-muted-foreground line-through mt-0.5">
                                        ${product.price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <CardDescription className="line-clamp-2 text-muted-foreground mt-1">
                            {product.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-2 flex-grow">
                        <div className="flex justify-between text-sm text-muted-foreground mb-3">
                            <span className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground px-2.5 py-1 rounded-lg text-xs font-medium">
                                {product.brand}
                            </span>
                            <span className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground px-2.5 py-1 rounded-lg text-xs font-medium">
                                {product.category}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center bg-gradient-to-br from-yellow-500/15 to-amber-400/10 px-2 py-1 rounded-lg">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium ml-1.5">
                                    {product.rating.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-sm bg-gradient-to-br from-muted/20 to-transparent px-2 py-1 rounded-lg">
                                Stock: <span className={product.stock > 10 ? 'text-green-500 font-medium' : 'text-destructive font-medium'}>
                                    {product.stock}
                                </span>
                            </span>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between pt-3 border-t border-border/40">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(product)}
                            className="bg-gradient-to-b from-background to-card hover:to-accent/20 transition-all cursor-pointer"
                        >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="bg-gradient-to-br from-destructive to-red-700 hover:from-red-700 hover:to-destructive transition-all cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
                productTitle={product.title}
                onConfirm={() => onDelete(product.id)}
            />
        </>
    );
}