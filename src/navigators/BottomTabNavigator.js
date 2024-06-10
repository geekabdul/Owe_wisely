import React, {useContext} from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ApplicationsScreen,
  HomeScreen,
  PersonalInformationProfileScreen,
  ProfileScreen,
  ProposalScreen,
} from '../Screens';
import {color} from '../utility';
import {image} from '../assets';
import {BottomTabItem} from '../components';
import {AppStateContext} from '../providers/AuthContextProvider';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {textStorage} = useContext(AppStateContext);

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        tabBarIcon: ({focused, size}) => {
          let imagePath;

          if (route.name === 'HomeScreen') {
            imagePath = focused
              ? image.homeSelectedIcon
              : image.homeUnselectedIcon;
          } else if (route.name === 'ProposalScreen') {
            imagePath = focused
              ? image.proposalSelectedIcon
              : image.proposalsUnselectedIcon;
          } else if (route.name === 'ApplicationsScreen') {
            imagePath = focused
              ? image.applicationSelectedIcon
              : image.apllicationsUnselectedIcon;
          } else {
            imagePath = focused
              ? image.profileSelectedIcon
              : image.profileUnselectedIcon;
          }

          return route.name === 'HomeScreen' ? (
            <BottomTabItem
              source={imagePath}
              label={textStorage['BottomTabNavigator.home']}
              focused={focused}
            />
          ) : route.name === 'ProposalScreen' ? (
            <BottomTabItem
              source={imagePath}
              label={textStorage['BottomTabNavigator.proposals']}
              focused={focused}
            />
          ) : route.name === 'ApplicationsScreen' ? (
            <BottomTabItem
              source={imagePath}
              label={textStorage['BottomTabNavigator.applications']}
              focused={focused}
            />
          ) : (
            <BottomTabItem
              source={imagePath}
              label={textStorage['BottomTabNavigator.profile']}
              focused={focused}
            />
          );
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: color.denim,
        tabBarInactiveTintColor: color.waterloo,
      })}>
      <Tab.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tab.Screen name={'ProposalScreen'} component={ProposalScreen} />
      <Tab.Screen name={'ApplicationsScreen'} component={ApplicationsScreen} />
      <Tab.Screen
        name={'ProfileScreen'}
        component={PersonalInformationProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 65,
    backgroundColor: color.grenadier,
  },
});

export default BottomTabNavigator;
