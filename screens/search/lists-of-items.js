import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Button, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusItem from './bus-components/bus-item';
import StopItem from './stop-components/stop-item';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import {useMachine} from '@xstate/react';
import {busRoutesMachine} from '../../xstate/lista-linii';

const ListsOfItems = ({navigation, searchFor, scrollYValue, clampedScroll}) => {
  const [state] = useMachine(busRoutesMachine);
  const {routes, stops} = state.context;

  const renderBusItems = ({item}) => (
    <BusItem item={item} navigation={navigation} />
  );
  const renderStopItems = ({item}) => (
    <StopItem item={item} navigation={navigation} busRoutes={routes} />
  );

  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -250],
    extrapolate: 'clamp',
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // console.log('do i know the scroll?', scrollYValue);

  return (
    <Animated.View
      style={[
        wrapperStyles.centered,
        {
          backgroundColor: '#2ddfff',
          transform: [
            {
              translateY: searchBarTranslate,
            },
          ],
        },
      ]}>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default ListsOfItems;
