import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import { formatDate } from "../../lib/formatDate";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { isUnauthorized } from "../../lib/isUnauthorized";
import { useAuthStore } from "../../store/useAuthStore";
import { useStoryStore } from "../../store/useStoryStore";
import CategoryBadge from "../../comoponents/CategoryBadge";
import ConfirmDialog from "../../comoponents/ConfirmDialog";
import type { StorySummary } from "../../types/story";
import { withWidth } from "../../lib/imageUrl";
export default function StoryListPage() {
  const stories = useStoryStore((state) => state.stories);
  const isLoading = useStoryStore((state) => state.isLoading);
  const error = useStoryStore((state) => state.error);
  const fetchStories = useStoryStore((state) => state.fetchStories);
  const clearAdmin = useAuthStore((state) => state.clearAdmin);

  const [deleteTarget, setDeleteTarget] = useState<StorySummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ပြင်/ဖျက်ပြီးပြန်လာရင် Data အသစ်ရဖို့ အမြဲ ပြန်ယူ
  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await api.delete(`/stories/${deleteTarget._id}`);
      toast.success("ဝတ္ထု ဖျက်ပြီးပါပြီ");
      setDeleteTarget(null);
      await fetchStories();
    } catch (err) {
      if (isUnauthorized(err)) {
        clearAdmin();
        return;
      }
      toast.error(getErrorMessage(err, "ဝတ္ထု ဖျက်လို့မရပါ"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">ဝတ္ထုများ</h1>
          <p className="mt-1 text-muted">ဝတ္ထုတွေကို ထည့်၊ ပြင်၊ ဖျက်ရန်</p>
        </div>
        <Link
          to="/admin/stories/new"
          className="inline-flex items-center gap-2 rounded-full bg-rose-brand px-6 py-3 text-sm font-medium text-white shadow-lg shadow-rose-brand/30 transition-all hover:-translate-y-0.5"
        >
          <Plus size={18} />
          ဝတ္ထုအသစ်ထည့်မယ်
        </Link>
      </div>

      <div className="mt-8">
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-2xl bg-rose-soft"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center">
            <p className="text-muted">{error}</p>
            <button
              type="button"
              onClick={fetchStories}
              className="mt-4 rounded-full bg-rose-brand px-6 py-2 text-sm font-medium text-white"
            >
              ပြန်စမ်းကြည့်မယ်
            </button>
          </div>
        )}

        {!isLoading && !error && stories.length === 0 && (
          <p className="py-16 text-center text-muted">
            ဝတ္ထု မရှိသေးပါဘူး။ "ဝတ္ထုအသစ်ထည့်မယ်" ကို နှိပ်ပြီး စတင်လိုက်ပါ ♡
          </p>
        )}

        {!isLoading && !error && stories.length > 0 && (
          <ul className="space-y-4">
            {stories.map((story) => (
              <li
                key={story._id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-rose-soft sm:h-20 sm:w-20">
                  {story.image.url ? (
                    <img
                      src={withWidth(story.image.url, 800)}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl text-rose-brand/40">
                      ♡
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{story.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <CategoryBadge category={story.category} />
                    <span className="text-xs text-muted">
                      {formatDate(story.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    to={`/admin/stories/${story._id}/edit`}
                    className="rounded-full p-2 text-muted transition-colors hover:bg-rose-soft hover:text-rose-brand"
                    aria-label="ပြင်ရန်"
                  >
                    <Pencil size={18} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(story)}
                    className="rounded-full p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="ဖျက်ရန်"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="ဝတ္ထုကို ဖျက်မလား?"
        message={`"${deleteTarget?.title ?? ""}" ကို ဖျက်လိုက်ရင် ပြန်ယူလို့ မရတော့ပါဘူး၊ Cover ပုံပါ ပျက်သွားမယ်။`}
        confirmLabel="ဖျက်မယ်"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
