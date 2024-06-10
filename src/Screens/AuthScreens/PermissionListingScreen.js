import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Button,
  Header,
  PermissionAuthorizeCheckbox,
  PermissionCard,
  PermissionLocationModal,
  PermissionMediaModal,
  PermissionPhoneCallModal,
  PermissionSMSModal,
} from '../../components';
import {image} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color, font} from '../../utility';
import {PermissionsAndroid, Linking, Alert} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {AppStateContext} from '../../providers/AuthContextProvider';
import FAQModal from '../../components/FAQComponent/FAQModal';

const PermissionListingScreen = ({navigation}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [knowMoreModal, setKnowMoreModal] = useState(false);
  const {textStorage} = useContext(AppStateContext);
  // console.log('textStorage :>> ', textStorage);
  const data = [
    {
      id: 1,
      imageUri: image.locationPinGreyIcon,
      permissionName: textStorage['PermissionScreen.location'],
      permissionDescription:
        textStorage['PermissionScreen.location_description'],
    },
    {
      id: 2,
      imageUri: image.smsGreyIcon,
      permissionName: textStorage['PermissionScreen.sms'],
      permissionDescription: textStorage['PermissionScreen.sms_description'],
    },
    // {
    //   id: 3,
    //   imageUri: image.installedAppsGreyIcon,
    //   permissionName: 'Installed Apps',
    //   permissionDescription:
    //     'The app will access the device’s installed apps to enhance the user’s credit profile & integrate services with 3rd party apps.',
    // },
    {
      id: 4,
      imageUri: image.mediaAndPhotosGreyIcon,
      permissionName: textStorage['PermissionScreen.media_photos'],
      permissionDescription: textStorage['PermissionScreen.media_description'],
    },
    {
      id: 5,
      imageUri: image.phoneCallGreyIcon,
      permissionName: textStorage['PermissionScreen.phone_call'],
      permissionDescription:
        textStorage['PermissionScreen.phone_call_description'],
    },
    {
      id: 6,
      imageUri: require('../../assets/BasicDetailsScreenAssets/userContact.png'),
      permissionName: textStorage['PermissionScreen.contact'],
      permissionDescription:
        textStorage['PermissionScreen.contactdescription'],
    },
  ];

  // const [isLocationGranted, setIsLocationGranted] = useState(false);
  // const [isSmsGranted, setIsSmsGranted] = useState(false);
  // const [isMediaGranted, setIsMediaGranted] = useState(false);
  // const [isPhoneCallGranted, setIsPhoneCallGranted] = useState(false);
  // const [submit, setSubmit] = useState(false);

  const [isContactGranted, setIsContactGranted] = useState(false);
  const [isLocationGranted, setIsLocationGranted] = useState(false);
  const [isSmsGranted, setIsSmsGranted] = useState(false);
  const [isMediaGranted, setIsMediaGranted] = useState(false);
  const [isPhoneCallGranted, setIsPhoneCallGranted] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    // Check if each permission is already granted and update state accordingly
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(result => setIsLocationGranted(result));

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.SEND_SMS).then(
      result => setIsSmsGranted(result),
    );

    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ).then(result => setIsMediaGranted(result));

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE).then(
      result => setIsPhoneCallGranted(result),
    );
  }, []);

  // console.log(
  //   'isLocationGranted,isSmsGranted,isMediaGranted,isPhoneCallGranted :>> ',
  //   isLocationGranted,
  //   isSmsGranted,
  //   isMediaGranted,
  //   isPhoneCallGranted,
  //   submit,
  // );

  const isButton = !isAuthorized;

  const openSettings = () => {
    Linking.openSettings();
  };

  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('location permission  - :', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsLocationGranted(true);
        console.log('The permission is granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setIsLocationGranted(false);
        console.log('The permission denied');
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'location permission Required',
          'please go to Settings > App > Permissions and enable location.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const checkSmsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      );
      console.log('granted :>> ', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsSmsGranted(true);
        console.log('SMS permission is granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setIsSmsGranted(false);
        console.log('SMS permission denied');
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'SMS permission Required',
          'please go to Settings > App > Permissions and enable SMS.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const checkPhonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS
      );
      console.log('granted :>> ', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsSmsGranted(true);
        console.log('SMS permission is granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setIsSmsGranted(false);
        console.log('SMS permission denied');
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'SMS permission Required',
          'please go to Settings > App > Permissions and enable SMS.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const checkMediaPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      console.log('granted :>> ', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsMediaGranted(true);
        console.log('Media access permission is granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setIsMediaGranted(false);
        console.log('Media access permission denied');
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Media access permission Required',
          'please go to Settings > App > Permissions and enable Media access.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestCallPhonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPhoneCallGranted(true);
        console.log('Phone call permission is granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setIsPhoneCallGranted(false);
        console.log('Phone call permission denied');
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Phone call permission Required',
          'please go to Settings > App > Permissions and enable Phone call.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const checkContactPermession = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPhoneCallGranted(true);
        console.log('Phone call permission is granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setIsPhoneCallGranted(false);
        console.log('Phone call permission denied');
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Read Contacts permission Required',
          'please go to Settings > App > Permissions and enable contacts.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // function locationPermissionHandler() {
  //   setLocationVisible(false);
  //   setSmsVisible(true);
  // }

  // function smsPermissionHandler() {
  //   setSmsVisible(false);
  //   setMediaVisible(true);
  // }

  // function mediaPermissionHandler() {
  //   setMediaVisible(false);
  //   setPhoneCallVisible(true);
  // }

  // function PhoneCallVisible() {
  //   setIsAuthorized(true);
  //   setPhoneCallVisible(false);
  // }
  const requestForPermission = async flag => {
    try {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
        ];
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        console.log(
          'oks',
          granted[PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE],
          granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
          granted[PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS],
          granted[PermissionsAndroid.PERMISSIONS.READ_SMS],
          granted[PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS],
        );
        if (
          granted[PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_SMS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          // if (flag === 0) {
          //   getPhoneno();
          // }
          // else {
          //   getEmailIds();
          // }
        }
      }
    } catch (error) {
      console.log('Error in getting phone no', error);
    }
  };

  const handleSubmit = async () => {
    let locationPermission, smsPermission, mediaPermission, callPermission,contactPermission;
    locationPermission = await checkLocationPermission();
    if (locationPermission) {
      smsPermission = await checkSmsPermission();
    }
    if (locationPermission && smsPermission) {
      mediaPermission = await checkMediaPermission();
    }
    if (locationPermission && smsPermission && mediaPermission) {
      callPermission = await requestCallPhonePermission();
    }
    if (locationPermission && smsPermission && mediaPermission&&contactPermission) {
      callPermission = await requestCallPhonePermission();
    }
    if (locationPermission && smsPermission && mediaPermission&&callPermission) {
      contactPermission = await checkContactPermession();
    }
    requestForPermission()

    // After handling permissions, you can navigate or perform other actions.
    // For example:
    if (
      locationPermission &&
      smsPermission &&
      mediaPermission &&
      callPermission&&
      contactPermission
    ) {
      setKnowMoreModal(false);
      await AsyncStorage.setItem("firstTime","true")
      navigation.navigate('LoginScreen');
    }
    //  else {
    //   if (!isLocationGranted) {
    //     checkLocationPermission();
    //   }
    //   if (!isSmsGranted) {
    //     checkSmsPermission();
    //   }
    //   if (!isMediaGranted) {
    //     checkMediaPermission();
    //   }
    //   if (!isPhoneCallGranted) {
    //     requestCallPhonePermission();
    //   }
    // }
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        label={textStorage['PermissionScreen.permissions']}
        iconUri={image.infoIcon}
        backOnPress={() => navigation.goBack()}
        onPress={()=>{
          setKnowMoreModal(true);
        }}
      />
      <View style={styles.baseContainerStyle}>
      {showModal ? (
          <FAQModal
            modalVisible={showModal}
            onPressclose={() => {
              setShowModal(false);
            }}
            categoryName={'permission'}
          />
        ) : null}
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <View>
                <PermissionCard
                  imageUri={item.imageUri}
                  permissionName={item.permissionName}
                  permissionDescription={item.permissionDescription}
                  // onPress={() =>
                  //   item.id === 1
                  //     ? setLocationVisible(true)
                  //     : item.id === 2
                  //     ? setSmsVisible(true)
                  //     : item.id === 3
                  //     ? null
                  //     : item.id === 4
                  //     ? setMediaVisible(true)
                  //     : setPhoneCallVisible(true)
                  // }
                />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.footerComponentContainerStyle}>
        <PermissionAuthorizeCheckbox
          isChecked={isAuthorized}
          onPress={() => setIsAuthorized(state => !state)}
        />
        {/* <Button
          label="test"
          style={styles.buttonStyle}
          onPress={checkLocationPermission}
        /> */}
        <Button
          isButtonEnabled={isButton}
          style={styles.buttonStyle}
          label={textStorage['PermissionScreen.i_agree']}
          onPress={() => handleSubmit()}
        />
        <Text style={styles.informationLabelTextStyle}>
          {textStorage['PermissionScreen.all_your_information_is_safe_secure']}{' '}
          <Text
            onPress={() => {
              setKnowMoreModal(true);
            }}
            style={styles.knowMoreTextStyle}>
            {textStorage['PermissionScreen.know_more']}{' '}
          </Text>
        </Text>
      </View>
      {/* <PermissionLocationModal
        visible={locationVisible}
        onPress={() => setLocationVisible(false)}
        onPress1={() => checkLocationPermission()}
        onPress2={() => locationPermissionHandler()}
        onPress3={() => locationPermissionHandler()}
      />
      <PermissionSMSModal
        visible={smsVisible}
        onPress={() => setSmsVisible(false)}
        onPress1={() => smsPermissionHandler()}
        onPress2={() => checkSmsPermission()}
      />
      <PermissionMediaModal
        visible={mediaVisible}
        onPress={() => setMediaVisible(false)}
        onPress1={() => mediaPermissionHandler()}
        onPress2={() => checkMediaPermission()}
      />
      <PermissionPhoneCallModal
        visible={phoneCallVisible}
        onPress={() => setPhoneCallVisible(false)}
        onPress1={() => setPhoneCallVisible(false)}
        onPress2={() => requestCallPhonePermission()}
        // onPress1={() => navigation.navigate('LoginScreen')}
        // onPress2={() => navigation.navigate('LoginScreen')}
      /> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={knowMoreModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setKnowMoreModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '85%',
                  alignSelf: 'center',
                }}>
                <Text style={styles.modalText}>
                  How does{' '}
                  <Text style={[styles.modalText, {color: '#E03300'}]}>
                    Owe Wisely
                  </Text>{' '}
                  keep your data secure ?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setKnowMoreModal(false);
                  }}>
                  <Image
                    source={require('../../assets/FAQLogos/close.png')}
                    style={styles.buttonClose}
                  />
                </TouchableOpacity>
              </View>
              <View style={{backgroundColor:"gray",height:1,width:"90%",alignSelf:"center",marginBottom:10}}/>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '85%',
                  alignSelf: 'center',
                  margin:10
                }}>
                <View style={{width:"5%"}}>
                  <Image
                    source={require('../../assets/PermissionscreenAssets/BankSecurity.png')}
                    style={[styles.buttonClose1,{marginStart:0,marginTop:15}]}
                  />
                </View>
                <View style={{width:"93%",marginStart:10}}>
                  <Text style={styles.titleTxt}>Bank grade Security</Text>
                  <Text style={styles.descTxt}>256-bit + SSL secured with AWS</Text>
                </View>
              </View>
              
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '85%',
                  alignSelf: 'center',
                  margin:10
                }}>
                <View style={{width:"5%"}}>
                  <Image
                    source={require('../../assets/PermissionscreenAssets/dataprivacy.png')}
                    style={[styles.buttonClose1,{marginStart:0,marginTop:15}]}
                  />
                </View>
                <View style={{width:"93%",marginStart:10}}>
                  <Text style={styles.titleTxt}>Data Privacy</Text>
                  <Text style={styles.descTxt}>Data is shared with  ISO 2001 certified  3rd  parties only for the purpose of credit assessment</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '85%',
                  alignSelf: 'center',
                  margin:10
                }}>
                <View style={{width:"5%"}}>
                  <Image
                    source={require('../../assets/PermissionscreenAssets/datastorage.png')}
                    style={[styles.buttonClose1,{marginStart:0,marginTop:15}]}
                  />
                </View>
                <View style={{width:"93%",marginStart:10}}>
                  <Text style={styles.titleTxt}>Data Storage</Text>
                  <Text style={styles.descTxt}>We do not store any password or OTP details you share with us</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '85%',
                  alignSelf: 'center',
                  margin:10
                }}>
                <View style={{width:"5%"}}>
                  <Image
                    source={require('../../assets/PermissionscreenAssets/lendingpolicy.png')}
                    style={[styles.buttonClose1,{marginStart:0,marginTop:15}]}
                  />
                </View>
                <View style={{width:"93%",marginStart:10}}>
                  <Text style={styles.titleTxt}>Lending Policy</Text>
                  <Text style={styles.descTxt}>Our policies & Services are fully regulated & legally compliant</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '85%',
                  alignSelf: 'center',
                  margin:10
                }}>
                <View style={{width:"5%"}}>
                  <Image
                  resizeMode='contain'
                    source={require('../../assets/PermissionscreenAssets/partners.png')}
                    style={[styles.buttonClose1,{marginStart:0,marginTop:15}]}
                  />
                </View>
                <View style={{width:"93%",marginStart:10}}>
                  <Text style={styles.titleTxt}>Trusted Partners </Text>
                  <Text style={styles.descTxt}>We only provide loans in partnership with RBI - authorized  & regulated NBFCs & Financial Institutions</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  baseContainerStyle: {
    flex: 1,
    paddingHorizontal: 15,
  },
  footerComponentContainerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonStyle: {
    marginVertical: 10,
  },
  informationLabelTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
  },
  knowMoreTextStyle: {
    fontFamily: font.soraBold,
    color: color.grenadier,
  },
  centeredView: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
   position:"absolute",
   bottom:0,
    backgroundColor: 'red',
  },
  modalView: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    paddingBottom :30,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    height: 12,
    width: 12,
    alignSelf: 'center',
    tintColor: '#E03300',
    marginStart: 30,
    marginTop: 30,
  },
  buttonClose1: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    // tintColor: '#E03300',
    marginStart: 30,
    marginTop: 30,
  },
  img1: {
    height: 35,
    width: 35,
    alignSelf: 'center',
    marginTop: 20,
    marginEnd: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 16,
    width: '55%',
    color:"black"
  },
  modalText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
    textAlign: 'left',
    marginTop: 10,
  },
  modalText2: {
    color: 'white',
    paddingStart: 5,
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'left',
  },
  titleTxt:{
    fontSize:14,
    fontWeight:'bold',
    color:"black"
  },
  descTxt:{
    fontSize:12,
    fontWeight:'400',
    color:"#818181"
  }
});

export {PermissionListingScreen};
