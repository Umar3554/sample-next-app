// components/ProductForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ProductFormData, productSchema } from '@/lib/validation';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Product } from '@/lib/types';

interface ProductFormProps {
    product?: Product;
    onSubmit: (data: ProductFormData) => void;
    onCancel: () => void;
}

const categories = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting',
];

const brands = [
    'Apple',
    'Samsung',
    'Microsoft',
    'Huawei',
    'Dell',
    'Oppo',
    'Xiaomi',
    'Beats',
    'HP',
    'Lenovo',
    'ASUS',
    'Acer',
    'Sony',
    'Nike',
    'Adidas',
    'Zara',
    'H&M',
    'Rolex',
    'Gucci',
    'Prada',
];

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: product?.title || '',
            description: product?.description || '',
            price: product?.price || 0,
            discountPercentage: product?.discountPercentage || 0,
            rating: product?.rating || 0,
            stock: product?.stock || 0,
            brand: product?.brand || '',
            category: product?.category || '',
        },
    });

    const handleSubmit = (data: ProductFormData) => {
        onSubmit(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Product Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter product title"
                                        {...field}
                                        className="bg-background text-foreground border-input"
                                    />
                                </FormControl>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Brand</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-background text-foreground border-input">
                                            <SelectValue placeholder="Select a brand" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-popover text-popover-foreground border-border">
                                        {brands.map((brand) => (
                                            <SelectItem
                                                key={brand}
                                                value={brand}
                                                className="focus:bg-accent focus:text-accent-foreground"
                                            >
                                                {brand}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-background text-foreground border-input">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-popover text-popover-foreground border-border">
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                                className="focus:bg-accent focus:text-accent-foreground"
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Price ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        className="bg-background text-foreground border-input"
                                    />
                                </FormControl>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="discountPercentage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Discount (%)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="0"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        className="bg-background text-foreground border-input"
                                    />
                                </FormControl>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Stock Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                        className="bg-background text-foreground border-input"
                                    />
                                </FormControl>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Rating</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        placeholder="0.0"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        className="bg-background text-foreground border-input"
                                    />
                                </FormControl>
                                <FormDescription className="text-muted-foreground">Rating from 0 to 5</FormDescription>
                                <FormMessage className='text-red-300' />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-foreground">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter product description"
                                    className="resize-none bg-background text-foreground border-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red-300' />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                        {product ? 'Update Product' : 'Create Product'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}