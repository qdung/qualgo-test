/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import type { Movie } from '@/store/types';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
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
  const {
    backgrounds,
    borders,
    changeTheme,
    colors,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  const [refresh, setRefresh] = useState(false);

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const onRefresh = () => {
    setRefresh(true);
    movieStore.fetchRandomMovies();
    setRefresh(false);
  };

  useEffect(() => {
    movieStore.fetchRandomMovies();
  }, []);

  return (
    <SafeScreen>
      <View style={[layout.flex_1, gutters.paddingTop_12, backgrounds.gray100]}>
        <View
          style={[
            layout.row,
            layout.justifyBetween,
            layout.itemsCenter,
            gutters.paddingRight_12,
          ]}
        >
          <SearchBar />
          <TouchableOpacity
            onPress={onChangeTheme}
            style={[
              borders.w_1,
              gutters.padding_12,
              borders.rounded_16,
              borders.gray800,
              { borderRadius: 100 },
            ]}
          >
            <Text style={[fonts.gray800, fonts.size_16]}>
              {variant === 'default' ? '🌑' : '☀️'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[layout.flex_1]}>
          {movieStore.isLoading ? (
            <Loading />
          ) : movieStore.error ? (
            <Text>{movieStore.error}</Text>
          ) : (
            <FlatList
              data={movieStore.movies}
              getItemLayout={(data, index) => ({
                index,
                length: 120,
                offset: 120 * index,
              })}
              initialNumToRender={10}
              keyExtractor={keyExtractor}
              maxToRenderPerBatch={10}
              refreshControl={
                <RefreshControl
                  onRefresh={onRefresh}
                  refreshing={refresh}
                  tintColor={colors.skeleton}
                />
              }
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

export default Home;
