import React from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusDetails from './bus-details';
import {getRouteNameFromApiAsync} from '../../utils/fetch-bus-data';
import {getRoutesData} from '../../utils/async-stored-data';

const BusItem = ({item, navigation}) => {
  // console.log('hey ho wtf', item);
  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('BusDetails', {
            routeId: item.routeId,
            routeName: item.routeShortName,
            tripHeadsign: item.tripHeadsign,
            tripId: item.tripId,
          });
        }}>
        <Text style={styles.title}>{item.routeShortName}</Text>
        <Text style={styles.title}>{item.tripHeadsign}</Text>
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
