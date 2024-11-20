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
