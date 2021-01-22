import Popup from "../view/popup";
import FilmCard from "../view/film-card";
// import FilmComment from "../view/comments";
import {render, RenderPosition, replace, remove} from "../view/utils";

export default class FilmCardPresenter {
  constructor(footer, filmListContainer, changeData) {
    this._footer = footer;
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._closePopupControlsHandler = this._closePopupControlsHandler.bind(this);
  }

  init(card) {
    const prevFilmCard = this._filmCardComponent;
    const prevPopup = this._popupComponent;

    this._filmCard = card;
    this._filmCardComponent = new FilmCard(card);
    this._popupComponent = new Popup(card);

    this._filmCardComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    this._filmCardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    this._popupComponent.setPopupFavoritesClickHandler(this._handleFavoritesClick);
    this._popupComponent.setPopupHistoryClickHandler(this._handleHistoryClick);
    this._popupComponent.setPopupWatchlistClickHandler(this._handleWatchlistClick);

    if (prevFilmCard === null) {
      this._renderFilmCard();
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmCardComponent, prevFilmCard);
      this._openPopupControls();
    }

    if (this._footer.contains(prevPopup.getElement())) {
      replace(this._popupComponent, prevPopup);
      this._closePopupControlsHandler(true);
      this._popupComponent.addComment();
    }

    remove(prevFilmCard);
    remove(prevPopup);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _renderSmallCard() {
    const filmsListContainer = this._filmListContainer.getElement().querySelector(`.films-list__container`);
    render(filmsListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    this._openPopupControls();
  }

  _addPopup() {
    this._footer.appendChild(this._popupComponent.getElement());
    this._popupComponent.addComment();
    this._closePopupControlsHandler();
  }

  _closePopupControlsHandler(isReload) {
    const removeChildElement = () => {
      this._popupComponent.reset(this._filmCard);
      this._popupComponent.deletePopupCloseButtonHandler();
      window.removeEventListener(`keydown`, onEscKeydown);
      remove(this._popupComponent);
    };

    const onEscKeydown = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        window.removeEventListener(`keydown`, onEscKeydown);
        removeChildElement();
      }
    };

    if (!isReload) {
      window.addEventListener(`keydown`, onEscKeydown);
      this._popupComponent.restoreHandlers();
    }

    this._popupComponent.setPopupCloseButtonHandler(() => {
      removeChildElement();
    });
    this._popupComponent.setPopupFavoritesClickHandler(this._handleFavoritesClick);
    this._popupComponent.setPopupHistoryClickHandler(this._handleHistoryClick);
    this._popupComponent.setPopupWatchlistClickHandler(this._handleWatchlistClick);
  }

  _openPopupControls() {
    const posters = this._filmCardComponent.getElement().querySelector(`.film-card__poster`);
    const title = this._filmCardComponent.getElement().querySelector(`.film-card__title`);
    const comments = this._filmCardComponent.getElement().querySelector(`.film-card__comments`);

    this._filmCardComponent.setAddPopupHandler((evt) => {
      const popup = this._footer.querySelector(`.film-details`);
      if (evt.target === posters || evt.target === title || evt.target === comments) {
        if (!popup) {
          this._addPopup();
        } else {
          replace(this._popupComponent, popup);
          this._addPopup();
        }
      }
    });
  }

  _renderFilmCard() {
    this._renderSmallCard();
  }

  _handleFavoritesClick() {
    this._changeData(Object.assign({}, this._filmCard, {isFavorite: !this._filmCard.isFavorite}));
  }

  _handleHistoryClick() {
    this._changeData(Object.assign({}, this._filmCard, {isHistory: !this._filmCard.isHistory}));
  }

  _handleWatchlistClick() {
    this._changeData(Object.assign({}, this._filmCard, {isWatchlist: !this._filmCard.isWatchlist}));
  }
}
