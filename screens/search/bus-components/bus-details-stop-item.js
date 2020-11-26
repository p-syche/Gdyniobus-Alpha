import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {simpleGetStops} from '../../../utils/async-stored-data';
import Icon from 'react-native-vector-icons/EvilIcons';
import StopDetails from '../stop-components/stop-details';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const BusStopDescription = ({stopId}) => {
  const [currentStop, setCurrentStop] = useState(null);
  const theme = useTheme(defaultTheme);

  const isCurrentStop = (value) => {
    return value.stopId === stopId;
  };

  useEffect(() => {
    simpleGetStops().then((result) => {
      const filteredStop = result.find((element) => element.stopId === stopId);
      setCurrentStop(filteredStop);
    });
  }, []);

  return (
    <Text style={[styles.title, {color: theme.blue.primary}]}>
      {currentStop && currentStop.stopDesc}
    </Text>
  );
};

const BusDetailsStopItem = ({item, navigation}) => {
  const theme = useTheme(defaultTheme);

  return (
    <View style={[styles.item, {borderColor: theme.blue.light}]}>
      <Pressable
        onPress={() => {
          navigation.navigate('StopDetails', {
            stopId: item.stopId,
          });
        }}
        style={styles.pressableStop}>
        <BusStopDescription stopId={item.stopId} />
        <Icon
          name="arrow-right"
          size={30}
          color={theme.blue.primary}
          style={styles.searchIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressableStop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Lato-Regular',
  },
});

export default BusDetailsStopItem;
