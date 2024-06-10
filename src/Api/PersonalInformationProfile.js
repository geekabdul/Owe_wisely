import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';

export const getUsers = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/customer/getProfileDetails`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
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

export const getUserName = async () => {
  try {
    const email = await AsyncStorage.getItem('email');
    const phone = await AsyncStorage.getItem('phone');
    const response = await API.Post(
      `/customerExist`,
      {
        headers: basicAuthHeader,
      },
      {
        email,
        phone,
      },
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
