import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, font, style} from '../../utility';
import {AppStateContext} from '../../providers/AuthContextProvider';

const Header = ({
  noBack,
  backOnPress,
  label,
  skipOnPress,
  iconUri,
  iconUri2,
  noBorder,
  onPress,
  contentContainerStyle,
  
  chooseScreen=false
}) => {
  const {textStorage} = useContext(AppStateContext);
  const {containerStyle, labelTextStyle, skipTextStyle} = styles;
  const {commonRowStyle, commonRowStyleWithSpaceBetween} = style;
  const extraStyle = {
    borderBottomWidth: 1,
    borderColor: color.mercury,
  };
  console.log("iconUriiconUri",iconUri)
  return (
    <View
      style={[
        // containerStyle,
        commonRowStyleWithSpaceBetween,
        !noBorder && extraStyle,
        contentContainerStyle,
      ]}>
      <View style={commonRowStyle}>
        {!noBack && (
          <TouchableOpacity
            style={[
              {
                paddingVertical: 15,
                // flex: 1 / 9,
                alignItems: 'center',
                paddingHorizontal: 20,
              },
            ]}
            activeOpacity={0.8}
            onPress={() => {
              backOnPress();
            }}>
            <Image source={image.backArrow} />
          </TouchableOpacity>
        )}
        {label && (
          <Text style={[labelTextStyle, {paddingVertical: 20, marginLeft: chooseScreen ? 30 : 0}]}>
            {label}
          </Text>
        )}
      </View>
      {iconUri ? (
        <>
          <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{marginHorizontal:20}} >
            <Image source={iconUri} />
          </TouchableOpacity>
        </>
      ) : skipOnPress ? (
        <TouchableOpacity activeOpacity={0.8} onPress={skipOnPress}>
          <Text style={skipTextStyle}>{textStorage.skip}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  labelTextStyle: {
    fontSize: 18,
    fontFamily: font.soraBold,
    color: color.black,
  },
  skipTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.trinidad,
  },
});

export {Header};
