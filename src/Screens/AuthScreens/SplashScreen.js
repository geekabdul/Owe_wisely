import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [token, settoken] = useState('Loading');
  const getData = async () => {
    const authToken = await AsyncStorage.getItem('token');
    console.log(authToken, 'tokenn');
    settoken(authToken);
  };

  useEffect(() => {
    console.log("in splash");
    // getData();
  }, []);

  useEffect(async() => {
    // getData();
    setTimeout(() => {
      navigation.navigate('AuthNavigator');
    }, 2500);
  }, []);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.placerStyle}>
        <View style={styles.imageBoxStyle}>
          <Image source={image.splashLogo} />
        </View>
        <Text style={styles.oweWiselyTextStyle}>
          Owe <Text style={styles.wiselyTextStyle}>Wisely</Text>
        </Text>
        <Text style={styles.messageTextStyle}>
          Loan marketplace for Retail {'\n'}& SME Borrowers
        </Text>
      </View>
      <View style={style.commonRowStyle}>
        <Image source={image.safeSecureIcon} />
        <Text style={styles.safeAndSecureTextStyle}>Safe & Secure</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    paddingBottom: 25,
  },
  placerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBoxStyle: {
    width: dimension.width * 0.5,
    height: dimension.width * 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  oweWiselyTextStyle: {
    fontSize: 40,
    fontFamily: font.soraBold,
    color: color.nightRider,
    marginVertical: 15,
  },
  wiselyTextStyle: {
    color: color.vermilion,
  },
  messageTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.nightRider,
    textAlign: 'center',
  },
  safeAndSecureTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    marginLeft: 15,
  },
});

export {SplashScreen};
