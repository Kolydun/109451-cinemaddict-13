import Abstract from "./abstract";

const createPopupTemplate = (card) => {
  const {poster, title, originalTitle, rating, director, actors, time, country, description, year, release, genre, comments, isWatchlist, isHistory, isFavorites} = card;

  const isFavorite = isFavorites === true
    ? `film-card__controls-item--active`
    : ``;

  const isAlreadyWatched = isHistory === true
    ? `film-card__controls-item--active`
    : ``;

  const isOnWatchlist = isWatchlist === true
    ? `film-card__controls-item--active`
    : ``;

  return `<section class="film-details">
<div style="position: absolute; left:0; top:0; bottom:0; width: 100%"></div>
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="">

              <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${release + ` ` + year}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${time}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genre.length > 1 ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">Drama</span>
                  <span class="film-details__genre">Film-Noir</span>
                  <span class="film-details__genre">Mystery</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
            ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${isOnWatchlist}">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
              <label for="watched" class="film-details__control-label film-details__control-label--watched ${isAlreadyWatched}">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
                <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${isFavorite}">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list"></ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                    <label class="film-details__emoji-label" for="emoji-puke">
                      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                    </label>

                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends Abstract {
  constructor(cards) {
    super();
    this._cards = cards;

    this._addPopupCloseButtonHandler = this._addPopupCloseButtonHandler.bind(this);
    this._favouritesClickHandler = this._favouritesClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  _favouritesClickHandler() {
    this._callback.favouritesClick();
  }

  _historyClickHandler() {
    this._callback.historyClick();
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick();
  }

  getTemplate() {
    return createPopupTemplate(this._cards);
  }

  _addPopupCloseButtonHandler() {
    this._callback.click();
  }

  setFavoritesClickHandler(callback) {
    this._callback.favouritesClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favouritesClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._historyClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }

  setPopupCloseButtonHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._addPopupCloseButtonHandler);
  }

  deletePopupCloseButtonHandler() {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._addPopupCloseButtonHandler);
  }
}
