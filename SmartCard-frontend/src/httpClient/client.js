import axios from 'axios';
import { BASE_URL } from './paths';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export default client;


