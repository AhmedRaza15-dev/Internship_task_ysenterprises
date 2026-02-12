import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ContactPage from './Pages/ContactPage';
import BlogPage from './Pages/BlogPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preloader animation
    const timer = setTimeout(() => {
      gsap.to('.preloader', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => setLoading(false)
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="relative bg-zinc-950 text-white overflow-x-hidden">
      {/* Preloader */}
      {loading && (
        <div className="preloader fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-pulse">Code Celix</h1>
            <div className="w-48 h-1 bg-zinc-800 mx-auto overflow-hidden">
              <div className="h-full bg-amber-500 animate-loading"></div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Cursor */}
      <Cursor />

      {/* Navigation */}
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <About />
              <Projects />
              <Services />
            </main>
          }
        />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  </Router>
  );
}

export default App;