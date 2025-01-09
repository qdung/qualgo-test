import { action, computed, makeObservable, observable } from 'mobx';

interface Movie {
  id: number;
  title: string;
}

class MovieStore {
  movies: Movie[] = [];
  query: string = '';

  constructor() {
    makeObservable(this, {
      fetchMovies: action,
      filteredMovies: computed,
      movies: observable,
      query: observable,
      setQuery: action,
    });
  }

  async fetchMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${this.query}&api_key=YOUR_TMDB_API_KEY`,
      );
      const data = await response.json();
      this.movies = data.results;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching movies:', error);
    }
  }

  setQuery(query: string) {
    this.query = query;
    this.fetchMovies();
  }

  get filteredMovies() {
    return this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.query.toLowerCase()),
    );
  }
}

const movieStore = new MovieStore();
export default movieStore;
