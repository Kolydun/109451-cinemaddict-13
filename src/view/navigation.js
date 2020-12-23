const filmsToFilterMap = {
  all: (cards) => cards.filter((card) => card.allFilms === true),
  watchlist: (cards) => cards.filter((card) => card.favorite === true).length,
  history: (cards) => cards.filter((card) => card.alreadyWatched === true).length,
  favorite: (cards) => cards.filter((card) => card.watchlist === true).length,
};

export const navigationControls = (cards) => {
  return Object.entries(filmsToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(cards),
    };
  });
};

