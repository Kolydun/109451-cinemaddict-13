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
    let prevElement = this.getElement();
    let prevElementScrollY = prevElement.scrollTop;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
    this.restoreAdditionalIElements();

    newElement.scrollTo(0, prevElementScrollY);
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }

  restoreAdditionalIElements() {
    throw new Error(`No additional information`);
  }
}
