import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {
  Header,
  BasicDetailsInput,
  CustomizableDropdown,
  BasicDetailsGenderCard,
  Button,
  BasicDetailsContainerCard,
} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';
import {image} from '../../assets';
import {color, dimension, font} from '../../utility';
import axios from 'axios';
import {BASIC_URL, basicAuthTokenHeader} from '../../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  validateDate,
  validateFields,
  validategender,
} from '../../validation/BasicDetailsScreenvalidation';
import dayjs from 'dayjs';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {savePanCardDetails} from '../../Api/BasicDetailsScreenApi';
import moment from 'moment';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';
import FAQModal from '../../components/FAQComponent/FAQModal';
import {useFocusEffect} from '@react-navigation/native';

const UseDifferentPANScreen = ({navigation, route}) => {
  const {textStorage} = useContext(AppStateContext);
  const [panNum, setPanNum] = useState();
  const [pinCode, setPinCode] = useState();
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState({});
  const [genderList, setGenderList] = useState(null);
  const [date, setDate] = useState('30/10/2022');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [blurredField, setBlurredField] = useState(null);
  const [loanAmount, setLoanAmount] = useState('');

  const [showSpinner, setshowSpinner] = useState(false);
  const [fields, setFields] = useState({
    pan_card_no: '',
    Fullname: '',
    pinCode: '102030',
  });
  const [validationerror, SetValidationerror] = useState({});
  console.log('route diiferent pan', route.params);
  const [issubmit, setIssubmit] = useState(false);

  const handleInputChange = (value, fieldName) => {
    console.log(value, fieldName, 'pan data');
    if (issubmit) {
      SetValidationerror(validateFields({...fields, [fieldName]: value}));
    }

    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
    setShow(false);
  };

  const savePan = async () => {
    setshowSpinner(true);
    const data = {
      pan_card_no: fields?.pan_card_no,
      full_name: fields?.Fullname,
      // "dob":global.Dateofbirth,
    };
    console.log('data', data);
    SetValidationerror(validateFields(fields));
    setIssubmit(true);
    const error = validateFields(fields);
    if (
      fields?.pan_card_no != '' &&
      /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields?.Fullname) &&
      /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(fields?.pan_card_no)
    ) {
      savePanCardDetails(data)
        .then(async res => {
          setshowSpinner(false);
          if (res.status == 1) {
            console.log('savePanCardDetails==', res);
            await AsyncStorage.setItem(
              'navigationCheck',
              JSON.stringify({
                screen: 'PANCardDetailsScreen',
                data: {
                  userDetails: res?.data?.details,
                  loanAmount: route.params?.loanAmount,
                  loanPurpose: route.params?.loanPurpose,
                  incomeM: route.params?.incomeM,
                },
              }),
            );
            navigation.navigate('PANCardDetailsScreen', {
              userDetails: res?.data?.details,
              loanAmount: route.params?.loanAmount,
              loanPurpose: route.params?.loanPurpose,
              incomeM: route.params?.incomeM,
            });
            // setshowSpinner(true)
          }
        })
        .catch(error => {
          setshowSpinner(false);
          console.log(error, 'error');
          if (error?.response?.data?.message) {
            ToastAndroid(error?.response?.data?.message, ToastAndroid.SHORT);
            setshowSpinner(false);
          }
        });
    } else {
      setshowSpinner(false);
      Alert.alert('Please enter valid details');
      //  ToastAndroid("Enter valid detail",ToastAndroid.SHORT)
    }
  };

  const getGender = async () => {
    let token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    try {
      const response = await axios.get(`${BASIC_URL}/master/genderList`, {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      });
      setGenderList(response?.data?.data?.list);
    } catch (error) {
      if (error.response.data?.status === 0) {
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        let amount = await AsyncStorage.getItem('loan_amount');
        let loadDetail = await AsyncStorage.getItem('navigationCheck');
        const loanDetailParse = JSON.parse(loadDetail);
        setLoanAmount(loanDetailParse?.data?.loanAmount);
        console.log(loanDetailParse?.data?.loanAmount, 'vvvvvvvvvvvvvvv');
        console.log(
          'route?.params?.incomeppppppppp,,,,,,,,,,',
          route?.params?.loanPurpose,
        );
        console.log('route?.params?.incomeM,,,,,,,,,,', route?.params?.incomeM);
        navigation.navigate('BasicLoanDetailScreen', {
          loanAmount: loanAmount,
          loanPurpose: route?.params?.loanPurpose,
          incomeM: route?.params?.incomeM,
        });
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  useEffect(() => {
    getGender();
    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   () => {

    //     return true;
    //   },
    // );

    // return () => backHandler.remove();
    // getToken();
  }, []);

  const handleBlur = (fieldName, value) => {
    setBlurredField(fieldName);
    console.log(fieldName, value, 'blur test');
    if (fieldName) {
      SetValidationerror(validateFields({...fields, [fieldName]: value}));
    }
  };
  return (
    <View style={styles.containerStyle}>
      <Header
        backOnPress={() => {
          console.log(
            'route.paramsroute.params UseDifferentPANScreen',
            route.params,
          );

          navigation.navigate('BasicLoanDetailScreen', {
            loanAmount: loanAmount,
            loanPurpose: route.params?.loanPurpose,
            incomeM: route.params?.incomeM,
          });
        }}
        iconUri={image.infoIcon}
        label={textStorage['UsedifferentpanScreen.your_pan_details']}
        onPress={() => {
          setShowModal(true);
        }}
      />
      <ScrollView>
        <Spinner visible={showSpinner} />
        {showModal ? (
          <FAQModal
            modalVisible={showModal}
            onPressclose={() => {
              setShowModal(false);
            }}
            categoryName={'pan_card'}
          />
        ) : null}
        <View style={styles.baseContainerStyle}>
          <BasicDetailsInput
            placeholder={textStorage['BasicdetailsScreen.pan_full_name']}
            iconUri={image.userGreyIcon}
            data={fields.Fullname}
            imageClick={() => {
              console.log('>');
            }}
            setInputValue={value => handleInputChange(value, 'Fullname')}
            onBlur={() => handleBlur('Fullname', fields.Fullname)}
          />
          {/* <Text
            style={[
              styles.errorText,
              {color: 'gray', fontSize: responsiveFontSize(1.4)},
            ]}>
            {''}
          </Text> */}
          <Text style={styles.errorText}>
            {blurredField === 'Fullname' && validationerror?.Fullname}
          </Text>
          <BasicDetailsInput
            placeholder={textStorage['UsedifferentpanScreen.pan_number']}
            iconUri={image.drivingLicenseGreyIcon}
            autoCapitalizeL={'characters'}
            capitalize={true}
            data={fields.pan_card_no}
            maxLength={10}
            imageClick={() => {
              console.log('>');
            }}
            setInputValue={value => handleInputChange(value, 'pan_card_no')}
            type="pan_card_no"
            onBlur={() => handleBlur('pan_card_no', fields.pan_card_no)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'pan_card_no' && validationerror?.pan_card_no}
          </Text>
          {/* <CustomizableDropdown placeholder={'Date of birth'} /> */}
          {/* <View onTouchEnd={showDatepicker}> */}
          {/* <BasicDetailsContainerCard>
            <View
              onTouchEnd={showDatepicker}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {date ? (
                <Text style={styles.dateShoweStyle}>{date}</Text>
              ) : (
                <Text style={styles.dateStyle}>Date Of Birth</Text>
              )}
              <View
                style={{
                  height: dimension.width * 0.09,
                  width: dimension.width * 0.09,
                  backgroundColor: color.wildSand2,
                  borderTopLeftRadius: 2,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginLeft: 10,
                }}>
                <Image source={image.drivingLicenseGreyIcon} />
              </View>
            </View>
          </BasicDetailsContainerCard>
          <Text style={styles.errorText}>{validationdateerror?.date}</Text> */}
          {/* </View> */}
          {/* <Button onPress={showDatepicker} label="Show date picker!" /> */}
          {/* {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fields.date ? new Date(fields.date) : new Date()} // Initialize to current date if fields.dob is null
              mode={mode}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                if (event.type === 'set') {
                  // Convert the selected date to a dayjs object
                  const date = dayjs(selectedDate);

                  // Format the date in "DD-MM-YYYY" format
                  const formattedDate = date.format('DD/MM/YYYY');

                  if (issubmit) {
                    SetValidationdateerror(validateDate(formattedDate));
                  }

                  setDate(formattedDate); // Update the date state if needed
                }
                setShow(false); // Hide the DateTimePicker
              }}
            />
          )} */}

          {/* <BasicDetailsGenderCard data={genderList} setGender={handlegender} /> */}
          {/* <Text style={styles.errorText}>{gendererror?.gender}</Text> */}
          {/* <BasicDetailsInput
            placeholder={'Pin code ( current address )'}
            iconUri={image.pincodeGreyIcon}
            setInputValue={value => handleInputChange(value, 'pinCode')}
          /> */}
          {/* <Text style={styles.errorText}>{validationerror?.pinCode}</Text> */}
          <Text style={styles.labelTextStyle}>
            {textStorage['PandetailsScreen.don’t_have_pan']}{' '}
            <Text
              style={styles.labelBoldTextStyle}
              onPress={() => navigation.navigate('DontHavePANTopTabNavigator')}>
              {textStorage['PandetailsScreen.click_here']}{' '}
            </Text>{' '}
          </Text>

          <Button
            label={textStorage['UsedifferentpanScreen.continue']}
            onPress={() => savePan()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  baseContainerStyle: {
    flex: 1,
    padding: 20,
  },
  buttonStyle: {
    margin: 20,
  },
  errorText: {
    color: color.errorColor,
    marginBottom: 15,
    marginTop: -20,
  },
  inputIconContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateStyle: {
    flex: 1,
    fontSize: 14,
    fontFamily: font.soraRegular,
    // color: color.black,
  },
  dateShoweStyle: {
    flex: 1,
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    backgroundColor: color.wildSand2,
    borderTopLeftRadius: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'left',
    marginBottom: responsiveScreenWidth(8),
  },
  labelBoldTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.grenadier,
  },
});

export {UseDifferentPANScreen};
