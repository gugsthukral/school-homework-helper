import { ColorfulSubjectIcon } from "@/components/shared/colorful-icons";

type SubjectIconProps = {
  icon: string;
  className?: string;
  size?: number;
};

export function SubjectIcon({ icon, className, size = 48 }: SubjectIconProps) {
  return <ColorfulSubjectIcon icon={icon} className={className} size={size} />;
}
