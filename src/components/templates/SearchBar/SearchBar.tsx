// eslint-disable-next-line import/no-extraneous-dependencies
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import movieStore from '@/store/MovieStore';

const SearchBar = observer(() => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('handleSearch');
    movieStore.fetchMovies(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleSearch}
        placeholder="Search..."
        style={styles.input}
        value={query}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    padding: 10,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
  },
});

export default SearchBar;
