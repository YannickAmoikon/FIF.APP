import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 rounded-sm hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Précédent
            </Button>

            <div className="flex items-center gap-1 px-3">
                <span className="text-sm font-medium">
                    Page {currentPage} sur {totalPages}
                </span>
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 rounded-sm hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
                Suivant
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </div>
    );
};