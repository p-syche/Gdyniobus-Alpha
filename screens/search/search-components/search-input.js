import React, {useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import {defaultTheme} from '../../../assets/color_scheme';
import {createTheming} from '@callstack/react-theme-provider';
const {useTheme} = createTheming(defaultTheme);

const SearchTextInput = (props) => {
  const {
    searchedTerm,
    setTextInputFocussed,
    setSearchTerm,
    setSearchedTerm,
    handleBlur,
  } = props;

  const theme = useTheme(defaultTheme);

  return (
    <View>
      <TextInput
        defaultValue={searchedTerm}
        style={[styles.formField, {borderColor: theme.blue.light}]}
        placeholderTextColor={'#888888'}
        onFocus={() => setTextInputFocussed(true)}
        onBlur={handleBlur}
        onChange={(event) => setSearchTerm(event.nativeEvent.text)}
        returnKeyType="send"
        onSubmitEditing={() => setSearchedTerm(searchTerm)}
      />
      <Icon
        name="search"
        size={30}
        color={theme.blue.primary}
        style={styles.searchIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formField: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    fontSize: 18,
    height: 50,
    margin: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
    top: 23,
  },
});

export default SearchTextInput;
