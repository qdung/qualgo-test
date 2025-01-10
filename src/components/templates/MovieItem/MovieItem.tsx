import type { Movie } from '@/store/types';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { navigateTo } from '@/navigation/Application';
import { Paths } from '@/navigation/paths';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const { backgrounds, borders, gutters, layout, variant } = useTheme();

  const navigation = useNavigation();

  const placeholderImg = require('@/theme/assets/images/tom.png');

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const navigateToDetailSreen = () => (movie: Movie) =>
    navigateTo(Paths.MovieDetail, movie);

  return (
    <TouchableOpacity
      onPress={() => navigateTo(Paths.MovieDetail, movie)}
      style={[layout.row, gutters.marginBottom_12]}
    >
      <Image
        defaultSource={placeholderImg}
        height={96}
        // eslint-disable-next-line no-console
        onError={(error) =>
          // eslint-disable-next-line no-console
          console.error('Image loading error:', movie.imgPoster)
        }
        source={{ uri: movie.imgPoster }}
        style={[borders.rounded_16]}
        width={124}
      />
      <View style={[gutters.marginLeft_12, layout.justifyAround]}>
        <Text style={[]}>{movie.title}</Text>
        <Text>{movie.year}</Text>
        <Text>Rank: {movie.rank}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;
