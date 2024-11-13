import {ScrollArea} from "@/components/ui/scroll-area";

export default function ElectionDetailsOverViews() {
    return(
        <ScrollArea className="h-full p-2">
            <div className="mb-6 flex flex-col">
                <h3 className="font-semibold border-b pb-2">Informations générales</h3>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">ID</label>
                        <input
                            type="text"
                            value="EL001"
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Titre</label>
                        <input
                            type="text"
                            value="Élection Présidentielle FIF 2024"
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Type</label>
                        <input
                            type="text"
                            value="Public"
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Date de début</label>
                        <input
                            type="text"
                            value="2024-05-01 08:00"
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Date de fin</label>
                        <input
                            type="text"
                            value="2024-05-01 18:00"
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Statut</label>
                        <input
                            type="text"
                            value="À venir"
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-500">Description</label>
                    <textarea
                        value="L'élection présidentielle de la FIF 2024 est un événement majeur pour le football ivoirien. Cette élection permettra de désigner le nouveau président de la Fédération Ivoirienne de Football pour les quatre prochaines années. Le vote se déroulera sur une journée complète, permettant ainsi à tous les électeurs de participer à ce moment crucial pour l'avenir du football en Côte d'Ivoire."
                        disabled
                        className="w-full h-32 px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100 resize-none"
                    />
                </div>
            </div>
        </ScrollArea>
    )
}