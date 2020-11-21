import React from 'react';
import {View, Text} from 'react-native';

import {defaultTheme} from '../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {ThemeProvider, useTheme} = createTheming(defaultTheme);

import {headerStyles} from '../assets/header-styles';

const AppHeader = (props) => {
  const theme = useTheme(defaultTheme);
  const {children} = props;
  // console.log('what do i have in the proprs?', theme);
  return (
    <ThemeProvider>
      <View style={headerStyles(theme)}>
        <Text style={headerStyles(theme).text}>Gdyniobus?????</Text>
        <Text>{children}</Text>
      </View>
    </ThemeProvider>
  );
};

export default AppHeader;
