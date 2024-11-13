import { Bell, Search, User } from "lucide-react";

export default function Header() {
    return (
        <header className="h-16 flex w-full border-b bg-white px-6">
            {/* Partie gauche - Recherche */}
            <div className="flex-1 flex items-center">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full pl-10 pr-4 py-2 text-sm border rounded-sm focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-300"
                    />
                </div>
            </div>

            {/* Partie droite - Notifications et Profil */}
            <div className="flex items-center space-x-6">
                {/* Notifications */}
                <button className="relative hover:bg-gray-50 p-2 rounded-sm">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-orange-500 rounded-full"></span>
                </button>

                {/* Séparateur vertical */}
                <div className="h-8 w-px bg-gray-200"></div>

                {/* Profil utilisateur */}
                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">
                            John Doe
                        </p>
                        <p className="text-xs text-gray-500">
                            Administrateur
                        </p>
                    </div>
                    <div className="h-9 w-9 rounded-full border bg-gray-50 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    );
}