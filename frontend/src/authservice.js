// authService.js
import axios from 'axios';


export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function setAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

export function setRefreshToken(token) {
  localStorage.setItem('refreshToken', token);
}


export const clearTokens = () => {
  
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.reload();
}

export function verifyAccessToken() {
  const token = getAccessToken();
  return axios.post('https://flash-card-master-backend.vercel.app/account/token/verify/', {
    token: token
  });
}

export function  refreshAccessToken() {
  const refreshToken = getRefreshToken();
  return axios.post('https://flash-card-master-backend.vercel.app/account/token/refresh/', {
    refresh: refreshToken
  })
  .then(response => {
    setAccessToken(response.data.access);
    return response.data.access;
  })
  .catch(error => {
    clearTokens();
    return Promise.reject(error);
  });
}
