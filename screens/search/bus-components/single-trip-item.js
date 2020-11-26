import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import BusDetails from './bus-details';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const SingleTripItem = ({item, navigation, routeId, routeNumber, index}) => {
  const theme = useTheme(defaultTheme);
  // console.log('this single trip item is kinda broken', item);
  return (
    <Pressable
      style={[
        styles.pressable,
        {backgroundColor: index % 2 === 0 ? theme.white : theme.orange.primary},
      ]}
      onPress={() => {
        navigation.navigate('BusDetails', {
          routeId: routeId,
          routeName: routeNumber,
          tripHeadsign: item.tripHeadsign,
          tripId: item.tripId,
        });
      }}>
      <Text
        style={[
          styles.title,
          {color: index % 2 === 0 ? theme.blue.primary : theme.white},
        ]}>
        info {item.tripHeadsign}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#D8CEF7',
    padding: 10,
    marginVertical: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontSize: 23,
    fontFamily: 'Lato-Regular',
  },
});

export default SingleTripItem;
