import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ListFilter} from "lucide-react";

interface FilterButtonProps {
    options: {
        label: string;
        value: string;
        onClick: () => void;
    }[];
}

export default function FilterButton({ 
    options, 
    label = "Filtrer par" 
}: FilterButtonProps & { label?: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" className="rounded-sm border" variant="secondary">
                    <ListFilter className="mr-1" size={14} /> Filtrer
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {options.map((option, index) => (
                        <DropdownMenuItem key={index} onClick={option.onClick}>
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}