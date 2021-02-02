import UserRating from "../view/user-rating";
import FilmsNumber from "../view/film-counter";
import SortList from "../view/sort-list";
import NoFilms from "../view/no-films-window";
import FilmCardPresenter from "./film-card-presenter";
import FilmsContainer from "../view/films-container";
import ShowMore from "../view/show-more";
import Stats from "../view/stats";
import Loading from "../view/loading";
import {render, remove, sortRatingUp, sortDateUp, filter} from "../utils/utils";
import {UserAction, UpdateType, SortType, RenderPosition} from "../utils/const";
const FILMS_NUMBER_PER_STEP = 5;

export default class PagePresenter {
  constructor(header, main, footer, moviesModel, filtersModel, commentsModel, api) {
    this._moviesModel = moviesModel;
    this._filtersModel = filtersModel;
    this._commentsModel = commentsModel;
    this._api = api;
    this._header = header;
    this._main = main;
    this._footer = footer;
    this._renderedCardsCount = FILMS_NUMBER_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;

    this._noFilmsComponent = new NoFilms();
    this._loadingComponent = new Loading();
    this._filmsContainerComponent = new FilmsContainer();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderPage();
  }

  _renderUserRating() {
    this._userRatingComponent = new UserRating(this._moviesModel.getMovies());
    render(this._header, this._userRatingComponent, RenderPosition.BEFOREEND);
  }

  _renderSortList() {
    this._sortListComponent = new SortList(this._currentSortType);
    this._sortListComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._main, this._sortListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadingScreen() {
    render(this._main, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsContainer() {
    render(this._main, this._filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderStats() {
    this._statsComponent = new Stats(this._moviesModel.getMovies());
    render(this._main, this._statsComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMore() {
    this._showMoreComponent = new ShowMore();
    const filmsList = this._filmsContainerComponent.getElement().querySelector(`.films-list`);
    render(filmsList, this._showMoreComponent, RenderPosition.BEFOREEND);
    this._handleShowMoreButtonClick();
  }

  _renderFilmsNumber() {
    this._filmsNumberComponent = new FilmsNumber(this._moviesModel.getMovies());
    render(this._footer, this._filmsNumberComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._main, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(card) {
    const filmCardPresenter = new FilmCardPresenter(this._footer, this._filmsContainerComponent, this._handleViewAction, this._commentsModel, this._api);
    filmCardPresenter.init(card);
    this._filmPresenter[card.id] = filmCardPresenter;
  }

  _renderFilmList(cards) {
    cards.forEach((card) => this._renderFilmCard(card));
  }

  _renderPage() {
    if (this._isLoading) {
      this._renderLoadingScreen();
      return;
    }

    const cards = this._getMovies();
    const cardsCount = cards.length;

    this._renderUserRating();
    this._renderSortList();
    this._renderFilmsNumber();

    if (cardsCount === 0) {
      this._renderNoFilms();
    } else {
      this._renderFilmsContainer();
      this._renderFilmList(cards.slice(0, Math.min(cardsCount, this._renderedCardsCount)));
      this._renderStats();

      if (cardsCount > this._renderedCardsCount) {
        this._renderShowMore();
      }
    }
  }

  _handleShowMoreButtonClick() {
    this._showMoreComponent.setClickHandler(() => {
      const cardsCount = this._getMovies().length;
      const newRenderedCardsCount = Math.min(cardsCount, this._renderedCardsCount + FILMS_NUMBER_PER_STEP);
      const cards = this._getMovies().slice(this._renderedCardsCount, newRenderedCardsCount);

      this._renderFilmList(cards);

      this._renderedCardsCount = newRenderedCardsCount;

      if (this._renderedCardsCount >= cardsCount) {
        remove(this._showMoreComponent);
      }
    });
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE:
        this._api.updateMovie(update).then((response) => {
          this._moviesModel.updateMovie(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addCommentToServer(update).then((response) => {
          this._commentsModel.addComment(updateType, response);
        });
        break;
      case UserAction.DELETE_COMMENT:
        this._api.deleteCommentFromServer(update).then(() => {
          this._commentsModel.deleteComment(updateType, update);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._filmPresenter[data.id].init(data);
        this._clearPage();
        this._renderPage();
        break;
      case UpdateType.MAJOR:
        this._statsComponent.hide();
        this.showFilmListHandler();
        this._clearPage({resetRenderedCardsCount: true, resetSortType: true});
        this._renderPage();
        break;
      case UpdateType.MAJOR_POPUP:
        break;
      case UpdateType.STATS:
        this._currentSortType = SortType.DEFAULT;
        this.hideFilmListHandler();
        this._statsComponent.visibility();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderPage();
        break;
    }
  }

  _getMovies() {
    const filterType = this._filtersModel.getFilter();
    const cards = this._moviesModel.getMovies();
    const filteredCards = filter[filterType](cards);

    switch (this._currentSortType) {
      case SortType.DATE_UP:
        return filteredCards.sort(sortDateUp);
      case SortType.RATING_UP:
        return filteredCards.sort(sortRatingUp);
    }

    return filteredCards;
  }

  _clearPage({resetRenderedCardsCount = false, resetSortType = false} = {}) {
    const moviesCount = this._getMovies().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._showMoreComponent);
    remove(this._sortListComponent);
    remove(this._userRatingComponent);
    remove(this._filmsNumberComponent);
    remove(this._noFilmsComponent);

    if (resetRenderedCardsCount) {
      this._renderedCardsCount = FILMS_NUMBER_PER_STEP;
    } else {
      this._renderedCardsCount = Math.min(moviesCount, this._renderedCardsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPage({resetRenderedCardsCount: true});
    this._renderPage();
  }

  hideFilmListHandler() {
    if (this._filmsContainerComponent.getElement().classList.contains(`visually-hidden`)) {
      this._filmsContainerComponent.getElement().classList.remove(`visually-hidden`);
      this._sortListComponent.getElement().classList.remove(`visually-hidden`);
    } else if (!this._filmsContainerComponent.getElement().classList.contains(`visually-hidden`)) {
      this._filmsContainerComponent.getElement().classList.add(`visually-hidden`);
      this._sortListComponent.getElement().classList.add(`visually-hidden`);
    }
  }

  showFilmListHandler() {
    this._filmsContainerComponent.getElement().classList.remove(`visually-hidden`);
    this._sortListComponent.getElement().classList.remove(`visually-hidden`);
  }
}
