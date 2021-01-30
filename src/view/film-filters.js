import Component from "./component";

const createMenuItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  const isAll = name === `All`
    ? ``
    : `<span class="main-navigation__item-count">${count}</span>`;

  function nameRule() {
    let realName = null;
    if (name === `All`) {
      realName = `All movie`;
    } else if (name === `Watchlist`) {
      realName = `Watchlist`;
    } else if (name === `History`) {
      realName = `History`;
    } else {
      realName = `Favorites`;
    }

    return realName;
  }
  return (
    `<a href="#${name}" id="${type}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${nameRule()} ${isAll}</a>`
  );
};


const createMenuTemplate = (filterItems, currentFilterType) => {
  const isStatsActive = currentFilterType === `Statistics`
    ? `main-navigation__additional--active`
    : ``;

  const filterItemsTemplate = filterItems
    .map((filter) => createMenuItemTemplate(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
<div class="main-navigation__items">
  ${filterItemsTemplate}
</div>
<a href="#stats" class="main-navigation__additional ${isStatsActive}" id="Statistics">Stats</a>
</nav>`;
};

export default class FilmsFilters extends Component {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeClickHandler = this._filterTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeClickHandler(evt) {
    // if (evt.target.id !== `Stats`) {
    this._callback.filterTypeClick(evt.target.id);
    // }

    // if (!this.getElement().querySelector(`.main-navigation__additional`)
    //   .classList.contains(`main-navigation__additional--active`)) {
    //   this.getElement().querySelector(`.main-navigation__additional`)
    //     .classList.add(`main-navigation__additional--active`);
    //   this.getElement().querySelectorAll(`.main-navigation__item`)
    //     .classList.remove(`main-navigation__item--active`);
    // } else if (
    //   this.getElement().querySelector(`.main-navigation__additional`)
    //     .classList.contains(`main-navigation__additional--active`)) {
    //   this.getElement().querySelector(`.main-navigation__additional`)
    //     .classList.remove(`main-navigation__additional--active`);
    // }
  }

  setFilterTypeClickHandler(callback) {
    this._callback.filterTypeClick = callback;
    this.getElement().addEventListener(`click`, this._filterTypeClickHandler);
  }

}
