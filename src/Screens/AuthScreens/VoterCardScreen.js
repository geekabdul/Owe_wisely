import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
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
import {validategender} from '../../validation/BasicDetailsScreenvalidation';
import {ConfirmationvalidateValues} from '../../validation/VoterCardScreenvalidation';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {saveVoterCardDetails} from '../../Api/BasicDetailsScreenApi';
import { responsiveFontSize } from '../../utility/Size';

const VoterCardScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [genderList, setGenderList] = useState(null);
  const [gender, setGender] = useState();
  const [gendererror, setGendererror] = useState();
  const [validationerror, SetValidationerror] = useState({});
  const [issubmit, setIssubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [fields, setFields] = useState({
    Votercardnumber: '',
    // Dateofbirth: '',
    // Pincode: '',
    Fullname: '',
  });

  const data = [
    {label: 'Option 12', value: 'option1'},
    {label: 'Option 23', value: 'option2'},
    {label: 'Option 34', value: 'option3'},
  ];

  const handlegender = value => {
    if (issubmit) {
      setGendererror(validategender(value));
    }
    setGender(value);
  };

  const getGender = async () => {
    let token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    try {
      const response = await axios.get(`${BASIC_URL}/master/genderList`, {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      });
      // console.log(response?.data?.data?.list, 'genderrrrrrrrrrr');
      setGenderList(response?.data?.data?.list);
    } catch (error) {
      console.log(error);
      if (error.response.data?.status === 0) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        navigation.navigate('LoginScreen');
      }
    }
  };

  const handleInputChange = (value, fieldName) => {
    if (issubmit) {
      SetValidationerror(
        ConfirmationvalidateValues({...fields, [fieldName]: value}),
      );
    }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    setIssubmit(true);
    setGendererror(validategender(gender));
    SetValidationerror(ConfirmationvalidateValues(fields));

    const genderError = validategender(gender);
    const error = ConfirmationvalidateValues(fields);

    const basicData = {
      driving_license_no: fields.Drivinglicensenumber,
      full_name: fields.Fullname,
      // dob: fields.Dateofbirth,
      // gender: gender,
      // address: fields.Pincode,
      // image_path: [],
    };

    console.log('BAsic Detail', JSON.stringify(basicData));
    saveVoterCardDetails(basicData)
      .then(res => {
        if (res) {
          alert('Success');
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        if (error?.response?.data?.message) {
          ToastAndroid.BOTTOM(JSON.stringify(error.message),ToastAndroid.SHORT);
          // AsyncStorage.removeItem('token');
          // AsyncStorage.removeItem('user');
        }
      });
    console.log('gender :>> ', gender);
    console.log('fields :>> ', fields);
  };

  useEffect(() => {
    getGender();
    // getToken();
  }, []);

  return (
    <View style={styles.containerStyle}>
      <ScrollView style={styles.baseContainerStyle}>
        <BasicDetailsInput
          placeholder={textStorage['VoterCardScreen.voter_card_number']}
          iconUri={image.drivingLicenseGreyIcon}
          imageClick={()=>{
            console.log(">")
            }}
          setInputValue={value => handleInputChange(value, 'Votercardnumber')}
        />
        <Text style={styles.errorText}>{validationerror?.Votercardnumber}</Text>
        <BasicDetailsInput
         imageClick={()=>{
          console.log(">")
          }}
          placeholder={textStorage['BasicdetailsScreen.VoterCard_full_name']}
          iconUri={image.userGreyIcon}
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
          textStorage={textStorage['VoterCardScreen.gender']}
          data={genderList}
          setGender={handlegender}
        />
        <Text style={styles.errorText}>{gendererror?.gender}</Text>
        <BasicDetailsInput
          placeholder={textStorage['VoterCardScreen.pin_code_current_address']}
          iconUri={image.pincodeGreyIcon}
          setInputValue={value => handleInputChange(value, 'Pincode')}
        />
        <Text style={styles.errorText}>{validationerror?.Pincode}</Text> */}
      </ScrollView>
      <Button
        style={styles.buttonStyle}
        label={textStorage['VoterCardScreen.continue']}
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

export {VoterCardScreen};
