import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';

const AllNotificationCard = ({isActive}) => {
  const {containerStyle, labelTextStyle, rightContainerStyle, dateTextStyle} =
    styles;
  return (
    <View style={containerStyle}>
      <View style={style.commonRowStyle}>
        <Image
          source={
            isActive ? image.notificationBlackIcon : image.notificationGreyIcon
          }
        />
        <Text
          style={[
            labelTextStyle,
            {color: isActive ? color.black : color.gray},
          ]}>
          Your Loan Amount is approved
        </Text>
      </View>
      <View style={rightContainerStyle}>
        <Image source={image.closeIconRed} />
        <Text style={dateTextStyle}>28th Oct 2022</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderColor: color.concrete,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
    width: dimension.width * 0.4,
    marginLeft: 22,
  },
  rightContainerStyle: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dateTextStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    color: color.silverChalice,
  },
});

export {AllNotificationCard};
