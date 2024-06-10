import axios from 'axios';
import {BASIC_URL} from './apiConfig';
import {encode as base64} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Labels } from '../../assets/index';
export const authApi = axios.create({
  baseURL: BASIC_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
});
authApi.interceptors.request.use(
  async function (options) {
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);
authApi.interceptors.response.use(
  async function (options) {
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export const mainApi = axios.create({
  baseURL: BASIC_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
});
mainApi.interceptors.request.use(
  async function (options) {
    // const userData = await getData(Labels.userDataId);
    const userData = await AsyncStorage.getItem('token');
    const Username = 'revolo';
    const Password = '12345678';

    const basicAuth = 'Basic ' + base64(`${Username}:${Password}`);
    console.log('userData|userData234567890-', userData);
    console.log('userData|userData', userData);
    options.headers['Authorization'] = basicAuth;
    options.headers['access-token'] = 'Bearer ' + userData;
    options.headers['Platform'] = 'android';
    options.headers['Device-ID'] = '12345';
    options.headers['latitude'] = '54321';
    options.headers['longitude'] = '09876';
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);
mainApi.interceptors.response.use(
  async function (options) {
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);
