import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {image} from '../../assets';
import {
  BasicDetailsInput,
  BasicDetailsProgressComponent,
  Button,
  CustomizableDropdown,
  EnterBankDetailsHeader,
  Header,
} from '../../components';
import {color, font} from '../../utility';
import {ConfirmationvalidateValues} from '../../validation/AccountDetailsScreenvalidation';

const AccountDetailsConfirmationScreen = ({navigation}) => {
  const [validationerror, SetValidationerror] = useState({});
  const [issubmit, setIssubmit] = useState(false);

  const [fields, setFields] = useState({
    Accountnumber: '',
    ConfirmAccountnumber: '',
    IFSCCode: '',
  });

  const handleInputChange = (value, fieldName) => {
    if (issubmit) {
      SetValidationerror(
        ConfirmationvalidateValues({...fields, [fieldName]: value}),
      );
    }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    setIssubmit(true);
    SetValidationerror(ConfirmationvalidateValues(fields));

    const error = ConfirmationvalidateValues(fields);

    if (Object.keys(error) == 0) {
      console.log('fields :>> ', fields);
      navigation.navigate('LoanConfirmationScreen');
    }
  };

  return (
    <View style={styles.containerStyle}>
      <Header noBack label={'Account Details'} iconUri={image.homeSelectedIcon} />
      <ScrollView>
        <BasicDetailsProgressComponent id={3} isActive={4} />
        <EnterBankDetailsHeader isConfirmed={true} />
        <View style={styles.baseContainerStyle}>
          <View style={styles.bankDetailsTextContainerStyle}>
            <Text style={styles.enterBankDetailsTextStyle}>
              Enter bank details
            </Text>
            <Text style={styles.loanAmountMessageTextStyle}>
              Your loan amount will be transferred to & EMIs be deducted from
              the account
            </Text>
          </View>
          <BasicDetailsInput
            placeholder={'Account number'}
            setInputValue={value => handleInputChange(value, 'Accountnumber')}
          />
          <Text style={styles.errorText}>{validationerror?.Accountnumber}</Text>
          <BasicDetailsInput
            placeholder={'Confirm Account number'}
            setInputValue={value =>
              handleInputChange(value, 'ConfirmAccountnumber')
            }
          />
          <Text style={styles.errorText}>
            {validationerror?.ConfirmAccountnumber}
          </Text>
          <BasicDetailsInput
            placeholder={'IFSC Code'}
            setInputValue={value => handleInputChange(value, 'IFSCCode')}
          />
          <Text style={styles.errorText}>{validationerror?.IFSCCode}</Text>
          <Button
            label={'Continue'}
            // onPress={() => navigation.navigate('LoanConfirmationScreen')}
            onPress={() => handleSubmit()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  baseContainerStyle: {
    paddingHorizontal: 20,
    padding: 10,
  },
  bankDetailsTextContainerStyle: {
    marginVertical: 20,
  },
  enterBankDetailsTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  loanAmountMessageTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
    marginTop: 2,
  },
  errorText: {
    color: color.errorColor,
    marginBottom: 15,
    marginTop: -20,
  },
});

export {AccountDetailsConfirmationScreen};
