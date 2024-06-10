import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {BasicDetailsProgressComponent, Button, Header} from '../../components';
import {color, dimension, font, style} from '../../utility';
import {AppStateContext} from '../../providers/AuthContextProvider';

const LoanConfirmationScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);

  return (
    <View style={styles.containerStyle}>
      <Header
        noBack={true}
        iconUri={image.homeSelectedIcon}
        label={textStorage['LoanConfirmationScreen.confirmation']}
      />
      <BasicDetailsProgressComponent id={5} textStorage={textStorage} />
      <View style={styles.contentStyle}>
        <View style={styles.imageBoxStyle}>
          <Image
            resizeMode={'contain'}
            style={style.commonImageStyle}
            source={image.loanConfirmationImage}
          />
        </View>
        <Text style={styles.congratulationsMessageTextStyle}>
          {textStorage['LoanConfirmationScreen.congratulations']}{' '}
          <Text style={styles.nameTextStyle}>
            {textStorage['LoanConfirmationScreen.ankur']}
          </Text>
        </Text>
        <Text style={styles.thankyouMessageTextStyle}>
          {textStorage['LoanConfirmationScreen.thank_you_for_choosing_us']}
        </Text>
        <Text style={styles.messageTextStyle}>
          {
            textStorage[
              'LoanConfirmationScreen.we_have_initiated_the_disbursement_of'
            ]
          }{' '}
          {'\n'}{' '}
          <Text style={styles.messageBoldTextStyle}>
            {textStorage['LoanConfirmationScreen.rs']} 70,000.
          </Text>{' '}
          {textStorage['LoanConfirmationScreen.your_amount_will_reflect_in']}{' '}
          {'\n'} {textStorage['LoanConfirmationScreen.the_next']}{' '}
          <Text style={styles.messageBoldTextStyle}>
            {textStorage['LoanConfirmationScreen.24_hours']}
          </Text>
        </Text>
      </View>
      <Button
        style={styles.buttonStyle}
        label={textStorage['LoanConfirmationScreen.continue']}
        onPress={() => navigation.navigate('BottomTabNavigator')}
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
  thankyouMessageTextStyle: {
    fontSize: 16,
    fontFamily: font.soraBold,
    color: color.black,
    alignSelf: 'center',
    marginTop: 20,
  },
  loanEligibilityTextStyle: {
    fontSize: 16,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'center',
    marginTop: 20,
  },
  messageTextStyle: {
    fontSize: 12,
    fontFamily: font.soraRegular,
    color: color.black,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 5,
  },
  messageBoldTextStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
    color: color.black,
  },
  buttonStyle: {
    marginHorizontal: 20,
  },
});

export {LoanConfirmationScreen};
