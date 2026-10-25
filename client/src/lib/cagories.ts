// Category Color ကို DB မှာ မသိမ်းဘဲ Frontend မှာပဲ mapping လုပ်တယ်
const CATEGORY_BADGE_CLASSES: Record<string, string> = {
  အချစ်: "bg-rose-100 text-rose-700",
  အလွမ်း: "bg-violet-100 text-violet-700",
  ဝမ်းနည်း: "bg-sky-100 text-sky-700",
  ဟာသ: "bg-amber-100 text-amber-700",
  ဘဝအတွေးအခေါ်: "bg-emerald-100 text-emerald-700",
};

const DEFAULT_BADGE_CLASS = "bg-stone-100 text-stone-600";

export const CATEGORIES = Object.keys(CATEGORY_BADGE_CLASSES);

export const getBadgeClass = (category: string): string =>
  CATEGORY_BADGE_CLASSES[category] ?? DEFAULT_BADGE_CLASS;
