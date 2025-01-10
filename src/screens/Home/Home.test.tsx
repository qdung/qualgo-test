import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import i18n from '@/translations';

import movieStore from '@/store/MovieStore';

import Home from './Home';

jest.mock('@/store/MovieStore', () => ({
  error: null,
  fetchMovies: jest.fn(),
  isLoading: false,
  movies: [],
}));

describe('Home', () => {
  let storage: MMKV;
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
      },
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  });

  beforeAll(() => {
    storage = new MMKV();
  });

  it('renders correctly', () => {
    const component = (
      <SafeAreaProvider>
        <ThemeProvider storage={storage}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <Home />
            </QueryClientProvider>
          </I18nextProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );

    const { getByTestId } = render(component);
    expect(getByTestId('search-bar')).toBeTruthy();
  });

  it('calls fetchMovies on mount', () => {
    render(<Home />);
    expect(movieStore.fetchMovies).toHaveBeenCalledWith('asd');
  });

  it('renders empty state when no movies', () => {
    movieStore.movies = [];
    const { queryByTestId } = render(<Home />);
    expect(queryByTestId('movie-list')).toBeNull();
  });

  it('renders FlatList with correct number of items', () => {
    const mockMovies = [
      {
        imdbId: '1',
        imgPoster: 'url1',
        rank: 1,
        title: 'Movie 1',
        year: 2021,
      },
      {
        imdbId: '2',
        imgPoster: 'url2',
        rank: 2,
        title: 'Movie 2',
        year: 2022,
      },
    ];

    movieStore.movies = mockMovies;
    const { getAllByTestId } = render(<Home />);
    expect(getAllByTestId('movie-item')).toHaveLength(2);
  });

  it('displays loading state', () => {
    movieStore.isLoading = true;
    const { getByText } = render(<Home />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('displays error message', () => {
    movieStore.error = 'An error occurred';
    const { getByText } = render(<Home />);
    expect(getByText('An error occurred')).toBeTruthy();
  });

  it('displays movie items', async () => {
    const mockMovies = [
      {
        imdbId: 'tt19498174',
        imgPoster:
          'https://m.media-amazon.com/images/M/MV5BY2EyYjZlYWItMTdhZi00Njk2LTlhOTMtZDBhMDNhMWU1YjQxXkEyXkFqcGc@._V1_.jpg',
        rank: 33,
        title: 'ASD Band: The Movie',
        year: 2022,
      },
    ];

    movieStore.movies = mockMovies;
    const { getByText, getByTestId } = render(<Home />);

    await waitFor(() => {
      expect(getByText('ASD Band: The Movie')).toBeTruthy();
      expect(getByText('2022')).toBeTruthy();
      expect(getByText('Rank: 33')).toBeTruthy();
      expect(getByTestId('movie-poster').props.source.uri).toBe(
        mockMovies[0].imgPoster,
      );
    });
  });
});
