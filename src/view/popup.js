import he from "he";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Smart from "./smart";
import {getDate} from "../utils/utils";
import {createRandomId} from "../utils/utils";
import {ENTER} from "../utils/const";

dayjs.extend(duration);

const createPopupTemplate = (data) => {
  const {poster, title, originalTitle, rating, director, actors, time, description, genre, ageRating} = data.filmInfo;
  const {userEmoji, userCommentText, commentsNumber} = data;
  const {isFavorite, isHistory, isWatchlist} = data.userDetails;
  const {country, releaseDate} = data.filmInfo.release;

  function emojiNameRule() {
    let altName = null;
    if (userEmoji === `angry`) {
      altName = `angry`;
    } else if (userEmoji === `smile`) {
      altName = `smile`;
    } else if (userEmoji === `puke`) {
      altName = `puke`;
    } else {
      altName = `sleeping`;
    }

    return altName;
  }

  const emojiAdded = userEmoji
    ? `<img src="./images/emoji/${userEmoji}.png" width="55" height="55" alt="emoji-${emojiNameRule()}">`
    : ``;

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

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="">
              <p class="film-details__age">${ageRating}+</p>
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
                <td class="film-details__cell">${dayjs(releaseDate).format(`D MMMM YYYY`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runTime(time)}</td>
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
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${watchlistAddedClass}">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
              <label for="watched" class="film-details__control-label film-details__control-label--watched ${historyAddedClass}">Already watched</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
                <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${favoriteAddedClass}">Add to favorites</label>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsNumber}</span></h3>
          <ul class="film-details__comments-list"></ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${emojiAdded}</div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(userCommentText)}</textarea>
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

export default class Popup extends Smart {
  constructor(card, commentsModel) {
    super();
    this._comments = commentsModel.getComments();
    this._data = Popup.parseCardToData(card);

    this._addPopupCloseButtonHandler = this._addPopupCloseButtonHandler.bind(this);
    this._favouritesClickHandler = this._favouritesClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);

    this._angryEmojiClickHandler = this._angryEmojiClickHandler.bind(this);
    this._smileEmojiClickHandler = this._smileEmojiClickHandler.bind(this);
    this._pukeEmojiClickHandler = this._pukeEmojiClickHandler.bind(this);
    this._sleepingEmojiClickHandler = this._sleepingEmojiClickHandler.bind(this);
    this._commentTextHandler = this._commentTextHandler.bind(this);

    this._addCommentsCallback = this._addCommentsCallback.bind(this);

    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(card) {
    this.updateData(Popup.parseDataToCard(card));
  }

  _commentTextHandler(evt) {
    evt.preventDefault();
    this.updateData({userCommentText: evt.target.value}, true);
  }

  _angryEmojiClickHandler() {
    this.updateData({
      userEmoji: `angry`,
    });
  }

  _smileEmojiClickHandler() {
    this.updateData({
      userEmoji: `smile`,
    });
  }

  _pukeEmojiClickHandler() {
    this.updateData({
      userEmoji: `puke`,
    });
  }

  _sleepingEmojiClickHandler() {
    this.updateData({
      userEmoji: `sleeping`,
    });
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    const newCommentsNumber = this._callback.commentDeleteClick(evt.target.dataset.id);
    this.updateData({
      commentsNumber: newCommentsNumber,
    });
  }

  _onFormSubmitHandler(evt) {
    if (evt.keyCode === ENTER && (evt.ctrlKey || evt.metaKey)) {
      const newComment = {
        id: createRandomId(),
        comment: this._data.userCommentText,
        emotion: this._data.userEmoji,
        author: `Посетитель`,
        date: getDate(),
      };

      const newCommentsNumber = this._callback.onFormSubmit(newComment);

      this.updateData({
        userEmoji: ``,
        userCommentText: ``,
        commentsNumber: newCommentsNumber,
      });
    }
  }

  _addCommentsCallback() {
    this._callback.addComments();
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

  _addPopupCloseButtonHandler() {
    this._callback.closeClick();
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._comments);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setPopupCloseButtonHandler(this._callback.closeClick);
    this.setPopupFavoritesClickHandler(this._callback.favouritesClick);
    this.setPopupHistoryClickHandler(this._callback.historyClick);
    this.setPopupWatchlistClickHandler(this._callback.watchlistClick);
  }

  restoreAdditionalElements() {
    this._addCommentsCallback();
    this.setCommentDelete(this._callback.commentDeleteClick);
    this.setOnFormSubmit(this._callback.onFormSubmit);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`label[for="emoji-angry"]`)
      .querySelector(`img`)
      .addEventListener(`click`, this._angryEmojiClickHandler);

    this.getElement()
      .querySelector(`label[for="emoji-smile"]`)
      .querySelector(`img`)
      .addEventListener(`click`, this._smileEmojiClickHandler);

    this.getElement()
      .querySelector(`label[for="emoji-puke"]`)
      .querySelector(`img`)
      .addEventListener(`click`, this._pukeEmojiClickHandler);

    this.getElement()
      .querySelector(`label[for="emoji-sleeping"]`)
      .querySelector(`img`)
      .addEventListener(`click`, this._sleepingEmojiClickHandler);

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentTextHandler);
  }

  setOnFormSubmit(callback) {
    this._callback.onFormSubmit = callback;
    this.getElement().addEventListener(`keydown`, this._onFormSubmitHandler);
  }

  setCommentDelete(callback) {
    this._callback.commentDeleteClick = callback;
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    deleteButtons.forEach((button) => {
      button.addEventListener(`click`, this._commentDeleteClickHandler);
    });
  }

  setAddComments(callback) {
    this._callback.addComments = callback;
  }

  setPopupFavoritesClickHandler(callback) {
    this._callback.favouritesClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favouritesClickHandler);
  }

  setPopupHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._historyClickHandler);
  }

  setPopupWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }

  setPopupCloseButtonHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._addPopupCloseButtonHandler);
  }

  deletePopupCloseButtonHandler() {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._addPopupCloseButtonHandler);
  }

  static parseCardToData(card) {
    return Object.assign({}, card, {userEmoji: ``, userCommentText: ``, commentsNumber: card.comments.length});
  }

  static parseDataToCard(data) {
    data = Object.assign({}, data);

    delete data.userEmoji;
    delete data.userCommentText;

    return data;
  }
}
