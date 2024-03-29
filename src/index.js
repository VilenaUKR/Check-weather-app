function formatDay(timestamp) {
  let now = new Date(timestamp);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekDay} ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let months = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = now.getDate(timestamp);
  let year = now.getFullYear();
  let month = months[now.getMonth()];

  return `${month} ${date}, ${year}`;
}

function formatForecastWeatherDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayImage(icon) {
  let iconPath = "icons/image01d.png";
  if (icon === `01d`) {
    iconPath = "icons/image01d.png";
  } else if (icon === `02d`) {
    iconPath = "icons/image02d.png";
  } else if (icon === `03d`) {
    iconPath = "icons/image03d.png";
  } else if (icon === `04d`) {
    iconPath = "icons/image04d.png";
  } else if (icon === `09d`) {
    iconPath = "icons/image09d.png";
  } else if (icon === `10d`) {
    iconPath = "icons/image10d.png";
  } else if (icon === `11d`) {
    iconPath = "icons/image11d.png";
  } else if (icon === `13d`) {
    iconPath = "icons/image13d.png";
  } else if (icon === `50d`) {
    iconPath = "icons/image50d.png";
  } else if (icon === `01n`) {
    iconPath = "icons/image01n.png";
  } else if (icon === `02`) {
    iconPath = "icons/image02n.png";
  } else if (icon === `03n`) {
    iconPath = "icons/image03n.png";
  } else if (icon === `04n`) {
    iconPath = "icons/image04n.png";
  } else if (icon === `09n`) {
    iconPath = "icons/image09n.png";
  } else if (icon === `10n`) {
    iconPath = "icons/image10n.png";
  } else if (icon === `11n`) {
    iconPath = "icons/image11n.png";
  } else if (icon === `13n`) {
    iconPath = "icons/image13n.png";
  } else if (icon === `50n`) {
    iconPath = "icons/image50n.png";
  } else {
    iconPath = "icons/image03d.png";
  }

  return iconPath;
}

function showForecastWeather(response) {
  let forecastWeather = response.data.daily;

  let forecastWeatherElement = document.querySelector("#weather-forecast");

  let forecastWeatherHTML = `<div class="row">`;
  forecastWeather.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastWeatherHTML =
        forecastWeatherHTML +
        `
 <div class="col-2">
   <div class="card" style="width: autom">
    <div class="weather-forecast-day">${formatForecastWeatherDay(
      forecastDay.dt
    )}</div>
     <div class="weather-forecast-temperature">
      <div class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}°</div>
       <div class="weather-forecast-temperature-min">${Math.round(
         forecastDay.temp.min
       )}°</div>
     </div>
     <span class="weather-forecast-image">
     <img src="${displayImage(
       forecastDay.weather[0].icon
     )}" alt="" class="img-forecast" />
     </span>
    </div>
  </div>
          `;
    }
  });
  forecastWeatherHTML = forecastWeatherHTML + `</div>`;
  forecastWeatherElement.innerHTML = forecastWeatherHTML;
}

function getForecastWeather(coordinates) {
  let apiKey = "47cf9a4f3105e2e2829ab9feb92923d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showForecastWeather);
}

function showCurrentTemperature(response) {
  let currantDayElement = document.querySelector("#currant-day");
  let currantDateElement = document.querySelector("#currant-date");
  let temperatureElement = document.querySelector("#temperature");
  let mainIconDescription = document.querySelector("#main-emoji-description");
  let cityElement = document.querySelector("#card-title");
  let humidityElement = document.querySelector("#humidity-element");
  let windSpeedElement = document.querySelector("#wind-speed");
  let image = document.querySelector("#image");
  let icon = response.data.weather[0].icon;
  //
  celsiusTemperature = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  currantDayElement.innerHTML = formatDay(response.data.dt * 1000);
  currantDateElement.innerHTML = formatDate(response.data.dt * 1000);
  mainIconDescription.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  image.setAttribute("src", displayImage(icon));

  getForecastWeather(response.data.coord);
}

function showCity(city) {
  let apiKey = "47cf9a4f3105e2e2829ab9feb92923d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#enter-city");
  let cardTitle = document.querySelector("#card-title");
  if (inputCity.value) {
    cardTitle.innerHTML = `${inputCity.value}`;
  } else {
    alert("Please, enter a city 🤷‍♂️");
  }
  showCity(inputCity.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusDegrees.classList.remove("active");
  fahrenheitDegrees.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusDegrees.classList.add("active");
  fahrenheitDegrees.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusDegrees = document.querySelector("#celsius-degrees-link");
celsiusDegrees.addEventListener("click", convertToCelsius);

let fahrenheitDegrees = document.querySelector("#fahrenheit-degrees-link");
fahrenheitDegrees.addEventListener("click", convertToFahrenheit);

let showCityForm = document.querySelector("#show-city");
showCityForm.addEventListener("submit", searchSubmit);

showCity("Kyiv");

//// current

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "47cf9a4f3105e2e2829ab9feb92923d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let buttonCurrentPosition = document.querySelector("#currant-location");
buttonCurrentPosition.addEventListener("click", getCurrentPosition);
