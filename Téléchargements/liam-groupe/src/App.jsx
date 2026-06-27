import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Events from "./pages/Events";
import DomainsIndex from "./pages/DomainsIndex";
import Domain from "./pages/Domain";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/actualites" element={<News />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/domaines" element={<DomainsIndex />} />
          <Route path="/domaines/:slug" element={<Domain />} />
          <Route path="/partenaires" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
