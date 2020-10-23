import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const FavoritesScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Favorites :heart:</Text>
        <Text>Will use async storage</Text>
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
