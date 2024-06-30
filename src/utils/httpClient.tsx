import qs from 'qs';
import {getEnvConfig} from './env.config';

const envConfig = getEnvConfig();
const baseURL = `${envConfig.API_SERVER}apikey=${envConfig.API_KEY}`;

const defaultHeaders = {
  'Cache-Control': 'no-cache',
};

const fetchWrapper = async (url: string, options = {}) => {
  const response = await fetch(baseURL + url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.response = response;
    throw error;
  }

  const responseData = await response;

  response.headers.forEach((value: any, name: string) => {
    if (name.toLowerCase() === 'cache-control') {
      response.headers['Cache-Control'] = 'no-cache';
    }
  });

  return responseData;
};

const Api = {
  post: async (url: string, reqBody = {}, isJson = true) => {
    const requestBody = isJson
      ? JSON.stringify(reqBody)
      : qs.stringify(reqBody);

    const headers = {
      'Content-Type': isJson
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
    };

    console.log(`POST: ${baseURL + url}`);
    return fetchWrapper(url, {
      method: 'POST',
      headers,
      body: requestBody,
    });
  },

  get: async (url: any, reqBody = {}, isJson = true) => {
    const queryString = isJson ? qs.stringify(reqBody) : '';
    const finalUrl = queryString ? `${url}?${queryString}` : url;

    console.log(`GET: ${baseURL + finalUrl}`);
    return fetchWrapper(finalUrl, {
      method: 'GET',
    });
  },

  delete: async (url: string, reqBody = {}, isJson = true) => {
    const headers = {
      'Content-Type': isJson
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
    };

    console.log(`DELETE: ${baseURL + url}`);
    return fetchWrapper(url, {
      method: 'DELETE',
      headers,
      body: isJson ? JSON.stringify(reqBody) : qs.stringify(reqBody),
    });
  },

  update: async (url: string, reqBody = {}, isJson = true) => {
    const requestBody = isJson
      ? JSON.stringify(reqBody)
      : qs.stringify(reqBody);

    const headers = {
      'Content-Type': isJson
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
    };

    console.log(`UPDATE: ${baseURL + url}`);
    return fetchWrapper(url, {
      method: 'PUT',
      headers,
      body: requestBody,
    });
  },
};

export default Api;
