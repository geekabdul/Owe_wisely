import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, dimension, font} from '../../utility';

const RepaymentScheduleItem = ({
  index,
  installmentNumber,
  outstandingPrincipal,
  principal,
  interest,
  installment,
}) => {
  const {containerStyle, itemContainerStyle, labelStyle} = styles;
  const backgroundColor = index % 2 === 0 ? color.white : color.alabaster;
  function formatWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
  }
  return (
    <View style={containerStyle}>
      <View style={[itemContainerStyle, {backgroundColor}]}>
        <Text style={labelStyle}>{installmentNumber}</Text>
      </View>
      <View style={[itemContainerStyle, {backgroundColor}]}>
        <Text style={labelStyle}>{formatWithCommas(outstandingPrincipal)}</Text>
      </View>
      <View style={[itemContainerStyle, {backgroundColor}]}>
        <Text style={labelStyle}>{principal}</Text>
      </View>
      <View style={[itemContainerStyle, {backgroundColor}]}>
        <Text style={labelStyle}>{interest}</Text>
      </View>
      <View style={[itemContainerStyle, {backgroundColor}]}>
        <Text style={labelStyle}>{installment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: dimension.width,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainerStyle: {
    backgroundColor: 'rgba(237, 126, 82, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 1,
    width: dimension.width / 5,
  },
  labelStyle: {
    fontSize: dimension.width * 0.023,
    fontFamily: font.soraRegular,
    color: color.black,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});

export {RepaymentScheduleItem};
