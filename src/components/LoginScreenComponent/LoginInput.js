import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {image} from '../../assets';
import {color, font, style} from '../../utility';

const LoginInput = ({
  label,
  iconRight,
  isPhone,
  onChangeInput,
  inputValue,
  placeholder = 'Enter placeholder value',
  setInput,
  onFocus,
  editableL,
}) => {
  const {
    containerStyle,
    labelTextStyle,
    inputIconContainerStyle,
    inputStyle,
    verticalDashStyle,
    countryCodeTextStyle,
  } = styles;
  const {commonRowStyle} = style;

  return (
    <View style={containerStyle}>
      {label && <Text style={labelTextStyle}>{label}</Text>}
      <View style={inputIconContainerStyle}>
        {isPhone && (
          <View style={commonRowStyle}>
            <Image source={image.flagIndiaIcon} />
            <View style={verticalDashStyle} />
            <Text style={countryCodeTextStyle}>+91</Text>
          </View>
        )}
        <TextInput
          editable={editableL}
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={color.boulder}
          keyboardType={isPhone ? 'numeric' : 'email-address'}
          value={inputValue}
          onChangeText={onChangeInput}
          onFocus={onFocus}
          autoComplete={isPhone ? 'tel-national' : 'email'}
          importantForAutofill="yes"
        />
        <Image source={iconRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // containerStyle: {
  //   marginBottom: 15,
  // },
  labelTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    marginBottom: 5,
  },
  inputIconContainerStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: color.alto,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  verticalDashStyle: {
    height: 28,
    width: 1,
    backgroundColor: color.silverChalice,
    marginHorizontal: 15,
  },
  countryCodeTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    paddingRight: 15,
  },
  inputStyle: {
    flex: 1,
    color: color.black,
  },
});

export {LoginInput};
