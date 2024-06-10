import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, font} from '../../utility';

const SelectBankHeader = ({label}) => {
  const {containerStyle, labelStyle} = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: color.white,
    paddingVertical: 20,
    paddingHorizontal: 22,
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
});

export {SelectBankHeader};
