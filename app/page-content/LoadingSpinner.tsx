import { motion } from "framer-motion";

export const LoadingSpinner = () => (
    <div className="min-h-screen bg-background dark:bg-[hsl(var(--dark-bg))] flex items-center justify-center">
        <div className="text-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-foreground dark:text-foreground">Loading products...</p>
        </div>
    </div>
);