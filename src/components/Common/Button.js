import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color, font} from '../../utility';
import { responsiveScreenWidth } from '../../utility/Size';

const Button = ({style, label, onPress, isButtonEnabled}) => {
  const {containerStyle, labelStyle} = styles;
  // const isButtonEnabled = label === 'Verify' && otpArray?.includes(''); // Modify this condition as needed
  // const isButton = label === 'I Agree' && authorizeCibilScore; // Modify this condition as needed

  return (
    <>
      <TouchableOpacity
        disabled={isButtonEnabled}
        style={isButtonEnabled ? {opacity: 0.5} : {opacity: 1}}
        activeOpacity={0.8}
        onPress={onPress}>
        <View style={[containerStyle, style]}>
          <Text style={labelStyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 50,
    backgroundColor: color.grenadier,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 18,
    fontFamily: font.soraBold,
    color: color.white,
  },
});

export {Button};
