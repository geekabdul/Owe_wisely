import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';

const PANCardContainer = ({panData, userDetails}) => {
  const {
    containerStyle,
    nameAndPanContainerStyle,
    labelAndValueContainerStyle,
    labelTextStyle,
    nameTextStyle,
    panNumberTextStyle,
  } = styles;
  console.log(userDetails, 'useeeeeeee');
  return (
    <View style={containerStyle}>
      <Image
        style={style.commonImageStyle}
        resizeMode={'contain'}
        source={image.panCardContainerImage}
      />
      <View style={nameAndPanContainerStyle}>
        <View style={labelAndValueContainerStyle}>
          <Text style={labelTextStyle}>Name</Text>
          <Text style={nameTextStyle}>
            {userDetails?.first_name} {userDetails?.last_name}
          </Text>
        </View>
        <View style={[labelAndValueContainerStyle, {marginTop: 6}]}>
          <Text style={labelTextStyle}>PAN No.</Text>
          <Text style={panNumberTextStyle}>{panData?.pan_card_no}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: dimension.height * 0.3,
    width: '100%',
  },
  nameAndPanContainerStyle: {
    position: 'absolute',
    top: '40%',
  },
  labelAndValueContainerStyle: {
    paddingLeft: 22,
  },
  labelTextStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    color: color.black,
  },
  nameTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  panNumberTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
});

export {PANCardContainer};
