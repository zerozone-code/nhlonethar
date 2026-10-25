import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryBadge from "../comoponents/CategoryBadge";
import type { Story } from "../types/story";
import axios from "axios";
import api from "../lib/axios";
import StoryCardSkeleton from "../comoponents/StoryCardSkeleton";
import NotFoundPage from "./NotFoundPage";
import { formatDate } from "../lib/formatDate";
import RelatedStories from "../comoponents/RelatedStories";

type LoadStatus = "loading" | "success" | "notFound" | "error";

const StoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");

  useEffect(() => {
    let isCancelled = false;

    const loadStory = async () => {
      setStatus("loading");
      try {
        const res = await api.get<Story>(`/stories/${id}`);
        if (isCancelled) return;
        setStory(res.data);
        setStatus("success");
      } catch (error) {
        if (isCancelled) return;
        console.log(error);
        const isMissing =
          axios.isAxiosError(error) &&
          (error.response?.status === 404 || error.response?.status === 400);
        setStatus(isMissing ? "notFound" : "error");
      }
    };
    loadStory();
    return () => {
      isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (story) document.title = `${story.title} | နှလုံးသား♡`;
    return () => {
      document.title = "နှလုံးသား♡";
    };
  }, [story]);

  if (status === "loading") return <StoryCardSkeleton />;
  if (status === "notFound") {
    return <NotFoundPage message="ဒီဝတ္ထုကို ရှာမတွေ့ပါဘူး" />;
  }

  if (status === "error" || !story) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <p className="text-muted">ဝတ္ထု ဆွဲယူလို့ မရသေးပါဘူး</p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm font-semibold text-rose-brand"
        >
          ပင်မစာမျက်နှာသို့
        </Link>
      </div>
    );
  }
  const paragraphs = story.text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <article className="animate-fade-up mx-auto max-w-2xl">
        <Link
          to={"/"}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-rose-brand"
        >
          <ArrowLeft size={16} />
          ပင်မစာမျက်နှာသို့ ပြန်သွားမယ်
        </Link>

        <header className="mt-8">
          <CategoryBadge category={story.category} />
          <h1 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl sm:leading-snug">
            {story.title}
          </h1>
          <p className="mt-3 text-sm text-muted">
            ထုတ်ဝေသည့်ရက်စွဲ - {formatDate(story.createdAt)}
          </p>
        </header>

        {story.image.url && (
          <img
            src={story.image.url}
            alt={story.title}
            referrerPolicy="no-referrer"
            className="mt-8 h-100 w-full rounded-3xl object-cover"
          />
        )}
        <div className=" mt-10  space-y-6 text-lg leading-[2.1]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-14 text- text-2xl text-rose-brand/50">♡</p>
      </article>
      <RelatedStories currentId={story._id} category={story.category} />
    </div>
  );
};

export default StoryDetailPage;
