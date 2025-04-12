import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "8.8.8.8";
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const geoData = await geoRes.json();

    if (!geoData.lat || !geoData.lon) {
      throw new Error("Could not get location from IP.");
    }

    const { lat, lon } = geoData;
    const pointRes = await fetch(`https://api.weather.gov/points/${lat},${lon}`, {
      headers: { "User-Agent": "brybot-weather-app (your@email.com)" },
    });

    const pointData = await pointRes.json();
    const forecastUrl = pointData.properties?.forecast;
    if (!forecastUrl) throw new Error("NWS forecast URL missing");

    const forecastRes = await fetch(forecastUrl, {
      headers: { "User-Agent": "brybot-weather-app (your@email.com)" },
    });

    const forecastData = await forecastRes.json();
    const forecast = forecastData.properties?.periods?.[0];

    if (!forecast) throw new Error("No forecast data found");

    return NextResponse.json({
      forecast: `🌤️ ${forecast.name}: ${forecast.detailedForecast}`,
      location: `${geoData.city}, ${geoData.regionName}`,
    });
  } catch (err: any) {
    console.error("❌ Weather fetch failed:", err.message);
    return NextResponse.json({ error: "Could not fetch weather." }, { status: 500 });
  }
}
