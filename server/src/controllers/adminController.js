import Story from "../models/Story.js";

export const getStats = async (req, res) => {
  try {
    const [totalStories, categoryGroups] = await Promise.all([
      Story.countDocuments(),
      Story.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    res.json({
      totalStories,
      categories: categoryGroups.map((group) => ({
        category: group._id,
        count: group.count,
      })),
    });
  } catch (error) {
    console.log("getStats error:", error.message);
    res.status(500).json({ message: "စားရင်းဇယား ယူလို့မရပါ" });
  }
};
