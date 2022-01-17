function getBackgroundByName(place) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '25251210-ac1999c1ffdbc1fb6fbdee37e';
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${place}&image_type=background&orientation=horizontal&safesearch=true&per_page=40`,
  ).then(response => response.json());
}

export default getBackgroundByName;
