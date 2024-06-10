import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color, dimension, font} from '../../utility';

const ProfileSelectorButton = ({label, onPress, selected}) => {
  const {
    containerStyle,
    selectedContainerStyle,
    labelStyle,
    selectedLabelStyle,
  } = styles;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={!selected ? containerStyle : selectedContainerStyle}>
        <Text
          style={[
            !selected ? labelStyle : selectedLabelStyle,
            {maxWidth: dimension.width * 0.3 - 30}, // Adjust the maxWidth as needed
          ]}
          numberOfLines={1} // Set the number of lines you want to allow
          ellipsizeMode="tail" // Truncate with an ellipsis if the text overflows
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 15,
    borderWidth: 1,
    borderColor: color.black,
    borderRadius: 25,
    width: dimension.width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedContainerStyle: {
    padding: 17,
    backgroundColor: color.black,
    borderRadius: 25,
    width: dimension.width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.black,
    textWrap: 'nowrap',
  },
  selectedLabelStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.white,
    textWrap: 'nowrap',
  },
});

export {ProfileSelectorButton};
