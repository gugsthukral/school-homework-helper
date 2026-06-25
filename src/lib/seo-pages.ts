export type SeoPageType =
  | "homework-help"
  | "essay-topics"
  | "math-word-problems"
  | "science-projects"
  | "board-exam-preparation";

export type SeoSubjectSlug =
  | "maths"
  | "science"
  | "english"
  | "hindi"
  | "punjabi"
  | "sst"
  | "computer";

export type SeoPage = {
  slug: string;
  type: SeoPageType;
  classNumber: number;
  subject?: SeoSubjectSlug;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  sections: { heading: string; content: string }[];
  faqs: { question: string; answer: string }[];
  toolHref: string;
  toolLabel: string;
};

const subjectMeta: Record<
  SeoSubjectSlug,
  { name: string; dbSlug: string; toolHref: string; toolLabel: string }
> = {
  maths: {
    name: "Mathematics",
    dbSlug: "mathematics",
    toolHref: "/tools/math-solver",
    toolLabel: "Math Solver",
  },
  science: {
    name: "Science",
    dbSlug: "science",
    toolHref: "/tools/science-projects",
    toolLabel: "School Projects",
  },
  english: {
    name: "English",
    dbSlug: "english",
    toolHref: "/tools/essay-generator",
    toolLabel: "Essay Generator",
  },
  hindi: {
    name: "Hindi",
    dbSlug: "hindi",
    toolHref: "/tools/homework-solver",
    toolLabel: "Homework Solver",
  },
  punjabi: {
    name: "Punjabi",
    dbSlug: "punjabi",
    toolHref: "/tools/homework-solver",
    toolLabel: "Homework Solver",
  },
  sst: {
    name: "Social Studies",
    dbSlug: "sst",
    toolHref: "/tools/quiz-generator",
    toolLabel: "Quiz Generator",
  },
  computer: {
    name: "Computer",
    dbSlug: "computer",
    toolHref: "/tools/ask-anything",
    toolLabel: "Ask Anything",
  },
};

const subjects: SeoSubjectSlug[] = [
  "maths",
  "science",
  "english",
  "hindi",
  "punjabi",
  "sst",
  "computer",
];

function homeworkHelpPages(): SeoPage[] {
  const pages: SeoPage[] = [];

  for (let classNum = 1; classNum <= 12; classNum++) {
    for (const subject of subjects) {
      if (subject === "computer" && classNum > 10) continue;

      const meta = subjectMeta[subject];
      const slug = `class-${classNum}-${subject}-homework-help`;

      pages.push({
        slug,
        type: "homework-help",
        classNumber: classNum,
        subject,
        title: `Class ${classNum} ${meta.name} Homework Help | Free AI Assistant`,
        description: `Get free Class ${classNum} ${meta.name} homework help with step-by-step AI explanations. Practice questions, solved examples, and study tips for Class ${classNum} students.`,
        keywords: [
          `class ${classNum} ${meta.name.toLowerCase()} homework`,
          `class ${classNum} ${subject} questions`,
          `${meta.name.toLowerCase()} homework help class ${classNum}`,
          `class ${classNum} ${subject} answers`,
        ],
        h1: `Class ${classNum} ${meta.name} Homework Help`,
        intro: `Struggling with Class ${classNum} ${meta.name}? School Homework Helper gives you instant, step-by-step explanations tailored for Class ${classNum} students. Whether it's daily homework, practice questions, or exam revision — our AI tools explain every answer in simple language you can understand.`,
        sections: [
          {
            heading: `Why Class ${classNum} ${meta.name} Feels Hard`,
            content: `Class ${classNum} ${meta.name} builds on concepts from earlier grades while introducing new topics. Many students find it difficult because textbook explanations can be brief. Our AI breaks down each problem into clear steps so you learn the method, not just the answer.`,
          },
          {
            heading: "How Our AI Helps You",
            content: `Enter any ${meta.name} question, select Class ${classNum}, and get a full explanation within seconds. Our ${meta.toolLabel} is designed for Indian school syllabus and uses language appropriate for your class level.`,
          },
          {
            heading: "Study Tips for Class " + classNum,
            content: `Practice a little every day, revise previous chapters weekly, and use our Quiz Generator to test yourself on ${meta.name} topics. Ask doubts immediately — don't let confusion pile up before exams.`,
          },
        ],
        faqs: [
          {
            question: `Is Class ${classNum} ${meta.name} homework help free?`,
            answer: `Yes! You can use our AI tools for free. Enter your question, select Class ${classNum}, and get step-by-step help instantly.`,
          },
          {
            question: `Can I use this for ${meta.name} exam preparation?`,
            answer: `Absolutely. Our tools explain concepts clearly, generate practice quizzes, and help you revise ${meta.name} topics for school tests and exams.`,
          },
          {
            question: `Does it follow the Indian school syllabus?`,
            answer: `Yes. Our AI is tuned for Classes 1–12 following common Indian CBSE and state board patterns.`,
          },
        ],
        toolHref: meta.toolHref,
        toolLabel: meta.toolLabel,
      });
    }
  }

  return pages;
}

function essayTopicPages(): SeoPage[] {
  return Array.from({ length: 12 }, (_, i) => {
    const classNum = i + 1;
    const slug = `class-${classNum}-english-essay-topics`;

    return {
      slug,
      type: "essay-topics" as const,
      classNumber: classNum,
      subject: "english" as const,
      title: `Class ${classNum} English Essay Topics | 50+ Ideas & AI Writer`,
      description: `Best Class ${classNum} English essay topics with writing tips. Generate full essays instantly with our AI Essay Generator for Class ${classNum} students.`,
      keywords: [
        `class ${classNum} english essay topics`,
        `essay topics for class ${classNum}`,
        `class ${classNum} essay writing`,
        `english essay class ${classNum}`,
      ],
      h1: `Class ${classNum} English Essay Topics`,
      intro: `Need ideas for your Class ${classNum} English essay? Browse popular essay topics for Class ${classNum} students and use our AI Essay Generator to write a complete essay with introduction, body, and conclusion.`,
      sections: [
        {
          heading: "Popular Essay Topics",
          content: getEssayTopics(classNum),
        },
        {
          heading: "How to Write a Great Class " + classNum + " Essay",
          content:
            "Start with a clear introduction, write 2–3 body paragraphs with examples, and end with a short conclusion. Use simple sentences and check grammar before submitting.",
        },
        {
          heading: "Generate Your Essay with AI",
          content:
            "Pick any topic above, enter it in our Essay Generator, select your word count and Class " +
            classNum +
            " — get a complete essay in seconds.",
        },
      ],
      faqs: [
        {
          question: `What are good essay topics for Class ${classNum}?`,
          answer: `Popular topics include nature, festivals, my school, importance of education, and current social issues — adjusted for Class ${classNum} level.`,
        },
        {
          question: "Can AI write my school essay?",
          answer:
            "Our Essay Generator creates a draft you can learn from. We recommend reading it, understanding the structure, and writing in your own words.",
        },
      ],
      toolHref: "/tools/essay-generator",
      toolLabel: "Essay Generator",
    };
  });
}

function mathWordProblemPages(): SeoPage[] {
  return Array.from({ length: 12 }, (_, i) => {
    const classNum = i + 1;
    const slug = `class-${classNum}-math-word-problems`;

    return {
      slug,
      type: "math-word-problems" as const,
      classNumber: classNum,
      subject: "maths" as const,
      title: `Class ${classNum} Math Word Problems | Solved Examples & AI Help`,
      description: `Practice Class ${classNum} math word problems with step-by-step solutions. Free AI Math Solver for arithmetic, algebra, and geometry word problems.`,
      keywords: [
        `class ${classNum} math word problems`,
        `word problems class ${classNum}`,
        `class ${classNum} maths questions`,
        `math problem solver class ${classNum}`,
      ],
      h1: `Class ${classNum} Math Word Problems`,
      intro: `Word problems are one of the toughest parts of Class ${classNum} Mathematics. Learn how to break them down, see solved examples, and use our AI Math Solver for any word problem.`,
      sections: [
        {
          heading: "How to Solve Word Problems",
          content:
            "Read carefully, identify what is asked, write down known values, choose the right operation or formula, solve step by step, and verify your answer makes sense.",
        },
        {
          heading: "Example Problems for Class " + classNum,
          content: getMathExamples(classNum),
        },
        {
          heading: "Get Instant Help",
          content:
            "Stuck on a word problem? Paste it into our Math Solver, select Class " +
            classNum +
            " and problem type — get a full step-by-step solution.",
        },
      ],
      faqs: [
        {
          question: `Why are Class ${classNum} word problems difficult?`,
          answer:
            "They require reading comprehension plus math skills. Practice converting words into equations and our AI will guide you through each step.",
        },
        {
          question: "Does the Math Solver show steps?",
          answer: "Yes. Every solution includes numbered steps with explanations suitable for your class level.",
        },
      ],
      toolHref: "/tools/math-solver",
      toolLabel: "Math Solver",
    };
  });
}

function scienceProjectPages(): SeoPage[] {
  return Array.from({ length: 12 }, (_, i) => {
    const classNum = i + 1;
    const slug = `class-${classNum}-science-projects`;

    return {
      slug,
      type: "science-projects" as const,
      classNumber: classNum,
      subject: "science" as const,
      title: `Class ${classNum} School & Science Projects | Ideas, Materials & Steps`,
      description: `Best Class ${classNum} school and science project ideas with materials list and steps. Safe, fun projects for school exhibitions and homework.`,
      keywords: [
        `class ${classNum} school projects`,
        `class ${classNum} science projects`,
        `school project ideas class ${classNum}`,
        `science project ideas class ${classNum}`,
        `class ${classNum} science exhibition`,
        `easy school projects class ${classNum}`,
      ],
      h1: `Class ${classNum} School Project Ideas`,
      intro: `Looking for a Class ${classNum} school or science project? Get creative, safe project ideas with materials you can find at home or school. Use our School Projects AI to generate custom ideas for any topic.`,
      sections: [
        {
          heading: "What Makes a Good School Project",
          content:
            "Choose a clear question, use simple materials, demonstrate a scientific concept, and explain what you learned. Judges love projects where students understand the science behind the experiment.",
        },
        {
          heading: "Project Ideas for Class " + classNum,
          content: getScienceProjectIdeas(classNum),
        },
        {
          heading: "Generate Custom Project Ideas",
          content:
            "Tell our School Projects AI your class level and interest area — get 5 detailed project ideas with materials, steps, and learning outcomes.",
        },
      ],
      faqs: [
        {
          question: `What are easy school projects for Class ${classNum}?`,
          answer: getScienceProjectIdeas(classNum).split("\n")[0].replace(/^-\s*/, ""),
        },
        {
          question: "Are these projects safe for students?",
          answer:
            "Yes. We suggest projects using safe household materials. Always have adult supervision for experiments involving heat or chemicals.",
        },
      ],
      toolHref: "/tools/science-projects",
      toolLabel: "School Projects",
    };
  });
}

function boardExamPages(): SeoPage[] {
  return [9, 10, 11, 12].map((classNum) => {
    const slug = `class-${classNum}-board-exam-preparation`;

    return {
      slug,
      type: "board-exam-preparation" as const,
      classNumber: classNum,
      title: `Class ${classNum} Board Exam Preparation | Study Plan & AI Tools`,
      description: `Complete Class ${classNum} board exam preparation guide. Study plan, subject-wise tips, practice questions, and free AI homework help.`,
      keywords: [
        `class ${classNum} board exam preparation`,
        `class ${classNum} board exam study plan`,
        `class ${classNum} exam tips`,
        `board exam class ${classNum}`,
      ],
      h1: `Class ${classNum} Board Exam Preparation`,
      intro: `Preparing for Class ${classNum} board exams? Follow a structured study plan, practice with AI-generated quizzes, and get instant homework help across all subjects.`,
      sections: [
        {
          heading: "Month-by-Month Study Plan",
          content: getBoardExamPlan(classNum),
        },
        {
          heading: "Subject-Wise Strategy",
          content:
            "Mathematics: solve daily problems. Science: understand concepts + diagrams. English: practice essays and grammar. Computer: revise MS Office, HTML, and Python basics. SST: make notes and timelines. Hindi: revise grammar rules.",
        },
        {
          heading: "Use AI for Exam Prep",
          content:
            "Generate practice quizzes, check essays, solve math problems, and revise concepts with our free AI tools — available 24/7 during exam season.",
        },
      ],
      faqs: [
        {
          question: `When should I start Class ${classNum} board exam preparation?`,
          answer:
            classNum >= 10
              ? "Start at least 6 months before boards. Revise NCERT thoroughly and practice previous year papers."
              : "Start 3–4 months before exams with daily revision and weekly practice tests.",
        },
        {
          question: "How can AI help with board exams?",
          answer:
            "AI tools generate quizzes, explain difficult concepts, help with essays, and solve practice problems — great for self-study and doubt clearing.",
        },
      ],
      toolHref: "/tools/quiz-generator",
      toolLabel: "Quiz Generator",
    };
  });
}

function getEssayTopics(classNum: number): string {
  const topics: Record<number, string[]> = {
    1: ["My Family", "My Pet", "My School", "Rainy Day", "My Best Friend"],
    2: ["My Village", "Independence Day", "A Visit to the Zoo", "Good Manners", "Trees"],
    3: ["My Favourite Festival", "The Sun", "Helping Others", "Books", "Cleanliness"],
    4: ["Environment Day", "My Hobby", "Honesty", "Water Conservation", "My Teacher"],
    5: ["Importance of Trees", "Digital India", "Women Empowerment", "Sports Day", "Pollution"],
    6: ["Social Media", "Climate Change", "Unity in Diversity", "Healthy Food", "Space Exploration"],
    7: ["Artificial Intelligence", "Road Safety", "Child Labour", "Renewable Energy", "Friendship"],
    8: ["Gender Equality", "Mental Health", "Swachh Bharat", "Online Education", "Cultural Heritage"],
    9: ["Global Warming", "Democracy", "Technology and Society", "Youth and Nation Building", "Health Awareness"],
    10: ["Board Exam Stress", "Sustainable Development", "Freedom of Speech", "Scientific Temper", "Indian Culture"],
    11: ["Career Choices", "Ethics in Science", "Media Influence", "Economic Reforms", "Philosophy of Education"],
    12: ["Future of Work", "Climate Policy", "Literature and Life", "Leadership", "Higher Education Goals"],
  };
  const list = topics[classNum] ?? topics[5];
  return list.map((t) => `- ${t}`).join("\n");
}

function getMathExamples(classNum: number): string {
  if (classNum <= 3) {
    return "- Ravi has 15 apples. He gives 6 to his friend. How many are left?\n- A box has 4 rows of 5 chocolates. How many chocolates in total?";
  }
  if (classNum <= 6) {
    return "- A shopkeeper buys 24 pens for ₹120. What is the cost of one pen?\n- The perimeter of a rectangle is 40 cm. If length is 12 cm, find the width.";
  }
  if (classNum <= 8) {
    return "- The sum of two numbers is 45. One number is 9 more than the other. Find both numbers.\n- A train travels 180 km in 3 hours. Find its speed.";
  }
  return "- If sin θ = 3/5, find cos θ.\n- A sum of ₹8000 amounts to ₹9261 in 3 years at compound interest. Find the rate.";
}

function getScienceProjectIdeas(classNum: number): string {
  if (classNum <= 4) {
    return "- Growing plants with and without sunlight\n- Making a simple volcano with baking soda\n- Testing magnetic objects around the house";
  }
  if (classNum <= 6) {
    return "- Water filtration using sand and gravel\n- Building a simple electric circuit\n- Studying plant transpiration with a plastic bag";
  }
  if (classNum <= 8) {
    return "- Measuring pH of household liquids\n- Solar oven from cardboard and foil\n- Effect of fertilisers on plant growth";
  }
  return "- Ohm's law verification circuit\n- Estimating water hardness in samples\n- Studying fermentation in food preservation";
}

function getBoardExamPlan(classNum: number): string {
  const months = classNum >= 10 ? 6 : 4;
  return `6 months out: Complete syllabus once. ${months - 2} months out: First revision + notes. 2 months out: Solve sample papers daily. 1 month out: Focus on weak topics. Final week: Light revision + rest.`;
}

export const seoPages: SeoPage[] = [
  ...homeworkHelpPages(),
  ...essayTopicPages(),
  ...mathWordProblemPages(),
  ...scienceProjectPages(),
  ...boardExamPages(),
];

export const seoPageMap = new Map(seoPages.map((p) => [p.slug, p]));

export function getSeoPage(slug: string): SeoPage | undefined {
  return seoPageMap.get(slug);
}

export function getSubjectDbSlug(seoSubject: SeoSubjectSlug): string {
  return subjectMeta[seoSubject].dbSlug;
}

export function getRelatedSeoPages(page: SeoPage, limit = 6): SeoPage[] {
  const related = seoPages.filter(
    (p) =>
      p.slug !== page.slug &&
      (p.classNumber === page.classNumber || p.subject === page.subject)
  );
  return related.slice(0, limit);
}
