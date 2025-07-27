import { SearchBarProps } from "@/lib/types";
import { Search } from "lucide-react";

export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => (
    <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
);