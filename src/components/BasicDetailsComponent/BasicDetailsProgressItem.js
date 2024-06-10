import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, font} from '../../utility';

const BasicDetailsProgressItem = ({
  active,
  id,
  step,
  label,
  selected,
  isActive,
}) => {
  const {
    containerStyle,
    circleContainerStyle,
    checkedContainerStyle,
    stepsTextStyle,
    basicTextStyle,
  } = styles;

  // console.log('LENGTH: ', label.trim().split(/\s+/).length);

  const extraContainerStyle = {
    height: isActive ? 20 : 15,
    width: isActive ? 20 : 15,
    backgroundColor: isActive ? color.black : color.gray,
  };

  const mainText = () => {
    var myString = label;
    myString = myString.substring(0, myString.lastIndexOf(' '));
    return myString;
  };

  const subText = () => {
    var n = label.split(' ');
    return n[n.length - 1];
  };

  const textProcessor = () => {
    if (label?.trim()?.split(/\s+/)?.length > 1) {
      var myString = label;
      myString = myString.substring(0, myString.lastIndexOf(' '));
      // return myString;
      var n = label.split(' ');
      // return n[n.length - 1];
      return myString + '\n' + n[n.length - 1];
    } else {
      return label;
    }
  };

  return (
    <View style={containerStyle}>
      {!selected ? (
        <View style={[circleContainerStyle, extraContainerStyle]}>
          <Text style={stepsTextStyle}>{step}</Text>
        </View>
      ) : (
        <View style={checkedContainerStyle}>
          <Image source={image.tickWhiteIcon} />
        </View>
      )}
      <Text style={basicTextStyle}>{textProcessor()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red",
    marginTop:1
  },
  circleContainerStyle: {
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
    fontSize: 8,
    fontFamily: font.soraBold,
    color: color.white,
    textAlign: 'center',
  },
  basicTextStyle: {
    fontSize: 8,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'center',
    alignSelf: 'flex-start',
    height:50,
    // backgroundColor:"yellow"
  },
});

export {BasicDetailsProgressItem};
