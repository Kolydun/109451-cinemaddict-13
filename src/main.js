import {generateFilmCard} from "./view/mock/film-information-mock";
import PagePresenter from "./presenter/page-presenter";
// import FilmCardPresenter from "./presenter/film-card-presenter";


const FILMS_NUMBER_PER_STEP = 5;
const FILM_CARDS_COUNT = 20;

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const pagePresenter = new PagePresenter(pageHeader, pageMain, pageFooter, FILM_CARDS_COUNT, FILMS_NUMBER_PER_STEP);
console.log(filmCards);

pagePresenter.init(filmCards);

// const watchList = document.querySelector(`.header__logo`);
// watchList.addEventListener(`click`, function () {
//   const newCards = filmCards.filter(function (el) {
//     return el.watchlist === true;
//   });
//   const newFilmsPresenter = new FilmCardPresenter(pageMain, pageFooter, FILM_CARDS_COUNT, FILMS_NUMBER_PER_STEP);
//   // newFilmsPresenter.destroy();
//   newFilmsPresenter.init(newCards);
// });


