import type { Movie } from '@/store/types';

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const { backgrounds, borders, gutters, layout, variant } = useTheme();

  return (
    <TouchableOpacity style={[layout.row, gutters.marginBottom_12]}>
      <Image
        height={96}
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
