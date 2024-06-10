import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
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
} from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
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
import Spinner from 'react-native-loading-spinner-overlay';
import {
  BasicDetails1,
  cityList,
  cityListApi,
  employmentList,
  genderList,
  salaryReceiptLists,
  stateListApi,
} from '../../Api/BasicDetailsScreenApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import FAQModal from '../../components/FAQComponent/FAQModal';
import {
  getPinCodeList,
  getcityArrList,
  getstateListList,
} from '../../Api/PincodeApi';
import RNAccountManager from 'react-native-account-manager';
import DeviceNumber from 'react-native-device-number';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';

const BasicDetailsScreen1 = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [stateValue, setStateValue] = useState();
  const [city, setCity] = useState();
  const [genderlist, setGenderList] = useState([]);
  const [pincode, setpincode] = useState('');
  const [pincodeList, setpincodeList] = useState([]);
  const [stateList, setstateList] = useState([]);
  const [cityList, setcityList] = useState([]);
  const [emailList, setemailList] = useState([]);
  const [showSpinner, setshowSpinner] = useState(false);
  const [cityId, setCityId] = useState('');
  const [stateId, setStateId] = useState('');
  const [pincodeId, setpincodeId] = useState('');
  const [genderId, setGenderId] = useState('');
  const [showDate, setshowDate] = useState(false);
  const [datedob, setdateNew] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBackCall, setIsBackCall] = useState(false);
  const [focusEmail, setfocusEmail] = useState(true);
  const [showHideField, setshowHideField] = useState(false);

  const [fields, setFields] = useState({
    Fullname: '',
    Email: '',
    Dateofbirth: '',
    Pincode: '',
    City: '',
    State: '',
    Gender: '',
    Currentaddress: '',
  });
  const [validationerror, SetValidationerror] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [issubmit, setIssubmit] = useState(false);
  const [isTempData, setIsTempData] = useState('');
  const [blurredField, setBlurredField] = useState(null);

  const getEmailIds = async () => {
    try {
      RNAccountManager.getAccounts()
        .then(account => {
          const dataArray = account.account.split('Account ');
          const processedArray = dataArray
            .filter(item => item.trim() !== '') // Remove empty elements
            .map(item => item.split(',')[0].split('=')[1].trim());
          const emailsString = processedArray.map((item, index) => {
            const data = {id: index, name: item};
            return data;
          });
          // Convert the array to a string with line breaks
          // console.log('emailsString', emailsString);
          setemailList(emailsString);
          setModalVisible(true);
        })
        .catch(error => {
          console.log(error, 'get emails failed');
        });
    } catch (error) {
      console.log('Error in getting email ids', error);
    }
  };

  // handle input
  const handleInputChange = (value, fieldName) => {
    console.log('valueeeeeeeeeeeeeeeeeee', value, fieldName);
    if (fieldName === 'Pincode') {
      if (value.length == 6) {
        var tempData = findDataByPincode(value);
        console.log(tempData, 'tempDataaaaaaaaaaaaa');
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
          SetValidationerror(
            validateValues(
              {...fields, [fieldName]: value, ['Dateofbirth']: datedob},
              tempData,
            ),
          );
        }
        if (tempData != '') {
          setshowHideField(true);
          // console.log('fieldName', tempData[0].id);
          var tempCity = tempData[0].city.name;
          var tempState = tempData[0].city.state.name;
          // console.log('tempData', tempData);
          // console.log('tempCity', tempCity);
          // console.log('tempState', tempState);
          setpincodeId(tempData[0].id);
          setCityId(tempData[0].city.id);
          setStateId(tempData[0].city.state.id);
          // setCity(tempCity);
          // setStateValue(tempState);
          getstateList();
          getcityList();
          setFields(prevState => ({
            ...prevState,
            ['City']: tempCity,
            ['State']: tempState,
            [fieldName]: value,
          }));
          SetValidationerror(
            validateValues({...fields, [fieldName]: value}, tempData),
          );
        }
        // console.log('fields', fields);
        // console.log('fields', cityId);
        // console.log('fields', stateId);
      } else {
        // console.log('can not findddddddddddd?????????????>>>>>>>>>>>>>>>>>');
        setshowHideField(false);
        setpincodeId(null);
        setCityId(null);
        setStateId(null);
        setCity(null);
        setStateValue(null);
        getstateList();
        getcityList();
        // setFields(prevState => ({
        //   ...prevState,
        //   ['City']: tempCity,
        //   ['State']: tempState,
        //   [fieldName]: value,
        // }));
      }
    } else {
      if (blurredField === fieldName) {
        console.log('is in??????');
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
        navigation.navigate('LoginScreen');
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
    getgenderList();
    getpinCodeList();
    getDataOnBack();
  }, []);

  const getDataOnBack = async () => {
    const isBack = await AsyncStorage.getItem('isBack');
    if (isBack != null && isBack != 'false') {
      setIsBackCall(true);
      let basic_detail_one = await AsyncStorage.getItem('basic_detail_one');

      let basic_detailOne = JSON.parse(basic_detail_one);
      // console.log(
      //   basic_detailOne,
      //   'basicccccccccccccccccccccccccccccccccccccccccccc',
      // );
      setIsTempData(['test']);

      setFields(prevState => ({
        ...prevState,
        ['Fullname']: basic_detailOne?.profile_name,
        ['Email']: basic_detailOne?.email,
        ['Dateofbirth']: basic_detailOne?.dob,
        ['Pincode']: basic_detailOne.pincode?.pincode,
        ['City']: basic_detailOne.city?.city_name,
        ['State']: basic_detailOne.state?.state_name,
        ['Gender']: basic_detailOne.gender?.name,
        ['Currentaddress']: basic_detailOne?.address,
      }));
      setdateNew(basic_detailOne.dob);
      setStateValue(basic_detailOne.state?.state_name);
      setCity(basic_detailOne.city?.city_name);
      setCityId(basic_detailOne.city?.id);
      setStateId(basic_detailOne.state?.id);
      setpincodeId(basic_detailOne.pincode?.id);
      setGenderId(basic_detailOne.gender?.id);
      setpincode(basic_detailOne.pincode?.pincode);
      setdateNew(basic_detailOne?.dob);
      handleInputChange(basic_detailOne.pincode?.pincode);
      setshowHideField(true);
      // setpincodeId(tempData[0].id);
      // setCityId(tempData[0].city.id);
      // setStateId(tempData[0].city.state.id);
      // setCity(tempCity);
      // setStateValue(tempState);
      getstateList();
      getcityList();
    }
  };
  // handle save from details
  const saveBasicDetails = async () => {
    console.log(isTempData, 'tmepdataaaaaaaadddddddddddddddd');
    setshowSpinner(true);
    // console.log('datedob error', datedob);
    const basicData = {
      profile_name: fields?.Fullname,
      gender: genderId,
      Dateofbirth:
        datedob != undefined ? moment(datedob).format('DD/MM/YYYY') : '',
      pincode: pincodeId,
      state: stateId,
      city: cityId,
      email: fields?.Email,
      address: fields?.Currentaddress,
    };
    // console.log(basicData, 'basicDAtaaaaaaaaaaaaalllllll');

    const error = validateValues(fields);
    if (basicData.Dateofbirth.length > 0) {
      error['Dateofbirth'] = '';
      SetValidationerror(error);
      console.log('reach error 1');
    } else {
      console.log('reach error 2');

      SetValidationerror(error);
    }

    setIssubmit(true);

    if (
      fields.Fullname != '' &&
      genderId != '' &&
      datedob != '' &&
      pincodeId != '' &&
      stateId != '' &&
      city != '' &&
      fields.Email != '' &&
      fields.Currentaddress != '' &&
      datedob != undefined &&
      /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.Fullname) &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(fields?.Email)
    ) {
      BasicDetails1(basicData)
        .then(async res => {
          // console.log('resres BasicDetails1', res);
          if (res) {
            global.Gender = fields?.Gender;
            global.Fullname = fields?.Fullname;
            global.Dateofbirth = fields?.Dateofbirth;
            // console.log(res.data.details);
            await AsyncStorage.setItem('isBack', 'true');
            await AsyncStorage.setItem(
              'basic_detail_one',
              JSON.stringify(res?.data?.details?.basic_detail_one),
            );
            await AsyncStorage.setItem(
              'navigationCheck',
              JSON.stringify({screen: 'BasicDetailsScreen2', data: null}),
            );
            navigation.navigate('BasicDetailsScreen2');
            setshowSpinner(false);
          }
        })
        .catch(error => {
          // console.log(JSON.stringify(error), 'submit errorrrrrrrrr');
          setIssubmit(false);
          if (error?.response?.data?.message) {
            console.log(error?.response?.data?.message, 'submit error');
            // if (isTempData.length != 0) {
            Alert.alert(error?.response?.data?.message);
            // } else {
            // Alert.alert('Enter Valid Pincode');
            // SetValidationerror(
            // validateValues({...fields, ['Pincode']: 123445}, isTempData),
            // );
            // }
            // AsyncStorage.removeItem('token');
            // AsyncStorage.removeItem('user');
            // navigation.navigate('LoginScreen');
            setshowSpinner(false);
          }
        });
    } else {
      console.log('eslseeeeeeeeeeeee');
      if (fields.Fullname == '') {
        Alert.alert('Please Enter Full Name');
      } else if (fields.Email == '') {
        Alert.alert('Please Enter Email');
      } else if (genderId == '') {
        Alert.alert('Please Select Gender');
      } else if (pincodeId == '') {
        Alert.alert('Please Enter Pincode');
      } else if (stateId == '') {
        Alert.alert('Please Select State');
      } else if (city == '') {
        Alert.alert('Please Select City');
      } else if ((fields.Currentaddress != '') == '') {
        Alert.alert('Please Enter Address');
      } else if (datedob != '' || datedob != undefined) {
        Alert.alert('Please Select Your DOB');
      }
      // Alert.alert('Please Fill Below Details');
      SetValidationerror(
        validateValues({...fields, ['Pincode']: 123445}, isTempData),
      );
      setshowSpinner(false);
    }
  };

  const getpinCodeList = () => {
    getPinCodeList()
      .then(res => {
        // alert(JSON.stringify(res.data.list))
        setpincodeList(res?.data?.list);
        setshowSpinner(false);
      })
      .catch(error => {
        setshowSpinner(false);
        if (error.response.data?.status === 0) {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('user');
          navigation.navigate('LoginScreen');
        }
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
    // console.log('stateid', JSON.stringify(id));
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

  // get salary receipt list
  const getgenderList = async () => {
    genderList()
      .then(res => {
        // alert(JSON.stringify(res.data.list))
        setGenderList(res?.data?.list);
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
  const renderItem = ({index}) => {
    return (
      <View>
        <Text
          onPress={() => {
            // console.log(emailList[index].name);
            setModalVisible(false);
            setFields(prevState => ({
              ...prevState,
              ['Email']: emailList[index].name,
            }));

            if (issubmit) {
              SetValidationerror(
                validateValues({...fields, ['Email']: emailList[index].name}),
              );
            }
          }}
          style={{
            width: '100%',
            marginTop: responsiveScreenWidth(4),
            marginBottom: responsiveScreenWidth(4),
            color: '#000000',
            fontWeight: '500',
            fontSize: responsiveFontSize(1.8),
            textAlign: 'left',
            alignSelf: 'flex-start',
          }}>
          {emailList[index].name}
        </Text>
        <View style={{width: '100%', height: 1, backgroundColor: '#E7E7E7'}} />
      </View>
    );
  };
  const hideDatePicker = () => {
    setshowDate(false);
    setdateNew(new Date());
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
        backOnPress={() => navigation.navigate('LoginScreen')}
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
          {/* FULL NAME  */}
          <BasicDetailsInput
            placeholder={textStorage['BasicdetailsScreen.full_name']}
            iconUri={image.userGreyIcon}
            data={fields.Fullname}
            setInputValue={value => handleInputChange(value, 'Fullname')}
            imageClick={() => {
              console.log('>');
            }}
            onBlur={() => handleBlur('Fullname', fields.Fullname)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'Fullname' && validationerror?.fullname}
          </Text>

          {/* EMAIL */}
          <TouchableOpacity
            onPress={() => {
              focusEmail && getEmailIds();
            }}>
            <BasicDetailsInput
              editableL={!focusEmail}
              data={fields.Email}
              onFocus={() => {
                focusEmail && getEmailIds();
              }}
              placeholder={textStorage['BasicdetailsScreen.email']}
              iconUri={image.mailGreyIcon}
              setInputValue={value => handleInputChange(value, 'Email')}
              imageClick={() => {
                getEmailIds();
              }}
              onBlur={() => handleBlur('Email', fields.Email)}
            />
          </TouchableOpacity>
          <Text style={styles.errorText}>
            {blurredField === 'Email' && validationerror?.Email}
          </Text>

          {/* GENDER */}
          <CustomizableDropdown
            placeholder={textStorage['BasicdetailsScreen.gender']}
            iconUri={image.genderGreyIcon}
            onChange={value => {
              handleInputChange(value?.name, 'Gender');
              setGenderId(value.id);
            }}
            value={fields?.Gender}
            data={genderlist}
            onBlur={() => handleBlur('Gender', fields.Gender)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'Gender' &&
              !fields.Gender &&
              validationerror?.Gender}
          </Text>

          {/* DATE OF BIRTH */}
          <TouchableOpacity
            onPress={() => {
              setshowDate(true);
              setdateNew(new Date());
            }}>
            <BasicDetailsInput
              placeholder={textStorage['BasicdetailsScreen.date_of_birth']}
              iconUri={image.dobIcon}
              editableL={false}
              data={datedob != null ? moment(datedob).format('DD/MM/YYYY') : ''}
              // setInputValue={value => handleInputChange(value, 'Dateofbirth')}
              imageClick={() => {
                setshowDate(true);
                setdateNew(new Date());
              }}
            />
          </TouchableOpacity>
          <Text style={styles.errorText}>
            {blurredField === 'dob' && validationerror?.Dateofbirth}
          </Text>
          {showDate && (
            <DateTimePicker
              onCancel={hideDatePicker}
              minimumDate={new Date(moment().subtract(100, 'years'))}
              value={datedob}
              maximumDate={new Date(moment().subtract(18, 'years'))}
              mode={'date'}
              // display={showDate}
              onChange={(evt, selectedDate) => {
                // Alert.alert(JSON.stringify(evt?.type)+" "+selectedDate)
                let newDate = moment(selectedDate).format('DD/MM/YYYY');
                if (evt?.type === 'dismissed') {
                  setdateNew(selectedDate);
                  setshowDate(false);
                  console.log('DISMISSED>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                  return;
                } else if (evt.type === 'set') {
                  // alert(newDate)
                  // console.log(newDate);
                  setdateNew(selectedDate);
                  setshowDate(false);
                  console.log('SET>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

                  setFields(prevState => ({
                    ...prevState,
                    ['Dateofbirth']: moment(selectedDate).format('DD/MM/YYYY'),
                  }));
                  if (issubmit) {
                    SetValidationerror(
                      validateValues({
                        ...fields,
                        ['Dateofbirth']: selectedDate,
                      }),
                    );
                  }

                  return;
                }
                setdateNew(selectedDate);
                setshowDate(false);
                console.log('DEFAULT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

                // SetValidationerror(
                //   validateValues({...fields, ['Dateofbirth']: selectedDate}),
                // );
                // console.log('datedob,', datedob);
                // console.log('datedob,', newDate);
              }}
            />
          )}

          <BasicDetailsInput
            placeholder={
              textStorage['BasicdetailsScreen.pin_code_current_address']
            }
            iconUri={image.pincodeGreyIcon}
            setInputValue={value => {
              if (
                pincode &&
                pincode.length === 6 &&
                isBackCall &&
                value.length === 5
              ) {
                setpincode('');
                setpincodeId('');
                setFields(prevState => ({
                  ...prevState,
                  ['Pincode']: '',
                }));
              } else {
                handleInputChange(value, 'Pincode');
              }
            }}
            data={pincode === '' || !isBackCall ? null : pincode}
            maxLength={6}
            type="pincode"
            keyBoardType="numeric"
            imageClick={() => {
              console.log('>');
            }}
            onBlur={() => handleBlur('Pincode', fields.Pincode)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'Pincode' && validationerror?.Pincode}
          </Text>

          <CustomizableDropdown
            iconUri={image.stateIcon}
            placeholder={textStorage['BasicdetailsScreen.state']}
            onChange={value => {
              handleInputChange(value?.name, 'State');
              setStateId(value.id);
              // alert(value.id)
              // getcityList(value.id)
            }}
            colorOpacity={showHideField}
            disable={showHideField}
            value={fields?.State}
            data={stateList}
          />
          <Text style={styles.errorText}>
            {blurredField === 'State' && validationerror?.State}
          </Text>

          <CustomizableDropdown
            iconUri={image.cityIcon}
            placeholder={textStorage['BasicdetailsScreen.city']}
            onChange={value => {
              handleInputChange(value?.name, 'City');
              setCityId(value.id);
              // getcityList(value.id)
            }}
            colorOpacity={showHideField}
            disable={showHideField}
            value={fields?.City}
            data={cityList}
          />
          <Text style={styles.errorText}>
            {blurredField === 'City' && validationerror?.City}
          </Text>

          {/* <View style={styles.commonRowStyleWithSpaceBetween}>
            <View style={styles.inputSubcontainerStyle}>
              <BasicDetailsInput
                placeholder={textStorage['BasicdetailsScreen.state']}
                iconUri={image.pincodeGreyIcon}
                setInputValue={value => handleInputChange(value, 'State')}
                data={stateValue}
                editableL={stateId==null||undefined==""?true:false}
                imageClick={()=>{
                  console.log(">")
                  }}
              />
              <Text style={styles.errorText}>{validationerror?.State}</Text>
            </View>
            <View style={styles.inputSubcontainerStyle}>
              <BasicDetailsInput
                placeholder={textStorage['BasicdetailsScreen.city']}
                iconUri={image.pincodeGreyIcon}
                setInputValue={value => handleInputChange(value, 'City')}
                data={city}
                editableL={cityId==null||undefined?true:false}
                imageClick={()=>{
                  console.log(">")
                  }}
              />
              <Text style={styles.errorText}>{validationerror?.City}</Text>
            </View>
          </View> */}
          <BasicDetailsInput
            placeholder={
              textStorage['PersonalInformationScreen.current_address']
            }
            iconUri={image.borderedLocationPinGreyIcon}
            multiline={true}
            data={fields.Currentaddress}
            // iconUri={image.userGreyIcon}
            setInputValue={value => handleInputChange(value, 'Currentaddress')}
            imageClick={() => {
              console.log('>');
            }}
            onBlur={() => handleBlur('Currentaddress', fields.Currentaddress)}
          />
          <Text style={styles.errorText}>
            {blurredField === 'Currentaddress' &&
              validationerror?.Currentaddress}
          </Text>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              setModalVisible(false);
            }}
            visible={modalVisible}>
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2),
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                  }}>
                  Choose an account
                </Text>
                <FlatList
                  data={emailList}
                  keyExtractor={item => item}
                  renderItem={renderItem}
                  const
                  style={{backgroundColor: 'white', width: '100%'}}
                />

                <Text
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{
                    marginTop: responsiveScreenWidth(2),
                    marginBottom: responsiveScreenWidth(10),
                    color: '#000000',
                    fontWeight: '500',
                    fontSize: responsiveFontSize(1.8),
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                  }}>
                  {'Add Account'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text
                    onPress={() => {
                      setModalVisible(false);
                      setfocusEmail(false);
                    }}
                    style={{
                      color: '#EE4D5B',
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    style={{
                      color: '#0085FF',
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    Ok
                  </Text>
                </View>
              </View>
            </Pressable>
          </Modal>
          <Button
            label={textStorage['BasicdetailsScreen.Continue']}
            onPress={() => {
              // isBackCall?
              // navigation.navigate("BasicDetailsScreen2")
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
});

export {BasicDetailsScreen1};
