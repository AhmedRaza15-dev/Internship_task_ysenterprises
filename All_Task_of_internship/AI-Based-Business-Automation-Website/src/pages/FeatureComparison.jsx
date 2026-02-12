import React from 'react';

const FeatureComparison = ({ isOpen, onClose, isDarkMode }) => {
  const features = [
    { name: 'Team Members', basic: '5', professional: '20', enterprise: 'Unlimited' },
    { name: 'Storage', basic: '10 GB', professional: '100 GB', enterprise: 'Unlimited' },
    { name: 'Analytics', basic: 'Basic', professional: 'Advanced', enterprise: 'Enterprise' },
    { name: 'Support', basic: 'Email', professional: 'Priority', enterprise: '24/7 Dedicated' },
    { name: 'Mobile App', basic: true, professional: true, enterprise: true },
    { name: 'Desktop App', basic: false, professional: true, enterprise: true },
    { name: 'Reports', basic: 'Weekly', professional: 'Daily', enterprise: 'Real-time' },
    { name: 'API Access', basic: false, professional: true, enterprise: true },
    { name: 'Custom Integrations', basic: false, professional: true, enterprise: true },
    { name: 'White-label', basic: false, professional: false, enterprise: true },
    { name: 'SLA Guarantee', basic: false, professional: false, enterprise: true },
  ];

  const renderValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#f3e8ff"/>
          <path d="M8 12L11 15L16 9" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#fee2e2"/>
          <path d="M8 8L16 16M16 8L8 16" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    return <span className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{value}</span>;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[2000] animate-[fadeIn_0.3s_ease]" onClick={onClose}></div>
      <div className={`fixed top-0 right-0 w-[90%] max-w-[1000px] h-screen overflow-y-auto p-10 shadow-[-10px_0_40px_rgba(0,0,0,0.2)] z-[2001] animate-[slideIn_0.4s_ease] ${
        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'
      }`}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>
        
        <div className="flex justify-between items-start mb-3">
          <h2 className={`text-3xl font-extrabold m-0 -tracking-tight ${isDarkMode ? 'text-gray-50' : 'text-gray-800'}`}>
            Feature Comparison
          </h2>
          <button 
            className={`bg-transparent border-0 cursor-pointer p-1 transition-all duration-200 rounded-md flex-shrink-0 ${
              isDarkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-100' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <p className={`text-base mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Compare all features across different plans
        </p>

        <div className={`overflow-x-auto rounded-2xl border-2 ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <table className="w-full border-collapse text-base">
            <thead className={isDarkMode ? 'bg-gradient-to-r from-gray-700 to-gray-800' : 'bg-gradient-to-r from-purple-100 to-purple-200'}>
              <tr>
                <th className={`p-5 text-left font-bold text-base tracking-wide ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Features
                </th>
                <th className={`p-5 text-left font-bold text-base tracking-wide ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Basic
                </th>
                <th className={`p-5 text-left font-bold text-base tracking-wide ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Professional
                </th>
                <th className={`p-5 text-left font-bold text-base tracking-wide ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr 
                  key={index} 
                  className={`border-b transition-colors duration-200 last:border-b-0 ${
                    isDarkMode 
                      ? 'border-gray-700 hover:bg-gray-700' 
                      : 'border-gray-200 hover:bg-purple-50'
                  }`}
                >
                  <td className={`p-4 pl-5 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    {feature.name}
                  </td>
                  <td className={`p-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {renderValue(feature.basic)}
                  </td>
                  <td className={`p-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {renderValue(feature.professional)}
                  </td>
                  <td className={`p-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {renderValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FeatureComparison;
