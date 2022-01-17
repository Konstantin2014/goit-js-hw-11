function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5c8dab899c73e9fec8517804e94f0209&units=metric&lang=en`;
  return fetch(url).then(response => response.json());
}

export default getWeatherByCity;
