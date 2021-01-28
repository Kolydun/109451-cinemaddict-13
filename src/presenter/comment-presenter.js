import {render} from "../utils/utils";
import {RenderPosition} from "../utils/const";
import FilmComment from "../view/comments";

export default class CommentPresenter {
  constructor(commentContainer) {
    this._commentContainer = commentContainer;
    this._commentComponent = null;
  }

  init(comment) {
    this._commentComponent = new FilmComment(comment);

    this._renderComment();
  }

  _renderComment() {
    render(this._commentContainer, this._commentComponent, RenderPosition.AFTERBEGIN);
  }
}
