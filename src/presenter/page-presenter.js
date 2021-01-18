import UserRating from "../view/user-rating";
import FilmsFilters from "../view/film-filters";
import FilmsNumber from "../view/film-counter";
import SortList from "../view/sort-list";
import NoFilms from "../view/no-films-window";
import FilmCardPresenter from "./film-card-presenter";
import {render, RenderPosition, remove, updateItem} from "../view/utils";
import {navigationControls} from "../view/navigation";
import FilmsContainer from "../view/films-container";
import ShowMore from "../view/show-more";

export default class PagePresenter {
  constructor(header, main, footer, cardsNumber, cardsPerStep) {
    this._header = header;
    this._main = main;
    this._footer = footer;
    this._cardsNumber = cardsNumber;
    this.cardsPerStep = cardsPerStep;
    this._filmPresenter = {};

    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._userRatingComponent = new UserRating();
    this._noFilmsComponent = new NoFilms();
    this._sortListComponent = new SortList();
    this._filmsContainerComponent = new FilmsContainer();
    this._showMoreComponent = new ShowMore();
  }

  init(cards) {
    this._filmCards = cards.slice();

    this._renderPage();
  }

  _renderUserRating() {
    render(this._header, this._userRatingComponent, RenderPosition.BEFOREEND);
  }

  _renderSortList() {
    render(this._main, this._sortListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    this._filters = navigationControls(this._filmCards);
    render(this._main, new FilmsFilters(this._filters), RenderPosition.AFTERBEGIN);
  }

  _renderFilmsContainer() {
    render(this._main, this._filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMore() {
    render(this._filmsContainerComponent.getElement().querySelector(`.films-list`), this._showMoreComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsNumber() {
    render(this._footer, new FilmsNumber(this._filmCards), RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._main, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(card) {
    const filmListPresenter = new FilmCardPresenter(this._footer, this._filmsContainerComponent, this._handleFilmChange);
    filmListPresenter.init(card);
    this._filmPresenter[card.id] = filmListPresenter;
  }

  _renderPage() {
    this._renderUserRating();
    this._renderSortList();
    this._renderFilters();
    this._renderFilmsNumber();

    if (this._filmCards.length < 1) {
      this._renderNoFilms();
    } else {
      this._renderFilmsContainer();
      for (let i = 0; i < this.cardsPerStep; i++) {
        this._renderFilmCard(this._filmCards[i]);
      }
      this._renderShowMore();
      this._showMoreButtonClickHandler();
    }
  }

  _showMoreButtonClickHandler() {
    this._showMoreComponent.setClickHandler(() => {
      const filmCardsNumber = document.querySelectorAll(`.film-card`).length;
      for (let i = 0; i < this.cardsPerStep; i++) {
        this._renderFilmCard(this._filmCards[i + filmCardsNumber]);
      }
      if (filmCardsNumber + this.cardsPerStep >= this._cardsNumber) {
        // this._showMoreComponent.deleteClickHandler();
        remove(this._showMoreComponent);
      }
    });
  }

  _handleFilmChange(updatedCard) {
    this._filmCards = updateItem(this._filmCards, updatedCard);
    this._filmPresenter[updatedCard.id].init(updatedCard);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    remove(this._showMoreComponent);
  }
}