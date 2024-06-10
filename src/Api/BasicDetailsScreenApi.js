import {basicAuthHeader, basicAuthTokenHeader} from '../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './API';
import {ToastAndroid} from 'react-native';

export const savePanCardDetails = async payload => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
  console.log('payloadddddd>>>>>>>>>', payload);

  try {
    const response = await API.Post(
      `/customer/savePanCardDetails`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        pan_card_no: payload.pan_card_no,
        full_name: payload.full_name,
        // "dob":"10/07/1995",
        //  image_path: [],
      },
    );
    console.log('response', JSON.stringify(response));
    return response.data;
  } catch (error) {
    console.log('err', JSON.stringify(error));
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

export const saveVoterCardDetails = async payload => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

  try {
    const response = await API.Post(
      `/customer/saveVoterCardDetails`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        voter_card_no: payload?.voter_card_no,
        full_name: payload?.full_name,
        // dob: payload?.dob,
        // gender: payload?.gender,
        // address: payload?.address,
        // image_path: [],
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
export const saveDrivingLicenseDetails = async payload => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

  try {
    const response = await API.Post(
      `/customer/saveDrivingLicenseDetails`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        driving_license_no: payload?.driving_license_no,
        full_name: payload?.full_name,
        // dob: payload?.dob,
        // gender: payload?.gender,
        // address: payload?.address,
        // image_path: [],
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
export const BasicDetails1 = async payload => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

  try {
    const response = await API.Post(
      `/customer/saveBasicDetailOne`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        profile_name: payload?.profile_name,
        gender: payload?.gender,
        dob: payload?.Dateofbirth,
        pincode: payload?.pincode,
        state: payload?.state,
        city: payload?.city,
        email: payload?.email,
        address: payload?.address,
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
export const BasicDetails2 = async payload => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

  try {
    const response = await API.Post(
      `/customer/saveBasicDetailTwo`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        father_name: payload.father_name,
        mother_name: payload.mother_name,
        marital_status: payload.marital_status,
        stay_in: payload.stay_in,
        educational_qualification: payload.educational_qualification,
        language_preference: payload.language_preference,
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
export const saveProfessionalInfo = async payload => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

  try {
    const response = await API.Post(
      `/customer/saveProfessionalInfo`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        employment_type: payload?.employment_type,
        monthly_income: payload?.monthly_income,
        salary_receipt: payload?.salary_receipt,
        company: payload?.company,
        industry_type: payload?.industry_type,
        pincode: payload?.pincode,
        state: payload?.state,
        city: payload?.city,
        address: payload?.address,
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
export const saveLoanDetails = async payload => {
  const token = await AsyncStorage.getItem('token');
  const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

  try {
    const response = await API.Post(
      `/customer/saveLoanDetails`,
      {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      },
      {
        loan_amount: payload?.loan_amount,
        loan_purpose: payload?.loan_purpose,
      },
    );
    console.log('response.data', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
    if (error?.response?.data?.status === 0) {
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
    throw error;
  }
};

export const employmentList = async () => {
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

export const salaryReceiptLists = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/salaryReceiptList`, {
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

export const genderList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/genderList`, {
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

export const stateListApi = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/stateList`, {
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

export const cityListApi = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/cityList`, {
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

export const maritalStatusList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/maritalStatusList`, {
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
export const stayInApi = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/stayInList`, {
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
export const callingLanguagePreferenceList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/callingLanguagePreferenceList`, {
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
export const qualificationList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    const response = await API.Get(`/master/qualificationList`, {
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
