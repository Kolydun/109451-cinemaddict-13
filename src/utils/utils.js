import dayjs from "dayjs";
import Component from "../view/component.js";
import {RenderPosition, FilterType, Rating} from "../utils/const";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const handler = {
  [RenderPosition.AFTEREND]: (container, element) => {
    container.after(element.getElement());
  },
  [RenderPosition.BEFOREEND]: (container, element) => {
    container.append(element.getElement());
  },
  [RenderPosition.AFTERBEGIN]: (container, element) => {
    container.prepend(element.getElement());
  },
};

export const render = (container, element, place) => {
  const handleRender = handler[place] || handler[RenderPosition.BEFOREEND];
  handleRender(container, element);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Component) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Component) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Component)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

const getWeightForNullParameter = (parameterA, parameterB) => {
  if (parameterA === null && parameterB === null) {
    return 0;
  }

  if (parameterA === null) {
    return 1;
  }

  if (parameterB === null) {
    return -1;
  }

  return null;
};

export const sortDateUp = (taskA, taskB) => {
  const weight = getWeightForNullParameter(taskA.release, taskB.release);

  if (weight !== null) {
    return weight;
  }

  return dayjs(taskB.release).diff(dayjs(taskA.release));
};

export const sortRatingUp = (taskA, taskB) => {
  const weight = getWeightForNullParameter(taskA.rating, taskB.rating);

  if (weight !== null) {
    return weight;
  }

  return (taskB.rating) - (taskA.rating);
};

export const filter = {
  [FilterType.ALL]: (cards) => cards.filter((card) => card.allFilms === true),
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.isWatchlist === true),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.isHistory === true),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.isFavorite === true),
  [FilterType.STATISTICS]: (cards) => cards.filter((card) => card.allFilms === true),
};

export const getDate = () => {
  return dayjs().format(`YYYY-MM-DD HH:mm`);
};

export function ratingRule(filmsArray) {
  const watchedFilms = filmsArray.filter((film) => film.isHistory === true).length;

  let rating = null;
  if (watchedFilms <= Rating.NOVICE_RATING_TOP && watchedFilms > Rating.NO_RATING) {
    rating = `Novice`;
  } else if (watchedFilms <= Rating.FAN_RATING_TOP && watchedFilms >= Rating.FAN_RATING_BOTTOM) {
    rating = `Fan`;
  } else if (watchedFilms >= Rating.MOVIE_BUFF_RATING_BOTTOM) {
    rating = `Movie buff`;
  } else {
    rating = ``;
  }

  return rating;
}
