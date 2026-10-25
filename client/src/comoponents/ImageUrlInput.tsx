import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { getImageUrlError, withWidth } from "../lib/imageUrl";

interface ImageUrlInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUrlInput({
  value,
  onChange,
  disabled = false,
}: ImageUrlInputProps) {
  const [loadFailed, setLoadFailed] = useState(false);

  const trimmed = value.trim();
  const urlError = getImageUrlError(trimmed);
  const canPreview = trimmed !== "" && urlError === null;

  // URL ပြောင်းတိုင်း Preview Error ကို ပြန်ရှင်း
  useEffect(() => {
    setLoadFailed(false);
  }, [trimmed]);

  return (
    <div>
      <input
        type="url"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https://images.unsplash.com/photo-..."
        disabled={disabled}
        inputMode="url"
        autoComplete="off"
        className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 outline-none transition focus:border-rose-brand focus:ring-2 focus:ring-rose-brand/20"
      />

      {urlError ? (
        <p className="mt-2 text-sm text-red-600">{urlError}</p>
      ) : (
        <p className="mt-2 text-xs text-muted">
          Unsplash မှာ ပုံကို Right-click → "Copy image address" နဲ့ ကူးထားတဲ့
          URL ကို paste လုပ်ပါ။
        </p>
      )}

      {canPreview && (
        <div className="mt-4 overflow-hidden rounded-2xl bg-rose-soft">
          {loadFailed ? (
            <div className="flex aspect-[16/9] flex-col items-center justify-center gap-2 text-muted">
              <ImageOff size={32} />
              <span className="text-sm">
                ပုံကို ဖွင့်မရပါဘူး၊ URL ပြန်စစ်ပါ
              </span>
            </div>
          ) : (
            <img
              src={withWidth(trimmed, 800)}
              alt="Cover Preview"
              onError={() => setLoadFailed(true)}
              className="aspect-[16/9] w-full object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}
