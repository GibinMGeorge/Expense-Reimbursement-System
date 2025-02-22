import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/gmg',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };