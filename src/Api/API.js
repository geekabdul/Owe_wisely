import axios from 'axios';
import {BASIC_URL} from '../libs/apiConfig';

export const Get = (url, headers) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASIC_URL}${url}`, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const Post = (url, headers, payload) => {
  // console.log('payload, headers :>> ', payload, headers);
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASIC_URL}${url}`, payload, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {Get, Post};
