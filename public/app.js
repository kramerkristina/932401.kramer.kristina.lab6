const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const resultContainer = document.getElementById('resultContainer');
const errorContainer = document.getElementById('errorContainer');

const resCity = document.getElementById('resCity');
const resTemp = document.getElementById('resTemp');
const resUnits = document.getElementById('resUnits');
const resCondition = document.getElementById('resCondition');
const errorText = document.getElementById('errorText');

async function fetchWeather() {
  const city = cityInput.value.trim();
  const selectedUnit = document.querySelector('input[name="units"]:checked').value;

  if (!city) return;

  try {
    const response = await fetch(`/api/weather/${city}?units=${selectedUnit}`);
    const data = await response.json();

    if (!response.ok) {
      errorText.textContent = data.error || 'Ошибка получения данных';
      errorContainer.classList.remove('hidden');
      resultContainer.classList.add('hidden');
      return;
    }

    resCity.textContent = data.city;
    resTemp.textContent = data.temp;
    resUnits.textContent = data.units;
    resCondition.textContent = data.condition;

    resultContainer.classList.remove('hidden');
    errorContainer.classList.add('hidden');
  } catch (err) {
    errorText.textContent = 'Нет связи с сервером (возможно, вы офлайн)';
    errorContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
  }
}

getWeatherBtn.addEventListener('click', fetchWeather);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker успешно зарегистрирован:', reg.scope))
      .catch((err) => console.error('Ошибка регистрации Service Worker:', err));
  });
}