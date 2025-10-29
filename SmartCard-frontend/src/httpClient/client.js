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

// Generic helper to POST x-www-form-urlencoded data
// Accepts a plain object or URLSearchParams
export function postForm(url, form, extraHeaders = {}) {
  const token = localStorage.getItem('token');
  const formData = form instanceof URLSearchParams
    ? form
    : (() => {
        const d = new URLSearchParams();
        if (form && typeof form === 'object') {
          Object.entries(form).forEach(([key, value]) => {
            if (value !== undefined && value !== null) d.append(key, String(value));
          });
        }
        return d;
      })();
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded', ...extraHeaders };
  if (token && !headers['authorization']) headers['authorization'] = `Bearer ${token}`;
  return client.post(url, formData, { headers });
}


// Helper to POST multipart/form-data using FormData
// Do NOT set Content-Type manually so the browser/axios can add the correct boundary
export function postMultipart(url, formData, extraHeaders = {}) {
  const token = localStorage.getItem('token');
  const headers = { ...extraHeaders };
  if (token && !headers['authorization']) headers['authorization'] = `Bearer ${token}`;
  return client.post(url, formData, { headers });
}


