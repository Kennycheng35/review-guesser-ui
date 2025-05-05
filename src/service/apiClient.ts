import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://localhost/api',
    baseURL: 'http://api:80/api',
    headers: { 'Content-Type':'application/json'},
});

export default apiClient;