import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Button, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusItem from './bus-components/bus-item';
import StopItem from './stop-components/stop-item';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import {useMachine} from '@xstate/react';
import {busRoutesMachine} from '../../xstate/lista-linii';

const ListsOfItems = ({navigation, searchFor, scrollYValue}) => {
  const [state] = useMachine(busRoutesMachine);
  const {routes, stops} = state.context;

  const renderBusItems = ({item}) => (
    <BusItem item={item} navigation={navigation} />
  );
  const renderStopItems = ({item}) => (
    <StopItem item={item} navigation={navigation} busRoutes={routes} />
  );

  return (
    <View style={[wrapperStyles.centered, {marginTop: 50}]}>
      {state.matches('dataLoaded') ? (
        <View style={[wrapperStyles.centered]}>
          {searchFor === 'bus' ? (
            <FlatList
              data={routes}
              renderItem={renderBusItems}
              keyExtractor={(item) => item.uniqueId}
              onScroll={
                // (value) => console.log('just checking the scroll ;)', value)
                Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
                  {useNativeDriver: false},
                  () => {}, // Optional async listener
                )
              }
            />
          ) : (
            <FlatList
              data={stops}
              renderItem={renderStopItems}
              keyExtractor={(item) => item.stopShortName}
              onScroll={
                // (value) => console.log('just checking the scroll ;)', value)
                Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
                  {useNativeDriver: false},
                  () => {}, // Optional async listener
                )
              }
            />
          )}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ListsOfItems;
