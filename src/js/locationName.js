function locationName(lat, long) {
  const apiKey = 'd4683b09d0c94ec0aebf0b2e043decbf';
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}&language=en`;
  return fetch(urlPosition).then(response => response.json());
}

export default locationName;
