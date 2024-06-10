import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import { ToastAndroid } from 'react-native';

export const getFAQListApi = async payload => {
  console.log('payload :>> ', payload);
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await API.Post(
      `/general/faq`,
      {
        headers: basicAuthTokenHeader(token),
      },
      {faq_category: payload?.faq_category,language:"en"},
    );
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
        }
    throw error;
  }
};

export const getFAQApi = async payload => {
  console.log('payload :>> ', payload);
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await API.Get(`/general/faqCategory`, {
      headers: basicAuthTokenHeader(token),
    });
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

