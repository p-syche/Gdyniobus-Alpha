import React from 'react';
import {View, Text} from 'react-native';

const AppHeader = (props) => {
  const {children} = props;
  // console.log('what do i have in the proprs?', props.children);
  return (
    <View>
      <Text>Gdyniobus?????</Text>
      <Text>{children}</Text>
    </View>
  );
};

export default AppHeader;
