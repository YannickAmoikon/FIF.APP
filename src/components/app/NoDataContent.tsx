import { BookMarked, Users2, User } from "lucide-react";

interface NoDataContentProps {
    type: 'candidats' | 'électeurs' | 'élections';
    searchValue?: string;
}

export const NoDataContent = ({ type, searchValue }: NoDataContentProps) => {
    const getIcon = () => {
        switch (type) {
            case 'candidats':
                return User;
            case 'électeurs':
                return Users2;
            case 'élections':
                return BookMarked;
            default:
                return BookMarked;
        }
    };

    const Icon = getIcon();

    return (
        <div className="bg-secondary border border-gray-200 p-6 rounded-sm">
            <div className="flex items-center justify-center flex-col text-center">
                <Icon className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium mb-2">
                    {searchValue 
                        ? `Aucun ${type} ne correspond à votre recherche "${searchValue}"`
                        : `Aucun ${type} n'est disponible.`}
                </p>
                <p className="text-sm text-gray-500">
                    {searchValue 
                        ? "Essayez de modifier votre recherche"
                        : `Cliquez sur le bouton + pour ajouter un nouveau ${type.slice(0, -1)}`}
                </p>
            </div>
        </div>
    );
};