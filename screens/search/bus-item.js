import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import BusDetails from './bus-details';
import {getRouteNameFromApiAsync} from '../../utils/fetch-bus-data';

const BusItem = ({item, navigation}) => {
  const [routeName, setRouteName] = useState('');

  // const busVectorIcon = <Icon name="bus" size={30} color="#900" />;
  const busVectorIcon = <Text>BUS</Text>;

  useEffect(() => {
    let mounted = true;
    getRouteNameFromApiAsync(item.routeId).then((response) => {
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
        {item.agencyId === 6 ? busVectorIcon : null}
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
