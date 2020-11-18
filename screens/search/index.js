import React, {useState, useEffect} from 'react';
import ListsOfItems from './lists-of-items';
import SearchWrap from './search-wrap';
import BusTripsPerRoute from './bus-trips-per-route';
import BusDetails from './bus-details';
import StopDetails from './stop-details';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={SearchWrap} />
      <Stack.Screen name="BusDetails" component={BusDetails} />
      <Stack.Screen name="BusTripsPerRoute" component={BusTripsPerRoute} />
      <Stack.Screen name="StopDetails" component={StopDetails} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
