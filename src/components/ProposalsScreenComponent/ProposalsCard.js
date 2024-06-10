import React, { useContext } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import { AppStateContext } from '../../providers/AuthContextProvider';

const ProposalsCard = ({editOnPress, data,viewAllClick}) => {
  const {
    containerStyle,
    topContainerStyle,
    imageBoxStyle,
    loanAmountContainerStyle,
    loanAmountTextStyle,
    loanTextStyle,
    commonItemContainerStyle,
    commonLabelTextStyle,
    commonValueTextStyle,
    bottomContainerStyle,
    viewDetailsTextStyle,
  } = styles;
  const {commonRowStyleWithSpaceBetween} = style;
  // console.log('data ------------:>> ', JSON.stringify(data, null, 2));
  const {textStorage} = useContext(AppStateContext);

  function formatWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
  }
  
  return (
    <View style={containerStyle}>
      <View style={topContainerStyle}>
        <View style={commonRowStyleWithSpaceBetween}>
          <Image source={image.hdfcLogo} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => editOnPress(data)}>
            <View style={imageBoxStyle}>
              <Image source={image.editOrangeIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={loanAmountContainerStyle}>
          <Text style={loanAmountTextStyle}>
            {textStorage['ProposalsScreen.loan_amount']}{' '}
          </Text>
          <Text style={loanTextStyle}>₹ {formatWithCommas(parseFloat(data?.loan_amount).toFixed(2))}</Text>
        </View>
        <View style={commonRowStyleWithSpaceBetween}>
          <View style={commonItemContainerStyle}>
            <Text style={commonLabelTextStyle}>
              {textStorage['ProposalsScreen.tenure']}{' '}
            </Text>
            <Text style={commonValueTextStyle}>{data?.tenure}</Text>
          </View>
          <View style={commonItemContainerStyle}>
            <Text style={commonLabelTextStyle}>
              {textStorage['ProposalsScreen.interest']}{' '}
            </Text>
            <Text style={commonValueTextStyle}>{data?.interest} %</Text>
          </View>
          <View style={commonItemContainerStyle}>
            <Text style={commonLabelTextStyle}>
              {textStorage['ProposalsScreen.emi']}{' '}
            </Text>
            <Text style={commonValueTextStyle}>₹ {formatWithCommas(parseFloat(data?.emi).toFixed(2))}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={()=>{
        viewAllClick()
      }} style={bottomContainerStyle}>
        <Text style={viewDetailsTextStyle}>
          {textStorage['ProposalsScreen.view_details']}{' '}
        </Text>
        <Image source={image.caretRightOrangeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    borderWidth: 1,
    borderColor: color.mercury,
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  topContainerStyle: {
    padding: 15,
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    backgroundColor: color.wildSand,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loanAmountContainerStyle: {
    marginVertical: 14,
  },
  loanAmountTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.gray1,
  },
  loanTextStyle: {
    fontSize: 22,
    fontFamily: font.soraBold,
    color: color.black,
  },
  commonItemContainerStyle: {
    justifyContent: 'center',
  },
  commonLabelTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.gray1,
  },
  commonValueTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  bottomContainerStyle: {
    width: '100%',
    backgroundColor: 'rgba(237, 126, 82, 0.08)',
    paddingVertical: 20,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.grenadier,
    marginRight: 10,
  },
});

export {ProposalsCard};
