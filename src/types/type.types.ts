export interface TypeTypes {
    id: number;
    name: string;
    content: string;
}

export interface TypeResponse {
    message: string
    data: TypeTypes[]
}