export interface CategoryTypes {
    id: number;
    title: string;
    content: string;
}

export interface CategoryResponse {
    message: string
    data: CategoryTypes[]
}