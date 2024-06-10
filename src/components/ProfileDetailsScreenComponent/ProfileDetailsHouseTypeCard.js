import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {BasicDetailsCheckBox} from '../BasicDetailsComponent/BasicDetailsCheckBox';
import {BasicDetailsContainerCard} from '../BasicDetailsComponent/BasicDetailsContainerCard';


const ProfileDetailsHouseTypeCard = ({
  onPress,
  setInputValue,
  selected,
  textStorage,
  data
}) => {
  const {labelStyle, imageBoxStyle} = styles;
  const {commonRowStyleWithSpaceBetween} = style;
  // const [selected, setSelected] = useState(null);
  console.log('selected :>> ', selected);
  console.log('selected :>> ', data);
  return (
    <BasicDetailsContainerCard>
      <View style={[commonRowStyleWithSpaceBetween, {marginBottom: 15}]}>
        <Text style={labelStyle}>
          {textStorage['PersonalInformationScreen.i_stay_in']}
        </Text>
        <View style={imageBoxStyle}>
          <Image source={image.houseGreyIcon} />
        </View>
      </View>
      <View
        style={[
          commonRowStyleWithSpaceBetween,
          {width: '100%', marginBottom: 10,flexWrap:"wrap"},
        ]}>
        {data.map((item) => {
          return (
            <View>
              <BasicDetailsCheckBox
                label={item.name}
                selected={item.id === selected ? true : false}
                onPress={() => setInputValue(item)}
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

export {ProfileDetailsHouseTypeCard};
