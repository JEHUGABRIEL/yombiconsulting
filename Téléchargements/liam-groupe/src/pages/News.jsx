import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import { news, img } from "../data/siteData";

export default function News_() {
  return (
    <div className="font-body">
      <Navbar />

      <section className="relative h-[480px]">
        <img
          src={img("actualites-hero", 1920, 700)}
          alt="Conférence de presse LIAM Groupe"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {news.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
