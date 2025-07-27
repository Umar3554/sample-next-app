import { Button } from "@/components/ui/button";
import { ErrorDisplayProps } from "@/lib/types";

export const ErrorDisplay = ({ error, retry }: ErrorDisplayProps) => (
    <div className="min-h-screen bg-background dark:bg-[hsl(var(--dark-bg))] flex items-center justify-center">
        <div className="text-center p-8 rounded-lg bg-card border border-border max-w-md">
            <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
            <p className="text-foreground dark:text-foreground mb-4">{error}</p>
            <Button onClick={retry}>Retry</Button>
        </div>
    </div>
);