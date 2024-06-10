import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
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
import {
  stayValidateValues,
  validateValues,
} from '../../validation/PersonalInformationScreenvalidation';
import {AppStateContext} from '../../providers/AuthContextProvider';
import Contacts from 'react-native-contacts';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';

const ContactListScreen = ({navigation, route}) => {
  const [search, setsearch] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [contactList, setcontactList] = useState([]);
  useEffect(() => {
    Contacts.getAll().then(contacts => {
      setContacts(contacts);
      setcontactList(contacts);
    });
  }, []);

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  const searchFilterFunction = text => {
    console.log('>>');
    if (text) {
      // item?.phoneNumbers[0]?.number
      if (isNaN(text)) {
        const newData = contacts.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.givenName
            ? item.givenName.toUpperCase()
            : ''.toUpperCase();

          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setContacts(newData);
        setsearch(text);
      } else {
        const newData = contacts.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.phoneNumbers[0]?.number
            ? item.phoneNumbers[0]?.number.toUpperCase()
            : ''.toUpperCase();

          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setContacts(newData);
        setsearch(text);
      }
    } else {
      console.log('>><<');
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setContacts(contactList);
      setsearch(text);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (route.params.relation === 'family') {
            let fullName =
              item.givenName + item?.middleName + ' ' + item?.familyName;
            global.name = fullName;
            global.phone = item.phoneNumbers[0].number;

            console.log(global.name);
            console.log(global.phone);
          } else {
            let fullName =
              item.givenName + item?.middleName + ' ' + item?.familyName;
            global.frdName = fullName;
            global.frdPhone = item.phoneNumbers[0].number;
          }
          navigation.goBack();
        }}>
        <View style={styles.contactCon}>
          <View style={styles.imgCon}>
            <View style={styles.placeholder}>
              <Text style={styles.txt}>{item?.givenName[0]}</Text>
            </View>
          </View>
          <View style={styles.contactDat}>
            <Text style={styles.name}>
              {item?.givenName} {item?.middleName && item.middleName + ' '}
              {item?.familyName}
            </Text>
            <Text style={styles.phoneNumber}>
              {item?.phoneNumbers[0]?.number}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        // iconUri={image.infoIcon}
        label={'Contact List'}
        backOnPress={() => navigation.goBack()}
        onPress={() => {
          //  setCriteriaWiseEvaluationVisible(true)
          //  setSelectedData(proposal);
        }}
      />
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          padding: responsiveScreenWidth(5),
        }}>
        <View style={styles.textInputBoxStyle}>
          <Image
            source={require('../../assets/LoanScreenAssets/search.png')}
            style={{
              height: responsiveScreenWidth(4),
              width: responsiveScreenWidth(4),
              alignSelf: 'center',
            }}
          />
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
            // inlineImageLeft={require("../../assets/search-black@3x.png")}
          />
          <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{
            setsearch(null)
            setContacts(contactList);
          }}>
          <Image
            source={require('../../assets/FAQLogos/close.png')}
            style={{
              height: responsiveScreenWidth(4),
              width: responsiveScreenWidth(4),
              alignSelf: 'center',
              tintColor:"black"
            }}
          />
          </TouchableOpacity>
        </View>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  list: {
    flex: 1,
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    marginStart: responsiveScreenWidth(3),
  },
  txt: {
    fontSize: responsiveFontSize(2),
    color: color.codGray,
  },
  name: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: '700',
  },
  phoneNumber: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    fontWeight: '400',
  },
  textInputBoxStyle: {
    height: responsiveScreenWidth(13),
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: responsiveScreenWidth(2),
    margin: 5,
    borderColor: color.gray,
    backgroundColor: 'white',
    marginBottom: responsiveScreenWidth(3),
    flexDirection: 'row',
  },
  textInputStyle: {
    height: responsiveScreenWidth(12),
    //  backgroundColor: 'yellow',
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    width: responsiveScreenWidth(70),
    marginStart: responsiveScreenWidth(3),
  },
});

export {ContactListScreen};
