import axios from 'axios';

const port = import.meta.env.VITE_PORT;

export const api = axios.create({
    baseURL: `http://localhost:${port}`,
    headers: {
        "Content-Type":"application/json"
    }
})