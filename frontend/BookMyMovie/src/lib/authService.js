import axios from "axios";

const API_URL = "http://localhost:8080/api";  // Change to your backend URL

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.role);
    }
    return response.data;
};

export const logout = () => {
    sessionStorage.removeItem("token");
};

export const getAuthHeader = () => {
    const token = sessionStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};
