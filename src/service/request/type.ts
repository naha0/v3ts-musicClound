import type {AxiosRequestConfig,AxiosResponse,AxiosRequestHeaders} from 'axios'

export interface HyRequestInterceptors<T = AxiosResponse>{
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (res: T) => T;
    responseInterceptorCatch?: (error: any) => any;
}

export interface HyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: HyRequestInterceptors<T>;
}
