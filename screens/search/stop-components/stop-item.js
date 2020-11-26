import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import StopDetails from './stop-details';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const StopItem = ({item, navigation, busRoutes}) => {
  const theme = useTheme(defaultTheme);

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('StopDetails', {
            stopId: item.stopId,
          });
        }}>
        <Text style={[styles.subtitle, {color: theme.orange.primary}]}>
          przystanek
        </Text>
        <Text style={[styles.title, {color: theme.blue.primary}]}>
          {item.stopDesc}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#D8CEF7',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Lato-Regular',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
  },
});

export default StopItem;
