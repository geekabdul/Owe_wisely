import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import {image} from '../../assets';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import {
  BasicDetailsAmountSelectorCard,
  BasicDetailsContainerCard,
  BasicDetailsEmploymentTypeCard,
  BasicDetailsInput,
  BasicDetailsProgressComponent,
  BasicDetailsSalarySourceCard,
  Button,
  CustomizableDropdown,
  Header,
  ProfileDetailsHouseTypeCard,
} from '../../components';
import {color} from '../../utility';
import {BASIC_URL, basicAuthTokenHeader} from '../../libs/apiConfig';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mainApi} from '../../libs/Config';
import {
  validateValues,
  validateemploymentTypeList,
  validatesalaryReceipt,
} from '../../validation/BasicDetailsScreenvalidation';
import {
  BasicDetails1,
  maritalStatusList,
  qualificationList,
  callingLanguagePreferenceList,
  stateListApi,
  BasicDetails2,
  stayInApi,
} from '../../Api/BasicDetailsScreenApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import FAQModal from '../../components/FAQComponent/FAQModal';
import {stayValidateValues} from '../../validation/PersonalInformationScreenvalidation';
import Spinner from 'react-native-loading-spinner-overlay';

const BasicDetailsScreen2 = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [stay, setStay] = useState('');
  const [stayId, setStayId] = useState('');
  const [showSpinner, setshowSpinner] = useState(false);
  const [isBackCall, setisBackCall] = useState(false);
  const [stayerror, setStayerror] = useState();
  const [maritialStatus, setmaritialStatus] = useState('');
  const [fields, setFields] = useState({
    FatherName: '',
    MotherName: '',
    MaritalStatus: '',
    StayIn: '',
    Educationqualification: '',
    Languagepreference_Calling: '',
  });
  const [validationerror, SetValidationerror] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [issubmit, setIssubmit] = useState(false);
  const [maritialStatusList, setmaritialList] = useState([]);
  const [maritialStatussId, setmaritialId] = useState('');
  const [stayInList, setstayInList] = useState([]);
  const [languageList, setlanguageList] = useState([]);
  const [languageId, setlanguageID] = useState('');
  const [educationList, seteducationList] = useState([]);
  const [educationId, seteducationId] = useState('');
  const [blurredField, setBlurredField] = useState(null);

  // handle input
  const handleInputChange = (value, fieldName) => {
    if (blurredField === fieldName) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  const handleInputChangeStay = (value, fieldName) => {
    // alert(JSON.stringify(value))
    if (issubmit) {
      setStayerror(stayValidateValues(value));
      setStay(value);
    }
    setStay(value);
    setFields(prevState => ({
      ...prevState,
      ['StayIn']: value,
    }));
  };
  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        navigation.navigate('BasicDetailsScreen1');
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  useEffect(async () => {
    setshowSpinner(true);
    callmaritalStatusListApi();
    callstayInListApi();
    callingLanguagePreferenceListApi();
    callqualificationListApi();
    getDataOnBack();
  }, []);

  const getDataOnBack = async () => {
    const isBack = await AsyncStorage.getItem('isBack');
    console.log(isBack);
    if (isBack === 'true') {
      setisBackCall(true);
      let basic_detail_two = await AsyncStorage.getItem('basic_detail_two');

      console.log('professional_info', basic_detail_two);
      let basic_detailTwo = JSON.parse(basic_detail_two);
      console.log('basic_detailTwo:>>>>>>>>>>>>>>', basic_detailTwo);
      if (basic_detailTwo != null) {
        setFields(prevState => ({
          ...prevState,
          ['FatherName']: basic_detailTwo.father_name,
          ['MotherName']: basic_detailTwo.mother_name,
          ['MaritalStatus']: basic_detailTwo.marital_status,
          ['StayIn']: basic_detailTwo.stay_in,
          ['Educationqualification']:
            basic_detailTwo.educational_qualification.name,
          ['Languagepreference_Calling']:
            basic_detailTwo.language_preference.name,
        }));
        let data = basic_detailTwo.marital_status;
        let data1 = data.slice(0, 1).toUpperCase() + data.slice(1);
        handleInputChange(data1, 'MaritalStatus');
        setmaritialId(basic_detailTwo.marital_status);
        setmaritialStatus(data1);
        seteducationId(basic_detailTwo.educational_qualification.id);
        setlanguageID(basic_detailTwo.language_preference.id);
        console.log('fields', JSON.stringify(fields));
      }
    }
  };
  // handle save from details
  const saveBasicDetails = async () => {
    setshowSpinner(true);
    const basicData = {
      father_name: fields.FatherName,
      mother_name: fields.MotherName,
      marital_status: maritialStatussId,
      stay_in: isBackCall ? fields.StayIn : stayId,
      educational_qualification: educationId,
      language_preference: languageId,
    };
    const error = validateValues(fields);
    console.log('BAsic error', JSON.stringify(error));

    SetValidationerror(validateValues(fields));
    setIssubmit(true);

    if (
      maritialStatussId != '' && isBackCall
        ? fields.StayIn
        : stayId != '' && educationId != '' && languageId != ''
    ) {
      if (
        /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.FatherName) &&
        /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.MotherName)
      ) {
        BasicDetails2(basicData)
          .then(async res => {
            if (res) {
              console.log('res :>> ', res);
              setshowSpinner(false);
              await AsyncStorage.setItem(
                'basic_detail_two',
                JSON.stringify(res?.data?.details?.basic_detail_two),
              );
              await AsyncStorage.setItem(
                'navigationCheck',
                JSON.stringify({
                  screen: 'BasicProfessionalDetailScreen',
                  data: {
                    incomeM: res?.data?.details?.professional_info
                      ?.monthly_income
                      ? res?.data?.details?.professional_info?.monthly_income
                      : '',
                  },
                }),
              );

              navigation.navigate('BasicProfessionalDetailScreen', {
                incomeM: res?.data?.details?.professional_info?.monthly_income
                  ? res?.data?.details?.professional_info?.monthly_income
                  : '',
              });
            }
          })
          .catch(error => {
            console.log('res :>> ', error);
            setshowSpinner(false);
            if (error?.response?.data?.message) {
              Alert.alert(error?.response?.data?.message);
            }
          });
      } else {
        setshowSpinner(false);
      }
    } else {
      setshowSpinner(false);
      Alert.alert('Please Fill Below Details');
    }
  };

  const callqualificationListApi = () => {
    qualificationList()
      .then(res => {
        console.log('callqualificationListApi', JSON.stringify(res.data.list));
        seteducationList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        if (error.response.data?.status === 0) {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('user');
          navigation.navigate('LoginScreen');
          setshowSpinner(false);
        }
      });
  };
  // get language list api
  const callingLanguagePreferenceListApi = () => {
    callingLanguagePreferenceList()
      .then(res => {
        console.log(JSON.stringify(res.data.list));
        setlanguageList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        if (error.response.data?.status === 0) {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('user');
          navigation.navigate('LoginScreen');
          setshowSpinner(false);
        }
      });
  };
  // get maritial list api
  const callmaritalStatusListApi = () => {
    maritalStatusList()
      .then(res => {
        console.log(JSON.stringify(res.data.list));
        setmaritialList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        if (error.response.data?.status === 0) {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('user');
          navigation.navigate('LoginScreen');
          setshowSpinner(false);
        }
      });
  };
  // get stay list api
  const callstayInListApi = async () => {
    stayInApi()
      .then(res => {
        // console.log('setstayInList:::::', JSON.stringify(res.data.list));
        setstayInList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        if (error.response.data?.status === 0) {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('user');
          navigation.navigate('LoginScreen');
          setshowSpinner(false);
        }
      });
  };

  const handleBlur = (fieldName, value) => {
    setBlurredField(fieldName);
    console.log(fieldName, value, 'blur test');
    if (fieldName) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        // backOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        backOnPress={() => navigation.navigate('BasicDetailsScreen1')}
        iconUri={image.infoIcon}
        // iconUri2={image.notificationLogo}
        onPress={() => {
          setShowModal(true);
        }}
        label={textStorage['BasicdetailsScreen.basic_details']}
      />
      <ScrollView>
        <Spinner visible={showSpinner} />
        <BasicDetailsProgressComponent isActive={1} textStorage={textStorage} />
        {showModal ? (
          <FAQModal
            modalVisible={showModal}
            onPressclose={() => {
              setShowModal(false);
            }}
            categoryName={'basic_detail'}
          />
        ) : null}
        <View style={styles.baseContainerStyle}>
          <BasicDetailsInput
            placeholder={textStorage['PersonalInformationScreen.father’s_name']}
            iconUri={image.userGreyIcon}
            data={fields.FatherName}
            imageClick={() => {
              console.log('>');
            }}
            setInputValue={value => handleInputChange(value, 'FatherName')}
            onBlur={() => handleBlur('FatherName', fields.FatherName)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'FatherName' && validationerror?.FatherName}
          </Text>

          <BasicDetailsInput
            data={fields.MotherName}
            imageClick={() => {
              console.log('>');
            }}
            placeholder={textStorage['PersonalInformationScreen.mother’s_name']}
            iconUri={image.userGreyIcon}
            setInputValue={value => handleInputChange(value, 'MotherName')}
            onBlur={() => handleBlur('MotherName', fields.MotherName)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'MotherName' && validationerror?.MotherName}
          </Text>

          <CustomizableDropdown
            placeholder={
              textStorage['PersonalInformationScreen.marital_status']
            }
            iconUri={image.maritalIcon}
            onChange={value => {
              handleInputChange(value?.name, 'MaritalStatus');
              setmaritialId(value?.id);
              setmaritialStatus(value?.name);
            }}
            tintColor={true}
            value={maritialStatus}
            data={maritialStatusList}
            onBlur={() => handleBlur('MaritalStatus', fields.MaritalStatus)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'MaritalStatus' &&
              !fields.MaritalStatus &&
              validationerror?.MaritalStatus}
          </Text>
          {/* <CustomizableDropdown
            placeholder={
              textStorage['PersonalInformationScreen.i_stay_in']
            }
            onChange={value => {
              handleInputChangeStay(value.id, 'StayIn');
              setStayId(value?.id);
              console.log(JSON.stringify(value))
            }}
            value={fields.StayIn}
            data={stayInList}
          /> */}
          <ProfileDetailsHouseTypeCard
            setInputValue={value => {
              handleInputChangeStay(value.id, 'StayIn');
              setStayId(value?.id);
              console.log(JSON.stringify(value));
            }}
            selected={fields.StayIn}
            textStorage={textStorage}
            data={stayInList}
          />
          <Text style={styles.errorText}>
            {blurredField === 'StayIn' && stayerror?.StayIn}
          </Text>

          <CustomizableDropdown
            dropdownPosition={'top'}
            placeholder={
              textStorage['PersonalInformationScreen.education_qualification']
            }
            tintColor={true}
            onChange={value => {
              handleInputChange(value?.name, 'Educationqualification');
              seteducationId(value.id);
            }}
            iconUri={image.graduationIcon}
            value={fields?.Educationqualification}
            data={educationList}
            onBlur={() =>
              handleBlur(
                'Educationqualification',
                fields.Educationqualification,
              )
            }
          />
          <Text style={styles.errorText}>
            {blurredField === 'Educationqualification' &&
              !fields.Educationqualification &&
              validationerror?.Educationqualification}
          </Text>
          <CustomizableDropdown
            dropdownPosition={'top'}
            placeholder={
              textStorage[
                'PersonalInformationScreen.language_preference_calling'
              ]
            }
            tintColor={true}
            iconUri={image.translate}
            onChange={value => {
              handleInputChange(value?.name, 'Languagepreference_Calling');
              setlanguageID(value.id);
            }}
            value={fields?.Languagepreference_Calling}
            data={languageList}
            onBlur={() =>
              handleBlur(
                'Languagepreference_Calling',
                fields.Languagepreference_Calling,
              )
            }
          />
          <Text style={styles.errorText}>
            {blurredField === 'Languagepreference_Calling' &&
              !fields.Languagepreference_Calling &&
              validationerror?.Languagepreference_Calling}
          </Text>

          <Button
            label={textStorage['BasicdetailsScreen.Continue']}
            onPress={() => {
              // isBackCall?
              // navigation.navigate("BasicProfessionalDetailScreen")
              // :
              saveBasicDetails();
            }}
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
    padding: 20,
  },
  errorText: {
    color: color.errorColor,
    marginBottom: 15,
    marginTop: -20,
  },
  commonRowStyleWithSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputSubcontainerStyle: {
    width: '48%',
  },
});

export {BasicDetailsScreen2};
