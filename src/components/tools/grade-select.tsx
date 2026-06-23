import { gradeOptions, inputClassName, labelClassName } from "@/lib/tool-form-config";

type GradeSelectProps = {
  value: number;
  onChange: (grade: number) => void;
  id?: string;
};

export function GradeSelect({ value, onChange, id = "grade" }: GradeSelectProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        Class Level
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClassName}
      >
        {gradeOptions.map((g) => (
          <option key={g.value} value={g.value}>
            {g.label}
          </option>
        ))}
      </select>
    </div>
  );
}
