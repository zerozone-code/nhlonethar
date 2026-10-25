import mongoose from "mongoose";
import Story from "../models/Story.js";
import { STORY_CATEGORIES } from "../constants/categories.js";
import { parseImageUrl } from "../utils/imageUrl.js";

const EXCERPT_LENGTH = 160;

// DB ထဲ ဟောင်းတဲ့ publicId လို Field ရှိနေရင်လည်း Frontend ကို url ပဲ ပို့
const toImage = (story) => ({ url: story.image?.url ?? "" });

// ---------- Public ----------

// GET /api/stories
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).lean();

    const summaries = stories.map((story) => ({
      _id: story._id,
      title: story.title,
      category: story.category,
      excerpt: story.text.replace(/\s+/g, " ").trim().slice(0, EXCERPT_LENGTH),
      image: toImage(story),
      createdAt: story.createdAt,
    }));

    res.json(summaries);
  } catch (error) {
    console.error("getStories error:", error);
    res.status(500).json({ message: "ဝတ္ထုစာရင်း ယူလို့မရပါ" });
  }
};

// GET /api/stories/:id
export const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID ပုံစံ မှားနေပါတယ်" });
    }

    const story = await Story.findById(id).lean();

    if (!story) {
      return res.status(404).json({ message: "ဝတ္ထု ရှာမတွေ့ပါ" });
    }

    res.json({ ...story, image: toImage(story) });
  } catch (error) {
    console.error("getStoryById error:", error);
    res.status(500).json({ message: "ဝတ္ထု ယူလို့မရပါ" });
  }
};

// ---------- Admin ----------

// Body ကို စစ်ပြီး DB ထဲ သိမ်းမယ့် ပုံစံ ပြောင်း၊ မှားရင် { error }
const buildStoryData = (body = {}) => {
  const title = String(body.title ?? "").trim();
  const category = String(body.category ?? "").trim();
  const text = String(body.text ?? "").trim();

  if (!title) return { error: "ဝတ္ထုခေါင်းစဉ် ထည့်ပါ" };
  if (title.length > 150)
    return { error: "ခေါင်းစဉ်က စာလုံး ၁၅၀ ထက် မကျော်ရပါ" };
  if (!STORY_CATEGORIES.includes(category)) {
    return { error: "အမျိုးအစား မှန်ကန်စွာ ရွေးပါ" };
  }
  if (!text) return { error: "ဝတ္ထုစာသား ထည့်ပါ" };

  const image = parseImageUrl(body.imageUrl);
  if (image.error) return { error: image.error };

  return { data: { title, category, text, image: { url: image.url } } };
};

// POST /api/stories
export const createStory = async (req, res) => {
  try {
    const { data, error } = buildStoryData(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const story = await Story.create(data);
    res.status(201).json(story);
  } catch (error) {
    console.error("createStory error:", error);
    res.status(500).json({ message: "ဝတ္ထု ထည့်လို့မရပါ" });
  }
};

// PUT /api/stories/:id
export const updateStory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID ပုံစံ မှားနေပါတယ်" });
    }

    const { data, error } = buildStoryData(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const story = await Story.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!story) {
      return res.status(404).json({ message: "ဝတ္ထု ရှာမတွေ့ပါ" });
    }

    res.json(story);
  } catch (error) {
    console.error("updateStory error:", error);
    res.status(500).json({ message: "ဝတ္ထု ပြင်လို့မရပါ" });
  }
};

// DELETE /api/stories/:id
export const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID ပုံစံ မှားနေပါတယ်" });
    }

    const story = await Story.findByIdAndDelete(id);

    if (!story) {
      return res.status(404).json({ message: "ဝတ္ထု ရှာမတွေ့ပါ" });
    }

    res.json({ message: "ဝတ္ထု ဖျက်ပြီးပါပြီ" });
  } catch (error) {
    console.error("deleteStory error:", error);
    res.status(500).json({ message: "ဝတ္ထု ဖျက်လို့မရပါ" });
  }
};
