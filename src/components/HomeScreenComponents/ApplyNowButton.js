import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {image} from '../../assets';
import {color, font} from '../../utility';

const ApplyNowButton = ({label}) => {
  const {containerStyle, labelStyle} = styles;
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <Image source={image.doubleCaretRightWhiteIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: color.grenadier,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.white,
    marginRight: 3,
  },
});

export {ApplyNowButton};
