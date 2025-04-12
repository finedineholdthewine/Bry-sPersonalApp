import { getCryptoPrice } from '@/utils/getCryptoPrice';
import { getStockPrice } from '@/utils/getStockPrice';

export async function handleBryBot(userMessage: string, city = 'Hemet', timezone = 'America/Los_Angeles') {
  const message = userMessage.toLowerCase();

  if (message.includes('time')) {
    const now = new Date();
    return {
      type: 'time',
      time: now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
      }),
    };
  }

  if (message.includes('date')) {
    return {
      type: 'date',
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    };
  }

  const coinMatch = userMessage.match(/(?:price|crypto)\s+(of\s+)?(\w+)/i);
  if (coinMatch) {
    const coin = coinMatch[2].toLowerCase();
    const price = await getCryptoPrice(coin);
    return { type: 'crypto', coin, price };
  }

  // 🔥 New NWS weather call
  if (message.includes('weather')) {
    try {
      const res = await fetch('/api/weather');
      const data = await res.json();

      if (data?.forecast) {
        return {
          type: 'weather',
          city: data.location,
          weather: data.forecast,
        };
      } else {
        return {
          type: 'weather',
          city: 'Unknown',
          weather: 'Could not fetch weather right now.',
        };
      }
    } catch (err: any) {
      return {
        type: 'weather',
        city: 'Unknown',
        weather: `Weather fetch error: ${err.message}`,
      };
    }
  }

  const stockMatch = userMessage.match(/stock\s+([A-Z]{1,5})/i);
  if (stockMatch) {
    const symbol = stockMatch[1].toUpperCase();
    const price = await getStockPrice(symbol);
    return { type: 'stock', symbol, price };
  }

  if (message.includes('what city') || message.includes('where am i') || message.includes('my city')) {
    return { type: 'city', city };
  }

  return null;
}
