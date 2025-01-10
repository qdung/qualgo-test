export interface RawMovie {
  '#ACTORS': string;
  '#AKA': string;
  '#IMDB_ID': string;
  '#IMDB_IV': string;
  '#IMDB_URL': string;
  '#IMG_POSTER': string;
  '#RANK': number;
  '#TITLE': string;
  '#YEAR': number;
  photo_height: number;
  photo_width: number;
}

export interface Movie {
  actors: string;
  aka: string;
  imdbId: string;
  imdbIv: string;
  imdbUrl: string;
  imgPoster: string;
  photoHeight: number;
  photoWidth: number;
  rank: number;
  title: string;
  year: number;
}
