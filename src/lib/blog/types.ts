export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  sections: { heading?: string; content: string }[];
};
