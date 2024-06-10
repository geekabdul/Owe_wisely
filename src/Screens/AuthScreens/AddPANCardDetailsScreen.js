import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Header,
  BasicDetailsInput,
  CustomizableDropdown,
  BasicDetailsGenderCard,
  Button,
  BasicDetailsContainerCard,
} from '../../components';
import {
  validateValues,
  validateemploymentTypeList,
  validatesalaryReceipt,
} from '../../validation/BasicDetailsScreenvalidation';
import {savePanCardDetails} from '../../Api/BasicDetailsScreenApi';
import {image} from '../../assets';
import {color, dimension} from '../../utility';
import axios from 'axios';
import {BASIC_URL, basicAuthTokenHeader} from '../../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AppStateContext} from '../../providers/AuthContextProvider';

// MAIN: Add pan card details screen
const AddPANCardDetailsScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [panNum, setPanNum] = useState();
  const [panCard, setPanCard] = useState();
  const [isPANUpload, setIsPANUpload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pinCode, setPinCode] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState(new Date());
  const [genderList, setGenderList] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fields, setFields] = useState({
    pan_card_no: '',
    fullname: '',
    Dateofbirth: '',
  });
  const [validationerror, SetValidationerror] = useState({});
  const [issubmit, setIssubmit] = useState(false);
  const error = validateValues(fields);
  // NOTE: Function to open camera
  const onCameraHandler = async () => {
    const result = await launchCamera();
    setPanCard([
      {
        filename: result.assets[0].fileName,
        path: result.assets[0].originalPath,
      },
    ]);
    setModalVisible(false);
    setIsPANUpload(true);
  };

  const handleInputChange = (value, fieldName) => {
    fieldName === 'fullname' ? (global.Fullname = value) : null;
    if (issubmit) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  // NOTE: Function to open galary
  const onGallaryHandler = async () => {
    const result = await launchImageLibrary();
    setPanCard([
      {
        filename: result.assets[0].fileName,
        path: result.assets[0].uri,
      },
    ]);
    setModalVisible(false);
    setIsPANUpload(true);
  };

  const onDeletePANCard = () => {
    setPanCard('');
    setIsPANUpload(false);
  };

  // NOTE: Date-Time picker
  const onChange = (event, selectedDate) => {
    setShow(false);
    setDob(selectedDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  // NOTE: Get gender types
  const getGender = async () => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${BASIC_URL}/master/genderList`, {
        headers: basicAuthTokenHeader(token),
      });
      setGenderList(response?.data?.data?.list);
    } catch (error) {
      console.log(error);
    }
  };
  const savePan = async () => {
    const data = {
      pan_card_no: fields?.pan_card_no,
      full_name: fields?.fullname,
      dob: fields?.Dateofbirth,
    };
    console.log('data', JSON.stringify(data));
    console.log('data', JSON.stringify(fields?.fullname));
    // console.log('data', JSON.stringify(res?.data?.details));
    // SetValidationerror(validateFields(fields));
    setIssubmit(true);
    // const error = validateFields(fields);
    // const dateErroe = validateDate(date);
    // const genderError = validategender(gender);
    // try {
    if (fields?.pan_card_no != '') {
      savePanCardDetails(data)
        .then(res => {
          console.log(JSON.stringify(res));
          if (res) {
            navigation.navigate('PANCardDetailsScreen', {
              userDetails: res?.data?.details,
            });
            // setshowSpinner(false);
          }
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          if (error?.response?.data?.message) {
            Alert.alert(error?.response?.data?.message);
            // setshowSpinner(false);
          }
        });
    } else {
      // Alert.alert("Please enter detail")
      console.log('sfjkdshf');
    }
  };

  useEffect(() => {
    setPanNum('');
    setDob(new Date());
    // getToken();
  }, []);

  return (
    <ScrollView style={styles.containerStyle} stickyHeaderIndices={[0]}>
      {/* NOTE: Header */}
      <Header
        backOnPress={() => navigation.navigate('BasicLoanDetailScreen')}
        iconUri={image.infoIcon}
        label={textStorage['AddPANCardDetailsScreen.your_pan_details']}
        contentContainerStyle={{backgroundColor: color.white}}
      />
      <View style={styles.baseContainerStyle}>
        {/* NOTE: PAN number input */}
        <BasicDetailsInput
          placeholder={textStorage['BasicdetailsScreen.full_name']}
          iconUri={image.userGreyIcon}
          editableL={false}
          data={global.Fullname}
          imageClick={() => {
            console.log('>');
          }}
          setInputValue={value => handleInputChange(value, 'fullname')}
        />
        <Text style={styles.errorText}>{validationerror?.fullname}</Text>
        <BasicDetailsInput
          placeholder={textStorage['BasicdetailsScreen.date_of_birth']}
          iconUri={image.userGreyIcon}
          editableL={false}
          data={global.Dateofbirth}
          imageClick={() => {
            console.log('>');
          }}
          setInputValue={value => handleInputChange(value, 'Dateofbirth')}
        />
        <Text style={styles.errorText}>{validationerror?.Dateofbirth}</Text>
        <BasicDetailsInput
          autoCapitalizeL={'characters'}
          placeholder={textStorage['UsedifferentpanScreen.pan_number']}
          iconUri={image.drivingLicenseGreyIcon}
          setInputValue={value => handleInputChange(value, 'pan_card_no')}
          type="pan_card_no"
          imageClick={() => {
            console.log('>');
          }}
        />
        <Text style={styles.errorText}>{validationerror?.pan_card_no}</Text>

        {/* NOTE: PAN card picture */}
        {/* <View>
          {isPANUpload && panCard !== '' && (
            <>
              <Image
                source={{uri: panCard[0].path}}
                style={{
                  borderRadius: 4,
                  width: '100%',
                  height: 200,
                  marginBottom: 20,
                  borderWidth: 0.5,
                  borderColor: color.black,
                }}
                resizeMode="stretch"
              />
              <TouchableOpacity
                onPress={onDeletePANCard}
                style={{
                  position: 'absolute',
                  right: 0,
                  backgroundColor: color.gray,
                  borderRadius: 100,
                  margin: 12,
                }}>
                <Image
                  source={image.closeIconRed}
                  style={{
                    width: 18,
                    height: 18,
                    margin: 8,
                  }}
                  tintColor={'white'}
                />
              </TouchableOpacity>
            </>
          )}
        </View> */}
        {/* <Button
          style={styles.buttonStyle}
          label={!isPANUpload ? 'Upload Pan Card' : 'Update PAN Card'}
          onPress={() => setModalVisible(true)}
        /> */}
        {/* <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(000, 000, 000, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: color.white,
                borderColor: color.black,
                borderWidth: 0.5,
                borderRadius: 5,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: Dimensions.get('screen').width / 2,
                height: Dimensions.get('screen').width / 2,
              }}>
              <Button
                label={'Camera'}
                style={{width: 100}}
                onPress={onCameraHandler}
              />
              <Button
                label={'Gallary'}
                style={{width: 100}}
                onPress={onGallaryHandler}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{color: color.black}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        {/* NOTE: Date of birth input */}
        {/* <View>
          <BasicDetailsContainerCard>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={
                  textStorage['AddPANCardDetailsScreen.date_of_birth']
                }
                placeholderTextColor={color.boulder}
                value={moment.utc(dob).format('DD/MM/YYYY')}
                onChangeText={e => setDob(e)}
                keyboardType="number-pad"
                style={{color: color.black}}
                editable={false}
              />
              <View
                style={{
                  height: dimension.width * 0.09,
                  width: dimension.width * 0.09,
                  borderTopLeftRadius: 2,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onTouchEnd={() => showMode('date')}>
                <Image source={image.caretDownBlackIcon} />
              </View>
            </View>
          </BasicDetailsContainerCard>
        </View> */}
        {/* <Button onPress={showDatepicker} label="Show date picker!" /> */}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            dateFormat="day month year"
          />
        )}
        {/* NOTE: Gender input */}
        {/* <BasicDetailsGenderCard data={genderList} setGender={setGender} /> */}
        {/* NOTE: Pin code input */}
        {/* <BasicDetailsInput
          placeholder={'Pin code ( current address )'}
          iconUri={image.pincodeGreyIcon}
          setInputValue={setPinCode}
          keyBoardType="number-pad"
        /> */}
        {/* NOTE: continue button */}
        <Button
          style={styles.buttonStyle}
          label={textStorage['AddPANCardDetailsScreen.continue']}
          onPress={savePan}
        />
      </View>
    </ScrollView>
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
    marginBottom: 20,
  },
});

export {AddPANCardDetailsScreen};
