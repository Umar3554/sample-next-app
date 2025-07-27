import { Button } from "@/components/ui/button";
import { ThemeToggleProps } from "@/lib/types";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => (
    <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full border-input cursor-pointer"
        aria-label="Toggle theme"
    >
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
);
