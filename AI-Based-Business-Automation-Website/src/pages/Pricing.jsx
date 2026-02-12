import React, { useState } from 'react';
import FeatureComparison from './FeatureComparison';
import Footer from '../components/Footer';

// 1. Accept isDarkMode Prop
const Pricing = ({ isDarkMode = false }) => {
  const [showComparison, setShowComparison] = useState(false);
  
  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: '29',
      period: 'month',
      description: 'Perfect for small businesses and startups',
      features: [
        'Up to 5 team members',
        'Basic analytics',
        'Email support',
        '10 GB storage',
        'Mobile app access',
        'Weekly reports'
      ],
      highlighted: false,
      buttonText: 'Get Started'
    },
    {
      id: 2,
      name: 'Professional',
      price: '79',
      period: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 20 team members',
        'Advanced analytics',
        'Priority support',
        '100 GB storage',
        'Mobile & desktop apps',
        'Daily reports',
        'Custom integrations',
        'API access'
      ],
      highlighted: true,
      badge: 'Most Popular',
      buttonText: 'Get Started'
    },
    {
      id: 3,
      name: 'Enterprise',
      price: '199',
      period: 'month',
      description: 'For large organizations',
      features: [
        'Unlimited team members',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Unlimited storage',
        'All platform access',
        'Real-time reports',
        'Custom integrations',
        'API access',
        'White-label options',
        'SLA guarantee'
      ],
      highlighted: false,
      buttonText: 'Contact Sales'
    }
  ];

  return (
    // 2. MAIN WRAPPER: Flex Column + Background Styles based on isDarkMode
    <div className={`flex flex-col min-h-screen bg-[length:400%_400%] animate-gradient-shift ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100'}`}>
      
      {/* 3. REMOVED <CustomNavbar /> (App.jsx handles it) */}
      
      {/* 4. CONTENT WRAPPER: pt-32 pushes content down, flex-grow pushes footer down */}
      <div className="flex-grow pt-32 pb-20 px-5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`text-5xl font-extrabold mb-4 -tracking-wide ${isDarkMode ? 'text-gray-50' : 'text-gray-800'}`}>
              Choose Your Plan
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white rounded-3xl p-10 relative shadow-[0_10px_30px_rgba(124,58,237,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] flex flex-col min-h-[600px] ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white scale-105 shadow-[0_20px_50px_rgba(124,58,237,0.3)]' 
                    : isDarkMode ? '!bg-gray-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-[0_4px_12px_rgba(251,191,36,0.4)]">
                    {plan.badge}
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className={`text-3xl font-bold mb-3 -tracking-tight ${plan.highlighted ? 'text-white' : isDarkMode ? '!text-white' : 'text-gray-800'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-base ${plan.highlighted ? 'text-white/85' : isDarkMode ? '!text-gray-200' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className={`mb-9 pb-9 border-b-2 ${plan.highlighted ? 'border-white/20' : isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${plan.highlighted ? 'text-white' : isDarkMode ? '!text-purple-300' : 'text-purple-600'}`}>
                      $
                    </span>
                    <span className={`text-6xl font-extrabold -tracking-[2px] ${plan.highlighted ? 'text-white' : isDarkMode ? '!text-white' : 'text-gray-800'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-base font-medium ${plan.highlighted ? 'text-white/80' : isDarkMode ? '!text-gray-100' : 'text-gray-600'}`}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="mb-9 flex-grow list-none p-0 m-0">
                  {plan.features.map((feature, index) => (
                    <li key={index} className={`flex items-center gap-3 py-3 text-base ${plan.highlighted ? 'text-white/95' : isDarkMode ? '!text-gray-50' : 'text-gray-700'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                        <circle cx="12" cy="12" r="10" fill={plan.highlighted ? 'rgba(255, 255, 255, 0.2)' : isDarkMode ? 'rgba(167, 139, 250, 0.2)' : '#f3e8ff'}/>
                        <path d="M8 12L11 15L16 9" stroke={plan.highlighted ? 'white' : isDarkMode ? '#a78bfa' : '#7c3aed'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-4 px-8 text-base font-semibold rounded-xl cursor-pointer transition-all duration-300 tracking-wider ${
                    plan.highlighted 
                      ? 'bg-white text-purple-600 shadow-[0_4px_15px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.5)] hover:bg-gray-50' 
                      : 'text-white bg-gradient-to-br from-purple-600 to-purple-700 border-0 shadow-[0_4px_15px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)]'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Compare Button */}
          <div className="text-center my-12">
            <button 
              className="py-4 px-10 text-base font-semibold text-white bg-gradient-to-br from-purple-600 to-purple-700 border-0 rounded-xl cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(124,58,237,0.3)] inline-flex items-center hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)]"
              onClick={() => setShowComparison(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-2">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 12H15M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Compare All Features
            </button>
          </div>

          <div className={`text-center mt-16 pt-8 border-t-2 ${isDarkMode ? 'border-gray-700' : 'border-purple-100'}`}>
            <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              All plans include secure hosting, regular updates, and data encryption.
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Need a custom plan? <a href="#contact" className="text-purple-600 hover:text-purple-700 font-semibold no-underline">Contact us</a> for enterprise solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Comparison Modal */}
      <FeatureComparison 
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        isDarkMode={isDarkMode}
      />
      
      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
};

export default Pricing;