import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../../utility';

const TransactionNotificationScreen = () => {
  return (
    <View style={styles.containerStyle}>
      <Text>TransactionNotificationScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export default TransactionNotificationScreen;
