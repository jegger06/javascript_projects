// Init storage object
const storage = new Storage;
// Get stored location data
const { city, state } = storage.getLocationData();
// Init weather object
const weather = new Weather(city, state);
// Init UI
const ui = new UI;


// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change Location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  // Change location
  weather.changeLocation(city, state);

  // Set location in LS
  storage.setLocationData(city, state);
  // Get and display weather
  getWeather();

  // Close modal
  $('#locModal').modal('hide');
});

function getWeather() {
  weather.getWeather()
    .then(results => ui.paint(results))
    .catch(err => console.log(err))
}