type LegalSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-sky-200/70">{children}</div>
    </section>
  );
}
