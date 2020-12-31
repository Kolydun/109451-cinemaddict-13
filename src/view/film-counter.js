import {createElement} from "./utils";

const createAllFilmsNumberTemplate = (array) => {
  return `<section class="footer__statistics">
    <p>${array.length} movies inside</p>
  </section>`;
};

export default class FilmsNumber {
  constructor(array) {
    this._element = null;
    this._array = array;
  }

  getTemplate() {
    return createAllFilmsNumberTemplate(this._array);
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
