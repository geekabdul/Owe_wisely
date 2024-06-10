import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {image} from '../../assets';
import {
  BankDetailButton,
  Button,
  ConfirmBankModal,
  Header,
  SelectBankHeader,
} from '../../components';
import {color} from '../../utility';
import {AppStateContext} from '../../providers/AuthContextProvider';

const data = [
  {
    id: 1,
    bankName: 'Axis Bank',
    bankLogo: image.axisBankLogo,
  },
  {
    id: 2,
    bankName: 'HDFC Bank',
    bankLogo: image.hdfcBankLogo,
  },
  {
    id: 3,
    bankName: 'State Bank of India',
    bankLogo: image.sbiBankLogo,
  },
];

const SelectBankScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [confirmBankVisible, setConfirmBankVisible] = useState(false);
  const [selectBank, setSelectBank] = useState();
  const [confirmBank, setConfirmBank] = useState({});

  const handelSelectBank = value => {
    setSelectBank(value);
    setConfirmBankVisible(true);
    console.log('value :>> ', value);
  };

  const handleConfirmBank = value => {
    setConfirmBank(value);
    setConfirmBankVisible(false);
    navigation.navigate('AccountDetailsScreen', {confirmBank: value});
    console.log('value ----------------:>> ', value);
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        backOnPress={() => navigation.goBack()}
        label={textStorage['SelectBankScreen.select_bank']}
        iconUri={image.homeSelectedIcon}
      />
      <View style={styles.flatlistContainerStyle}>
        <View>
          <FlatList
            data={data}
            ListHeaderComponent={() => (
              <SelectBankHeader
                label={textStorage['SelectBankScreen.popular_banks']}
              />
            )}
            renderItem={({item, index}) => {
              return (
                <View>
                  <BankDetailButton
                    data={item}
                    bankLogo={item.bankLogo}
                    bankName={item.bankName}
                    handelSelectBank={handelSelectBank}
                  />
                </View>
              );
            }}
          />
        </View>
        <View>
          <FlatList
            data={data}
            ListHeaderComponent={() => (
              <SelectBankHeader
                label={textStorage['SelectBankScreen.other_banks']}
              />
            )}
            renderItem={({item, index}) => {
              return (
                <View>
                  <BankDetailButton
                    bankLogo={item.bankLogo}
                    bankName={item.bankName}
                    handelSelectBank={handelSelectBank}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
      <ConfirmBankModal
        selectBank={selectBank}
        visible={confirmBankVisible}
        closeOnPress={() => setConfirmBankVisible(false)}
        handleConfirmBank={handleConfirmBank}
        textStorage={textStorage}
      />
      {/* <Button
        style={{margin: 20}}
        label={'Continue'}
        onPress={() => navigation.navigate('AccountDetailsConfirmationScreen')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  flatlistContainerStyle: {
    flex: 1,
  },
});

export {SelectBankScreen};
