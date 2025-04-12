const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export async function getStockPrice(symbol = 'AAPL') {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  );
  const data = await res.json();
  return data['Global Quote']?.['05. price'] || 'Stock data unavailable.';
}