import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {BasicDetailsProgressComponent, Button, Header} from '../../components';
import {color, dimension, font, style} from '../../utility';
import {BASIC_URL, basicAuthTokenHeader} from '../../libs/apiConfig';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CibilscoresScreen = ({navigation, route}) => {
  const {userDetails} = route.params;

  const [cibildata, setCibildata] = useState();
  //   console.log(
  //     'userDetails ----------------:>> ',
  //     userDetails?.pan_card_details?.pan_card_no,
  //   );

  const getCIBIL = async () => {
    let token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    let obj = {
      document_type: 'pan_card',
      pan_card_no: userDetails?.pan_card_details?.pan_card_no,
    };
    try {
      const response = await axios.post(
        `${BASIC_URL}/customer/checkCIBILScore`,
        obj,
        {
          headers: basicAuthTokenHeader(token, selectedLanguage),
        },
      );
      setCibildata(response?.data?.data);
    } catch (error) {
      console.log(error);
      if (error.response.data?.status === 0) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        navigation.navigate('LoginScreen');
      }
    }
  };

  useEffect(() => {
    getCIBIL();
  }, [userDetails]);

  return (
    <View style={styles.containerStyle}>
      <Header noBack={true} iconUri={image.homeSelectedIcon} label={'CIBIL scores'} />
      <BasicDetailsProgressComponent id={1} isActive={2} />
      <View style={styles.contentStyle}>
        <Text style={styles.checkingEligibilityTextStyle}>CIBIL SCORES </Text>
        <Text style={styles.checkingEligibilityTextStyle}>
          <Text style={styles.eligibilityTextStyle}>
            {cibildata?.response?.details}
          </Text>{' '}
        </Text>
      </View>
      <Button
        label={'Continue'}
        onPress={() => navigation.navigate('CheckEligibilityScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
    paddingBottom: 20,
  },
  contentStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  checkingEligibilityTextStyle: {
    fontSize: 20,
    fontFamily: font.soraBold,
    color: color.black,
  },
  eligibilityTextStyle: {
    color: color.grenadier,
  },
});

export {CibilscoresScreen};
