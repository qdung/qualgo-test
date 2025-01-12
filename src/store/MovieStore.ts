import type { Movie, MovieDetail, RawMovie } from './types';

import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';

import { removeHtmlEntities } from '@/utils/helper';

class MovieStore {
  error: null | string = null;
  isLoading: boolean = false;
  isLoadingDetail: boolean = false;
  movies: Movie[] = [];
  selectedMovie: MovieDetail | null = null;

  constructor() {
    makeObservable(this, {
      error: observable,
      fetchMovies: action,
      fetchRandomMovies: action,
      isLoading: observable,
      movies: observable,
      retrieveMovieDetail: action,
      selectedMovie: observable,
    });
  }

  async fetchMovies(query?: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.get(
        `https://search.imdbot.workers.dev/?q=${query}`,
      );
      runInAction(() => {
        this.movies = response.data.description
          .filter((movie: RawMovie) => movie['#IMG_POSTER'])
          .map((movie: RawMovie) => ({
            actors: movie['#ACTORS'],
            aka: movie['#AKA'],
            imdbId: movie['#IMDB_ID'],
            imdbIv: movie['#IMDB_IV'],
            imdbUrl: movie['#IMDB_URL'],
            imgPoster: movie['#IMG_POSTER'],
            photoHeight: movie['photo_height'],
            photoWidth: movie['photo_width'],
            rank: movie['#RANK'],
            title: movie['#TITLE'],
            year: movie['#YEAR'],
          }))
          .slice(0, 10);
      });
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async fetchRandomMovies() {
    this.isLoading = true;
    this.error = null;
    const randomLetters = 'abcdefghijklmnopqrstuvwxyz';
    const randomChar = randomLetters.charAt(
      Math.floor(Math.random() * randomLetters.length),
    );
    try {
      const response = await axios.get(
        `https://imdb.iamidiotareyoutoo.com/search/?q=${randomChar}`,
      );
      runInAction(() => {
        this.movies = response.data.description
          .filter((movie: RawMovie) => movie['#IMG_POSTER'])
          .map((movie: RawMovie) => ({
            actors: movie['#ACTORS'],
            aka: movie['#AKA'],
            imdbId: movie['#IMDB_ID'],
            imdbIv: movie['#IMDB_IV'],
            imdbUrl: movie['#IMDB_URL'],
            imgPoster: movie['#IMG_POSTER'],
            photoHeight: movie['photo_height'],
            photoWidth: movie['photo_width'],
            rank: movie['#RANK'],
            title: movie['#TITLE'],
            year: movie['#YEAR'],
          }))
          .slice(0, 10);
      });
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async retrieveMovieDetail(selectedMovie: Movie) {
    try {
      this.isLoadingDetail = true;
      const url = `https://imdb.iamidiotareyoutoo.com/search/?tt=${selectedMovie.imdbId}`;

      const response = await axios.get(url);
      const movieDetail = response.data;

      runInAction(() => {
        this.selectedMovie = {
          actor: movieDetail['short']['actor'] || [],
          descrition:
            removeHtmlEntities(movieDetail['short']['description']) || '',
          imgPoster: movieDetail['short']['image'],
          keywords: movieDetail['short']['keywords'],
          rating: movieDetail['short']['aggregateRating']['ratingValue'] || 0,
          review: movieDetail['short']['review'],
          title:
            movieDetail['short']['name'] ??
            movieDetail['short']['alternateName'] ??
            '',
          votes: 2, //movieDetail['short']
        };
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      runInAction(() => {
        this.error = (error as Error).message;
      });
    } finally {
      runInAction(() => {
        this.isLoadingDetail = false;
      });
    }
  }
}

const movieStore = new MovieStore();
export default movieStore;
