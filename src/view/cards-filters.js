export const cardsFiltersAdd = () => {
  const cardFilterButton = document.querySelectorAll(`.film-card__controls-item`);

  cardFilterButton.forEach(function (button) {
    button.addEventListener(`click`, function (evt) {
      const target = evt.target;
      if (target.classList.contains(`film-card__controls-item--active`)) {
        target.classList.remove(`film-card__controls-item--active`);
      } else {
        target.classList.add(`film-card__controls-item--active`);
      }
    });
  });

};

