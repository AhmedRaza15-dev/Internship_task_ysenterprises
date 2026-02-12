import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomNavbar from './components/CustomNavbar';

// Import Pages
import Home from './pages/home';
import Solutions from './pages/Solutions';     
import ContactUs from './pages/ContactUs';     
import Pricing from './pages/Pricing';         
import CaseStudies from './pages/CaseStudies';
// NEW IMPORTS (Check your filenames!)
import Industries from './pages/Industries'; 
import HowItWorks from './pages/HowItWorks'; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <CustomNavbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
      />

      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
        <Route path="/solutions" element={<Solutions isDarkMode={isDarkMode} />} />
        <Route path="/contact" element={<ContactUs isDarkMode={isDarkMode} />} />
        <Route path="/pricing" element={<Pricing isDarkMode={isDarkMode} />} />
        <Route path="/case-studies" element={<CaseStudies isDarkMode={isDarkMode} />} />
        
        {/* NEW ROUTES */}
        <Route path="/industries" element={<Industries isDarkMode={isDarkMode} />} />
        <Route path="/how-it-works" element={<HowItWorks isDarkMode={isDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;