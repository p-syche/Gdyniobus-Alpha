import React, {useState} from 'react';
import {Animated, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoaderComponent from './LoaderComponent';
import SearchComponent from './SearchComponent';
import ListsOfItems from './lists-of-items';

console.disableYellowBox = true;

const SearchWrap = () => {
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
  const array = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];
  return (
    <Animated.View>
      <SafeAreaView>
        <SearchComponent clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 20,
            backgroundColor: 'white',
            paddingTop: 55,
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
            {useNativeDriver: false},
            () => {}, // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic">
          {array.map((item, key) => (
            <LoaderComponent key={item + '_' + key} />
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default SearchWrap;
