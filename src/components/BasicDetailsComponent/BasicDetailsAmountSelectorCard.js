import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {BasicDetailsContainerCard} from './BasicDetailsContainerCard';
import Slider from 'react-native-slider';
// import converter from 'number-to-words';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {responsiveScreenWidth} from '../../utility/Size';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {numberToWords} from 'amount-to-words';

const BasicDetailsAmountSelectorCard = ({
  setSliderValue,
  textStorage,
  dataValue,
}) => {
  const {
    selectYourAmountTextStyle,
    rsSymbolTextStyle,
    imageBoxStyle,
    sliderContainerStyle,
    sliderFilledStyle,
    whiteCircleStyle,
    blackCircleStyle,
    priceCircleContainerStyle,
    selectedPriceTextStyle,
    maxTextStyle,
    maxLimitTextStyle,
    selectedAmountTextStyle,
    amountTextStyle,
  } = styles;
  const {commonRowStyleWithSpaceBetween} = style;
  const [value, setValue] = useState('');
  const [checkValue, setCheckValue] = useState(true);

  const getwidth = Dimensions.get('window').width;

  const handleLoanValue = async val => {
    setCheckValue(false);
    console.log(val);
    setValue(val);
    setSliderValue(val);
  };
  useEffect(() => {
    setValue(JSON.parse(dataValue));
  }, [dataValue]);

  function formatWithCommas(txt) {
    var temptxt = txt.toString().replace(',', '');
    let data = parseInt(temptxt);
    return data.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
  }

  console.log(typeof dataValue, 'vvvv');

  return (
    <>
      <BasicDetailsContainerCard>
        <View style={commonRowStyleWithSpaceBetween}>
          <Text style={selectYourAmountTextStyle}>
            {textStorage['BasicdetailsScreen.select_your_amount']} ({' '}
            <Text style={rsSymbolTextStyle}>₹</Text> )
          </Text>
          <View style={imageBoxStyle}>
            <Image source={image.moneyBagGreyIcon} />
          </View>
        </View>

        <Text
          style={[
            rsSymbolTextStyle,
            {alignSelf: 'center', fontFamily: font.soraBold, fontSize: 18},
          ]}>
          {value?.toString().length <= 4
            ? ''
            : formatWithCommas(dataValue)?.toString()}
        </Text>

        <Slider
          value={parseInt(dataValue)}
          minimumValue={10000}
          maximumValue={500000}
          onValueChange={value => {
            setValue(parseInt(value));
            setSliderValue(parseInt(value));
          }}
          step={10000}
          minimumTrackTintColor={'#fd5308'}
          thumbTintColor={'white'}
          trackStyle={{height: 20}}
          thumbStyle={{borderWidth: 3, borderColor: 'black'}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={selectedPriceTextStyle}>
            <Text style={maxTextStyle}>
              {'Min'} <Text style={maxLimitTextStyle}>10,000</Text>
            </Text>
          </Text>
          <Text style={maxTextStyle}>
            {textStorage['BasicdetailsScreen.max']}{' '}
            <Text style={maxLimitTextStyle}>5 Lakh</Text>
          </Text>
        </View>
        <Text style={selectedAmountTextStyle}>
          {textStorage['BasicdetailsScreen.selected_amount']}{' '}
          <Text style={amountTextStyle}>
            {numberToWords(value?.toString().replace(',', ''))}
          </Text>
        </Text>
      </BasicDetailsContainerCard>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  selectYourAmountTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  rsSymbolTextStyle: {
    color: color.mandy,
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
  sliderContainerStyle: {
    height: 35,
    width: '100%',
    borderRadius: 5,
    backgroundColor: color.gallery,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderFilledStyle: {
    backgroundColor: color.grenadier,
    height: 35,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '50%',
  },
  priceCircleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    right: -12,
  },
  whiteCircleStyle: {
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 15,
  },
  blackCircleStyle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: color.black,
  },
  selectedPriceTextStyle: {
    // marginLeft: 10,
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  maxTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
    marginRight: 10,
  },
  maxLimitTextStyle: {
    fontFamily: font.soraBold,
  },
  selectedAmountTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.boulder,
    marginTop: 20,
    paddingBottom: 14,
  },
  amountTextStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.black,
  },
  thumbStyle: {
    width: 20,
    height: 20,
    borderRadius: 10, // Half of the width and height for a perfect circle
    backgroundColor: 'black', // White outer circle color
    borderWidth: 5, // Border width for the black circle
    borderColor: 'white', // Black border color
  },
  linearGradient: {
    marginTop: 10,
    borderRadius: 5,
    height: 29,
    width: responsiveScreenWidth(79),
    justifyContent: 'center',
    // borderColor:"blue",
    // borderWidth:3
  },
  brightThumb: {
    backgroundColor: '#ffffff',
    borderColor: '#303030',
    borderRadius: 10,
    borderWidth: 5,
    height: 20,
    width: 20,
  },
});

export {BasicDetailsAmountSelectorCard};
