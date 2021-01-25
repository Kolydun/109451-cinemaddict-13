import Component from "./component";
import {SortType, TAG_A} from "../utils/const";

const createSortListTemplate = (currentSortType) => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button-default ${currentSortType === SortType.DEFAULT ? `sort__button--active` : ``}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button sort__button-by-date ${currentSortType === SortType.DATE_UP ? `sort__button--active` : ``}" data-sort-type="${SortType.DATE_UP}">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button-by-rating ${currentSortType === SortType.RATING_UP ? `sort__button--active` : ``}" data-sort-type="${SortType.RATING_UP}">Sort by rating</a></li>
</ul>`;
};

export default class SortList extends Component {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortListTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== TAG_A) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
