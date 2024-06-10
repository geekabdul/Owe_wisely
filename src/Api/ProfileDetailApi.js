import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';

export const industryTypeList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/industryTypeList`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
    });
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

export const employmentTypeList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/employmentTypeList`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
    });
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

export const companyList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/companyList`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
    });
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

export const loanPurposeList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/loanPurposeList`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
    });
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};
