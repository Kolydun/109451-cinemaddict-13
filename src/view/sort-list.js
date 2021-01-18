import Abstract from "./abstract";

export const SortType = {
  DEFAULT: `default`,
  RATING_UP: `rating-up`,
  DATE_UP: `date-up`
};

const createSortListTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button-default sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button sort__button-by-date" data-sort-type="${SortType.DATE_UP}">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button-by-rating" data-sort-type="${SortType.RATING_UP}">Sort by rating</a></li>
</ul>`;
};

export default class SortList extends Abstract {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortListTemplate();
  }

  _deleteActivityMarker() {
    this.getElement().querySelector(`.sort__button-default`).classList.remove(`sort__button--active`);
    this.getElement().querySelector(`.sort__button-by-rating`).classList.remove(`sort__button--active`);
    this.getElement().querySelector(`.sort__button-by-date`).classList.remove(`sort__button--active`);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._deleteActivityMarker();
    evt.target.classList.add(`sort__button--active`);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
