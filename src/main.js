import {generateFilmCard} from "./view/mock/film-information-mock";
import PagePresenter from "./presenter/page-presenter";

const FILMS_NUMBER_PER_STEP = 5;
const FILM_CARDS_COUNT = 20;

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const pagePresenter = new PagePresenter(pageHeader, pageMain, pageFooter, FILM_CARDS_COUNT, FILMS_NUMBER_PER_STEP);

pagePresenter.init(filmCards);
