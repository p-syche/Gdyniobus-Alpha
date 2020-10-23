import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings settings set set settings</Text>
        <Text>Will use Async Storage</Text>
        <Button
          title="Favorites screen"
          onPress={() => navigation.navigate('Favorites')}
          color="#bada55"
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
