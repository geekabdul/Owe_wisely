import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';

const ShareWithYourFriends = ({textStorage}) => {
  const {
    containerStyle,
    labelStyle,
    iconsMainContainerStyle,
    borderedLogoContainerStyle,
    filledLogoContainerStyle,
  } = styles;
  const {commonRowStyleWithSpaceBetween} = style;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>
        {textStorage['HomeScreen.share_with_your']}{' '}
        <Text style={{color: color.grenadier}}>
          {textStorage['HomeScreen.friends']}
        </Text>
      </Text>
      <View style={[commonRowStyleWithSpaceBetween, iconsMainContainerStyle]}>
        <View style={borderedLogoContainerStyle}>
          <Image source={image.facebookIconBlack} />
        </View>
        <View style={filledLogoContainerStyle}>
          <Image source={image.instagramIconWhite} />
        </View>
        <View style={borderedLogoContainerStyle}>
          <Image source={image.twitterIconBlack} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    marginVertical: 40,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: font.soraBold,
    color: color.shark,
  },
  iconsMainContainerStyle: {
    width: dimension.width * 0.35,
    marginTop: 20,
    alignSelf: 'center',
  },
  borderedLogoContainerStyle: {
    height: 32,
    width: 32,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledLogoContainerStyle: {
    height: 32,
    width: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.grenadier,
  },
});

export {ShareWithYourFriends};
