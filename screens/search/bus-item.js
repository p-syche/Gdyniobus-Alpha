import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusDetails from './bus-details';
import {getRouteNameFromApiAsync} from '../../utils/fetch-bus-data';

const BusItem = ({item, navigation}) => {
  const [routeName, setRouteName] = useState('');

  console.log('show me the shape of the item, pls', item, navigation);

  useEffect(() => {
    let mounted = true;
    getRouteNameFromApiAsync(item.routeId).then((response) => {
      console.log('the routeID is?', item.routeId);
      if (mounted) {
        setRouteName(response);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('BusDetails', {
            routeId: item.routeId,
            routeName: routeName,
            tripHeadsign: item.tripHeadsign,
            tripId: item.tripId,
          });
        }}>
        <Text style={styles.title}>{routeName}</Text>
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
