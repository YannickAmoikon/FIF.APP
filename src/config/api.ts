import axios from "axios";

export const API_BASE_URL: string = "https://fif-service.merute.dev/";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const setAuthToken = (token: string) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

api.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (error.response?.status === 401) {
            // Gérer l'expiration du token
            localStorage.removeItem("token");
            // Redirection si nécessaire
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;