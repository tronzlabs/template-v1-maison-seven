import { Routes, Route, useLocation } from "react-router-dom";

import SmoothScroll from "./lib/SmoothScroll.jsx";
import Cursor from "./components/Cursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PageTransition from "./components/PageTransition.jsx";
import StartProjectOverlay from "./components/StartProjectOverlay.jsx";

import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Studio from "./pages/Studio.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-bone text-ink grain vignette">
        <Cursor />
        <Navbar />

        <PageTransition>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </PageTransition>

        <Footer />
        <StartProjectOverlay />
      </div>
    </SmoothScroll>
  );
}
