import React, {useEffect, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DrivingLicenseScreen, VoterCardScreen} from '../Screens';
import {
  DontHavePANCustomTopTabBar,
  FeedsDetailedCustomTopTabBar,
} from '../components';
import {AppStateContext} from '../providers/AuthContextProvider';
import {BackHandler} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const DontHavePANTopTabNavigator = props => {
  const {textStorage} = useContext(AppStateContext);

  useEffect(() => {
    const backAction = () => {
      console.log('backkkkkkkkkk');
      props.navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      tabBar={props => (
        <DontHavePANCustomTopTabBar
          headerLabel={textStorage['DontHavePANTopTabNavigator.don’t_have_pan']}
          {...props}
        />
      )}>
      <Tab.Screen
        options={{
          tabBarLabel: textStorage['DontHavePANTopTabNavigator.voter_card'],
        }}
        name={'VoterCardScreen'}
        component={VoterCardScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel:
            textStorage['DontHavePANTopTabNavigator.driving_license'],
        }}
        name={'DrivingLicenseScreen'}
        component={DrivingLicenseScreen}
      />
    </Tab.Navigator>
  );
};

export default DontHavePANTopTabNavigator;
