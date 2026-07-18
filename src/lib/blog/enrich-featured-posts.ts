import type { BlogPost } from "@/lib/blog/types";

/** Adds extra sections to featured blog posts for richer content. */
export function enrichFeaturedPost(post: BlogPost): BlogPost {
  const extras: Record<string, BlogPost["sections"]> = {
    "100-maths-questions-class-5": [
      {
        heading: "Daily Practice Plan",
        content:
          "• **Monday:** Numbers and place value\n• **Tuesday:** Fractions and decimals\n• **Wednesday:** Geometry and measurement\n• **Thursday:** Word problems\n• **Friday:** Mixed revision quiz\n• **Weekend:** Retry questions you got wrong",
      },
      {
        heading: "Common Class 5 Maths Mistakes",
        content:
          "• Forgetting to convert units (cm to m)\n• Adding fractions without common denominators\n• Confusing perimeter with area\n• Rounding errors in decimals\n• Misreading 'total' vs 'remaining' in word problems",
      },
      {
        heading: "Textbook Topics to Revise",
        content:
          "Before practising, revise the matching sections in your prescribed Class 5 mathematics textbook: place value, fractions, decimals, perimeter, area, multiplication, division, and data handling. Chapter names vary by board and textbook edition.",
      },
    ],
    "best-science-projects-class-8": [
      {
        heading: "Class 8 Science Chapters Linked to Projects",
        content:
          "• **Force & Pressure** → Pressure on surfaces project\n• **Chemical Effects of Current** → Lemon battery\n• **Sound** → Sound through media experiment\n• **Materials** → Rusting of iron\n• **Conservation** → Water purification model",
      },
      {
        heading: "Project Report Format",
        content:
          "**Title page** → **Aim** → **Hypothesis** → **Materials** → **Procedure** (numbered steps) → **Observations** (table) → **Conclusion** → **Precautions**\n\nKeep the report 3–5 pages. Include labelled diagrams and cite your NCERT chapter reference.",
      },
      {
        heading: "Safety First",
        content:
          "Never mix unknown chemicals. Use goggles when needed. Ask a teacher or parent before experiments with electricity, fire, or sharp tools. Document everything — failed experiments teach as much as successful ones.",
      },
    ],
    "english-essay-topics-class-6": [
      {
        heading: "More Essay Topics (26–50)",
        content:
          "26. My Pet\n27. The Internet\n28. A Trip to the Hills\n29. Discipline\n30. My Favourite Game\n31. Save Earth\n32. My Dream\n33. A Good Deed\n34. The Rainbow\n35. My Favourite Book\n36. Kindness\n37. My Neighbourhood\n38. The Moon\n39. Hard Work\n40. A Picnic\n41. My Favourite Season\n42. Friendship\n43. The Taj Mahal\n44. Gratitude\n45. My Role Model\n46. Trees — Our Friends\n47. A Funny Incident\n48. My Daily Routine\n49. The Importance of Education\n50. If I Were a Bird",
      },
      {
        heading: "Sample Essay Outline: My School",
        content:
          "**Intro:** Name and location of school, why you like it.\n**Body 1:** Facilities — library, playground, labs.\n**Body 2:** Teachers and friends, favourite activities.\n**Conclusion:** What your school teaches you beyond books.",
      },
      {
        heading: "Marks Distribution Tips",
        content:
          "• Content and relevance: 40%\n• Organisation and flow: 30%\n• Grammar and spelling: 20%\n• Neatness: 10%\n\nAlways leave 2 lines between introduction, body, and conclusion.",
      },
    ],
    "homework-tips-for-students": [
      {
        heading: "Class-Wise Homework Time Guide",
        content:
          "• **Classes 1–3:** 30–45 minutes total\n• **Classes 4–5:** 45–60 minutes\n• **Classes 6–8:** 1–1.5 hours\n• **Classes 9–10:** 2–2.5 hours\n• **Classes 11–12:** 2.5–3.5 hours\n\nAdjust based on test schedules — increase time 2 weeks before exams.",
      },
      {
        heading: "Subject Order That Works",
        content:
          "1. Hardest subject first (Maths/Science for most students)\n2. Language subjects (English/Hindi)\n3. Computer / ICT practice\n4. Social Science / EVS\n5. Quick revision of what you learned today\n\nNever leave maths for last when you are tired.",
      },
      {
        heading: "Free Tools on This Website",
        content:
          "• **Homework Solver** — any subject, step-by-step\n• **Math Solver** — arithmetic to algebra\n• **Essay Generator** — learn essay structure\n• **Quiz Generator** — test yourself before exams\n• **Grammar Checker** — fix writing mistakes\n• **School Projects** — project ideas by class",
      },
    ],
    "board-exam-study-plan-class-10": [
      {
        heading: "Daily Timetable (Sample)",
        content:
          "**6:00–7:00 AM** — Maths practice\n**7:00–8:00 AM** — Science revision\n**4:00–5:00 PM** — English + Hindi\n**5:00–6:00 PM** — Social Science (maps + timelines)\n**6:00–7:00 PM** — Sample paper / PYQ\n**7:00–7:30 PM** — Review mistakes\n\nTake Sunday half-day off for rest.",
      },
      {
        heading: "Last 30 Days Before Boards",
        content:
          "• No new reference books — stick to NCERT\n• One full sample paper daily under timed conditions\n• Formula sheets for Maths and Science on your wall\n• Sleep 7–8 hours — memory consolidation needs rest\n• Avoid social media during study blocks",
      },
      {
        heading: "Marks-Boosting Habits",
        content:
          "• Write point-wise answers in Social Science\n• Show all steps in Maths — partial marks matter\n• Label every diagram in Science\n• Stick to prescribed word limits in English/Hindi\n• Attempt every question — never leave blanks",
      },
    ],
    "class-7-english-grammar-guide": [
      {
        heading: "Tenses Quick Reference",
        content:
          "**Simple Present:** habit, fact (She reads daily)\n**Present Continuous:** now (She is reading)\n**Simple Past:** completed (She read yesterday)\n**Past Continuous:** ongoing in past (She was reading)\n**Simple Future:** will happen (She will read)\n\nPractice converting sentences between tenses.",
      },
      {
        heading: "Active vs Passive Examples",
        content:
          "**Active:** The cat chased the mouse.\n**Passive:** The mouse was chased by the cat.\n\n**Active:** Ravi wrote a letter.\n**Passive:** A letter was written by Ravi.\n\nRemember: object of active becomes subject of passive.",
      },
      {
        heading: "Weekly Grammar Practice",
        content:
          "• **Day 1:** Tenses (10 sentences)\n• **Day 2:** Active/Passive (10 conversions)\n• **Day 3:** Reported speech (5 statements + 5 questions)\n• **Day 4:** Clauses (identify noun/adjective/adverb)\n• **Day 5:** Determiners fill-ups\n• **Weekend:** Mixed worksheet + Grammar Checker review",
      },
    ],
  };

  const extra = extras[post.slug];
  if (!extra) return post;

  return {
    ...post,
    readTime: post.readTime.replace(/\d+/, (n) => String(Number(n) + 3)),
    sections: [...post.sections.slice(0, -1), ...extra, post.sections[post.sections.length - 1]],
  };
}
