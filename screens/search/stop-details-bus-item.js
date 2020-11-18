import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import BusTripsPerRoute from './bus-trips-per-route';

const StopDetailsBusItem = ({item, navigation}) => {
  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('BusTripsPerRoute', {
            routeId: item.routeId,
            routeNumber: item.shortName,
          });
        }}>
        <Text style={styles.title}>{item.routeId}</Text>
        <Text style={styles.title}>{item.shortName}</Text>
        <Text>{item.delayDesc}</Text>
        <Text>{item.shortName}</Text>
        <Text>{item.headSign}</Text>
        <Text>{item.routeId}</Text>
        <Text>{item.tripId}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#bada55',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default StopDetailsBusItem;
