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
import {color, dimension, font} from '../../utility';
import {Button} from '../Common/Button';
import {ProposalScreenAmountSelector} from './ProposalScreenAmountSelector';
import {TenureSelector} from './TenureSelector';

const tenureData = [
  {
    id: 1,
    label: '3 Months',
  },
  {
    id: 2,
    label: '6 Months',
  },
  {
    id: 3,
    label: '9 Months',
  },
  {
    id: 4,
    label: '12 Months',
  },
  {
    id: 5,
    label: '15 Months',
  },
  {
    id: 6,
    label: '18 Months',
  },
];

const CriteriaWiseEvaluationModal = ({
  visible,
  closeOnPress,
  evaluateOnPress,
  selecteddata,
  textStorage,
}) => {
  const {
    overlayViewStyle,
    containerStyle,
    headerContainerStyle,
    headerTextStyle,
    headerTextBoldStyle,
    bottomContainerStyle,
    amountSelectorContainerStyle,
    flatlistColumnWrapperStyle,
    flatlistHeaderComponentStyle,
    buttonStyle,
  } = styles;

  const [selectedTenure, setSelectedTenure] = useState(null);
  const [selectedTenureValue, setselectedTenureValue] = useState(null);
  const [loanValue, setLoanValue] = useState();
  const [interest, setInterest] = useState();

  useEffect(() => {
    setSelectedTenure(selecteddata?.tenure);
    setLoanValue(selecteddata?.loan_amount);
    setInterest(selecteddata?.interest);
  }, [selecteddata]);
  return (
    <Modal transparent animationType={'slide'} visible={visible}>
      <View style={overlayViewStyle}>
        <View style={containerStyle}>
          <View style={headerContainerStyle}>
            <Text style={headerTextStyle}>
              Select criteria for{' '}
              <Text style={headerTextBoldStyle}>Wise Evaluation</Text>
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={closeOnPress}>
              <Image source={image.closeOrangeIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView style={bottomContainerStyle}>
            <ProposalScreenAmountSelector
              extraStyle={amountSelectorContainerStyle}
              setSliderValue={setLoanValue}
              selecteddata={"10000"}
              textStorage={textStorage}
            />
            <FlatList
              data={tenureData}
              numColumns={3}
              columnWrapperStyle={flatlistColumnWrapperStyle}
              ListHeaderComponent={() => (
                <Text style={flatlistHeaderComponentStyle}>Tenure</Text>
              )}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <TenureSelector
                      label={item.label}
                      onPress={() => {setSelectedTenure(item.id)
                        setselectedTenureValue(item.label)
                      }}
                      selected={item.id === selectedTenure ? true : false}
                    />
                  </View>
                );
              }}
            />
            <Button
              style={buttonStyle}
              label={'Evaluate'}
              onPress={()=>evaluateOnPress(selectedTenureValue,loanValue)}
            />
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
    fontFamily: font.soraRegular,
    color: color.black,
  },
  headerTextBoldStyle: {
    fontFamily: font.soraBold,
  },
  bottomContainerStyle: {
    paddingHorizontal: 15,
  },
  flatlistColumnWrapperStyle: {
    justifyContent: 'space-between',
    marginStart:8
  },
  amountSelectorContainerStyle:{
// marginStart:-5
  },
  flatlistHeaderComponentStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
    paddingBottom: 20,
    marginStart:8
  },
  buttonStyle: {
    marginTop: 50,
    marginBottom: 30,
  },
});

export {CriteriaWiseEvaluationModal};
