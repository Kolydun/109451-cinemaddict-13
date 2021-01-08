import Popup from "./view/popup";
import ShowMore from "./view/show-more";
import UserRating from "./view/user-rating";
import FilmCard from "./view/film-card";
import SiteMenu from "./view/film-filters";
import FilmsNumber from "./view/film-counter";
import FilmContainer from "./view/films-container";
import {generateFilmCard} from "./view/mock/film-information-mock";
import FilmComment from "./view/comments";
import {cardsFiltersAdd} from "./view/cards-filters-controls";
import {navigationControls} from "./view/navigation";
import SortList from "./view/sort-list";
import NoFilms from "./view/no-films-window";
import {render, RenderPosition} from "./view/utils";

const FILMS_NUMBER_PER_STEP = 5;
const FILM_CARDS_COUNT = 20;
const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);

render(pageHeader, new UserRating().getElement(), RenderPosition.BEFOREEND);


const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const filters = navigationControls(filmCards);

render(pageFooter, new FilmsNumber(filmCards).getElement(), RenderPosition.BEFOREEND);
render(pageMain, new SortList().getElement(), RenderPosition.AFTERBEGIN);
render(pageMain, new SiteMenu(filters).getElement(), RenderPosition.AFTERBEGIN);

if (FILM_CARDS_COUNT < 1) {
  render(pageMain, new NoFilms().getElement(), RenderPosition.BEFOREEND);
} else {
  const filmContainer = new FilmContainer();
  render(pageMain, filmContainer.getElement(), RenderPosition.BEFOREEND);

  const filmsListContainer = document.querySelector(`.films-list__container`);
  const filmsList = document.querySelector(`.films-list`);

  const createFilmList = (container, card) => {
    for (let i = 0; i < FILMS_NUMBER_PER_STEP; i++) {
      renderSmallCard(container, card[i]);
    }
  };

  const renderSmallCard = (place, film) => {
    const smallCard = new FilmCard(film);
    render(place, smallCard.getElement(), RenderPosition.BEFOREEND);

    popupControls(film, smallCard);
  };

  const popupControls = (film, card) => {
    const popup = new Popup(film);
    const posters = card.getElement().querySelector(`.film-card__poster`);
    const title = card.getElement().querySelector(`.film-card__title`);
    const comments = card.getElement().querySelector(`.film-card__comments`);

    card.setAddPopupHandler((evt) => {
      if (evt.target === posters || evt.target === title || evt.target === comments) {
        addPopup(popup, film);
      }
    });
  };

  const addPopup = (popup, film) => {

    const removeChildElement = () => {
      popup.deletePopupCloseButtonHandler();
      pageFooter.removeChild(popup.getElement());
    };

    const onEscKeydown = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        window.removeEventListener(`keydown`, onEscKeydown);
        removeChildElement(pageFooter, popup);
      }
    };

    pageFooter.appendChild(popup.getElement());
    window.addEventListener(`keydown`, onEscKeydown);
    commentsAdd(popup, film);
    popup.setPopupCloseButtonHandler(() => {
      removeChildElement();
    });
  };

  const commentsAdd = (element, film) => {
    const commentsContainer = element.getElement().querySelector(`.film-details__comments-list`);
    for (let i = 0; i < film.comments.length; i++) {
      render(commentsContainer, new FilmComment(film.comments[i]).getElement(), RenderPosition.AFTERBEGIN);
    }
  };

  const showMoreButton = new ShowMore();

  render(filmsList, showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.setClickHandler(() => {
    const filmCardsNumber = document.querySelectorAll(`.film-card`).length;
    for (let i = 0; i < FILMS_NUMBER_PER_STEP; i++) {
      renderSmallCard(filmsListContainer, filmCards[i + filmCardsNumber]);
    }
    if (filmCardsNumber + FILMS_NUMBER_PER_STEP >= FILM_CARDS_COUNT) {
      showMoreButton.getElement().classList.add(`visually-hidden`);
      showMoreButton.deleteClickHandler();
    }
  });

  createFilmList(filmsListContainer, filmCards);
  cardsFiltersAdd();
}
