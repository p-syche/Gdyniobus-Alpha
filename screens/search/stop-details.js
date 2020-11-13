import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';
import BusDetailsStopItem from './bus-details-stop-item';

import {State, interpret} from 'xstate';
import {busRoutesMachine} from '../../xstate/lista-linii';
import {simpleGetStops} from '../../utils/async-stored-data';

const StopDetails = ({route}) => {
  const {stopId} = route.params;
  const [currentStop, setCurrentStop] = useState([]);

  const isCurrentStop = (value) => {
    return value.stopId === stopId;
  };

  useEffect(() => {
    simpleGetStops().then((result) => {
      const filteredResults = result.filter(isCurrentStop);
      setCurrentStop(filteredResults);
    });
  }, []);

  return (
    <View style={[wrapperStyles.centered, {padding: 20}]}>
      <Text>There will be STOP INFO here???</Text>
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

export default StopDetails;
