import type { AxiosError } from 'axios';
import axios from 'axios';
import type { StoreType } from '../redux/store';
import type { AuthStateType } from '../types/authType';

let store: StoreType | undefined;

export const injectStore = (_store: StoreType): void => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store?.getState().auth.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: { sent?: boolean; url?: string } }) => {
    const prevRequest = err.config;
    if (prevRequest.url?.endsWith('/tokens/refresh')) {
      return Promise.reject(err);
    }

    if (err.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const {
        data: { accessToken },
      } = await axiosInstance<AuthStateType>('/tokens/refresh');
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
