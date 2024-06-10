import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Modal,
  FlatList,
  BackHandler,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect} from '@react-navigation/native';
import axios, {all} from 'axios';
import {BASIC_URL, basicAuthHeader} from '../../libs/apiConfig';
import {validateValues} from '../../validation/Auth';
import {Button, LoginInput} from '../../components';
import {color, dimension, font, style} from '../../utility';
import {image} from '../../assets';
import {requestOtp} from '../../Api/LoginScreenApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {getStaticApi} from '../../Api/StaticApi';
import RNAccountManager from 'react-native-account-manager';
import DeviceNumber from 'react-native-device-number';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [validationerror, SetValidationerror] = useState({});
  const [showSpinner, setshowSpinner] = useState(false);
  const [ifCancle, setifCancle] = useState(false);
  const [tcondition, settcondition] = useState('');
  const [privacyploicy, setPrivacyPolicy] = useState('');
  const [issubmit, setIssubmit] = useState(false);

  const [phoneList, setphoneList] = useState([]);
  const [fields, setFields] = useState({
    email: '',
    phone: '',
    // phone: '8554959681',
    // phone: '9878766765',
  }); // Initialize with empty values
  // phoneNumber:9878766765
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));
  //handle input all
  const [aboutStaticList, setaboutStaticList] = useState([]);
  useEffect(() => {
    // callApi();
    callApi();
    // getPhoneno()
    // requestForPermission();
    // requestForPermission(1)
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      callApi();

      const backAction = async () => {
        BackHandler.exitApp();

        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  const [phone, setPhone] = useState('');

  const requestForPermission = async flag => {
    try {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
        ];
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        console.log(
          'oks',
          granted[PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE],
          granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
          granted[PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS],
          granted[PermissionsAndroid.PERMISSIONS.READ_SMS],
          granted[PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS],
        );
        if (
          granted[PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_SMS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          // if (flag === 0) {
          //   getPhoneno();
          // }
          // else {
          //   getEmailIds();
          // }
        }
      }
    } catch (error) {
      console.log('Error in getting phone no', error);
    }
  };

  const getPhoneno = async () => {
    try {
      console.log('executed');
      DeviceNumber.get()
        .then(res => {
          console.log('mobileNumber', res);
          setPhone(res.mobileNumber);
          var phone = res.mobileNumber;
          setFields(prevState => ({
            ...prevState,
            ['phone']: phone.slice(3, 13),
          }));
        })
        .catch(err => {
          console.log('Error in getting phone no', err);
        });
    } catch (error) {
      console.log('Error in getting phone no', error);
    }
  };

  const setName = (item, index) => {
    var data = {id: index, name: item};
    return data;
  };

  const callApi = async () => {
    setshowSpinner(true);
    await getStaticApi()
      .then(async res => {
        console.log('setaboutStaticList', res.data);
        setaboutStaticList(res.data.list);
        setshowSpinner(false);
        // setModalVisible(true);
      })
      .catch(error => {
        console.log('error :>> ', error);
        setshowSpinner(false);
      });
  };

  const handleInputChange = (value, fieldName) => {
    if (issubmit) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  // NOTE: call API to request otp
  const handleRequestOtp = async () => {
    setshowSpinner(true);
    SetValidationerror(validateValues(fields));
    setIssubmit(true);
    const error = validateValues(fields);
    if (Object.keys(error) == 0) {
      requestOtp(fields)
        .then(async res => {
          setshowSpinner(false);
          await AsyncStorage.setItem('phone', fields?.phone.toString());
          navigation.navigate('OTPScreen', {
            otp: res?.data?.otp,
            email: fields?.email,
            phoneNo: fields?.phone,
          });
        })
        .catch(error => {
          if (
            error?.response?.data?.message ===
            'OTP limit exceeded, Your number is blocked for next 24 hours'
          ) {
            Alert.alert('OTP limit exceeded, Try Again After 24 hours');
          } else if (error?.response?.data?.data?.errors?.email) {
            Alert.alert(error?.response?.data?.data?.errors?.email);
          } else if (error?.response?.data?.data?.errors?.phone) {
            Alert.alert(error?.response?.data?.data?.errors?.phone);
          }
        });
    }
  };

  console.log(aboutStaticList[1], 'yyyyyyyyy');
  return (
    <View style={styles.containerStyle}>
      {/* top text */}
      <View
        style={[
          styles.headerContainerStyle,
          style.commonRowStyleWithSpaceBetween,
          // {backgroundColor: 'lightblue'},
        ]}>
        <Spinner />
        <Text style={styles.loginHeaderTextStyle}>
          <Text style={styles.loginTextStyle}>
            {textStorage['LoginScreen.login']}{' '}
          </Text>{' '}
          {textStorage['LoginScreen.or']} {'\n'}
          {textStorage['LoginScreen.create']} {'\n'}
          {textStorage['LoginScreen.new']}{' '}
        </Text>
        <View style={styles.imageBoxStyle}>
          <Image
            resizeMode={'contain'}
            style={style.commonImageStyle}
            source={image.loginPageHeaderImage}
          />
        </View>
      </View>

      {/* middle text */}
      <View style={[styles.baseContainerStyle]}>
        {/* <TouchableOpacity
          onPress={() => {
            getEmailIds();
          }}>
          <LoginInput
            editableL={false}
            onChangeInput={value => handleInputChange(value, 'email')}
            inputValue={fields.email}
            label={'Email Address'}
            iconRight={image.mailGreyIcon}
            placeholder="Enter mail id here"
            // setInput={setEmail}
          />
        </TouchableOpacity>
        <Text style={styles.errorText}>{validationerror?.email}</Text> */}
        {/* 
<Text style={styles.errorText}>{numberToWords(125480)}</Text> */}
        <TouchableOpacity
          onPress={() => {
            getPhoneno();
          }}>
          <LoginInput
            editableL={true}
            isPhone
            onChangeInput={value => handleInputChange(value, 'phone')}
            inputValue={fields.phone}
            label={textStorage['LoginScreen.phone_number']}
            iconRight={image.phoneGreyIcon}
            onFocus={() => getPhoneno()}
            placeholder={textStorage['LoginScreen.enter_mobile_here']}
            // inputValue={setPhoneNo}
            // onFocus={''}
          />
        </TouchableOpacity>
        <Text style={styles.errorText}>{validationerror?.phone}</Text>
        <Button
          style={styles.buttonStyle}
          label={textStorage['LoginScreen.send_otp']}
          // label={'Send OTP'}
          onPress={handleRequestOtp}
        />
        <Text style={styles.facingTroubleTextStyle}>
          {textStorage['LoginScreen.facing_trouble']}{' '}
          <Text style={styles.facingTroubleBoldTextStyle}>
            {textStorage['LoginScreen.call_us']}{' '}
          </Text>
        </Text>
      </View>

      {/* bottom text */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          // backgroundColor: 'lightgrey',
        }}>
        <Text style={styles.agreeingTermsTextStyle}>
          {textStorage['LoginScreen.by_signing']} {'\n'}
          <Text
            onPress={() => {
              navigation.navigate('AboutLoginScreen', {
                data: aboutStaticList[0].value,
                name: aboutStaticList[0].name,
              });
            }}
            style={styles.termsAndConditionTextStyle}>
            {textStorage['LoginScreen.terms_condition']}
          </Text>{' '}
          &{' '}
          <Text
            onPress={() => {
              navigation.navigate('AboutLoginScreen', {
                data: aboutStaticList[0].value,
                name: aboutStaticList[0].name,
              });
            }}
            style={styles.termsAndConditionTextStyle}>
            {textStorage['LoginScreen.privacy_policy']}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  spacerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainerStyle: {
    // flex: 1.5,
    paddingLeft: 20,
  },
  imageBoxStyle: {
    height: dimension.height * 0.3,
    width: dimension.width * 0.4,
    alignSelf: 'flex-end',
    marginRight: -5,
  },
  loginHeaderTextStyle: {
    fontSize: dimension.width * 0.07,
    fontFamily: font.soraBold,
    color: color.black,
    alignSelf: 'flex-end',
  },
  loginTextStyle: {
    color: color.grenadier,
  },
  baseContainerStyle: {
    // flex: 3,
    marginTop: 80,
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingTop: 40,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 30,
  },
  facingTroubleTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    alignSelf: 'center',
  },
  facingTroubleBoldTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  agreeingTermsTextStyle: {
    fontSize: 14,
    fontFamily: font.soraMedium,
    color: color.black,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  termsAndConditionTextStyle: {
    fontSize: 14,
    fontFamily: font.soraMedium,
    color: color.grenadier,
  },
  errorText: {
    color: color.errorColor,
    marginBottom: 15,
  },
});

export {LoginScreen};
