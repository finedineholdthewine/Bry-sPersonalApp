import { getCryptoPrice } from '@/utils/getCryptoPrice';
import { getWeather } from '@/utils/getWeather';
import { getStockPrice } from '@/utils/getStockPrice';

export async function handleBryBot(userMessage: string, city = 'Hemet', timezone = 'America/Los_Angeles') {
  const message = userMessage.toLowerCase();

  if (message.includes('time')) {
    const now = new Date();
    return `It's currently ${now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
    })}.`;
  }

  if (message.includes('date')) {
    return `Today is ${new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })}.`;
  }

  const coinMatch = userMessage.match(/(?:price|crypto)\s+(of\s+)?(\w+)/i);
  if (coinMatch) {
    const coin = coinMatch[2].toLowerCase();
    const price = await getCryptoPrice(coin);
    return `${coin.charAt(0).toUpperCase() + coin.slice(1)} is currently $${price} USD.`;
  }

  if (message.includes('weather')) {
    const weather = await getWeather(city);
    return `The weather in ${city} is ${weather}.`;
  }

  const stockMatch = userMessage.match(/stock\s+([A-Z]{1,5})/i);
  if (stockMatch) {
    const symbol = stockMatch[1].toUpperCase();
    const price = await getStockPrice(symbol);
    return `${symbol} stock is currently $${price}.`;
  }

  return null;
}