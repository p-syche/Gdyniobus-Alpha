import React, {useState, useEffect} from 'react';
import ListsOfItems from './lists-of-items';
import BusTripsPerRoute from './bus-components/bus-trips-per-route';
import BusDetails from './bus-components/bus-details';
import StopDetails from './stop-components/stop-details';
import ListsWrapper from './lists-wrapper';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={ListsWrapper} />
      <Stack.Screen name="BusDetails" component={BusDetails} />
      <Stack.Screen name="BusTripsPerRoute" component={BusTripsPerRoute} />
      <Stack.Screen name="StopDetails" component={StopDetails} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
