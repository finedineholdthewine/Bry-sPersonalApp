export async function getUserCity(ip: string): Promise<string> {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    return data.city || 'your area';
  } catch (error) {
    return 'your area';
  }
}
