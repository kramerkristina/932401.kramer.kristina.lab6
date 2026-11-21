const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const mockWeather = {
  moscow: { city: 'Moscow', temp: 23, condition: 'clear' },
  tomsk: { city: 'Tomsk', temp: -8, condition: 'snow' },
  london: { city: 'London', temp: 15, condition: 'rainy' },
  tokyo: { city: 'Tokyo', temp: 20, condition: 'cloudy' },
  paris: { city: 'Paris', temp: 18, condition: 'partly cloudy' }
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/weather/:city', (req, res) => {
  const cityName = req.params.city.toLowerCase();
  const cityData = mockWeather[cityName];

  if (!cityData) {
    return res.status(404).json({ error: 'City not found' });
  }

  const isImperial = req.query.units === 'imperial';
  let temperature = cityData.temp;
  let unitSymbol = 'C';

  if (isImperial) {
    temperature = Math.round((cityData.temp * 9) / 5 + 32);
    unitSymbol = 'F';
  }

  res.json({
    city: cityData.city,
    temp: temperature,
    units: unitSymbol,
    condition: cityData.condition
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});