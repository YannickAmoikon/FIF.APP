export interface ElectionTypes {
    id: number;
    title: string;
    description: string;
    type: string;
    dateTimeStart: string;
    dateTimeEnd: string;
    status: string;
}

export type ElectionStatus = 'coming' | 'in progress' | 'finished';

export interface ElectionResponse {
    message: string
    data: ElectionTypes[];
}

export interface CreateElectionDto {
    title: string;
    description: string;
    type: string;
    dateTimeStart: string;
    dateTimeEnd: string;
}

export interface UpdateElectionDto {
    titre?: string;
    description?: string;
    type?: string;
    dateTimeStart?: string;
    dateTimeEnd?: string;
}

export interface ElectionType {
    id: number;
    title: string;
    // ... autres propriétés
}

// Ajout du type pour la réponse de l'API
export interface ElectionDetailResponse {
    message: string;
    data: {
        election: {
            id: number;
            date_time_start: string;
            date_time_end: string;
            title: string;
            description: string;
            type_id: number;
            statut: string;
            type: string;
            created_at: string;
            updated_at: string;
            is_active: boolean;
        };
        candidats: Array<{
            id: number;
            name: string;
            last_name: string;
            phone: string;
            birth_date: string;
            email: string;
            bio: string | null;
            election_id: number;
            created_at: string;
            updated_at: string;
            is_active: boolean;
        }>;
        votants: Array<any>; // Ajoutez le type approprié pour les votants si nécessaire
    };
}