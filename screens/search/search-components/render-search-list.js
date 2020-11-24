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

const RenderSearchList = () => {
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
            <Text style={styles.searchListItemText}>{name.routeShortName}</Text>
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

const styles = StyleSheet.create({
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

export default RenderSearchList;
