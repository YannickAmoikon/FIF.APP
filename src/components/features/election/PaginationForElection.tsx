import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
}

export const Pagination = ({
                               currentPage,
                               totalPages,
                               onPreviousPage,
                               onNextPage,
                           }: PaginationProps) => (
    <div className="flex items-center justify-center gap-2 py-4">
        <Button
            variant="outline"
            size="sm"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="px-4 rounded-sm hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Précédent
        </Button>

        <div className="flex items-center gap-1 px-3">
            <span className="text-sm font-medium text-gray-700">
                Page {currentPage}
            </span>
            <span className="text-sm text-gray-500">
                sur {totalPages}
            </span>
        </div>

        <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={currentPage >= totalPages}
            className="px-4 rounded-sm hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
            Suivant
            <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
    </div>
);