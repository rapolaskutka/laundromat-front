import axios, { AxiosError, AxiosResponse } from 'axios';
import settings from '../settings.json';
import {useRouter} from "vue-router";
import {store} from "../user_store.ts";

const axiosInstance = axios.create({
    baseURL: `${settings.environments.prod.api.uri}`,
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const originalRequest = error.config;
        const router = useRouter();

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            axiosInstance.interceptors.response.use(
                (response: AxiosResponse): AxiosResponse => response,
                (error: AxiosError) => {
                    const originalRequest = error.config;

                    if (error.response?.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;

                        return axios.post<{ accessToken: string, refreshToken: string }>('/api/token/refresh', {
                            refresh_token: localStorage.getItem('refresh')
                        }).then((res: AxiosResponse<{ accessToken: string, refreshToken: string }>) => {
                            if (res.status === 201) {
                                localStorage.setItem('token', res.data.accessToken);
                                localStorage.setItem('refresh', res.data.refreshToken);

                                originalRequest.headers['Authorization'] = 'Bearer ' + res.data.accessToken;

                                return axios(originalRequest);
                            }

                            return Promise.reject(new Error('Refresh token failed'));
                        }).catch((refreshError: AxiosError) => {
                            console.error('Refresh token error:', refreshError);
                            store.user = null;
                            router.push('/login').then(() => {
                                return Promise.reject(refreshError)
                            });
                        });
                    }

                    return Promise.reject(error);
                }
            );
        }
    });
export default axiosInstance;
