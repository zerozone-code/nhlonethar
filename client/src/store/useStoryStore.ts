import { create } from "zustand";
import type { StorySummary } from "../types/story";
import api from "../lib/axios";

interface StoryState {
  stories: StorySummary[];
  isLoading: boolean;
  error: string | null;
  fetchStories: () => Promise<void>;
}

export const useStoryStore = create<StoryState>((set) => ({
  stories: [],
  isLoading: true,
  error: null,
  fetchStories: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get<StorySummary[]>("/stories");
      set({ stories: res.data });
    } catch (error) {
      console.error(error);
      set({ error: "stories can not fetch" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
