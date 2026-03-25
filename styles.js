const input = document.querySelector('.header-input');
const btn = document.querySelector('.header-button');
const weatherCity = document.querySelector('.city');
const weatherTemp = document.querySelector('.temp');
const weatherHumidity = document.querySelector('.humidityInfo');
const weatherWind = document.querySelector('.windSpeed');
const weatherImg = document.querySelector('.weatherImg');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = 'fbe09a7e1c9f1038e173b5176299ab09';

btn.addEventListener('click', () => {
  weatherData(input.value);
  input.value = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    weatherData(input.value);
    input.value = '';
  }
});

const weatherData = async (city) => {
  const response = await fetch(`${API_LINK}${city}&appid=${API_KEY}`);
  const data = await response.json();

  if (response.status !== 200) {
    alert('Город не найден');
    weatherData('moscow');
  }

  renderInfo(data);
};

const renderInfo = (data) => {
  weatherCity.textContent = data.name;
  weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherTemp.textContent = Math.round(data.main.temp - 273) + '°';
  weatherHumidity.textContent = data.main.humidity + '%';
  weatherWind.textContent = data.wind.speed + ' km/h';
};

function tick() {
  const now = new Date();
  document.querySelector('.date').innerHTML = now.toLocaleString('ru-RU');

  setTimeout(tick, 1000);
}

tick();
weatherData('moscow');
