import React, {useState, useMemo, useEffect} from 'react';
import {View, Animated, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import ListsNavbar from './lists-navbar';
import ListsOfItems from './lists-of-items';

import {useMachine} from '@xstate/react';
import {busRoutesMachine} from '../../xstate/lista-linii';

const ListsWrapper = ({navigation}) => {
  const [state] = useMachine(busRoutesMachine);
  const {routes, stops} = state.context;
  const [searchFor, setSearchFor] = useState('bus');
  const [listOfCurrentItems, setListOfCurrentItems] = useState(routes);

  useEffect(() => {
    if (state.matches('dataLoaded')) {
      if (searchFor === 'bus') {
        setListOfCurrentItems(routes);
      } else {
        setListOfCurrentItems(stops);
      }
    }
  }, [state, searchFor]);

  const [searchedTerm, setSearchedTerm] = useState('');

  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
        useNativeDriver: true,
      }),
      new Animated.Value(0),
    ),
    0,
    15,
  );

  const usersList = useMemo(() => {
    if (searchedTerm.length === 0) {
      return listOfCurrentItems;
    }
    const list = listOfCurrentItems.filter((route) => {
      console.log(listOfCurrentItems);
      return listOfCurrentItems.routeShortName.includes(searchedTerm);
    });
    return list;
  }, [searchedTerm]);

  return (
    <SafeAreaView style={[wrapperStyles.centered]}>
      <StatusBar barStyle="light-content" />
      <ListsNavbar
        clampedScroll={clampedScroll}
        searchedTerm={searchedTerm}
        setSearchedTerm={setSearchedTerm}
        listOfCurrentItems={listOfCurrentItems}
        setSearchFor={setSearchFor}
      />
      <ListsOfItems
        navigation={navigation}
        searchFor={searchFor}
        scrollYValue={scrollYValue}
      />
    </SafeAreaView>
  );
};

export default ListsWrapper;
