import api from './api.js';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const packageAPI = {
  list: (params) => api.get('/packages', { params }),
  getById: (id) => api.get(`/packages/${id}`),
};

export const destinationAPI = {
  list: (params) => api.get('/destinations', { params }),
  getById: (id) => api.get(`/destinations/${id}`),
};

export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  myBookings: () => api.get('/bookings/my'),
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`),
};

export const reviewAPI = {
  listForPackage: (packageId) => api.get(`/packages/${packageId}/reviews`),
  create: (packageId, data) => api.post(`/packages/${packageId}/reviews`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (packageId) => api.post(`/wishlist/${packageId}`),
  remove: (packageId) => api.delete(`/wishlist/${packageId}`),
};

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
};