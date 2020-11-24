const weather = document.querySelector(".js-weather");
const API_KEY = "36d82c64d174570b6e7e1ad1aa54b932";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(response) {
    return response.json();
  }).then(function(json){
    console.log(json);
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(params) {
  console.log('cant success geo location')
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


function loadCoords() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    //getWeather
    const parseCoords = JSON.parse(loadCoords);
    console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();