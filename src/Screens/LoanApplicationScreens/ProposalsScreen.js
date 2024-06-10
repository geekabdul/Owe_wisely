import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {image} from '../../assets';
import {
  Button,
  CriteriaWiseEvaluationModal,
  CustomizeLoanOfferModal,
  Header,
  ProposalsCard,
} from '../../components';
import {color, font} from '../../utility';
import {
  getFilterProposals,
  getProposals,
  getevaluateLoan,
} from '../../Api/ProposalsScreenApi';
import {AppStateContext} from '../../providers/AuthContextProvider';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';
import Spinner from 'react-native-loading-spinner-overlay';
import {CommonActions, useFocusEffect} from '@react-navigation/native';

const ProposalsScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));
  const [customizeLoanOfferVisible, setCustomizeLoanOfferVisible] =
    useState(false);
  const [criteriaWiseEvaluationVisible, setCriteriaWiseEvaluationVisible] =
    useState(false);
  const [spinner, setSpinner] = useState(true);
  const [selecteddata, setSelectedData] = useState({});
  const [proposal, setProposal] = useState();
  const [proposalLength, setProposalLength] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        navigation.navigate('DrawerNavigator');

        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'DrawerNavigator'}],
          }),
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const handleClick = item => {
    console.log('item', JSON.stringify(item));
    setSelectedData(item);
    setCustomizeLoanOfferVisible(true);
  };

  useEffect(() => {
    getProposals('', '')
      .then(res => {
        console.log('res :>> ', JSON.stringify(res.data.data.list));
        console.log(proposal);
        setProposal(res?.data?.data?.list);
        setProposalLength(res.data.data.list.length);
        setSpinner(false);
      })
      .catch(error => {
        setSpinner(false);
        console.log('error :>> ', error);
      });
  }, []);

  const callEvaluteApi = (tensure, loanValue) => {
    // alert(tensure)
    setProposal();
    setProposalLength();
    getFilterProposals(tensure, loanValue)
      .then(res => {
        console.log('res :>> ', JSON.stringify(res.data));
        setProposal(res?.data?.data?.list);
        setProposalLength(res.data.data.list.length);
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  };

  return (
    <View style={styles.containerStyle}>
      <Spinner visible={spinner} />
      <Header
        iconUri={image.proposalFilter}
        label={textStorage['ProposalsScreen.proposals']}
        backOnPress={() => navigation.navigate('DrawerNavigator')}
        onPress={() => {
          setCriteriaWiseEvaluationVisible(true);
          //  setSelectedData(proposal);
        }}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          {proposal === undefined || proposalLength === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flex: 1,
              }}>
              <Image
                source={require('../../assets/BottomTabNavigatorAssets/noDataProposal.png')}
                resizeMode="contain"
                style={{
                  height: responsiveScreenWidth(55),
                  width: responsiveScreenWidth(55),
                  alignSelf: 'center',
                  marginTop: responsiveScreenWidth(30),
                }}
              />
              <Text
                style={{
                  color: '#E03300',
                  fontSize: responsiveFontSize(4),
                  fontWeight: 'bold',
                  marginTop: responsiveScreenWidth(10),
                }}>
                Whoops!
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '400',
                }}>
                No Proposal Found
              </Text>
            </View>
          ) : (
            <View>
              <View style={styles.proposalsFoundContainerStyle}>
                <Text style={styles.proposalsFoundTextStyle}>
                  {proposalLength}
                  {textStorage['ProposalsScreen.proposals_found']}{' '}
                </Text>
              </View>
              <FlatList
                data={proposal}
                contentContainerStyle={{paddingHorizontal: 20}}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <ProposalsCard
                        textStorage={textStorage}
                        editOnPress={() => handleClick(item)}
                        data={item}
                        viewAllClick={() => {
                          navigation.navigate(
                            'LoanInformationTopTabNavigator',
                            {
                              data: item,
                            },
                          );
                        }}
                      />
                    </View>
                  );
                }}
                ListFooterComponent={() => (
                  <Button
                    style={styles.buttonStyle}
                    label={textStorage['ProposalsScreen.evaluate_wisely']}
                    onPress={() =>
                      navigation.navigate('ComparisonOfOffersScreen', {
                        data: proposal,
                        textStorage: textStorage,
                      })
                    }
                    // onPress={() => setCriteriaWiseEvaluationVisible(true)}
                  />
                )}
              />
              <CustomizeLoanOfferModal
                visible={customizeLoanOfferVisible}
                closeOnPress={setCustomizeLoanOfferVisible}
                quickApplyOnPress={() => setCustomizeLoanOfferVisible(false)}
                selecteddata={selecteddata}
                textStorage={textStorage}
              />
              <CriteriaWiseEvaluationModal
                visible={criteriaWiseEvaluationVisible}
                selecteddata={selecteddata}
                textStorage={textStorage}
                closeOnPress={setCriteriaWiseEvaluationVisible}
                evaluateOnPress={(tensure, loanValue) => {
                  console.log('>>>>>>>>>>>>>>>>>>>>>>>', tensure);
                  console.log('>>>>>>>>>>>>>>>>>>>>>>>', loanValue[0]);
                  setCriteriaWiseEvaluationVisible(false);
                  callEvaluteApi(tensure, loanValue);
                  // navigation.navigate('ComparisonOfOffersScreen');
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
    paddingBottom: 20,
  },
  proposalsFoundContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: color.concrete,
  },
  proposalsFoundTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
    color: color.black,
  },
  buttonStyle: {
    marginTop: 20,
  },
});

export {ProposalsScreen};
