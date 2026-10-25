import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import { CATEGORIES } from "../../lib/cagories";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { getImageUrlError } from "../../lib/imageUrl";
import { isUnauthorized } from "../../lib/isUnauthorized";
import { useAuthStore } from "../../store/useAuthStore";
import ImageUrlInput from "../../comoponents/ImageUrlInput";
import NotFoundPage from "../NotFoundPage";
import type { Story } from "../../types/story";

type LoadStatus = "loading" | "ready" | "notFound" | "error";

const inputClass =
  "mt-2 w-full rounded-xl border border-rose-100 bg-white px-4 py-3 outline-none transition focus:border-rose-brand focus:ring-2 focus:ring-rose-brand/20";

export default function StoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const clearAdmin = useAuthStore((state) => state.clearAdmin);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [status, setStatus] = useState<LoadStatus>(
    isEdit ? "loading" : "ready",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit ဆိုရင် ရှိပြီးသားဝတ္ထုကို ယူပြီး Form ထဲ ဖြည့်
  useEffect(() => {
    if (!id) return;

    let isCancelled = false;

    const loadStory = async () => {
      setStatus("loading");
      try {
        const res = await api.get<Story>(`/stories/${id}`);
        if (isCancelled) return;

        setTitle(res.data.title);
        // Category အဟောင်း (စာရင်းထဲမပါတာ) ဆိုရင် အလွတ်ထား၊ ပြန်ရွေးခိုင်းမယ်
        setCategory(
          CATEGORIES.includes(res.data.category) ? res.data.category : "",
        );
        setText(res.data.text);
        setImageUrl(res.data.image.url);
        setStatus("ready");
      } catch (error) {
        if (isCancelled) return;
        console.error(error);
        const code = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;
        setStatus(code === 404 || code === 400 ? "notFound" : "error");
      }
    };

    loadStory();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedText = text.trim();
    const trimmedImageUrl = imageUrl.trim();

    if (!trimmedTitle) return toast.error("ဝတ္ထုခေါင်းစဉ် ထည့်ပါ");
    if (!category) return toast.error("အမျိုးအစား ရွေးပါ");
    if (!trimmedText) return toast.error("ဝတ္ထုစာသား ထည့်ပါ");

    const imageError = getImageUrlError(trimmedImageUrl);
    if (imageError) return toast.error(imageError);

    // ဖိုင် Upload မရှိတော့လို့ ရိုးရိုး JSON နဲ့ပို့
    const payload = {
      title: trimmedTitle,
      category,
      text: trimmedText,
      imageUrl: trimmedImageUrl, // အလွတ်ပို့ရင် ပုံမပါတော့ဘူး
    };

    setIsSubmitting(true);
    try {
      if (isEdit) {
        await api.put(`/stories/${id}`, payload);
        toast.success("ပြင်ဆင်ပြီးပါပြီ ♡");
      } else {
        await api.post("/stories", payload);
        toast.success("ဝတ္ထုအသစ် ထည့်ပြီးပါပြီ ♡");
      }
      navigate("/admin/stories");
    } catch (error) {
      if (isUnauthorized(error)) {
        toast.error("Session ကုန်သွားပါပြီ၊ ပြန် Login ဝင်ပါ");
        clearAdmin();
        return;
      }
      toast.error(getErrorMessage(error, "သိမ်းလို့မရပါ"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div className="h-96 animate-pulse rounded-3xl bg-rose-soft" />;
  }

  if (status === "notFound") {
    return <NotFoundPage message="ဒီဝတ္ထုကို ရှာမတွေ့ပါဘူး" />;
  }

  if (status === "error") {
    return (
      <p className="py-16 text-center text-muted">ဝတ္ထု ဆွဲယူလို့ မရသေးပါဘူး</p>
    );
  }

  return (
    <div className="animate-fade-up mx-auto max-w-3xl">
      <Link
        to="/admin/stories"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-rose-brand"
      >
        <ArrowLeft size={16} />
        ဝတ္ထုစာရင်းသို့
      </Link>

      <h1 className="mt-4 text-2xl font-bold">
        {isEdit ? "ဝတ္ထု ပြင်ဆင်ရန်" : "ဝတ္ထုအသစ် ထည့်ရန်"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="title" className="text-sm font-medium">
            ခေါင်းစဉ်
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={150}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="category" className="text-sm font-medium">
            အမျိုးအစား
          </label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          >
            <option value="">ရွေးချယ်ပါ</option>
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="imageUrl" className="text-sm font-medium">
            Cover ပုံ URL (မထည့်လည်းရ)
          </label>
          <div className="mt-2">
            <ImageUrlInput
              value={imageUrl}
              onChange={setImageUrl}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="text" className="text-sm font-medium">
            ဝတ္ထုစာသား
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={16}
            disabled={isSubmitting}
            className={`${inputClass} leading-loose`}
          />
          <p className="mt-1 text-xs text-muted">
            Enter ခေါက်တဲ့နေရာတိုင်းမှာ Paragraph အသစ် ဖြစ်မယ် · စာလုံးရေ{" "}
            {text.length}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            to="/admin/stories"
            className="rounded-full px-6 py-3 text-sm font-medium hover:bg-rose-soft"
          >
            မလုပ်တော့ဘူး
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-rose-brand px-8 py-3 text-sm font-medium text-white shadow-lg shadow-rose-brand/30 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting
              ? "သိမ်းနေပါတယ်..."
              : isEdit
                ? "ပြင်ပြီးသိမ်းမယ်"
                : "ထည့်မယ်"}
          </button>
        </div>
      </form>
    </div>
  );
}
