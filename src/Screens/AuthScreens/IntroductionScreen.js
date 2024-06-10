import React, {useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Header, IntroductionScreenBottomCard} from '../../components';
import {image} from '../../assets';
import {color, dimension, font, style} from '../../utility';
import {useTranslation} from 'react-i18next';
import {AppStateContext} from '../../providers/AuthContextProvider';

const IntroductionScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const {t} = useTranslation();
  return (
    <View style={styles.containerStyle}>
      <Header
        // iconUri={""}
        iconUri={image.homeSelectedIcon}
        //   skipOnPress={() => navigation.navigate('PermissionListingScreen')}
        backOnPress={() => navigation.goBack()}
      />

      <View style={styles.contentContainerStyle}>
        <View>
          <View style={styles.imageBoxStyle}>
            <Image
              resizeMode={'contain'}
              style={style.commonImageStyle}
              source={image.introductionScreenImage}
            />
          </View>
          <Text style={styles.mainTextStyle}>
            {textStorage['IntroductionScreen.best']}{' '}
            <Text style={styles.mainTextStyleBold}>
              {textStorage['IntroductionScreen.guide_to_compare']}{' '}
            </Text>
            {'\n'}
            {textStorage['IntroductionScreen.choose_the_best']}
            <Text style={styles.mainTextStyleColor}>
              {'\n'}
              {textStorage['IntroductionScreen.personal']}
              {textStorage['IntroductionScreen.loan']}
            </Text>{' '}
            {textStorage['IntroductionScreen.offers']}
          </Text>
        </View>
        <View style={styles.borderStyle} />
      </View>
      <View
        style={[
          // styles.bottomCardContainerStyle,
          style.commonRowStyleWithSpaceBetween,
        ]}>
        <IntroductionScreenBottomCard
          imageUri={image.instantApproval}
          label={textStorage['IntroductionScreen.instant_approval']}
        />
        <IntroductionScreenBottomCard
          imageUri={image.easyApplication}
          label={textStorage['IntroductionScreen.quick_easy_application']}
        />
        <IntroductionScreenBottomCard
          imageUri={image.privacyTrust}
          label={textStorage['IntroductionScreen.privacy_trust']}
        />
      </View>
      <Button
        isButtonEnabled={false}
        style={styles.buttonStyle}
        label={t('continue')}
        onPress={() => navigation.navigate('PermissionListingScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
    paddingBottom: 30,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  imageBoxStyle: {
    width: dimension.width * 0.7,
    height: dimension.height * 0.3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mainTextStyle: {
    fontSize: 18,
    fontFamily: font.soraRegular,
    color: color.nightRider,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  mainTextStyleBold: {
    fontFamily: font.soraBold,
  },
  mainTextStyleColor: {
    fontFamily: font.soraBold,
    color: color.vermilion,
  },
  borderStyle: {
    borderBottomWidth: 1,
    width: '60%',
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderColor: color.alto,
  },
  bottomCardContainerStyle: {
    paddingHorizontal: 20,
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 30,
  },
});

export {IntroductionScreen};
