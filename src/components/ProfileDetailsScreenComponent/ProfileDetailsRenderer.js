import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {color, dimension, font} from '../../utility';
import {ProfileDetailsItem} from './ProfileDetailsItem';

const ProfileDetailsRenderer = ({
  type,
  personalInformationData,
  professionalInformationData,
}) => {
  const {containerStyle, itemStyle, keyLabelTextStyle, valueLabelTextStyle} =
    styles;
  if (type === 1) {
    return (
      <View style={containerStyle}>
        <FlatList
          data={personalInformationData}
          renderItem={({item, index}) => {
            return (
              <View>
                <ProfileDetailsItem label={item.label} value={item.value} />
              </View>
            );
          }}
        />
      </View>
    );
  } else if (type === 2) {
    return (
      <View style={containerStyle}>
        <FlatList
          data={professionalInformationData}
          renderItem={({item, index}) => {
            return (
              <View>
                <ProfileDetailsItem label={item.label} value={item.value} />
              </View>
            );
          }}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
  },
});

export {ProfileDetailsRenderer};
