import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {image} from '../../assets';
import FAQModal from '../../components/FAQComponent/FAQModal';
import {
  Button,
  CriteriaWiseEvaluationModal,
  CustomizeLoanOfferModal,
  Header,
  ProposalsCard,
} from '../../components';
import {color, font} from '../../utility';
import Spinner from 'react-native-loading-spinner-overlay';
import {getProposals, getevaluateLoan} from '../../Api/ProposalsScreenApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';
import { getFAQApi,getFAQListApi } from '../../Api/FAQListApi';

const HelpScreen = ({navigation}) => {
  const [faqList, setFAQList] = useState([]);
  const [faqQue, setFAQQue] = useState([]);
  const [category, setCategory] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  useEffect(async () => {
    callApi();
  }, []);
  const callApi = async () => {
    await getFAQApi()
      .then(async res => {
        console.log(res.data.list);
        setFAQList(res.data.list);
        setLoaderVisible(false);
      })
      .catch(error => {
        setLoaderVisible(false);
        console.log('error :>> ', error);
      });
  };

  // const callModalapi = async () => {
  //   await getFAQListApi()
  //     .then(async res => {
  //       console.log(res.data.list);
  //       setFAQQue(res.data.list);
  //       setLoaderVisible(false);
  //     })
  //     .catch(error => {
  //       setLoaderVisible(false);
  //       console.log('error :>> ', error);
  //     });
  // };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={()=>{
        // setLoaderVisible(true)
        // callModalapi()
        setCategory(item)
        setModalVisible(true)
      }} style={styles.renderView}>
        <Image
          source={image.faqIcon}
          style={{
            alignSelf: 'center',
            height: responsiveScreenWidth(15),
            width: responsiveScreenWidth(15),
          }}
        />
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
    <View>
      <Header label={'Help'} backOnPress={() => navigation.goBack()} />
      <View style={styles.containerStyle}>
        <Spinner visible={loaderVisible} />
        <View style={{height:responsiveScreenWidth(140)}}>

        <FlatList
          // horizontal={true}
          numColumns={3}
          data={faqList}
          renderItem={renderItem}
          />
          </View>
        <View>
        <Text style={styles.reachOutText}>Reach out to us</Text>
        <View style={styles.boxView}>
          <View>
            <Text style={styles.reachOutText2}>Need help with a query?</Text>
            <Text style={[styles.reachOutText2, {color: '#E03300'}]}>
              Support@owewisely.in
            </Text>
          </View>
          <View>
            <Text
              onPress={() => {
                Linking.openURL('mailto:Support@owewisely.in');
              }}
              style={styles.askus}>
              Ask Us
            </Text>
          </View>
          </View>
        </View>
        {modalVisible ? (
          <FAQModal
            modalVisible={modalVisible}
            onPressclose={() => {
              setModalVisible(false);
            }}
            categoryName={category}
          />
        ) : null}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    width: '100%',
    padding: responsiveScreenWidth(5),
    backgroundColor:"white"
  },
  reachOutText: {
    color: 'black',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  reachOutText2: {
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    padding: responsiveScreenWidth(1),
  },
  boxView: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: responsiveScreenWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:responsiveScreenWidth(5)
  },
  askus: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    backgroundColor: '#E03300',
    width: responsiveScreenWidth(20),
    borderRadius: responsiveScreenWidth(5),
    textAlign: 'center',
    alignSelf: 'center',
    padding: responsiveScreenWidth(1),
  },
  renderView: {
    height: responsiveScreenWidth(32),
    width: responsiveScreenWidth(26),
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: responsiveScreenWidth(2),
    margin:responsiveScreenWidth(2),
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export {HelpScreen};
