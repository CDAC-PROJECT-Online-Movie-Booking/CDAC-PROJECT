import axios from "axios";
import { getAuthHeader } from "./authService";

const API = axios.create({
    baseURL: "http://localhost:8080/",
});

API.interceptors.request.use((config) => {
    config.headers = { ...config.headers, ...getAuthHeader() };
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;


export const apiUrls={
    LOGIN_URL:'api/users/login',
    REGISTER_URL: 'api/users/register',
    BOOKINGS_URL:'api/bookings/',
    SHOWS_URL: 'api/shows/',
    CHECK_SHOWS_BOOKING_URL: 'api/bookings/check',
    HALLS_URL: 'api/halls/',
    TODAYS_SHOWS:'api/shows/todays',
    SEARCH_SHOWS: 'api/shows/search',
    USERS_LIST: 'api/users/',
    MOVIES_URL: 'api/movies/',
    CANCELLED_BOOKING: 'api/bookings/cancel/',
    USERS_BOOKINGS: 'api/bookings?userid=',
    USERS_PAYMENTS: 'api/bookings/payments/',
    CUSTOMERS_URL: 'api/customers/',

}