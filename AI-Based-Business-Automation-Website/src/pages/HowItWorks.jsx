import React from "react";
import { motion } from "framer-motion";
import { Search, Brain, Settings, BarChart3, ChevronRight, CheckCircle2, Sparkles, Zap } from "lucide-react";
import Footer from "../components/Footer";

const HowItWorks = ({ isDarkMode }) => {
  const steps = [
    {
      id: "01",
      title: "Discovery & Analysis",
      description: "We analyze your existing workflows to identify bottlenecks and automation opportunities.",
      icon: Search,
      color: "blue",
      details: ["Workflow Audit", "Data Mapping", "ROI Projection"]
    },
    {
      id: "02",
      title: "Strategy Design",
      description: "Our AI architects design a custom automation blueprint tailored to your specific needs.",
      icon: Brain,
      color: "purple",
      details: ["Custom Architecture", "Tool Selection", "Security Planning"]
    },
    {
      id: "03",
      title: "Development",
      description: "We build and train your AI models, integrating them seamlessly with your existing stack.",
      icon: Settings,
      color: "pink",
      details: ["AI Model Training", "API Integration", "Rigorous Testing"]
    },
    {
      id: "04",
      title: "Optimization",
      description: "Continuous monitoring and refinement ensure your automation scales with your business.",
      icon: BarChart3,
      color: "orange",
      details: ["Performance Tracking", "Scaling Support", "24/7 Monitoring"]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Hero Section */}
      <div className={`relative pt-32 pb-20 px-6 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-purple-50/50'}`}>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-purple-200/20 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Simplified Process</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Transform</span><br />
              Your Business
            </h1>
            
            <p className={`text-xl max-w-2xl mx-auto mb-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              From analysis to deployment, our four-step process ensures a seamless transition to intelligent automation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}
            >
              {/* Center Dot */}
              <div className={`hidden md:flex absolute top-8 items-center justify-center w-8 h-8 rounded-full border-4 z-10
                ${index % 2 === 0 ? '-right-4 translate-x-1/2' : '-left-4 -translate-x-1/2'}
                ${isDarkMode ? 'bg-gray-900 border-purple-500' : 'bg-white border-purple-500'}
              `}>
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
              </div>

              <div className={`group p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl 
                ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50' : 'bg-white border-gray-100 hover:border-purple-200'}
              `}>
                <div className={`inline-flex p-3 rounded-xl mb-6 ${
                  isDarkMode ? 'bg-gray-700' : `bg-${step.color}-50`
                } ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                  <step.icon className={`w-8 h-8 text-${step.color}-500`} />
                </div>

                <div className="flex items-center gap-4 mb-4 md:justify-end">
                   <span className="text-5xl font-black text-gray-200/20">{step.id}</span>
                   <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                </div>

                <p className={`mb-6 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.description}
                </p>

                <ul className={`space-y-3 ${index % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-500">
                      {index % 2 !== 0 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      {detail}
                      {index % 2 === 0 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-24 px-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className={`max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-xl'}`}>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to automate your workflow?</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Book a free consultation call with our experts and discover how much time and money you can save.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto">
              Start Your Journey <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;