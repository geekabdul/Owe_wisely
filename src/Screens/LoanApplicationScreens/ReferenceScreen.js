import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {image} from '../../assets';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  BasicDetailsInput,
  Button,
  CriteriaWiseEvaluationModal,
  CustomizableDropdown,
  CustomizeLoanOfferModal,
  Header,
  ProposalsCard,
} from '../../components';
import {
  validateValues,
  validateemploymentTypeList,
  validatesalaryReceipt,
} from '../../validation/BasicDetailsScreenvalidation';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {color, font} from '../../utility';
import {
  getProposals,
  getevaluateLoan,
  getpersonalReferenceTypes,
  savePersonalReferences,
} from '../../Api/ProposalsScreenApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';
import Contacts from 'react-native-contacts';
import {useFocusEffect} from '@react-navigation/native';

const ReferenceScreen = ({navigation}) => {
  const [relationList, setrelationList] = useState([]);
  const [familyName, setfamilyName] = useState(null);
  const [familyNumber, setfamilyNumber] = useState(null);
  const [friendName, setfriendName] = useState(null);
  const [friendNumber, setfriendNumber] = useState(null);

  const [value, setValue] = useState(null);
  const [valuetype, setvaluetype] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [spinner, setSpinner] = useState(false);
  // personalReferenceTypes
  const [validationerror, SetValidationerror] = useState({});
  const [issubmit, setIssubmit] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  const [fields, setFields] = useState({
    FamilyFullname: '',
    FamilyNumber: '',
    FriendNumber: '',
    FriendFullname: '',
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

  useFocusEffect(
    React.useCallback(() => {
      setfamilyName(global?.name);
      setfamilyNumber(global?.phone);
      setfriendName(global?.frdName);
      setfriendNumber(global?.frdPhone);
      setFields(prevState => ({
        ...prevState,
        ['FamilyFullname']: global?.name,
        ['FamilyNumber']: global?.phone,
        ['FriendNumber']: global?.frdPhone,
        ['FriendFullname']: global?.frdName,
      }));
    }, []),
  );

  const callApi = async () => {
    await getpersonalReferenceTypes()
      .then(async res => {
        console.log(res.data);
        // let tempData=[]
        // tempData.push(res.data.list)
        setrelationList(res.data.list);
        // setModalVisible(true);
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  };

  const savePersonalDetial = async () => {
    // setSpinner(true)
    let fnum = fields.FamilyNumber.replace(/\s/g, '');
    let frdnum = fields.FriendNumber.replace(/\s/g, '');
    console.log(fnum);
    console.log(frdnum);
    if (fnum.length < 10 || frdnum.length < 10) {
      Alert.alert('Please enter a valid mobile number');
    } else {
      if (
        (!fnum.startsWith('+91') && fnum.length > 10) ||
        (!frdnum.startsWith('+91') && frdnum.length > 10)
      ) {
        Alert.alert('You can only use Indian mobile numbers.');
      } else {
        setSpinner(true);
        let familyNum = fields.FamilyNumber.replace(/\D/g, '').slice(-10);
        let frdNum = fields.FriendNumber.replace(/\D/g, '').slice(-10);
        familyNum = familyNum.replace(' ', '');
        frdNum = frdNum.replace(' ', '');

        let object = {
          family_reference_type: valuetype,
          family_reference_phone: familyNum,
          family_reference_full_name: fields.FamilyFullname,
          friend_reference_phone: frdNum,
          friend_reference_full_name: fields.FriendFullname,
        };
        console.log(familyNum);
        console.log(frdNum);
        console.log(fields.FamilyFullname !== null);
        console.log(fields.FriendFullname !== null);

        if (
          familyNum !== '' &&
          frdNum !== '' &&
          fields.FamilyFullname !== null &&
          fields.FriendFullname !== null
        ) {
          if (familyNum === frdNum) {
            Alert.alert('Family contact and friend should be different');
            setSpinner(false);
          } else {
            await savePersonalReferences(object)
              .then(async res => {
                console.log('res>>>>', res.data);
                setfamilyName(null);
                setfamilyNumber(null);
                setfriendName(null);
                setfriendNumber(null);
                global.name = null;
                global.phone = null;
                global.frdName = null;
                global.frdPhone = null;
                ToastAndroid.show(
                  'Personal References saved successfully...',
                  ToastAndroid.SHORT,
                );
                setSpinner(false);
                navigation.navigate('DrawerNavigator');
              })
              .catch(error => {
                console.log('error :>> ', error);
                setSpinner(false);
                ToastAndroid.show(error, ToastAndroid.SHORT);
              });
          }
        } else {
          setSpinner(false);
          Alert.alert('Please enter valid contacts.');
        }
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Spinner visible={spinner} />
      <View style={styles.containerStyle}>
        <Header
          iconUri={image.infoIcon}
          label={'Reference'}
          backOnPress={() => navigation.goBack()}
          onPress={() => {
            //  setCriteriaWiseEvaluationVisible(true)
            //  setSelectedData(proposal);
          }}
        />
        <Image
          source={require('../../assets/LoanScreenAssets/reference.png')}
          resizeMode="cover"
          style={{width: '100%', height: responsiveScreenWidth(40)}}
        />
        <View
          style={{
            marginTop: responsiveScreenWidth(-5),
            height: responsiveScreenWidth(200),
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
            padding: responsiveScreenWidth(8),
          }}>
          <Text
            style={[styles.boldBigText, {fontSize: responsiveFontSize(2.5)}]}>
            Personal references for your Loan
          </Text>
          <Text style={styles.smallText}>
            {
              'Your loan amount will be transferred  to & EMIs be\n deducted from the account'
            }{' '}
          </Text>
          <Text
            style={[
              styles.boldBigText,
              {
                textAlign: 'left',
                alignSelf: 'flex-start',
                marginBottom: responsiveScreenWidth(3),
              },
            ]}>
            Family / Relative’s Reference
          </Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: 'blue', paddingStart: 10},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={relationList}
            search={false}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.name);
              setvaluetype(item.id);
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? 'blue' : 'black'}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />

          <BasicDetailsInput
            placeholder={'Mobile No.'}
            imageClick={() => {
              navigation.navigate('ContactListScreen', {relation: 'family'});
            }}
            // maxLength={10}
            iconUri={image.contactIcon}
            setInputValue={value => {
              handleInputChange(value, 'FamilyNumber');
              // setfamilyNumber(value);
            }}
            data={fields.FamilyNumber}
            keyBoardType="phone-pad"
          />
          <BasicDetailsInput
            placeholder={'Name'}
            iconUri={image.contactIcon}
            imageClick={() => {
              navigation.navigate('ContactListScreen', {relation: 'family'});
            }}
            setInputValue={value => {
              handleInputChange(value, 'FamilyFullname');
              // setfamilyName(value);
            }}
            data={fields.FamilyFullname}
            // setInputValue={value => handleInputChange(value, 'MotherName')}
          />
          <View
            style={{
              height: 1,
              width: '120%',
              backgroundColor: '#D9D9D9',
              marginStart: responsiveScreenWidth(-8),
              marginTop: responsiveScreenWidth(3),
              marginBottom: responsiveScreenWidth(3),
            }}
          />
          <Text
            style={[
              styles.boldBigText,
              {
                textAlign: 'left',
                alignSelf: 'flex-start',
                marginBottom: responsiveScreenWidth(5),
              },
            ]}>
            Friend’s Reference
          </Text>
          <BasicDetailsInput
            placeholder={'Mobile No.'}
            iconUri={image.contactIcon}
            // maxLength={10}
            imageClick={() => {
              navigation.navigate('ContactListScreen', {relation: 'freind'});
            }}
            setInputValue={value => {
              // setfriendNumber(value);
              handleInputChange(value, 'FriendNumber');
            }}
            data={fields.FriendNumber}
            keyBoardType="phone-pad"
          />
          {/* <Text style={styles.errorText}>{validationerror?.Gender}</Text> */}
          <BasicDetailsInput
            placeholder={'Name'}
            iconUri={image.contactIcon}
            imageClick={() => {
              navigation.navigate('ContactListScreen', {relation: 'freind'});
            }}
            setInputValue={value => {
              // setfriendName(value);
              handleInputChange(value, 'FriendFullname');
            }}
            data={fields.FriendFullname}
          />
          {/* <Text style={styles.errorText}>{validationerror?.Gender}</Text> */}
          <TouchableOpacity
            onPress={() => {
              savePersonalDetial();
            }}
            style={styles.btn}>
            <Text
              style={[
                styles.boldBigText,
                {color: 'white', marginTop: responsiveScreenWidth(0)},
              ]}>
              Add reference
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    width: '100%',
  },
  boldBigText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
    marginTop: responsiveScreenWidth(2),
  },
  smallText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: responsiveFontSize(1.6),
    marginTop: responsiveScreenWidth(2),
    color: 'black',
  },
  btn: {
    backgroundColor: '#E03300',
    width: '100%',
    height: responsiveScreenWidth(15),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveScreenWidth(2),
    marginTop: responsiveScreenWidth(5),
  },
  dropdown: {
    height: 50,
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.boulder,
    paddingStart: 20,
    borderColor: 'grey',
    borderWidth: 1,
    height: responsiveScreenWidth(15),
    marginBottom: responsiveScreenWidth(5),
  },
  // dropdown: {
  //   margin: 16,
  //   height: 50,
  //   borderBottomColor: 'gray',
  //   borderBottomWidth: 0.5,
  // },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export {ReferenceScreen};
