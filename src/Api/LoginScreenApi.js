import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';

export const requestOtp = async payload => {
  try {
    const response = await API.Post(
      `/requestOtp`,
      {
        headers: basicAuthHeader,
      },
      {email: payload?.email, phone: payload?.phone},
    );
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

export const verifyOtp = async payload => {
  try {
    const response = await API.Post(
      `/verifyOtp`,
      {
        headers: basicAuthHeader,
      },
      {
        email: payload?.email,
        phone: payload?.phone,
        password: payload?.password,
      },
    );
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

export const resendOTP = async payload => {
  console.log('payload :>> ', payload);
  try {
    const response = await API.Post(
      `/requestOtp`,
      {
        headers: basicAuthHeader,
      },
      {
        email: payload?.email,
        phone: payload?.phone,
      },
    );
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};
