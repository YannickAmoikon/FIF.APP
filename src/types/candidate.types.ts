export interface CandidateTypes {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    birth_date: string;
    bio: string;
    election_id: number
}

export interface CandidateResponse {
    message: string
    data: CandidateTypes[]
}