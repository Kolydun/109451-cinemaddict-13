import {generateFilmCard} from "./view/mock/film-information-mock";
import PagePresenter from "./presenter/page-presenter";
import MoviesModel from "./model/movies";
import FiltersModel from "./model/filters";
import CommentsModel from "./model/comments";
import FiltersPresenter from "./presenter/filters-presenter";
import {render} from "./utils/utils";
import {RenderPosition} from "./utils/const";
import Stats from "./view/stats";

const FILM_CARDS_COUNT = 20;

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);

// const statsComponent = new Stats();
// render(pageMain, statsComponent, RenderPosition.AFTERBEGIN);

const moviesModel = new MoviesModel();
moviesModel.setMovies(filmCards);

const filtersModel = new FiltersModel();

const commentsModel = new CommentsModel();

const pagePresenter = new PagePresenter(pageHeader, pageMain, pageFooter, moviesModel, filtersModel, commentsModel);
const filtersPresenter = new FiltersPresenter(pageMain, filtersModel, moviesModel);

filtersPresenter.init();
pagePresenter.init();

// const statsButton = document.querySelector(`.main-navigation__additional`);
// statsButton.addEventListener(`click`, function () {
//   // pagePresenter.hideFilmsListHandler();
//   statsComponent.visibility();
// });
