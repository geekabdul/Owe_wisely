import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {color, dimension} from '../../utility';
import {BasicDetailsProgressItem} from './BasicDetailsProgressItem';
import {responsiveScreenWidth} from '../../utility/Size';

const datas = [
  {
    id: 1,
    step: 1,
    label: 'Basic Details',
  },
  {
    id: 2,
    step: 2,
    label: 'Professional Details',
  },
  {
    id: 3,
    step: 3,
    label: 'Check Eligibility',
  },
  {
    id: 4,
    step: 4,
    label: 'KYC Details',
  },
  {
    id: 5,
    step: 5,
    label: 'Loan Approval',
  },
  {
    id: 6,
    step: 6,
    label: 'Disbursed',
  },
];

const BasicDetailsProgressComponent = ({id, isActive, textStorage}) => {
  const {containerStyle} = styles;
  const data = [
    {
      id: 1,
      step: 1,
      label: textStorage['BasicDetailsProgressComponent.basic_details1'],
    },
    {
      id: 2,
      step: 2,
      label: textStorage['BasicDetailsProgressComponent.professional_details'],
    },
    {
      id: 3,
      step: 3,
      label: textStorage['BasicDetailsProgressComponent.check_eligibility'],
    },
    {
      id: 4,
      step: 4,
      label: textStorage['BasicDetailsProgressComponent.kyc_details'],
    },
    {
      id: 5,
      step: 5,
      label: textStorage['BasicDetailsProgressComponent.loan_approval'],
    },
    {
      id: 6,
      step: 6,
      label: textStorage['BasicDetailsProgressComponent.disbursed'],
    },
  ];

  return (
    <View style={containerStyle}>
      <FlatList
        data={data}
        horizontal
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between',paddingRight:10}}
        ItemSeparatorComponent={() => {
          return <View style={styles.itemSeparatorComponentStyle} />;
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                // height: responsiveScreenWidth(10),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: -15,
              }}>
              <BasicDetailsProgressItem
                id={item.id}
                step={item.step}
                label={item.label}
                // selected={item.id === id ? true : false}
                selected={id + 1 > item.id ? true : false}
                isActive={isActive === item.id ? true : false}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: color.wildSand1,
    // padding: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    // paddingEnd: 15,
    // paddingStart: 15,
    // height: 70,
    // alignItems: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  itemSeparatorComponentStyle: {
    // height: 1,
    width: dimension.width / (10 * 4),
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginStart: 5,
    // backgroundColor:"red"
  },
});

export {BasicDetailsProgressComponent};
