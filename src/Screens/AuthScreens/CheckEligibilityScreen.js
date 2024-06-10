import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Alert, BackHandler} from 'react-native';
import {image} from '../../assets';
import {BasicDetailsProgressComponent, Header} from '../../components';
import {color, dimension, font, style} from '../../utility';
import {getCIBIL} from '../../Api/EligibilityConfirmationApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const CheckEligibilityScreen = ({navigation, route}) => {
  // const {userDetails} = route.params;
  const {textStorage} = useContext(AppStateContext);
  const [showLoader, setShowLoader] = useState(false);
  const [name, setName] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        navigation.navigate('PANCardDetailsScreen', {
          loanAmount: route.params?.loanAmount,
          loanPurpose: route.params?.loanPurpose,
          incomeM: route.params?.incomeM,
          userDetails: route.params?.userDetails,
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

  useEffect(async () => {
    let pan_card_details = await AsyncStorage.getItem('pan_card_details');
    let username = await AsyncStorage.getItem('username');
    setName(username);
    console.log('pan_card_details', pan_card_details);
    let pancard_details = JSON.parse(pan_card_details);
    console.log('pancard_details', pancard_details?.pan_card_no);
    setShowLoader(true);
    checkCibiApi(pancard_details?.pan_card_no);
  }, []);

  const checkCibiApi = pan_card_no => {
    const obj = {
      document_type: 'driving_license',
      // "pan_card_no":"AOBBN3836L"
      // "voter_card_no":"AUNPA0409J"
      driving_license_no: 'HR2611669876709',
    };

    getCIBIL(obj)
      .then(res => {
        console.log('res', JSON.stringify(res));
        // if (res?.data?.response) {
        navigation.navigate('EligibilityConfirmationScreen', {
          name: name,
          loanAmount: route.params?.loanAmount,
          loanPurpose: route.params?.loanPurpose,
          incomeM: route.params?.incomeM,
          userDetails: route.params?.userDetails,
        });
        setShowLoader(false);
        // }
      })
      .catch(error => {
        setShowLoader(false);
        navigation.navigate('NotEligibilityScreen', {name: name});
        // Alert.alert(JSON.stringify(error.data.message));
        console.log('error :>> ', error);
      });
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        noBack={true}
        iconUri={image.homeSelectedIcon}
        label={textStorage['CheckEligibilityScreen.checking_eligibility']}
      />
      <Spinner visible={showLoader} />
      <BasicDetailsProgressComponent
        id={3}
        isActive={4}
        textStorage={textStorage}
      />
      <View style={styles.contentStyle}>
        <View style={styles.imageBoxStyle}>
          <Image
            resizeMode={'contain'}
            style={style.commonImageStyle}
            source={image.checkEligibilityImage}
          />
        </View>
        <Text style={styles.checkingEligibilityTextStyle}>
          {textStorage['CheckEligibilityScreen.checking_your']}{' '}
          <Text
            style={styles.eligibilityTextStyle}
            // onPress={() =>
            //   navigation.navigate('EligibilityConfirmationScreen')
            // }
          >
            {textStorage['CheckEligibilityScreen.eligibility']}{' '}
          </Text>{' '}
          ...
        </Text>
        <Text style={styles.thankyouMessageTextStyle}>
          {textStorage['CheckEligibilityScreen.thanks_for_your_patience']}{' '}
          {'\n'} {textStorage['CheckEligibilityScreen.wait_a_few_moments']}{' '}
        </Text>
      </View>
      <Text style={styles.bottomTextStyle}>
        {textStorage['CheckEligibilityScreen.do_not_press_the']} {'\n'}{' '}
        <Text style={styles.bottomTextBoldStyle}>
          ‘{textStorage['CheckEligibilityScreen.back_button']} ’
        </Text>{' '}
        {textStorage['CheckEligibilityScreen.or']}{' '}
        <Text style={styles.bottomTextBoldStyle}>
          ‘{textStorage['CheckEligibilityScreen.close']} ’
        </Text>{' '}
        {textStorage['CheckEligibilityScreen.this_screen']}{' '}
      </Text>
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
    marginTop: 50,
  },
  imageBoxStyle: {
    height: dimension.height * 0.2,
    width: dimension.width * 0.5,
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkingEligibilityTextStyle: {
    fontSize: 20,
    fontFamily: font.soraBold,
    color: color.black,
    alignSelf: 'center',
    marginTop: 40,
  },
  eligibilityTextStyle: {
    color: color.grenadier,
  },
  thankyouMessageTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  bottomTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'center',
  },
  bottomTextBoldStyle: {
    fontFamily: font.soraBold,
  },
});

export {CheckEligibilityScreen};
