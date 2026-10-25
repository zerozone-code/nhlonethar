const UNSPLASH_HOSTS = ["images.unsplash.com", "plus.unsplash.com"];

// မှားရင် Error စာ ပြန်၊ မှန်ရင် (သို့) အလွတ်ဆိုရင် null
export const getImageUrlError = (value: string): string | null => {
  const raw = value.trim();
  if (!raw) return null; // ပုံမထည့်လည်းရ

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return "URL ပုံစံ မမှန်ပါ";
  }

  if (parsed.protocol !== "https:") {
    return "https:// နဲ့စတဲ့ URL ကိုပဲ လက်ခံပါတယ်";
  }

  return null;
};

// Unsplash ပုံဆိုရင်ပဲ Width ညှိ၊ တခြား Website ပုံကို မထိဘူး
export const withWidth = (url: string, width: number): string => {
  try {
    const parsed = new URL(url);
    if (!UNSPLASH_HOSTS.includes(parsed.hostname)) return url;

    parsed.searchParams.set("w", String(width));
    return parsed.toString();
  } catch {
    return url;
  }
};
