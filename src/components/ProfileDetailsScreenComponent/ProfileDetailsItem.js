import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, dimension, font} from '../../utility';
import {responsiveScreenWidth} from '../../utility/Size';
import moment from 'moment';

const ProfileDetailsItem = ({label, value}) => {
  const {containerStyle, keyLabelTextStyle, valueLabelTextStyle} = styles;
  return (
    <View style={containerStyle}>
      <Text style={keyLabelTextStyle}>{label}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={valueLabelTextStyle}>
        {label.includes('DD/MM/YYYY')
          ? moment(value).format('DD/MM/YYYY')
          : value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  keyLabelTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.gray1,
    width: responsiveScreenWidth(45),
    // backgroundColor:"red"
  },
  valueLabelTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
    width: responsiveScreenWidth(45),
    textAlign: 'justify',
    // backgroundColor:"red"
  },
});

export {ProfileDetailsItem};
