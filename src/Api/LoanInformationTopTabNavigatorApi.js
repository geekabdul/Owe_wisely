import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';

export const getkeyFactStatement = async id => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

  try {
    const response = await API.Post(
      `/customer/keyFactStatement`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {loan_id: id},
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

export const getpaymentSchedule = async id => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

  try {
    const response = await API.Post(
      `/customer/paymentSchedule`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {loan_id: id},
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

export const getLoanApplication = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/customer/getLoanApplication`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
    });
    return response;
  } catch (error) {
    console.error('Error: ', error);
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};
