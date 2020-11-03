import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BusItem from './bus-item';
import StopItem from './stop-item';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import {useMachine} from '@xstate/react';
import {busRoutesMachine} from '../../xstate/lista-linii';

const ListsOfItems = ({navigation}) => {
  const [searchFor, setSearchFor] = useState('bus');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [current] = useMachine(busRoutesMachine);
  const {routes, stops} = current.context;
  // console.log('and the routes are?', stops);

  const renderBusItems = ({item}) => (
    <BusItem item={item} navigation={navigation} />
  );
  const renderStopItems = ({item}) => <StopItem item={item} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={wrapperStyles.centered}>
        {current.matches('dataLoaded') ? (
          <View style={[wrapperStyles.centered, {paddingTop: 50}]}>
            <Text>Choose either bus or bus stop</Text>
            <Text>Will add search here....</Text>

            <View style={styles.buttons}>
              <Button title="Autobusy" onPress={() => setSearchFor('bus')} />
              <Button title="Przystanki" onPress={() => setSearchFor('stop')} />
            </View>
            <View />
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
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ListsOfItems;
