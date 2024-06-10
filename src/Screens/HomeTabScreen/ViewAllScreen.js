import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView,FlatList} from 'react-native';
import {image} from '../../assets';
import {
  BankDetailsCard,
  BasicDetailsInput,
  Button,
  CustomizableDropdown,
  Header,
  KnowledgeBlogCard,
  NewsUpdateCard,
  ProfileDetailsHouseTypeCard,
  ProfileDetailsProgressBar,
} from '../../components';
import {color, style} from '../../utility';
import {
  stayValidateValues,
  validateValues,
} from '../../validation/PersonalInformationScreenvalidation';
import {AppStateContext} from '../../providers/AuthContextProvider';
import axios from 'axios';
import {
  BASIC_URL,
  basicAuthHeader,
  basicAuthTokenHeader,
} from '../../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ViewList } from '../../components/HomeScreenComponents/ViewList';

const ViewAllScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData();
    getKnowledgeBlogs();
  }, []);
  // NOTE: getting user data (cibil score) from api
  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    try {
      const res = await axios.get(`${BASIC_URL}/customer/getCustomerDetails`, {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      });
      setUserData(res?.data?.data?.details);
      // Experian value is not coming from user api
      // console.log(`getUserData Data ===>`, res?.data?.data?.details);
    } catch (error) {
      if (error?.response?.data?.message) {
        Alert.alert(error?.response?.data?.message);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        navigation.navigate('LoginScreen');
      }
    }
  };

    // NOTE: Get knowledge blogs
    const getKnowledgeBlogs = async () => {
      const token = await AsyncStorage.getItem('token');
      const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
  
      try {
        const res = await axios.get(`${BASIC_URL}/customer/newsList`, {
          headers: basicAuthTokenHeader(token, selectedLanguage),
        });
        setBlogs(res?.data?.data?.list);
        // don't get image of knowledge blogs
        // console.log(`getKnowledgeBlogs data ===>`, res?.data?.data?.list);
      } catch (error) {
        if (error?.response?.data?.message) {
          Alert.alert(error?.response?.data?.message);
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          navigation.navigate('LoginScreen');
        }
      }
    };
  
  return (
    <View style={styles.containerStyle}>
      <Header
        // backOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        backOnPress={() => navigation.navigate("HomeScreen")}
        iconUri={image.hamburgerWhiteIcon}
        label={"View All"}
      />
        <FlatList
          data={blogs}
          // horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
             <ViewList
                  title={item.title}
                  description={item.description}
                  id={item.id}
                />
              </View>
            );
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export {ViewAllScreen};
