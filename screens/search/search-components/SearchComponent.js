import React, {useMemo, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from 'react-native';
import RenderSearchList from './render-search-list';
import SearchTextInput from './search-input';
import SelectTypeButtons from './select-type-buttons';

const SearchComponent = (props) => {
  const {
    clampedScroll,
    searchedTerm,
    setSearchedTerm,
    listOfCurrentItems,
    setSearchFor,
    searchFor,
  } = props;
  const [textInputFocussed, setTextInputFocussed] = useState(false);
  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -250],
    extrapolate: 'clamp',
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const temporarySearchResults = useMemo(() => {
    const list = listOfCurrentItems.filter((name) => {
      return name.routeShortName.includes(searchTerm);
    });
    return list;
  }, [searchTerm]);

  const handleBlur = () => {
    setTextInputFocussed(false);
    setSearchedTerm(searchTerm);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: searchBarTranslate,
            },
          ],
        },
      ]}>
      <Animated.View
        style={[
          styles.searchContainer,
          {
            transform: [
              {
                translateY: searchBarTranslate,
              },
            ],
            opacity: searchBarOpacity,
          },
        ]}>
        <SearchTextInput
          searchedTerm={searchedTerm}
          setTextInputFocussed={setTextInputFocussed}
          setSearchTerm={setSearchTerm}
          setSearchedTerm={setSearchedTerm}
          handleBlur={handleBlur}
        />
      </Animated.View>
      <SelectTypeButtons setSearchFor={setSearchFor} searchFor={searchFor} />
      {textInputFocussed && (
        <ScrollView
          style={{
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            top: 50,
            left: 0,
            zIndex: 9999,
            width: 300,
            height: 600,
          }}>
          {searchTerm.length > 0 ? (
            <RenderSearchList temporarySearchResults={temporarySearchResults} />
          ) : null}
        </ScrollView>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -20,
    height: 200,
    width: '100%',
    backgroundColor: 'rgba(87, 44, 216, 0.09)',
    display: 'flex',
    flex: 1,
    borderBottomRightRadius: 55,
    borderBottomLeftRadius: 55,
  },
  searchContainer: {
    padding: 20,
  },
  formField: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    fontSize: 18,
    height: 50,
    margin: 10,
  },
});

export default SearchComponent;
