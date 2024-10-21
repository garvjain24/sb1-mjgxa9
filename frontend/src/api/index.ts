import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const auth = {
  signup: (userData: any) => api.post('/auth/signup', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  adminLogin: (credentials: any) => api.post('/auth/admin-login', credentials),
};

export const user = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData: any) => api.put('/user/profile', userData),
  getOrders: () => api.get('/user/orders'),
  getInvestments: () => api.get('/user/investments'),
};

export const products = {
  getAll: (params: any) => api.get('/products', { params }),
  getOne: (id: string) => api.get(`/products/${id}`),
  create: (productData: any) => api.post('/products', productData),
  update: (id: string, productData: any) => api.put(`/products/${id}`, productData),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const cart = {
  add: (productData: any) => api.post('/cart', productData),
  get: () => api.get('/cart'),
  remove: (productId: string) => api.delete(`/cart/${productId}`),
};

export const order = {
  create: (orderData: any) => api.post('/order', orderData),
  getOne: (id: string) => api.get(`/order/${id}`),
};

export const payment = {
  checkout: (paymentData: any) => api.post('/payment/checkout', paymentData),
};

export const investment = {
  getRates: () => api.get('/investment/rates'),
  buy: (investmentData: any) => api.post('/investment/buy', investmentData),
  sell: (investmentData: any) => api.post('/investment/sell', investmentData),
};

export const giftCard = {
  generate: (giftCardData: any) => api.post('/giftcard/generate', giftCardData),
  getDetails: (code: string) => api.get(`/giftcard/${code}`),
  redeem: (redeemData: any) => api.post('/giftcard/redeem', redeemData),
};

export default {
  auth,
  user,
  products,
  cart,
  order,
  payment,
  investment,
  giftCard,
};