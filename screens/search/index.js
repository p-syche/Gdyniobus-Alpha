import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusItem from './bus-item';
import StopItem from './stop-item';

import {getRoutesFromApiAsync} from '../../utils/fetch-bus-data';
import {getStopsFromApiAsync} from '../../utils/fetch-stop-data';

const SearchScreen = ({navigation}) => {
  const [searchFor, setSearchFor] = useState('bus');
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    getRoutesFromApiAsync().then((response) => setRoutes(response));
  }, []);

  useEffect(() => {
    getStopsFromApiAsync().then((response) => setStops(response));
  }, []);

  const renderBusItems = ({item}) => <BusItem item={item} />;
  const renderStopItems = ({item}) => <StopItem item={item} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <Text>Choose either bus or bus stop</Text>
        <View style={styles.buttons}>
          <Button title="Autobusy" onPress={() => setSearchFor('bus')} />
          <Button title="Przystanki" onPress={() => setSearchFor('stop')} />
        </View>
        {searchFor === 'bus' ? (
          <FlatList
            data={routes}
            renderItem={renderBusItems}
            keyExtractor={(item) => item.uniqueId}
          />
        ) : (
          <FlatList
            data={stops}
            renderItem={renderStopItems}
            keyExtractor={(item) => item.stopShortName}
          />
        )}
      </View>
    </SafeAreaView>
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
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SearchScreen;
