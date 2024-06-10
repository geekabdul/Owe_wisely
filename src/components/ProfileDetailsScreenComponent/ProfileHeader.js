import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {DrawerActions} from '@react-navigation/native';

const ProfileHeader = ({
  data,
  textStorage,
  notificationOnPress,
  backOnPress,
  onPress,
}) => {
  const {
    containerStyle,
    headerContainerStyle,
    headerImageBoxStyle,
    imageStyle,
    imageBoxStyle,
    detailPlacementContainerStyle,
    welcomeMessageTextStyle,
    nameTextStyle,
    phoneNumberTextStyle,
  } = styles;
  const {commonRowStyle} = style;

  return (
    <View style={containerStyle}>
      <View style={headerImageBoxStyle}>
        <Image style={imageStyle} source={image.viewProfileHeaderImage} />
      </View>
      <View style={headerContainerStyle}>
        <TouchableOpacity activeOpacity={0.8} onPress={backOnPress}>
          <Image source={image.backArrowWhiteIcon} />
        </TouchableOpacity>
        <View style={commonRowStyle}>
          <TouchableOpacity activeOpacity={0.8} onPress={notificationOnPress}>
            <Image source={image.notificationWhiteIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onPress()}>
          <Image style={{marginLeft: 20}} source={image.hamburgerWhiteIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={detailPlacementContainerStyle}>
        <View style={imageBoxStyle}>
          <Image
            resizeMode={'cover'}
            style={imageStyle}
            source={image.dummyImage}
          />
        </View>
        <Text style={welcomeMessageTextStyle}>
          {textStorage['PersonalInformationProfileScreen.welcome']}
        </Text>
        <Text style={nameTextStyle}>
          {data?.name}
        </Text>
        <Text style={phoneNumberTextStyle}>
          <Image source={image.phoneOrangeIcon} />
          {data?.phone}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainerStyle: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerImageBoxStyle: {
    height: dimension.height * 0.2,
    width: dimension.width,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  imageBoxStyle: {
    height: dimension.width * 0.2,
    width: dimension.width * 0.2,
    borderRadius: dimension.width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.black,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: color.white,
  },
  detailPlacementContainerStyle: {
    position: 'absolute',
    top: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessageTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
  },
  nameTextStyle: {
    fontSize: 16,
    fontFamily: font.soraBold,
    color: color.black,
  },
  phoneNumberTextStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.grenadier,
    textAlign: 'center',
  },
});

export {ProfileHeader};
