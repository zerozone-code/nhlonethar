import React, { useEffect } from "react";
import { useStoryStore } from "../store/useStoryStore";
import StoryCardSkeleton from "./StoryCardSkeleton";
import StoryCard from "./StoryCard";
import { CATEGORIES } from "../lib/cagories";
import CategoryBadge from "./CategoryBadge";

const StorySection = () => {
  const stories = useStoryStore((state) => state.stories);
  const isLoading = useStoryStore((state) => state.isLoading);
  const error = useStoryStore((state) => state.error);
  const fetchStories = useStoryStore((state) => state.fetchStories);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <StoryCardSkeleton key={i} />
          ))}
        </div>
      );
    }
    if (error) {
      return (
        <div className="mt-16 text-center">
          <p className="text-muted">{error}</p>
          <button
            onClick={fetchStories}
            type="button"
            className="mt-4 rounded-full bg-rose-brand px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            ပြန်စမ်းကြည့်မယ်
          </button>
        </div>
      );
    }

    if (stories.length === 0) {
      return (
        <p className="mt-16 text-center text-muted">
          ဝတ္ထုတွေ မရှိသေးပါ" မကြာမီ ထပ်တင်ပေးပါမယ် ♡
        </p>
      );
    }

    return (
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <StoryCard key={story._id} story={story} index={index} />
        ))}
      </div>
    );
  };

  return (
    <section id="stories" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className=" text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">ဝတ္ထုလေးများ</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          သင့်ရဲ့ ခံစားချက်နဲ့ တိုက်ဆိုင်မယ့် ဇာတ်လမ်းလေးတွေကို
          ရွေးချယ်ဖတ်ရှုလိုက်ပါ။
        </p>
      </div>
      {/* category */}

      <div
        id="categories"
        className="mt-8 flex scroll-mt-24 flex-wrap justify-center gap-2"
      >
        {CATEGORIES.map((category) => (
          <CategoryBadge key={category} category={category} />
        ))}
      </div>
      {renderContent()}
    </section>
  );
};

export default StorySection;
