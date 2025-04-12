export async function getUserCity(ip: string): Promise<{ city: string, timezone: string }> {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    return {
      city: data.city || 'your area',
      timezone: data.timezone || 'America/Los_Angeles', // default fallback
    };
  } catch (error) {
    return { city: 'your area', timezone: 'America/Los_Angeles' };
  }
}