import React, {useState, useEffect} from 'react';
import ListsOfItems from './lists-of-items';
import BusTripsPerRoute from './bus-components/bus-trips-per-route';
import BusDetails from './bus-components/bus-details';
import StopDetails from './stop-components/stop-details';
import ListsWrapper from './lists-wrapper';
import AppHeader from '../app-header';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista"
        component={ListsWrapper}
        options={{headerTitle: (props) => <AppHeader {...props} />}}
      />
      <Stack.Screen
        name="BusDetails"
        component={BusDetails}
        options={{headerTitle: (props) => <AppHeader {...props} />}}
      />
      <Stack.Screen
        name="BusTripsPerRoute"
        component={BusTripsPerRoute}
        options={{headerTitle: (props) => <AppHeader {...props} />}}
      />
      <Stack.Screen
        name="StopDetails"
        component={StopDetails}
        options={{headerTitle: (props) => <AppHeader {...props} />}}
      />
    </Stack.Navigator>
  );
};

export default SearchScreen;
