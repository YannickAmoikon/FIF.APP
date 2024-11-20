// types/auth.types.ts
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}