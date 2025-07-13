const apiKey = "275c96e390c71fa8ff35b861b8c1c6e0"; 
const weatherInfo = document.getElementById("weatherInfo");

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      getWeatherByCoords(position.coords.latitude, position.coords.longitude);
    }, () => {
      weatherInfo.innerHTML = "<p>Please allow location access or enter a city name.</p>";
    });
  }
};

function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function fetchWeather(url) {
  weatherInfo.innerHTML = "<p>Loading...</p>";
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
function displayWeather(data) {
  const { name, main, weather } = data;
  const temp = main.temp.toFixed(1);
  const desc = weather[0].description;
  const condition = weather[0].main;

  setBackground(condition);

  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Condition:</strong> ${desc}</p>
  `;
}

function setBackground(condition) {
  let bgUrl = "";

  switch (condition.toLowerCase()) {
    case "clear":
      bgUrl = "url('images/clear.jpg')";
      break;
    case "clouds":
      bgUrl = "url('images/clouds.jpg')";
      break;
    case "rain":
      bgUrl = "url('images/rain.jpg')";
      break;
    case "thunderstorm":
      bgUrl = "url('images/thunderstorm.jpg')";
      break;
    case "snow":
      bgUrl = "url('images/snow.jpg')";
      break;
    case "mist":
    case "fog":
      bgUrl = "url('images/fog.jpg')";
      break;
    default:
      bgUrl = "url('images/default.jpg')";
  }

  document.body.style.backgroundImage = bgUrl;
}
