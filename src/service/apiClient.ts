import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://localhost/api',
    baseURL: 'http://reverse-proxy:80',
    headers: { 'Content-Type':'application/json'},
});

export default apiClient;