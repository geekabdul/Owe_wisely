import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import { responsiveScreenWidth } from '../../utility/Size';

const KnowledgeBlogCard = ({
  title = 'How to Invest in Bonds',
  description = 'Learn the Steps to Invest...',
  id,
}) => {
  const {containerStyle, imageBoxStyle, titleTextStyle, subtitleTextStyle,likeTextStyle,dateTextStyle,commonRowStyleWithSpaceBetween} =
    styles;
    const {commonImageStyle, commonRowStyle} =
    style;
  return (
    <View style={containerStyle} key={id}>
      <View style={imageBoxStyle}>
        <Image
          resizeMode={'contain'}
          style={[style.commonImageStyle, {borderRadius: 5}]}
          source={image.knowledgeBlogIcon}
        />
          {/* </ImageBackground> */}
      </View>
          <Image style={{height:40,width:25,marginTop:responsiveScreenWidth(-35),marginStart:responsiveScreenWidth(32)}} resizeMode='contain' source={require("../../assets/HomeTabAssets/pageMark.png")} />
      <View style={commonRowStyleWithSpaceBetween}>
          <Text style={dateTextStyle}>July 26, 2022</Text>
          <View style={commonRowStyle}>
            <Image style={{height:15,width:15,alignSelf:"center",marginStart:responsiveScreenWidth(16),tintColor:"white"}} resizeMode='contain' source={require("../../assets/HomeTabAssets/likeBtn.png")} />
            <Text style={likeTextStyle}>25</Text>
          </View>
        </View>
      <Text style={titleTextStyle}>{title}</Text>
      <Text style={subtitleTextStyle}>- {description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: dimension.width / 2,
    marginTop: 12,
  },
  imageBoxStyle: {
    width: dimension.width / 2.3,
    height: dimension.width * 0.3,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop:responsiveScreenWidth(2)
  },
  titleTextStyle: {
    width: dimension.width / 2.5,
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.black,
    textAlign: 'justify',
    marginTop: 15,
  },
  subtitleTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
  },
  likeTextStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    color: color.white,
    fontWeight:"bold",
    marginLeft: 2,
  },
  dateTextStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    color: color.white,
    fontWeight:"bold",
    marginStart:responsiveScreenWidth(2)
  },
  commonRowStyleWithSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:responsiveScreenWidth(20)
  },
});

export {KnowledgeBlogCard};
