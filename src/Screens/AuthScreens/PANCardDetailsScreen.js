import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {image} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BasicDetailsProgressComponent,
  Button,
  CibilScoreAuthorizeCheckbox,
  Header,
  PANCardContainer,
} from '../../components';
import {color, font} from '../../utility';
import {AppStateContext} from '../../providers/AuthContextProvider';
import FAQModal from '../../components/FAQComponent/FAQModal';
import {useFocusEffect} from '@react-navigation/native';

const PANCardDetailsScreen = ({navigation, route}) => {
  const {userDetails} = route?.params;

  const {textStorage} = useContext(AppStateContext);
  const [authorizeCibilScore, setAuthorizeCibilScore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isButton = !authorizeCibilScore;
  const [validationerror, SetValidationerror] = useState({});
  const [issubmit, setIssubmit] = useState(false);
  const handleSubmit = async () => {
    await AsyncStorage.setItem(
      'navigationCheck',
      JSON.stringify({
        screen: 'CheckEligibilityScreen',
        data: {
          userDetails,
          loanAmount: route.params?.loanAmount,
          loanPurpose: route.params?.loanPurpose,
          incomeM: route.params.incomeM,
        },
      }),
    );
    navigation.navigate('CheckEligibilityScreen', {
      userDetails,
      loanAmount: route.params?.loanAmount,
      loanPurpose: route.params?.loanPurpose,
      incomeM: route.params.incomeM,
    });
  };
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));

  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        navigation.navigate('UseDifferentPANScreen', {
          loanAmount: route.params?.loanAmount,
          loanPurpose: route.params?.loanPurpose,
          incomeM: route.params.incomeM,
          userDetails,
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
        onPress={() => {
          setShowModal(true);
        }}
        backOnPress={() =>
          navigation.navigate('UseDifferentPANScreen', {
            loanAmount: route.params?.loanAmount,
            loanPurpose: route.params?.loanPurpose,
            incomeM: route.params.incomeM,
            userDetails,
          })
        }
        iconUri={image.homeSelectedIcon}
        label={textStorage['PandetailsScreen.pan_card_details']}
      />
      <BasicDetailsProgressComponent
        id={2}
        isActive={3}
        textStorage={textStorage}
      />
      {showModal ? (
        <FAQModal
          modalVisible={showModal}
          onPressclose={() => {
            setShowModal(false);
          }}
          categoryName={'basic_detail'}
        />
      ) : null}

      <View style={styles.baseContainerStyle}>
        <PANCardContainer
          panData={userDetails?.pan_card_details}
          userDetails={userDetails}
        />
        <CibilScoreAuthorizeCheckbox
          isChecked={authorizeCibilScore}
          onPress={() => setAuthorizeCibilScore(state => !state)}
          textStorage={textStorage}
        />
        <Button
          label={textStorage['PandetailsScreen.i_agree']}
          isButtonEnabled={isButton}
          onPress={() => handleSubmit()}
        />
        {/* <Text style={styles.labelTextStyle}>
          {textStorage['PandetailsScreen.use_a_different_pan']}{' '}
          <Text
            style={styles.labelBoldTextStyle}
            onPress={() =>
              navigation.navigate('AddPANCardDetailsScreen', {
                updatePANCard: true,
              })
            }>
            {' '}
            {textStorage['PandetailsScreen.click_here']}{' '}
          </Text>
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  baseContainerStyle: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-around',
  },
  labelTextStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
    textAlign: 'center',
  },
  labelBoldTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.grenadier,
  },
});

export {PANCardDetailsScreen};
