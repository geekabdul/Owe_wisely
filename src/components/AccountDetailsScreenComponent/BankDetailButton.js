import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';

const BankDetailButton = ({bankLogo, bankName, data, handelSelectBank}) => {
  const {containerStyle, imageBoxStyle, bankNameTextStyle} = styles;
  const {commonImageStyle} = style;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handelSelectBank(data)}>
      <View style={containerStyle}>
        <View style={imageBoxStyle}>
          <Image
            style={commonImageStyle}
            resizeMode={'contain'}
            source={bankLogo}
          />
        </View>
        <Text style={bankNameTextStyle}>{bankName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.alto,
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankNameTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    marginLeft: 15,
  },
});

export {BankDetailButton};
