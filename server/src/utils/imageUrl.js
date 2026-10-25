const MAX_URL_LENGTH = 1000;
const UNSPLASH_HOSTS = ["images.unsplash.com", "plus.unsplash.com"];

// ပြန်ပေးတာ: { url } (အောင်) သို့မဟုတ် { error } (မအောင်)
export const parseImageUrl = (value) => {
  const raw = String(value ?? "").trim();

  // မထည့်လည်းရတယ် (ပုံမပါတဲ့ ဝတ္ထု)
  if (!raw) return { url: "" };

  if (raw.length > MAX_URL_LENGTH) {
    return { error: "ပုံ URL က ရှည်လွန်းပါတယ်" };
  }

  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return { error: "ပုံ URL ပုံစံ မမှန်ပါ" };
  }

  // http:, javascript:, data: စတာတွေကို ပိတ်
  if (parsed.protocol !== "https:") {
    return { error: "https:// နဲ့စတဲ့ URL ကိုပဲ လက်ခံပါတယ်" };
  }

  if (parsed.username || parsed.password) {
    return { error: "ပုံ URL ပုံစံ မမှန်ပါ" };
  }

  // Unsplash ဆိုရင်ပဲ ပုံအရွယ်ချုံ့ Parameter ထည့် (တခြား Website မှာ အဓိပ္ပာယ်မရှိ)
  if (UNSPLASH_HOSTS.includes(parsed.hostname)) {
    if (!parsed.searchParams.has("w")) parsed.searchParams.set("w", "1600");
    if (!parsed.searchParams.has("q")) parsed.searchParams.set("q", "80");
    if (!parsed.searchParams.has("auto"))
      parsed.searchParams.set("auto", "format");
  }

  return { url: parsed.toString() };
};
