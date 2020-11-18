import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Button, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusItem from './bus-item';
import StopItem from './stop-item';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import SearchComponent from './SearchComponent';

const ListsNavbar = ({clampedScroll}) => {
  return (
    <View style={[wrapperStyles.centered]}>
      <Text>Choose either bus or bus stop</Text>
      <SearchComponent clampedScroll={clampedScroll} />
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
