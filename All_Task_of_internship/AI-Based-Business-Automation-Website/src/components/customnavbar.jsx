import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, FaTimes, FaHome, FaLightbulb, FaBriefcase, FaTags, FaEnvelope,
  FaMoon, FaSun, FaIndustry, FaCogs // <--- Added new icons
} from 'react-icons/fa';

const CustomNavbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // UPDATED MENU ITEMS
  const navItems = [
    { name: 'Home',         path: '/',              icon: <FaHome size={18} /> },
    { name: 'Solutions',    path: '/solutions',     icon: <FaLightbulb size={18} /> },
    { name: 'Industries',   path: '/industries',    icon: <FaIndustry size={18} /> }, // New
    { name: 'How It Works', path: '/how-it-works',  icon: <FaCogs size={18} /> },     // New
    { name: 'Case Studies', path: '/case-studies',  icon: <FaBriefcase size={18} /> },
    { name: 'Pricing',      path: '/pricing',       icon: <FaTags size={18} /> },
    { name: 'Contact',      path: '/contact',       icon: <FaEnvelope size={18} /> },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 py-3 px-6 shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-brand-info'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          CodeCelix<span className="text-purple-200">.</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-white/20 pr-6">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className="group flex flex-col items-center justify-center gap-1 text-white transition-all hover:-translate-y-1">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:text-purple-100 transition-colors">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-yellow-400 border border-gray-700' : 'bg-white/10 text-white hover:bg-white/20'}`}
              title="Toggle Theme"
            >
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-white">
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div className={`absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center gap-6 text-white lg:hidden z-40 ${isDarkMode ? 'bg-gray-900' : 'bg-brand-info'}`}>
           {navItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-xl font-bold uppercase hover:text-purple-200 transition-colors">
              {item.icon} {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default CustomNavbar;