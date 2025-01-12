import type { ViewStyle } from 'react-native';
import type { Movie } from '@/store/types';

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { navigateTo } from '@/navigation/Application';
import { Paths } from '@/navigation/paths';

import movieStore from '@/store/MovieStore';

const ITEM_HEIGHT = 120;

const itemHeight: ViewStyle = { height: ITEM_HEIGHT };

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const { borders, fonts, gutters, layout } = useTheme();

  const placeholderImg = require('@/theme/assets/images/tom.png');

  const handlePress = async () => {
    movieStore.retrieveMovieDetail(movie);
    navigateTo(Paths.MovieDetail);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        layout.flex_1,
        layout.row,
        gutters.marginBottom_12,
        gutters.padding_12,
        borders.gray800,
        borders.rounded_16,
        itemHeight,
      ]}
    >
      <Image
        defaultSource={placeholderImg}
        // eslint-disable-next-line no-console
        onError={() =>
          // eslint-disable-next-line no-console
          console.error('Image loading error:', movie.imgPoster)
        }
        resizeMode="cover"
        source={{ uri: movie.imgPoster }}
        style={[borders.rounded_16, { height: '100%', width: 124 }]}
      />
      <View style={[gutters.marginLeft_12, layout.justifyAround, { flex: 1 }]}>
        <Text
          numberOfLines={2}
          style={[layout.wrap, fonts.gray800, fonts.bold]}
        >
          {movie.title}
        </Text>
        <Text style={[fonts.gray800]}>Year: {movie.year}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;
