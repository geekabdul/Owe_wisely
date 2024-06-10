import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  Alert,
  BackHandler,
} from 'react-native';
import {image} from '../../assets';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import {
  BankDetailsCard,
  CheckCibilCard,
  CibilScoreCard,
  EasyLoanProcessProgressBar,
  HomeListHeader,
  HomeScreenHeader,
  HomeSelector,
  KnowledgeBlogCard,
  NewsUpdateCard,
  ShareWithYourFriends,
} from '../../components';
import {color, style} from '../../utility';
import axios from 'axios';
import {
  BASIC_URL,
  basicAuthHeader,
  basicAuthTokenHeader,
} from '../../libs/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppStateContext} from '../../providers/AuthContextProvider';

const bankDetailsData = [
  {
    id: 1,
    bankImage: image.hdfcLogo,
    interestRate: '9.95%',
    processingFees: '2.5% + GST',
    tenure: '6 - 18 months',
  },
  {
    id: 2,
    bankImage: image.hdfcLogo,
    interestRate: '9.95%',
    processingFees: '2.5% + GST',
    tenure: '6 - 18 months',
  },
  {
    id: 3,
    bankImage: image.hdfcLogo,
    interestRate: '9.95%',
    processingFees: '2.5% + GST',
    tenure: '6 - 18 months',
  },
];

// MAIN: HomeScreen
const HomeScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [homeSelected, setHomeSelected] = useState(null);
  const [userData, setUserData] = useState();
  const [proposals, setProposals] = useState();
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const progressBarData = [
    {
      id: 1,
      imageUri: image.checkEligibilityIcon,
      label: textStorage['HomeScreen.check_eligibility'],
      isCompleted: true,
    },
    {
      id: 2,
      imageUri: image.setLoanAmountIcon,
      label: textStorage['HomeScreen.set_loan_ammount'],
      isCompleted: true,
    },
    {
      id: 3,
      imageUri: image.uploadDocumentIcon,
      label: textStorage['HomeScreen.upload_document'],
      isCompleted: false,
    },
    {
      id: 4,
      imageUri: image.checkStatusIcon,
      label: textStorage['HomeScreen.check_status'],
      isCompleted: false,
    },
  ];

  const homeSelectorData = [
    {
      id: 1,
      label: textStorage['HomeScreen.new_arrivals'],
    },
    {
      id: 2,
      label: textStorage['HomeScreen.new_arrivals'],
    },
    {
      id: 3,
      label: textStorage['HomeScreen.state_guaranteed'],
    },
  ];

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
      console.log(`getUserData Data ===>`, res?.data?.data?.details);
    } catch (error) {
      if (error?.response?.data?.message) {
        Alert.alert(error?.response?.data?.message);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        navigation.navigate('LoginScreen');
      }
    }
  };

  // NOTE: Banks proposal for user accont
  const getProposals = async () => {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    try {
      const res = await axios.get(`${BASIC_URL}/customer/newArrivalProposals`, {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      });
      setProposals(res?.data?.data?.list);
      // don't get all data for proposal list from api
      // console.log(`getProposals ===>`, res?.data?.data?.list);
    } catch (error) {
      if (error?.response?.data?.message) {
        Alert.alert(error?.response?.data?.message);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        navigation.navigate('LoginScreen');
      }
    }
  };

  // NOTE: Get news handler
  const getNewsBlogs = async () => {
    const token = await AsyncStorage.getItem('token');
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

    try {
      const res = await axios.get(`${BASIC_URL}/customer/newsList`, {
        headers: basicAuthTokenHeader(token, selectedLanguage),
      });
      setNews(res?.data?.data?.list);
      // don't get image of news blogs
      // console.log(`getNewsBlogs data ===>`, res?.data?.data?.list);
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
      const res = await axios.get(`${BASIC_URL}/customer/knowledgeBlogList`, {
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

  const drawerOpenOnPress = () => {
    console.log('click');
    navigation.dispatch(DrawerActions.openDrawer());
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  useEffect(async () => {
    await AsyncStorage.setItem('isDashbaord', 'true');
    await AsyncStorage.setItem('firstTime', 'false');
    getUserData();
    getProposals();
    getNewsBlogs();
    getKnowledgeBlogs();
  }, []);

  return (
    <ScrollView style={styles.containerStyle}>
      <HomeScreenHeader
        notificationOnPress={() =>
          navigation.navigate('NotificationTopTabNavigator')
        }
        draweropenOnPress={drawerOpenOnPress}
        userName={userData?.first_name}
        textStorage={textStorage}
      />
      <View style={styles.baseContainerStyle}>
        <EasyLoanProcessProgressBar
          data={progressBarData}
          textStorage={textStorage}
        />
        {/* NOTE: Get experian and CIBIL Score data from userData state */}
        <View style={[style.commonRowStyleWithSpaceBetween, {marginTop: 30}]}>
          <View style={styles.subContainerStyle}>
            <CibilScoreCard
              imageUri={image.experianImage}
              backgroundColor={color.snowyMint}
              textColor={color.japaneseLaurel}
              textStorage={textStorage}
            />
          </View>
          <View style={styles.subContainerStyle}>
            <CibilScoreCard
              imageUri={image.cibilImage}
              backgroundColor={'rgba(255, 237, 140, 0.19)'}
              textColor={color.pizazz}
              cibilScore={userData?.cibil_score}
              textStorage={textStorage}
            />
          </View>
        </View>
        <CheckCibilCard textStorage={textStorage} />
        {/* NOTE: Get api data from proposal state */}
        <View style={styles.homeSelectorBankCardContainerStyle}>
          <FlatList
            data={homeSelectorData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View>
                  <HomeSelector
                    label={item.label}
                    onPress={() => setHomeSelected(item.id)}
                    selected={item.id === homeSelected ? true : false}
                  />
                </View>
              );
            }}
          />
          <FlatList
            data={bankDetailsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View>
                  <BankDetailsCard
                    imageUri={item.bankImage}
                    interestRate={item.interestRate}
                    processingFees={item.processingFees}
                    tenure={item.tenure}
                  />
                  {/* <BankDetailsCard
                    imageUri={item.bankImage}
                    interestRate={item.interest}
                    processingFees={item.proposal_amount}
                    tenure={item.tenure}
                    lenderName={item.lender_name}
                  /> */}
                </View>
              );
            }}
          />
        </View>
        {/* NOTE: Api already integrade for getting news */}
        <HomeListHeader
          title={textStorage['HomeScreen.news']}
          subtitle={textStorage['HomeScreen.update']}
          Viewall={textStorage['HomeScreen.view_all']}
          viewAllClick={() => {
            navigation.navigate('ViewAllScreen');
          }}
        />
        <FlatList
          data={news}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View>
                <NewsUpdateCard
                  title={item.title}
                  description={item.description}
                  id={item.id}
                />
              </View>
            );
          }}
        />
        {/* NOTE: Api already integrade for getting blogs */}
        <HomeListHeader
          viewAllClick={() => {
            navigation.navigate('ViewAllScreen');
          }}
          title={textStorage['HomeScreen.knowledge']}
          subtitle={textStorage['HomeScreen.blog']}
          Viewall={textStorage['HomeScreen.view_all']}
        />
        <FlatList
          data={blogs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
                <KnowledgeBlogCard
                  title={item.title}
                  description={item.description}
                  id={item.id}
                />
              </View>
            );
          }}
        />
        <ShareWithYourFriends textStorage={textStorage} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  baseContainerStyle: {
    paddingHorizontal: 20,
  },
  subContainerStyle: {
    width: '48%',
  },
  homeSelectorBankCardContainerStyle: {
    backgroundColor: color.wildSand,
    marginHorizontal: -20,
    marginVertical: 30,
    padding: 25,
  },
});

export {HomeScreen};
