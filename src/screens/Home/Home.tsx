/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import type { Movie } from '@/store/types';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/theme';

import { Loading } from '@/components/atoms';
import { MovieItem, SafeScreen, SearchBar } from '@/components/templates';

import movieStore from '@/store/MovieStore';

const keyExtractor = (item: Movie) => item.imdbId;
const Movie = ({ item }: { item: Movie }) => <MovieItem movie={item} />;

const Home = observer(() => {
  const { t } = useTranslation();

  const {
    backgrounds,
    borders,
    changeTheme,
    colors,
    components,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  useEffect(() => {
    movieStore.fetchMovies('asd');
  }, []);

  return (
    <SafeScreen>
      <View style={[layout.flex_1, gutters.paddingTop_12, backgrounds.gray100]}>
        <SearchBar />
        <View style={[]}>
          {movieStore.isLoading ? (
            <Loading />
          ) : movieStore.error ? (
            <Text>{movieStore.error}</Text>
          ) : (
            <FlatList
              data={movieStore.movies}
              getItemLayout={(data, index) => ({
                index,
                length: 100,
                offset: 100 * index,
              })}
              initialNumToRender={10}
              keyExtractor={keyExtractor}
              maxToRenderPerBatch={10}
              removeClippedSubviews={true}
              renderItem={Movie}
              style={[gutters.paddingTop_12, gutters.paddingHorizontal_16]}
              testID="movie-item"
              updateCellsBatchingPeriod={200}
              windowSize={5}
            />
          )}
        </View>
      </View>
    </SafeScreen>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  movieItem: { borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 16 },
  movieTitle: { fontSize: 18 },
  poster: { height: 150, width: 100 },
});

export default Home;
