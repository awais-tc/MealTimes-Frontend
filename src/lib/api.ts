import axios from 'axios';

// Base API setup
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error handler for responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000';

// ---------- Auth ----------
export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/User/login', { email, password });
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/currentUser');
    return response.data;
  },

  // Role-specific registration
  registerCorporate: async (data: any) => {
    const response = await axios.post(`${API_URL}/api/User/register/company`, data);
    return response.data;
  },
  registerEmployee: async (data: any) => {
    const response = await axios.post(`${API_URL}/api/User/register/employee`, data);
    return response.data;
  },
  registerHomeChef: async (data: any) => {
    const response = await axios.post(`${API_URL}/api/User/register/chef`, data);
    return response.data;
  }
};

// ---------- Admin ----------
export const admin = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  getRecentOrders: async () => {
    const response = await api.get('/admin/recent-orders');
    return response.data;
  },
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
  getReports: async () => {
    const response = await api.get('/admin/reports');
    return response.data;
  }
};

// ---------- Meals ----------
export const meals = {
  getAll: async () => {
    const response = await api.get('/meals');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/meals/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/meals', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/meals/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  }
};

// ---------- Nutrition ----------
export const nutrition = {
  getMealNutrition: async (mealId: string) => {
    const response = await api.get(`/nutrition/${mealId}`);
    return response.data;
  }
};

// ---------- Rewards ----------
export const rewards = {
  getPoints: async () => {
    const response = await api.get('/rewards');
    return response.data;
  }
};

// ---------- Meal Plans ----------
export const mealPlans = {
  getPlans: async () => {
    const response = await api.get('/meal-plans');
    return response.data;
  },
  subscribe: async (planId: string) => {
    const response = await api.post(`/meal-plans/${planId}/subscribe`);
    return response.data;
  },
  createCheckoutSession: async (priceId: string) => {
    const response = await api.post('/meal-plans/create-checkout-session', { priceId });
    return response.data;
  }
};

// ---------- Orders ----------
export const orders = {
  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/orders', data);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  }
};

// ---------- Corporate ----------
export const corporate = {
  getAccountDetails: async () => {
    const response = await api.get('/corporate/account');
    return response.data;
  },
  updateAccount: async (data: any) => {
    const response = await api.put('/corporate/account', data);
    return response.data;
  },
  getDepartments: async () => {
    const response = await api.get('/corporate/departments');
    return response.data;
  }
};

// ---------- Chefs ----------
export const chefs = {
  getProfile: async (id: string) => {
    const response = await api.get(`/chefs/${id}`);
    return response.data;
  },
  updateProfile: async (data: any) => {
    const response = await api.put('/chefs/profile', data);
    return response.data;
  },
  getReviews: async (id: string) => {
    const response = await api.get(`/chefs/${id}/reviews`);
    return response.data;
  }
};

// ---------- Support ----------
export const support = {
  getFAQs: async () => {
    const response = await api.get('/support/faqs');
    return response.data;
  },
  submitTicket: async (data: any) => {
    const response = await api.post('/support/tickets', data);
    return response.data;
  }
};

// ---------- Events ----------
export const events = {
  getUpcoming: async () => {
    const response = await api.get('/events/upcoming');
    return response.data;
  },
  register: async (eventId: string) => {
    const response = await api.post(`/events/${eventId}/register`);
    return response.data;
  }
};

// ---------- Tracking ----------
export const tracking = {
  getOrderStatus: async (orderId: string) => {
    const response = await api.get(`/tracking/${orderId}`);
    return response.data;
  }
};

export default api;
