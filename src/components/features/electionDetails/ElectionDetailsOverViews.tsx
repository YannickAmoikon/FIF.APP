import {ScrollArea} from "@/components/ui/scroll-area";

interface ElectionDetailsOverViewsProps {
    election: {
        id: number;
        title: string;
        description: string;
        type: string;
        date_time_start: string;
        date_time_end: string;
        statut: string;
    };
}

export default function ElectionDetailsOverViews({ election }: ElectionDetailsOverViewsProps) {
    // Fonction pour formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    };

    // Fonction pour traduire le statut
    const getStatus = (statut: string) => {
        switch (statut) {
            case 'coming':
                return 'À venir';
            case 'in_progress':
                return 'En cours';
            case 'ended':
                return 'Terminé';
            default:
                return statut;
        }
    };

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
                            value={`EL${election.id.toString().padStart(3, '0')}`}
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Titre</label>
                        <input
                            type="text"
                            value={election.title}
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Type</label>
                        <input
                            type="text"
                            value={election.type === "Private" ? "Privé" : election.type === "Public" ? "Public" : "Mixte"}
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
                            value={formatDate(election.date_time_start)}
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Date de fin</label>
                        <input
                            type="text"
                            value={formatDate(election.date_time_end)}
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500">Statut</label>
                        <input
                            type="text"
                            value={getStatus(election.statut)}
                            disabled
                            className="w-full px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-500">Description</label>
                    <textarea
                        value={election.description}
                        disabled
                        className="w-full h-32 px-3 py-2 bg-secondary border border-gray-200 rounded-sm text-gray-700 text-sm disabled:opacity-100 resize-none"
                    />
                </div>
            </div>
        </ScrollArea>
    );
}