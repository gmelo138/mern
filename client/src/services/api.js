import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; // adjust this to match your backend URL

export const getUsers = () => axios.get(`${API_URL}/users`);
export const getProducts = () => axios.get(`${API_URL}/products`);