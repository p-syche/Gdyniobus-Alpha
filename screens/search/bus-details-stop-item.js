import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {simpleGetStops} from '../../utils/async-stored-data';

const BusStopDescription = ({stopId}) => {
  const [currentStop, setCurrentStop] = useState(null);

  const isCurrentStop = (value) => {
    return value.stopId === stopId;
  };

  useEffect(() => {
    simpleGetStops().then((result) => {
      const filteredStop = result.find((element) => element.stopId === stopId);
      setCurrentStop(filteredStop);
    });
  }, []);

  return (
    <View>
      <Text style={styles.title}>
        HERE: {currentStop && currentStop.stopDesc}
      </Text>
    </View>
  );
};

const BusDetailsStopItem = ({item, navigation}) => {
  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('StopDetails', {
            stopId: item.stopId,
          });
        }}>
        <Text style={styles.title}>This will be a stop {item.stopId}</Text>
        <BusStopDescription stopId={item.stopId} />
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

export default BusDetailsStopItem;
