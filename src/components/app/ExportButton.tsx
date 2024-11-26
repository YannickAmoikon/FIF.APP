import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File } from "lucide-react";

interface ExportButtonProps {
  onExportExcel?: () => void;
  onExportPDF?: () => void;
  label?: string;
}

export default function ExportButton({
  onExportExcel,
  onExportPDF,
  label = "Format d'export",
}: ExportButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="rounded-sm border" variant="secondary">
          <File className="mr-1" size={14} /> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 bg-secondary">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onExportExcel}>Excel</DropdownMenuItem>
          <DropdownMenuItem onClick={onExportPDF}>PDF</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
