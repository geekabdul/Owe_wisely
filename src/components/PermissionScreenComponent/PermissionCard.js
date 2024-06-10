import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {color, dimension, font} from '../../utility';

const PermissionCard = ({
  onPress,
  imageUri,
  permissionName,
  permissionDescription,
}) => {
  const {
    containerStyle,
    imageBoxStyle,
    rightContainerStyle,
    permissionNameTextStyle,
    permissionDescriptionTextStyle,
  } = styles;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // onPress={onPress}
    >
      <View style={containerStyle}>
        <View style={imageBoxStyle}>
          <Image
            source={imageUri}
            style={{height: 20, width: 20,resizeMode :'contain'}}
          />
        </View>
        <View style={rightContainerStyle}>
          <Text style={permissionNameTextStyle}>{permissionName}</Text>
          <Text style={permissionDescriptionTextStyle}>
            {permissionDescription}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    backgroundColor: color.wildSand,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainerStyle: {
    flexShrink: 1,
    marginLeft: 15,
  },
  permissionNameTextStyle: {
    fontSize: 15,
    fontFamily: font.soraBold,
    color: color.black,
  },
  permissionDescriptionTextStyle: {
    fontSize: 13,
    fontFamily: font.soraRegular,
    color: color.gray,
    // textAlign: 'justify',
  },
});

export {PermissionCard};
