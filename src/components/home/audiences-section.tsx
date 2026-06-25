import { ColorfulFeatureIcon } from "@/components/shared/colorful-icons";
import { SiteContainer } from "@/components/shared/site-container";
import { audiences } from "@/lib/data";
import { REGIONAL_LANGUAGES_LIST } from "@/lib/indian-languages";

const featureIconMap = {
  GraduationCap: "GraduationCap",
  Heart: "Heart",
  Users: "Users",
  Languages: "Languages",
} as const;

const audienceCards = [
  ...audiences,
  {
    title: "Easy Language",
    description: `Type, speak, listen, and get AI explanations in ${REGIONAL_LANGUAGES_LIST}.`,
    icon: "Languages",
  },
] as const;

const cardClassName =
  "home-pastel-orange rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md";

export function AudiencesSection() {
  return (
    <section className="w-full py-16 sm:py-20">
      <SiteContainer>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            For Everyone
          </span>
          <h2 className="home-section-title mt-3 text-3xl font-bold sm:text-4xl">
            Built for the Whole School Community
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {audienceCards.map((audience) => {
            const iconKey =
              featureIconMap[audience.icon as keyof typeof featureIconMap] ?? "GraduationCap";
            return (
              <div key={audience.title} className={cardClassName}>
                <ColorfulFeatureIcon icon={iconKey} size={44} />
                <h3 className="mt-4 text-lg font-semibold text-slate-800">{audience.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{audience.description}</p>
              </div>
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
