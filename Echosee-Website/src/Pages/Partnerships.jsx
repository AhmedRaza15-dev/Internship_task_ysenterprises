import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  Users, 
  Heart, 
  Building, 
  Award, 
  Globe, 
  BookOpen, 
  Shield, 
  TrendingUp,
  ChevronRight,
  ExternalLink,
  Handshake
} from 'lucide-react';

const Partnerships = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const logosContainerRef = useRef(null);
  const logosTrackRef = useRef(null);
  const sectionRef = useRef(null);

  // Infinite auto-scrolling logo carousel
  useEffect(() => {
    const container = logosContainerRef.current;
    const track = logosTrackRef.current;
    
    if (!container || !track) return;

    // Create animation timeline
    const createInfiniteScroll = () => {
      // Get the total width of the track
      const trackWidth = track.scrollWidth;
      const containerWidth = container.clientWidth;
      
      // Reset position
      gsap.set(track, { x: 0 });
      
      // Clear any existing animations
      gsap.killTweensOf(track);
      
      // Create the infinite scroll animation
      const duration = 20; // Adjust speed here (lower = faster)
      
      // Main animation - move from right to left (cards appear from left, move right to left)
      const tween = gsap.to(track, {
        x: -trackWidth / 2,
        duration: duration,
        ease: "linear",
        repeat: -1,
        onRepeat: () => {
          gsap.set(track, { x: 0 });
        }
      });
      
      return tween;
    };

    // Initialize animation
    const animation = createInfiniteScroll();
    
    // Handle hover pause/resume
    const handleMouseEnter = () => {
      animation.pause();
    };
    
    const handleMouseLeave = () => {
      animation.resume();
    };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Handle window resize
    const handleResize = () => {
      animation.kill();
      createInfiniteScroll();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      animation.kill();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Card flip animation
  const handleCardFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Scroll animations for sections
  useEffect(() => {
    const sections = sectionRef.current?.querySelectorAll('.animate-section');
    
    sections?.forEach((section, index) => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Scroll animations for individual company cards in trusted section
    const companyCards = sectionRef.current?.querySelectorAll('[data-company-card]');
    
    companyCards?.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Partnership categories
  const partnershipCategories = [
    {
      title: "Schools & Universities",
      icon: BookOpen,
      description: "Transform education with immersive AR learning experiences",
      frontContent: [
        "AR-enhanced curriculum",
        "Language learning tools",
        "Accessibility solutions for visually impaired students",
        "Virtual campus tours"
      ],
      backContent: [
        "Bulk purchase discounts",
        "Customized educational features",
        "Teacher training programs",
        "24/7 technical support"
      ],
      cta: "Explore Education Partnership",
      gradient: "from-[#22D3EE] to-[#0EA5E9]"
    },
    {
      title: "NGOs & Healthcare",
      icon: Heart,
      description: "Empowering communities through accessible technology",
      frontContent: [
        "Medical translation services",
        "Accessibility for disabled individuals",
        "Disaster response communication",
        "Community outreach programs"
      ],
      backContent: [
        "Special NGO pricing",
        "Custom feature development",
        "Training workshops",
        "Long-term maintenance support"
      ],
      cta: "Partner for Social Impact",
      gradient: "from-[#7C3AED] to-[#8B5CF6]"
    },
    {
      title: "Corporate CSR Programs",
      icon: Building,
      description: "Align technology with corporate social responsibility",
      frontContent: [
        "Employee volunteer initiatives",
        "Community development projects",
        "Digital literacy programs",
        "Environmental sustainability tracking"
      ],
      backContent: [
        "Brand partnership opportunities",
        "CSR impact reporting",
        "Employee engagement programs",
        "Corporate sponsorship packages"
      ],
      cta: "Start CSR Partnership",
      gradient: "from-[#C084FC] to-[#D946EF]"
    }
  ];

  // Partner logos - doubled for seamless infinite loop
  const partnerLogos = [
    { name: "UNICEF", logo: "🏛️", color: "from-blue-400 to-cyan-400" },
    { name: "Red Cross", logo: "⛑️", color: "from-red-400 to-red-500" },
    { name: "Microsoft", logo: "🔷", color: "from-blue-500 to-blue-600" },
    { name: "Google", logo: "🔴", color: "from-red-400 to-yellow-400" },
    { name: "Harvard University", logo: "🎓", color: "from-red-600 to-red-700" },
    { name: "MIT", logo: "⚡", color: "from-red-500 to-gray-600" },
    { name: "Doctors Without Borders", logo: "🏥", color: "from-green-500 to-blue-500" },
    { name: "UNESCO", logo: "🌐", color: "from-blue-500 to-green-500" },
    { name: "Apple", logo: "🍎", color: "from-gray-400 to-gray-600" },
    { name: "Tesla", logo: "⚡", color: "from-red-500 to-gray-800" },
    { name: "Stanford", logo: "🌲", color: "from-red-600 to-white" },
    { name: "World Bank", logo: "💼", color: "from-blue-600 to-blue-700" },
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  // Statistics
  const statistics = [
    { number: "50+", label: "Partner Organizations", icon: Users },
    { number: "100K+", label: "Devices Deployed", icon: Globe },
    { number: "25+", label: "Countries", icon: Shield },
    { number: "98%", label: "Satisfaction Rate", icon: Award }
  ];

  // Benefits
  const benefits = [
    {
      title: "Custom Solutions",
      description: "Tailored features for your specific needs",
      icon: TrendingUp
    },
    {
      title: "Training & Support",
      description: "Comprehensive training programs for your team",
      icon: Users
    },
    {
      title: "Scalable Pricing",
      description: "Flexible pricing models for organizations of all sizes",
      icon: Award
    },
    {
      title: "Priority Updates",
      description: "Early access to new features and updates",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white" ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/20 to-[#0F172A]"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-[#22D3EE]/20 to-[#7C84FD]/20 rounded-2xl mb-6">
              <Handshake className="w-8 h-8 text-[#22D3EE]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#22D3EE] via-[#7C84FD] to-[#C084FC] bg-clip-text text-transparent">
              Partnership Programs
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join forces with EchoSee to create meaningful impact through cutting-edge 
              AR technology. Together, we can transform education, healthcare, and 
              corporate social responsibility.
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
          >
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="bg-[#1E3A8A]/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#22D3EE]/10"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-[#22D3EE]" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Logo Carousel */}
          <div className="animate-section">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Trusted By</h2>
              <p className="text-gray-400">Leading organizations worldwide</p>
            </div>
            
            <div 
              ref={logosContainerRef}
              className="relative overflow-hidden py-8"
            >
              {/* Left gradient overlay */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none"></div>
              
              {/* Right gradient overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none"></div>
              
              {/* Logo track */}
              <div 
                ref={logosTrackRef}
                className="flex space-x-8"
                style={{ width: 'max-content' }}
              >
                {duplicatedLogos.map((logo, index) => (
                  <motion.div
                    key={`${logo.name}-${index}`}
                    data-company-card
                    className="flex flex-col items-center justify-center min-w-[180px] h-32 bg-[#1E3A8A]/30 backdrop-blur-sm rounded-2xl p-6 border border-[#22D3EE]/10"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "#22D3EE",
                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`text-4xl mb-3 bg-gradient-to-br ${logo.color} bg-clip-text text-transparent`}>
                      {logo.logo}
                    </div>
                    <div className="text-sm font-medium text-gray-300">{logo.name}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll indicator */}
              {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20">
                <div className="w-2 h-2 bg-[#22D3EE] rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Scrolling automatically</span>
              </div> */}
            </div>
            
            {/* Instructions */}
            {/* <div className="text-center mt-6">
              <p className="text-gray-500 text-sm">
                Hover over the logos to pause • Infinite scroll from left to right
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Partnership Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F172A] to-[#1E3A8A]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Partnership Categories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the partnership program that aligns with your organization's goals
            </p>
          </motion.div>

          {/* Flip Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-section">
            {partnershipCategories.map((category, index) => (
              <div
                key={index}
                className="h-[500px] perspective-1000"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => handleCardFlip(index)}
              >
                <motion.div
                  className="relative w-full h-full preserve-3d cursor-pointer"
                  animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                >
                  {/* Front of Card */}
                  <div className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden bg-[#1E3A8A] border-2 border-transparent"
                    style={{
                      background: `linear-gradient(135deg, #1E3A8A 0%, ${flippedCards[index] ? '#1E293B' : '#1E3A8A'} 100%)`,
                      borderImage: `linear-gradient(135deg, ${category.gradient}) 1`
                    }}
                  >
                    <div className="p-8 h-full flex flex-col">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${category.gradient} mb-6`}>
                        <category.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-white">{category.title}</h3>
                      <p className="text-gray-300 mb-6 flex-grow">{category.description}</p>
                      
                      <div className="space-y-3 mb-8">
                        {category.frontContent.map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-[#22D3EE] mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-200">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto">
                        <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white font-semibold hover:opacity-90 transition-opacity">
                          Learn More
                        </button>
                        <p className="text-center text-gray-400 text-sm mt-3">
                          Click to flip for details
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden bg-[#1E3A8A] border-2 border-transparent rotate-y-180"
                    style={{
                      background: `linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)`,
                      borderImage: `linear-gradient(135deg, ${category.gradient}) 1`
                    }}
                  >
                    <div className="p-8 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r ${category.gradient}`}>
                          <category.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-8 flex-grow">
                        {category.backContent.map((item, idx) => (
                          <div key={idx} className="bg-[#0F172A]/50 p-4 rounded-xl">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} mr-3`}></div>
                              <span className="text-gray-200">{item}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto">
                        <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#C084FC] text-white font-semibold hover:opacity-90 transition-opacity mb-3 flex items-center justify-center">
                          {category.cta}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </button>
                        <p className="text-center text-gray-400 text-sm">
                          Click again to flip back
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 animate-section"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Partnership Benefits</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience exclusive advantages when you partner with EchoSee
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-section">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1E3A8A]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30 transition-colors group"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#22D3EE]/20 to-[#7C84FD]/20 mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-[#22D3EE]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center animate-section"
          >
            <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-3xl p-12 border border-[#C084FC]/20">
              <h3 className="text-3xl font-bold mb-6 text-white">
                Ready to Partner With Us?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our network of partners making a difference with cutting-edge AR technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
                  Become a Partner
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button className="px-8 py-4 rounded-xl bg-[#7C3AED] text-white font-semibold hover:bg-[#6D28D9] transition-colors">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-[#1E3A8A]/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            EchoSee Partnerships • Transforming lives through technology
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Contact us at partnerships@echosee.com • +92 300 1234567
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Partnerships;