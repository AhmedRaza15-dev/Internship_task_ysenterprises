import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Navigation = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.from('.mobile-menu-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-lg border-b border-zinc-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#" 
              className="text-2xl font-bold tracking-tight hover:text-amber-500 transition-colors"
            >
              Code Celix
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
                {navLinks.map((link, index) => (
                  link.href.startsWith('/') ? (
                    <Link
                      key={index}
                      to={link.href}
                      className="relative text-sm font-semibold uppercase tracking-wider hover:text-amber-500 transition-colors group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  ) : (
                    <a
                      key={index}
                      href={link.href}
                      className="relative text-sm font-semibold uppercase tracking-wider hover:text-amber-500 transition-colors group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  )
                ))}
              <Link
                to="/contact"
                className="px-6 py-3 bg-amber-500 text-black font-semibold text-sm uppercase tracking-wider hover:bg-amber-400 transition-all hover:scale-105"
              >
                Let's Talk
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            >
              <span 
                className={`w-6 h-0.5 bg-white transition-all ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span 
                className={`w-6 h-0.5 bg-white transition-all ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span 
                className={`w-6 h-0.5 bg-white transition-all ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={index}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-menu-item text-4xl font-bold hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-menu-item text-4xl font-bold hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </a>
                )
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-menu-item px-8 py-4 bg-amber-500 text-black font-bold text-lg hover:bg-amber-400 transition-all mt-8"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;