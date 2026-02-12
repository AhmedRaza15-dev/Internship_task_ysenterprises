import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Ensure this image exists in your public folder or src/assets
// If you don't have it, you can remove this import and the loading image below
import AIimage from '/AI-bot.png'; 
import Footer from '../components/Footer';

// 1. Accept isDarkMode Prop
const Industries = ({ isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const industries = [
    {
      name: "E-commerce",
      icon: "🛒",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&auto=format",
      description: "Streamline online retail operations",
      benefits: ["Order automation", "Customer support bots", "Sales analytics"]
    },
    {
      name: "Healthcare",
      icon: "🏥",
      image: "https://plus.unsplash.com/premium_photo-1699387204388-120141c76d51?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Optimize patient care and administration",
      benefits: ["Appointment scheduling", "Patient data analysis", "Prescription automation"]
    },
    {
      name: "Education",
      icon: "🎓",
      image: "https://plus.unsplash.com/premium_photo-1664910131883-132940940995?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Enhance learning and administrative efficiency",
      benefits: ["Automated grading", "Personalized learning paths", "Administrative task automation"]
    },
    {
      name: "Real Estate",
      icon: "🏠",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop&auto=format",
      description: "Transform property management and sales",
      benefits: ["Property listing automation", "Lead management", "Virtual tour scheduling"]
    },
    {
      name: "Small Businesses",
      icon: "💼",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format",
      description: "Boost productivity with limited resources",
      benefits: ["Invoice automation", "Social media management", "Customer relationship management"]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      // 2. Dynamic Background for Loading Screen
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-pink-50'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="text-4xl"
        >
          {/* If AIimage is missing, this might break. Ensure the file exists or replace with text */}
          <img src={AIimage} alt="Loading..." className="w-48 h-48 animate-bounce" onError={(e) => e.target.style.display='none'} />
        </motion.div>
      </div>
    );
  }

  return (
    // 3. Dynamic Main Background (Removed fixed 'oklch' color)
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-pink-50 to-purple-50 text-gray-800'}`}>
      
      <div className="flex-grow py-12 px-4 pt-32"> {/* Added pt-32 for navbar space */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl">🛒</span>
              <span className="text-4xl">🏥</span>
              <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Industry Solutions
              </h1>
              <span className="text-4xl">🎓</span>
              <span className="text-4xl">🏠</span>
              <span className="text-4xl">💼</span>
            </div>
            <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover how AI automation transforms various industries with tailored solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                // 4. Dynamic Card Background
                className={`rounded-2xl shadow-xl overflow-hidden cursor-pointer group ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}
              >
                {/* Image Container */}
                <motion.div
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.5 }}
                  />
                </motion.div>

                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        className={`rounded-full p-3 shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-purple-100 to-pink-100'}`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-2xl">{industry.icon}</span>
                      </motion.div>
                      <motion.h3
                        className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                        whileHover={{ color: "#7c3aed" }}
                        transition={{ duration: 0.3 }}
                      >
                        {industry.name}
                      </motion.h3>
                    </div>
                    <p className={`ml-14 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{industry.description}</p>
                  </div>

                  <div className={`border-t pt-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <motion.h4
                      className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      whileHover={{ x: 5 }}
                    >
                      Key Benefits
                    </motion.h4>
                    <ul className="space-y-3">
                      {industry.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          whileHover={{ 
                            x: 8,
                            backgroundColor: isDarkMode ? "rgba(124, 58, 237, 0.2)" : "rgba(237, 233, 254, 0.5)",
                            paddingLeft: "8px"
                          }}
                          className="flex items-center rounded-lg transition-all duration-300"
                        >
                          <motion.span
                            className="text-purple-500 mr-3 text-lg"
                            whileHover={{ scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            ✓
                          </motion.span>
                          <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Animated Bottom Gradient Bar */}
                <motion.div
                  className="h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.25 }}
                />

                {/* Floating Action Button */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ready to transform your industry?{" "}
              <motion.span
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 5px 15px rgba(124, 58, 237, 0.3)"
                }}
                className={`text-purple-600 font-bold cursor-pointer inline-block px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-50 to-pink-50'}`}
              >
                Contact us for a customized solution
              </motion.span>
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* 5. Add Footer */}
      <Footer />
    </div>
  );
};

export default Industries;