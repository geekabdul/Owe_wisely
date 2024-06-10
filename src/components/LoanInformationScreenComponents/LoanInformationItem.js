import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, dimension, font} from '../../utility';

const LoanInformationItem = ({index, labelKey, labelValue}) => {
  const {containerStyle, keyLabelStyle, headerValueTextStyle, valueLabelStyle} = styles;
  const backgroundColor =
    index % 2 === 0 ? color.white : 'rgba(237, 126, 82, 0.05)';
    function formatWithCommas(n) {
      return n.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
    }
  return (
    <View style={[containerStyle, {backgroundColor}]}>
      <Text style={keyLabelStyle}>{labelKey}</Text>
      {index === 0 ? (
        <Text style={headerValueTextStyle}>{formatWithCommas(labelValue)}</Text>
      ) : (
        <Text style={valueLabelStyle}>{formatWithCommas(labelValue)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: dimension.width,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  keyLabelStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.gray,
    width: dimension.width * 0.6,
  },
  headerValueTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    marginEnd:10,
    textAlign:"right"
  },
  valueLabelStyle: {
    fontSize: 12,
    fontFamily: font.soraMedium,
    color: color.black,
    width: dimension.width * 0.2,
    marginEnd:10,
    textAlign:"right"
  },
});

export {LoanInformationItem};
