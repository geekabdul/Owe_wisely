import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button, Header, SelectLanguageCard} from '../../components';
import {color} from '../../utility';
import {image} from '../../assets';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';
import { getLoanApplication } from '../../Api/LoanInformationTopTabNavigatorApi';

const LoanApplicationListScreen = ({navigation}) => {
  const {textStorage, setContextValue} = useContext(AppStateContext);


  const cardView = (type, bgColor) => {
    return (
      <View style={styles.shadowBox}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.idTxt}>
            <Text style={[styles.idTxt, {color: color.gray}]}>ID</Text> :
            45565621
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/LoanScreenAssets/ruppeeIcon.png')}
              style={styles.moneyImg}
            />
            <Text style={styles.amntTxt}>70,500</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: color.gray,
            width: '100%',
            alignSelf: 'center',
            marginTop: responsiveScreenWidth(2),
            marginBottom: responsiveScreenWidth(2),
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ImageBackground
            imageStyle={{tintColor: bgColor}}
            resizeMode="contain"
            source={require('../../assets/LoanScreenAssets/status.png')}
            style={styles.statusImg}>
            <Text style={styles.statusTxt}>
              Status :{' '}
              <Text
                style={[
                  styles.statusTxt,
                  {fontWeight: 'bold', color: color.white},
                ]}>
                {type}
              </Text>
            </Text>
          </ImageBackground>
          <Text style={styles.dateTxt}>8th Nov,2022</Text>
        </View>
        <Text style={styles.amntTxt}>Ankur Kumar Mody</Text>
        <Text style={styles.idTxt}>Purpose of loan </Text>
        <Text style={[styles.dateTxt, {alignSelf: 'flex-start'}]}>
          New home construction
        </Text>
        {type==="Applied"?
        <View style={{backgroundColor:"#F4F4F4",width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <Text style={[styles.idTxt,{marginStart:responsiveScreenWidth(2)}]}>
            <Text style={[styles.idTxt, {color: color.gray}]}>Responses</Text> :4
          </Text>
          <Image resizeMode='contain' source={require("../../assets/LoanScreenAssets/nextBtn.png")} style={styles.nextBtn}/>
        </View>:null}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.containerStyle}>
        <Header
          noBack
          label={'Applications List'}
          iconUri={image.homeSelectedIcon}
        />
        <View style={styles.containerStyle}>
          {cardView('Applied', '#F2A80C')}
          {cardView('Completed', '#00B553')}
          {cardView('Pending', '#ED7A53')}
          {cardView('Rejected', '#EE4D5B')}
        </View>
      </View>
    </SafeAreaView>
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
  shadowBox: {
    alignSelf: 'center',
    width: '80%',
    borderRadius: responsiveScreenWidth(2),
    padding: responsiveScreenWidth(3),
    margin: responsiveScreenWidth(3),
    backgroundColor: color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  idTxt: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    fontWeight: '500',
  },
  dateTxt: {
    fontSize: responsiveFontSize(1.6),
    color: color.gray,
    fontWeight: '300',
    alignSelf: 'center',
  },
  amntTxt: {
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontWeight: 'bold',
  },
  statusTxt: {
    fontSize: responsiveFontSize(1.8),
    color: '#FFFFFF90',
    fontWeight: 'bold',
    marginStart: responsiveScreenWidth(2),
  },
  statusImg: {
    height: responsiveScreenWidth(10),
    width: responsiveScreenWidth(40),
    justifyContent: 'center',
  },
  moneyImg: {
    height: responsiveScreenWidth(3),
    width: responsiveScreenWidth(3),
    margin: responsiveScreenWidth(1),
    alignSelf: 'center',
  },
  nextBtn: {
    height: responsiveScreenWidth(10),
    width: responsiveScreenWidth(14),
    alignSelf: 'center',
  },
});

export {LoanApplicationListScreen};
