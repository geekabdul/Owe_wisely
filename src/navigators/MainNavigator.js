import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import {
  BasicDetailsScreen1,
  BasicDetailsScreen2,
  PersonalInformationProfileScreen,
  SplashScreen,
  BasicProfessionalDetailScreen,
  BasicLoanDetailScreen,
  PersonalInformationScreen,
  RepaymentScheduleScreen,
} from '../Screens';
import NotificationTopTabNavigator from './NotificationTopTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DrawerNavigator from './DrawerNavigator';
// import DrawerNavigator from './DrawerNavigator';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  // const [token, settoken] = useState('Loading');
  // const getData = async () => {
  //   const authToken = await AsyncStorage.getItem('token');
  //   settoken(authToken);
  // };

  // console.log('tokentoken', token);

  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    // <>
    //   {token !== 'Loading' ? (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name={'SplashScreen'} component={SplashScreen} />
      <MainStack.Screen name={'AuthNavigator'} component={AuthNavigator} />
      {/* <MainStack.Screen
        name={'BottomTabNavigator'}
        component={BottomTabNavigator}
      /> */}
      {/* <MainStack.Screen
        name={'DrawerNavigator'}
        component={DrawerNavigator}
      /> */}
      <MainStack.Screen
        name={'BasicDetailsScreen1'}
        component={BasicDetailsScreen1}
      />
      <MainStack.Screen
        name={'BasicDetailsScreen2'}
        component={BasicDetailsScreen2}
      />
      <MainStack.Screen
        name={'PersonalInformationScreen'}
        component={PersonalInformationScreen}
      />
      <MainStack.Screen
        name={'RepaymentScheduleScreen'}
        component={RepaymentScheduleScreen}
      />
      <MainStack.Screen
        name={'BasicProfessionalDetailScreen'}
        component={BasicProfessionalDetailScreen}
      />
      <MainStack.Screen
        name={'BasicLoanDetailScreen'}
        component={BasicLoanDetailScreen}
      />
      <MainStack.Screen
        name={'PersonalInformationProfileScreen'}
        component={PersonalInformationProfileScreen}
      />
      <MainStack.Screen
        name={'NotificationTopTabNavigator'}
        component={NotificationTopTabNavigator}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
