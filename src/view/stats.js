import Smart from "./smart";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ratingRule} from "../utils/utils";

dayjs.extend(duration);

const myChart = (statisticCtx, uniqueLabelsAndCounters) => {

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(uniqueLabelsAndCounters),
      datasets: [{
        data: Object.values(uniqueLabelsAndCounters),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatsTemplate = (films, uniqueLabelsAndCounters, defaultFilmsList, check) => {

  function topGenre() {
    let counter = 0;
    let genreName = `None`;

    for (const genre in uniqueLabelsAndCounters) {
      if (uniqueLabelsAndCounters[genre] > counter) {
        counter = uniqueLabelsAndCounters[genre];
        genreName = genre;
      }
    }

    return genreName;
  }

  function totalTime() {
    let totalTimeInMinute = 0;
    films.forEach((film) => {
      totalTimeInMinute = film.filmInfo.time + totalTimeInMinute;
    });

    return totalTimeInMinute;
  }

  const totalTimeHours = () => {
    return Math.floor((dayjs.duration(totalTime()).asMinutes()) * 1000);
  };

  const totalTimeMinutes = () => {
    const runTimeDuration = dayjs.duration(totalTime(), `minute`);
    return runTimeDuration.format(`mm`);
  };

  return `<section class="statistic visually-hidden">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${ratingRule(defaultFilmsList)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${check === `All` ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${check === `Today` ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${check === `Week` ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${check === `Month` ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${check === `Year` ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalTimeHours()} <span class="statistic__item-description">h</span> ${totalTimeMinutes()} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre(films)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Stats extends Smart {
  constructor(films) {
    super();
    this._films = films.filter((film) => film.userDetails.isHistory === true);
    this._filmsFiltered = this._films;
    this._checkedInput = `All`;

    this._setChart();

    this._allTimeClickHandler = this._allTimeClickHandler.bind(this);
    this._allTimeClickHandler = this._allTimeClickHandler.bind(this);
    this._todayClickHandler = this._todayClickHandler.bind(this);
    this._weekClickHandler = this._weekClickHandler.bind(this);
    this._monthClickHandler = this._monthClickHandler.bind(this);
    this._yearClickHandler = this._yearClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createStatsTemplate(this._filmsFiltered, this._uniqueLabelsAndCounters(), this._films, this._checkedInput);
  }

  visibility() {
    if (this.getElement().classList.contains(`visually-hidden`)) {
      this.getElement().classList.remove(`visually-hidden`);
    } else if (!this.getElement().classList.contains(`visually-hidden`)) {
      this.getElement().classList.add(`visually-hidden`);
    }
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.visibility();
    this.hide();
  }

  _allTimeClickHandler() {
    this._filmsFiltered = this._films;
    this._checkedInput = `All`;
    this.updateElement();
    this._setChart();
    this.visibility();
  }

  _todayClickHandler() {
    const newFilteredFilms = [];
    const today = dayjs(Date.now());

    this._films.forEach((film) => {
      const filmWatchingDate = dayjs(film.userDetails.watchingDate);

      if (today.diff(filmWatchingDate, `day`) === 0) {
        newFilteredFilms.push(film);
      }
    });

    this._filmsFiltered = newFilteredFilms;
    this._checkedInput = `Today`;
    this.updateElement();
    this._setChart();
    this.visibility();
  }

  _weekClickHandler() {
    const newFilteredFilms = [];
    const today = dayjs(Date.now());

    this._films.forEach((film) => {
      const filmWatchingDate = dayjs(film.userDetails.watchingDate);

      if (today.diff(filmWatchingDate, `week`) === 0) {
        newFilteredFilms.push(film);
      }
    });

    this._filmsFiltered = newFilteredFilms;
    this._checkedInput = `Week`;
    this.updateElement();
    this._setChart();
    this.visibility();
  }

  _monthClickHandler() {
    const newFilteredFilms = [];
    const today = dayjs(Date.now());

    this._films.forEach((film) => {
      const filmWatchingDate = dayjs(film.userDetails.watchingDate);

      if (today.diff(filmWatchingDate, `month`) === 0) {
        newFilteredFilms.push(film);
      }
    });

    this._filmsFiltered = newFilteredFilms;
    this._checkedInput = `Month`;
    this.updateElement();
    this._setChart();
    this.visibility();
  }

  _yearClickHandler() {
    const newFilteredFilms = [];
    const today = dayjs(Date.now());

    this._films.forEach((film) => {
      const filmWatchingDate = dayjs(film.userDetails.watchingDate);

      if (today.diff(filmWatchingDate, `year`) === 0) {
        newFilteredFilms.push(film);
      }
    });

    this._filmsFiltered = newFilteredFilms;
    this._checkedInput = `Year`;
    this.updateElement();
    this._setChart();
    this.visibility();
  }

  _uniqueLabelsAndCounters() {
    const genresCounters = {};
    const filmsGenres = this._filmsFiltered.map((film) => film.filmInfo.genre);

    filmsGenres.forEach((filmGenre) => {
      filmGenre.forEach((genre) => {
        if (genresCounters[genre]) {
          genresCounters[genre]++;
        } else {
          genresCounters[genre] = 1;
        }
      });
    });

    return genresCounters;
  }

  _setChart() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const labels = this._uniqueLabelsAndCounters();
    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * Object.keys(labels).length;

    this._genresChart = myChart(statisticCtx, labels);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`label[for="statistic-all-time"]`)
      .addEventListener(`click`, this._allTimeClickHandler);

    this.getElement()
      .querySelector(`label[for="statistic-today"]`)
      .addEventListener(`click`, this._todayClickHandler);

    this.getElement()
      .querySelector(`label[for="statistic-week"]`)
      .addEventListener(`click`, this._weekClickHandler);

    this.getElement()
      .querySelector(`label[for="statistic-month"]`)
      .addEventListener(`click`, this._monthClickHandler);

    this.getElement()
      .querySelector(`label[for="statistic-year"]`)
      .addEventListener(`click`, this._yearClickHandler);
  }
}
