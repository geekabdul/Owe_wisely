import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, font, style} from '../../utility';

const HomeListHeader = ({title, subtitle, Viewall,viewAllClick}) => {
  const {containerStyle, labelStyle, viewAllTextStyle} = styles;
  const {commonRowStyle} = style;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>
        {title} <Text style={{color: color.grenadier}}>{subtitle}</Text>
      </Text>
      <TouchableOpacity onPress={()=>{
        viewAllClick()
      }}>
      <View style={commonRowStyle}>
        <Text style={viewAllTextStyle}>{Viewall}</Text>
        <Image source={image.caretDoubleRightIcon} />
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: font.soraBold,
    color: color.codGray1,
  },
  viewAllTextStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.grenadier,
    marginRight: 10,
  },
});

export {HomeListHeader};
