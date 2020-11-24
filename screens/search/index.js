import React, {useState, useEffect} from 'react';
import ListsOfItems from './lists-of-items';
import BusTripsPerRoute from './bus-components/bus-trips-per-route';
import BusDetails from './bus-components/bus-details';
import StopDetails from './stop-components/stop-details';
import ListsWrapper from './lists-wrapper';
import AppHeader from '../app-header';
import {headerStyles} from '../../assets/header-styles';

import {defaultTheme} from '../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {ThemeProvider, useTheme} = createTheming(defaultTheme);

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  const theme = useTheme(defaultTheme);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <AppHeader {...props} />,
        headerStyle: headerStyles(theme).statusBar,
        headerMode: 'screen',
        cardStyle: {backgroundColor: '#ffffff'},
      }}>
      <Stack.Screen name="Lista" component={ListsWrapper} />
      <Stack.Screen name="BusDetails" component={BusDetails} />
      <Stack.Screen name="BusTripsPerRoute" component={BusTripsPerRoute} />
      <Stack.Screen name="StopDetails" component={StopDetails} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
