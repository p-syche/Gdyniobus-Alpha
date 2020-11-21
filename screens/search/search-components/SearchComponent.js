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
} from 'react-native';

const SearchComponent = (props) => {
  const {
    clampedScroll,
    searchedTerm,
    setSearchedTerm,
    listOfCurrentItems,
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
  const renderSearchList = () => {
    return (
      <View style={styles.searchList}>
        {temporarySearchResults.length === 0 && (
          <View style={styles.searchListItem}>
            <Text style={styles.searchListItemText}>No match found</Text>
          </View>
        )}
        {temporarySearchResults.slice(0, 3).map((name, index) => {
          return (
            <View key={index} style={styles.searchListItem}>
              <Text style={styles.searchListItemText}>
                {name.routeShortName}
              </Text>
            </View>
          );
        })}
        {temporarySearchResults.length !== 0 && (
          <TouchableOpacity onPress={() => setSearchedTerm(searchTerm)}>
            <View style={styles.searchListItem}>
              <Text
                style={[
                  styles.searchListItemText,
                  {
                    color: '#ff5d51',
                  },
                ]}>
                See all ({temporarySearchResults.length}) names
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
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
          opacity: searchBarOpacity,
        },
      ]}>
      <TextInput
        defaultValue={searchedTerm}
        placeholder="Search"
        style={styles.formField}
        placeholderTextColor={'#888888'}
        onFocus={() => setTextInputFocussed(true)}
        onBlur={handleBlur}
        onChange={(event) => setSearchTerm(event.nativeEvent.text)}
        returnKeyType="send"
        onSubmitEditing={() => setSearchedTerm(searchTerm)}
      />
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
          {searchTerm.length > 0 && renderSearchList()}
        </ScrollView>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    width: 140,
    left: 20,
    zIndex: 99,
    backgroundColor: 'white',
  },
  formField: {
    backgroundColor: '#F4F4F4',
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    fontSize: 18,
    height: 50,
  },
  searchList: {
    paddingLeft: 16,
  },
  searchListItem: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    paddingRight: 16,
    borderColor: '#DBDBDB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchListItemText: {
    fontSize: 20,
    maxWidth: '85%',
  },
});

export default SearchComponent;
