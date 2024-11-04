const apiKey = "4f591b93b4d529fcd06acc75ca90d6df";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchInput = document.querySelector('.search-box input');

const searchButton = document.querySelector('.search-box button');

const weather = document.querySelector(".weather");

//Async function 

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&APPID=${apiKey}`);
  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  }
  const data = await response.json();
  console.log(data, "data");

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = 
    Math.round(data.main.temp) + "&#8451";

  document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
  document.querySelector(".wind").innerHTML = data.wind.speed + 'km/h';

  if (data.weather[0].main == "Clear") {
    weatherIcon.className = "uil uil-sun";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.className = "uil uil-raindrops-alt"; 
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.className = "uil uil-cloud-moon-rain"; 
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.className = "uil uil-cloud-drizzle"; 
  }

  weather.style.display = "block";
  error.style.display = "none";
}

// Add EventListener on click

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";  
  }
})
