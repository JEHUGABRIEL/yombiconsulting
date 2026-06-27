import { LayoutGrid } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import DomainCard from "../components/DomainCard";
import { useDomains } from "../hooks/useSiteData";

export default function DomainsIndex() {
  const { data: domains = [] } = useDomains();

  return (
    <div className="font-body">
      <Navbar transparentOnTop={false} />
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            icon={LayoutGrid}
            eyebrow="Nos actions"
            variant="brand"
            title="Nos 6 domaines d'intervention"
            description="Des programmes concrets pour répondre aux besoins des communautés centrafricaines, avec un focus sur l'autonomisation des femmes et des jeunes."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {domains.map((d) => (
              <DomainCard key={d.slug} domain={d} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
