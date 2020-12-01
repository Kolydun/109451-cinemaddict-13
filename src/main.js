import {showMovieDetails} from "./view/popup";
import {showMore} from "./view/show-more";
import {userRating} from "./view/user-rating";
import {filmCard} from "./view/film-card";
import {menu} from "./view/menu";
import {allFilmsNumber} from "./view/film-counter";
import {filmsContainer} from "./view/films-container";
import {mostCommentedFilms} from "./view/most-commented-container";
import {mostRatedFilms} from "./view/most-rated-container";

const FILMS_NUMBER = 5;
const TOP_RATED_FILMS_NUMBER = 2;
const MOST_COMMENTED_FILMS_NUMBER = 2;
const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(pageHeader, userRating(), `beforeend`);
render(pageMain, menu(), `beforeend`);
render(pageFooter, allFilmsNumber(), `beforeend`);
render(pageMain, filmsContainer(), `beforeend`);

const filmsListContainer = document.querySelector(`.films-list__container`);
const filmsList = document.querySelector(`.films-list`);
const filmsBoard = document.querySelector(`.films`);

for (let i = 0; i < FILMS_NUMBER; i++) {
  render(filmsListContainer, filmCard(), `beforeend`);
}
render(filmsList, showMore(), `beforeend`);
// render(pageFooter, showMovieDetails(), `afterend`);

render(filmsBoard, mostRatedFilms(), `beforeend`);
render(filmsBoard, mostCommentedFilms(), `beforeend`);

const topRatedContainer = document.querySelector(`.films-list--extra:nth-child(2)`).querySelector(`.films-list__container`);
const topCommentedContainer = document.querySelector(`.films-list--extra:last-child`).querySelector(`.films-list__container`);

for (let i = 0; i < TOP_RATED_FILMS_NUMBER; i++) {
  render(topRatedContainer, filmCard(), `beforeend`);
}
for (let i = 0; i < MOST_COMMENTED_FILMS_NUMBER; i++) {
  render(topCommentedContainer, filmCard(), `beforeend`);
}

