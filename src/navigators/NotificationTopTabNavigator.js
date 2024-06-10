import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DrivingLicenseScreen, VoterCardScreen} from '../Screens';
import {
  DontHavePANCustomTopTabBar,
  FeedsDetailedCustomTopTabBar,
} from '../components';
import AllNotificationsScreen from '../Screens/NotificationScreens/AllNotificationsScreen';
import OffersNotificationScreen from '../Screens/NotificationScreens/OffersNotificationScreen';
import TransactionNotificationScreen from '../Screens/NotificationScreens/TransactionNotificationScreen';

const Tab = createMaterialTopTabNavigator();

const NotificationTopTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <DontHavePANCustomTopTabBar headerLabel={'Notification'} {...props} />
      )}>
      <Tab.Screen
        options={{tabBarLabel: 'All'}}
        name={'AllNotificationsScreen'}
        component={AllNotificationsScreen}
      />
      <Tab.Screen
        options={{tabBarLabel: 'Offers'}}
        name={'OffersNotificationScreen'}
        component={OffersNotificationScreen}
      />
      <Tab.Screen
        options={{tabBarLabel: 'Transaction'}}
        name={'TransactionNotificationScreen'}
        component={TransactionNotificationScreen}
      />
    </Tab.Navigator>
  );
};

export default NotificationTopTabNavigator;
