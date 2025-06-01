import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Agregar esta línea para enviar galletitas
});

export default instance;