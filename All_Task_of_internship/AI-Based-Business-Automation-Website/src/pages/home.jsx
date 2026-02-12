import React, { useState } from 'react';
import { 
  FaArrowRight, FaCalendarCheck, 
  FaRobot, FaCogs, FaBullhorn, FaCheck, FaPlus, FaMinus 
} from 'react-icons/fa';

import Footer from '../components/Footer';

// 1. ACCEPT THE PROP HERE ({ isDarkMode })
function Home({ isDarkMode }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    // 2. USE THE PROP TO CHANGE BACKGROUND & TEXT COLORS
    <div className={`font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      
      {/* 3. REMOVED <CustomNavbar /> (Because App.jsx handles it now) */}

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative w-full min-h-[70vh] flex items-center justify-center text-center text-white px-6 pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          {/* Darken the overlay more in dark mode */}
          <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-black/90' : 'bg-gradient-to-b from-purple-900/80 to-black/90'}`}></div>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnd7cXDb9DcDB7y0z1wd-Lh962YkXrMpFV9w&s" 
            alt="AI Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Automate Your <br />
            Business with <span className="text-brand-info">AI</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
            Streamline workflows, reduce operational costs, and scale faster with 
            CodeCelix's enterprise-grade AI solutions.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center">
            <a 
              href="#solutions" 
              className="bg-brand-info text-white px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white hover:text-brand-info transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-500/30"
            >
              Get Started <FaArrowRight size={14} />
            </a>
            
            <button className="border-2 border-white/30 px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 backdrop-blur-sm">
              Book a Demo <FaCalendarCheck size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION --- */}
      <section id="solutions" className={`py-24 px-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Our Solutions</h2>
            <p className="text-gray-500 text-lg">Comprehensive AI tools designed to modernize every aspect of your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaRobot size={28} />, title: 'AI Chatbots', text: 'Deploy intelligent 24/7 customer support agents that handle inquiries instantly.' },
              { icon: <FaCogs size={28} />, title: 'Workflow Automation', text: 'Automate repetitive tasks like data entry, invoicing, and scheduling.' },
              { icon: <FaBullhorn size={28} />, title: 'Marketing Automation', text: 'Optimize your campaigns with AI-driven insights and personalized content.' }
            ].map((card, idx) => (
              <div key={idx} className={`p-8 rounded-2xl shadow-lg border-b-4 border-transparent hover:border-brand-info hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                  <span className="text-brand-info">{card.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-3">{card.title}</h4>
                <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {card.text}
                </p>
                <ul className="space-y-2">
                  <li className={`flex items-center text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><FaCheck className="text-brand-info mr-2" /> Key Benefit 1</li>
                  <li className={`flex items-center text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><FaCheck className="text-brand-info mr-2" /> Key Benefit 2</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className={`py-24 px-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-3xl font-extrabold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {['How quickly can we implement the automation?', 'Is my data secure with CodeCelix?', 'Can I upgrade my plan later?'].map((q, idx) => (
              <div key={idx} className={`border rounded-xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button 
                  onClick={() => toggleFaq(idx)}
                  className={`w-full flex justify-between items-center p-6 text-left font-bold hover:bg-opacity-50 transition-colors ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-50'}`}
                >
                  {q}
                  {activeFaq === idx ? <FaMinus className="text-brand-info" /> : <FaPlus className="text-gray-400" />}
                </button>
                {activeFaq === idx && (
                  <div className={`p-6 pt-0 text-sm leading-relaxed border-t ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                    Most standard implementations take 1-2 weeks. Complex enterprise solutions may take 4-6 weeks depending on the custom integration requirements.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;