import FilmsFilters from "../view/film-filters";
import {render, replace, remove, filter} from "../utils/utils";
import {FilterType, UpdateType, RenderPosition} from "../utils/const";

export default class Filters {
  constructor(filterContainer, filterModel, moviesModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilmsFilters(filters, this._currentFilter);
    this._filterComponent.setFilterTypeClickHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const cards = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: filter[FilterType.ALL](cards).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](cards).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](cards).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](cards).length
      }
    ];
  }
}

