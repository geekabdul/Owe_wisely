import AsyncStorage from '@react-native-async-storage/async-storage';
import {encode as base64} from 'base-64';

const Username = 'revolo';
const Password = '12345678';

const basicAuth = 'Basic ' + base64(`${Username}:${Password}`);
// const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

export const basicAuthHeader = {
  Authorization: basicAuth,
  'Content-Type': 'application/json',
  Platform: 'android',
  'Device-ID': '123456 ',
  latitude: '54321',
  longitude: '09876',
  // 'Accept-Language': selectedLanguage,
};

export const basicAuthTokenHeader = (token, selectedLanguage) => {
  return {
    Authorization: basicAuth,
    'access-token': token,
    Platform: 'android',
    'Device-ID': '123456',
    latitude: '54321',
    longitude: '09876',
    'Accept-Language': selectedLanguage,
  };
};

export const BASIC_URL = 'https://owadminbeta.revolotech.com/api';
