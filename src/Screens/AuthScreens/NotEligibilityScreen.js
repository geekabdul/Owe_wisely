import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {image} from '../../assets';
import {BasicDetailsProgressComponent, Button, Header} from '../../components';
import {color, dimension, font, style} from '../../utility';
import {AppStateContext} from '../../providers/AuthContextProvider';
import { responsiveScreenWidth } from '../../utility/Size';

const NotEligibilityScreen = ({navigation,route}) => {
  const {textStorage} = useContext(AppStateContext);
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));

  return (
    <View style={styles.containerStyle}>
      {/* <Header
        noBack={true}
        iconUri={image.homeSelectedIcon}
        label={textStorage['EligibilityConfirmationScreen.confirmation']}
      /> */}
      {/* <BasicDetailsProgressComponent id={5} isActive={4} textStorage={textStorage} /> */}
      <View style={styles.contentStyle}>
        <View style={styles.imageBoxStyle}>
          <Image
            resizeMode={'contain'}
            style={style.commonImageStyle}
            source={require('../../assets/BottomTabNavigatorAssets/noDataProposal.png')}
          />
        </View>
        <Text style={styles.congratulationsMessageTextStyle}>
        {"Sorry!!!"}
        <Text style={styles.nameTextStyle}>
            {route.params.name}{' '}
          </Text>
        </Text>
        <Text style={styles.loanEligibilityTextStyle}>
         {"You are not eligible not any offer."}
        </Text>
      </View>
      <Button
        style={styles.buttonStyle}
        label={"Go Back to Home"}
        onPress={() => navigation.navigate('DrawerNavigator')}
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
    marginTop:responsiveScreenWidth(40)
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

export {NotEligibilityScreen};
