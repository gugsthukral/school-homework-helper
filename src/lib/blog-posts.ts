export type { BlogPost } from "@/lib/blog/types";
import type { BlogPost } from "@/lib/blog/types";
import { buildGeneratedBlogPosts } from "@/lib/blog/build-blog-posts";
import { enrichFeaturedPost } from "@/lib/blog/enrich-featured-posts";

const rawFeaturedPosts: BlogPost[] = [  {
    slug: "100-maths-questions-class-5",
    title: "19 Maths Practice Questions for Class 5",
    category: "Mathematics",
    readTime: "5 min read",
    excerpt: "Practice essential Class 5 maths problems covering fractions, decimals, and geometry.",
    publishedAt: "2026-06-01",
    author: "School Homework Helper",
    sections: [
      {
        heading: "Why Practice Maths Daily in Class 5?",
        content:
          "Class 5 is when students move from basic arithmetic to fractions, decimals, and introductory geometry. Regular practice builds confidence before the middle school years. This guide provides 19 practice questions across these areas.",
      },
      {
        heading: "Numbers & Place Value",
        content:
          "• Write 45,678 in expanded form\n• Round 3,847 to the nearest hundred\n• Find the predecessor and successor of 9,999\n• Compare: 4.5 ___ 4.50\n• Arrange in ascending order: 2.3, 2.03, 2.33",
      },
      {
        heading: "Fractions & Decimals",
        content:
          "• Add: 2/5 + 1/5\n• Subtract: 7/8 − 3/8\n• Convert 0.75 to a fraction\n• Which is greater: 3/4 or 0.7?\n• A rope is 5/6 m long. How much remains if 1/3 m is cut?",
      },
      {
        heading: "Geometry & Measurement",
        content:
          "• Name the type of angle: 90°\n• Perimeter of a square with side 7 cm\n• Area of a rectangle: length 8 cm, width 5 cm\n• Convert 2.5 km to metres\n• How many edges does a cube have?",
      },
      {
        heading: "Word Problems",
        content:
          "• Ravi bought 3 notebooks at ₹25 each. Total cost?\n• A tank holds 500 L. 175 L is used. How much remains?\n• Divide 48 apples equally among 6 children\n• Find the average of 12, 15, and 18",
      },
      {
        heading: "Get AI Help Instantly",
        content:
          "Stuck on any Class 5 maths question? Use our Math Solver — select Class 5, paste your problem, and get a step-by-step solution in seconds.",
      },
    ],
  },
  {
    slug: "best-science-projects-class-8",
    title: "Best School & Science Projects for Class 8",
    category: "Science",
    readTime: "7 min read",
    excerpt: "Creative and easy school and science project ideas perfect for Class 8 students.",
    publishedAt: "2026-06-03",
    author: "School Homework Helper",
    sections: [
      {
        heading: "Choosing the Right Class 8 School Project",
        content:
          "Class 8 science covers force, pressure, friction, sound, chemical effects of electric current, and more. A good project demonstrates a clear scientific concept using simple, safe materials.",
      },
      {
        heading: "Top 5 Project Ideas for 2026-27",
        content:
          "**1. Effect of Pressure on Different Surfaces** — Use identical weights on sand with different base areas.\n\n**2. Homemade Electric Cell** — Lemon or potato battery lighting an LED.\n\n**3. Sound Through Different Media** — Compare how sound travels through air, water, and solids.\n\n**4. Rusting of Iron** — Test factors that speed up or slow rust formation.\n\n**5. Water Purification Model** — Layered filter using sand, gravel, and charcoal.",
      },
      {
        heading: "Materials You'll Need",
        content:
          "Most projects use household items: cardboard, plastic bottles, sand, nails, lemons, copper wire, and zinc strips. Always work with adult supervision for experiments involving electricity or chemicals.",
      },
      {
        heading: "How to Present Your Project",
        content:
          "Write a short hypothesis, list your steps, record observations in a table, and explain what you learned. Judges appreciate when students understand the science — not just a working model.",
      },
      {
        heading: "Generate Custom Ideas with AI",
        content:
          "Use our School Projects tool — select Class 8, enter your interest (e.g. electricity, plants), and get 5 detailed project ideas with materials and steps.",
      },
    ],
  },
  {
    slug: "english-essay-topics-class-6",
    title: "English Essay Topics for Class 6",
    category: "English",
    readTime: "4 min read",
    excerpt: "50 essay topics to improve writing skills for Class 6 students.",
    publishedAt: "2026-06-05",
    author: "School Homework Helper",
    sections: [
      {
        heading: "Essay Writing in Class 6",
        content:
          "Class 6 students are expected to write 150–200 word essays with a clear introduction, body, and conclusion. Topics are usually drawn from daily life, nature, festivals, and values.",
      },
      {
        heading: "50 Essay Topics for Class 6",
        content:
          "1. My School\n2. My Best Friend\n3. Importance of Trees\n4. A Rainy Day\n5. My Favourite Festival\n6. Cleanliness\n7. Honesty is the Best Policy\n8. The Sun\n9. My Hobby\n10. Helping Others\n11. Digital India\n12. Sports Day\n13. My Family\n14. A Visit to the Zoo\n15. Books — My Best Friends\n16. Water Conservation\n17. Good Manners\n18. My Village\n19. Independence Day\n20. The Value of Time\n21. Pollution\n22. My Favourite Teacher\n23. Healthy Food\n24. A Memorable Day\n25. Unity in Diversity",
      },
      {
        heading: "Essay Structure Tips",
        content:
          "**Introduction** (2–3 sentences): Introduce the topic.\n**Body** (2 paragraphs): Give details, examples, and reasons.\n**Conclusion** (1–2 sentences): Summarise your main point.",
      },
      {
        heading: "Write Essays with AI",
        content:
          "Pick any topic above and use our Essay Generator. Select Class 6, set word count to 200, and get a complete draft to learn from.",
      },
    ],
  },
  {
    slug: "homework-tips-for-students",
    title: "Homework Tips for Students",
    category: "Study Tips",
    readTime: "6 min read",
    excerpt: "Simple strategies to finish homework faster and understand concepts better.",
    publishedAt: "2026-06-08",
    author: "School Homework Helper",
    sections: [
      {
        heading: "Why Homework Matters",
        content:
          "Homework reinforces what you learn in class. Done right, it builds understanding — not just completed notebooks. These tips work for students from Class 1 to Class 12.",
      },
      {
        heading: "10 Homework Tips That Actually Work",
        content:
          "1. **Fix a study time** — Same time daily builds habit.\n2. **Start with the hardest subject** — Your brain is freshest.\n3. **Remove distractions** — Phone away, TV off.\n4. **Read the question twice** — Understand before solving.\n5. **Break big tasks** — 25-minute focused blocks work well.\n6. **Ask for help early** — Don't wait until the night before exams.\n7. **Use AI for explanations** — Learn the method, don't just copy answers.\n8. **Review completed work** — Check for silly mistakes.\n9. **Keep materials organised** — Books, notes, and stationery ready.\n10. **Reward yourself** — Small breaks after finishing each subject.",
      },
      {
        heading: "When You're Stuck",
        content:
          "It's okay to not know an answer. Use our Homework Solver to get step-by-step explanations, then try a similar problem on your own to confirm you've understood.",
      },
      {
        heading: "For Parents",
        content:
          "Create a quiet study corner, check homework without doing it for your child, and encourage asking questions. Our AI tools explain answers in child-friendly language.",
      },
    ],
  },
  {
    slug: "board-exam-study-plan-class-10",
    title: "Board Exam Study Plan for Class 10",
    category: "Exam Prep",
    readTime: "8 min read",
    excerpt: "A month-by-month study plan to ace your Class 10 board exams.",
    publishedAt: "2026-06-10",
    author: "School Homework Helper",
    sections: [
      {
        heading: "Class 10 Board Exams 2026-27",
        content:
          "The CBSE Class 10 board exams are a major milestone. A structured plan from the start of the academic session helps you cover the full syllabus without last-minute panic.",
      },
      {
        heading: "6-Month Study Plan",
        content:
          "**Months 1–2 (April–May):** Complete first reading of all subjects. Make short notes.\n\n**Months 3–4 (June–July):** First revision. Solve NCERT exercises and exemplar problems.\n\n**Month 5 (August–September):** Sample papers weekly. Focus on weak chapters.\n\n**Month 6 (October–November):** Full syllabus revision. Previous year papers daily.\n\n**Final Month (December–January):** Light revision, formula sheets, rest well before exams.",
      },
      {
        heading: "Subject-Wise Priority",
        content:
          "**Mathematics:** Daily problem practice — no shortcuts.\n**Science:** Diagrams + numericals + definitions.\n**English:** Essay formats, grammar rules, literature summaries.\n**Social Science:** Timelines, maps, and key terms.\n**Hindi:** Grammar (व्याकरण) and essay writing practice.",
      },
      {
        heading: "Use AI for Revision",
        content:
          "Generate practice quizzes with our Quiz Generator, check essays with Grammar Checker, and solve maths doubts with Math Solver — all tuned for Class 10 level.",
      },
    ],
  },
  {
    slug: "class-7-english-grammar-guide",
    title: "Class 7 English Grammar Guide",
    category: "English",
    readTime: "6 min read",
    excerpt: "Essential grammar rules every Class 7 student should know.",
    publishedAt: "2026-06-12",
    author: "School Homework Helper",
    sections: [
      {
        heading: "Grammar Basics for Class 7",
        content:
          "Class 7 English grammar builds on tenses, modals, active/passive voice, and reported speech. Mastering these topics improves both writing and comprehension scores.",
      },
      {
        heading: "Key Topics in CBSE 2026-27 Syllabus",
        content:
          "• **Tenses** — Present, past, future (simple, continuous, perfect)\n• **Modals** — can, could, may, might, must, should, ought to\n• **Active & Passive Voice** — Converting sentences\n• **Reported Speech** — Direct to indirect statements and questions\n• **Clauses** — Noun, adjective, and adverb clauses\n• **Determiners** — a, an, the, some, any, much, many",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "• Confusing 'its' and 'it's'\n• Wrong tense consistency in paragraphs\n• Forgetting subject-verb agreement\n• Misplacing adverbs\n• Incorrect use of articles (a/an/the)",
      },
      {
        heading: "Practice with AI",
        content:
          "Paste your paragraph into our Grammar Checker, select Class 7, and get corrections with explanations for every mistake.",
      },
    ],
  },
];

export const curatedBlogPosts: BlogPost[] = rawFeaturedPosts
  .map(enrichFeaturedPost)
  .map((post): BlogPost => ({ ...post, reviewStatus: "editorial-review" }));

const generatedPosts = buildGeneratedBlogPosts();

export const blogPosts: BlogPost[] = [
  ...curatedBlogPosts,
  ...generatedPosts.filter((p) => !curatedBlogPosts.some((f) => f.slug === p.slug)),
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const blogPostMap = new Map(blogPosts.map((p) => [p.slug, p]));
const curatedBlogSlugs = new Set(curatedBlogPosts.map((post) => post.slug));

export function isCuratedBlogPost(slug: string) {
  return curatedBlogSlugs.has(slug);
}

export const approvedBlogPosts = curatedBlogPosts.filter(
  (post) => post.reviewStatus === "reviewed"
);
const approvedBlogSlugs = new Set(approvedBlogPosts.map((post) => post.slug));

export function isApprovedBlogPost(slug: string) {
  return approvedBlogSlugs.has(slug);
}

export function getBlogPost(slug: string) {
  return blogPostMap.get(slug);
}
