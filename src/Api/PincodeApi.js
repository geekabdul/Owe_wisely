import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';
const axios = require('axios');

export const getPinCodeList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/pincodeList`, {
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
export const getstateListList = async () => {
  try {
    // let data = JSON.stringify({
    //   "pincode": id
    // });
    // alert(data)
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Post(`/master/stateList`, {
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
export const getcityArrList = async () => {
  try {
    // let data = JSON.stringify({
    //   "state": id
    // });
    // alert(data)
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Post(`/master/cityList`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
    });
    // console.log("response.data???????????????",JSON.stringify(response.data))
    // console.log('getcityArrListgetcityArrListgetcityArrListgetcityArrList');
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};
