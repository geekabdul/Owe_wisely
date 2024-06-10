import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  View,
  Alert,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ExpandableComponent from './ExpandableComponent';
import {getFAQListApi} from '../../Api/FAQListApi';

function FAQModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [listDataSource, setListDataSource] = useState([]);
  const [listDataSourcetemp, setListDataSourcetemp] = useState([
    {
      isExpanded: false,
      category_name: 'Can I cancel the loan at any stage?',
      val: 'You can cancel your personal loan application even after it has been approved by the financial lender.',
    },
    {
      isExpanded: false,
      category_name:
        'I do not have a work ID, can I fill my personal email ID?',
      val: 'You can cancel your personal loan application even after it has been approved by the financial lender.',
    },
  ]);

  const obj = {
    faq_category: props.categoryName,
  };

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    await getFAQListApi(obj)
      .then(async res => {
        console.log(res.data.list);
        var dataList = [];
        dataList = res.data.list;

        var tempData = [];
        dataList.map(item => {
          tempData.push({
            faq_content: item.faq_content,
            faq_topic: item.faq_topic,
            isExpanded: false,
          });
        });

        console.log('>>>>>>>>>>>>dataList ', dataList);
        setListDataSource(tempData);
        console.log('>>>>>>>>>>>> ', listDataSource);
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  };

  const updateLayout = idKey => {
    const array = [...listDataSource];
    // if (multiSelect) {
    //   // If multiple select is enabled
    //   array[index]['isExpanded'] = !array[index]['isExpanded'];
    // } else {
    // If single select is enabled
    array.map((value, placeindex) =>
      placeindex === idKey
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false),
    );
    // }
    setListDataSource(array);
  };
  console.log('>>>>>>>>>>>> ', listDataSource);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!props.modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <Image
                  source={require('../../assets/FAQLogos/img1.png')}
                  style={styles.img1}
                />
              </View>
              <View>
                <Text style={styles.modalText1}>How can we help you ? </Text>
                <Text style={styles.modalText2}>
                  Please select the issue you are facing
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <TouchableOpacity onPress={() => props.onPressclose()} >
                  <Image
                    source={require('../../assets/FAQLogos/close.png')}
                    style={styles.buttonClose}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalView}>
              <View>
                {listDataSource == null ? (
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.modalText2,
                        {color: 'black', backgroundColor: 'black'},
                      ]}>
                      No data found
                    </Text>
                  </View>
                ) : (
                  listDataSource.map((item, key) => (
                    <ExpandableComponent
                      key={key}
                      item={item}
                      onClickFunction={() => {
                        updateLayout(key);
                      }}
                    />
                  ))
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 300,
    backgroundColor: 'red',
  },
  modalView: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    height: 12,
    width: 12,
    alignSelf: 'center',
    tintColor: 'white',
    marginStart: 30,
    marginTop: 15,
  },
  img1: {
    height: 35,
    width: 35,
    alignSelf: 'center',
    marginTop: 20,
    marginEnd: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
    textAlign: 'left',
    marginTop: 10,
  },
  modalText2: {
    color: 'white',
    paddingStart: 5,
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'left',
  },
});

export default FAQModal;
