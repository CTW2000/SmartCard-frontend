import axios from 'axios';
import { BASE_URL } from './paths';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export default client;


// Helper to post credentials fetched from localStorage
// Reads keys: currentAccount, currentPassword
export function postStoredCredentials(url) {
  const account = localStorage.getItem('currentAccount') || '';
  const password = localStorage.getItem('currentPassword') || '';
  const token = localStorage.getItem('token');
  const data = new URLSearchParams();
  data.append('account', account);
  data.append('password', password);
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  if (token) headers['authorization'] = `Bearer ${token}`;
  return client.post(url, data, { headers });
}


