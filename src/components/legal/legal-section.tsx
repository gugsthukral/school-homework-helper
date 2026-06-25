type LegalSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="page-title text-xl font-semibold">{title}</h2>
      <div className="page-description mt-4 space-y-4 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
