import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, dimension, font} from '../../utility';

const RepaymentScheduleHeader = () => {
  const {
    containerStyle,
    itemContainerStyle,
    headerLabelStyle,
    rsSymbolTextStyle,
  } = styles;
  return (
    <View style={containerStyle}>
      <View style={itemContainerStyle}>
        <Text style={headerLabelStyle}>Installment {'\n'} No.</Text>
      </View>
      <View style={itemContainerStyle}>
        <Text style={headerLabelStyle}>
          Outstanding {'\n'}Principal (<Text style={rsSymbolTextStyle}>₹</Text>)
        </Text>
      </View>
      <View style={itemContainerStyle}>
        <Text style={headerLabelStyle}>Principal {'\n'} (₹)</Text>
      </View>
      <View style={itemContainerStyle}>
        <Text style={headerLabelStyle}>Interest {'\n'} (₹)</Text>
      </View>
      <View style={itemContainerStyle}>
        <Text style={headerLabelStyle}>Installment {'\n'} (₹)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    // flexShrink: 1,
    width: dimension.width,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  itemContainerStyle: {
    backgroundColor: 'rgba(237, 126, 82, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 1,
    width: dimension.width / 5,
  },
  headerLabelStyle: {
    fontSize: dimension.width * 0.023,
    fontFamily: font.soraRegular,
    color: color.black,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  rsSymbolTextStyle: {
    color: color.mandy,
  },
});

export {RepaymentScheduleHeader};
