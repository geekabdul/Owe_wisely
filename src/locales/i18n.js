import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_LANGUAGE_KEY = 'settings.lang';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  // compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: require('./en.json'),
    },
    hn: {
      translation: require('./hn.json'),
    },
    tl: {
      translation: require('./tl.json'),
    },
    tm: {
      translation: require('./tm.json'),
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const updateLanguage = async language => {
  console.log('language : ', language);

  i18n.changeLanguage(language);
  await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
};

// Detect and set the user's language on app start
(async () => {
  let storedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
  if (!storedLanguage) {
    // Use a default language if not found in AsyncStorage
    storedLanguage = 'en';
  }
  updateLanguage(storedLanguage);
})();

export {i18n, updateLanguage};
