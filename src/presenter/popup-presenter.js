import {remove, replace} from "../utils/utils";
import {UpdateType, UserAction} from "../utils/const";
import CommentPresenter from "./comment-presenter";
import Popup from "../view/popup";

export default class PopupPresenter {
  constructor(footer, changeData, commentsModel, api) {
    this._commentsModel = commentsModel;
    this._footer = footer;
    this._changeData = changeData;
    this._popupComponent = null;
    this._api = api;

    this._closePopupControlsHandler = this._closePopupControlsHandler.bind(this);

    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);

    this._addComments = this._addComments.bind(this);

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
  }

  init(card) {
    const prevPopup = this._popupComponent;

    this._filmCard = card;
    this._getFilmCommentsFromServer(this._filmCard.id);
    this._popupComponent = new Popup(card, this._commentsModel);

    if (prevPopup === null) {
      this._addPopup();
      return;
    }

    if (this._footer.contains(prevPopup.getElement())) {
      replace(this._popupComponent, prevPopup);
      this._closePopupControlsHandler(true);
      this._addComments();
    }

    remove(prevPopup);
  }

  _addPopup() {
    this._footer.appendChild(this._popupComponent.getElement());
    this._addComments();
    this._closePopupControlsHandler();
  }

  _addComments() {
    const commentsContainer = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    const comments = this._commentsModel.getComments();

    comments.forEach((comment) => {
      const commentPresenter = new CommentPresenter(commentsContainer);
      commentPresenter.init(comment);
    });
  }

  _getFilmCommentsFromServer(filmId) {
    this._api.getComments(filmId)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._popupComponent.updateElement();
      })
      .catch(() => {
        this._commentsModel.setComments([]);
      });
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
    this._popupComponent.setAddComments(this._addComments);

    this._popupComponent.setCommentDelete(this._handleCommentDeleteClick);
    this._popupComponent.setOnFormSubmit(this._handleSubmitForm);
  }

  _handleFavoritesClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.PATCH,
        Object.assign({}, this._filmCard, {isFavorite: !this._filmCard.isFavorite}));
  }

  _handleHistoryClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.PATCH,
        Object.assign({}, this._filmCard, {isHistory: !this._filmCard.isHistory}));
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.PATCH,
        Object.assign({}, this._filmCard, {isWatchlist: !this._filmCard.isWatchlist}));
  }

  _handleCommentDeleteClick(commentIndex) {
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MAJOR_POPUP,
        parseInt(commentIndex, 10)
    );
    this._updateFilmCommentInfo();

    return this._commentsModel.getComments().length;
  }

  _handleSubmitForm(newComment) {
    this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.MAJOR_POPUP,
        newComment
    );
    this._updateFilmCommentInfo();

    return this._commentsModel.getComments().length;
  }

  _updateFilmCommentInfo() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.PATCH,
        Object.assign({}, this._filmCard, {comments: this._commentsModel.getComments()}));
  }
}
