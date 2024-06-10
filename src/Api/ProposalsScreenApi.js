import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';

export const getProposals = async (tenure, loan_amount) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
    const response = await API.Get(`/customer/proposals`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
    },
    {
      loan_amount: loan_amount[0],
      tenure:tenure
    },);
    console.log(loan_amount[0])
    console.log(tenure)
    console.log(response)
    return response;
  } catch (error) {
    console.error('Error: ', error);
    if (error.response.data?.status === 0) {
      ToastAndroid.show(error.response.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

export const getFilterProposals = async (tenure, loan_amount) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    let data = {
      "loan_amount": loan_amount[0],
      "tenure":tenure
    };

    const response = await API.Get(`/customer/proposals`, {
      headers: basicAuthTokenHeader(token, selectedLanguage),
      params:data
    },
    );
    console.log(loan_amount[0])
    console.log(tenure)
    console.log(JSON.stringify(response))
    console.log(JSON.stringify(response.config))
    console.log(JSON.stringify(data))
    return response;
  } catch (error) {
    console.error('Error: ', error);
    if (error.response.data?.status === 0) {
      ToastAndroid.show(error.response.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};
export const getevaluateLoan = async (tenure, loan_amount) => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
  // console.log(payload)
  try {
    const response = await API.Post(
      `/customer/evaluateLoan`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        loan_amount: loan_amount[0],
        tenure: tenure,
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
export const savePersonalReferences = async (payload) => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
  // console.log(payload)
  try {
    const response = await API.Post(
      `/customer/savePersonalReferences`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        "family_reference_type":payload.family_reference_type,
        "family_reference_phone": (payload.family_reference_phone).replace(" ",""),
        "family_reference_full_name": payload.family_reference_full_name,
        "friend_reference_phone": (payload.friend_reference_phone).replace(" ",""),
        "friend_reference_full_name": payload.friend_reference_full_name
      },
    );
    return response.data;
  } catch (error) {
    console.log("Err>>>>>>>>>>>>",error?.response)
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};
export const getpersonalReferenceTypes = async () => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
  // console.log(payload)
  try {
    const response = await API.Get(
      `/customer/personalReferenceTypes`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      }
    );
    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};
