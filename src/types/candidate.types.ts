export interface CandidateTypes {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    birth_date: string;
    bio: string;
}

export interface CandidateResponse {
    message: string
    data: CandidateTypes[]
}