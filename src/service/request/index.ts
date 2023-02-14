// import axios from 'axios';
// // create axios instance
// const instance = axios.create({
//   baseURL: 'https://lianghj.top:3000',
//   method: 'get',
//   timeout:10000,
//   withCredentials: true
// });

// //add request interceptor
// instance.interceptors.request.use((config) => {
//   return config;
// }, err => {
//   return Promise.reject(err);
// });

// //response interceptor
// instance.interceptors.response.use((data) => {
//   return data;
// }, err => {
//   window.$message.error('network error');
//   return Promise.reject(err);
// });

// export default instance;


import axios, { Axios } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { HyRequestInterceptors,HyRequestConfig} from './type'

class HyRequest {
  instance: AxiosInstance;
  interceptors?: HyRequestInterceptors;

  constructor(config: HyRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
        (config) => {
            console.log('所有的实例都有的拦截器,请求成功');
            // this.loading = ElLoading.service({
            //     lock:true,
            //     text:'正在请求数据...',
            //     background:'rgba(0,0,0,0.5)'
            // })
            return config
        },
        (err) => {
            console.log('所有的实例都有的拦截器,请求失败');
            return err
        }
    )

    this.instance.interceptors.response.use(
        (res) => {
            console.log('所有的实例都有的拦截器,响应成功');
            setTimeout(()=>{
                this.loading?.close()
            },1000)
            return res.data
        },
        (err) => {
            console.log('所有的实例都有的拦截器,响应失败');
            return err
        }
    )
  }

  request<T>(config: HyRequestConfig): Promise<T> {
    // this.instance.request(config).then((res) => {
    //   console.log(res);
    // });
    return new Promise((resolve,reject)=>{
    
        this.instance.request<any,T>(config).then((res)=>{
            // 1. 但求请求对数据的处理
            if(config.interceptors?.requestInterceptor){
                // res = config.interceptors.requestInterceptor(res)
            }
            // 将结果resolve返回出去
            resolve(res)
        }).catch(err=>{
            return err
        })
    })
  }

  get<T>(config:HyRequestConfig):Promise<T>{
    return this.request<T>({...config,method:'GET'})
  }

  post<T>(config:HyRequestConfig):Promise<T>{
    return this.request<T>({...config,method:'POST'})
  }

  patch<T>(config:HyRequestConfig):Promise<T>{
    return this.request<T>({...config,method:'PATCH'})
  }

  delete<T>(config:HyRequestConfig):Promise<T>{
    return this.request<T>({...config,method:'DELETE'})
  }
}

export default HyRequest;
