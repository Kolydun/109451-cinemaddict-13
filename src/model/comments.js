import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  deleteComment(updateType, updateIndex) {
    const index = this._comments.findIndex((comment) => comment.id === updateIndex);

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType);
  }

  addComment(updateType, update) {
    this._comments = update.comments;

    this._notify(updateType, update);
  }
}
