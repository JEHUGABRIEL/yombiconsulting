# Clean Shop — Boutique Tech N°1 à Bangui, RCA

Stack : **React 19 · TypeScript · Vite · Tailwind v4 · Supabase · Framer Motion**

## Architecture

```
src/
├── types/         → Tous les types TypeScript centralisés
├── data/          → Données statiques (produits, marques, catégories)
├── lib/           → Clients externes (Supabase)
├── hooks/         → Logique métier réutilisable
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useWishlist.ts
│   ├── useReviews.ts
│   └── useProductFilters.ts
└── components/
    ├── layout/    → Navbar, Footer
    ├── ui/        → WhatsAppButton
    ├── home/      → Hero, StatsBar
    ├── product/   → ProductCard, ProductModal, ProductFilters
    ├── cart/      → CartDrawer
    ├── wishlist/  → WishlistDrawer
    ├── admin/     → AdminDashboard
    └── contact/   → ContactSection
```

## Setup

### 1. Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. SQL Editor → coller et exécuter `supabase-schema.sql`
3. Dashboard → Database → Replication → activer `reviews`
4. Dashboard → Authentication → Providers → activer **Google**

### 2. Variables d'environnement

```bash
cp .env.example .env.local
```

Remplir dans `.env.local` :
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 3. Lancer le projet

```bash
npm install
npm run dev
```

### 4. Déploiement Render

- **Environment** : Static Site
- **Build Command** : `npm run build`
- **Publish Directory** : `dist`
- Ajouter les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`

### 5. Ajouter un admin

Après connexion Google sur le site, récupère ton UUID dans :
Supabase Dashboard → Authentication → Users → copier l'UUID

```sql
insert into public.admins (id, email)
values ('TON-UUID', 'ton@email.com');
```
