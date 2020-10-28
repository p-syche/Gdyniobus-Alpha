import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import BusItem from './bus-item';
import StopItem from './stop-item';

const ListOfItems = ({typeOfItem, itemData}) => {
  const [itemUniqueId, setItemUniqueId] = useState({});

  const renderBusItems = ({item}) => <BusItem item={item} />;
  const renderStopItems = ({item}) => <StopItem item={item} />;

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{typeOfItem}</Text>
      {itemData !== undefined && typeOfItem === 'bus' ? (
        <FlatList
          data={itemData}
          renderItem={renderBusItems}
          keyExtractor={(item) => item.uniqueId}
        />
      ) : (
        <FlatList
          data={itemData}
          renderItem={renderStopItems}
          keyExtractor={(item) => item.stopShortName}
        />
      )}
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

export default ListOfItems;
