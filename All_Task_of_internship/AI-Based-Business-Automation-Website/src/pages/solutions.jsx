import React, { useState } from 'react';
import { 
  FaRobot, FaCogs, FaHandshake, FaBullhorn, FaChartLine, 
  FaArrowRight, FaCheck, FaTimesCircle, FaTimes 
} from 'react-icons/fa';
import Footer from '../components/Footer';

// --- DATA CONFIGURATION ---
const solutionsData = [
  {
    id: 1,
    title: "AI Customer Support",
    category: "Service",
    icon: <FaRobot size={24} />,
    color: "from-blue-500 to-cyan-400",
    problem: "Support teams overwhelmed with repetitive queries and slow response times.",
    solution: "Deploy intelligent agents that resolve 80% of tickets instantly, 24/7.",
    benefits: ["Zero customer wait time", "Reduce support costs by 60%", "24/7 automated coverage"],
    details: "Our AI agents connect directly to your knowledge base and historical ticket data. They learn your brand voice and can handle complex workflows like refunds, order tracking, and technical troubleshooting without human intervention."
  },
  {
    id: 2,
    title: "Workflow Autopilot",
    category: "Operations",
    icon: <FaCogs size={24} />,
    color: "from-purple-500 to-pink-400",
    problem: "Valuable employee hours wasted on manual data entry and admin tasks.",
    solution: "Connect your apps (Email, Excel, CRM) to trigger actions automatically.",
    benefits: ["Eliminate human error", "Save 20+ hours per week", "Instant data syncing"],
    details: "We build custom 'Zapier-like' automation chains specific to your business logic. For example: When a new invoice arrives in Gmail -> Extract data using AI -> Update Excel Sheet -> Send Slack Notification -> Create Draft Payment."
  },
  {
    id: 3,
    title: "Smart CRM",
    category: "Sales",
    icon: <FaHandshake size={24} />,
    color: "from-orange-500 to-amber-400",
    problem: "Potential leads slip through the cracks due to delayed follow-ups.",
    solution: "Auto-score leads and send personalized follow-up sequences instantly.",
    benefits: ["Increase conversion by 3x", "Keep CRM data 100% clean", "Never miss a deal"],
    details: "The system monitors user behavior on your site. If a high-value prospect visits the pricing page but doesn't buy, our system instantly triggers a personalized email sequence and alerts your sales team on their phone."
  },
  {
    id: 4,
    title: "Growth Engine",
    category: "Marketing",
    icon: <FaBullhorn size={24} />,
    color: "from-emerald-500 to-teal-400",
    problem: "Generic email blasts fail to engage customers or drive clicks.",
    solution: "AI segments your audience to send hyper-personalized content at the right time.",
    benefits: ["Higher click-through rates", "Personalized user journeys", "Auto-scheduled campaigns"],
    details: "Stop sending the same email to everyone. Our AI analyzes past purchase history to predict what a customer will buy next, then sends a targeted offer for that specific product at the time they are most likely to open emails."
  },
  {
    id: 5,
    title: "Predictive Analytics",
    category: "Strategy",
    icon: <FaChartLine size={24} />,
    color: "from-indigo-500 to-violet-400",
    problem: "Business decisions are made on gut feeling rather than data.",
    solution: "Turn raw data into visual forecasts that predict future trends.",
    benefits: ["Real-time health monitoring", "Data-backed strategy", "Spot opportunities early"],
    details: "We create a 'Mission Control' dashboard for your CEO. It pulls live data from finance, sales, and marketing to visualize cash flow predictions, inventory shortages, and revenue forecasts for the next quarter."
  }
];

// --- MODAL COMPONENT (The Pop-up) ---
const SolutionModal = ({ data, onClose, isDarkMode }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
      {/* Modal Content */}
      <div className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative animate-fade-in-up ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          <FaTimes size={16} className={isDarkMode ? 'text-gray-300' : 'text-gray-500'} />
        </button>

        {/* Header with Gradient */}
        <div className={`h-32 bg-gradient-to-r ${data.color} relative`}>
          <div className="absolute -bottom-8 left-8">
            <div className={`w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`text-transparent bg-clip-text bg-gradient-to-r ${data.color}`}>
                {/* Clone icon with larger size */}
                {React.cloneElement(data.icon, { size: 32 })}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-12 pb-8 px-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{data.category}</span>
              <h2 className={`text-3xl font-extrabold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data.title}</h2>
            </div>
          </div>

          <p className={`leading-relaxed text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {data.details}
          </p>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-red-500 uppercase tracking-wider mb-3">
                <FaTimesCircle /> The Problem
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{data.problem}</p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-green-500 uppercase tracking-wider mb-3">
                <FaCheck /> The Solution
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{data.solution}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r ${data.color} hover:opacity-90 transition-opacity shadow-lg`}
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CARD COMPONENT ---
const SolutionCard = ({ data, index, onOpen, isDarkMode }) => {
  const delay = `${index * 100}ms`;

  return (
    <div 
      className={`group relative flex flex-col h-full rounded-2xl border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in-up opacity-0 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200'}`}
      style={{ animationDelay: delay }}
    >
      <div className={`h-1 w-full bg-gradient-to-r ${data.color}`}></div>

      <div className="p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${data.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {data.icon}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
            {data.category}
          </span>
        </div>

        <h3 className={`text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {data.title}
        </h3>

        <div className="space-y-4 my-6 flex-grow">
          <div className="flex gap-3">
            <FaTimesCircle className="text-red-400 mt-1 flex-shrink-0" size={16} />
            <p className={`text-sm leading-relaxed line-through decoration-red-400 decoration-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {data.problem}
            </p>
          </div>
          <div className="flex gap-3">
            <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r ${data.color}`}></div>
            <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {data.solution}
            </p>
          </div>
        </div>

        <div className={`pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-50'}`}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Impact</p>
          <ul className="space-y-2">
            {data.benefits.slice(0, 2).map((benefit, idx) => ( 
              <li key={idx} className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <FaCheck className="text-green-500 mr-2 flex-shrink-0" size={12} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        {/* CLICK ACTION */}
        <button 
          onClick={() => onOpen(data)}
          className={`mt-6 flex items-center text-sm font-bold group-hover:translate-x-2 transition-transform duration-300 cursor-pointer focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          View Details <FaArrowRight className="ml-2 text-brand-info" size={12} />
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
// 1. Accept isDarkMode Prop
const Solutions = ({ isDarkMode }) => {
  const [selectedSolution, setSelectedSolution] = useState(null);

  return (
    // 2. Main Wrapper with dark mode check
    <div className={`min-h-screen font-sans relative transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50/30 text-gray-800'}`}>
      
      {/* 3. Render Modal if selectedSolution exists */}
      {selectedSolution && (
        <SolutionModal 
          data={selectedSolution} 
          onClose={() => setSelectedSolution(null)} 
          isDarkMode={isDarkMode}
        />
      )}

      {/* Hero Section */}
      <div className={`relative pt-40 pb-20 px-6 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent opacity-70"></div>
        <div className="relative max-w-4xl mx-auto text-center z-10 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-brand-info text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-info animate-pulse"></span>
            Enterprise Grade AI
          </div>
          <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Solutions engineered for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-info to-purple-600">rapid growth.</span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Eliminate bottlenecks with our suite of intelligent automation tools. 
            Secure, scalable, and designed for modern businesses.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionsData.map((item, index) => (
            <SolutionCard 
              key={item.id} 
              data={item} 
              index={index} 
              onOpen={setSelectedSolution}
              isDarkMode={isDarkMode} // Pass prop down
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Solutions;