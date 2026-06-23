import { inputClassName, labelClassName } from "@/lib/tool-form-config";
import { getSubjectNamesForClass } from "@/lib/syllabus-2026-27";

type SubjectSelectProps = {
  classNumber: number;
  value: string;
  onChange: (subject: string) => void;
  id?: string;
  optional?: boolean;
};

export function SubjectSelect({
  classNumber,
  value,
  onChange,
  id = "subject",
  optional = true,
}: SubjectSelectProps) {
  const subjects = getSubjectNamesForClass(classNumber);

  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        Subject{optional ? " (optional)" : ""}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClassName}
      >
        <option value="">Select subject</option>
        {subjects.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
