import dayjs from "dayjs";
import {getRandomInteger, getDate} from "../../utils/utils";

const createDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
    `Cras aliquet varius magna, non porta ligula feugiat eget. `,
    `Fusce tristique felis at fermentum pharetra. `,
    `Aliquam id orci ut lectus varius viverra. `,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
    `Sed sed nisi sed augue convallis suscipit in sed felis. `,
    `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. `,
    `In rutrum ac purus sit amet tempus. `
  ];

  const randomDescriptionNumber = getRandomInteger(1, 5);
  const randomDescription = [];
  for (let i = 0; i < randomDescriptionNumber; i++) {
    randomDescription.push(descriptions[getRandomInteger(0, descriptions.length - 1)]);
  }
  return randomDescription;
};

const createTitle = () => {
  const filmTitles = [
    `Inception`,
    `Dark knight`,
    `Lord of the Rings`,
    `Hobbit`,
    `Goodfellows`,
    `Apocalypses now`,
    `Bohemian Rhapsody`,
    `Harry Potter`
  ];
  const randomNameNumber = getRandomInteger(0, filmTitles.length - 1);

  return filmTitles[randomNameNumber];
};

const createRating = () => getRandomInteger(0, 10);

const createRandomPoster = () => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ];

  const getRandomPoster = `./images/posters/` + posters[getRandomInteger(0, posters.length - 1)];

  return getRandomPoster;
};

const createGenre = () => {
  const genres = [
    ` Action`,
    ` Comedy`,
    ` Adventure`,
    ` Crime`,
    ` Drama`,
    ` Fantasy`,
  ];
  let randomGenresSet = new Set();
  let counter = getRandomInteger(1, 2);
  for (let i = 0; i < counter; i++) {
    randomGenresSet.add(genres[getRandomInteger(0, genres.length - 1)]);
  }

  const randomGenres = Array.from(randomGenresSet);

  return randomGenres;
};

const getEmoji = () => {
  const emojis = [
    `angry`,
    `puke`,
    `sleeping`,
    `smile`,
  ];

  return emojis[getRandomInteger(0, emojis.length - 1)];
};

const randomComment = () => {
  return {
    id: createRandomId(),
    text: `Текст комментария, который в будущем будет заменен на что-то более осмысленное чем пустой текст`,
    emoji: `./images/emoji/` + getEmoji() + `.png`,
    author: `Посетитель`,
    date: getDate(),
  };
};

const createRandomComments = () => {
  const randomComments = [];
  const counter = getRandomInteger(0, 5);
  for (let i = 0; i < counter; i++) {
    randomComments.push(randomComment());
  }
  return randomComments;
};

const createRandomCountry = () => {
  const countries = [
    `USA`,
    `Canada`,
    `France`,
    `United Kingdoms`,
    `Mexico`
  ];

  return countries[getRandomInteger(0, countries.length - 1)];
};

const createRandomDirector = () => {
  const directors = [
    `Quentin Tarantino`,
    `Buster Keaton`,
    `Bong Joon Ho`,
    `Christopher Nolan`,
    `David Lynch`
  ];
  return directors[getRandomInteger(0, directors.length - 1)];
};

const createRandomScreenwriter = () => {
  const screenwriters = [
    `Billy Wilder`,
    `Ethan Coen and Joel Coen`,
    `Quentin Tarantino`,
    `Francis Ford Coppola`,
    `Charlie Kaufman`
  ];

  return screenwriters[getRandomInteger(0, screenwriters.length - 1)];
};

const createRandomActors = () => {
  const actors = [
    ` Denzel Washington`,
    ` Katharine Hepburn`,
    ` Marlon Brando`,
    ` Jack Nicholson`,
    ` Robert De Niro`,
    ` Daniel Day-Lewis`,
    ` Meryl Streep`
  ];
  let randomActorsSet = new Set();
  const counter = getRandomInteger(1, 5);
  for (let i = 0; i < counter; i++) {
    randomActorsSet.add(actors[getRandomInteger(0, actors.length - 1)]);
  }

  const randomActors = Array.from(randomActorsSet);

  return randomActors;
};

const createReleaseDate = () => {
  const filmYears = [
    `2000`,
    `1997`,
    `2010`,
    `1990`,
    `2005`,
    `1996`,
    `2015`
  ];

  const randomYearIndex = getRandomInteger(0, filmYears.length - 1);
  const randomYear = filmYears[randomYearIndex];
  const randomDay = getRandomInteger(1, 31);
  const randomMonth = getRandomInteger(1, 12);

  return dayjs(randomMonth + `/` + randomDay + `/` + randomYear).format(`D MMMM YYYY`);
};

const randomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const createRandomId = () => {
  return Date.now() + parseInt(Math.random() * 10000, 10);
};

export const generateFilmCard = () => {
  return {
    id: createRandomId(),
    title: createTitle(),
    poster: createRandomPoster(),
    description: createDescription(),
    comments: createRandomComments(),
    release: createReleaseDate(),
    rating: createRating(),
    time: getRandomInteger(60, 210),
    genre: createGenre(),
    country: createRandomCountry(),
    originalTitle: createTitle(),
    director: createRandomDirector(),
    screenwriter: createRandomScreenwriter(),
    actors: createRandomActors(),
    allFilms: true,
    watchingDate: getDate(),
    isWatchlist: randomBoolean(),
    isHistory: randomBoolean(),
    isFavorite: randomBoolean(),
  };
};
