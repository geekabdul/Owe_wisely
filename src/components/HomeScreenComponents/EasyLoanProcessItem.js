import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';

const EasyLoanProcessItem = ({imageUri, label, isCompleted}) => {
  const {
    containerStyle,
    imageBoxStyle,
    borderStyle,
    isSelectedCircleStyle,
    outerCircleStyle,
    innerCircleStyle,
    labelStyle,
  } = styles;
  const {commonRowStyle, commonImageStyle} = style;
  return (
    <View style={containerStyle}>
      <View style={imageBoxStyle}>
        <Image
          resizeMode={'center'}
          style={commonImageStyle}
          source={imageUri}
        />
      </View>
      <View style={commonRowStyle}>
        <View style={borderStyle} />
        {isCompleted ? (
          <View style={isSelectedCircleStyle}>
            <Image source={image.tickWhiteIcon} />
          </View>
        ) : (
          <View style={outerCircleStyle}>
            <View style={innerCircleStyle} />
          </View>
        )}
        <View style={borderStyle} />
      </View>
      <Text style={labelStyle}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dimension.width / 4.5,
  },
  imageBoxStyle: {
    height: dimension.width * 0.1,
    width: dimension.width / 0.1,
    marginBottom: 10,
  },
  borderStyle: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: color.black,
    borderStyle: 'dashed',
  },
  outerCircleStyle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircleStyle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: color.black,
  },
  isSelectedCircleStyle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: color.japaneseLaurel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.mineShaft,
    marginTop: 10,
    textAlign: 'center',
  },
});

export {EasyLoanProcessItem};
