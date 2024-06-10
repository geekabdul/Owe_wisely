import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigators/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import AppStateProvider from "./providers/AuthContextProvider"

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);



  return (
    <NavigationContainer>
      <AppStateProvider>
        <MainNavigator />
      </AppStateProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

export default App;
