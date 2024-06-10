import React ,{useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, font} from '../../utility';
import { AppStateContext } from '../../providers/AuthContextProvider';

const PermissionAuthorizeCheckbox = ({isChecked, onPress}) => {
  const {
    containerStyle,
    labelTextStyle,
    labelBoldTextStyle,
    checkboxContainerStyle,
  } = styles;

  const {textStorage} = useContext(AppStateContext)
  // console.log('textStorage --- :>> ', textStorage);

  return (
    <View style={containerStyle}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={[
            checkboxContainerStyle,
            {
              backgroundColor: isChecked ? color.grenadier : 'transparent',
            },
          ]}>
          {isChecked && <Image source={image.tickWhiteIcon} />}
        </View>
      </TouchableOpacity>
      <Text style={labelTextStyle}>
      {textStorage['PermissionScreen.i_authorized_to']}{' '}<Text style={labelBoldTextStyle}>OweWisely</Text> {textStorage['PermissionScreen.to_access_collect_the_above_mentioned_data']}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    flexShrink: 1,
    marginLeft: 20,
  },
  labelBoldTextStyle: {
    fontFamily: font.soraBold,
  },
  checkboxContainerStyle: {
    height: 20,
    width: 20,
    borderRadius: 2,
    borderColor: color.black,
    borderWidth: 1,
    backgroundColor: color.grenadier,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {PermissionAuthorizeCheckbox};
