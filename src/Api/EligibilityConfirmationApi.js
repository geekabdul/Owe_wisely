import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';

export const getCIBIL = async payload => {
  console.log('payload :>> ', payload);
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Post(
      `/customer/checkCIBILScore`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        document_type: payload?.document_type,
        driving_license_no: payload?.driving_license_no,
        // voter_card_no:payload?.voter_card_no,
        // driving_license_no: payload?.driving_license_no
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
