import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown, Check, Shield, RefreshCw, Package, Wifi, Cpu, Cloud, Globe } from 'lucide-react';

const PricingAndPlans = () => {
  const [isPremium, setIsPremium] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const cardsRef = useRef([]);
  const accordionRef = useRef(null);

  // Animation for pricing cards on hover
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
          boxShadow: '0 20px 40px rgba(124, 132, 253, 0.2)',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  // Accordion animation with GSAP
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
    
    if (accordionRef.current) {
      const content = accordionRef.current.children[index]?.querySelector('.accordion-content');
      if (content) {
        if (activeAccordion === index) {
          gsap.to(content, {
            height: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        } else {
          gsap.fromTo(content,
            { height: 0 },
            { height: 'auto', duration: 0.3, ease: 'power2.inOut' }
          );
        }
      }
    }
  };

  const pricingPlans = [
    {
      name: 'Basic',
      price: 'PKR 35,000',
      description: 'Perfect for getting started',
      features: [
        '10+ language translation',
        'Basic AI features',
        'Local storage only',
        'Standard warranty',
      ],
      recommended: false,
    },
    {
      name: 'Premium',
      price: 'PKR 40,000',
      description: 'Best value with all features',
      features: [
        '20+ language translation',
        'Advanced AI updates',
        'Future cloud sync',
        'Extended warranty',
        'Priority support',
      ],
      recommended: true,
    },
  ];

  const afterSalesServices = [
    {
      title: 'Warranty',
      icon: Shield,
      description: 'Comprehensive 2-year warranty covering manufacturing defects and hardware issues.',
      details: ['2-year comprehensive coverage', 'Free repairs', 'Quick replacement service', '24/7 support hotline'],
    },
    {
      title: 'Software Updates',
      icon: RefreshCw,
      description: 'Regular software updates with new features and security patches.',
      details: ['Monthly feature updates', 'Security patches', 'Performance improvements', 'New language additions'],
    },
    {
      title: 'Accessories',
      icon: Package,
      description: 'Wide range of compatible accessories to enhance your experience.',
      details: ['Protective cases', 'Extra charging docks', 'Custom lenses', 'Carrying cases'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            EchoSee Smart Glasses
          </h1>
          <p className="text-xl text-[#22D3EE]">
            Experience the future of augmented reality and seamless translation
          </p>
        </motion.div>

        {/* Pricing Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            
            {/* Toggle Switch */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-lg font-medium ${!isPremium ? 'text-[#22D3EE]' : 'text-gray-400'}`}>
                Basic
              </span>
              <button
                onClick={() => setIsPremium(!isPremium)}
                className="relative w-16 h-8 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: isPremium ? '2rem' : '0.25rem' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </button>
              <span className={`text-lg font-medium ${isPremium ? 'text-[#22D3EE]' : 'text-gray-400'}`}>
                Premium
              </span>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                ref={el => cardsRef.current[index] = el}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.recommended
                    ? 'border-2 border-[#C084FC] bg-[#1E3A8A]'
                    : 'border border-gray-700 bg-[#1E3A8A]'
                }`}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6">{plan.description}</p>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center text-left"
                      >
                        <Check className="w-5 h-5 text-[#22D3EE] mr-3 flex-shrink-0" />
                        <span className="text-gray-200">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                      plan.recommended
                        ? 'bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white hover:opacity-90'
                        : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
                    }`}
                  >
                    {plan.recommended ? 'Get Premium' : 'Get Basic'}
                  </motion.button>
                </div>
              </div>
            ))}
          </div>

          {/* Smart Glasses Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-[#1E3A8A] to-[#0F4C81] rounded-2xl p-8 border border-[#C084FC]/20">
              <h3 className="text-2xl font-bold text-white mb-2">
                EchoSee Smart Glasses
              </h3>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-3xl font-bold text-white">
                  PKR 35,000–40,000
                </span>
                <span className="text-gray-300">per unit</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* After-Sales Services Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              After-Sales Services
            </h2>
            <p className="text-xl text-[#22D3EE]">
              Comprehensive support to ensure the best experience
            </p>
          </motion.div>

          <div ref={accordionRef} className="max-w-3xl mx-auto space-y-4">
            {afterSalesServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="border border-gray-700 rounded-xl overflow-hidden bg-[#1E3A8A]"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#1E3A8A]/80 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{
                        color: activeAccordion === index ? '#22D3EE' : '#9CA3AF',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mt-1">{service.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </button>

                <div className="accordion-content overflow-hidden">
                  <AnimatePresence>
                    {activeAccordion === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <ul className="space-y-3">
                          {service.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center text-gray-300"
                            >
                              <div className="w-2 h-2 bg-[#22D3EE] rounded-full mr-3" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Globe, label: '20+ Languages' },
              { icon: Cloud, label: 'Cloud Sync' },
              { icon: Cpu, label: 'AI Updates' },
              { icon: Wifi, label: 'Wireless' },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4"
              >
                <div className="inline-block p-4 bg-gradient-to-br from-[#22D3EE]/20 to-[#7C84FD]/20 rounded-2xl mb-3">
                  <feature.icon className="w-8 h-8 text-[#22D3EE]" />
                </div>
                <p className="font-medium text-white">{feature.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default PricingAndPlans;