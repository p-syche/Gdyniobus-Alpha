import React, {useMemo, useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const SelectTypeButtons = (props) => {
  const {setSearchFor, searchFor} = props;
  const theme = useTheme(defaultTheme);

  return (
    <View style={styles.buttons}>
      <View style={styles.squareWrap}>
        <Icon name="bus" size={30} color={theme.blue.primary} />
        <Button title="Autobusy" onPress={() => setSearchFor('bus')} />
      </View>
      <View>
        <Icon name="bus-stop-covered" size={30} color={theme.blue.primary} />
        <Button title="Przystanki" onPress={() => setSearchFor('stop')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareWrap: {},
});

export default SelectTypeButtons;
