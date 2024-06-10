import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {image} from '../../assets';
import {
  BasicDetailsInput,
  Button,
  CustomizableDropdown,
  Header,
  ProfileDetailsHouseTypeCard,
  ProfileDetailsProgressBar,
} from '../../components';
import {color, style} from '../../utility';
import {validateValues} from '../../validation/ProfessionalInformationScreenvalidation';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {getPinCodeList} from '../../Api/PincodeApi';
import {
  companyList,
  employmentTypeList,
  industryTypeList,
  loanPurposeList,
} from '../../Api/ProfileDetailApi';

const ProfessionalInformationScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [validationerror, SetValidationerror] = useState({});
  const [issubmit, setIssubmit] = useState(false);
  const [pincodeList, setPincodeList] = useState([]);
  const [companyTypeList, setcompanyTypeList] = useState([]);
  const [industryList, setindustryTypeList] = useState([]);
  const [loanPList, setloanPurposeList] = useState([]);

  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));

  const data = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];

  const [fields, setFields] = useState({
    CompanyName: '',
    Industrytype: '',
    Purposeofloan: '',
    Pincode: '',
    State: '',
    City: '',
    Currentaddress: '',
  });

  useEffect(() => {
    getPincodeListApi();
    getloanPurposeListApi();
    getIndustryTypeList();
    getCompanyList();
  }, []);

  const getPincodeListApi = () => {
    getPinCodeList()
      .then(res => {
        // console.log('Response::: ', JSON.stringify(res.data.list));
        setPincodeList(res?.data?.list);
      })
      .catch(error => {
        console.log('Error::: ', error);
      });
  };
  const getloanPurposeListApi = () => {
    loanPurposeList()
      .then(res => {
        // console.log('Response::: ', JSON.stringify(res.data.list));
        setloanPurposeList(res?.data?.list);
      })
      .catch(error => {
        console.log('Error::: ', error);
      });
  };
  const getCompanyList = () => {
    companyList()
      .then(res => {
        // console.log('Response:::setcompanyTypeList ', JSON.stringify(res.data.list));
        setcompanyTypeList(res?.data?.list);
      })
      .catch(error => {
        console.log('Error::: ', error);
      });
  };
  const getIndustryTypeList = () => {
    industryTypeList()
      .then(res => {
        // console.log('Response:::setindustryTypeList ', JSON.stringify(res.data.list));
        setindustryTypeList(res?.data?.list);
      })
      .catch(error => {
        console.log('Error::: ', error);
      });
  };

  function findDataByPincode(pincode) {
    return pincodeList
      .filter(item => item.pincode === pincode)
      .map(item => item);
  }

  const handleInputChange = (value, fieldName) => {
    if (fieldName === 'Pincode') {
      if (value.length == 6) {
        var tempData = findDataByPincode(value);
        var tempCity = tempData[0].city.name;
        var tempState = tempData[0].city.state.name;

        console.log(tempCity);
        console.log(tempState);

        setFields(prevState => ({
          ...prevState,
          ['City']: tempCity,
          ['State']: tempState,
          [fieldName]: value,
        }));
        console.log('fields', fields);
      }
    } else {
      if (issubmit) {
        SetValidationerror(validateValues({...fields, [fieldName]: value}));
      }
      setFields(prevState => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = () => {
    setIssubmit(true);
    SetValidationerror(validateValues(fields));

    const error = validateValues(fields);

    if (Object.keys(error) == 0) {
      console.log('fields :>> ', fields);
      navigation.navigate('AccountDetailsScreen');
    }
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        iconUri={image.homeSelectedIcon}
        label={textStorage['ProfessionalInformationScreen.profile_details']}
        backOnPress={() => navigation.goBack()}
      />
      <ProfileDetailsProgressBar
        isActive={{count: 2, isCompleted: true}}
        textStorage={textStorage}
      />
      <ScrollView>
        <View style={styles.baseContainerStyle}>
          <CustomizableDropdown
            placeholder={
              textStorage['ProfessionalInformationScreen.company_name']
            }
            onChange={value => handleInputChange(value?.name, 'CompanyName')}
            value={fields?.CompanyName}
            data={companyTypeList}
          />
          <Text style={styles.errorText}>{validationerror?.CompanyName}</Text>
          <CustomizableDropdown
            placeholder={
              textStorage['ProfessionalInformationScreen.industry_type']
            }
            onChange={value => handleInputChange(value?.name, 'Industrytype')}
            value={fields?.Industrytype}
            data={industryList}
          />
          <Text style={styles.errorText}>{validationerror?.Industrytype}</Text>
          <CustomizableDropdown
            placeholder={
              textStorage['ProfessionalInformationScreen.purpose_of_loan']
            }
            onChange={value => handleInputChange(value?.name, 'Purposeofloan')}
            value={fields?.Purposeofloan}
            data={loanPList}
          />
          <Text style={styles.errorText}>{validationerror?.Purposeofloan}</Text>
          <BasicDetailsInput
            placeholder={
              textStorage[
                'ProfessionalInformationScreen.pin_code_current_address'
              ]
            }
            iconUri={image.pincodeGreyIcon}
            imageClick={() => {
              console.log('>');
            }}
            setInputValue={value => handleInputChange(value, 'Pincode')}
            type="pincode"
          />
          <Text style={styles.errorText}>{validationerror?.Pincode}</Text>
          <View style={style.commonRowStyleWithSpaceBetween}>
            <View style={styles.inputSubcontainerStyle}>
              <BasicDetailsInput
                imageClick={() => {
                  console.log('>');
                }}
                placeholder={textStorage['ProfessionalInformationScreen.state']}
                iconUri={image.borderedLocationPinGreyIcon}
                setInputValue={value => handleInputChange(value, 'State')}
                value={fields?.State}
              />
              <Text style={styles.errorText}>{validationerror?.State}</Text>
            </View>
            <View style={styles.inputSubcontainerStyle}>
              <BasicDetailsInput
                imageClick={() => {
                  console.log('>');
                }}
                placeholder={textStorage['ProfessionalInformationScreen.city']}
                iconUri={image.borderedLocationPinGreyIcon}
                setInputValue={value => handleInputChange(value, 'City')}
                value={fields?.City}
              />
              <Text style={styles.errorText}>{validationerror?.City}</Text>
            </View>
          </View>
          <BasicDetailsInput
            imageClick={() => {
              console.log('>');
            }}
            placeholder={
              textStorage['ProfessionalInformationScreen.current_address']
            }
            iconUri={image.borderedLocationPinGreyIcon}
            setInputValue={value => handleInputChange(value, 'Currentaddress')}
          />
          <Text style={styles.errorText}>
            {validationerror?.Currentaddress}
          </Text>
          <Button
            label={textStorage['ProfessionalInformationScreen.continue']}
            // onPress={() => navigation.navigate('AccountDetailsScreen')}
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
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  inputSubcontainerStyle: {
    width: '48%',
  },
  errorText: {
    color: color.errorColor,
    marginBottom: 15,
    marginTop: -20,
  },
});

export {ProfessionalInformationScreen};
