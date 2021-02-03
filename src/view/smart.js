import Component from "./component";

export default class Smart extends Component {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const prevElementScrollY = prevElement.scrollTop;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
    this.restoreAdditionalElements();

    newElement.scrollTo(0, prevElementScrollY);
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }

  restoreAdditionalElements() {}
}
