import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';

const ConfirmBankModal = ({
  visible,
  closeOnPress,
  selectBank,
  handleConfirmBank,
  textStorage,
}) => {
  const {
    overlayViewStyle,
    containerStyle,
    headerContainerStyle,
    headerLabelStyle,
    baseContainerStyle,
    imageBoxStyle,
    bankNameTextStyle,
    bankContainerStyle,
    loanMessageTextStyle,
    noteContainerStyle,
    noteLabelStyle,
    noteValueTextStyle,
    buttonContainerStyle,
    buttonTextStyle,
  } = styles;
  const {commonImageStyle} = style;
  console.log('selectBank :>> ', selectBank);
  return (
    <Modal animationType={'slide'} transparent={true} visible={visible}>
      <View style={overlayViewStyle}>
        <View style={containerStyle}>
          <View style={headerContainerStyle}>
            <Text style={headerLabelStyle}>
              {textStorage['SelectBankScreen.confirm_bank']}
            </Text>
            <TouchableOpacity onPress={closeOnPress}>
              <Image source={image.closeOrangeIcon} />
            </TouchableOpacity>
          </View>
          <View style={baseContainerStyle}>
            <View style={bankContainerStyle}>
              <View style={imageBoxStyle}>
                <Image
                  style={commonImageStyle}
                  resizeMode={'contain'}
                  source={selectBank?.bankLogo}
                />
              </View>
              <Text style={bankNameTextStyle}>{selectBank?.bankName}</Text>
            </View>
            <Text style={loanMessageTextStyle}>
              Your loan amount will be transferred to & EMIs be deducted from
              the account.
            </Text>
            <View style={noteContainerStyle}>
              <Text style={noteValueTextStyle}>
                {
                  textStorage[
                    'SelectBankScreen.you_will_not_be_able_to_change_the_selected_bank_later'
                  ]
                }
              </Text>
            </View>
            <View style={buttonContainerStyle}>
              <TouchableOpacity onPress={closeOnPress}>
                <Text style={buttonTextStyle}>
                  {textStorage['SelectBankScreen.change']}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleConfirmBank(selectBank)}>
                <Text style={[buttonTextStyle, {color: color.grenadier}]}>
                  {textStorage['SelectBankScreen.confirm']}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    width: dimension.width * 0.9,
    backgroundColor: color.white,
    borderRadius: 10,
  },
  headerContainerStyle: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: color.alto,
  },
  headerLabelStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  baseContainerStyle: {
    padding: 20,
  },
  bankContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankNameTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    marginLeft: 15,
  },
  loanMessageTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.gray2,
    marginVertical: 20,
    textAlign: 'justify',
  },
  noteContainerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noteLabelStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.black,
  },
  noteValueTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'justify',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  buttonTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
});

export {ConfirmBankModal};
