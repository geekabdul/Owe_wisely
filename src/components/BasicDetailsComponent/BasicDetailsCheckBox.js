import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color, font} from '../../utility';

const BasicDetailsCheckBox = ({onPress, selected, label}) => {
  const {
    containerStyle,
    checkedContainerStyle,
    checkedWhiteContainerStyle,
    uncheckedContainerStyle,
    labelStyle,
  } = styles;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={containerStyle}>
        {selected ? (
          <View style={checkedContainerStyle}>
            <View style={checkedWhiteContainerStyle} />
          </View>
        ) : (
          <View style={uncheckedContainerStyle} />
        )}
        <Text style={labelStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkedContainerStyle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedWhiteContainerStyle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  uncheckedContainerStyle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.alto,
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
    marginLeft: 5,
    width:"60%",
    // backgroundColor:"yellow"
  },
});

export {BasicDetailsCheckBox};
