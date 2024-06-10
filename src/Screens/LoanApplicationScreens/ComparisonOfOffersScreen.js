import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {image} from '../../assets';
import {Button, Header, ProposalsCard} from '../../components';
import {color, font} from '../../utility';

const ComparisonOfOffersScreen = ({navigation,route,textStorage}) => {
  return (
    <View style={styles.containerStyle}>
      <Header
        iconUri={image.homeSelectedIcon}
        label={'Comparison of offers'}
        backOnPress={() => navigation.goBack()}
      />
      <FlatList
        data={[route.params.data[0],route.params.data[1]]}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item, index}) => {
          return (
            <View>
               <ProposalsCard
                textStorage={textStorage}
                // editOnPress={() => handleClick(item)}
                data={item}
                viewAllClick={() => {
                  // navigation.navigate('LoanInformationTopTabNavigator', {
                  //   data: item,
                  // });
                  console.log(">>>>")
                }}
              />
            </View>
          );
        }}
        ListFooterComponent={() => (
          <Button style={styles.buttonStyle} label={'Wise Apply'} />
        )}
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

export {ComparisonOfOffersScreen};
