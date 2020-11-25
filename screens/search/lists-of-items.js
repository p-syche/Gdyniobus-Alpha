import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  Animated,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusItem from './bus-components/bus-item';
import StopItem from './stop-components/stop-item';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import {useMachine} from '@xstate/react';
import {busRoutesMachine} from '../../xstate/lista-linii';

import {useScrollToTop} from '@react-navigation/native';

const ListsOfItems = ({navigation, searchFor, scrollYValue, clampedScroll}) => {
  const busRef = useRef(null);
  const stopsRef = useRef(null);
  useScrollToTop(busRef);
  useScrollToTop(stopsRef);

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

  return (
    <Animated.View
      style={[
        styles.listsAnimatedWrapper,
        {
          transform: [
            {
              translateY: searchBarTranslate,
            },
          ],
        },
      ]}>
      <View style={styles.listsWrapper}>
        {state.matches('dataLoaded') ? (
          <View>
            {searchFor === 'bus' ? (
              <FlatList
                ref={busRef}
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
                ListHeaderComponent={<View style={{paddingBottom: 30}} />}
                ListFooterComponent={<View style={{paddingBottom: 100}} />}
                style={styles.flatListStyles}
              />
            ) : (
              <FlatList
                ref={stopsRef}
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
                ListHeaderComponent={<View style={{paddingBottom: 30}} />}
                ListFooterComponent={<View style={{paddingBottom: 100}} />}
                style={styles.flatListStyles}
              />
            )}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </Animated.View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  flatListStyles: {
    marginTop: -80,
  },
  listsAnimatedWrapper: {
    top: 60,
    flex: 4,
  },
  listsWrapper: {
    flex: 1,
    transform: [
      {
        translateY: 50,
      },
    ],
  },
});

export default ListsOfItems;
