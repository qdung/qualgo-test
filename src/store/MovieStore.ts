import type { Movie, RawMovie } from './types';

import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';

class MovieStore {
  error: null | string = null;
  isLoading: boolean = false;
  movies: Movie[] = [];

  constructor() {
    makeObservable(this, {
      error: observable,
      fetchMovies: action,
      isLoading: observable,
      movies: observable,
    });
  }

  async fetchMovies(query: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.get(
        `https://search.imdbot.workers.dev/?q=${query}`,
      );
      runInAction(() => {
        this.movies = response.data.description.map((movie: RawMovie) => ({
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
        }));

        // eslint-disable-next-line no-console
        console.log(response.data.description[0]);
      });
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const movieStore = new MovieStore();
export default movieStore;
