const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getWeather(city = 'Hemet') {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
    );
    const data = await res.json();
    if (!res.ok || !data.main || !data.weather) {
      return `Sorry, I couldn’t get the weather for ${city}.`;
    }
    const temp = data.main.temp;
    const condition = data.weather[0].description;
    return `${temp}°F and ${condition}`;
  } catch (err) {
    return `Weather info is unavailable right now.`;
  }
}