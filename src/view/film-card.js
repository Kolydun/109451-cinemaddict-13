import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Component from "./component";

dayjs.extend(duration);

const createFilmCardTemplate = (card) => {
  const {title, poster, description, time, genre, rating} = card.filmInfo;
  const {comments} = card;
  const {isWatchlist, isHistory, isFavorite} = card.userDetails;
  const {releaseDate} = card.filmInfo.release;

  const favoriteAddedClass = isFavorite
    ? `film-card__controls-item--active`
    : ``;

  const historyAddedClass = isHistory
    ? `film-card__controls-item--active`
    : ``;

  const watchlistAddedClass = isWatchlist
    ? `film-card__controls-item--active`
    : ``;

  const runTime = (runTimeInMinutes) => {
    const runTimeDuration = dayjs.duration(runTimeInMinutes, `minute`);
    return runTimeDuration.format(`H`) + `h ` + runTimeDuration.format(`mm`) + `m`;
  };

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dayjs(releaseDate).format(`YYYY`)}</span>
            <span class="film-card__duration">${runTime(time)}</span>
            <span class="film-card__genre">${genre.join(`, `)}</span>
          </p>
          <img src=${poster} alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistAddedClass}" type="button">
            Add to watchlist
            </button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${historyAddedClass}" type="button">
            Mark as watched
            </button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteAddedClass}" type="button">
            Mark as favorite
            </button>
          </div>
        </article>`;
};


export default class FilmCard extends Component {
  constructor(card) {
    super();
    this._card = card;

    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._addPopupHandler = this._addPopupHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _favouriteClickHandler() {
    this._callback.favouritesClick();
  }

  _historyClickHandler() {
    this._callback.historyClick();
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick();
  }

  _addPopupHandler(evt) {
    this._callback.click(evt);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favouritesClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favouriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._historyClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }

  setAddPopupHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._addPopupHandler);
  }

  deleteAddPopupHandler() {
    this.getElement().removeEventListener(`click`, this._addPopupHandler);
  }
}
