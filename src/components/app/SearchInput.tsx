import React from 'react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
    <Input
        placeholder="Faire une recherche..."
        className="w-64 rounded-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
);