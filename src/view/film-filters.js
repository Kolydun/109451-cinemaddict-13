import {createElement} from "./utils";

const createMenuItemTemplate = (filter) => {
  const {name, count} = filter;
  const isAll = name === `all`
    ? ``
    : `<span class="main-navigation__item-count">${count}</span>`;
  function nameRule() {
    let realName = null;
    if (name === `all`) {
      realName = `All movie`;
    } else if (name === `watchlist`) {
      realName = `Watchlist`;
    } else if (name === `history`) {
      realName = `History`;
    } else {
      realName = `Favorites`;
    }

    return realName;
  }
  return (
    `<a href="#${name}" class="main-navigation__item">${nameRule()} ${isAll}</a>`
  );
};

const createMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createMenuItemTemplate(filter))
    .join(``);
  return `<nav class="main-navigation">
<div class="main-navigation__items">
  ${filterItemsTemplate}
</div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
