import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {image} from '../../assets';
import {
  BasicDetailsContainerCard,
  BasicDetailsInput,
  BasicDetailsProgressComponent,
  Button,
  CustomizableDropdown,
  EnterBankDetailsHeader,
  Header,
} from '../../components';
import {color, font} from '../../utility';
import {validateValues} from '../../validation/AccountDetailsScreenvalidation';
import {AppStateContext} from '../../providers/AuthContextProvider';

const AccountDetailsScreen = ({navigation, route}) => {
  const {textStorage} = useContext(AppStateContext);
  const confirmBank = route.params?.confirmBank;
  const [validationerror, SetValidationerror] = useState({});
  const [issubmit, setIssubmit] = useState(false);

  const [fields, setFields] = useState({
    BankName: confirmBank?.bankName ? confirmBank?.bankName : '',
    Accountnumber: '',
    ConfirmAccountnumber: '',
    IFSCCode: '',
  });

  const handleInputChange = (value, fieldName) => {
    if (issubmit) {
      SetValidationerror(validateValues({...fields, [fieldName]: value}));
    }
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    setIssubmit(true);
    SetValidationerror(validateValues(fields));

    const error = validateValues(fields);

    if (Object.keys(error) == 0) {
      console.log('fields :>> ', fields);
      navigation.navigate('LoanConfirmationScreen');
    }
  };

  const handleBankSelect = () => {
    console.log('click');
    navigation.navigate('SelectBankScreen');
  };

  useEffect(() => {
    if (confirmBank) {
      setFields(prevFields => ({
        ...prevFields,
        BankName: confirmBank.bankName || '',
        // Add other properties based on your confirmBank structure
      }));
    }
  }, [route.params]);
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));

  return (
    <View style={styles.containerStyle}>
      <Header
        noBack
        label={textStorage['AccountDetailsScreen.account_details']}
        iconUri={image.homeSelectedIcon}
      />
      <ScrollView>
        <BasicDetailsProgressComponent
          id={3}
          isActive={4}
          textStorage={textStorage}
        />
        {confirmBank ? (
          <EnterBankDetailsHeader
            confirmBank={confirmBank}
            isConfirmed={true}
          />
        ) : (
          <EnterBankDetailsHeader textStorage={textStorage} />
        )}
        <View style={styles.baseContainerStyle}>
          <View style={styles.bankDetailsTextContainerStyle}>
            <Text style={styles.enterBankDetailsTextStyle}>
              {textStorage['AccountDetailsScreen.enter_bank_details2']}
            </Text>
            <Text style={styles.loanAmountMessageTextStyle}>
              {textStorage['AccountDetailsScreen.your_loan_amount']}
            </Text>
          </View>
          {/* <CustomizableDropdown
            placeholder={'Bank Name'}
            onChange={value => handleInputChange(value?.value, 'BankName')}
            value={fields?.BankName}
          /> */}
          {/* <Text style={styles.errorText}>{validationerror?.BankName}</Text> */}
          <BasicDetailsContainerCard>
            <TouchableOpacity activeOpacity={0.8} onPress={handleBankSelect}>
              <View style={styles.inputIconContainerStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder={textStorage['AccountDetailsScreen.bank_name']}
                  placeholderTextColor={color.boulder}
                  value={fields?.BankName}
                  onChangeText={value => handleInputChange(value, 'BankName')}
                  keyboardType={'default'}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
          </BasicDetailsContainerCard>
          <Text style={styles.errorText}>{validationerror?.BankName}</Text>

          <BasicDetailsInput
            placeholder={textStorage['AccountDetailsScreen.account_number']}
            setInputValue={value => handleInputChange(value, 'Accountnumber')}
            type="Accountnumber"
          />
          <Text style={styles.errorText}>{validationerror?.Accountnumber}</Text>
          <BasicDetailsInput
            placeholder={
              textStorage['AccountDetailsScreen.confirm_account_number']
            }
            setInputValue={value =>
              handleInputChange(value, 'ConfirmAccountnumber')
            }
            type="Accountnumber"
          />
          <Text style={styles.errorText}>
            {validationerror?.ConfirmAccountnumber}
          </Text>
          <BasicDetailsInput
            placeholder={textStorage['AccountDetailsScreen.ifsc_code']}
            setInputValue={value => handleInputChange(value, 'IFSCCode')}
            type="IFSCCode"
          />
          <Text style={styles.errorText}>{validationerror?.IFSCCode}</Text>
          <Button
            label={textStorage['AccountDetailsScreen.verify_now']}
            // onPress={() => navigation.navigate('SelectBankScreen')}
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
    marginBottom: 10,
    marginTop: -20,
  },
  inputIconContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    padding: 10,
  },
});

export {AccountDetailsScreen};
