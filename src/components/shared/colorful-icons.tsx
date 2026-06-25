import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  size?: number;
};

function IconFrame({
  children,
  className,
  size = 48,
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "theme-icon-frame inline-flex shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function ColorfulToolIcon({
  icon,
  className,
  size = 48,
}: IconProps & { icon: string }) {
  const s = size * 0.58;

  const icons: Record<string, React.ReactNode> = {
    MessageCircleQuestion: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="6" y="10" width="30" height="22" rx="6" fill="#4A9EFF" />
        <path d="M14 36 L20 30 H36 V12 H8 V30 H14 Z" fill="#2B7DE9" opacity="0.35" />
        <text x="24" y="27" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">?</text>
      </svg>
    ),
    BookOpen: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <path d="M8 10 C8 10 14 8 24 12 C34 8 40 10 40 10 V34 C40 34 34 32 24 36 C14 32 8 34 8 34 V10Z" fill="#4A9EFF" />
        <path d="M24 12 V36" stroke="#2B7DE9" strokeWidth="2" />
        <rect x="12" y="16" width="8" height="2" rx="1" fill="#FDE68A" />
        <rect x="12" y="21" width="6" height="2" rx="1" fill="#FDE68A" />
      </svg>
    ),
    PenLine: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="10" y="12" width="22" height="26" rx="3" fill="#FDE68A" />
        <rect x="13" y="16" width="14" height="2" rx="1" fill="#FBBF24" />
        <rect x="13" y="21" width="10" height="2" rx="1" fill="#FBBF24" />
        <path d="M30 30 L38 38 L34 42 L26 34 Z" fill="#F97316" />
        <path d="M30 30 L34 26 L38 30 L34 34 Z" fill="#FB923C" />
      </svg>
    ),
    SquareFunction: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="10" width="32" height="28" rx="5" fill="#64748B" />
        <rect x="12" y="14" width="8" height="6" rx="1.5" fill="#E2E8F0" />
        <rect x="22" y="14" width="8" height="6" rx="1.5" fill="#FDE68A" />
        <rect x="32" y="14" width="4" height="6" rx="1.5" fill="#86EFAC" />
        <rect x="12" y="24" width="8" height="6" rx="1.5" fill="#93C5FD" />
        <rect x="22" y="24" width="8" height="6" rx="1.5" fill="#FCA5A5" />
        <rect x="32" y="24" width="4" height="6" rx="1.5" fill="#FDE68A" />
      </svg>
    ),
    Calculator: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" fill="#4A9EFF" />
        <text x="17" y="29" fill="#fff" fontSize="16" fontWeight="700">÷</text>
      </svg>
    ),
    HelpCircle: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" fill="#EF4444" />
        <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">?</text>
      </svg>
    ),
    FlaskConical: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <path d="M18 8 H30 V14 L36 34 C37 37 34 40 31 40 H17 C14 40 11 37 12 34 L18 14 V8Z" fill="#86EFAC" />
        <rect x="18" y="8" width="12" height="4" rx="1" fill="#22C55E" />
        <circle cx="22" cy="30" r="3" fill="#4ADE80" />
        <circle cx="28" cy="26" r="2" fill="#FDE68A" />
      </svg>
    ),
    SpellCheck: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="14" width="12" height="12" rx="2" fill="#4A9EFF" />
        <rect x="22" y="14" width="12" height="12" rx="2" fill="#F97316" />
        <rect x="15" y="28" width="12" height="12" rx="2" fill="#22C55E" />
        <text x="14" y="23" fill="#fff" fontSize="8" fontWeight="700">A</text>
        <text x="28" y="23" fill="#fff" fontSize="8" fontWeight="700">B</text>
        <text x="21" y="37" fill="#fff" fontSize="8" fontWeight="700">C</text>
      </svg>
    ),
  };

  return (
    <IconFrame className={className} size={size}>
      {icons[icon] ?? icons.BookOpen}
    </IconFrame>
  );
}

export function ColorfulSubjectIcon({
  icon,
  className,
  size = 48,
}: IconProps & { icon: string }) {
  const s = size * 0.58;

  const icons: Record<string, React.ReactNode> = {
    Sigma: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <text x="24" y="32" textAnchor="middle" fill="#4A9EFF" fontSize="22" fontWeight="800">∑</text>
      </svg>
    ),
    TestTube: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <path d="M18 8 H30 V14 L36 34 C37 37 34 40 31 40 H17 C14 40 11 37 12 34 L18 14 V8Z" fill="#86EFAC" />
        <rect x="18" y="8" width="12" height="4" rx="1" fill="#22C55E" />
      </svg>
    ),
    Abc: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="14" width="10" height="10" rx="2" fill="#4A9EFF" />
        <rect x="20" y="14" width="10" height="10" rx="2" fill="#F97316" />
        <rect x="32" y="14" width="8" height="10" rx="2" fill="#22C55E" />
        <text x="13" y="22" fill="#fff" fontSize="7" fontWeight="700">a</text>
        <text x="25" y="22" fill="#fff" fontSize="7" fontWeight="700">b</text>
        <text x="35" y="22" fill="#fff" fontSize="7" fontWeight="700">c</text>
      </svg>
    ),
    Hindi: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" fill="#F97316" />
        <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">अ</text>
      </svg>
    ),
    Punjabi: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" fill="#4A9EFF" />
        <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">ੳ</text>
      </svg>
    ),
    Landmark: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <path d="M10 36 H38 V32 L24 14 L10 32 V36Z" fill="#94A3B8" />
        <rect x="20" y="24" width="8" height="12" fill="#F97316" />
        <rect x="8" y="36" width="32" height="4" fill="#64748B" />
      </svg>
    ),
    Monitor: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="20" rx="3" fill="#4A9EFF" />
        <rect x="12" y="16" width="24" height="12" rx="1" fill="#DBEAFE" />
        <rect x="20" y="34" width="8" height="3" rx="1" fill="#64748B" />
        <rect x="16" y="37" width="16" height="2" rx="1" fill="#94A3B8" />
      </svg>
    ),
    BriefcaseBusiness: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="10" y="16" width="28" height="20" rx="3" fill="#F97316" />
        <rect x="18" y="12" width="12" height="6" rx="2" fill="#FB923C" />
      </svg>
    ),
    TrendingUp: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <path d="M10 34 L20 24 L28 30 L38 14" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
        <path d="M30 14 H38 V22" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <IconFrame className={className} size={size}>
      {icons[icon] ?? icons.Sigma}
    </IconFrame>
  );
}

export function ColorfulFeatureIcon({
  icon,
  className,
  size = 44,
}: IconProps & { icon: "GraduationCap" | "Heart" | "Users" | "Languages" | "Target" }) {
  const s = size * 0.55;

  const icons: Record<string, React.ReactNode> = {
    GraduationCap: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <path d="M24 10 L40 18 L24 26 L8 18 Z" fill="#4A9EFF" />
        <path d="M14 22 V30 C14 30 18 34 24 34 C30 34 34 30 34 30 V22" stroke="#2B7DE9" strokeWidth="3" />
        <rect x="36" y="18" width="4" height="10" fill="#F97316" />
      </svg>
    ),
    Heart: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <path d="M24 36 C24 36 10 26 10 18 C10 14 13 11 17 11 C20 11 22 13 24 16 C26 13 28 11 31 11 C35 11 38 14 38 18 C38 26 24 36 24 36Z" fill="#F97316" />
      </svg>
    ),
    Users: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <circle cx="18" cy="18" r="6" fill="#4A9EFF" />
        <circle cx="32" cy="20" r="5" fill="#22C55E" />
        <path d="M8 36 C8 30 12 26 18 26 C24 26 28 30 28 36" fill="#2B7DE9" />
        <path d="M28 36 C28 31 31 28 36 28 C38 28 40 29 40 30" fill="#16A34A" />
      </svg>
    ),
    Languages: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" fill="#4A9EFF" />
        <ellipse cx="24" cy="24" rx="6" ry="16" stroke="#fff" strokeWidth="2" />
        <line x1="8" y1="24" x2="40" y2="24" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
    Target: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="#EF4444" strokeWidth="4" fill="none" />
        <circle cx="24" cy="24" r="8" stroke="#F97316" strokeWidth="4" fill="none" />
        <circle cx="24" cy="24" r="3" fill="#FDE68A" />
      </svg>
    ),
  };

  return (
    <IconFrame className={cn("rounded-xl bg-white/90", className)} size={size}>
      {icons[icon]}
    </IconFrame>
  );
}

export function ColorfulStepIcon({
  icon,
  step,
  className,
  size = 56,
}: IconProps & {
  icon: "ChooseTool" | "EnterQuestion" | "GetExplanation";
  step: string;
}) {
  const s = size * 0.55;

  const icons: Record<string, React.ReactNode> = {
    ChooseTool: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="14" height="14" rx="4" fill="#4A9EFF" />
        <rect x="26" y="8" width="14" height="14" rx="4" fill="#F97316" />
        <rect x="8" y="26" width="14" height="14" rx="4" fill="#22C55E" />
        <rect x="26" y="26" width="14" height="14" rx="4" fill="#EF4444" />
        <circle cx="15" cy="15" r="2.5" fill="#fff" />
        <path d="M30 13 H36 M33 10 V16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <rect x="12" y="31" width="6" height="2" rx="1" fill="#fff" />
        <text x="33" y="36" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">?</text>
      </svg>
    ),
    EnterQuestion: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="22" rx="6" fill="#4A9EFF" />
        <path d="M16 38 L22 32 H34 V16 H12 V32 H16 Z" fill="#2B7DE9" opacity="0.35" />
        <rect x="14" y="18" width="14" height="2.5" rx="1.25" fill="#fff" />
        <rect x="14" y="23" width="10" height="2.5" rx="1.25" fill="#FDE68A" />
        <rect x="14" y="28" width="12" height="2.5" rx="1.25" fill="#fff" opacity="0.85" />
        <circle cx="34" cy="34" r="7" fill="#F97316" />
        <path d="M34 31 V37 M31 34 H37" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    GetExplanation: (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="10" y="8" width="28" height="32" rx="4" fill="#FDE68A" />
        <rect x="14" y="14" width="12" height="2" rx="1" fill="#FBBF24" />
        <rect x="14" y="19" width="18" height="2" rx="1" fill="#FBBF24" />
        <rect x="14" y="24" width="16" height="2" rx="1" fill="#FBBF24" />
        <circle cx="34" cy="34" r="9" fill="#22C55E" />
        <path d="M30 34 L33 37 L39 31" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 8 L38 4 L40 8 L44 8 L41 11 L42 15 L38 12 L34 15 L35 11 L32 8 Z" fill="#4A9EFF" />
      </svg>
    ),
  };

  return (
    <div className={cn("relative mx-auto inline-flex", className)}>
      <IconFrame size={size} className="rounded-2xl bg-gradient-to-br from-sky-50 to-orange-50 shadow-md ring-1 ring-slate-100">
        {icons[icon]}
      </IconFrame>
      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-400 text-[11px] font-bold text-white shadow-md ring-2 ring-white">
        {step}
      </span>
    </div>
  );
}

/** Map tool page slug to data icon key */
export const TOOL_SLUG_ICON: Record<string, string> = {
  "ask-anything": "MessageCircleQuestion",
  "homework-solver": "BookOpen",
  "essay-generator": "PenLine",
  calculator: "SquareFunction",
  "math-solver": "Calculator",
  "quiz-generator": "HelpCircle",
  "science-projects": "FlaskConical",
  "grammar-checker": "SpellCheck",
};
