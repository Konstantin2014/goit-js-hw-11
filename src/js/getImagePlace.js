function getLocationName(lat, long) {
  const apiKey = '7651496-c67782022e70c733874c351a4';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}&language=en`;
  return fetch(url).then(response => response.json());
}

export default getLocationName;
