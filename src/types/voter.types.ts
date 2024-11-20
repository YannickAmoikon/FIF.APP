export interface VoterTypes {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    categorie: string;
    dateStart: string;
    dateEnd: string;
}

export interface VoterResponse {
    message: string
    data: VoterTypes[]
}