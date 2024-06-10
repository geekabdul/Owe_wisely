import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {color, font} from '../../utility';

const BottomTabItem = ({source, label, focused}) => {
  const {containerStyle, labelStyle} = styles;
  const textColor = focused ? color.white : color.manhattan;
  return (
    <View style={containerStyle}>
      <Image source={source} />
      <Text style={[labelStyle, {color: textColor}]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    marginTop: 8,
  },
});

export {BottomTabItem};
