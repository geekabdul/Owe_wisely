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
import {DrawerActions} from '@react-navigation/native';
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
  employmentList,
  salaryReceiptLists,
  saveLoanDetails,
} from '../../Api/BasicDetailsScreenApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import FAQModal from '../../components/FAQComponent/FAQModal';
import {getPinCodeList} from '../../Api/PincodeApi';
import {
  companyList,
  industryTypeList,
  loanPurposeList,
} from '../../Api/ProfileDetailApi';
import Spinner from 'react-native-loading-spinner-overlay';
import {responsiveScreenWidth} from '../../utility/Size';

const BasicLoanDetailScreen = ({navigation, route}) => {
  const {textStorage} = useContext(AppStateContext);
  const [loadValue, setLoanValue] = useState(
    route?.params?.loanAmount ? route?.params?.loanAmount : '10000',
  );
  const [loanPurposeId, setloanPurposeId] = useState('');
  const [fields, setFields] = useState({
    loanAmount: route?.params?.loanAmount ? route?.params?.loanAmount : '10000',
    Purposeofloan: '',
  });
  // console.log('route.params.loanAmount', route?.params?.loanAmount, loadValue);
  const [validationerror, SetValidationerror] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isBackCall, setisBackCall] = useState(false);
  const [loanPList, setloanPurposeList] = useState([]);
  const [loanP, setloanP] = useState();
  const [issubmit, setIssubmit] = useState(false);
  const [showSpinner, setshowSpinner] = useState(false);
  const [professionalInfoDetail, setprofessionalInfoDetail] = useState();
  const [blurredField, setBlurredField] = useState(null);

  // handle input
  const handleInputChange = (value, fieldName) => {
    if (issubmit) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  useEffect(async () => {
    getDataOnBack();
    setshowSpinner(false);
    getloanPurposeListApi();
    let professional_info = await AsyncStorage.getItem('professional_info');
    let professionalInfo = JSON.parse(professional_info);
    setprofessionalInfoDetail(professionalInfo);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        console.log(professionalInfo?.monthly_income, 'PPPPPPPPPPPPPPPPPPPPPP');
        navigation.navigate('BasicProfessionalDetailScreen', {
          incomeM: professionalInfo?.monthly_income,
        });
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  const getDataOnBack = async () => {
    const isBack = await AsyncStorage.getItem('isBack');
    console.log(isBack);
    if (isBack === 'true') {
      setisBackCall(true);
      const loanAmount = await AsyncStorage.getItem('loan_amount');
      const loanPurpose = await AsyncStorage.getItem('loan_purpose');
      console.log('loanAmount isBack', loanAmount);
      let loanP = JSON.parse(loanPurpose);
      console.log('loanPurpose', loanP.name);
      setFields(prevState => ({
        ...prevState,
        ['Purposeofloan']: loanP.name,
        ['loanAmount']: loanAmount,
      }));
      setloanP(loanP);
      setloanPurposeId(loanP.id);
      setLoanValue(JSON.parse(loanAmount));
      console.log('loadValue', loadValue);
      console.log('loadValue', fields);
    }
  };

  //   const getData=async()=>{
  // console.log("userData",route.params.data)
  // let data=route.params.data
  // console.log("data",parseInt(data.loan_amount))
  // console.log("data",data.loan_purpose)
  // console.log("data",data.loan_purpose.name)

  // if(data.loan_purpose.name!=""){
  //   setFields(prevState => ({
  //     ...prevState,
  //     ["Purposeofloan"]: data.loan_purpose.name,
  //   }));
  //   setloanP(data.loan_purpose)
  // }
  // if(data.loan_amount!=""){
  //   setFields(prevState => ({
  //     ...prevState,
  //     ["loanAmount"]: data.loan_amount
  //   }));
  //   setLoanValue(data.loan_amount)
  //   console.log("userData?.loan_purpose?.name",data.loan_amount)
  //   console.log("userData?.loan_purpose?.name",loadValue)
  // }
  // }

  const getloanPurposeListApi = () => {
    loanPurposeList()
      .then(res => {
        console.log('Response::: ', JSON.stringify(res.data.list));
        setloanPurposeList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        console.log('Error::: ', error);
        setshowSpinner(false);
      });
  };

  // handle save from details
  const saveBasicDetails = async () => {
    const basicData = {
      loan_amount: parseInt(loadValue),
      loan_purpose: loanPurposeId,
    };
    const error = validateValues(fields);

    SetValidationerror(validateValues(fields));
    setIssubmit(true);
    console.log('basicData>>>>>>>>>', basicData);
    if (loadValue != '' && loanPurposeId != '') {
      console.log('basicData<<<<<<<<<<???????', basicData);
      setshowSpinner(true);
      saveLoanDetails(basicData)
        .then(async res => {
          if (res) {
            console.log('saveLoanDetails:::::::::::::', res);
            setshowSpinner(false);
            await AsyncStorage.setItem(
              'loan_amount',
              JSON.stringify(res?.data?.details?.loan_amount),
            );
            await AsyncStorage.setItem(
              'loan_purpose',
              JSON.stringify(res?.data?.details?.loan_purpose),
            );

            await AsyncStorage.setItem(
              'navigationCheck',
              JSON.stringify({
                screen: 'UseDifferentPANScreen',
                data: {
                  loanAmount: loadValue,
                  loanPurpose: route?.params?.loanPurpose,
                  incomeM: route?.params?.incomeM,
                },
              }),
            );

            navigation.navigate('BasicLoanDetailScreen');
            navigation.navigate('UseDifferentPANScreen', {
              loanAmount: loadValue,
              loanPurpose: route?.params?.loanPurpose,
              incomeM: route?.params?.incomeM,
            });
          }
        })
        .catch(error => {
          console.log('saveLoanDetails error', error);
          if (error?.response?.data?.message) {
            Alert.alert(error?.response?.data?.message);
            // AsyncStorage.removeItem('token');
            // AsyncStorage.removeItem('user');
            // navigation.navigate('LoginScreen');
            setshowSpinner(false);
          }
        });
    } else {
      setshowSpinner(false);
    }
  };

  const handleBlur = (fieldName, value) => {
    setBlurredField(fieldName);
    console.log(fieldName, value, 'blur test');
    if (fieldName) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
  };

  console.log(fields, 'loanfieldsssssss');
  return (
    <View style={styles.containerStyle}>
      <Header
        // backOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        backOnPress={() => {
          // isBackCall?
          navigation.navigate('BasicProfessionalDetailScreen', {
            incomeM: professionalInfoDetail?.monthly_income,
          });
          // :
          // navigation.goBack()
        }}
        iconUri={image.homeSelectedIcon}
        // iconUri2={image.notificationLogo}
        onPress={() => {
          setShowModal(true);
        }}
        label={textStorage['BasicdetailsScreen.loan_detail']}
      />
      <ScrollView>
        <Spinner visible={showSpinner} />
        <BasicDetailsProgressComponent
          isActive={3}
          id={2}
          textStorage={textStorage}
        />
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
          <BasicDetailsAmountSelectorCard
            setSliderValue={async val => {
              await AsyncStorage.setItem('loan_amount', JSON.stringify(val));
              setLoanValue(val);
              setFields({
                ...fields,
                loanAmount: val,
              });
            }}
            textStorage={textStorage}
            dataValue={fields?.loanAmount}
          />
          {/* <Text style={styles.errorText}>{validationerror?.loadValue}</Text> */}
          <CustomizableDropdown
            placeholder={
              textStorage['ProfessionalInformationScreen.purpose_of_loan']
            }
            onChange={value => {
              handleInputChange(value?.name, 'Purposeofloan');
              setloanPurposeId(value.id);
              setloanP(value.name);
            }}
            value={fields?.Purposeofloan}
            data={loanPList}
            onBlur={() => handleBlur('Purposeofloan', fields.Purposeofloan)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'Purposeofloan' &&
              !fields.Purposeofloan &&
              validationerror?.Purposeofloan}
          </Text>
          <View
            style={{
              marginTop: '65%',
              width: responsiveScreenWidth(90),
              alignSelf: 'center',
              // bottom: responsiveScreenWidth(10),
            }}>
            <Button
              label={textStorage['BasicdetailsScreen.Continue']}
              onPress={() => {
                // isBackCall?
                // navigation.navigate("UseDifferentPANScreen")
                // :
                saveBasicDetails();
              }}
            />
          </View>
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

export {BasicLoanDetailScreen};
