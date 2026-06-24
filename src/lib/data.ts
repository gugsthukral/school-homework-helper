export const navLinks = [
  { label: "AI Tools", href: "/#tools" },
  { label: "Classes", href: "/classes" },
  { label: "Subjects", href: "/subjects" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
];

export const aiTools = [
  {
    name: "Ask Anything",
    description: "Ask any school question and get a clear AI tutor answer.",
    icon: "MessageCircleQuestion",
    href: "/tools/ask-anything",
    color: "from-orange-500/20 to-sky-400/5",
    accent: "text-orange-400",
  },
  {
    name: "Homework Solver",
    description: "Get step-by-step explanations for any homework question.",
    icon: "BookOpen",
    href: "/tools/homework-solver",
    color: "from-sky-400/20 to-sky-400/5",
    accent: "text-sky-400",
  },
  {
    name: "Essay Generator",
    description: "Write essays by topic, word count, and class level.",
    icon: "PenLine",
    href: "/tools/essay-generator",
    color: "from-orange-500/20 to-orange-500/5",
    accent: "text-orange-400",
  },
  {
    name: "Calculator",
    description: "Calculate expressions, percentages, and units with step-by-step help.",
    icon: "SquareFunction",
    href: "/tools/calculator",
    color: "from-sky-400/20 to-orange-500/5",
    accent: "text-sky-300",
  },
  {
    name: "Math Solver",
    description: "Solve arithmetic, algebra, geometry, and word problems.",
    icon: "Calculator",
    href: "/tools/math-solver",
    color: "from-sky-400/20 to-orange-500/5",
    accent: "text-sky-300",
  },
  {
    name: "Quiz Generator",
    description: "Create MCQ quizzes from any topic instantly.",
    icon: "HelpCircle",
    href: "/tools/quiz-generator",
    color: "from-orange-500/20 to-sky-400/5",
    accent: "text-orange-400",
  },
  {
    name: "School Projects",
    description: "Discover class-wise school project ideas.",
    icon: "FlaskConical",
    href: "/tools/science-projects",
    color: "from-orange-500/20 to-orange-500/5",
    accent: "text-orange-400",
  },
  {
    name: "Grammar Checker",
    description: "Fix grammar and improve your English writing.",
    icon: "SpellCheck",
    href: "/tools/grammar-checker",
    color: "from-sky-400/20 to-sky-400/5",
    accent: "text-sky-400",
  },
];

export const classes = Array.from({ length: 12 }, (_, i) => ({
  number: i + 1,
  label: `Class ${i + 1}`,
  href: `/classes/class-${i + 1}`,
}));

export const subjects = [
  { name: "Mathematics", icon: "Sigma", href: "/subjects/mathematics", color: "border-sky-400/30 hover:border-sky-400/60" },
  { name: "Science", icon: "Atom", href: "/subjects/science", color: "border-orange-500/30 hover:border-orange-500/60" },
  { name: "English", icon: "Languages", href: "/subjects/english", color: "border-sky-400/30 hover:border-sky-400/60" },
  { name: "Hindi", icon: "Type", href: "/subjects/hindi", color: "border-orange-500/30 hover:border-orange-500/60" },
  { name: "Punjabi", icon: "Type", href: "/subjects/punjabi", color: "border-sky-400/30 hover:border-sky-400/60" },
  { name: "SST", icon: "Globe2", href: "/subjects/sst", color: "border-orange-500/30 hover:border-orange-500/60" },
];

export const steps = [
  {
    step: "01",
    title: "Choose Your Tool",
    description: "Pick from 8 AI tools — Ask Anything, Homework Solver, Essay Generator, Calculator, and more.",
  },
  {
    step: "02",
    title: "Enter Your Question",
    description: "Type your question, topic, or paste your homework. Select your class level.",
  },
  {
    step: "03",
    title: "Get AI Explanation",
    description: "Receive clear, step-by-step answers written for your class level.",
  },
];

export const audiences = [
  {
    title: "Students",
    description: "Homework help, exam prep, essays, and quizzes for Classes 1–12.",
    icon: "GraduationCap",
    accent: "bg-sky-400/10 text-sky-400",
  },
  {
    title: "Parents",
    description: "Support your child's learning with easy-to-understand explanations.",
    icon: "Heart",
    accent: "bg-orange-500/10 text-orange-400",
  },
  {
    title: "Teachers",
    description: "Generate quizzes, worksheets, and lesson ideas in seconds.",
    icon: "Users",
    accent: "bg-sky-400/10 text-sky-400",
  },
];

export const stats = [
  { value: "12", label: "Classes Covered", href: "/classes" },
  { value: "8", label: "AI Tools", href: "/#tools" },
  { value: "6+", label: "Subjects", href: "/subjects" },
  { value: "Free", label: "To Get Started", href: "/tools/homework-solver" },
];
