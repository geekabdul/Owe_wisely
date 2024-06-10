import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../../utility';

const BasicDetailsContainerCard = ({children}) => {
  const {containerStyle} = styles;
  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: color.silver,
    paddingLeft: 20,
    paddingVertical: 6,
    paddingRight: 6,
    borderRadius: 2,
    marginBottom: 20,
  },
});

export {BasicDetailsContainerCard};
