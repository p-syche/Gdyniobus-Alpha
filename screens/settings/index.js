import React, {useState, useEffect} from 'react';
import SettingsScreen from './settings-screen';
import AppHeader from '../app-header';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ustawienia"
        component={SettingsScreen}
        options={{headerTitle: (props) => <AppHeader {...props} />}}
      />
    </Stack.Navigator>
  );
};

export default SearchScreen;
