import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Button, Header, SelectLanguageCard} from '../../components';
import {color} from '../../utility';
import {image} from '../../assets';
import {updateLanguage} from '../../locales/i18n';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';
import en from '../../locales/en.json';
import hn from '../../locales/hn.json';
import tl from '../../locales/tl.json';
import tm from '../../locales/tm.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppStateContext} from '../../providers/AuthContextProvider';
import EnLocal from '../../locales/en.json';
import {languageSwitch} from '../../Api/GeneralApi';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';

const data = [
  {
    id: 1,
    name: 'en',
    imageSelected: image.englishWhite,
    imageUnselected: image.englishBlack,
  },
  {
    id: 2,
    name: 'hi',
    imageSelected: image.hindiWhite,
    imageUnselected: image.hindiBlack,
  },
  {
    id: 3,
    name: 'ta',
    imageSelected: image.tamilWhite,
    imageUnselected: image.tamilBlack,
  },
  {
    id: 4,
    name: 'kn',
    imageSelected: image.kannadaWhite,
    imageUnselected: image.kannadaBlack,
  },
];

const Language = {
  en: {
    continue: 'Continue',
    selectLanguage: 'Choose Your Preferred Language',
    Pleaseselect:
      'Please select your preferred language. The chosen language will be applied to all screens and text throughout the app.',
  },
  hi: {
    continue: 'जारी रखना',
    selectLanguage: 'अपनी पसंदीदा भाषा चुनें',
    Pleaseselect:
      'कृपया अपनी पसंदीदा भाषा का चयन करें। चयनित भाषा को एप्लिकेशन के सभी स्क्रीन्स और पाठों पर लागू किया जाएगा।',
  },
  ta: {
    continue: 'தொடரவும்',
    selectLanguage: 'உங்கள் விரும்பிய மொழியைத் தேர்ந்தெடுக்கவும்',
    Pleaseselect:
      'உங்கள் விரும்பிய மொழியைத் தேர்ந்தெடுக்கவும். தேர்ந்தெட்ட மொழி அநேக திரைகளுக்கும் மற்றும் ஆப்பின் எல்லா உரைகளுக்கும் பயன்பாடு செய்யப்படும்',
  },
  kn: {
    continue: 'ಮುಂದುವರಿಸಿ',
    selectLanguage: 'ನಿಮ್ಮ ಇಷ್ಟಭಾಷೆಯನ್ನು ಆರಿಸಿ',
    Pleaseselect:
      'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಷ್ಟಭಾಷೆಯನ್ನು ಆರಿಸಿ. ಆಯ್ಕೆಯಾದ ಭಾಷೆಯನ್ನು ಅನೇಕ ಸ್ಕ್ರೀನ್‌ಗಳಿಗೂ ಮತ್ತು ಅಪ್ಲಿಕೇಷನ್‌ನ ಎಲ್ಲಾ ಪಠ್ಯಗಳಿಗೂ ಅನ್ವಯಿಸಿಕೊಳ್ಳಲಾಗುವುದು',
  },
};

const SelectLanguageScreen = ({navigation}) => {
  // const {t} = useTranslation();
  const {textStorage, setContextValue} = useContext(AppStateContext);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [storedData, setStoredData] = useState(null);
  const [textInSelectedLanguage, setTextInSelectedLanguage] = useState(
    Language.en,
  );

  const changeLanguage = async language => {
    setSelectedLanguage(language);
    updateLanguage(language);
    setTextInSelectedLanguage(Language[language]);
  };

  useEffect(() => {
    changeLanguage('en');
  }, []);

  const isButton = selectedLanguage === null;

  const selectLanguage = async () => {
    // let response = await languageSwitch(
    //   {'Accept-Language': selectedLanguage},
    //   EnLocal,
    // );

    // // console.log('response :>> ', response.data);
    // await AsyncStorage.setItem(
    //   'languageJson',
    //   JSON.stringify(response.data.translation),
    // );
    // await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
    // setContextValue(response.data.translation);

    // navigation.navigate('IntroductionScreen');

    try {
      if (selectedLanguage === 'en') {
        setContextValue(EnLocal);
      } else {
        let response = await languageSwitch(
          {'Accept-Language': selectedLanguage},
          EnLocal,
        );
        await AsyncStorage.setItem(
          'languageJson',
          JSON.stringify(response.data.translation),
        );
        setContextValue(response.data.translation);
      }
      if (global.isLogin === true) {
        global.isLogin = false;
        navigation.navigate('DrawerNavigator');
      } else {
        await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
        navigation.navigate('IntroductionScreen');
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        noBack
        label={textInSelectedLanguage?.selectLanguage}
        iconUri={image.homeSelectedIcon}
        chooseScreen={true}
      />
      <Text style={styles.detailText}>
        {textInSelectedLanguage?.Pleaseselect}
      </Text>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item, index}) => {
          return (
            <View>
              <SelectLanguageCard
                onPress={() => changeLanguage(item.name)}
                selected={item.name === selectedLanguage ? true : false}
                imageSelected={item.imageSelected}
                name={item.name}
                imageUnselected={item.imageUnselected}
              />
            </View>
          );
        }}
      />
      <Button
        isButtonEnabled={isButton}
        style={styles.buttonStyle}
        label={textInSelectedLanguage?.continue}
        onPress={() => selectLanguage()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  detailText: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: responsiveScreenWidth(4),
  },
});

export {SelectLanguageScreen};
