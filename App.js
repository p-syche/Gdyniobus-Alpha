import 'react-native-gesture-handler';
import * as React from 'react';

import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AppHeader from './screens/app-header';
import SearchScreen from './screens/search';
import FavoritesScreen from './screens/favorites';
import SettingsScreen from './screens/settings';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={false} />
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Search">
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
