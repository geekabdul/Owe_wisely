import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, BackHandler} from 'react-native';
import {image} from '../../assets';
import {BasicDetailsProgressComponent, Button, Header} from '../../components';
import {color, dimension, font, style} from '../../utility';
import {AppStateContext} from '../../providers/AuthContextProvider';
import { useFocusEffect } from '@react-navigation/native';

const EligibilityConfirmationScreen = ({navigation,route}) => {
  const {textStorage} = useContext(AppStateContext);
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));

  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        navigation.navigate('PANCardDetailsScreen', {
          loanAmount: route.params?.loanAmount,
          loanPurpose: route.params?.loanPurpose,
          incomeM: route.params.incomeM,
          userDetails : route.params.userDetails
        });
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );


  return (
    <View style={styles.containerStyle}>
      <Header
        noBack={true}
        iconUri={image.homeSelectedIcon}
        label={textStorage['EligibilityConfirmationScreen.confirmation']}
      />
      <BasicDetailsProgressComponent id={5} isActive={4} textStorage={textStorage} />
      <View style={styles.contentStyle}>
        <View style={styles.imageBoxStyle}>
          <Image
            resizeMode={'contain'}
            style={style.commonImageStyle}
            source={image.eligibilityConfirmationImage}
          />
        </View>
        <Text style={styles.congratulationsMessageTextStyle}>
          {textStorage['EligibilityConfirmationScreen.congratulations']}{' '}
          <Text style={styles.nameTextStyle}>
            {route.params.name}{' '}
          </Text>
        </Text>
        <Text style={styles.loanEligibilityTextStyle}>
          {
            textStorage[
              'EligibilityConfirmationScreen.you_are_eligible_for_a_loan'
            ]
          }{' '}
          {'\n'}
          {textStorage['EligibilityConfirmationScreen.upto']}{' '}
          <Text style={styles.loanEligibilityTextStyles}>
            {textStorage['EligibilityConfirmationScreen.5_lacs']}{' '}
          </Text>
        </Text>
      </View>
      <Button
        style={styles.buttonStyle}
        label={textStorage['EligibilityConfirmationScreen.view_offers']}
        onPress={() => navigation.navigate('ProposalsScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
    paddingBottom: 20,
  },
  contentStyle: {
    flex: 1,
    marginTop: 50,
  },
  imageBoxStyle: {
    height: dimension.height * 0.2,
    width: dimension.width * 0.5,
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratulationsMessageTextStyle: {
    fontSize: 20,
    fontFamily: font.soraBold,
    color: color.grenadier,
    alignSelf: 'center',
    marginTop: 30,
  },
  nameTextStyle: {
    color: color.black,
  },
  loanEligibilityTextStyle: {
    fontSize: 16,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'center',
    marginTop: 20,
  },
  loanEligibilityTextStyles: {
    fontSize: 16,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  buttonStyle: {
    marginHorizontal: 20,
  },
});

export {EligibilityConfirmationScreen};
