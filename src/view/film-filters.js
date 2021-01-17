import Abstract from "./abstract";

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

export default class FilmsFilters extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

}
