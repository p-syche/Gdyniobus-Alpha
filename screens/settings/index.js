import React, {useState, useEffect} from 'react';
import SettingsScreen from './settings-screen';
import AppHeader from '../app-header';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <AppHeader {...props} />,
        headerStyle: {height: 120},
      }}>
      >
      <Stack.Screen name="Ustawienia" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
