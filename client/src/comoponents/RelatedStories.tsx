import React, { useEffect } from "react";
import { useStoryStore } from "../store/useStoryStore";
import StoryCard from "./StoryCard";

const MAX_RELATED = 3;
const RelatedStories = ({
  currentId,
  category,
}: {
  currentId: string;
  category: string;
}) => {
  const stories = useStoryStore((state) => state.stories);
  const fetchStories = useStoryStore((state) => state.fetchStories);

  useEffect(() => {
    if (stories.length === 0) {
      fetchStories();
    }
  }, [stories.length, fetchStories]);

  const other = stories.filter((story) => story.id !== currentId);
  const sameCategory = stories.filter((story) => story.category === category);
  const differentCategoy = stories.filter(
    (story) => story.category !== category,
  );

  const related = [...sameCategory, ...differentCategoy].slice(0, MAX_RELATED);

  if (related.length === 0) return null;
  return (
    <section className="mt-20 border-t border-rose-100 py-16">
      <h2 className="text-center text-xl font-bold sm:text-2xl">
        ဆက်စပ်ဝတ္ထုများ
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {related.map((story, index) => (
          <StoryCard key={story._id} index={index} story={story} />
        ))}
      </div>
    </section>
  );
};

export default RelatedStories;
