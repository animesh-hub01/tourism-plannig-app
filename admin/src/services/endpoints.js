import api from './api.js';

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const dashboardAPI = {
  stats: () => api.get('/admin/dashboard-stats'),
};

export const packageAPI = {
  list: (params) => api.get('/packages', { params }),
  getById: (id) => api.get(`/packages/${id}`),
  create: (data) => api.post('/packages', data),
  update: (id, data) => api.put(`/packages/${id}`, data),
  remove: (id) => api.delete(`/packages/${id}`),
};

export const destinationAPI = {
  list: (params) => api.get('/destinations', { params }),
  getById: (id) => api.get(`/destinations/${id}`),
  create: (data) => api.post('/destinations', data),
  update: (id, data) => api.put(`/destinations/${id}`, data),
  remove: (id) => api.delete(`/destinations/${id}`),
};

export const bookingAPI = {
  listAll: (params) => api.get('/admin/bookings', { params }),
  updateStatus: (id, status) => api.patch(`/admin/bookings/${id}/status`, { status }),
};

export const userAPI = {
  list: () => api.get('/admin/users'),
};