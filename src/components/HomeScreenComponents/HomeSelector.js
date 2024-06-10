import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color, font} from '../../utility';

const HomeSelector = ({selected, label, onPress}) => {
  const {containerStyle, labelStyle} = styles;
  const containerExtraStyle = {
    borderWidth: selected ? 0 : 1,
    borderColor: selected ? undefined : color.black,
    backgroundColor: selected ? color.black : color.white,
  };
  const labelExtraStyle = {
    color: selected ? color.white : color.black,
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[containerStyle, containerExtraStyle]}>
        <Text style={[labelStyle, labelExtraStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
  },
});

export {HomeSelector};
