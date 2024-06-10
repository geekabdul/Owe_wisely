import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AccountDetailsConfirmationScreen,
  AccountDetailsScreen,
  BasicDetailsScreen1,
  CheckEligibilityScreen,
  ComparisonOfOffersScreen,
  EligibilityConfirmationScreen,
  IntroductionScreen,
  LoanConfirmationScreen,
  LoginScreen,
  OTPScreen,
  PANCardDetailsScreen,
  PermissionListingScreen,
  PersonalInformationScreen,
  ProfessionalInformationScreen,
  ProposalsScreen,
  SelectBankScreen,
  SelectLanguageScreen,
  UseDifferentPANScreen,
  CibilscoresScreen,
  AddPANCardDetailsScreen,
  AboutScreen,
  BasicDetailsScreen2,
  LoanApplicationListScreen,
  VoterCardScreen,
  DrivingLicenseScreen,
  BasicProfessionalDetailScreen,
  BasicLoanDetailScreen,
} from '../Screens';
import DontHavePANTopTabNavigator from './DontHavePANTopTabNavigator';
import LoanInformationTopTabNavigator from './LoanInformationTopTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from './DrawerNavigator';
import {NewBlogCardScreen} from '../Screens/HomeTabScreen/NewBlogCardScreen';
import {ViewAllScreen} from '../Screens/HomeTabScreen/ViewAllScreen';
import {AboutLoginScreen} from '../Screens/AuthScreens/AboutLoginScreen';
import {NotEligibilityScreen} from '../Screens/AuthScreens/NotEligibilityScreen';
import {ReferenceScreen} from '../Screens/LoanApplicationScreens/ReferenceScreen';
import {ContactListScreen} from '../Screens/LoanApplicationScreens/ContactListScreen';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [token, settoken] = useState('Loading');
  const [isDashbaord, setisDashbaord] = useState('Loading');
  const [firstTime, setfirstTime] = useState('Loading');
  const [userData, setUserData] = useState('Loading');
  const [navigationRoute, setNavigationRoute] = useState('Loading');
  const getData = async () => {
    const authToken = await AsyncStorage.getItem('token');
    let firstTime = await AsyncStorage.getItem('firstTime');
    let isDashbaord = await AsyncStorage.getItem('isDashbaord');
    let user = await AsyncStorage.getItem('user');
    let navigationCheck = await AsyncStorage.getItem('navigationCheck');
    setNavigationRoute(JSON.parse(navigationCheck));

    setfirstTime(firstTime);
    setisDashbaord(isDashbaord);
    setUserData(user);
    settoken(authToken);
  };

  // console.log(userData, 'userDatassssss');
  console.log(navigationRoute?.data?.userDetails, 'test>>>>>>>>>>>');

  useEffect(() => {
    getData();
  }, [token]);

  const initialRoute = () => {
    if (isDashbaord) {
      return 'DrawerNavigator';
    } else if (token) {
      // return 'BasicDetailsScreen1';
      console.log(navigationRoute?.screen == 'BasicLoanDetailScreen', 'inner');
      return navigationRoute?.screen == 'BasicDetailsScreen2'
        ? 'BasicDetailsScreen2'
        : navigationRoute?.screen == 'BasicProfessionalDetailScreen'
        ? 'BasicProfessionalDetailScreen'
        : navigationRoute?.screen == 'BasicLoanDetailScreen'
        ? 'BasicLoanDetailScreen'
        : navigationRoute?.screen == 'UseDifferentPANScreen'
        ? 'UseDifferentPANScreen'
        : navigationRoute?.screen == 'PANCardDetailsScreen'
        ? 'PANCardDetailsScreen'
        : navigationRoute?.screen == 'CheckEligibilityScreen'
        ? 'CheckEligibilityScreen'
        : 'BasicDetailsScreen1';
    } else if (firstTime) {
      return 'LoginScreen';
    } else {
      return 'SelectLanguageScreen';
    }
  };

  return (
    <>
      {token !== 'Loading' ? (
        <AuthStack.Navigator
          // initialRouteName={
          //   isDashbaord
          //     ? 'DrawerNavigator'
          //     : firstTime
          //     ? 'LoginScreen'
          //     : 'AuthNavigator'
          // }
          initialRouteName={initialRoute()}
          screenOptions={{headerShown: false}}>
          <AuthStack.Screen
            name={'SelectLanguageScreen'}
            component={SelectLanguageScreen}
          />
          <AuthStack.Screen
            name={'BasicDetailsScreen1'}
            component={BasicDetailsScreen1}
          />
          <AuthStack.Screen
            name={'BasicDetailsScreen2'}
            component={BasicDetailsScreen2}
          />
          <AuthStack.Screen
            name={'IntroductionScreen'}
            component={IntroductionScreen}
          />
          <AuthStack.Screen
            name={'AboutLoginScreen'}
            component={AboutLoginScreen}
          />
          <AuthStack.Screen
            name={'PermissionListingScreen'}
            component={PermissionListingScreen}
          />
          <AuthStack.Screen name={'LoginScreen'} component={LoginScreen} />
          <AuthStack.Screen name={'OTPScreen'} component={OTPScreen} />
          <AuthStack.Screen
            name={'PANCardDetailsScreen'}
            component={PANCardDetailsScreen}
            initialParams={{
              userDetails: navigationRoute?.data?.userDetails,
              loanAmount: navigationRoute?.data?.loanAmount,
              loanPurpose: navigationRoute?.data?.loanPurpose,
              incomeM: navigationRoute?.data?.incomeM,
            }}
          />
          <AuthStack.Screen
            name={'CibilscoresScreen'}
            component={CibilscoresScreen}
          />
          <AuthStack.Screen
            name={'NotEligibilityScreen'}
            component={NotEligibilityScreen}
          />
          <AuthStack.Screen
            name={'CheckEligibilityScreen'}
            component={CheckEligibilityScreen}
          />
          <AuthStack.Screen
            name={'EligibilityConfirmationScreen'}
            component={EligibilityConfirmationScreen}
          />
          <AuthStack.Screen
            name={'AddPANCardDetailsScreen'}
            component={AddPANCardDetailsScreen}
          />

          <AuthStack.Screen
            name={'UseDifferentPANScreen'}
            component={UseDifferentPANScreen}
          />
          <AuthStack.Screen
            name={'LoanApplicationListScreen'}
            component={LoanApplicationListScreen}
          />
          <AuthStack.Screen name={'ViewAllScreen'} component={ViewAllScreen} />
          <AuthStack.Screen
            name={'ContactListScreen'}
            component={ContactListScreen}
          />
          <AuthStack.Screen
            name={'DontHavePANTopTabNavigator'}
            component={DontHavePANTopTabNavigator}
          />
          <AuthStack.Screen
            name={'ReferenceScreen'}
            component={ReferenceScreen}
          />
          <AuthStack.Screen
            name={'ProposalsScreen'}
            component={ProposalsScreen}
          />
          <AuthStack.Screen
            name={'ComparisonOfOffersScreen'}
            component={ComparisonOfOffersScreen}
          />
          <AuthStack.Screen
            name={'LoanInformationTopTabNavigator'}
            component={LoanInformationTopTabNavigator}
          />
          <AuthStack.Screen
            name={'PersonalInformationScreen'}
            component={PersonalInformationScreen}
          />
          <AuthStack.Screen
            name={'DrivingLicenseScreen'}
            component={DrivingLicenseScreen}
          />
          <AuthStack.Screen
            name={'AboutScreen'}
            component={AboutScreen}
            options={{headerShown: false}}
          />
          <AuthStack.Screen
            name={'ProfessionalInformationScreen'}
            component={ProfessionalInformationScreen}
          />
          <AuthStack.Screen
            name={'AccountDetailsScreen'}
            component={AccountDetailsScreen}
          />
          <AuthStack.Screen
            name={'SelectBankScreen'}
            component={SelectBankScreen}
          />
          <AuthStack.Screen
            name={'AccountDetailsConfirmationScreen'}
            component={AccountDetailsConfirmationScreen}
          />
          <AuthStack.Screen
            name={'LoanConfirmationScreen'}
            component={LoanConfirmationScreen}
          />
          <AuthStack.Screen
            name={'NewBlogCardScreen'}
            component={NewBlogCardScreen}
          />
          <AuthStack.Screen
            name={'DrawerNavigator'}
            component={DrawerNavigator}
          />
          <AuthStack.Screen
            name={'BasicProfessionalDetailScreen'}
            component={BasicProfessionalDetailScreen}
            // initialParams={navigationRoute && navigationRoute.data}
          />
          <AuthStack.Screen
            name={'BasicLoanDetailScreen'}
            component={BasicLoanDetailScreen}
          />
        </AuthStack.Navigator>
      ) : null}
    </>
  );
};

export default AuthNavigator;
