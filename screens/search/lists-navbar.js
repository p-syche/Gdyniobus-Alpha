import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Button, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusItem from './bus-components/bus-item';
import StopItem from './stop-components/stop-item';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import SearchComponent from './search-components/SearchComponent';

const ListsNavbar = ({
  clampedScroll,
  searchedTerm,
  setSearchedTerm,
  listOfCurrentItems,
  setSearchFor,
  searchFor,
}) => {
  return (
    <View style={[wrapperStyles.centered]}>
      <Text>Choose either bus or bus stop</Text>
      <SearchComponent
        clampedScroll={clampedScroll}
        searchedTerm={searchedTerm}
        setSearchedTerm={setSearchedTerm}
        listOfCurrentItems={listOfCurrentItems}
        setSearchFor={setSearchFor}
        searchFor={searchFor}
      />
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ListsNavbar;
