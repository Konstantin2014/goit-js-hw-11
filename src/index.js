import getWeatherByCoords from './js/weatherBycoords';
import { getRefs } from './js/getRefs';
import locationName from './js/locationName';
import getBackgroundByName from './js/getBackgroundByName';
import { Skycons } from './js/skycons';
import getWeatherByCity from './js/weatherByCity';

const refs = getRefs();
import './css/common.css';

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const city = e.currentTarget.elements.input.value;
  getWeatherByCity(city).then(renderWeather);
  renderBackground(city);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const long = position?.coords?.longitude;
    const lat = position?.coords?.latitude;
    getWeatherByCoords(lat, long).then(renderWeather);
    locationName(lat, long).then(data => {
      const place = data.results[0].components?.village || data.results[0].components?.city;
      renderBackground(place);
    });
  });
}
const stateWeather = {
  clouds: 'PARTLY_CLOUDY_DAY',
};

function setSkycon(icon) {
  const skycons = new Skycons({ color: 'lightblue' });
  const updateIcon = icon.toUpperCase();
  console.log(updateIcon);
  skycons.set(refs.skycon, Skycons.PARTLY_CLOUDY_NIGHT);
  skycons.play();
}

function renderWeather(data) {
  refs.tempDegree.textContent = Math.round(data.main.temp);
  refs.location.textContent = data.name;
  refs.tempDesc.textContent = data.weather[0].main;
  setSkycon(data.weather[0].main);
  refs.icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

//'clear sky', 'few clouds','scattered clouds',"broken clouds","shower rain",'rain','thunderstorm','snow','mist'
//clear-day,clear-night,partly-cloudy-day,partly-cloudy-night,cloudy,rain,sleet,snow,wind,fog

function renderBackground(place) {
  getBackgroundByName(place).then(data => {
    const randomIntegerFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const randomImg = randomIntegerFromInterval(0, data.hits.length - 1);
    document.body.style = `background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
  url('${data.hits[randomImg].largeImageURL}') center fixed; background-size: cover;`;
  });
}
