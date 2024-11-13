export interface Election {
    id: string;
    titre: string;
    description: string;
    type: string;
    dateDebut: string;
    dateFin: string;
    statut: ElectionStatus;
    createdAt: string;
    updatedAt: string;
}

export type ElectionStatus = 'À venir' | 'En cours' | 'Terminée';

export interface ElectionResponse {
    items: Election[];
    total_items: number;
    total_pages: number;
    current_page: number;
}

export interface CreateElectionDto {
    titre: string;
    description: string;
    type: string;
    dateDebut: string;
    dateFin: string;
}

export interface UpdateElectionDto {
    titre?: string;
    description?: string;
    type?: string;
    dateDebut?: string;
    dateFin?: string;
}