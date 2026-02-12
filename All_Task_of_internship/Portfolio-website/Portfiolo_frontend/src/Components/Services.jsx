import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  
  const services = [
    {
      number: '01',
      title: 'Brand Identity',
      description: 'Crafting memorable brand experiences that resonate with your audience and stand out in the market.',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      color: 'amber'
    },
    {
      number: '02',
      title: 'Digital Design',
      description: 'Creating stunning digital interfaces that combine aesthetics with functionality and user experience.',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'blue'
    },
    {
      number: '03',
      title: 'Web Development',
      description: 'Building robust, scalable web applications with cutting-edge technologies and best practices.',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: 'green'
    },
    {
      number: '04',
      title: 'Creative Strategy',
      description: 'Developing data-driven strategies that align your business goals with creative execution.',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'purple'
    },
    {
      number: '05',
      title: 'Digital Marketing',
      description: 'Amplifying your brand presence through strategic campaigns across multiple digital channels.',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      color: 'pink'
    },
    {
      number: '06',
      title: 'Interactive Experiences',
      description: 'Designing immersive digital experiences that engage users and create lasting impressions.',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'cyan'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        // Card entrance animation
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1
          },
          y: 80,
          opacity: 0,
          scale: 0.95
        });

        // Parallax effect
        gsap.to(card.querySelector('.service-icon'), {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          },
          y: -30
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative py-32 bg-zinc-950 overflow-hidden"
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-20">
          <p className="text-amber-500 text-sm uppercase tracking-wider mb-4">What We Do</p>
          <h2 className="text-6xl md:text-8xl font-bold mb-8">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300">SERVICES</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
            We offer a comprehensive suite of creative services designed to elevate 
            your brand and drive meaningful results.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-zinc-900 border border-zinc-800 rounded-lg p-8 hover:border-amber-500 transition-all duration-500 hover:transform hover:-translate-y-2">
                {/* Number */}
                <span className="text-8xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors">
                  {service.number}
                </span>

                {/* Icon */}
                <div className={`service-icon my-6 text-${service.color}-500`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold uppercase tracking-wider">Learn More</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none`}></div>
              </div>

              {/* Decorative corner */}
              <div className={`absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-${service.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-xl text-zinc-400 mb-8">
            Ready to bring your vision to life?
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-5 bg-amber-500 text-black font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;