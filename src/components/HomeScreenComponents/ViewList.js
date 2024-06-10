import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import { responsiveScreenWidth } from '../../utility/Size';

const ViewList = ({
  title = 'How to Invest in Bonds',
  description = 'Learn the Steps to Invest...',
  id,
}) => {
  const {
    containerStyle,
    imageBoxStyle,
    rightContainerStyle,
    titleTextStyle,
    subtitleTextStyle,
    likeTextStyle,
    dateTextStyle,
  } = styles;
  const {commonImageStyle, commonRowStyle, commonRowStyleWithSpaceBetween} =
    style;
  return (
    <View style={containerStyle} key={id}>
      <View style={{width:responsiveScreenWidth(1),backgroundColor:"#E24936",height:responsiveScreenWidth(20),borderRadius:20}}/>
      <View style={imageBoxStyle}>
        <Image style={commonImageStyle} resizeMode='contain' source={require("../../assets/HomeTabAssets/listViewImg.png")} />
      </View>
      <View style={rightContainerStyle}>
        <Text style={titleTextStyle}>
          {title} – <Text style={subtitleTextStyle}>{description}</Text>
        </Text>
        <View style={commonRowStyleWithSpaceBetween}>
          <View style={commonRowStyle}>
            <Image style={{height:15,width:15,alignSelf:"center"}} resizeMode='contain' source={require("../../assets/HomeTabAssets/likeBtn.png")} />
            <Text style={likeTextStyle}>25</Text>
          </View>
          <Text style={dateTextStyle}>July 26, 2022</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: responsiveScreenWidth(90),
    alignSelf:"center",
    marginTop: 15,
    backgroundColor: color.white,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.39,
shadowRadius: 8.30,
elevation: 13,
  },
  imageBoxStyle: {
    paddingTop:responsiveScreenWidth(2),
    paddingBottom:responsiveScreenWidth(2),
    height: responsiveScreenWidth(20),
    width:responsiveScreenWidth(20),
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart:10
  },
  rightContainerStyle: {
    width: '68%',
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  titleTextStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.black,
    textAlign: 'justify',
  },
  subtitleTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
  },
  likeTextStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    color: color.grenadier,
    marginLeft: 2,
  },
  dateTextStyle: {
    fontSize: 10,
    fontFamily: font.soraRegular,
    color: color.silverChalice1,
  },
});

export {ViewList};
