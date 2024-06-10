/*
D Name: Zeel Gohil
D Email ID: zeelgohil9757@gmail.com
D Contact Number: 9757463439
V Number: 1.0
Comp/Props Desc:
*/
import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {color, font} from '../../utility';

const OTPBox = props => {
  const {style, refCallback, key, ...remainingProps} = props;
  const {containerStyle, inputStyle} = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        style={inputStyle}
        {...remainingProps}
        ref={refCallback}
        key={key}
        placeholderTextColor={color.boulder}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 40,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: color.alto,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  inputStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'center',
  },
});

export {OTPBox};
