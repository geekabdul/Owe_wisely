import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, ToastAndroid} from 'react-native';
import {image} from '../../assets';
import {
  BasicDetailsGenderCard,
  BasicDetailsInput,
  Button,
  CustomizableDropdown,
} from '../../components';
import {color} from '../../utility';
import axios from 'axios';
import {BASIC_URL, basicAuthTokenHeader} from '../../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  validateValues,
  validategender,
} from '../../validation/BasicDetailsScreenvalidation';
import {DrivingLicensevalidateValues} from '../../validation/VoterCardScreenvalidation';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {ConfirmationvalidateValues} from '../../validation/VoterCardScreenvalidation';
import {
  genderList,
  saveDrivingLicenseDetails,
} from '../../Api/BasicDetailsScreenApi';
import { responsiveFontSize } from '../../utility/Size';

const DrivingLicenseScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [genderlist, setGenderList] = useState(null);
  const [gender, setGender] = useState();
  const [gendererror, setGendererror] = useState();
  const [validationerror, SetValidationerror] = useState({});
  const [validationerror1, SetValidationerror1] = useState({});
  const [issubmit, setIssubmit] = useState(false);
  const [fields, setFields] = useState({
    Drivinglicensenumber: '',
    Dateofbirth: '',
    Pincode: '',
    Fullname: '',
  });

  const handlegender = value => {
    if (issubmit) {
      setGendererror(validategender(value));
    }
    setGender(value);
  };

  const handleInputChange = (value, fieldName) => {
    // if (issubmit) {
    // SetValidationerror(
    //   DrivingLicensevalidateValues({...fields, [fieldName]: value}),
    // );
    // }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    setIssubmit(true);
    setGendererror(validategender(gender));
    setGendererror(validategender(gender));
    SetValidationerror(validateValues(fields));
    SetValidationerror1(DrivingLicensevalidateValues(fields));

    const genderError = validategender(gender);
    const error = DrivingLicensevalidateValues(fields);

    if (
      fields.Drivinglicensenumber != '' &&
      fields.Fullname != '' 
      // &&
      // fields.Dateofbirth != '' &&
      // gender != '' &&
      // fields.Pincode != ''
    ) {
      const basicData = {
        driving_license_no: fields.Drivinglicensenumber,
        full_name: fields.Fullname,
        // dob: fields.Dateofbirth,
        // gender: gender,
        // address: fields.Pincode,
        // image_path: [],
      };

      console.log('BAsic Detail', JSON.stringify(basicData));
      saveDrivingLicenseDetails(basicData)
        .then(res => {
          if (res) {
            alert('Success');
          }
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          if (error?.response?.data?.message) {
            // Alert.alert(JSON.stringify(error.message));
            ToastAndroid.BOTTOM(JSON.stringify(error.message),ToastAndroid.SHORT);
            // AsyncStorage.removeItem('token');
            // AsyncStorage.removeItem('user');
          }
        });
      console.log('gender :>> ', gender);
      console.log('fields :>> ', fields);
    }
  };

  const getGender = async () => {
    genderList()
      .then(res => {
        setGenderList(res?.data?.list);
      })
      .catch(error => {
        if (error.response.data?.status === 0) {
          // AsyncStorage.removeItem('token');
          // AsyncStorage.removeItem('user');
          // navigation.navigate('LoginScreen');
        }
      });
  };

  useEffect(() => {
    getGender();
  }, []);

  return (
    <View style={styles.containerStyle}>
      <ScrollView style={styles.baseContainerStyle}>
        <BasicDetailsInput
          placeholder={
            textStorage['DrivingLicenseScreen.driving_license_number']
          }
          iconUri={image.drivingLicenseGreyIcon}
          imageClick={()=>{
            console.log(">")
            }}
          setInputValue={value =>
            handleInputChange(value, 'Drivinglicensenumber')
          }
        />
        <Text style={styles.errorText}>
          {validationerror?.Drivinglicensenumber}
        </Text>
        <BasicDetailsInput
          placeholder={textStorage['BasicdetailsScreen.Driving_full_name']}
          iconUri={image.userGreyIcon}
          imageClick={()=>{
            console.log(">")
            }}
          setInputValue={value => handleInputChange(value, 'Fullname')}
        />
        
        <Text style={styles.errorText}>{validationerror?.fullname}</Text>
        {/* <BasicDetailsInput
          placeholder={textStorage['BasicdetailsScreen.date_of_birth']}
          iconUri={image.userGreyIcon}
          editableL={false}
          data={global.Dateofbirth}
          setInputValue={value => handleInputChange(value, 'Dateofbirth')}
        />
        <Text style={styles.errorText}>{validationerror?.Dateofbirth}</Text>
        <BasicDetailsGenderCard
          textStorage={textStorage['DrivingLicenseScreen.gender']}
          // data={genderlist}
          editableL={false}
          data={global.Gender}
          setGender={handlegender}
        />
        <Text style={styles.errorText}>{gendererror?.gender}</Text>
        <BasicDetailsInput
          placeholder={
            textStorage['DrivingLicenseScreen.pin_code_current_address']
          }
          iconUri={image.pincodeGreyIcon}
          setInputValue={value => handleInputChange(value, 'Pincode')}
          type="pincode"
        />
        <Text style={styles.errorText}>{validationerror?.Pincode}</Text> */}
      </ScrollView>
      <Button
        style={styles.buttonStyle}
        label={textStorage['DrivingLicenseScreen.continue']}
        onPress={() => handleSubmit()}
      />
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
});

export {DrivingLicenseScreen};
