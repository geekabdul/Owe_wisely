import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {color, dimension, font, style} from '../utility';

const IntroductionScreenBottomCard = ({imageUri, label}) => {
  const {containerStyle, imageBoxStyle, labelTextStyle, labelNormalTextStyle} =
    styles;
  const {commonImageStyle} = style;

  const mainText = () => {
    var myString = label;
    myString = myString.substring(0, myString.lastIndexOf(' '));
    return myString;
  };

  const subText = () => {
    var n = label.split(' ');
    return n[n.length - 1];
  };

  return (
    <View style={containerStyle}>
      <View style={imageBoxStyle}>
        <Image
          resizeMode={'contain'}
          style={commonImageStyle}
          source={imageUri}
        />
      </View>
      <Text style={labelTextStyle}>
        {mainText()} {'\n'}
        <Text style={labelNormalTextStyle}>{subText()}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageBoxStyle: {
    width: dimension.width * 0.2,
    height: dimension.height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 12,
  },
  labelTextStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.black,
    textAlign: 'center',
    width: '90%',
  },
  labelNormalTextStyle: {
    fontFamily: font.soraRegular,
    color: color.nightRider,
  },
});

export {IntroductionScreenBottomCard};
