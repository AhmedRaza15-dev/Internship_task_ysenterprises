import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Globe,
  Heart,
  Target,
  MapPin,
  TrendingUp,
  Award,
  Leaf
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MarketSocialImpact = () => {
  const [countUpValues, setCountUpValues] = useState({
    devices: 0,
    countries: 0,
    partnerships: 0,
    carbonReduced: 0
  });

  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const cardsRef = useRef([]);

  // Count-up animation
  useEffect(() => {
    const targetValues = {
      devices: 100000,
      countries: 25,
      partnerships: 50,
      carbonReduced: 500
    };

    const duration = 2000; // 2 seconds
    const frames = 60; // FPS
    const frameDuration = duration / frames;

    Object.keys(targetValues).forEach((key) => {
      let frame = 0;
      const totalFrames = Math.round(duration / frameDuration);
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.floor(targetValues[key] * progress);
        
        setCountUpValues(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    });

    return () => {
      // Cleanup
    };
  }, []);

  // Impact cards slide-in animation
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(card,
        {
          opacity: 0,
          x: -50,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  // Map highlights animation
  useEffect(() => {
    if (!mapRef.current) return;

    const mapPoints = mapRef.current.querySelectorAll('.map-point');
    
    mapPoints.forEach((point, index) => {
      gsap.to(point, {
        scale: 1.2,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3
      });
    });

    // Animate connections
    const connections = mapRef.current.querySelectorAll('.connection');
    connections.forEach((connection, index) => {
      gsap.fromTo(connection,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 2,
          delay: index * 0.5,
          ease: "power2.out"
        }
      );
    });
  }, []);

  const impactCards = [
    {
      title: "Educational Access",
      description: "Providing AR learning tools to underserved communities",
      icon: Users,
      metric: "10,000+",
      metricLabel: "Students Impacted",
      gradient: "from-[#22D3EE] to-[#0EA5E9]"
    },
    {
      title: "Global Reach",
      description: "Making technology accessible across 25+ countries",
      icon: Globe,
      metric: "25+",
      metricLabel: "Countries",
      gradient: "from-[#7C3AED] to-[#8B5CF6]"
    },
    {
      title: "Healthcare Impact",
      description: "Assisting medical professionals with real-time translation",
      icon: Heart,
      metric: "500+",
      metricLabel: "Healthcare Partners",
      gradient: "from-[#C084FC] to-[#D946EF]"
    },
    {
      title: "Environmental Impact",
      description: "Reducing travel through virtual collaboration",
      icon: Leaf,
      metric: "500",
      metricLabel: "Tons CO₂ Reduced",
      gradient: "from-[#10B981] to-[#059669]"
    }
  ];

  const initiatives = [
    {
      title: "Education for All",
      description: "Providing EchoSee devices to schools in remote areas",
      progress: 75
    },
    {
      title: "Healthcare Accessibility",
      description: "Medical translation tools for rural hospitals",
      progress: 60
    },
    {
      title: "Disaster Response",
      description: "Real-time communication during emergencies",
      progress: 90
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white" ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/20 via-[#0F172A] to-[#1E3A8A]/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#22D3EE] via-[#7C84FD] to-[#C084FC] bg-clip-text text-transparent">
              Market & Social Impact
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Creating meaningful change through innovative AR technology, 
              reaching communities worldwide and driving sustainable development.
            </p>
          </motion.div>

          {/* Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Target, value: countUpValues.devices, label: "Devices Deployed", suffix: "+" },
              { icon: Globe, value: countUpValues.countries, label: "Countries", suffix: "+" },
              { icon: Users, value: countUpValues.partnerships, label: "Partnerships", suffix: "+" },
              { icon: Leaf, value: countUpValues.carbonReduced, label: "Tons CO₂ Reduced", suffix: "" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1E3A8A]/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#22D3EE]/10"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-[#22D3EE]" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Impact Cards */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Our Impact Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactCards.map((card, index) => (
                <div
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className="bg-[#1E3A8A] rounded-2xl p-6 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30 transition-colors group"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${card.gradient} mb-6`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                  <p className="text-gray-300 mb-4">{card.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="text-2xl font-bold text-white">{card.metric}</div>
                    <div className="text-sm text-gray-400">{card.metricLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Global Presence
            </h2>
            <div
              ref={mapRef}
              className="relative bg-[#1E3A8A]/30 rounded-3xl p-8 border border-[#22D3EE]/10"
            >
              {/* Simple SVG World Map */}
              <div className="relative h-[400px]">
                <svg
                  viewBox="0 0 800 400"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Map background */}
                  <rect width="800" height="400" fill="#1E3A8A" rx="20" />
                  
                  {/* Simplified continents */}
                  <path
                    d="M200,150 Q250,100 300,150 Q350,200 400,180 Q450,160 500,170 Q550,180 600,160 L620,200 L580,250 L540,230 L500,250 L450,270 L400,250 L350,270 L300,250 L250,230 L220,200 Z"
                    fill="#2D4F9E"
                    stroke="#22D3EE"
                    strokeWidth="2"
                  />
                  
                  {/* Map points */}
                  <g className="map-points">
                    {/* North America */}
                    <circle cx="150" cy="100" r="8" fill="#22D3EE" className="map-point">
                      <title>North America</title>
                      <animate
                        attributeName="r"
                        values="8;12;8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    
                    {/* Europe */}
                    <circle cx="400" cy="120" r="8" fill="#7C84FD" className="map-point">
                      <title>Europe</title>
                      <animate
                        attributeName="r"
                        values="8;12;8"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="0.3s"
                      />
                    </circle>
                    
                    {/* Asia */}
                    <circle cx="550" cy="150" r="8" fill="#C084FC" className="map-point">
                      <title>Asia</title>
                      <animate
                        attributeName="r"
                        values="8;12;8"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="0.6s"
                      />
                    </circle>
                    
                    {/* Africa */}
                    <circle cx="450" cy="250" r="8" fill="#7C3AED" className="map-point">
                      <title>Africa</title>
                      <animate
                        attributeName="r"
                        values="8;12;8"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="0.9s"
                      />
                    </circle>
                    
                    {/* South America */}
                    <circle cx="250" cy="300" r="8" fill="#22D3EE" className="map-point">
                      <title>South America</title>
                      <animate
                        attributeName="r"
                        values="8;12;8"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="1.2s"
                      />
                    </circle>
                  </g>
                  
                  {/* Connections */}
                  <g className="connections">
                    <line
                      x1="150" y1="100" x2="400" y2="120"
                      stroke="#22D3EE"
                      strokeWidth="2"
                      strokeDasharray="10,5"
                      className="connection"
                    />
                    <line
                      x1="400" y1="120" x2="550" y2="150"
                      stroke="#7C84FD"
                      strokeWidth="2"
                      strokeDasharray="10,5"
                      className="connection"
                    />
                    <line
                      x1="550" y1="150" x2="450" y2="250"
                      stroke="#C084FC"
                      strokeWidth="2"
                      strokeDasharray="10,5"
                      className="connection"
                    />
                    <line
                      x1="450" y1="250" x2="250" y2="300"
                      stroke="#7C3AED"
                      strokeWidth="2"
                      strokeDasharray="10,5"
                      className="connection"
                    />
                  </g>
                </svg>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-[#0F172A]/80 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    {[
                      { color: "#22D3EE", label: "Active Deployments" },
                      { color: "#7C84FD", label: "Major Hubs" },
                      { color: "#C084FC", label: "Growth Areas" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Initiatives Progress */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Current Initiatives
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-[#1E3A8A] rounded-2xl p-6 border border-[#22D3EE]/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{initiative.title}</h3>
                    <span className="text-[#22D3EE] font-bold">{initiative.progress}%</span>
                  </div>
                  <p className="text-gray-300 mb-4">{initiative.description}</p>
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#22D3EE] to-[#7C84FD]"
                      initial={{ width: 0 }}
                      animate={{ width: `${initiative.progress}%` }}
                      transition={{ duration: 1.5, delay: index * 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#1E3A8A]/50">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">
            Join Our Mission
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Be part of the movement that's changing lives through technology.
          </p>
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white font-semibold hover:opacity-90 transition-opacity">
            Partner With Us
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MarketSocialImpact;