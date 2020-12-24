/* eslint-disable no-undef */
import axios from 'axios';
import errorHandler from './errorHandler';

// import { polyfill } from 'es6-promise';
// polyfill();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', //process.env.API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  },
  timeout: 2000
});

axiosInstance.interceptors.request.use(request => {
  return request;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

async function requestHandler(settings) {
  
  if (typeof settings.actions.start === 'function') {
    settings.actions.start();
  }
  
  let axiosConfig = {
    method: settings.method,
    url: settings.url,
    data: settings.requestData
  };

  runRequest(axiosConfig);

  async function runRequest(config) {
    try {
      const response = await axiosInstance(config);
      if (typeof settings.actions.success === 'function') {
        settings.actions.success(response.data);
      }
    } catch (error) {
      if (error.code && error.code === 'ECONNABORTED') {
        settings.actions.fail('Сервер не отвечает, проблемы с интернетом');
        return;
      }
      if (error.response && typeof settings.actions.fail === 'function') {
        settings.actions.fail(errorHandler(error));
      } else {
        settings.actions.fail('Сервер API не отвечает.');
      }
    }
  }
}

export default requestHandler;