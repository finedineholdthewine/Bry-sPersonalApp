const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getWeather(city = 'Hemet') {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);
  const data = await res.json();
  const temp = data.main?.temp;
  const condition = data.weather?.[0]?.description;
  return temp && condition ? `${temp}°F and ${condition}` : 'Weather data unavailable.';
}
