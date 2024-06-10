import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';

export const languageSwitch = async (headers, payload) => {
  const token = await AsyncStorage.getItem('token');
  console.log(
    'basicAuthTokenHeader :>> ',
    basicAuthTokenHeader(token),
    headers,
    payload,
  );
  try {
    const response = await API.Post(
      `/general/fetchTranslation`,
      {
        headers: {...basicAuthTokenHeader(token), ...headers},
      },
      {
        content: payload,
      },
    );
    console.log('languageSwitch response :>> ', response.data);
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};
