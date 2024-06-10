import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import {image} from '../../assets';
import {
  BasicDetailsInput,
  Button,
  CustomizableDropdown,
  Header,
  ProfileDetailsHouseTypeCard,
  ProfileDetailsProgressBar,
} from '../../components';
import {color, style} from '../../utility';
import {
  stayValidateValues,
  validateValues,
} from '../../validation/PersonalInformationScreenvalidation';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {
  BasicDetails1,
  maritalStatusList,
  qualificationList,
  callingLanguagePreferenceList,
  stateListApi,
  BasicDetails2,
  stayInApi,
} from '../../Api/BasicDetailsScreenApi';
import FAQModal from '../../components/FAQComponent/FAQModal';
import Spinner from 'react-native-loading-spinner-overlay';

const PersonalInformationScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [stay, setStay] = useState('');
  const [validationerror, SetValidationerror] = useState({});
  const [stayerror, setStayerror] = useState();
  const [issubmit, setIssubmit] = useState(false);
  const [stayId, setStayId] = useState('');
  const [showSpinner, setshowSpinner] = useState(false);
  const [maritialStatusList, setmaritialList] = useState([]);
  const [maritialStatussId, setmaritialId] = useState();
  const [stayInList, setstayInList] = useState([]);
  const [languageList, setlanguageList] = useState([]);
  const [languageId, setlanguageID] = useState('');
  const [educationList, seteducationList] = useState([]);
  const [educationId, seteducationId] = useState('');
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));

  const [fields, setFields] = useState({
    FatherName: '',
    MotherName: '',
    MaritalStatus: '',
    Pincode: '',
    State: '',
    City: '',
    Currentaddress: '',
    Educationqualification: '',
    Languagepreference_Calling: '',
  });

  const data = [
    {label: 'married', value: 'married'},
    {label: 'unmarried', value: 'unmarried'},
  ];

  const data1 = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];

  useEffect(async () => {
    setshowSpinner(true);
    callmaritalStatusListApi();
    callstayInListApi();
    callingLanguagePreferenceListApi();
    callqualificationListApi();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

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
        console.log('setstayInList:::::', JSON.stringify(res.data.list));
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
  const handleInputChange = (value, fieldName) => {
    if (issubmit) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleInputChangeStay = (value, fieldName) => {
    if (issubmit) {
      setStayerror(stayValidateValues(value));
    }
    setStay(value);
  };

  const handleSubmit = () => {
    setIssubmit(true);
    SetValidationerror(validateValues(fields));
    setStayerror(stayValidateValues(stay));

    const error = validateValues(fields);
    const stayerror = stayValidateValues(stay);
    if (Object.keys(error) == 0 && Object.keys(stayerror) == 0) {
      console.log('fields :>> ', fields);
      console.log('stay :>> ', stay);
      navigation.navigate('ProfessionalInformationScreen');
    }
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        iconUri={image.homeSelectedIcon}
        label={textStorage['PersonalInformationScreen.profile_details']}
        backOnPress={() => navigation.goBack()}
      />
      <ProfileDetailsProgressBar
        isActive={{count: 1, isCompleted: false}}
        textStorage={textStorage}
      />
      <ScrollView>
        <View style={styles.baseContainerStyle}>
          <BasicDetailsInput
            placeholder={textStorage['PersonalInformationScreen.father’s_name']}
            iconUri={image.userGreyIcon}
            imageClick={()=>{
              console.log(">")
              }}
            setInputValue={value => handleInputChange(value, 'FatherName')}
          />
          <Text style={styles.errorText}>{validationerror?.FatherName}</Text>
          <BasicDetailsInput
            placeholder={textStorage['PersonalInformationScreen.mother’s_name']}
            iconUri={image.userGreyIcon}
            imageClick={()=>{
              console.log(">")
              }}
            setInputValue={value => handleInputChange(value, 'MotherName')}
          />
          <Text style={styles.errorText}>{validationerror?.MotherName}</Text>
          {/* <BasicDetailsInput
            placeholder={'Marital Status'}
            iconUri={image.heartGreyIcon}
            setInputValue={value => handleInputChange(value, 'MaritalStatus')}
          /> */}

          <CustomizableDropdown
            placeholder={
              textStorage['PersonalInformationScreen.marital_status']
            }
            onChange={value => {
              handleInputChange(value?.name, 'MaritalStatus');
              setmaritialId(value?.id);
            }}
            value={fields?.MaritalStatus}
            data={maritialStatusList}
          />
          <Text style={styles.errorText}>{validationerror?.MaritalStatus}</Text>
          {/* <ProfileDetailsHouseTypeCard
            setInputValue={value => handleInputChangeStay(value, 'stay')}
            selected={stay}
            textStorage={textStorage}
          />
          <Text style={styles.errorText}>{stayerror?.stay}</Text> */}
          <BasicDetailsInput
            placeholder={
              textStorage['PersonalInformationScreen.pin_code_current_address']
            }
            imageClick={()=>{
              console.log(">")
              }}
            iconUri={image.pincodeGreyIcon}
            setInputValue={value => handleInputChange(value, 'Pincode')}
            type="pincode"
          />
          <Text style={styles.errorText}>{validationerror?.Pincode}</Text>
          <View style={style.commonRowStyleWithSpaceBetween}>
            <View style={styles.inputSubcontainerStyle}>
              <BasicDetailsInput
               imageClick={()=>{
                console.log(">")
                }}
                placeholder={textStorage['PersonalInformationScreen.state']}
                iconUri={image.borderedLocationPinGreyIcon}
                setInputValue={value => handleInputChange(value, 'State')}
              />
              <Text style={styles.errorText}>{validationerror?.State}</Text>
            </View>
            <View style={styles.inputSubcontainerStyle}>
              <BasicDetailsInput
               imageClick={()=>{
                console.log(">")
                }}
                placeholder={textStorage['PersonalInformationScreen.city']}
                iconUri={image.borderedLocationPinGreyIcon}
                setInputValue={value => handleInputChange(value, 'City')}
              />
              <Text style={styles.errorText}>{validationerror?.City}</Text>
            </View>
          </View>
          <BasicDetailsInput
           imageClick={()=>{
            console.log(">")
            }}
            placeholder={
              textStorage['PersonalInformationScreen.current_address']
            }
            iconUri={image.borderedLocationPinGreyIcon}
            setInputValue={value => handleInputChange(value, 'Currentaddress')}
          />
          <Text style={styles.errorText}>
            {validationerror?.Currentaddress}
          </Text>
          <CustomizableDropdown
            dropdownPosition={'top'}
            placeholder={
              textStorage['PersonalInformationScreen.education_qualification']
            }
            onChange={value => {
              handleInputChange(value?.name, 'Educationqualification');
              seteducationId(value.id);
            }}
            value={fields?.Educationqualification}
            data={educationList}
          />
          <Text style={styles.errorText}>
            {validationerror?.Educationqualification}
          </Text>
          <CustomizableDropdown
            dropdownPosition={'top'}
            placeholder={
              textStorage[
                'PersonalInformationScreen.language_preference_calling'
              ]
            }
            onChange={value => {
              handleInputChange(value?.name, 'Languagepreference_Calling');
              setlanguageID(value.id);
            }}
            value={fields?.Languagepreference_Calling}
            data={languageList}
          />
          <Text style={styles.errorText}>
            {validationerror?.Languagepreference_Calling}
          </Text>
          <Button
            label={textStorage['PersonalInformationScreen.next']}
            // onPress={() => navigation.navigate('ProfessionalInformationScreen')}
            onPress={() => handleSubmit()}
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
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  inputSubcontainerStyle: {
    width: '48%',
  },
  errorText: {
    color: color.errorColor,
    marginBottom: 15,
    marginTop: -20,
  },
});

export {PersonalInformationScreen};
