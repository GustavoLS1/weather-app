const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySelection = document.querySelector('.search-city')

const countryTxt = document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-text')
const humidityValueTxt = document.querySelector('.humidity-value-txt')
const windValueTxt = document.querySelector('.wind-value-txt')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDateTxt = document.querySelector('.current-date-txt')

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
    const apiURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiURL)
    return response.json()
}

function getWeaatherIcon (id) {
  if(id <= 232) return 'thunderstorm.svg'
  if(id <= 321) return 'drizzle.svg'
  if(id <= 531) return 'rain.svg'
  if(id <= 622) return 'snow.svg'
  if(id <= 781) return 'atmosphere.svg'
  if(id <= 800) return 'clear.svg'
  if(id <= 804) return 'clouds.svg'
  else return 'clouds.svg'
  console.log(id);
  
}

function getCurrentDate () {
  const currentDate = new Date()
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  }
  console.log(currentDate);
  return  currentDate.toLocaleDateString('en-US', options)
  
  
}

async function updateWeatherInfo (city) {
    const weatherData = await getFetchData('weather', city)

    if(weatherData.cod != 200) {
      showDisplaySection(notFoundSection)
      return
      
      
    }
    console.log(weatherData);

    const {
      name: country,
      main: {temp, humidity},
      weather: [{id, main}],
      wind: {speed}
    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + ' ℃'
    conditionTxt.textContent = main
    humidityValueTxt.textContent = humidity + '%'
    windValueTxt.textContent = speed + ' M/s'

    currentDateTxt.textContent = getCurrentDate()
    weatherSummaryImg.src = `assets/weather/${getWeaatherIcon(id)}`

    showDisplaySection(weatherInfoSection)
    
}

function showDisplaySection (section) {
  [weatherInfoSection, searchCitySelection, notFoundSection]
    .forEach(section => section.style.display = 'none') 

    section.style.display = 'flex'
}
