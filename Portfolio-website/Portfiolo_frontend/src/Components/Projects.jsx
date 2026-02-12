import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Projects = () => {
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);
  const [activeProject, setActiveProject] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce AI Platform',
      category: 'Full Stack Development',
      description: 'AI-powered e-commerce platform with personalized recommendations and real-time inventory management',
      year: '2024',
      color: 'from-amber-500 to-orange-500',
      caseStudy: {
        challenge: 'Built a scalable e-commerce solution that handles 10K+ daily users with AI-driven product recommendations and seamless checkout experience.',
        solution: 'Implemented microservices architecture with real-time data synchronization and machine learning models for personalized shopping experiences.',
        results: ['300% increase in conversion rate', '60% faster page load times', '95% customer satisfaction score'],
        techStack: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'Redis', 'AWS', 'Docker', 'Stripe API']
      },
      githubLink: '' // Add your GitHub link here
    },
    {
      id: 2,
      title: 'HealthCare Management System',
      category: 'Web Application',
      description: 'Comprehensive healthcare platform connecting patients with doctors through telemedicine',
      year: '2024',
      color: 'from-blue-500 to-cyan-500',
      caseStudy: {
        challenge: 'Developed a HIPAA-compliant platform for virtual consultations with secure patient data management and real-time video conferencing.',
        solution: 'Created a secure, scalable system with end-to-end encryption, appointment scheduling, and integrated electronic health records.',
        results: ['50K+ appointments scheduled', '99.9% uptime maintained', 'HIPAA compliance achieved'],
        techStack: ['React', 'TypeScript', 'Express.js', 'PostgreSQL', 'WebRTC', 'Socket.io', 'JWT', 'AWS S3']
      },
      githubLink: '' // Add your GitHub link here
    },
    {
      id: 3,
      title: 'Social Media Analytics Dashboard',
      category: 'Data Visualization',
      description: 'Real-time analytics platform for tracking social media performance across multiple channels',
      year: '2024',
      color: 'from-pink-500 to-purple-500',
      caseStudy: {
        challenge: 'Built an intuitive dashboard that aggregates data from multiple social platforms and provides actionable insights with beautiful visualizations.',
        solution: 'Integrated with major social media APIs and created custom data processing pipelines with interactive charts and automated reporting.',
        results: ['1M+ data points processed daily', '40% time saved in reporting', 'Used by 500+ marketing teams'],
        techStack: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Chart.js']
      },
      githubLink: '' // Add your GitHub link here
    },
    {
      id: 4,
      title: 'Real Estate Marketplace',
      category: 'Mobile & Web Platform',
      description: 'Modern property listing platform with virtual tours and AI-powered property matching',
      year: '2023',
      color: 'from-green-500 to-emerald-500',
      caseStudy: {
        challenge: 'Created a seamless property search experience with 3D virtual tours, advanced filtering, and intelligent property recommendations.',
        solution: 'Developed responsive platform with WebGL-based 3D tours, geolocation features, and machine learning for property matching.',
        results: ['100K+ property listings', '75% user engagement increase', '4.8/5 app store rating'],
        techStack: ['React Native', 'Next.js', 'Node.js', 'MySQL', 'Three.js', 'Google Maps API', 'Firebase', 'Stripe']
      },
      githubLink: '' // Add your GitHub link here
    },
    {
      id: 5,
      title: 'Learning Management System',
      category: 'Educational Platform',
      description: 'Interactive online learning platform with live classes, assessments, and progress tracking',
      year: '2024',
      color: 'from-indigo-500 to-blue-500',
      caseStudy: {
        challenge: 'Built a comprehensive LMS supporting live video classes, interactive quizzes, assignment submissions, and detailed analytics for educators.',
        solution: 'Implemented real-time collaboration features, adaptive learning paths, and gamification elements to enhance student engagement.',
        results: ['20K+ active students', '500+ courses created', '85% course completion rate'],
        techStack: ['Vue.js', 'Django', 'PostgreSQL', 'WebRTC', 'Redis', 'Celery', 'AWS', 'Zoom API']
      },
      githubLink: '' // Add your GitHub link here
    },
    {
      id: 6,
      title: 'Cryptocurrency Trading Platform',
      category: 'FinTech Application',
      description: 'Secure crypto exchange with real-time trading, wallet management, and market analysis',
      year: '2023',
      color: 'from-red-500 to-pink-500',
      caseStudy: {
        challenge: 'Developed a high-performance trading platform with millisecond-level order execution and enterprise-grade security.',
        solution: 'Built scalable microservices with real-time data streaming, advanced charting, and multi-signature wallet integration.',
        results: ['$50M+ trading volume', '99.99% transaction success', 'SOC 2 compliant'],
        techStack: ['React', 'Go', 'Rust', 'Kafka', 'TimescaleDB', 'WebSocket', 'Kubernetes', 'TradingView']
      },
      githubLink: '' // Add your GitHub link here
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for project cards
      projectsRef.current.forEach((project, index) => {
        if (project) {
          gsap.from(project, {
            scrollTrigger: {
              trigger: project,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1
            },
            y: 100,
            opacity: 0,
            scale: 0.9
          });
        }
      });

      // Parallax effect on scroll
      gsap.to('.project-parallax', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        y: -100
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectHover = (id) => {
    setActiveProject(id);
    const project = projectsRef.current.find(p => p && p.dataset.id === id.toString());
    if (project) {
      gsap.to(project, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleProjectLeave = (id) => {
    setActiveProject(null);
    const project = projectsRef.current.find(p => p && p.dataset.id === id.toString());
    if (project) {
      gsap.to(project, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const toggleProjectDetails = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-20">
          <p className="text-amber-500 text-sm uppercase tracking-wider mb-4">Portfolio</p>
          <h2 className="text-6xl md:text-8xl font-bold mb-6">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300">PROJECTS</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-32 h-1 bg-amber-500"></div>
            <p className="text-zinc-400 text-lg">Showcasing our finest creations</p>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) {
                  projectsRef.current[index] = el;
                  el.dataset.id = project.id;
                }
              }}
              className="group relative"
            >
              {/* Card */}
              <div 
                className="relative h-[520px] bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={() => handleProjectLeave(project.id)}
                onClick={() => toggleProjectDetails(project.id)}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  {/* Top section */}
                  <div>
                    <p className="text-zinc-500 text-sm uppercase tracking-wider mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-3xl font-bold mb-4 project-parallax leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Middle section - Visual element */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative">
                      {/* Animated rings */}
                      <div className="w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700">
                        <div className="w-20 h-20 border-4 border-white/30 rounded-full flex items-center justify-center transform group-hover:-rotate-180 transition-transform duration-700">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500/50 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      {/* Tech stack preview */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                          {project.caseStudy.techStack.slice(0, 4).map((tech, i) => (
                            <div key={i} className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div>
                    <p className="text-zinc-400 mb-4 leading-relaxed text-sm">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-600">{project.year}</span>
                      <button className="text-amber-500 text-sm font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        View Details
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>

              {/* Expanded Case Study Modal */}
              {expandedProject === project.id && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
                  onClick={() => setExpandedProject(null)}
                >
                  <div 
                    className="bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-amber-500 animate-slideUp"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className={`relative p-8 bg-gradient-to-br ${project.color} bg-opacity-20`}>
                      <button
                        onClick={() => setExpandedProject(null)}
                        className="absolute top-6 right-6 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all hover:rotate-90 duration-300"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <p className="text-amber-500 text-sm uppercase tracking-wider mb-2">{project.category}</p>
                      <h3 className="text-5xl font-bold mb-4">{project.title}</h3>
                      <p className="text-xl text-zinc-300">{project.description}</p>
                    </div>

                    {/* Modal Content */}
                    <div className="p-8 space-y-8">
                      {/* Challenge */}
                      <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-amber-500">Challenge</h4>
                        </div>
                        <p className="text-zinc-300 leading-relaxed pl-13">{project.caseStudy.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-blue-500">Solution</h4>
                        </div>
                        <p className="text-zinc-300 leading-relaxed pl-13">{project.caseStudy.solution}</p>
                      </div>

                      {/* Results */}
                      <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-green-500">Results</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-13">
                          {project.caseStudy.results.map((result, i) => (
                            <div key={i} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-green-500 transition-colors">
                              <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="text-zinc-300 text-sm">{result}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-purple-500">Tech Stack</h4>
                        </div>
                        <div className="flex flex-wrap gap-3 pl-13">
                          {project.caseStudy.techStack.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 hover:border-purple-500 hover:text-purple-400 transition-all cursor-default"
                              style={{animationDelay: `${i * 0.05}s`}}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* GitHub Link Section */}
                      <div className="animate-fadeIn pt-6 border-t border-zinc-800" style={{animationDelay: '0.5s'}}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500 uppercase tracking-wider">View Source Code</p>
                              <p className="text-lg font-semibold text-white">GitHub Repository</p>
                            </div>
                          </div>
                          {project.githubLink ? (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-all hover:scale-105 flex items-center gap-2"
                            >
                              View Code
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : (
                            <div className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-zinc-500 font-semibold rounded-lg cursor-not-allowed flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Private Repository
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Decorative corner accent */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

       
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Projects;