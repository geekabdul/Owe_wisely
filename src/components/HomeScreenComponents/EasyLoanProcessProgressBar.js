import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {color, dimension, font} from '../../utility';
import {EasyLoanProcessItem} from './EasyLoanProcessItem';

const EasyLoanProcessProgressBar = ({data, textStorage}) => {
  const {containerStyle, headerTextStyle} = styles;
  return (
    <View style={containerStyle}>
      <Text style={headerTextStyle}>
        {textStorage['HomeScreen.easy_loan']}{' '}
        <Text style={{color: color.grenadier}}>
          {textStorage['HomeScreen.process']}
        </Text>
      </Text>
      <FlatList
        data={data}
        numColumns={4}
        renderItem={({item, index}) => {
          return (
            <View>
              <EasyLoanProcessItem
                imageUri={item.imageUri}
                label={item.label}
                isCompleted={item.isCompleted}
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
    marginTop: dimension.height * 0.17,
  },
  headerTextStyle: {
    fontSize: 16,
    fontFamily: font.soraBold,
    color: color.black,
    marginBottom: 20,
  },
});

export {EasyLoanProcessProgressBar};
