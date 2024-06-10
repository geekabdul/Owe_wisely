import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, font} from '../../utility';

const CibilScoreAuthorizeCheckbox = ({isChecked, onPress, textStorage}) => {
  const {
    containerStyle,
    labelTextStyle,
    labelBoldTextStyle,
    checkboxContainerStyle,
  } = styles;
  return (
    <View style={containerStyle}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={[
            checkboxContainerStyle,
            {
              backgroundColor: isChecked ? color.black : 'transparent',
            },
          ]}>
          {isChecked && <Image source={image.tickWhiteIcon} />}
        </View>
      </TouchableOpacity>
      <Text style={labelTextStyle}>
        {textStorage['PandetailsScreen.i_hereby_authorize']}{' '}
        <Text style={labelBoldTextStyle}>Owe Wisely</Text>{' '}
        {textStorage['PandetailsScreen.to_fetch_the_cibil_score.']}{' '}
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
    borderColor: color.black,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {CibilScoreAuthorizeCheckbox};
