import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, font} from '../../utility';

const EnterBankDetailsHeader = ({isConfirmed, confirmBank, textStorage}) => {
  const {containerStyle, labelStyle, completedContainerStyle} = styles;
  console.log('confirmBank :>> ', confirmBank);
  const backgroundColor = !isConfirmed
    ? 'rgba(237, 126, 82, 0.08)'
    : 'rgba(13, 152, 10, 0.07)';
  if (!isConfirmed) {
    return (
      <View style={[containerStyle, {backgroundColor}]}>
        <Image source={image.bankIcon} />
        <Text style={labelStyle}>
          {textStorage['AccountDetailsScreen.enter_bank_details']}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={[containerStyle, {backgroundColor}]}>
        <Image source={confirmBank?.bankLogo} />
        <Text style={labelStyle}>{confirmBank?.bankName}</Text>
        <View style={completedContainerStyle}>
          <Image source={image.tickWhiteIcon} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'rgba(237, 126, 82, 0.08)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: font.soraBold,
    color: color.black,
    marginLeft: 20,
  },
  completedContainerStyle: {
    height: 40,
    width: 40,
    backgroundColor: color.jade,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.white,
    marginLeft: 50,
  },
});

export {EnterBankDetailsHeader};
