import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import Slider from 'react-native-slider';
import converter from 'number-to-words';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveScreenWidth} from '../../utility/Size';

const ProposalScreenAmountSelector = ({
  extraStyle,
  setSliderValue,
  selecteddata,
  textStorage,
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

  const [value, setValue] = useState(
    [selecteddata] ? [Number(selecteddata)] : [0],
  );

  console.log(value, 'loanvalueeee');

  const handleLoanValue = val => {
    setValue(val);
    setSliderValue(val);
  };

  function formatNumber(number) {
    if (number >= 100000) {
      return (number / 100000).toFixed(1) + ' L';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + ' K';
    } else {
      return number.toString();
    }
  }
  const gradientEndPercentage = (value[0] - 10000) / (500000 - 10000);

  return (
    <View style={extraStyle}>
      <Text style={selectYourAmountTextStyle}>
        {textStorage['ProposalsScreen.select_your_amount']} ({' '}
        <Text style={rsSymbolTextStyle}>₹</Text> )
      </Text>
      <View style={{width:"100%"}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: gradientEndPercentage, y: 0}}
          colors={['#fd5308', '#ed4805', '#d33401']}
          style={styles.linearGradient}>
          <View
            style={{
              borderRadius: 15,
              height: 29,
              width: responsiveScreenWidth(84),
              justifyContent: 'center',
              // overflow:"visible"
            }}>
            <MultiSlider
              values={value}
              onValuesChange={newValues => handleLoanValue(newValues)}
              min={10000}
              max={500000}
              step={10000}
              sliderLength={334}
              allowOverlap
              snapped
              trackStyle={{
                height: 30,
              }}
              selectedStyle={{
                height: 30,
                backgroundColor: 'transparent', // Make the default selected color transparent
              }}
              customMarker={e => (
                <LinearGradient
                  colors={['black', 'black']}
                  style={{
                    width: 20,
                    height: 20,
                    marginStart: 0,
                    // marginEnd:10,
                    borderRadius: 10, // Half of the width and height for a perfect circle
                    backgroundColor: 'black', // White outer circle color
                    borderWidth: 3, // Border width for the black circle
                    borderColor: '#FFFFFF', // Black border color
                    marginTop: 30,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                    // marginStart: 20,
                    // marginEnd: 20,
                  }}
                />
              )}
            />
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginStart:8
          }}>
          <Text style={selectedPriceTextStyle}>{formatNumber(value)}</Text>
          <Text style={maxTextStyle}>
            {textStorage['ProposalsScreen.max']}{' '}
            <Text style={maxLimitTextStyle}>5 L</Text>
          </Text>
        </View>
      </View>
      <Text style={selectedAmountTextStyle}>
        {textStorage['ProposalsScreen.selected_amount']}{' '}
        <Text style={amountTextStyle}>{converter.toWords(value)}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  selectYourAmountTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    marginStart:8
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
    marginTop: 20,
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
    marginLeft: 15,
  },
  blackCircleStyle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: color.black,
  },
  selectedPriceTextStyle: {
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
    marginTop: 15,
    paddingBottom: 14,
    marginStart:8
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
    width: responsiveScreenWidth(84),
    justifyContent: 'center',
    marginStart:10
    // paddingStart:10,
    // paddingEnd:10
    // borderColor:"blue",
    // borderWidth:3
  },
});

export {ProposalScreenAmountSelector};
