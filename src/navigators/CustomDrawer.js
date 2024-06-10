import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  NativeModules,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import {version} from '../../package.json';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {responsiveScreenFontSize, responsiveScreenWidth} from '../utility/Size';
import {getStaticApi} from '../Api/StaticApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASIC_URL, basicAuthTokenHeader} from '../libs/apiConfig';

const CustomDrawer = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [aboutStaticList, setaboutStaticList] = useState([]);
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');

  useEffect(async () => {
    // let namef = await AsyncStorage.getItem('username');
    // let phonef = await AsyncStorage.getItem('phone');
    // console.log(namef);
    // setname(namef);
    // setphone(phonef);
    getUserData();
  }, []);

  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    try {
      const res = await axios.get(`${BASIC_URL}/customer/getCustomerDetails`, {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      });
      if (res?.data?.data?.details) {
        setname(res?.data?.data?.details?.basic_detail_one?.profile_name);
        setphone(res?.data?.data?.details?.phone);
      }
      // Experian value is not coming from user api
      console.log(
        `getUserData Data ===>`,
        res?.data?.data?.details?.profile_name,
      );
    } catch (error) {}
  };

  const callApi = async () => {
    await getStaticApi()
      .then(async res => {
        console.log(res.data.list);
        setaboutStaticList(res.data.list);
        setModalVisible(true);
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
          navigation.navigate('AboutScreen', {
            data: item.value,
            name: item.name,
          });
        }}
        style={{
          flexDirection: 'row',
          borderBottomColor: '#d7d7d7',
          borderBottomWidth: 0.5,
          height: responsiveScreenWidth(15),
        }}>
        <Text
          style={[
            styles.titletextStyle,
            {paddingStart: responsiveScreenWidth(5)},
          ]}>
          {item?.name}
        </Text>
        <Image
          resizeMode="contain"
          source={require('../assets/DrawerLogos/nextIcon.png')}
          style={[
            styles.blueIcon,
            {
              height: responsiveScreenWidth(3),
              width: responsiveScreenWidth(3),
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{flexDirection: 'row', padding: responsiveScreenWidth(2)}}>
            <Image
              resizeMode="contain"
              source={require('../assets/DrawerLogos/drawerProfileLogo.png')}
              style={styles.ProfileIcon}
            />
            {/* drawerProfileLogo.png */}
            <View>
              <View>
                <Text
                  style={[
                    styles.titletextStyle1,
                    {marginStart: responsiveScreenWidth(4)},
                  ]}>
                  {name}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/DrawerLogos/callIcon.png')}
                  style={styles.callIcon}
                />
                <Text style={[styles.titletextStyle, {marginTop: 0}]}>
                  {phone}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileScreen')}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/DrawerLogos/nextIcon.png')}
                  style={styles.nextIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HelpScreen');
            }}
            style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../assets/DrawerLogos/helpIcon.png')}
              style={styles.blueIcon}
            />
            <Text style={styles.titletextStyle}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              callApi();
            }}
            style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../assets/DrawerLogos/infoIcon.png')}
              style={styles.blueIcon}
            />
            <Text style={styles.titletextStyle}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../assets/DrawerLogos/appVersion.png')}
              style={styles.blueIcon}
            />
            <Text style={[styles.titletextStyle, {width: '30%'}]}>
              {'App version'}
            </Text>
            <Text
              style={[
                styles.titletextStyle,
                {
                  width: '35%',
                  textAlign: 'center',
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: responsiveScreenWidth(5),
                  fontSize: responsiveScreenFontSize(1.6),
                  padding: responsiveScreenWidth(2),
                  marginEnd: responsiveScreenWidth(4),
                },
              ]}>
              {'Version ' + version}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              global.isLogin = true;
              navigation.navigate('SelectLanguageScreen');
            }}
            style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../assets/DrawerLogos/langaugeIcon.png')}
              style={styles.blueIcon}
            />
            <Text style={styles.titletextStyle}>Change Language</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              Alert.alert('Log Out', 'Are you sure you want to logout?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: async () => {
                    await AsyncStorage.clear();
                    navigation.navigate('LoginScreen');
                  },
                },
              ]);
            }}
            style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../assets/DrawerLogos/logoutIcon.png')}
              style={styles.blueIcon}
            />
            <Text style={styles.titletextStyle}>Logout</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                  <Image
                    source={require('../assets/FAQLogos/img1.png')}
                    style={styles.img1}
                  />
                </View>
                <View>
                  <Text style={styles.modalText1}>About </Text>
                </View>
                <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Image
                      source={require('../assets/FAQLogos/close.png')}
                      style={styles.buttonClose}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.modalView}>
                {aboutStaticList.length > 0 ? (
                  <FlatList
                    data={aboutStaticList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                ) : (
                  <View>
                    <Text>No Data Found</Text>
                  </View>
                )}
                {/* <View>
                  <TouchableOpacity
                    onPress={() => {navigation.navigate("AboutScreen")}}
                    style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/DrawerLogos/infoIcon.png')}
                      style={styles.blueIcon}
                    />
                    <Text style={styles.titletextStyle}>About Us</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {navigation.navigate("AboutScreen")}}
                    style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/DrawerLogos/legalIcon.png')}
                      style={styles.blueIcon}
                    />
                    <Text style={styles.titletextStyle}>Legal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {navigation.navigate("AboutScreen")}}
                    style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/DrawerLogos/policyIcon.png')}
                      style={styles.blueIcon}
                    />
                    <Text style={styles.titletextStyle}>
                      Grievance redressal policy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {navigation.navigate("AboutScreen")}}
                    style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/DrawerLogos/lendingIcon.png')}
                      style={styles.blueIcon}
                    />
                    <Text style={styles.titletextStyle}>Lending partners</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {navigation.navigate("AboutScreen")}}
                    style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/DrawerLogos/policyIcon.png')}
                      style={styles.blueIcon}
                    />
                    <Text style={styles.titletextStyle}>Privacy Policy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {navigation.navigate("AboutScreen")}}
                    style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/DrawerLogos/TCIcon.png')}
                      style={styles.blueIcon}
                    />
                    <Text style={styles.titletextStyle}>Terms & condition</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {navigation.navigate("AboutScreen")}}
                    style={{flexDirection: 'row'}}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/DrawerLogos/complainIcon.png')}
                      style={styles.blueIcon}
                    />
                    <Text style={styles.titletextStyle}>Complain</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  ProfileIcon: {
    height: responsiveScreenWidth(10),
    width: responsiveScreenWidth(10),
    marginStart: responsiveScreenWidth(4),
    alignSelf: 'center',
  },
  callIcon: {
    height: responsiveScreenWidth(4),
    width: responsiveScreenWidth(4),
    alignSelf: 'center',
    marginStart: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(-4),
  },
  nextIcon: {
    height: responsiveScreenWidth(4),
    width: responsiveScreenWidth(4),
    alignSelf: 'center',
    marginStart: responsiveScreenWidth(44),
    marginTop: responsiveScreenWidth(-12),
  },
  blueIcon: {
    height: responsiveScreenWidth(7),
    width: responsiveScreenWidth(7),
    alignSelf: 'center',
    marginStart: responsiveScreenWidth(7),
  },
  line: {
    width: '90%',
    height: responsiveScreenWidth(0.12),
    backgroundColor: 'grey',
    alignSelf: 'center',
    margin: responsiveScreenWidth(2),
  },
  modalline: {
    width: '90%',
    height: responsiveScreenWidth(0.12),
    backgroundColor: 'white',
    alignSelf: 'center',
    margin: responsiveScreenWidth(2),
  },
  titletextStyle1: {
    fontSize: responsiveScreenFontSize(2.4),
    color: 'black',
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: responsiveScreenWidth(4),
    marginBottom: responsiveScreenWidth(2),
  },
  titletextStyle: {
    margin: responsiveScreenWidth(4),
    fontSize: responsiveScreenFontSize(1.8),
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    width: '70%',
  },
  modaltextStyle: {
    fontSize: responsiveScreenFontSize(1.6),
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    width: '80%',
  },
  textStyle: {
    fontSize: responsiveScreenFontSize(1.5),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(2),
  },
  rowView1: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    padding: responsiveScreenWidth(4),
  },
  rowView: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    padding: responsiveScreenWidth(2),
  },
  modalView: {
    backgroundColor: 'white',
    padding: responsiveScreenWidth(2),
    width: '50%',
    height: '25%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: responsiveScreenWidth(70),
    marginStart: responsiveScreenWidth(30),
    borderRadius: responsiveScreenWidth(2),
  },
  centeredView: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 300,
    backgroundColor: 'red',
  },
  modalView: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
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
    tintColor: 'white',
    marginStart: 30,
    marginTop: 15,
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
    textAlign: 'center',
  },
  modalText1: {
    color: 'white',
    fontWeight: 'bold',
    width: responsiveScreenWidth(50),
    marginTop: responsiveScreenWidth(6),
    fontSize: 18,
    textAlign: 'center',
  },
  modalText2: {
    color: 'white',
    paddingStart: 5,
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'left',
  },
});
export default CustomDrawer;
