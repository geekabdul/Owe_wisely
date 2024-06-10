import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Button, LoanInformationItem} from '../../components';
import {color} from '../../utility';
import {getkeyFactStatement} from '../../Api/LoanInformationTopTabNavigatorApi';
import {AppStateContext} from '../../providers/AuthContextProvider';

const data = [
  {
    id: 1,
    label: 'Loan amount',
    value: '₹ 20,000.00',
  },
  {
    id: 2,
    label: 'Total interest',
    value: '₹ 3274.00',
  },
  {
    id: 4,
    label: 'Other up-front charges',
    value: '₹ 400.00',
  },
  {
    id: 5,
    label: 'Processing fees',
    value: '₹ 160.00',
  },
  {
    id: 6,
    label: 'Insurance charges',
    value: '₹ 240.00',
  },
  {
    id: 7,
    label: 'Others (if any)',
    value: '----',
  },
  {
    id: 8,
    label: 'Net disbursed amount',
    value: '₹ 19600.00',
  },
  {
    id: 9,
    label:
      'Total amount to be paid by the borrower test starts here for testing width',
    value: '₹ 23674.00',
  },
  {
    id: 10,
    label: 'Annualized Percentage Rate',
    value: '17.07%',
  },
  {
    id: 11,
    label: 'Tenure of the Loan',
    value: '24 Months',
  },
  {
    id: 12,
    label: 'Repayment frequency',
    value: 'Monthly',
  },
  {
    id: 13,
    label: 'Number of installments',
    value: '24',
  },
  {
    id: 14,
    label: 'Amount of each installment',
    value: '970',
  },
];

const KeyFactsStatementScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  // console.log('textStorage :>> ', JSON.stringify(textStorage, null, 2));
  const [factsStatement, setFactsStatement] = useState();

  useEffect(() => {
    getkeyFactStatement(global.ID)
      .then(res => {
        console.log('setFactsStatement :>> ', JSON.stringify(res?.data?.list, null, 2));
        setFactsStatement(res?.data?.list);
      })
      .catch(error => {
        console.log('error :>> ', error);
      });
  }, []);
 
  if (!factsStatement) {
    return null; // or a loading indicator
  }

  const keysToExclude = ['uuid', 'bank_name', 'id'];

  // Define a mapping between the keys and the desired labels
  const keyMapping = {
    loan_amount: 'Loan amount',
    total_interest: 'Total interest',
    other_upfront_charges: 'Other up-front charges',
    processing_fees: 'Processing fees',
    insurance_charges: 'Insurance charges',
    others: 'Others (if any)',
    net_distributed_amount: 'Net disbursed amount',
    total_amount_to_be_paid: 'Total amount to be paid by the borrower',
    annualized_percentage_rate: 'Annualized Percentage Rate',
    tenure: 'Tenure of the Loan',
    payment_frequency: 'Repayment frequency',
    number_of_installment: 'Number of installments',
    amount_of_each_installment: 'Amount of each installment',
  };

  // Create a new object without the specified keys
  const filteredFactsStatement = Object.fromEntries(
    Object.entries(factsStatement).filter(
      ([key, value]) => !keysToExclude.includes(key),
    ),
  );

  // Convert the filtered data to the desired format
  const transformedData = Object.keys(filteredFactsStatement).map(key => ({
    id: factsStatement.id,
    label: keyMapping[key] || key,
    value: formatValue(key, filteredFactsStatement[key]),
  }));

  // Helper function to format the value based on the key
  function formatValue(key, value) {
    if (typeof value === 'number') {
      return `₹ ${value.toFixed(2)}`;
    }
    return value;
  }

  // console.log('transformedData :>> ', JSON.stringify(transformedData, null, 2));

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={transformedData}
        contentContainerStyle={{paddingTop: 10}}
        ListHeaderComponent={() => (
          <LoanInformationItem 
            index={0}
            labelKey={'Bank Name'}
            labelValue={factsStatement?.bank_name}
          />
        )}
        renderItem={({item, index}) => {
          return (
            <View >
              <LoanInformationItem
                index={index + 1}
                labelKey={item.label}
                labelValue={item.value}
              />
            </View>
          );
        }}
        ListFooterComponent={() => (
          <Button
            style={styles.buttonStyle}
            label={textStorage['LoanInformationTopTabNavigator.i_accept']}
            onPress={() => 
              navigation.navigate('ReferenceScreen')
              // console.log("Accept")
            }
          />
        )}
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
    marginVertical: 30,
    marginHorizontal: 20,
  },
});

export {KeyFactsStatementScreen};
