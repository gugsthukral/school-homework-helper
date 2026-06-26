export const inputClassName =
  "theme-input w-full rounded-xl border px-4 py-3 outline-none transition-colors focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20";

export const labelClassName = "theme-label mb-2 block text-sm font-medium";
export const gradeOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `Class ${i + 1}`,
}));

export const mathTypes = [
  { value: "arithmetic", label: "Arithmetic" },
  { value: "algebra", label: "Algebra" },
  { value: "geometry", label: "Geometry" },
  { value: "word-problem", label: "Word Problem" },
];

export const wordCountOptions = [100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];

export const quizCountOptions = [5, 10, 15, 20];

export const calculatorTypes = [
  {
    value: "basic",
    label: "Basic",
    description: "Addition, subtraction, multiplication, division",
    placeholder: "e.g. (12 + 8) × 3, 144 ÷ 12",
  },
  {
    value: "percentage",
    label: "Percentage & Ratio",
    description: "Percentages, ratios, and proportions",
    placeholder: "e.g. 25% of 480, 3:5 as a ratio",
  },
  {
    value: "scientific",
    label: "Scientific",
    description: "Powers, roots, trigonometry, and notation",
    placeholder: "e.g. sqrt(144), sin(30°), 2.5 × 10⁶",
  },
  {
    value: "unit",
    label: "Unit Converter",
    description: "Length, mass, volume, temperature, and more",
    placeholder: "e.g. 5 km to metres, 72°F to Celsius",
  },
] as const;

export type CalculatorType = (typeof calculatorTypes)[number]["value"];
