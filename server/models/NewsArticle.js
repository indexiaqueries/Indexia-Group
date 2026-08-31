import mongoose from "mongoose";

const newsArticleSchema = new mongoose.Schema(
  {
    // NewsData.io fields
    articleId: { type: String, index: true },          // article_id
    title: { type: String, required: true },
    description: { type: String, default: "" },
    link: { type: String, required: true }, // article URL from API
    keywords: [{ type: String }],                        // keywords array
    creator: [{ type: String }],                         // creator / author names
    language: { type: String, default: "en" },
    country: [{ type: String }],                         // e.g. ["in"]
    categories: [{ type: String }],                      // API category array e.g. ["business","top"]
    pubDate: { type: Date, default: Date.now },
    image: { type: String, default: "" },                // image_url
    videoUrl: { type: String, default: "" },             // video_url
    sourceId: { type: String, default: "" },             // source_id
    sourceName: { type: String, default: "" },           // source_name
    sourceUrl: { type: String, default: "" },            // source_url
    sourceIcon: { type: String, default: "" },           // source_icon
    sourcePriority: { type: Number, default: 0 },        // source_priority
    datatype: { type: String, default: "news" },

    // Derived / mapped fields for frontend
    category: {
      type: String,
      enum: ["finance", "warehouse", "export", "athlete"],
      required: true,
    },
  },
  { timestamps: true }
);

newsArticleSchema.index({ category: 1, pubDate: -1 });
newsArticleSchema.index({ category: 1, link: 1 }, { unique: true });

export default mongoose.model("NewsArticle", newsArticleSchema);
