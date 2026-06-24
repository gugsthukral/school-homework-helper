export const inputClassName =
  "w-full rounded-xl border border-sky-400/20 bg-navy-950/60 px-4 py-3 text-white outline-none transition-colors focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20";

export const labelClassName = "mb-2 block text-sm font-medium text-sky-200";

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

export const wordCountOptions = [100, 150, 200, 250, 300, 400, 500];

export const quizCountOptions = [5, 10, 15, 20];

export const calculatorTypes = [
  { value: "basic", label: "Basic Arithmetic" },
  { value: "percentage", label: "Percentage & Ratio" },
  { value: "scientific", label: "Scientific" },
  { value: "unit", label: "Unit Conversion" },
];
