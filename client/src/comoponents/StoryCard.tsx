import React from "react";
import type { StorySummary } from "../types/story";
import CategoryBadge from "./CategoryBadge";
import { Link } from "react-router-dom";
import { withWidth } from "../lib/imageUrl";
interface StoryCardProps {
  story: StorySummary;
  index: number;
}
const StoryCard = ({ story, index }: StoryCardProps) => {
  return (
    <article
      style={{ animationDelay: `${Math.min(index, 8) * 80}ms` }}
      className="animate-fade-up group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-brand/10"
    >
      {/* cover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-rose-soft">
        {story.image.url ? (
          <img
            src={withWidth(story.image.url, 800)}
            alt={story.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="aspect-[16/9] h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl text-rose-brand/40">
            ♡
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col p-6">
        <div>
          <CategoryBadge category={story.category} />
        </div>
        <h3 className="mt-3 line-clamp-2 text-lg font-bold">{story.title}</h3>
        <p className="mt-2  line-clamp-3 flex-1 text-sm text-muted">
          {story.title}
        </p>
        <Link
          to={`/stories/${story._id}`}
          className="mt-5 inline-flex items-center self-start text-sm font-semibold text-rose-brand  transition-all hover:gap-2"
        >
          ဆက်ဖတ်ရန်
        </Link>
      </div>
    </article>
  );
};

export default StoryCard;
