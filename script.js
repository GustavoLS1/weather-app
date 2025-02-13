const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const apiKey = '5f28a400c9d98bfc1ef3bddf42b91e7b'

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") 
  updateWeatherInfo(cityInput.value)
  cityInput.value = "";
  cityInput.blur();
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
   updateWeatherInfo(cityInput.value)
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData (endPoint, city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}`

    const response = await fetch(apiURL)
    return response.json()
}

async function updateWeatherInfo (city) {
    const weatherData = await getFetchData('weather', city)
    console.log(weatherData);
    
}
