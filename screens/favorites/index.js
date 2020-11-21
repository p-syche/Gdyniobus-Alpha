import React, {useState, useEffect} from 'react';
import FavoritesScreen from './favorites-screen';
import AppHeader from '../app-header';

import {createStackNavigator} from '@react-navigation/stack';

import {headerStyles} from '../../assets/header-styles';

const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <AppHeader {...props} />,
        headerStyle: {height: 120},
      }}>
      >
      <Stack.Screen name="Ulubione" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
