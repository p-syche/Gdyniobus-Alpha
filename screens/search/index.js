import React, {useState, useEffect} from 'react';
import ListsOfItems from './lists-of-items';
import BusDetails from './bus-details';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={ListsOfItems} />
      <Stack.Screen name="BusDetails" component={BusDetails} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
