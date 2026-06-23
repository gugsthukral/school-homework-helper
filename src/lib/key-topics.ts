import { getSubjectPath } from "./chapters";
import { getToolForSubjectSlug } from "./subject-tools";
import { ACADEMIC_SESSION } from "./syllabus-2026-27";

export type KeyTopic = {
  slug: string;
  classSlug: string;
  classNumber: number;
  title: string;
  subjectSlug: string;
  subjectName: string;
  chapterSlug?: string;
  description: string;
  highlights: string[];
};

type KeyTopicInput = {
  title: string;
  slug: string;
  subjectSlug: string;
  subjectName: string;
  chapterSlug?: string;
  description: string;
  highlights: string[];
};

function buildClassTopics(
  classNumber: number,
  topics: KeyTopicInput[]
): KeyTopic[] {
  const classSlug = `class-${classNumber}`;
  return topics.map((t) => ({ ...t, classSlug, classNumber }));
}

export const keyTopicsRegistry: KeyTopic[] = [
  ...buildClassTopics(1, [
    { title: "Reading & writing basics", slug: "reading-writing-basics", subjectSlug: "english", subjectName: "English", chapterSlug: "reading-comprehension", description: "Build foundational reading and writing skills for Class 1.", highlights: ["Letter recognition", "Simple words", "Picture composition", "Basic sentences"] },
    { title: "Numbers 1–100", slug: "numbers-1-100", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "numbers-from-one-to-nine", description: "Learn counting, number names, and place value up to 100.", highlights: ["Counting objects", "Number names", "Before & after", "Comparing numbers"] },
    { title: "Shapes & patterns", slug: "shapes-patterns", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "shapes-and-space", description: "Explore basic shapes, patterns, and spatial understanding.", highlights: ["2D shapes", "Patterns", "Inside-outside", "Bigger-smaller"] },
    { title: "Nature around us", slug: "nature-around-us", subjectSlug: "evs", subjectName: "EVS", chapterSlug: "plants-around-us", description: "Discover plants, animals, and the environment around you.", highlights: ["Plants & trees", "Animals", "Air & water", "Seasons"] },
  ]),
  ...buildClassTopics(2, [
    { title: "Simple sentences", slug: "simple-sentences", subjectSlug: "english", subjectName: "English", chapterSlug: "story-writing", description: "Write and read simple sentences with correct structure.", highlights: ["Nouns & verbs", "Sentence formation", "Story writing", "Picture reading"] },
    { title: "Addition & subtraction", slug: "addition-subtraction", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "give-and-take", description: "Master addition and subtraction with two-digit numbers.", highlights: ["Adding numbers", "Subtracting numbers", "Word problems", "Mental math"] },
    { title: "Plants & animals", slug: "plants-animals", subjectSlug: "evs", subjectName: "EVS", chapterSlug: "growing-plants", description: "Study how plants grow and how animals live.", highlights: ["Plant parts", "Animal homes", "Food chains", "Care for nature"] },
    { title: "Good habits", slug: "good-habits", subjectSlug: "evs", subjectName: "EVS", chapterSlug: "our-food", description: "Learn healthy habits, hygiene, and good citizenship.", highlights: ["Healthy food", "Cleanliness", "Safety rules", "Helping others"] },
  ]),
  ...buildClassTopics(3, [
    { title: "Paragraph writing", slug: "paragraph-writing", subjectSlug: "english", subjectName: "English", chapterSlug: "story-paragraph-writing", description: "Write short paragraphs with a clear beginning, middle, and end.", highlights: ["Topic sentences", "Describing events", "Grammar basics", "Creative writing"] },
    { title: "Multiplication & division", slug: "multiplication-division", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "how-many-times", description: "Learn multiplication tables and basic division.", highlights: ["Times tables", "Sharing equally", "Word problems", "Patterns in numbers"] },
    { title: "Living things", slug: "living-things", subjectSlug: "evs", subjectName: "EVS", chapterSlug: "poonam-s-day-out", description: "Explore living things, plants, animals, and the environment through EVS.", highlights: ["Plants & animals", "Food & water", "Family & community", "Nature observation"] },
    { title: "Maps & directions", slug: "maps-directions", subjectSlug: "social-science", subjectName: "Social Studies", chapterSlug: "maps-directions", description: "Read maps and understand directions and landmarks.", highlights: ["Cardinal directions", "Map symbols", "Local community", "India overview"] },
  ]),
  ...buildClassTopics(4, [
    { title: "Grammar basics", slug: "grammar-basics", subjectSlug: "english", subjectName: "English", chapterSlug: "grammar-tenses", description: "Learn essential English grammar for Class 4.", highlights: ["Tenses", "Adjectives", "Prepositions", "Comprehension"] },
    { title: "Fractions introduction", slug: "fractions-introduction", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "halves-and-quarters", description: "Introduction to fractions, halves, quarters, and equivalents.", highlights: ["Half & quarter", "Equivalent fractions", "Comparing fractions", "Real-life uses"] },
    { title: "Matter & energy", slug: "matter-energy", subjectSlug: "science", subjectName: "Science", chapterSlug: "matter-materials", description: "Explore states of matter, materials, and energy.", highlights: ["Solids, liquids, gases", "Materials", "Force & work", "Earth & environment"] },
    { title: "Indian states", slug: "indian-states", subjectSlug: "social-science", subjectName: "Social Studies", chapterSlug: "indian-states-capitals", description: "Learn about Indian states, capitals, and physical features.", highlights: ["States & capitals", "Maps of India", "Physical features", "Culture & festivals"] },
  ]),
  ...buildClassTopics(5, [
    { title: "Essay writing", slug: "essay-writing", subjectSlug: "english", subjectName: "English", chapterSlug: "essay-writing", description: "Write structured essays with introduction, body, and conclusion.", highlights: ["Essay format", "Descriptive writing", "Grammar", "Vocabulary"] },
    { title: "Decimals & percentages", slug: "decimals-percentages", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "tenths-and-hundredths", description: "Understand decimals, percentages, and their applications.", highlights: ["Decimal place value", "Converting fractions", "Percentage basics", "Money problems"] },
    { title: "Human body", slug: "human-body", subjectSlug: "science", subjectName: "Science", chapterSlug: "human-body-health", description: "Study human body systems, health, and nutrition.", highlights: ["Body organs", "Digestive system", "Health & hygiene", "Balanced diet"] },
    { title: "History & civics", slug: "history-civics", subjectSlug: "social-science", subjectName: "Social Studies", chapterSlug: "democracy-government", description: "Learn about democracy, government, and Indian history.", highlights: ["Local government", "Freedom fighters", "Rights & duties", "Natural resources"] },
  ]),
  ...buildClassTopics(6, [
    { title: "Creative writing", slug: "creative-writing", subjectSlug: "english", subjectName: "English", chapterSlug: "essay-paragraph", description: "Develop creative writing and formal letter skills.", highlights: ["Essays", "Formal letters", "Reported speech", "Literature"] },
    { title: "Algebra basics", slug: "algebra-basics", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "algebra", description: "Introduction to variables, expressions, and simple equations.", highlights: ["Variables", "Expressions", "Simple equations", "Ratio & proportion"] },
    { title: "Light & electricity", slug: "light-electricity", subjectSlug: "science", subjectName: "Science", chapterSlug: "light-shadows-reflections", description: "Explore light, shadows, reflections, and electric circuits.", highlights: ["Light & shadows", "Reflection", "Electric circuits", "Magnets"] },
    { title: "Ancient civilizations", slug: "ancient-civilizations", subjectSlug: "social-science", subjectName: "Social Science", chapterSlug: "in-the-earliest-cities", description: "Study ancient India, early cities, and kingdoms.", highlights: ["Harappan civilization", "Early kingdoms", "Ashoka", "Trade & culture"] },
  ]),
  ...buildClassTopics(7, [
    { title: "Comprehension", slug: "comprehension", subjectSlug: "english", subjectName: "English", chapterSlug: "honeycomb-reader", description: "Improve reading comprehension and analytical writing.", highlights: ["Unseen passages", "Summary writing", "Grammar", "Debate & notice"] },
    { title: "Linear equations", slug: "linear-equations", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "simple-equations", description: "Solve linear equations and apply them to word problems.", highlights: ["Solving equations", "Transposition", "Word problems", "Rational numbers"] },
    { title: "Acids & bases", slug: "acids-bases", subjectSlug: "science", subjectName: "Science", chapterSlug: "acids-bases-and-salts", description: "Understand acids, bases, indicators, and neutralization.", highlights: ["pH scale", "Indicators", "Neutralization", "Everyday examples"] },
    { title: "Medieval India", slug: "medieval-india", subjectSlug: "social-science", subjectName: "Social Science", chapterSlug: "the-delhi-sultans", description: "Explore medieval Indian history — Delhi Sultanate and Mughals.", highlights: ["Delhi Sultans", "Mughal Empire", "Bhakti movement", "Regional cultures"] },
  ]),
  ...buildClassTopics(8, [
    { title: "Formal essays", slug: "formal-essays", subjectSlug: "english", subjectName: "English", chapterSlug: "essay-story-writing", description: "Write formal essays, articles, and literature analysis.", highlights: ["Essay types", "Articles", "Active/passive voice", "Literature"] },
    { title: "Geometry proofs", slug: "geometry-proofs", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "understanding-quadrilaterals", description: "Study quadrilaterals, mensuration, and algebraic identities.", highlights: ["Quadrilaterals", "Mensuration", "Factorisation", "Graphs"] },
    { title: "Force & pressure", slug: "force-pressure", subjectSlug: "science", subjectName: "Science", chapterSlug: "force-and-pressure", description: "Learn about force, pressure, friction, and sound.", highlights: ["Force & pressure", "Friction", "Sound waves", "Light & stars"] },
    { title: "Modern history", slug: "modern-history", subjectSlug: "social-science", subjectName: "Social Science", chapterSlug: "the-making-of-the-national-movement", description: "Study modern Indian history and the freedom movement.", highlights: ["National movement", "Independence", "Constitution", "Judiciary"] },
  ]),
  ...buildClassTopics(9, [
    { title: "Literature analysis", slug: "literature-analysis", subjectSlug: "english", subjectName: "English", chapterSlug: "literature-prose-poetry", description: "Analyze prose, poetry, and develop writing skills.", highlights: ["Beehive & Moments", "Writing skills", "Grammar", "Literature themes"] },
    { title: "Polynomials", slug: "polynomials", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "polynomials", description: "Master polynomials, coordinate geometry, and number systems.", highlights: ["Polynomial operations", "Factor theorem", "Coordinate geometry", "Statistics"] },
    { title: "Atoms & molecules", slug: "atoms-molecules", subjectSlug: "science", subjectName: "Science", chapterSlug: "atoms-and-molecules", description: "Study atomic structure, molecules, and matter.", highlights: ["Laws of chemical combination", "Atomic models", "Mole concept", "Tissues & cells"] },
    { title: "Democracy & economics", slug: "democracy-economics", subjectSlug: "social-science", subjectName: "Social Science", chapterSlug: "what-is-democracy-why-democracy", description: "Understand democracy, economics, and Indian geography.", highlights: ["Democratic rights", "Electoral politics", "Poverty & development", "Physical geography"] },
  ]),
  ...buildClassTopics(10, [
    { title: "Board exam writing", slug: "board-exam-writing", subjectSlug: "english", subjectName: "English", chapterSlug: "analytical-paragraph", description: "Prepare for Class 10 board exam English writing sections.", highlights: ["Analytical paragraphs", "Letters & articles", "Literature", "Grammar revision"] },
    { title: "Trigonometry", slug: "trigonometry", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "introduction-to-trigonometry", description: "Master trigonometry, quadratic equations, and AP for boards.", highlights: ["Trig ratios", "Identities", "Applications", "Probability"] },
    { title: "Chemical reactions", slug: "chemical-reactions", subjectSlug: "science", subjectName: "Science", chapterSlug: "chemical-reactions-and-equations", description: "Study chemical reactions, acids, metals, and carbon compounds.", highlights: ["Balancing equations", "Acids & bases", "Metals", "Carbon compounds"] },
    { title: "Board exam prep", slug: "board-exam-prep", subjectSlug: "social-science", subjectName: "Social Science", chapterSlug: "nationalism-in-india", description: "Complete Class 10 SST board exam preparation.", highlights: ["History revision", "Geography maps", "Political science", "Economics"] },
  ]),
  ...buildClassTopics(11, [
    { title: "Advanced writing", slug: "advanced-writing", subjectSlug: "english", subjectName: "English", chapterSlug: "writing-skills-notice-article-speech", description: "Advanced English writing for Class 11.", highlights: ["Notice & speech", "Articles", "Reading comprehension", "Hornbill literature"] },
    { title: "Calculus intro", slug: "calculus-intro", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "limits-and-derivatives", description: "Introduction to limits, derivatives, and conic sections.", highlights: ["Limits", "Derivatives", "Conic sections", "Probability"] },
    { title: "Physics fundamentals", slug: "physics-fundamentals", subjectSlug: "physics", subjectName: "Physics", chapterSlug: "units-and-measurements", description: "Build strong physics fundamentals for Class 11.", highlights: ["Units & dimensions", "Motion", "Laws of motion", "Work & energy"] },
    { title: "Stream selection prep", slug: "stream-selection-prep", subjectSlug: "accountancy", subjectName: "Accountancy", chapterSlug: "introduction-to-accounting", description: "Explore commerce stream subjects — Accountancy, Business Studies, and Economics.", highlights: ["Accounting basics", "Business concepts", "Economics data", "Career paths"] },
  ]),
  ...buildClassTopics(12, [
    { title: "Competitive writing", slug: "competitive-writing", subjectSlug: "english", subjectName: "English", chapterSlug: "board-exam-essay-practice", description: "Board exam and competitive exam English writing practice.", highlights: ["Essay practice", "Report writing", "Flamingo & Vistas", "Comprehension"] },
    { title: "Advanced maths", slug: "advanced-maths", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "integrals", description: "Calculus, matrices, and probability for Class 12 boards.", highlights: ["Integrals", "Differential equations", "Vectors", "Linear programming"] },
    { title: "Board + entrance prep", slug: "board-entrance-prep", subjectSlug: "physics", subjectName: "Physics", chapterSlug: "electric-charges-and-fields", description: "Physics preparation for boards and entrance exams.", highlights: ["Electrostatics", "Current electricity", "Optics", "Modern physics"] },
    { title: "Career guidance", slug: "career-guidance", subjectSlug: "business-studies", subjectName: "Business Studies", chapterSlug: "nature-and-significance-of-management", description: "Commerce and management career guidance after Class 12 boards.", highlights: ["Management basics", "Business environment", "Marketing", "Career options"] },
  ]),
];

const topicMap = new Map(
  keyTopicsRegistry.map((t) => [`${t.classSlug}/${t.slug}`, t])
);

export function getKeyTopicsForClass(classSlug: string): KeyTopic[] {
  return keyTopicsRegistry.filter((t) => t.classSlug === classSlug);
}

export function getKeyTopic(classSlug: string, topicSlug: string): KeyTopic | undefined {
  return topicMap.get(`${classSlug}/${topicSlug}`);
}

export function getKeyTopicPagePath(topic: KeyTopic): string {
  return `/classes/${topic.classSlug}/topics/${topic.slug}`;
}

export function getKeyTopicSubjectHref(topic: KeyTopic): string {
  if (topic.chapterSlug) {
    return `/classes/${topic.classSlug}/${topic.subjectSlug}/${topic.chapterSlug}`;
  }
  return getSubjectPath(topic.classSlug, topic.subjectSlug);
}

export function getToolForSubject(subjectSlug: string) {
  return getToolForSubjectSlug(subjectSlug);
}

export { ACADEMIC_SESSION };
