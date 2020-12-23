export const popupButtons = () => {
  const posters = document.querySelectorAll(`.film-card__poster`);
  const popup = document.querySelector(`.film-details`);
  const popupCloseButton = popup.querySelector(`.film-details__close-btn`);

  posters.forEach(function (poster) {
    poster.addEventListener(`click`, function () {
      popup.classList.remove(`visually-hidden`);
    });
  });
  popupCloseButton.addEventListener(`click`, function () {
    popup.classList.add(`visually-hidden`);
  });
};
