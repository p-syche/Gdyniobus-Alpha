import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const SelectTypeButtons = (props) => {
  const {setSearchFor, searchFor} = props;
  const theme = useTheme(defaultTheme);
  const [isActive, setIsActive] = useState(searchFor);

  useEffect(() => {
    setIsActive(searchFor);
  }, [searchFor]);

  return (
    <View style={styles.buttons}>
      <Pressable
        style={styles.pressableWrap}
        onPress={() => setSearchFor('bus')}>
        <View
          style={[
            styles.iconWrap,
            isActive === 'bus' ? styles.activeIcon : styles.inactiveIcon,
            {borderColor: theme.blue.light},
          ]}>
          <Icon
            name="bus"
            size={35}
            color={isActive === 'bus' ? '#ffffff' : theme.blue.primary}
          />
        </View>
        <Text
          style={[
            isActive === 'bus' ? styles.activeText : styles.inactiveText,
            {color: theme.blue.primary},
          ]}>
          Autobusy
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressableWrap}
        onPress={() => setSearchFor('stops')}>
        <View
          style={[
            styles.iconWrap,
            isActive === 'stops' ? styles.activeIcon : styles.inactiveIcon,
            {borderColor: theme.blue.light},
          ]}>
          <Icon
            name="bus-stop-covered"
            size={35}
            color={isActive === 'stops' ? '#ffffff' : theme.blue.primary}
          />
        </View>
        <Text
          style={[
            isActive === 'stops' ? styles.activeText : styles.inactiveText,
            {color: theme.blue.primary},
          ]}>
          Przystanki
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
  },
  pressableWrap: {
    marginRight: 15,
    marginLeft: 15,
    display: 'flex',
    alignItems: 'center',
  },
  iconWrap: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  activeIcon: {
    backgroundColor: '#572cd8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inactiveIcon: {
    backgroundColor: '#ffffff',
  },
  activeText: {
    fontFamily: 'Lato-Bold',
  },
  inactiveText: {
    fontFamily: 'Lato-Regular',
  },
});

export default SelectTypeButtons;
