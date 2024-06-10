import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { color } from '../../utility';

const OffersNotificationScreen = () => {
  return (
    <View style={styles.containerStyle}>
      <Text>OffersNotificationScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export default OffersNotificationScreen;
