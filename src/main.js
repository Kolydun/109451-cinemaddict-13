import {showMovieDetails} from "./view/popup";
import {showMore} from "./view/show-more";
import {userRating} from "./view/user-rating";
import {filmCard} from "./view/film-card";
import {menu} from "./view/menu";
import {allFilmsNumber} from "./view/film-counter";
import {filmsContainer} from "./view/films-container";
import {generateFilmCard} from "./view/mock/film-information-mock";
import {popupButtons} from "./view/popup-controls";
import {createComments} from "./view/comments";
import {cardsFiltersAdd} from "./view/cards-filters";
import {navigationControls} from "./view/navigation";

const FILMS_NUMBER = 5;
const FILM_CARDS_COUNT = 20;
const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(pageHeader, userRating(), `beforeend`);
render(pageMain, filmsContainer(), `beforeend`);

const filmsListContainer = document.querySelector(`.films-list__container`);
const filmsList = document.querySelector(`.films-list`);
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const filters = navigationControls(filmCards);

for (let i = 0; i < FILMS_NUMBER; i++) {
  render(filmsListContainer, filmCard(filmCards[i]), `beforeend`);
}
render(filmsList, showMore(), `beforeend`);
render(pageFooter, showMovieDetails(filmCards[0]), `afterend`);
render(pageFooter, allFilmsNumber(filmCards), `beforeend`);
render(pageMain, menu(filters), `afterbegin`);

const commentsContainer = document.querySelector(`.film-details__comments-list`);

for (let i = 0; i < filmCards[0].comments.length; i++) {
  render(commentsContainer, createComments(filmCards[0].comments[i]), `afterbegin`);
}

const showMoreButton = document.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, function () {
  const filmCardsNumber = document.querySelectorAll(`.film-card`).length;
  for (let i = 0; i < FILMS_NUMBER; i++) {
    render(filmsListContainer, filmCard(filmCards[i + filmCardsNumber]), `beforeend`);
  }
  if (filmCardsNumber + FILMS_NUMBER >= FILM_CARDS_COUNT) {
    showMoreButton.classList.add(`visually-hidden`);
  }
  popupButtons();
});

popupButtons();
cardsFiltersAdd();
