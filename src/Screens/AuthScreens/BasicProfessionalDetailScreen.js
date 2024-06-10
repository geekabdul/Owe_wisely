import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
  Image,
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
import {color, dimension, font} from '../../utility';
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
  saveProfessionalInfo,
} from '../../Api/BasicDetailsScreenApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import FAQModal from '../../components/FAQComponent/FAQModal';
import {
  getPinCodeList,
  getcityArrList,
  getstateListList,
} from '../../Api/PincodeApi';
import {
  companyList,
  industryTypeList,
  loanPurposeList,
} from '../../Api/ProfileDetailApi';
import Spinner from 'react-native-loading-spinner-overlay';
import {use} from 'i18next';

const BasicProfessionalDetailScreen = ({navigation, route}) => {
  const {textStorage} = useContext(AppStateContext);
  const [loanValue, setLoanValue] = useState('');
  const [showSpinner, setshowSpinner] = useState(false);
  const [isBackCall, setisBackCall] = useState(false);
  const [stateValue, setStateValue] = useState();
  const [city, setCity] = useState();
  const [employment_type, setEmploymentType] = useState();
  const [employment_typeId, setEmploymentTypeID] = useState('');
  const [pincode, setpincode] = useState('');
  const [income, setIncome] = useState();
  const [salaryReceipt, setSalaryReceipt] = useState(null);
  const [salaryReceiptId, setSalaryReceiptId] = useState('');
  const [salaryReceiptList, setSalaryReceiptList] = useState(null);
  const [employmentTypeList, setEmploymentTypeList] = useState(null);
  const [pincodeList, setPincodeList] = useState([]);
  const [companyTypeList, setcompanyTypeList] = useState([]);
  const [companyTypeId, setcompanyTypeId] = useState('');
  const [industryList, setindustryTypeList] = useState([]);
  const [stateList, setstateList] = useState([]);
  const [cityList, setcityList] = useState([]);
  const [industryId, setindustryId] = useState('');
  const [loanPList, setloanPurposeList] = useState([]);
  const [cityId, setCityId] = useState('');
  const [showHideField, setshowHideField] = useState(false);
  const [stateId, setStateId] = useState('');
  const [pincodeId, setpincodeId] = useState('');
  const [employmentId, setemploymentId] = useState('');
  const [salaryID, setsalaryID] = useState('');
  const [blurredField, setBlurredField] = useState(null);

  let isDecimal = Number.isInteger(route?.params?.incomeM);
  const [fields, setFields] = useState({
    EmploymentType: '',
    MonthlyIncome: isDecimal
      ? route?.params?.incomeM
      : route?.params?.incomeM === ''
      ? 0
      : route?.params?.incomeM?.includes(',')
      ? formatWithCommas(route?.params?.incomeM?.replace(/\,/g, ''))
      : formatWithCommas(route?.params?.incomeM?.slice(0, -4)),
    SalaryReceipt: '',
    company: '',
    IndustryType: '',
    Pincode: '',
    StateId: '',
    City: '',
    Companyaddress: '',
  });
  // console.log('route.params.incomeM', route.params.incomeM);
  // console.log('route.params.incomeM', fields.MonthlyIncome);
  const [validationerror, SetValidationerror] = useState({});
  const [employment_typeerror, setEmploymentTypeerror] = useState();
  const [salaryReceipterror, setSalaryReceipterror] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isTempData, setIsTempData] = useState('');
  const [indType, setIndType] = useState('');

  const [issubmit, setIssubmit] = useState(false);
  function formatWithCommas(n) {
    return n?.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
  }
  // handle input
  const handleInputChange = (value, fieldName) => {
    console.log(value, fieldName, 'ccccccccccccc');
    if (fieldName == 'Pincode') {
      setFields(prevState => ({
        ...prevState,
        [fieldName]: value,
      }));
      // console.log(value?.length, 'kkkkkkkkkk');
      if (value?.length == 6) {
        var tempData = findDataByPincode(value);
        // console.log(tempData, 'tempdata?????>>>>>>>>>>>>>>>');
        setIsTempData(tempData);

        if (tempData.length == 0) {
          console.log(fieldName, value, 'filedddddddddnameeeeeeeeeeeeooooo');

          setBlurredField(fieldName);
          setFields(prevState => ({
            ...prevState,
            ['City']: '',
            ['State']: '',
            [fieldName]: '',
          }));
          setFields(prevState => ({
            ...prevState,
            ['City']: '',
            ['StateId']: '',
            [fieldName]: value,
          }));

          SetValidationerror(
            validateValues({...fields, [fieldName]: value}, tempData),
          );
        }
        if (tempData != '') {
          // console.log('not emptyyyyyyyyyyyyyyyyy');
          var tempCity = tempData[0].city.name;
          var tempState = tempData[0].city.state.name;
          setshowHideField(true);

          setpincodeId(tempData[0].id);
          setpincode(value);
          setCityId(tempData[0].city.id);
          setStateId(tempData[0].city.state.id);
          getstateList();
          getcityList();
          setFields(prevState => ({
            ...prevState,
            ['City']: tempCity,
            ['StateId']: tempState,
            [fieldName]: value,
          }));

          SetValidationerror(validateValues({...fields, [fieldName]: value}));
        }
        // console.log('fields', fields);
      } else {
        setshowHideField(false);
        getstateList();
        getcityList();
        setpincodeId('');
        setCityId('');
        setStateId('');
        setpincode('');
        setCity('');
        setStateValue('');
      }
    } else {
      if (blurredField === fieldName) {
        console.log('is in??????');
        SetValidationerror(validateValues({...fields, [fieldName]: value}));
      }
      if (fieldName === 'Companyaddress') {
        SetValidationerror(validateValues({...fields, [fieldName]: value}));
      }

      setFields(prevState => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
  };

  function findDataByPincode(pincode) {
    return pincodeList
      .filter(item => item.pincode === pincode)
      .map(item => item);
  }

  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        navigation.navigate('BasicDetailsScreen2');

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
    setshowSpinner(true);
    getDataOnBack();
    getPincodeListApi();
    getloanPurposeListApi();
    getIndustryTypeList();
    getCompanyList();
    getEmploymentTypeListApi();
    getsalaryReceiptList();
  }, []);

  const getDataOnBack = async () => {
    const isBack = await AsyncStorage.getItem('isBack');
    console.log(isBack);
    if (isBack === 'true') {
      setisBackCall(true);
      let professional_info = await AsyncStorage.getItem('professional_info');
      let professionalInfo = JSON.parse(professional_info);
      // console.log(professionalInfo?.monthly_income, 'ppppiiiiiiii');

      setFields(prevState => ({
        ...prevState,
        ['EmploymentType']: professionalInfo?.employment_type,
        ['MonthlyIncome']:
          professionalInfo?.monthly_income?.length != 0
            ? professionalInfo?.monthly_income
            : route?.params?.incomeM,
        ['SalaryReceipt']: professionalInfo?.salary_receipt,
        ['company']: professionalInfo?.company,
        ['IndustryType']: professionalInfo?.industry_type,
        ['Pincode']: professionalInfo?.pincode?.pincode,
        ['StateId']: professionalInfo?.state.name,
        ['City']: professionalInfo?.city.name,
        ['Companyaddress']: professionalInfo?.address,
      }));
      setIndType(professionalInfo?.industry_type);
      setemploymentId(professionalInfo?.employment_type.id);
      setsalaryID(professionalInfo?.salary_receipt.id);
      handleInputChange(professionalInfo?.company?.name, 'CompanyName');
      handleInputChange(professionalInfo?.industry_type?.name, 'Industrytype');
      // handleInputChange(professionalInfo?.pincode?.pincode, 'Pincode');
      handleInputChange(
        professionalInfo?.monthly_income?.length != 0
          ? professionalInfo?.monthly_income
          : route?.params?.incomeM,
        'MonthlyIncome',
      );
      setStateValue(professionalInfo?.state.name);
      setCity(professionalInfo?.city.name);
      setLoanValue(professionalInfo?.monthly_income);
      setPincodeList(professionalInfo?.pincode.pincode);
      setpincode(professionalInfo?.pincode.pincode);
      setCityId(professionalInfo?.city.id);
      setStateId(professionalInfo?.state.id);
      setpincodeId(professionalInfo?.pincode.id);
      setcompanyTypeId(professionalInfo?.company.id);
      setEmploymentTypeID(professionalInfo?.employment_type.id);
      setindustryId(professionalInfo?.industry_type.id);
      setSalaryReceiptId(professionalInfo?.salary_receipt.id);
      setshowHideField(true);
      getstateList();
      getcityList();
    }
  };

  // handle save from details
  const saveBasicDetails = async () => {
    // console.log('fields', fields);
    const basicData = {
      employment_type: employment_typeId,
      monthly_income:
        fields.MonthlyIncome?.length > 1
          ? parseInt(fields.MonthlyIncome.replace(',', ''))
          : parseInt(fields.MonthlyIncome),
      salary_receipt: salaryReceiptId,
      company: companyTypeId,
      industry_type: industryId,
      pincode: pincodeId,
      state: stateId,
      city: cityId,
      address: fields?.Companyaddress,
    };
    console.log('basicData', basicData, fields);
    const error = validateValues(fields);
    console.log('error----------------', error);

    SetValidationerror(validateValues(fields));
    // if (error.MonthlyIncome?.length != 0) {
    //   return false; 
    // } else if (error.Companyaddress?.length != 0) {
    //   return false;
    // }
    setIssubmit(true);
    console.log('fffffffff');
    if (
      fields.Companyaddress != '' &&
      fields.MonthlyIncome != '' &&
      employment_typeId != '' &&
      salaryReceiptId != '' &&
      companyTypeId != '' &&
      industryId != '' &&
      pincodeId != '' &&
      stateId != '' &&
      cityId != ''
    ) {
      setshowSpinner(true);
      saveProfessionalInfo(basicData)
        .then(async res => {
          if (res) {
            setshowSpinner(false);
            await AsyncStorage.setItem(
              'professional_info',
              JSON.stringify(res?.data?.details?.professional_info),
            );
            // console.log('fields BasicLoanDetailScreen', fields);

            await AsyncStorage.setItem(
              'navigationCheck',
              JSON.stringify({
                screen: 'BasicLoanDetailScreen',
                data: {
                  loanAmount: '10000',
                  loanPurpose: '',
                  incomeM: fields?.MonthlyIncome,
                },
              }),
            );

            navigation.navigate('BasicLoanDetailScreen', {
              loanAmount: '10000',
              loanPurpose: '',
              incomeM: fields?.MonthlyIncome,
            });
          }
        })
        .catch(error => {
          if (error?.response?.data?.message) {
            Alert.alert(error?.response?.data?.message);
            console.log('ttttttttttttttttttttttttt');
            setshowSpinner(false);
          }
        });
    } else {
      console.log('elseeeee??????????????///////////////////////////');
      setshowSpinner(false);
      Alert.alert('Please Fill Below Details');
    }
  };
  const getsalaryReceiptList = async () => {
    salaryReceiptLists()
      .then(res => {
        setSalaryReceiptList(res?.data?.list);
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
  const getEmploymentTypeListApi = () => {
    employmentList()
      .then(res => {
        // console.log('Response::: ', JSON.stringify(res.data.list));
        setEmploymentTypeList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        console.log('Error::: ', error);
        setshowSpinner(false);
      });
  };
  const getcityList = () => {
    getcityArrList()
      .then(res => {
        // console.log(JSON.stringify(res.data.list));
        setcityList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        setshowSpinner(false);
      });
  };
  const getstateList = id => {
    // console.log(JSON.stringify(id));
    getstateListList(id)
      .then(res => {
        getcityList();
        // console.log(JSON.stringify(res.data.list));
        setstateList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        setshowSpinner(false);
      });
  };
  const getPincodeListApi = () => {
    getPinCodeList()
      .then(res => {
        // console.log('Response::: ', JSON.stringify(res.data.list));
        setPincodeList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        console.log('Error::: ', error);
        setshowSpinner(false);
      });
  };
  const getloanPurposeListApi = () => {
    loanPurposeList()
      .then(res => {
        // console.log('Response::: ', JSON.stringify(res.data.list));
        setloanPurposeList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        console.log('Error::: ', error);
        setshowSpinner(false);
      });
  };
  const getCompanyList = () => {
    companyList()
      .then(res => {
        // console.log(
        //   'Response:::setcompanyTypeList ',
        //   JSON.stringify(res.data.list),
        // );
        setcompanyTypeList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        console.log('Error::: ', error);
        setshowSpinner(false);
      });
  };
  const getIndustryTypeList = () => {
    industryTypeList()
      .then(res => {
        // console.log(
        //   'Response:::setindustryTypeList ',
        //   JSON.stringify(res.data.list),
        // );
        setindustryTypeList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        console.log('Error::: ', error);
        setshowSpinner(false);
      });
  };

  function findDataByPincode(pincode) {
    return pincodeList
      .filter(item => item.pincode === pincode)
      .map(item => item);
  }

  // handle input employmenttype
  const handleemploymentType = value => {
    // console.log('>>>>>>>>>>>>>>>>', JSON.stringify(value));
    if (issubmit) {
      setEmploymentTypeerror(validateemploymentTypeList(value));
    }
    setEmploymentType(value);
    setEmploymentTypeID(value);
    setemploymentId(value);
  };
  // handle input salaryreceipt
  const handlesalaryReceipt = value => {
    if (issubmit) {
      setSalaryReceipterror(validatesalaryReceipt(value));
    }
    setSalaryReceipt(value);
    setSalaryReceiptId(value);
    setsalaryID(value);
  };

  const handleBlur = (fieldName, value) => {
    console.log(fieldName, value, 'ccccccc');
    setBlurredField(fieldName);
    if (fieldName) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
  };

  console.log(fields.Pincode, 'ppppppppppppp');
  return (
    <View style={styles.containerStyle}>
      <Header
        // backOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        backOnPress={() => navigation.navigate('BasicDetailsScreen2')}
        iconUri={image.homeSelectedIcon}
        // iconUri2={image.notificationLogo}
        onPress={() => {
          setShowModal(true);
        }}
        label={textStorage['PersonalInformationScreen.Professional_info']}
      />
      <ScrollView>
        <Spinner visible={showSpinner} />
        <BasicDetailsProgressComponent
          id={1}
          isActive={2}
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
          {/* MONTHLY INCOME */}
          <BasicDetailsInput
            placeholder={textStorage['BasicdetailsScreen.monthly_income']}
            iconUri={image.rsSymbolGreyIcon}
            tempValue={fields?.MonthlyIncome}
            data={fields?.MonthlyIncome}
            imageClick={() => {
              console.log('>');
            }}
            setInputValue={value => handleInputChange(value, 'MonthlyIncome')}
            onBlur={() => handleBlur('MonthlyIncome', fields.MonthlyIncome)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'MonthlyIncome' && validationerror?.MonthlyIncome}
          </Text>

          {/* EMPLOYMENT TYPE */}
          <CustomizableDropdown
            placeholder={
              textStorage['ProfessionalInformationScreen.employment_type']
            }
            onChange={value => {
              handleemploymentType(value);
              setEmploymentTypeID(value?.id);
            }}
            iconUri={image.EmploymentType}
            value={fields.EmploymentType}
            data={employmentTypeList}
            dropdownPosition={'top'}
            onBlur={() => {
              setBlurredField('Employment_Type');
              setEmploymentTypeerror(
                validateemploymentTypeList(employment_typeId),
              );
            }}
          />
          {/* <BasicDetailsEmploymentTypeCard
            data={employmentTypeList}
            setEmploymentType={handleemploymentType}
            textStorage={textStorage}
            selectedData={employmentId}
          /> */}
          <Text style={styles.errorText}>
            {blurredField === 'Employment_Type' &&
              !employment_typeId &&
              employment_typeerror?.employment_type}
          </Text>

          {/* MODE OF SALARY */}

          <CustomizableDropdown
            placeholder={
              textStorage['ProfessionalInformationScreen.mode_salary']
            }
            iconUri={image.Mode_of_Salary}
            onChange={value => {
              handlesalaryReceipt(value);
              setSalaryReceiptId(value?.id);
            }}
            value={fields.SalaryReceipt}
            data={salaryReceiptList}
            dropdownPosition={'top'}
            onBlur={() => {
              setBlurredField('modeOfSalary');
              setSalaryReceipterror(validatesalaryReceipt(salaryReceiptId));
            }}
          />
          {/* <BasicDetailsSalarySourceCard
            selectedData={salaryID}
            data={salaryReceiptList}
            setSalaryReceipt={handlesalaryReceipt}
            textStorage={textStorage}
          /> */}
          <Text style={styles.errorText}>
            {blurredField === 'modeOfSalary' &&
              !salaryReceiptId &&
              salaryReceipterror?.salaryReceipt}
          </Text>

          {/* COMPANY NAME */}

          <CustomizableDropdown
            onBlur={() => handleBlur('CompanyName', fields.company)}
            placeholder={
              textStorage['ProfessionalInformationScreen.company_name']
            }
            iconUri={image.Company_Name}
            onChange={value => {
              handleInputChange(value?.name, 'CompanyName');
              setcompanyTypeId(value?.id);

              setIndType(
                value?.industry_type?.length
                  ? value?.industry_type[0]
                  : value?.industry_type,
              );
              console.log(value?.industry_type, 'indddddddddtyyyyyyyyy');
              setindustryId(value?.industry_type[0]?.id);
              value?.industry_type?.length
                ? handleInputChange(
                    value?.industry_type[0]?.industry,
                    'Industrytype',
                  )
                : setFields(prevState => ({
                    ...prevState,
                    ['IndustryType']: '',
                  }));
            }}
            value={fields?.CompanyName}
            data={companyTypeList}
            dropdownPosition={'top'}
          />
          <Text style={styles.errorText}>
            {blurredField === 'CompanyName' &&
              !companyTypeId &&
              validationerror?.CompanyName}
          </Text>

          {/* INDUSTRY TYPE */}
          {indType?.length == 0 ? (
            <CustomizableDropdown
              placeholder={
                textStorage['ProfessionalInformationScreen.industry_type']
              }
              onChange={value => {
                handleInputChange(value?.name, 'Industrytype');
                setindustryId(value?.id);
              }}
              iconUri={image.IndustryType}
              value={fields?.IndustryType}
              data={industryList}
              dropdownPosition={'top'}
              onBlur={() => handleBlur('Industrytype', fields.IndustryType)}
            />
          ) : (
            <View
              style={{
                borderWidth: 1,
                padding: 20,
                paddingVertical: 13,
                borderColor: 'lightgrey',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 14, fontFamily: font.soraRegular}}>
                  {!indType
                    ? textStorage['ProfessionalInformationScreen.industry_type']
                    : indType?.industry
                    ? indType?.industry
                    : indType?.name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginRight: -15}}>
                <Image
                  source={image.caretDownBlackIcon}
                  style={{margin: 10, justifyContent: 'center'}}
                />
                <View
                  style={{
                    height: dimension.width * 0.09,
                    width: dimension.width * 0.09,
                    backgroundColor: color.wildSand2,
                    borderTopLeftRadius: 2,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={image.IndustryType}
                    style={{
                      height: 16,
                      width: 16,
                      tintColor: 'grey',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            </View>
          )}
          <Text
            style={[
              styles.errorText,
              {marginTop: indType?.length == 0 ? -20 : 0},
            ]}>
            {blurredField === 'Industrytype' &&
              indType?.length == 0 &&
              !industryId &&
              validationerror?.Industrytype}
          </Text>

          {/* PINCODE */}
          <BasicDetailsInput
            placeholder={
              textStorage['PersonalInformationScreen.pin_code_current_address']
            }
            iconUri={image.pincodeGreyIcon}
            setInputValue={value => {
              if (pincode?.length === 6 && isBackCall && value?.length === 5) {
                setpincode('');
                setpincodeId('');
                setshowHideField(false);
                setFields(prevState => ({
                  ...prevState,
                  ['Pincode']: '',
                }));
              } else {
                handleInputChange(value, 'Pincode');
              }
            }}
            type="pincode"
            keyBoardType="numeric"
            maxLength={6}
            imageClick={() => {
              console.log('>');
            }}
            editableL={true}
            // data={fields?.Pincode}
            data={pincode === '' || !isBackCall ? null : pincode}
            onBlur={() => handleBlur('Pincode', fields.Pincode)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'Pincode' && validationerror?.Pincode}
          </Text>

          <CustomizableDropdown
            placeholder={textStorage['BasicdetailsScreen.state']}
            onChange={value => {
              handleInputChange(value?.name, 'State');
              setStateId(value.id);
              // alert(value.id)
              // getcityList(value.id)
            }}
            iconUri={image.stateIcon}
            colorOpacity={showHideField}
            disable={showHideField ? true : false}
            value={fields?.StateId}
            data={stateList}
          />
          <Text style={styles.errorText}>{validationerror?.State}</Text>

          <CustomizableDropdown
            iconUri={image.cityIcon}
            placeholder={textStorage['BasicdetailsScreen.city']}
            onChange={value => {
              handleInputChange(value?.name, 'City');
              setCityId(value.id);
              // getcityList(value.id)
            }}
            colorOpacity={showHideField}
            disable={showHideField ? true : false}
            value={fields?.City}
            data={cityList}
          />
          <Text style={styles.errorText}>{validationerror?.City}</Text>

          {/* <View style={styles.commonRowStyleWithSpaceBetween}>
            <View style={styles.inputSubcontainerStyle}>
              <BasicDetailsInput
                placeholder={textStorage['ProfessionalInformationScreen.state']}
                iconUri={image.borderedLocationPinGreyIcon}
                setInputValue={value => handleInputChange(value, 'State')}
                data={stateValue}
                imageClick={()=>{
                  console.log(">")
                  }}
                editableL={stateValue===""?true:false}
              />
              <Text style={styles.errorText}>{validationerror?.State}</Text>
            </View>
            <View style={styles.inputSubcontainerStyle}>
              <BasicDetailsInput
                placeholder={textStorage['ProfessionalInformationScreen.city']}
                iconUri={image.borderedLocationPinGreyIcon}
                setInputValue={value => handleInputChange(value, 'City')}
                data={city}
                imageClick={()=>{
                  console.log(">")
                  }}
                editableL={city===""?true:false}
              />
              <Text style={styles.errorText}>{validationerror?.City}</Text>
            </View>
          </View> */}

          {/* COMPANY ADDRESS */}
          <BasicDetailsInput
            placeholder={
              textStorage['ProfessionalInformationScreen.company_address']
            }
            imageClick={() => {
              console.log('>');
            }}
            multiline={true}
            data={fields.Companyaddress}
            iconUri={image.borderedLocationPinGreyIcon}
            setInputValue={value => handleInputChange(value, 'Companyaddress')}
            onBlur={() => handleBlur('Companyaddress', fields.Companyaddress)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'Companyaddress' &&
              validationerror?.Companyaddress}
          </Text>

          <Button
            label={textStorage['BasicdetailsScreen.Continue']}
            onPress={() => {
              // isBackCall?
              // navigation.navigate("BasicLoanDetailScreen")
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

export {BasicProfessionalDetailScreen};
