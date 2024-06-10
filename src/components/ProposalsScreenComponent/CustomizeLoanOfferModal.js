import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {Button} from '../Common/Button';
import {ProposalScreenAmountSelector} from './ProposalScreenAmountSelector';
import {TenureSelector} from './TenureSelector';

const tenureData = [
  {
    id: 1,
    label: '3 months',
  },
  {
    id: 2,
    label: '6 months',
  },
  {
    id: 3,
    label: '9 months',
  },
  {
    id: 4,
    label: '12 months',
  },
  {
    id: 5,
    label: '15 months',
  },
  {
    id: 6,
    label: '18 months',
  },
];

const CustomizeLoanOfferModal = ({
  visible,
  closeOnPress,
  quickApplyOnPress,
  selecteddata,
  textStorage,
}) => {
  const {
    overlayViewStyle,
    containerStyle,
    headerContainerStyle,
    headerTextStyle,
    bottomContainerStyle,
    amountSelectorContainerStyle,
    flatlistColumnWrapperStyle,
    flatlistHeaderComponentStyle,
    roiContainerStyle,
    roiLabelStyle,
    roiValueStyle,
    buttonStyle,
    bottomTextContainerStyle,
    starTextStyle,
    bottomEMITextStyle,
  } = styles;
  const {commonRowStyle} = style;

  const [selectedTenure, setSelectedTenure] = useState();
  const [loanValue, setLoanValue] = useState();
  const [interest, setInterest] = useState();

  useEffect(() => {
    setSelectedTenure(selecteddata?.tenure);
    setLoanValue(selecteddata?.loan_amount);
    setInterest(selecteddata?.interest);
  }, [selecteddata]);

  console.log("selecteddata",JSON.stringify(selecteddata))

  return (
    <Modal transparent animationType={'slide'} visible={visible}>
      <View style={overlayViewStyle}>
        <View style={containerStyle}>
          <View style={headerContainerStyle}>
            <Text style={headerTextStyle}>
              {textStorage['ProposalsScreen.customize_loan_offer']}{' '}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={closeOnPress}>
              <Image source={image.closeOrangeIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView style={bottomContainerStyle}>
            <ProposalScreenAmountSelector
              extraStyle={amountSelectorContainerStyle}
              setSliderValue={setLoanValue}
              selecteddata={selecteddata?.loan_amount}
              textStorage={textStorage}
            />
            <FlatList
              data={tenureData}
              numColumns={3}
              columnWrapperStyle={flatlistColumnWrapperStyle}
              ListHeaderComponent={() => (
                <Text style={flatlistHeaderComponentStyle}>
                  {textStorage['ProposalsScreen.tenure']}{' '}
                </Text>
              )}
              renderItem={({item, index}) => {
                console.log('item :>> ', item);
                return (
                  <View>
                    <TenureSelector
                      label={item.label}
                      onPress={() => setSelectedTenure(item.label)}
                      selected={item.label === selectedTenure ? true : false}
                    />
                  </View>
                );
              }}
            />
            <View style={roiContainerStyle}>
              <Text style={roiLabelStyle}>
                {textStorage['ProposalsScreen.roi']}{' '}
              </Text>
              <Text style={roiValueStyle}>{interest} p.a.</Text>
            </View>
            <Button
              style={buttonStyle}
              label={textStorage['ProposalsScreen.quick_apply']}
              onPress={quickApplyOnPress}
            />
            <View style={bottomTextContainerStyle}>
              <Text style={starTextStyle}>*</Text>
              <Text style={bottomEMITextStyle}>
                {
                  textStorage[
                    'ProposalsScreen.emi_should_change_as_amount_tenor_changes'
                  ]
                }{' '}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayViewStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.permissionModalOverlay,
  },
  containerStyle: {
    backgroundColor: color.white,
    width: dimension.width,
    maxHeight: dimension.height * 0.7,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: color.alto,
    marginBottom: 20,
  },
  headerTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  headerTextBoldStyle: {
    fontFamily: font.soraBold,
  },
  bottomContainerStyle: {
    paddingHorizontal: 20,
  },
  flatlistColumnWrapperStyle: {
    justifyContent: 'space-between',
  },
  flatlistHeaderComponentStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    paddingBottom: 20,
  },
  roiContainerStyle: {
    width: '100%',
    backgroundColor: 'rgba(13, 152, 10, 0.11)',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 40,
  },
  roiLabelStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: 'rgba(13, 152, 10, 0.8)',
  },
  roiValueStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.japaneseLaurel,
  },
  buttonStyle: {
    marginBottom: 20,
  },
  bottomTextContainerStyle: {
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 35,
  },
  starTextStyle: {
    fontSize: 20,
    fontFamily: font.soraBold,
    color: color.mandy,
    alignSelf: 'center',
  },
  bottomEMITextStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.gray1,
    alignSelf: 'center',
  },
});

export {CustomizeLoanOfferModal};
