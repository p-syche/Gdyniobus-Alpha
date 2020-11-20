import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import BusTripsPerRoute from './bus-trips-per-route';

const BusItem = ({item, navigation}) => {
  // console.log('hey ho wtf', item);
  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('BusTripsPerRoute', {
            routeId: item.routeId,
            routeNumber: item.routeShortName,
          });
        }}>
        <Text style={styles.title}>{item.routeId}</Text>
        <Text style={styles.title}>{item.routeShortName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BusItem;
