import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        },
        x: -100,
        opacity: 0
      });

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1
          },
          y: 100,
          opacity: 0,
          rotate: index % 2 === 0 ? -5 : 5
        });
      });

      // Parallax text
      gsap.to('.parallax-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        },
        x: -200
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '50+', label: 'Projects Delivered', color: 'amber' },
    { number: '20+', label: 'Happy Clients', color: 'blue' },
    { number: '1+', label: 'Years Experience', color: 'pink' },
    { number: '10+', label: 'Team Members', color: 'green' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative py-32 bg-zinc-950 overflow-hidden"
    >
      {/* Large parallax text background */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 opacity-5 pointer-events-none overflow-hidden">
        <h2 className="parallax-text text-[20rem] font-bold whitespace-nowrap">ABOUT US</h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section title */}
        <div className="mb-20">
          <h2 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            WHO WE <span className="text-amber-500">ARE</span>
          </h2>
          <div className="w-32 h-1 bg-amber-500"></div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left column - Description */}
          <div>
            <p className="text-2xl text-zinc-300 leading-relaxed mb-8">
              We are a creative design studio that transforms bold ideas into 
              exceptional digital experiences.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed mb-8">
              Our team of passionate designers, developers, and strategists work 
              collaboratively to push the boundaries of what's possible. We believe 
              in the power of design to solve complex problems and create meaningful 
              connections between brands and their audiences.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed">
              From concept to execution, we craft solutions that are not only 
              visually stunning but also strategically sound and technically robust.
            </p>
          </div>

          {/* Right column - Image/Visual */}
          <div className="relative">
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-8">
                  <div className="w-24 h-24 bg-amber-500/20 rounded-lg"></div>
                  <div className="w-24 h-24 bg-blue-500/20 rounded-lg"></div>
                  <div className="w-24 h-24 bg-pink-500/20 rounded-lg"></div>
                  <div className="w-24 h-24 bg-green-500/20 rounded-lg"></div>
                  <div className="w-24 h-24 bg-purple-500/20 rounded-lg"></div>
                  <div className="w-24 h-24 bg-red-500/20 rounded-lg"></div>
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-amber-500"></div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group"
            >
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg hover:border-amber-500 transition-all duration-300 hover:transform hover:scale-105">
                <p className={`text-5xl font-bold text-${stat.color}-500 mb-2`}>
                  {stat.number}
                </p>
                <p className="text-zinc-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-${stat.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;