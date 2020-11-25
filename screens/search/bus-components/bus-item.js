import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import BusTripsPerRoute from './bus-trips-per-route';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const BusItem = ({item, navigation}) => {
  const theme = useTheme(defaultTheme);

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('BusTripsPerRoute', {
            routeId: item.routeId,
            routeNumber: item.routeShortName,
          });
        }}>
        <Text style={[styles.subtitle, {color: theme.orange.primary}]}>
          Linia numer
        </Text>
        <Text style={[styles.title, {color: theme.blue.primary}]}>
          {item.routeShortName}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#D8CEF7',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
});

export default BusItem;
