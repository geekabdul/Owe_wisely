import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font} from '../../utility';

const ProfileDetailsProgressBar = ({isActive, textStorage}) => {
  const {
    containerStyle,
    alignerStyle,
    circleContainerStyle,
    checkedContainerStyle,
    stepsTextStyle,
    borderStyle,
    basicTextStyle,
  } = styles;

  return (
    <View style={containerStyle}>
      <View style={alignerStyle}>
        {isActive?.isCompleted ? (
          <View style={checkedContainerStyle}>
            <Image source={image.tickWhiteIcon} />
          </View>
        ) : (
          <View
            style={[
              circleContainerStyle,
              {
                backgroundColor:
                  isActive.count === 1 ? color.black : color.gray,
              },
            ]}>
            <Text style={stepsTextStyle}>1</Text>
          </View>
        )}
        <Text
          style={[
            basicTextStyle,
            {color: isActive?.count === 1 ? color.black : color.gray},
          ]}>
          {textStorage['PersonalInformationScreen.Personal_info']}
        </Text>
      </View>
      <View style={borderStyle} />
      <View style={alignerStyle}>
        <View
          style={[
            circleContainerStyle,
            {backgroundColor: isActive.count === 2 ? color.black : color.gray},
          ]}>
          <Text style={stepsTextStyle}>2</Text>
        </View>
        <Text
          style={[
            basicTextStyle,
            {color: isActive?.count === 2 ? color.black : color.gray},
          ]}>
          {textStorage['PersonalInformationScreen.Professional_info']}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    backgroundColor: color.wildSand1,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  alignerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainerStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedContainerStyle: {
    height: 20,
    width: 20,
    backgroundColor: color.japaneseLaurel,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsTextStyle: {
    fontSize: 10,
    fontFamily: font.soraBold,
    color: color.white,
    textAlign: 'center',
  },
  borderStyle: {
    width: dimension.width * 0.4,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    left: '30%',
  },
  basicTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
});

export {ProfileDetailsProgressBar};
