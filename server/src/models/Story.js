import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "ဝတ္ထုခေါင်းစဉ် ထည့်ပါ"],
      trim: true,
      maxlength: [150, "ခေါင်းစဉ်က စာလုံး ၁၅၀ ထက် မကျော်ရ"],
    },
    category: {
      type: String,
      required: [true, "အမျိုးအစား ရွေးပါ"],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "ဝတ္ထုစာသား ထည့်ပါ"], // အရှည် limit မရှိ
    },
    image: {
      url: { type: String, default: "", trim: true },
    },
  },
  { timestamps: true },
);

storySchema.index({ createdAt: -1 });

const Story = mongoose.model("Story", storySchema);

export default Story;
