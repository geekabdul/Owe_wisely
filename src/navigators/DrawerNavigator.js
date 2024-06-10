import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import {AboutScreen} from '../Screens/AuthScreens/AboutScreen';
import { PersonalInformationScreen } from '../Screens/ProfileScreens/PersonalInformationScreen';
import { BasicDetailsScreen1, BasicDetailsScreen2,BasicProfessionalDetailScreen, HomeScreen } from '../Screens';
import BottomTabNavigator from './BottomTabNavigator';
import { HelpScreen } from '../Screens/DrawerScreens/HelpScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
      drawerStyle: {
        backgroundColor: "white",
        width: "80%",
      },
    }}
    initialRouteName={BottomTabNavigator}
  >
    <Drawer.Screen
      name={"HomeScreen"}
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name={"BasicProfessionalDetailScreen"}
      component={BasicProfessionalDetailScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name={"AboutScreen"}
      component={AboutScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name={"HelpScreen"}
      component={HelpScreen}
      options={{ headerShown: false }}
    />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
