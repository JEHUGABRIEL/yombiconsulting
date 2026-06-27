-- Schema pour LIAM Groupe Supabase

-- Domaines d'intervention
CREATE TABLE domains (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  short_description TEXT,
  description TEXT,
  icon TEXT,
  hero_image TEXT,
  color TEXT,
  order_index INTEGER DEFAULT 0,
  objectives JSONB DEFAULT '[]',
  programs JSONB DEFAULT '[]',
  stats JSONB DEFAULT '[]',
  gallery JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Événements
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT,
  location TEXT,
  image TEXT,
  gallery JSONB DEFAULT '[]',
  status TEXT DEFAULT 'a_venir',
  category TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Actualités
CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  gallery JSONB DEFAULT '[]',
  date TEXT,
  tags JSONB DEFAULT '[]',
  author TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Équipe
CREATE TABLE team (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  description TEXT,
  image TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Partenaires
CREATE TABLE partners (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  logo TEXT,
  initial TEXT,
  color TEXT,
  category TEXT,
  collaboration TEXT,
  website TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Témoignages
CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT,
  image TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Paramètres du site (siteInfo, navLinks, footerLinks, stats, hero images)
CREATE TABLE site_settings (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_domains_slug ON domains(slug);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- Administrateurs
CREATE TABLE admins (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_admins_email ON admins(email);

-- Row Level Security (lecture publique pour tous, écriture restreinte)
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique domains" ON domains FOR SELECT USING (true);
CREATE POLICY "Lecture publique events" ON events FOR SELECT USING (true);
CREATE POLICY "Lecture publique news" ON news FOR SELECT USING (true);
CREATE POLICY "Lecture publique team" ON team FOR SELECT USING (true);
CREATE POLICY "Lecture publique partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Lecture publique testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Lecture publique site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Lecture publique admins" ON admins FOR SELECT USING (true);
