import axios from "axios";
import settings from "../settings.json";

export default function authHeader() {
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}
