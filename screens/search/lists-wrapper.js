import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Button, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {wrapperStyles} from '../../assets/wrapper_stylesheet';

import ListsNavbar from './lists-navbar';
import ListsOfItems from './lists-of-items';

const ListsWrapper = ({navigation}) => {
  const [searchFor, setSearchFor] = useState('bus');

  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
        useNativeDriver: true,
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  );

  return (
    <View style={[wrapperStyles.centered]}>
      <ListsNavbar clampedScroll={clampedScroll} />
      <Text>Choose either bus or bus stop</Text>
      <View style={styles.buttons}>
        <Button title="Autobusy" onPress={() => setSearchFor('bus')} />
        <Button title="Przystanki" onPress={() => setSearchFor('stop')} />
      </View>
      <View />
      <ListsOfItems
        navigation={navigation}
        searchFor={searchFor}
        setScrollYValue={setScrollYValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ListsWrapper;
