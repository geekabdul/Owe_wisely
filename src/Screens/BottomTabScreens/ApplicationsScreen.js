import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Header, SelectLanguageCard} from '../../components';
import {color, font} from '../../utility';
import {image} from '../../assets';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';
import {getLoanApplication} from '../../Api/LoanInformationTopTabNavigatorApi';
import moment from 'moment';

const ApplicationsScreen = () => {
  const {textStorage, setContextValue} = useContext(AppStateContext);
  const [loanApplicationList, setLoanApplicationList] = useState([]);

  useEffect(() => {
    getLoanApplication()
      .then(res => {
        let dataArray = res?.data?.data?.list;
        console.log('res :>> ', JSON.stringify(dataArray));
        setLoanApplicationList(dataArray);
        console.log('loanApplication', JSON.stringify(loanApplicationList));
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  }, []);

  const cardView = ({item, index}) => {
    return (
      <View style={styles.shadowBox}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.idTxt}>
            <Text style={[styles.idTxt, {color: color.gray}]}>ID</Text> :
            {item.customer.uuid}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/LoanScreenAssets/ruppeeIcon.png')}
              style={styles.moneyImg}
            />
            <Text style={styles.amntTxt}>{item.customer.loan_amount}</Text>
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
            // imageStyle={{tintColor: bgColor}}
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
                {item.application_status}
              </Text>
            </Text>
          </ImageBackground>
          <Text style={styles.dateTxt}>
            {moment(item.proposal.created_at).format('DD MMM,YYYY')}
          </Text>
        </View>
        <Text style={styles.amntTxt}>
          {item.customer.basic_detail_one.profile_name}
        </Text>
        <Text style={styles.idTxt}>Purpose of loan </Text>
        <Text
          style={[
            styles.dateTxt,
            {alignSelf: 'flex-start', paddingBottom: responsiveScreenWidth(4)},
          ]}>
          {item.loanPurpose.name}
        </Text>
        {item.application_status === 'Applied' ? (
          <View
            style={{
              padding: responsiveScreenWidth(2),
              borderBottomLeftRadius: responsiveScreenWidth(2),
              borderBottomRightRadius: responsiveScreenWidth(2),
              backgroundColor: '#F4F4F4',
              width: '110%',
              marginStart: responsiveScreenWidth(-4),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[styles.idTxt, {marginStart: responsiveScreenWidth(2)}]}>
              <Text style={[styles.idTxt, {color: color.gray}]}>Responses</Text>{' '}
              :4
            </Text>
            <Image
              resizeMode="contain"
              source={require('../../assets/LoanScreenAssets/nextBtn.png')}
              style={styles.nextBtn}
            />
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.containerStyle}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#ED9D4D', '#ED7A53', '#EE4D5B']}
        style={{
          flexDirection: 'row',
          height: responsiveScreenWidth(13),
          justifyContent: 'center',
        }}>
        <Text style={styles.labelTextStyle}>{'Applications List'}</Text>
        <TouchableOpacity
          style={{alignSelf: 'center', justifyContent: 'center'}}
          activeOpacity={0.8}>
          <Image
            source={image.filterIcon}
            style={{
              height: responsiveScreenWidth(4),
              width: responsiveScreenWidth(4),
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </LinearGradient>
      {/* <Header
          noBack
          label={'Applications List'}
          iconUri={image.filterIcon}
        /> */}
      <View style={styles.containerStyle}>
        {loanApplicationList.length == 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              flex: 1,
            }}>
            <Image
              source={require('../../assets/BottomTabNavigatorAssets/noDataApplication.png')}
              resizeMode="contain"
              style={{
                height: responsiveScreenWidth(55),
                width: responsiveScreenWidth(55),
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: '#E03300',
                fontSize: responsiveFontSize(4),
                fontWeight: 'bold',
                marginTop:responsiveScreenWidth(10)
              }}>
              Sorry!
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(2),
                fontWeight: '400',
              }}>
              No Applications Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={loanApplicationList}
            renderItem={cardView}
            keyExtractor={item => item.id}
          />
        )}
        {/* {cardView('Applied', '#F2A80C')}
          {cardView('Completed', '#00B553')}
          {cardView('Pending', '#ED7A53')}
          {cardView('Rejected', '#EE4D5B')} */}
      </View>
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
  labelTextStyle: {
    fontSize: 18,
    fontFamily: font.soraBold,
    color: color.white,
    width: '82%',
    alignSelf: 'center',
  },
  shadowBox: {
    alignSelf: 'center',
    width: '90%',
    borderTopLeftRadius: responsiveScreenWidth(2),
    borderTopRightRadius: responsiveScreenWidth(2),
    borderBottomLeftRadius: responsiveScreenWidth(2),
    borderBottomRightRadius: responsiveScreenWidth(2),
    paddingStart: responsiveScreenWidth(4),
    paddingEnd: responsiveScreenWidth(4),
    paddingTop: responsiveScreenWidth(4),
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

export {ApplicationsScreen};
