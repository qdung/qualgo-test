import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';
import type { Movie } from '@/store/types';

export type RootStackParamList = {
  [Paths.Home]: undefined;
  [Paths.MovieDetail]: { movie: Movie };
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
