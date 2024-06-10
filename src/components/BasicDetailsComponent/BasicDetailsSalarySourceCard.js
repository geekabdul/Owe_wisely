import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {BasicDetailsCheckBox} from './BasicDetailsCheckBox';
import {BasicDetailsContainerCard} from './BasicDetailsContainerCard';

const BasicDetailsSalarySourceCard = ({
  onPress,
  data,
  setSalaryReceipt,
  textStorage,
  selectedData
}) => {
  const {labelStyle, imageBoxStyle} = styles;
  const {commonRowStyleWithSpaceBetween} = style;
  // const [selected, setSelected] = useState(null);
  return (
    <BasicDetailsContainerCard>
      <View style={[commonRowStyleWithSpaceBetween, {marginBottom: 15}]}>
        <Text style={labelStyle}>
          {textStorage['BasicdetailsScreen.how_do_you_get_salary']}{' '}
        </Text>
        <View style={imageBoxStyle}>
          <Image source={image.walletGreyIcon} />
        </View>
      </View>
      <View
        style={[
          commonRowStyleWithSpaceBetween,
          {width: '100%', marginBottom: 10, flexWrap: 'wrap'},
        ]}>
        {data?.map((item, index) => {
          return (
            <View key={index}>
              <BasicDetailsCheckBox
                label={item.name}
                selected={item.id === selectedData ? true : false}
                onPress={() => {
                  selectedData=(item.id);
                  setSalaryReceipt(item.id);
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

export {BasicDetailsSalarySourceCard};
