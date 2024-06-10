import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {Button, OTPBox} from '../../components';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import axios from 'axios';
import {BASIC_URL, basicAuthHeader} from '../../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showNotification} from '../../libs/notification.android';
import AutoDetectIndicator from '../../components/OTPScreenComponent/AutoDetectIndicator';
import {AppStateContext} from '../../providers/AuthContextProvider';

const OTPScreen = ({navigation, route}) => {
  const {textStorage} = useContext(AppStateContext);
  const {otp, email, phoneNo} = route.params;
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [sendOtp, setsendOtp] = useState(false);
  const [countTimer, setcountTimer] = useState(30);

  const isButtonEnabled = otpArray?.includes('');
  const [loading, setLoading] = useState(true);

  let timer = 30;
  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }

        if (Platform.OS === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const handleBack = () => {
    navigation.navigate('LoginScreen');
  };

  // NOTE: Verify OTP
  const verifyOtp = async () => {
    // navigation.navigate('BasicDetailsScreen');
    const data = {
      email: email,
      phone: phoneNo,
      password: otpArray.join(''),
    };
    try {
      const response = await axios.post(`${BASIC_URL}/verifyOtp`, data, {
        headers: basicAuthHeader,
      });
      console.log(response?.data?.data, 'verifyOtp response');
      // console.log(response?.data?.data?.access_token, 'Token');
      console.log(
        'response?.data?.data?.access_token :>> ',
        response?.data?.data?.access_token,
      );
      var userData = response?.data?.data?.user;
      //  alert(JSON.stringify(userData.email))
      if (userData?.email != null) {
        // alert("IF")
        await AsyncStorage.setItem('token', response?.data?.data?.access_token);
        await AsyncStorage.setItem('user', JSON.stringify(response?.data));
        await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
        await AsyncStorage.setItem('email', response?.data?.data?.user?.email);
        await AsyncStorage.setItem('phone', response?.data?.data?.user?.phone);

        if (userData.basic_detail_one !== null) {
          await AsyncStorage.setItem(
            'username',
            userData?.basic_detail_one?.profile_name,
          );
          await AsyncStorage.setItem('isBack', 'true');
          await AsyncStorage.setItem(
            'basic_detail_one',
            JSON.stringify(userData?.basic_detail_one),
          );
          await AsyncStorage.setItem(
            'basic_detail_two',
            JSON.stringify(userData?.basic_detail_two),
          );
          await AsyncStorage.setItem(
            'professional_info',
            JSON.stringify(userData?.professional_info),
          );
          await AsyncStorage.setItem(
            'loan_amount',
            JSON.stringify(userData?.loan_amount),
          );
          await AsyncStorage.setItem(
            'loan_purpose',
            JSON.stringify(userData?.loan_purpose),
          );
          await AsyncStorage.setItem(
            'pan_card_details',
            JSON.stringify(userData?.pan_card_details),
          );
        }

        //  navigation.navigate('BasicLoanDetailScreen', {
        //     loanAmount: userData?.loan_amount==="0.000"?"10000":userData?.loan_amount,
        //     loanPurpose: userData?.loan_purpose===undefined?"":userData?.loan_purpose,
        //     incomeM:
        //       userData?.professional_info?.monthly_income === undefined
        //         ? 0.00
        //         : userData?.professional_info?.monthly_income,
        //   })
        // navigation.navigate('BasicDetailsScreen1')

        // navigation.navigate('BasicDetailsScreen2')

        navigation.navigate('BasicDetailsScreen1');
        userData.basic_detail_one === null
          ? navigation.navigate('BasicDetailsScreen1')
          : userData.basic_detail_two === null
          ? navigation.navigate('BasicDetailsScreen2')
          : userData.professional_info_filled == 0
          ? navigation.navigate('BasicProfessionalDetailScreen', {
              incomeM:
                userData?.professional_info?.monthly_income === undefined
                  ? 0.0
                  : userData?.professional_info?.monthly_income,
            })
          : userData.loan_purpose === null
          ? navigation.navigate('BasicLoanDetailScreen', {
              loanAmount:
                userData?.loan_amount === '0.000'
                  ? '10000'
                  : userData?.loan_amount,
              loanPurpose:
                userData?.loan_purpose === undefined
                  ? ''
                  : userData?.loan_purpose,
              incomeM:
                userData?.professional_info?.monthly_income === undefined
                  ? 0.0
                  : userData?.professional_info?.monthly_income,
            })
          : userData.pan_card_details === null
          ? navigation.navigate('UseDifferentPANScreen', {
              loanAmount: userData?.loan_amount,
              loanPurpose: userData?.loan_purpose,
              incomeM:
                userData?.professional_info?.monthly_income === undefined
                  ? 0.0
                  : userData?.professional_info?.monthly_income,
            })
          : userData.cibil_score === null
          ? navigation.navigate('CheckEligibilityScreen', {
              data: userData.pan_card_details,
            })
          : navigation.navigate('DrawerNavigator');
      } else {
        // alert("Else")
        // alert(JSON.stringify(response))
        await AsyncStorage.setItem('isBack', 'false');
        await AsyncStorage.setItem('token', response?.data?.data?.access_token);
        navigation.navigate('BasicDetailsScreen1');
      }
    } catch (error) {
      console.log(error?.response?.data?.message, 'verifyOtp Error');
      Alert.alert(error?.response?.data?.message);
    }
  };

  // NOTE: Resend OTP
  const resendOTP = async () => {
    setsendOtp(true);
    const URL = `${BASIC_URL}/requestOtp`;
    const data = {email: email, phone: phoneNo};
    const body = {headers: basicAuthHeader};

    try {
      const response = await axios.post(URL, data, body);
      await callTimer(response?.data?.data?.otp);
      console.log(response?.data?.data?.otp, 'requestOtp response');
      showNotification(`Your OTP for signing up with Mylo is ${otp}`, `${otp}`);
      setTimeout(() => {
        setOtpArray(response?.data?.data?.otp.toString().split(''));
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error?.response?.data, 'requestOtp Error');
      if (
        error?.response?.data?.message ===
        'OTP limit exceeded, Your number is blocked for next 24 hours'
      ) {
        Alert.alert('OTP limit exceeded, Try Again After 24 hours');
      }
    }
  };

  const callTimer = async otp => {
    console.log('1', timer);
    const timerId = setInterval(async () => {
      if (timer == 0) {
        setOtpArray(otp.toString().split(''));
        setsendOtp(false);
        timer = 30;
        setcountTimer(30);
        setsendOtp(false);
        clearInterval(timerId);
      } else if (timer > 0) {
        console.log('2', timer);
        timer = timer - 1;
        console.log('3', timer);
        setcountTimer(timer);
      }
    }, 1000);
    return () => {
      console.log('1234', tempcount);
      clearInterval(timerId);
    };
  };

  useEffect(() => {
    showNotification(`Your OTP for signing up with Mylo is ${otp}`, `${otp}`);
    setTimeout(() => {
      setOtpArray(otp.toString().split(''));
      setLoading(false);
    }, 500);
  }, [otp]);

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.imageStyle}
        onPress={handleBack}>
        <Image source={image.backArrow} />
      </TouchableOpacity>
      <View style={styles.imageBoxStyle}>
        <Image
          resizeMode={'contain'}
          style={style.commonImageStyle}
          source={image.owlOtpImage}
        />
        {/* <View style={styles.timerContainerStyle}>
        <Image
          resizeMode={'contain'}
          style={style.commonImageStyle1}
          source={image.owlOtpImage}
        />
        </View> */}
      </View>
      <View>
        <Text style={styles.otpVerificationCodeLabelTextStyle}>
          {textStorage['OtpScreen.otp_verification_code']}
        </Text>
        <Text style={styles.verificationCodeSentTextStyle}>
          We have sent a one time password to {route.params.phoneNo}.
        </Text>
        <Text style={styles.verificationCodeSentTextStyle}>
          {textStorage['OtpScreen.otp_will_be_auto_verified_in_a_moment']}
        </Text>
      </View>
      <View style={styles.baseContainerStyle}>
        <View style={style.commonRowStyleWithSpaceBetween}>
          {[
            firstTextInputRef,
            secondTextInputRef,
            thirdTextInputRef,
            fourthTextInputRef,
            fifthTextInputRef,
            sixthTextInputRef,
            ,
          ].map((textInputRef, index) => (
            <OTPBox
              value={otpArray[index]}
              onKeyPress={onOtpKeyPress(index)}
              onChangeText={onOtpChange(index)}
              keyboardType={'numeric'}
              maxLength={1}
              refCallback={refCallback(textInputRef)}
              key={index}
            />
          ))}
        </View>
        {!loading ? (
          <Button
            isButtonEnabled={isButtonEnabled}
            style={styles.buttonStyle}
            label={textStorage['OtpScreen.verify']}
            onPress={() => verifyOtp()}
          />
        ) : (
          <AutoDetectIndicator size={24} />
        )}
        <View>
          {sendOtp ? (
            <View style={{}}>
              <Text style={styles.didntReceiveOTPTextStyle}>
                {textStorage['OtpScreen.otp_sent']}
              </Text>
              <Text style={styles.clickHereStyle}>
                {textStorage['OtpScreen.you_will_receive_otp_in']} {countTimer}{' '}
                {textStorage['OtpScreen.seconds']}
              </Text>
            </View>
          ) : (
            <View style={{}}>
              <Text style={styles.didntReceiveOTPTextStyle}>
                {textStorage['OtpScreen.didn’t_receive_the_otp']}
              </Text>
              <Text style={styles.clickHereStyle} onPress={resendOTP}>
                {textStorage['OtpScreen.click_here_to']}{' '}
                <Text style={styles.resendTextStyle}>
                  {textStorage['OtpScreen.resend']}
                </Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  imageStyle: {
    marginTop: 20,
    marginLeft: 20,
    // backgroundColor: 'red',
  },
  imageBoxStyle: {
    height: dimension.height * 0.4,
    width: dimension.width * 0.8,
    alignSelf: 'center',
  },
  otpVerificationCodeLabelTextStyle: {
    fontSize: dimension.width * 0.05,
    fontFamily: font.soraBold,
    color: color.black,
    alignSelf: 'center',
  },
  verificationCodeSentTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'center',
    padding: 3,
  },
  baseContainerStyle: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  buttonStyle: {
    marginTop: 28,
  },
  didntReceiveOTPTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    alignSelf: 'center',
    marginTop: 80,
  },
  clickHereStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    alignSelf: 'center',
  },
  resendTextStyle: {
    color: color.grenadier,
  },
  timerContainerStyle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '42%',
    left: '50%',
    backgroundColor: 'red',
  },
  timerTextStyle: {
    fontSize: 40,
    fontFamily: font.soraBold,
    color: color.black,
  },
  secondsLeftTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.gray,
  },
});

export {OTPScreen};
