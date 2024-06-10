import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, font} from '../../utility';

const CibilScoreCard = ({
  imageUri,
  backgroundColor,
  textColor,
  cibilScore = 751,
  textStorage,
}) => {
  const {
    containerStyle,
    headerContainerStyle,
    bottomContainerStyle,
    scoreTextStyle,
    ratingTextStyle,
    updatedMessageTextStyle,
  } = styles;
  return (
    <View style={containerStyle}>
      <View style={headerContainerStyle}>
        <Image source={imageUri} />
        <Image source={image.refreshOrangeIcon} />
      </View>
      <View style={[bottomContainerStyle, {backgroundColor}]}>
        <Text style={scoreTextStyle}>
          {cibilScore}
          <Text style={{fontSize: 12}}>/ 900</Text>
        </Text>
        <Text style={[ratingTextStyle, {color: textColor}]}>
          {textStorage['HomeScreen.good']}
        </Text>
        <Text style={updatedMessageTextStyle}>
          {textStorage['HomeScreen.updated_5_days_ago']}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    // backgroundColor: color.azureRadiance,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.concrete,
  },
  headerContainerStyle: {
    backgroundColor: color.white,
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderColor: color.concrete,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContainerStyle: {
    // backgroundColor: color.snowyMint,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: color.snowyMint,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  scoreTextStyle: {
    fontSize: 28,
    fontFamily: font.soraRegular,
    color: color.codGray,
  },
  ratingTextStyle: {
    fontSize: 16,
    fontFamily: font.soraRegular,
    color: color.japaneseLaurel,
    marginVertical: 5,
  },
  updatedMessageTextStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    color: color.black,
  },
});

export {CibilScoreCard};
