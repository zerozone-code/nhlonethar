import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ImageUploaderProps {
  file: File | null; // အသစ်ရွေးထားတဲ့ ဖိုင်
  currentUrl: string; // ရှိပြီးသား ပုံ URL (Edit မှာ)
  onSelect: (file: File) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export default function ImageUploader({
  file,
  currentUrl,
  onSelect,
  onRemove,
  disabled = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // ရွေးထားတဲ့ ဖိုင်ကို Browser ထဲမှာပဲ Preview ပြ (Server မပို့ရသေးဘူး)
  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // Memory ပြန်ရှင်း
  }, [file]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    event.target.value = ""; // ဖိုင်တူကို ပြန်ရွေးလို့ရအောင်

    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      toast.error("JPG, PNG, WEBP ပုံတွေကိုပဲ တင်လို့ရပါတယ်");
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      toast.error("ပုံအရွယ်အစားက 5MB ထက် မကျော်ရပါ");
      return;
    }

    onSelect(selected);
  };

  const displayUrl = previewUrl || currentUrl;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />

      {displayUrl ? (
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={displayUrl}
            alt="Cover Preview"
            className="aspect-[16/9] w-full object-cover"
          />
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-wine shadow transition-colors hover:text-rose-brand"
            aria-label="ပုံဖယ်ရှားရန်"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-rose-200 bg-cream text-muted transition-colors hover:border-rose-brand hover:text-rose-brand"
        >
          <ImagePlus size={32} />
          <span className="text-sm">
            Cover ပုံ ရွေးရန် (JPG, PNG, WEBP · 5MB အောက်)
          </span>
        </button>
      )}

      {displayUrl && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="mt-3 text-sm font-medium text-rose-brand hover:underline"
        >
          တခြားပုံ ပြောင်းမယ်
        </button>
      )}
    </div>
  );
}
