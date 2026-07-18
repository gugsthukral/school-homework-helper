export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  reviewer?: string;
  sources?: { title: string; url: string }[];
  reviewStatus?: "draft" | "editorial-review" | "reviewed";
  sections: { heading?: string; content: string }[];
};
