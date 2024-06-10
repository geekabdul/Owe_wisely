import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EnLocal from '../locales/en.json';

export const AppStateContext = React.createContext();

const AppStateProvider = props => {
  const [contextValue, setContextValue] = useState();

  useEffect(() => {
    console.log('enter');
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('languageJson');
        if (data) {
          setContextValue(JSON.parse(data));
        } else {
          setContextValue(EnLocal);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <AppStateContext.Provider
      value={{textStorage: contextValue, setContextValue}}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
