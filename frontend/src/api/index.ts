import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    register: (name: string, email: string, password: string) =>
        api.post('/auth/register', { name, email, password }),
    getProfile: () => api.get('/auth/profile'),
};

// Products API
export const productsAPI = {
    getAll: (params?: {
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
        condition?: string;
    }) => api.get('/products', { params }),
    getById: (id: string) => api.get(`/products/${id}`),
    create: (data: any) => api.post('/products', data),
    update: (id: string, data: any) => api.put(`/products/${id}`, data),
    delete: (id: string) => api.delete(`/products/${id}`),
};

// Inquiries API
export const inquiriesAPI = {
    submit: (data: { name: string; email?: string; phone?: string; requirement: string; productId?: string }) =>
        api.post('/inquiries', data),
    getAll: () => api.get('/inquiries'),
    updateStatus: (id: string, status: string) => api.put(`/inquiries/${id}`, { status }),
    delete: (id: string) => api.delete(`/inquiries/${id}`),
};

// Certificates API
export const certificatesAPI = {
    getAll: () => api.get('/certificates'),
    create: (data: any) => api.post('/certificates', data),
    update: (id: string, data: any) => api.put(`/certificates/${id}`, data),
    delete: (id: string) => api.delete(`/certificates/${id}`),
};

// Testimonials API
export const testimonialsAPI = {
    getApproved: () => api.get('/testimonials'),
    getAll: () => api.get('/testimonials/all'),
    submit: (data: { customerName: string; location: string; content: string; rating: number }) =>
        api.post('/testimonials', data),
    approve: (id: string) => api.put(`/testimonials/${id}/approve`),
    delete: (id: string) => api.delete(`/testimonials/${id}`),
};

// Settings API
export const settingsAPI = {
    getAll: () => api.get('/settings'),
    update: (data: Record<string, string>) => api.put('/settings', data),
    init: () => api.post('/settings/init'),
};

export default api;
