import Component from "./component";

const createAllFilmsNumberTemplate = (array) => {
  return `<section class="footer__statistics">
    <p>${array.length} movies inside</p>
  </section>`;
};

export default class FilmsNumber extends Component {
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return createAllFilmsNumberTemplate(this._array);
  }
}
