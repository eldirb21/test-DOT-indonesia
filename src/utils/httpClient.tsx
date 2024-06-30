import qs from 'qs';
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {getEnvConfig} from './env.config';

const envConfig = getEnvConfig();

const Instance = axios.create({
  baseURL: envConfig.API_SERVER + `apikey=${envConfig.API_KEY}`,
});

Instance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    if (config.headers) {
      config.headers['Cache-Control'] = 'no-cache';
    } else {
      config.headers = new axios.AxiosHeaders();
      config.headers['Cache-Control'] = 'no-cache';
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

Instance.interceptors.response.use(
  async (response: AxiosResponse): Promise<AxiosResponse> => {
    response.headers['Cache-Control'] = 'no-cache';
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

interface ParamsType {
  [key: string]: any;
}

const Api = {
  post(
    url: string,
    reqBody?: ParamsType,
    isJson: boolean = true,
  ): Promise<AxiosResponse> {
    const requestBody = isJson ? reqBody : qs.stringify(reqBody);

    // Set the Content-Type header based on isJson value
    const headers = {
      'Content-Type': isJson
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
    };
    console.log(`POST: ${Instance?.defaults?.baseURL + url}`);
    return Instance.post(url, requestBody, {headers});
  },

  get(
    url: string,
    reqBody?: any,
    isJson: boolean = true,
  ): Promise<AxiosResponse> {
    const requestBody = isJson ? reqBody : qs.stringify(reqBody);

    console.log(`GET: ${Instance.defaults.baseURL + url}`);
    return Instance.get(url, requestBody);
  },
  delete(
    url: string,
    reqBody: any,
    isJson: boolean = true,
  ): Promise<AxiosResponse> {
    // Set the Content-Type header based on isJson value
    const headers = {
      'Content-Type': isJson
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
    };
    return Instance.delete(url, {headers});
  },
  update(
    url: string,
    reqBody: ParamsType,
    isJson: boolean = true,
  ): Promise<AxiosResponse> {
    const requestBody = isJson ? reqBody : qs.stringify(reqBody);

    // Set the Content-Type header based on isJson value
    const headers = {
      'Content-Type': isJson
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
    };
    console.log(`UPDATE: ${Instance.defaults.baseURL + url}`);
    return Instance.put(url, requestBody, {headers});
  },
};

export default Api;
