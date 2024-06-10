import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {PermissionButton} from './PermissionButton';
import {PermissionModalContainer} from './PermissionModalContainer';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';

const PermissionLocationModal = ({
  visible,
  onPress,
  onPress1,
  onPress2,
  onPress3,
}) => {
  const {
    containerStyle,
    imageBoxStyle,
    permissionDescriptionTextStyle,
    appNameTextStyle,
    buttonContainerTextStyle,
  } = styles;
  const {permissionButtonSeparatorBorderStyle} = style;
  return (
    <PermissionModalContainer visible={visible} onPress={onPress}>
      <View style={containerStyle}>
        <View style={imageBoxStyle}>
          <Image source={image.locationPinOrangeIcon} />
        </View>
        <Text style={permissionDescriptionTextStyle}>
          Allow <Text style={appNameTextStyle}>Owe Wisely</Text> to {'\n'}access
          this device’s {'\n'}
          location ?
        </Text>
        <View style={buttonContainerTextStyle}>
          <PermissionButton
            color={color.azureRadiance}
            label={'While using this app'}
            onPress={onPress1}
          />
          <View style={permissionButtonSeparatorBorderStyle} />
          <PermissionButton
            color={color.black}
            label={'Only this time'}
            onPress={onPress2}
          />
          <View style={permissionButtonSeparatorBorderStyle} />
          <PermissionButton
            color={color.mandy}
            label={'Don’t allow'}
            onPress={onPress3}
          />
        </View>
      </View>
    </PermissionModalContainer>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: color.white,
    width: dimension.width * 0.7,
    borderRadius: 5,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    backgroundColor: color.wildSand,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionDescriptionTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    marginTop: 15,
    textAlign: 'center',
  },
  appNameTextStyle: {
    fontFamily: font.soraBold,
  },
  buttonContainerTextStyle: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export {PermissionLocationModal};
