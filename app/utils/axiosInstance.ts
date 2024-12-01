import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../constants/apiEndpoints';
import { getRefreshToken, storeTokens } from './authHelpers';
import { TokenResponse } from '../types/apiTypes';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post<TokenResponse>(
            `${API_BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`,
            { refresh: refreshToken }
          );
          storeTokens(data.access, data.refresh);
          if (error.config.headers) {
            error.config.headers.Authorization = `Bearer ${data.access}`;
          }
          return axios(error.config); // Retry original request
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
