function getBackgroundByName(place) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '7651496-c67782022e70c733874c351a4';
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${place}&image_type=background&orientation=horizontal&safesearch=true&per_page=40`,
  ).then(response => response.json());
}

export default getBackgroundByName;
