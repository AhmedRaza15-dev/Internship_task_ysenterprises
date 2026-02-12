import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Robot3D from './Robot3D';
import InteractiveParticles from './Interactiveparticles';
import FloatingShapes from './Floatingshapes';
import Chatbot from './chatbot';

gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.3
      });

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
      });

      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.3,
        ease: 'power3.out'
      });

      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 200,
        opacity: 0.8
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
          },
          y: -150,
          scale: 1.1
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
    >
      <InteractiveParticles />
      <FloatingShapes />
      <Robot3D />
      <Chatbot />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 
              ref={titleRef}
              className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-8"
            >
              <span className="block">CREATE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300">
                INSPIRE
              </span>
              <span className="block">INNOVATE</span>
            </h1>

            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-xl leading-relaxed"
            >
              We craft digital experiences that push boundaries and redefine what's possible. 
              Where creativity meets technology.
            </p>

            <div ref={ctaRef} className="flex gap-6">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-amber-500 text-black font-semibold overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10">View Our Work</span>
                <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-zinc-700 font-semibold hover:border-amber-500 hover:text-amber-500 transition-all"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Interactive Chatbot Showcase */}
          <div className="relative">
            <div 
              ref={imageRef}
              className="relative w-full h-[600px] rounded-lg overflow-hidden group"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <div className="absolute inset-1 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden">
                <div className="relative h-full p-8">
                  
                  {/* Chatbot Demo Interface */}
                  <div className="h-full flex flex-col bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-amber-500 animate-pulse"></div>
                        </div>
                        <div>
                          <h3 className="font-bold text-black text-sm">AI Assistant</h3>
                          <p className="text-xs text-black/70">Always here to help</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-hidden p-4 space-y-3">
                      {/* Bot message */}
                      <div className="flex justify-start animate-slideInLeft">
                        <div className="max-w-[80%] bg-zinc-800 rounded-2xl rounded-bl-none px-4 py-3">
                          <p className="text-sm text-white">Hi! 👋 How can I help you today?</p>
                          <p className="text-xs text-zinc-500 mt-1">Just now</p>
                        </div>
                      </div>

                      {/* Quick action buttons */}
                      <div className="grid grid-cols-2 gap-2 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                        <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-lg transition-colors text-left border border-zinc-700">
                          📁 View Projects
                        </button>
                        <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-lg transition-colors text-left border border-zinc-700">
                          💼 Services
                        </button>
                        <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-lg transition-colors text-left border border-zinc-700">
                          📞 Contact
                        </button>
                        <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-lg transition-colors text-left border border-zinc-700">
                          💡 Get Quote
                        </button>
                      </div>

                      {/* User message (animated) */}
                      <div className="flex justify-end animate-slideInRight" style={{animationDelay: '0.6s'}}>
                        <div className="max-w-[80%] bg-amber-500 rounded-2xl rounded-br-none px-4 py-3">
                          <p className="text-sm text-black">Tell me about your projects</p>
                          <p className="text-xs text-black/60 mt-1">Now</p>
                        </div>
                      </div>

                      {/* Typing indicator */}
                      <div className="flex justify-start animate-fadeIn" style={{animationDelay: '0.9s'}}>
                        <div className="bg-zinc-800 rounded-2xl rounded-bl-none px-4 py-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                      <div className="flex gap-2">
                        <div className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-500 text-sm">
                          Type your message...
                        </div>
                        <button className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Floating feature badges */}
                 
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-amber-500 group-hover:rotate-180 transition-transform duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-blue-500 group-hover:rotate-180 transition-transform duration-700"></div>
            </div>

            {/* Stats Badge */}
            <div className="absolute -bottom-8 -left-8 bg-black border border-zinc-800 p-6 rounded-lg backdrop-blur-sm hover:border-amber-500 transition-colors duration-300 group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
              </div>
            </div>

            {/* Try it badge */}
            <div className="absolute top-4 left-4 bg-zinc-900/90 backdrop-blur-sm border border-amber-500/50 px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <p className="text-white text-sm font-semibold">Try our chatbot →</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-amber-500 rounded-full animate-bounce"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;