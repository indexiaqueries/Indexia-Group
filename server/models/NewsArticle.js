import mongoose from "mongoose";

const newsArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    source: { type: String, default: "" },
    sourceUrl: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },
    category: {
      type: String,
      enum: ["finance", "warehouse", "export", "athlete"],
      required: true,
    },
    keywords: [{ type: String }],
    articleUrl: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

newsArticleSchema.index({ category: 1, publishedAt: -1 });
newsArticleSchema.index({ articleUrl: 1 }, { unique: true });

export default mongoose.model("NewsArticle", newsArticleSchema);
