import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';

// 1. Accept isDarkMode Prop
const CaseStudies = ({ isDarkMode }) => {
  const caseStudiesData = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      industry: 'Software Development',
      problem: 'Manual testing processes were consuming 40% of development time, leading to delayed releases and increased costs. The team struggled with inconsistent test coverage and frequent production bugs.',
      solution: 'Implemented our AI-powered automated testing platform that integrated seamlessly with their existing CI/CD pipeline. The solution included intelligent test generation, real-time bug detection, and automated regression testing.',
      results: 'Reduced testing time by 75%, deployed releases 3x faster, and decreased production bugs by 85%. The development team could now focus on building features rather than writing test cases.',
      metrics: [
        { label: 'Time Saved', value: 75, suffix: '%' },
        { label: 'ROI', value: 340, suffix: '%' },
        { label: 'Bug Reduction', value: 85, suffix: '%' }
      ],
      testimonial: 'This solution transformed our development workflow completely. We ship faster and with more confidence than ever before.',
      author: 'Sarah Johnson, CTO'
    },
    {
      id: 2,
      company: 'E-Commerce Giants Ltd.',
      industry: 'Retail & E-commerce',
      problem: 'Customer support team was overwhelmed with 10,000+ daily inquiries, resulting in 24-hour response times and declining customer satisfaction scores. Manual ticket routing and response generation were bottlenecks.',
      solution: 'Deployed our AI-driven customer support automation system with natural language processing, intelligent ticket routing, and automated response suggestions. The system learned from historical data to provide personalized customer interactions.',
      results: 'Response times dropped to under 2 minutes, customer satisfaction improved by 45%, and support costs decreased by 60%. The team handled 5x more tickets with the same headcount.',
      metrics: [
        { label: 'Response Time', value: 92, suffix: '% faster' },
        { label: 'Cost Savings', value: 60, suffix: '%' },
        { label: 'CSAT Improvement', value: 45, suffix: '%' }
      ],
      testimonial: 'Our support team went from firefighting to providing exceptional customer experiences. The ROI was evident within the first month.',
      author: 'Michael Chen, Head of Customer Success'
    },
    {
      id: 3,
      company: 'Financial Services Pro',
      industry: 'Financial Services',
      problem: 'Compliance document review required 200+ hours per month, with high risk of human error in identifying regulatory violations. The manual process delayed business decisions and increased audit preparation costs.',
      solution: 'Integrated our AI compliance automation suite that analyzes documents against regulatory frameworks, flags potential issues, and generates compliance reports. The system provides real-time alerts and maintains comprehensive audit trails.',
      results: 'Document review time reduced by 80%, zero compliance violations in 18 months, and audit preparation became 10x faster. The team saved $500K annually in compliance costs.',
      metrics: [
        { label: 'Time Reduction', value: 80, suffix: '%' },
        { label: 'Annual Savings', value: 500, suffix: 'K' },
        { label: 'Audit Speed', value: 10, suffix: 'x faster' }
      ],
      testimonial: 'We sleep better knowing our AI system is monitoring compliance 24/7. The accuracy and speed are unmatched.',
      author: 'David Martinez, Chief Compliance Officer'
    }
  ];

  return (
    // 2. Apply Dark Mode classes to main wrapper
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'} transition-colors duration-300 relative overflow-hidden`}>
      
      {/* 3. REMOVED <CustomNavbar /> (App.jsx handles it) */}

      {/* Content Wrapper */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 pt-32 flex-grow">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Success Stories
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Real results from companies that transformed their operations with our AI solutions
          </p>
        </div>

        {/* Case Studies List */}
        <div className="max-w-7xl mx-auto space-y-20">
          {caseStudiesData.map((caseStudy, index) => (
            <CaseStudyCard 
              key={caseStudy.id} 
              caseStudy={caseStudy} 
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

// --- Sub-Components ---

const CaseStudyCard = ({ caseStudy, index, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300`}>
        {/* Company Header */}
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'} px-8 py-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{caseStudy.company}</h2>
              <p className="text-blue-100 text-lg">{caseStudy.industry}</p>
            </div>
            <div className="text-6xl font-bold text-white opacity-20">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Problem Section */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 text-red-600 rounded-full p-3 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>The Problem</h3>
            </div>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed pl-16 ${!isExpanded ? 'line-clamp-2' : ''}`}>
              {caseStudy.problem}
            </p>
          </div>

          {isExpanded && (
            <>
              {/* Solution Section */}
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>The Solution</h3>
                </div>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed pl-16`}>
                  {caseStudy.solution}
                </p>
              </div>

              {/* Results Section */}
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 text-green-600 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>The Results</h3>
                </div>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed pl-16 mb-8`}>
                  {caseStudy.results}
                </p>

                {/* Metrics with Animated Counters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-16">
                  {caseStudy.metrics.map((metric, idx) => (
                    <MetricCounter 
                      key={idx}
                      label={metric.label}
                      value={metric.value}
                      suffix={metric.suffix}
                      isVisible={isVisible && isExpanded}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-purple-50'} rounded-2xl p-8 mt-8`}>
                <div className="flex items-start">
                  <svg className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} mr-4 flex-shrink-0`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} italic mb-4`}>
                      "{caseStudy.testimonial}"
                    </p>
                    <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      — {caseStudy.author}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Read More Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
              } shadow-lg hover:shadow-xl flex items-center gap-2`}
            >
              {isExpanded ? (
                <>
                  Show Less
                  <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Read Full Case Study
                  <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCounter = ({ label, value, suffix, isVisible, isDarkMode }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.min(Math.round(increment * currentStep), value));
      } else {
        clearInterval(timer);
        setCount(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} rounded-xl p-6 border-2 text-center transform hover:scale-105 transition-transform duration-300`}>
      <div className={`text-4xl font-bold ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'} bg-clip-text text-transparent mb-2`}>
        {count}{suffix}
      </div>
      <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
        {label}
      </div>
    </div>
  );
};

export default CaseStudies;