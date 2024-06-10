import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {AllNotificationCard} from '../../components';
import {color} from '../../utility';

const AllNotificationsScreen = () => {
  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={[0, 1, 2, 3]}
        renderItem={({item, index}) => {
          return (
            <View>
              <AllNotificationCard isActive={index === 0 ? true : false} />
            </View>
          );
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
});

export default AllNotificationsScreen;
