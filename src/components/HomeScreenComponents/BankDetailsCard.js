import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';

const BankDetailsCard = ({
  imageUri,
  interestRate,
  processingFees,
  tenure,
  lenderName,
}) => {
  const {containerStyle, imageBoxStyle, borderStyle, keyStyle, valueStyle} =
    styles;
  const {commonRowStyle, commonRowStyleWithSpaceBetween, commonImageStyle} =
    style;
  return (
    <View style={containerStyle}>
      <View style={commonRowStyleWithSpaceBetween}>
        <View style={imageBoxStyle}>
          <Image
            resizeMode={'contain'}
            style={commonImageStyle}
            source={imageUri}
          />
          {/* remove after getting image from api */}
          {lenderName && <Text style={{color: 'red'}}>{lenderName}</Text>}
        </View>
        <Image source={image.shareBlackIcon} />
      </View>
      <View style={borderStyle} />
      <View style={commonRowStyleWithSpaceBetween}>
        <Text style={keyStyle}>Interest Rate</Text>
        <Text style={valueStyle}>{interestRate}</Text>
      </View>
      <View style={[commonRowStyleWithSpaceBetween, {marginTop: 20}]}>
        <Text style={keyStyle}>Processing Fees</Text>
        <Text style={valueStyle}>{processingFees}</Text>
      </View>
      <View style={[commonRowStyleWithSpaceBetween, {marginTop: 20}]}>
        <Text style={keyStyle}>Tenure</Text>
        <Text style={valueStyle}>{tenure}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 15,
    backgroundColor: color.white,
    marginRight: 15,
    borderRadius: 20,
    width: dimension.width / 2,
  },
  imageBoxStyle: {
    height: dimension.width * 0.05,
    width: dimension.width / 3.5,
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderColor: color.wildSand2,
    marginVertical: 15,
  },
  keyStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    color: color.black,
  },
  valueStyle: {
    fontSize: 10,
    fontFamily: font.soraBold,
    color: color.black,
  },
});

export {BankDetailsCard};
