
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Amenities } from './components/Amenities';
import { Rooms } from './components/Rooms';
import { Dining } from './components/Dining';
import { ExtraServices } from './components/ExtraServices';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { ChambresPage } from './pages/ChambresPage';
import { RestaurantPage } from './pages/RestaurantPage';
import { BarPage } from './pages/BarPage';
import { BienEtrePage } from './pages/BienEtrePage';
import { SuitesPage } from './pages/SuitesPage';
import { EvenementsPage } from './pages/EvenementsPage';
import { ShopPage } from './pages/ShopPage';
import { NewsPage } from './pages/NewsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppFab } from './components/WhatsAppFab';
import { ContactModalProvider } from './context/ContactModalContext';
import { Calendar } from 'lucide-react';
import { ContactModal } from './components/ContactModal';

function HomePage() {
  return (
    <main>
      <Hero />
      {/* Mobile Booking Bar - visible only below lg */}
      <div className="lg:hidden px-4 py-5 bg-white shadow-lg">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[0.55rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
              Check In
            </label>
            <input
              type="date"
              className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-sm text-[#222] outline-none focus:border-brand-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.55rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
              Check Out
            </label>
            <input
              type="date"
              className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-sm text-[#222] outline-none focus:border-brand-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.55rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
              Guests
            </label>
            <select className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-sm text-[#222] outline-none focus:border-brand-400 transition-colors bg-white">
              <option>1 Guest</option>
              <option selected>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>
          <div>
            <label className="block text-[0.55rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
              Room
            </label>
            <select className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-sm text-[#222] outline-none focus:border-brand-400 transition-colors bg-white">
              <option>1 Room</option>
              <option>2 Rooms</option>
              <option>3 Rooms</option>
              <option>4+ Rooms</option>
            </select>
          </div>
        </div>
        <button className="w-full mt-3 bg-[#bfa37a] hover:bg-[#ad8f68] text-white font-semibold text-xs uppercase tracking-[1.5px] px-5 py-3 transition-colors flex items-center justify-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          Check Now
        </button>
      </div>
      <About />
      <Amenities />
      <Rooms />
      <Dining />
      <ExtraServices />
      <Testimonials />
      <Contact />
    </main>
  );
}

export function App() {
  return (
    <ContactModalProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chambres" element={<ChambresPage />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/bar" element={<BarPage />} />
            <Route path="/bien-etre" element={<BienEtrePage />} />
            <Route path="/suites" element={<SuitesPage />} />
            <Route path="/evenements" element={<EvenementsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
          <ScrollToTop />
          <WhatsAppFab />
          <ContactModal />
          <Footer />
        </div>
      </BrowserRouter>
    </ContactModalProvider>
  );
}