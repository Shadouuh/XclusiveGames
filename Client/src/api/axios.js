import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001', // cuando trabajen en localhost
  //baseURL: 'http://10.0.1.194:5001', // cuando trabajen en la red local pongan la ip de su compu y el puerto sigue siendo el mismo
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Agregar esta línea para enviar galletitas
});

export default instance;