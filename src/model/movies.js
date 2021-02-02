import Observer from "../utils/observer";

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign({}, movie, {
      id: movie.id,
      comments: movie.comments,
      filmInfo: {
        title: movie.film_info.title,
        originalTitle: movie.film_info.alternative_title,
        poster: movie.film_info.poster,
        description: movie.film_info.description,
        ageRating: movie.film_info.age_rating,
        release: {
          releaseDate: movie.film_info.release.date,
          country: movie.film_info.release.release_country,
        },
        rating: movie.film_info.total_rating,
        time: movie.film_info.runtime,
        genre: movie.film_info.genre,
        director: movie.film_info.director,
        screenwriter: movie.film_info.writers,
        actors: movie.film_info.actors,
      },
      userDetails: {
        allFilms: true,
        watchingDate: movie.user_details.watching_date,
        isWatchlist: movie.user_details.watchlist,
        isHistory: movie.user_details.already_watched,
        isFavorite: movie.user_details.favorite,
      },
    });

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign({}, movie, {
      "id": movie.id,
      "comments": movie.comments,
      "film_info": {
        "title": movie.filmInfo.title,
        "alternative_title": movie.filmInfo.originalTitle,
        "total_rating": movie.filmInfo.rating,
        "poster": movie.filmInfo.poster,
        "age_rating": movie.filmInfo.ageRating,
        "director": movie.filmInfo.director,
        "writers": movie.filmInfo.screenwriter,
        "actors": movie.filmInfo.actors,
        "release": {
          "date": movie.filmInfo.release.releaseDate,
          "release_country": movie.filmInfo.release.country
        },
        "runtime": movie.filmInfo.time,
        "genre": movie.filmInfo.genre,
        "description": movie.filmInfo.description
      },
      "user_details": {
        "watchlist": movie.userDetails.isWatchlist,
        "already_watched": movie.userDetails.isHistory,
        "watching_date": movie.userDetails.watchingDate,
        "favorite": movie.userDetails.isFavorite
      }
    });

    delete adaptedMovie.filmInfo;
    delete adaptedMovie.userDetails;

    return adaptedMovie;
  }
}
