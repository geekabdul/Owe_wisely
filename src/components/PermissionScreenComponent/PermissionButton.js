import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {style} from '../../utility';

const PermissionButton = ({color, label, onPress}) => {
  const {permissionButtonTextStyle} = style;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Text style={[permissionButtonTextStyle, {color}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
});

export {PermissionButton};
