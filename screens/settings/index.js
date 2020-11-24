import React, {useState, useEffect} from 'react';
import SettingsScreen from './settings-screen';
import AppHeader from '../app-header';
import {headerStyles} from '../../assets/header-styles';

import {defaultTheme} from '../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Settings = ({navigation}) => {
  const theme = useTheme(defaultTheme);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <AppHeader {...props} />,
        headerStyle: headerStyles(theme).statusBar,
      }}>
      <Stack.Screen name="Ustawienia" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default Settings;
