import * as React from 'react';

import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const SearchScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <Text>Will search buses/stops here!</Text>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
