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
  aka: string;
  imdbId: string;
  imdbIv: string;
  imdbUrl: string;
  imgPoster: string;
  overview: string;
  photoHeight: number;
  photoWidth: number;
  poster_path: string;
  rank: number;
  release_date: string;
  title: string;
  vote_average: number;
  year: number;
}

export interface Actor {
  name: string;
  type: string;
  url: string;
}

interface Review {
  author: { name: string; type: string };
  dateCreated: string;
  inLanguage: string;
  itemReviewed: { type: string; url: string };
  name: string;
  reviewBody: string;
  reviewRating: {
    bestRating: number;
    ratingValue: number;
    type: string;
    worstRating: number;
  };
  type: string;
}

export interface MovieDetail {
  actor: Actor[];
  descrition: string;
  imgPoster: string;
  keywords: string[];
  rating: number;
  review: Review;
  title: string;
}
