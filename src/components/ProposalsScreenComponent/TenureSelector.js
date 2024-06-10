import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color, dimension, font} from '../../utility';

const TenureSelector = ({onPress, selected, label}) => {
  const {containerStyle, labelStyle} = styles;
  const extraContainerStyle = {
    borderColor: selected ? color.black : color.alto,
  };
  const extraTextStyle = {
    color: selected ? color.black : color.boulder,
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[containerStyle, extraContainerStyle]}>
        <Text style={[labelStyle, extraTextStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: dimension.width / 3.6,
    marginBottom: 15,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.boulder,
  },
});

export {TenureSelector};
