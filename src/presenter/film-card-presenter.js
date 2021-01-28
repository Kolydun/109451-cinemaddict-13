
import FilmCard from "../view/film-card";
import {render, replace, remove} from "../utils/utils";
import {RenderPosition, UserAction, UpdateType} from "../utils/const";
import PopupPresenter from "./popup-presenter";

export default class FilmCardPresenter {
  constructor(footer, filmListContainer, changeData, commentsModel) {
    this._commentsModel = commentsModel;
    this._footer = footer;
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;

    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    // this._closePopupControlsHandler = this._closePopupControlsHandler.bind(this);
  }

  init(card) {
    const prevFilmCard = this._filmCardComponent;

    this._filmCard = card;
    this._filmCardComponent = new FilmCard(card);

    this._filmCardComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    this._filmCardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    if (prevFilmCard === null) {
      this._renderSmallCard();
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmCardComponent, prevFilmCard);
      this._openPopupControls();
    }

    remove(prevFilmCard);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _renderSmallCard() {
    const filmsListContainer = this._filmListContainer.getElement().querySelector(`.films-list__container`);
    render(filmsListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    this._openPopupControls();
  }

  _openPopupControls() {
    const posters = this._filmCardComponent.getElement().querySelector(`.film-card__poster`);
    const title = this._filmCardComponent.getElement().querySelector(`.film-card__title`);
    const comments = this._filmCardComponent.getElement().querySelector(`.film-card__comments`);

    this._filmCardComponent.setAddPopupHandler((evt) => {
      const popup = this._footer.querySelector(`.film-details`);
      if (evt.target === posters || evt.target === title || evt.target === comments) {
        if (!popup) {
          this._renderPopup();
        } else {
          this._footer.removeChild(popup);
          this._renderPopup();
        }
      }
    });
  }

  _renderPopup() {
    this._commentsModel.setComments(this._filmCard.comments);
    this._popupPresenter = new PopupPresenter(this._footer, this._changeData, this._commentsModel);
    this._popupPresenter.init(this._filmCard);
  }

  _handleFavoritesClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.MINOR,
        Object.assign({}, this._filmCard, {isFavorite: !this._filmCard.isFavorite}));
  }

  _handleHistoryClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.MINOR,
        Object.assign({}, this._filmCard, {isHistory: !this._filmCard.isHistory}));
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.MINOR,
        Object.assign({}, this._filmCard, {isWatchlist: !this._filmCard.isWatchlist}));
  }
}
