import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {BasicDetailsCheckBox} from './BasicDetailsCheckBox';
import {BasicDetailsContainerCard} from './BasicDetailsContainerCard';

const BasicDetailsGenderCard = ({onPress, data, setGender, textStorage}) => {
  const {labelStyle, imageBoxStyle} = styles;
  const {commonRowStyleWithSpaceBetween} = style;
  const [selected, setSelected] = useState(null);

  return (
    <BasicDetailsContainerCard>
      <View style={[commonRowStyleWithSpaceBetween, {marginBottom: 15}]}>
        <Text style={labelStyle}>{textStorage}</Text>
        <View style={imageBoxStyle}>
          <Image source={image.genderGreyIcon} />
        </View>
      </View>
      <View
        style={[
          commonRowStyleWithSpaceBetween,
          {width: '80%', marginBottom: 10},
        ]}>
        {data?.map((item, index) => {
          return (
            <View key={index.toString()}>
              <BasicDetailsCheckBox
                label={item.name}
                selected={item.id === selected ? true : false}
                onPress={() => {
                  setSelected(item.id);
                  setGender(item.id);
                }}
              />
            </View>
          );
        })}
      </View>
    </BasicDetailsContainerCard>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  labelStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    backgroundColor: color.wildSand2,
    borderTopLeftRadius: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {BasicDetailsGenderCard};
