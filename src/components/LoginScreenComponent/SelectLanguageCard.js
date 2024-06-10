import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {color, dimension} from '../../utility';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';

const SelectLanguageCard = ({
  name,
  onPress,
  selected,
  imageSelected,
  imageUnselected,
}) => {
  const {containerStyle} = styles;
  const backgroundColor = selected ? color.grenadier : color.gallery1;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[containerStyle, {backgroundColor}]}>
        <Image source={selected ? imageSelected : imageUnselected} />
        <Text style={styles.detailText}>
          {name == 'hi'
            ? 'Hindi'
            : name == 'ta'
            ? 'Tamil'
            : name == 'kn'
            ? 'Kannada'
            : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: dimension.width * 0.32,
    width: dimension.width * 0.32,
    backgroundColor: color.gallery1,
    margin: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    // marginTop: responsiveScreenWidth(4),
  },
});

export {SelectLanguageCard};
