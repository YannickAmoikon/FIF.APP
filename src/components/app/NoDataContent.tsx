import { BookMarked, Users, User, Medal, AlertTriangle } from "lucide-react";

interface NoDataContentProps {
  type: "candidates" | "voters" | "élections" | "sondages";
  searchValue?: string;
}

export const NoDataContent = ({ type, searchValue }: NoDataContentProps) => {
  const getIcon = () => {
    switch (type) {
      case "candidates":
        return User;
      case "voters":
        return Users;
      case "élections":
        return BookMarked;
      case "sondages":
        return Medal;
      default:
        return AlertTriangle;
    }
  };

  const Icon = getIcon();

  return (
    <div className="bg-secondary border border-gray-200 p-6 rounded-sm">
      <div className="flex items-center justify-center flex-col text-center">
        <Icon className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 font-medium mb-2">
          {searchValue
            ? `Aucun résultat ne correspond à votre recherche "${searchValue}"`
            : `La liste des ${type} n'est pas disponible.`}
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
