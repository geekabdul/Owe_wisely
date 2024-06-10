import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {ApplyNowButton} from './ApplyNowButton';

const HomeScreenHeader = ({
  notificationOnPress,
  userName = 'userName',
  draweropenOnPress,
  textStorage,
}) => {
  const {
    containerStyle,
    imageBoxStyle,
    hiMessageTextStyle,
    imageSpacingStyle,
    imageContentMainContainerStyle,
    bannerImageBoxStyle,
    bannerImageContentContainerStyle,
    headingContentTextStyle,
    availTextStyle,
  } = styles;
  const {commonRowStyleWithSpaceBetween, commonRowStyle, commonImageStyle} =
    style;
  return (
    <>
      <View style={containerStyle}>
        <View style={commonRowStyleWithSpaceBetween}>
          <View style={commonRowStyle}>
            <View style={imageBoxStyle}>
              <Image
                style={[
                  commonImageStyle,
                  {borderRadius: dimension.width * 0.09},
                ]}
                source={image.dummyImage}
              />
            </View>
            <Text style={hiMessageTextStyle}>
              {textStorage['HomeScreen.hi']} , {userName} !
            </Text>
          </View>
          <View style={commonRowStyle}>
            {/* <Image style={imageSpacingStyle} source={image.searchBlackIcon} /> */}
            <TouchableOpacity activeOpacity={0.8} onPress={notificationOnPress}>
              <Image
                style={imageSpacingStyle}
                source={image.notificationBlackIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={draweropenOnPress}>
              <Image
                style={imageSpacingStyle}
                source={image.hamburgerBlackIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={imageContentMainContainerStyle}>
        <View style={bannerImageBoxStyle}>
          <Image
            style={style.commonImageStyle}
            resizeMode={'contain'}
            source={image.homeBannerImage}
          />
        </View>
        <View style={bannerImageContentContainerStyle}>
          <Text style={headingContentTextStyle}>
            {textStorage['HomeScreen.making_personal']} {'\n'}
            {textStorage['HomeScreen.loans']}{' '}
            <Text style={{color: color.grenadier}}>
              {textStorage['HomeScreen.better']}
            </Text>
          </Text>
          <Text style={availTextStyle}>
            {textStorage['HomeScreen.avail_from_50k_to_15l']} {'\n'}
            {textStorage['HomeScreen.in_minutes']}{' '}
          </Text>
          <ApplyNowButton label={textStorage['HomeScreen.apply_now']} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'rgba(237, 126, 82, 0.08)',
    paddingLeft: 20,
    paddingVertical: 20,
    paddingRight: 10,
    width: dimension.width,
    height: dimension.height * 0.25,
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    borderRadius: dimension.width * 0.09,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: color.black,
    padding: 3,
  },
  hiMessageTextStyle: {
    fontSize: dimension.width * 0.045,
    fontFamily: font.soraRegular,
    color: color.black,
    marginLeft: 15,
  },
  imageSpacingStyle: {
    marginHorizontal: 10,
  },
  imageContentMainContainerStyle: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  bannerImageBoxStyle: {
    // backgroundColor: color.black,
    height: dimension.height * 0.3,
    width: dimension.width * 0.9,
    alignSelf: 'center',
  },
  bannerImageContentContainerStyle: {
    position: 'absolute',
    top: '30%',
    right: '10%',
  },
  headingContentTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    marginBottom: 5,
  },
  availTextStyle: {
    fontSize: 12,
    fontFamily: font.soraSemiBold,
    color: 'rgba(0, 0, 0, 0.68)',
    marginBottom: 5,
  },
});

export {HomeScreenHeader};
