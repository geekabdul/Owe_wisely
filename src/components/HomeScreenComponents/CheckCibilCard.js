import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {ApplyNowButton} from './ApplyNowButton';

const CheckCibilCard = ({textStorage}) => {
  const {
    containerStyle,
    imageStyle,
    rightContentContainerStyle,
    checkCibilScoreTextStyle,
  } = styles;
  return (
    <View style={containerStyle}>
      <Image style={imageStyle} source={image.checkCibilBannerImage} />
      <View style={rightContentContainerStyle}>
        <Text style={checkCibilScoreTextStyle}>
          {textStorage['HomeScreen.check_your_cibil']} {'\n'}
          {textStorage['HomeScreen.score']}{' '}
          <Text style={{color: color.grenadier}}>
            {textStorage['HomeScreen.now']}
          </Text>
        </Text>
        <ApplyNowButton label={textStorage['HomeScreen.check_cibil']} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 25,
    width: dimension.width * 0.9,
  },
  imageStyle: {
    width: '100%',
  },
  rightContentContainerStyle: {
    position: 'absolute',
    right: 24,
    top: 28,
    bottom: 28,
  },
  checkCibilScoreTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    marginBottom: 8,
  },
});

export {CheckCibilCard};
