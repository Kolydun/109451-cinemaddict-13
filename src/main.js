import PagePresenter from "./presenter/page-presenter";
import MoviesModel from "./model/movies";
import FiltersModel from "./model/filters";
import CommentsModel from "./model/comments";
import FiltersPresenter from "./presenter/filters-presenter";
import Api from "./view/api";
import {UpdateType} from "./utils/const";

const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const AUTHORIZATION = `Basic arli32jvqjmyospoa64ilqjk`;

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filtersModel = new FiltersModel();
const commentsModel = new CommentsModel();

const pagePresenter = new PagePresenter(pageHeader, pageMain, pageFooter, moviesModel, filtersModel, commentsModel, api);
const filtersPresenter = new FiltersPresenter(pageMain, filtersModel, moviesModel);

filtersPresenter.init();
pagePresenter.init();

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });
