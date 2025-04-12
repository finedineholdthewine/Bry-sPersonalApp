export async function getCryptoPrice(coin: string = 'bitcoin') {
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
  const data = await res.json();
  return data[coin]?.usd || 'Unavailable';
}
