import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import StopDetails from './stop-details';

const StopItem = ({item, navigation}) => {
  // console.log('and the item is?', item);

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('StopDetails', {
            stopId: item.stopId,
          });
        }}>
        <Text style={styles.title}>{item.stopDesc}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#2DDFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default StopItem;
