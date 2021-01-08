import Abstract from "./abstract";

const createFilmCardTemplate = (card) => {
  const {title, poster, description, year, time, genre, rating, comments, watchlist, alreadyWatched, favorite} = card;

  const isFavorite = favorite === true
    ? `film-card__controls-item--active`
    : ``;

  const isAlreadyWatched = alreadyWatched === true
    ? `film-card__controls-item--active`
    : ``;

  const isOnWatchlist = watchlist === true
    ? `film-card__controls-item--active`
    : ``;

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${time}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src=${poster} alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isOnWatchlist}" type="button">
            Add to watchlist
            </button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAlreadyWatched}" type="button">
            Mark as watched
            </button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite}" type="button">
            Mark as favorite
            </button>
          </div>
        </article>`;
};


export default class FilmCard extends Abstract {
  constructor(card) {
    super();
    this._card = card;
    this._addPopupHandler = this._addPopupHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _addPopupHandler(evt) {
    this._callback.click(evt);
  }

  setAddPopupHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._addPopupHandler);
  }

  deleteAddPopupHandler() {
    this.getElement().removeEventListener(`click`, this._addPopupHandler);
  }
}
