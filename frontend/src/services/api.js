// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // URL của backend

export const getTickets = () => axios.get(`${API_BASE_URL}/tickets`);
export const bookTicket = (data) => axios.post(`${API_BASE_URL}/book`, data);
