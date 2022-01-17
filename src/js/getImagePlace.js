function getLocationName(lat, long) {
  const apiKey = 'd4683b09d0c94ec0aebf0b2e043decbf';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}&language=en`;
  return fetch(url).then(response => response.json());
}

export default getLocationName;
