import type { ViewStyle } from 'react-native';

import debounce from 'lodash/debounce';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';

import { useTheme } from '@/theme';

import movieStore from '@/store/MovieStore';

const SearchBar = observer(({ style }: { style?: ViewStyle }) => {
  const [query, setQuery] = useState('');
  const { borders, fonts, gutters, layout, variant } = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        movieStore.fetchMovies(searchQuery);
      }
    }, 300),
    [],
  );

  const handleChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <View style={[gutters.padding_12, layout.flex_1, style]}>
      <TextInput
        onChangeText={handleChange}
        placeholder="Search..."
        placeholderTextColor={variant === 'default' ? 'gray' : 'white'}
        style={[
          borders.gray800,
          borders.rounded_16,
          borders.w_1,
          gutters.padding_12,
          fonts.gray800,
        ]}
        value={query}
      />
    </View>
  );
});

export default SearchBar;
