import {generateFilmCard} from "./view/mock/film-information-mock";
import PagePresenter from "./presenter/page-presenter";
import MoviesModel from "./model/movies";
import FiltersModel from "./model/filters";
import FiltersPresenter from "./presenter/filters-presenter";

const FILM_CARDS_COUNT = 20;

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);

const moviesModel = new MoviesModel();
moviesModel.setMovies(filmCards);

const filtersModel = new FiltersModel();

const pagePresenter = new PagePresenter(pageHeader, pageMain, pageFooter, moviesModel, filtersModel);
const filtersPresenter = new FiltersPresenter(pageMain, filtersModel, moviesModel);

filtersPresenter.init();
pagePresenter.init();
