import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Component from "./component";

const createCommentsTemplate = (comment) => {
  const {emoji, text, author, date, id} = comment;

  const commentDate = (commentTime) => {
    return dayjs(commentTime).fromNow();
  };

  return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src=${emoji} width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">${text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${commentDate(date)}</span>
                  <button class="film-details__comment-delete" data-id="${id}">Delete</button>
                </p>
              </div>
            </li>`;
};

export default class FilmComment extends Component {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentsTemplate(this._comment);
  }
}
