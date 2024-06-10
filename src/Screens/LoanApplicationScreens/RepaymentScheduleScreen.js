import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  Button,
  RepaymentScheduleHeader,
  RepaymentScheduleItem,
} from '../../components';
import {color} from '../../utility';
import {getpaymentSchedule} from '../../Api/LoanInformationTopTabNavigatorApi';
import { AppStateContext } from '../../providers/AuthContextProvider';

const data = [
  {
    id: 1,
    outstandingPrincipal: '20,000',
    principal: '720',
    interest: '250',
    installment: '970',
  },
  {
    id: 2,
    outstandingPrincipal: '19,280',
    principal: '729',
    interest: '241',
    installment: '970',
  },
  {
    id: 3,
    outstandingPrincipal: '18,552',
    principal: '738',
    interest: '232',
    installment: '970',
  },
  {
    id: 4,
    outstandingPrincipal: '17,814',
    principal: '747',
    interest: '223',
    installment: '970',
  },
  {
    id: 5,
    outstandingPrincipal: '17,067',
    principal: '756',
    interest: '213',
    installment: '970',
  },
  {
    id: 6,
    outstandingPrincipal: '16,310',
    principal: '766',
    interest: '204',
    installment: '970',
  },
  {
    id: 7,
    outstandingPrincipal: '15,544',
    principal: '775',
    interest: '194',
    installment: '970',
  },
  {
    id: 8,
    outstandingPrincipal: '14,769',
    principal: '785',
    interest: '185',
    installment: '970',
  },
  {
    id: 9,
    outstandingPrincipal: '13,984',
    principal: '805',
    interest: '185',
    installment: '970',
  },
  {
    id: 10,
    outstandingPrincipal: '13,189',
    principal: '815',
    interest: '185',
    installment: '970',
  },
  {
    id: 11,
    outstandingPrincipal: '12,384',
    principal: '825',
    interest: '185',
    installment: '970',
  },
  {
    id: 12,
    outstandingPrincipal: '11,569',
    principal: '835',
    interest: '185',
    installment: '970',
  },
];

const RepaymentScheduleScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));
  const [paymentdata, setPaymentData] = useState();

  useEffect(() => {
    getpaymentSchedule(global.ID)
      .then(res => {
        console.log('setPaymentData res :>> ', JSON.stringify(res?.data?.list, null, 2));
        setPaymentData(res?.data?.list);
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  }, []);

  return (
    <View style={styles.containerStyle}>
      <RepaymentScheduleHeader />
      <FlatList
        data={paymentdata}
        renderItem={({item, index}) => {
          return (
            <View>
              <RepaymentScheduleItem
                index={index}
                installmentNumber={item.id}
                outstandingPrincipal={item.outstanding_principal}
                principal={item.principal}
                interest={item.interest}
                installment={item.instalment}
              />
            </View>
          );
        }}
      />
      <Button
        style={styles.buttonStyle}
        label={textStorage['LoanInformationTopTabNavigator.i_accept']}
        onPress={() =>
        {
          navigation.navigate('ReferenceScreen')
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  buttonStyle: {
    margin: 20,
  },
});

export {RepaymentScheduleScreen};
