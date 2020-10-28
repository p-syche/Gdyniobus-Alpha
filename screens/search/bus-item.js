import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import BusDetails from './bus-details';

const BusItem = ({item, navigation}) => {
  // const busVectorIcon = <Icon name="bus" size={30} color="#900" />;
  const busVectorIcon = <Text>BUS</Text>;

  // console.log('and the item is?', item);

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate('BusDetails', {
            item: item,
          });
        }}>
        <Text style={styles.title}>{item.routeShortName}</Text>
        {item.agencyId === 6 ? busVectorIcon : null}
        <Text style={styles.title}>{item.routeLongName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BusItem;
