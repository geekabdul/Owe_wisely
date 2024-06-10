import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../../utility';

export default function AutoDetectIndicator({
  containerStyle,
  indicatorStyle,
  label,
  labelStyle,
  size = 24,
}) {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <ActivityIndicator
        size={size}
        style={[styles.indicatorStyle, indicatorStyle]}
        color={color.white}
      />
      {label && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },

  labelStyle: {
    color: color.black,
    marginTop: 12,
  },

  indicatorStyle: {
    backgroundColor: color.grenadier,
    borderRadius: 5,
    paddingVertical: 12,
    width: '100%',
    height: 50,
  },
});
