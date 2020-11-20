import React, {useState, useMemo, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, Button, Animated} from 'react-native';
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
    50,
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
    <View style={[wrapperStyles.centered]}>
      <ListsNavbar
        clampedScroll={clampedScroll}
        searchedTerm={searchedTerm}
        setSearchedTerm={setSearchedTerm}
        listOfCurrentItems={listOfCurrentItems}
      />
      <Text>Choose either bus or bus stop</Text>
      <View style={styles.buttons}>
        <Button title="Autobusy" onPress={() => setSearchFor('bus')} />
        <Button title="Przystanki" onPress={() => setSearchFor('stop')} />
      </View>
      <View />
      <ListsOfItems
        navigation={navigation}
        searchFor={searchFor}
        scrollYValue={scrollYValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ListsWrapper;
