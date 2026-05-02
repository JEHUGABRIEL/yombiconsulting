import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, X, Wrench, Wifi, ShieldCheck, Zap } from 'lucide-react';

// Hooks
import { useCart }           from '@/hooks/useCart';
import { useWishlist }       from '@/hooks/useWishlist';
import { useAuth }           from '@/hooks/useAuth';
import { useReviews }        from '@/hooks/useReviews';
import { useProductFilters } from '@/hooks/useProductFilters';

// Components — layout
import { Navbar }  from '@/components/layout/Navbar';
import { Footer }  from '@/components/layout/Footer';

// Components — UI
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

// Components — home
import { Hero }     from '@/components/home/Hero';
import { StatsBar } from '@/components/home/StatsBar';

// Components — product
import { ProductCard }    from '@/components/product/ProductCard';
import { ProductModal }   from '@/components/product/ProductModal';
import { ProductFilters } from '@/components/product/ProductFilters';

// Components — cart / wishlist
import { CartDrawer }     from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';

// Components — contact
import { ContactSection } from '@/components/contact/ContactSection';

// Types
import type { Product } from '@/types';

// ── Services data ─────────────────────────────────────────────
const SERVICES = [
  {
    icon: <Wrench size={32} className="text-emerald-500" />,
    title: 'Installation & Config',
    desc: 'Installation professionnelle de vos équipements Starlink, routeurs et réseaux par nos techniciens certifiés.',
    price: 'À partir de 75 000 CFA',
    delay: 0,
  },
  {
    icon: <ShieldCheck size={32} className="text-emerald-500" />,
    title: 'SAV & Réparation',
    desc: 'Service après-vente réactif à Bangui. Diagnostic, réparation et remplacement de pièces sous garantie.',
    price: 'Devis gratuit',
    delay: 0.1,
  },
  {
    icon: <Wifi size={32} className="text-emerald-500" />,
    title: 'Réseau & Connectivité',
    desc: 'Configuration de réseaux WiFi, installation Starlink et optimisation de la connectivité pour entreprises.',
    price: 'Sur devis',
    delay: 0.2,
  },
  {
    icon: <Zap size={32} className="text-emerald-500" />,
    title: 'Livraison Express',
    desc: 'Livraison à domicile dans Bangui en moins de 2 heures. 7 jours sur 7, disponible via WhatsApp.',
    price: 'Inclus sur commande',
    delay: 0.3,
  },
];

// ─────────────────────────────────────────────────────────────

export default function App() {
  // ── UI state ───────────────────────────────────────────────
  const [isDarkMode,      setIsDarkMode]      = useState(false);
  const [isCartOpen,      setIsCartOpen]      = useState(false);
  const [isWishlistOpen,  setIsWishlistOpen]  = useState(false);
  const [isNotifOpen,     setIsNotifOpen]     = useState(false);
  const [notifEmail,      setNotifEmail]      = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ── Domain hooks ───────────────────────────────────────────
  const { cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity } = useCart();
  const { wishlist, toggle: toggleWishlist, isInWishlist } = useWishlist();
  const { isAdmin } = useAuth();
  const { approvedReviews, pendingReviews, submitting, submitReview } = useReviews(isAdmin);
  const { category, query, brands, priceRange, hasActiveFilters, setCategory, setQuery, toggleBrand, setPriceRange, resetFilters, filteredProducts } = useProductFilters();

  // ── WhatsApp ───────────────────────────────────────────────
  const openWhatsApp = (msg?: string) => {
    const text = cart.length > 0
      ? `Bonjour Clean., je souhaite commander :\n${cart.map(i => `- ${i.name} (${i.quantity}x)`).join('\n')}\nTotal : ${cartTotal.toLocaleString()} CFA`
      : msg ?? 'Bonjour Clean., je souhaite commander du matériel informatique.';
    window.open(`https://wa.me/23672280727?text=${encodeURIComponent(text)}`, '_blank');
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className={`min-h-screen font-sans transition-colors duration-500
      ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>

      <Toaster
        position="top-right"
        toastOptions={{ duration: 3500, style: { fontWeight: 700, fontSize: '13px' } }}
      />

      <WhatsAppButton cart={cart} cartTotal={cartTotal} />

      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        searchQuery={query}
        isDarkMode={isDarkMode}
        onSearchChange={setQuery}
        onCartOpen={() => setIsCartOpen(true)}
        onWishlistOpen={() => setIsWishlistOpen(true)}
        onToggleDarkMode={() => setIsDarkMode(d => !d)}
      />

      {/* Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        cartTotal={cartTotal}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onWhatsApp={openWhatsApp}
      />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        wishlist={wishlist}
        onClose={() => setIsWishlistOpen(false)}
        onToggle={toggleWishlist}
        onAddToCart={addToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Modal produit */}
      <ProductModal
        product={selectedProduct}
        isDarkMode={isDarkMode}
        reviews={approvedReviews}
        reviewSubmitting={submitting}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={p => { addToCart(p); setIsCartOpen(true); }}
        onWhatsApp={openWhatsApp}
        onSubmitReview={submitReview}
      />

      {/* Modal notification stock */}
      <NotifModal
        isOpen={isNotifOpen}
        email={notifEmail}
        onEmailChange={setNotifEmail}
        onClose={() => setIsNotifOpen(false)}
      />

      {/* ── Main content ── */}
      <main>

        {/* Ancre accueil */}
        <div id="accueil" />

        <Hero
          isDarkMode={isDarkMode}
          onProductSelect={setSelectedProduct}
          onWhatsApp={openWhatsApp}
        />

        {/* Filtres */}
        <ProductFilters
          category={category}
          brands={brands}
          priceRange={priceRange}
          hasActiveFilters={hasActiveFilters}
          onCategoryChange={setCategory}
          onToggleBrand={toggleBrand}
          onPriceChange={setPriceRange}
          onReset={resetFilters}
          onNotifyStock={() => setIsNotifOpen(true)}
        />

        {/* ── CATALOGUE ── */}
        <section
          id="products"
          className={`py-32 overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50/50'}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 px-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-6 flex items-center gap-3">
                <div className="h-1 w-8 bg-emerald-600" /> Collection Clean.
              </h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter">
                Équipements <span className="text-emerald-600 italic">Certifiés</span>.
              </h3>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="px-6 py-24 text-center">
                <p className="text-slate-400 font-bold text-lg">Aucun produit ne correspond à vos filtres.</p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-8 py-3 rounded-2xl bg-emerald-600 text-white font-black text-sm hover:bg-emerald-500 transition-all"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div
                className="flex gap-8 overflow-x-auto pb-16 pt-4 px-6 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none' }}
              >
                {filteredProducts.map(prod => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isDarkMode={isDarkMode}
                    isInWishlist={isInWishlist(prod.id)}
                    onSelect={setSelectedProduct}
                    onAddToCart={p => { addToCart(p); setIsCartOpen(true); }}
                    onToggleWishlist={toggleWishlist}
                    onNotifyStock={() => setIsNotifOpen(true)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <StatsBar />

        {/* ── SERVICES ── */}
        <section
          id="services"
          className={`py-32 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-20">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-6 flex items-center gap-3">
                <div className="h-1 w-8 bg-emerald-600" /> Nos services
              </h2>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter">
                  Au-delà des <span className="text-emerald-600 italic">produits</span>.
                </h3>
                <p className={`max-w-md text-lg font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Clean. vous accompagne de l'achat à l'installation. Une équipe de techniciens disponibles à Bangui, 7j/7.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map(({ icon, title, desc, price, delay }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay }}
                  className={`rounded-[2rem] p-8 border transition-all hover:-translate-y-1 group
                    ${isDarkMode
                      ? 'bg-slate-950 border-slate-800 hover:border-emerald-500/30'
                      : 'bg-slate-50 border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50'}`}
                >
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-colors
                    ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                    {icon}
                  </div>
                  <h4 className="text-lg font-black mb-3">{title}</h4>
                  <p className={`text-sm font-medium leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">{price}</span>
                    <button
                      onClick={() => openWhatsApp(`Bonjour Clean., je suis intéressé par le service : ${title}`)}
                      className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all
                        ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white' : 'bg-white text-slate-500 hover:bg-emerald-600 hover:text-white border border-slate-100'}`}
                    >
                      En savoir +
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bannière CTA services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-[2rem] bg-emerald-600 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div>
                <h4 className="text-2xl md:text-3xl font-black text-white mb-3">Besoin d'un service sur mesure ?</h4>
                <p className="text-emerald-100 font-medium">Contactez-nous directement sur WhatsApp — réponse en moins de 30 min.</p>
              </div>
              <button
                onClick={() => openWhatsApp('Bonjour Clean., j\'ai besoin d\'un service sur mesure.')}
                className="flex-shrink-0 px-10 py-5 bg-white text-emerald-600 rounded-2xl font-black text-sm hover:bg-slate-900 hover:text-white transition-all shadow-2xl shadow-emerald-700/30"
              >
                💬 WhatsApp maintenant
              </button>
            </motion.div>
          </div>
        </section>

        {/* Ancre garantie */}
        <div id="garantie" />

        <ContactSection isDarkMode={isDarkMode} onWhatsApp={openWhatsApp} />
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

// ── Modal notification ────────────────────────────────────────
function NotifModal({ isOpen, email, onEmailChange, onClose }: {
  isOpen: boolean; email: string;
  onEmailChange: (v: string) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 text-center"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-50">
              <X size={20} />
            </button>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Bell size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">Restez informé !</h3>
            <p className="text-slate-500 mb-8 font-medium">
              Laissez votre email pour être alerté du retour en stock ou des promotions exclusives.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={e => onEmailChange(e.target.value)}
                placeholder="votre@email.com"
                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
              <button
                onClick={() => { onClose(); onEmailChange(''); }}
                className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-black text-white hover:bg-emerald-600 transition-all"
              >
                M'inscrire gratuitement
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
