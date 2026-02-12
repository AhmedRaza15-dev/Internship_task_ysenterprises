import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Map markers data
  const mapMarkers = [
    { id: 1, name: 'New York Office', x: 30, y: 40, color: 'amber' },
    { id: 2, name: 'London Office', x: 50, y: 25, color: 'blue' },
    { id: 3, name: 'Tokyo Office', x: 80, y: 45, color: 'green' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form entrance animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        },
        y: 100,
        opacity: 0
      });

      // Map entrance animation
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          },
          scale: 0.8,
          opacity: 0
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
    
    // Animate field expansion on focus
    const field = document.getElementById(fieldName);
    if (field) {
      gsap.to(field, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleBlur = (fieldName) => {
    setFocusedField(null);
    
    // Return field to normal size
    const field = document.getElementById(fieldName);
    if (field) {
      gsap.to(field, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animate submit button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Simulate API call
        setTimeout(() => {
          setIsSubmitting(false);
          setShowSuccess(true);

          // Reset form
          setFormData({
            name: '',
            email: '',
            company: '',
            message: ''
          });

          // Hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);
        }, 2000);
      }
    });
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker.id);
    
    // Animate marker pulse
    const markerElement = document.getElementById(`marker-${marker.id}`);
    if (markerElement) {
      gsap.fromTo(markerElement,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        }
      );
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Success Message Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 border-2 border-amber-500 rounded-2xl p-8 max-w-md mx-4 animate-slideUp shadow-2xl shadow-amber-500/20">
            <div className="flex flex-col items-center text-center">
              {/* Animated checkmark */}
              <div className="relative w-20 h-20 mb-6">
                <svg className="w-20 h-20 animate-drawCheck" viewBox="0 0 52 52">
                  <circle className="animate-drawCircle" cx="26" cy="26" r="25" fill="none" stroke="#fbbf24" strokeWidth="2"/>
                  <path className="animate-drawTick" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
              <p className="text-zinc-400 mb-6">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-8 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-all hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column - Information */}
          <div>
            <p className="text-amber-500 text-sm uppercase tracking-wider mb-4 animate-fadeIn">Get In Touch</p>
            <h2 className="text-6xl md:text-8xl font-bold mb-8 animate-slideInLeft">
              LET'S <span className="text-amber-500">TALK</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed animate-fadeIn" style={{animationDelay: '0.2s'}}>
              Have a project in mind? We'd love to hear about it. Send us a message 
              and we'll get back to you as soon as possible.
            </p>

            {/* Contact info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4 group animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-zinc-500 text-sm mb-1">Email</p>
                  <a href="mailto:codecelix@gmail.com" className="text-lg text-white hover:text-amber-500 transition-colors">
                    codecelix@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 group animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-zinc-500 text-sm mb-1">Phone</p>
                  <a href="tel:+1234567890" className="text-lg text-white hover:text-amber-500 transition-colors">
                    +924567890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group animate-fadeIn" style={{animationDelay: '0.5s'}}>
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-zinc-500 text-sm mb-1">Location</p>
                  <p className="text-lg text-white">
                    Nastp Rawalpindi<br />
                    Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-12 animate-fadeIn" style={{animationDelay: '0.6s'}}>
              <p className="text-zinc-500 text-sm mb-4">Follow Us</p>
              <div className="flex gap-4">
                {/* Twitter/X */}
                <a
                  href="#"
                  className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all hover:scale-110 hover:rotate-12"
                  style={{animationDelay: '0.7s'}}
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all hover:scale-110 hover:rotate-12"
                  style={{animationDelay: '0.8s'}}
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all hover:scale-110 hover:rotate-12"
                  style={{animationDelay: '0.9s'}}
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Dribbble */}
                <a
                  href="#"
                  className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all hover:scale-110 hover:rotate-12"
                  style={{animationDelay: '1.0s'}}
                  aria-label="Dribbble"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm9.341 12c0 1.485-.348 2.888-.965 4.137-1.028-1.907-3.046-3.437-5.576-4.289.098-.264.189-.532.273-.806 2.753.827 5.027 2.084 6.268 2.958zm-1.315-3.486c-.762.674-2.367 1.896-5.495 2.603-.503-1.167-1.053-2.282-1.636-3.314 2.573-.413 4.808-.214 6.506.054.206.632.414 1.27.625 1.657zM12 1.8c1.88 0 3.605.683 4.943 1.814-1.227.84-2.925 1.486-5.023 1.773-.915-1.686-1.907-3.127-2.917-4.283C10.016 1.963 11.008 1.8 12 1.8zM6.645 2.486c.943 1.065 1.885 2.408 2.753 3.994-2.363.564-4.982.827-7.398.827-.015-.192-.024-.385-.024-.58 0-2.225.867-4.259 2.28-5.771.748.458 1.656.961 2.389 1.53zM1.8 12c0-.173.009-.344.022-.514 2.614.006 5.507-.275 8.128-.935.498.974.976 1.982 1.432 3.019-3.298 1.242-5.794 3.474-7.189 6.093C2.678 17.687 1.8 14.961 1.8 12zm10.2 10.2c-1.906 0-3.664-.549-5.164-1.494 1.226-2.32 3.392-4.265 6.272-5.347.68 1.759 1.26 3.621 1.716 5.569-1.05.173-2.092.272-3.824.272z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Interactive Map */}
            <div ref={mapRef} className="mt-12">
              <p className="text-zinc-500 text-sm mb-4">Our Offices</p>
              <div className="relative w-full h-64 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group">
                {/* Map background with grid */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Animated markers */}
                {mapMarkers.map((marker, index) => (
                  <div
                    key={marker.id}
                    id={`marker-${marker.id}`}
                    className="absolute cursor-pointer transition-all duration-300"
                    style={{
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${index * 0.2}s`
                    }}
                    onClick={() => handleMarkerClick(marker)}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.2,
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.in'
                      });
                    }}
                  >
                    {/* Marker pin */}
                    <div className="relative animate-bounce" style={{animationDuration: '2s', animationDelay: `${index * 0.3}s`}}>
                      {/* Pulsing ring */}
                      <div className={`absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-${marker.color}-500/30 rounded-full animate-ping`}></div>
                      
                      {/* Pin icon */}
                      <svg className={`w-8 h-8 text-${marker.color}-500 drop-shadow-lg`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C7.802 0 4.403 3.403 4.403 7.602 4.403 11.8 12 24 12 24s7.597-12.2 7.597-16.398C19.597 3.403 16.198 0 12 0zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                      </svg>
                    </div>

                    {/* Info tooltip */}
                    {selectedMarker === marker.id && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 border border-amber-500 rounded-lg text-xs text-white whitespace-nowrap animate-fadeIn shadow-xl">
                        {marker.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-500"></div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Map overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 group-hover:opacity-30 transition-opacity"></div>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div className="relative">
                <label 
                  htmlFor="name"
                  className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formData.name
                      ? '-top-3 text-xs text-amber-500 bg-black px-2'
                      : 'top-5 text-base text-zinc-500'
                  }`}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-lg px-6 py-5 text-white focus:border-amber-500 focus:outline-none focus:shadow-lg focus:shadow-amber-500/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Email field */}
              <div className="relative">
                <label 
                  htmlFor="email"
                  className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formData.email
                      ? '-top-3 text-xs text-amber-500 bg-black px-2'
                      : 'top-5 text-base text-zinc-500'
                  }`}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-lg px-6 py-5 text-white focus:border-amber-500 focus:outline-none focus:shadow-lg focus:shadow-amber-500/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Company field */}
              <div className="relative">
                <label 
                  htmlFor="company"
                  className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                    focusedField === 'company' || formData.company
                      ? '-top-3 text-xs text-amber-500 bg-black px-2'
                      : 'top-5 text-base text-zinc-500'
                  }`}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => handleFocus('company')}
                  onBlur={() => handleBlur('company')}
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-lg px-6 py-5 text-white focus:border-amber-500 focus:outline-none focus:shadow-lg focus:shadow-amber-500/20 transition-all duration-300"
                />
              </div>

              {/* Message field */}
              <div className="relative">
                <label 
                  htmlFor="message"
                  className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message
                      ? '-top-3 text-xs text-amber-500 bg-black px-2'
                      : 'top-5 text-base text-zinc-500'
                  }`}
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  rows="6"
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-lg px-6 py-5 text-white focus:border-amber-500 focus:outline-none focus:shadow-lg focus:shadow-amber-500/20 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-5 bg-amber-500 text-black font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              <p className="text-zinc-500 text-sm text-center">
                * Required fields
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawCircle {
          0% {
            stroke-dasharray: 0 157;
          }
          100% {
            stroke-dasharray: 157 157;
          }
        }

        @keyframes drawTick {
          0% {
            stroke-dasharray: 0 50;
          }
          100% {
            stroke-dasharray: 50 50;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-drawCircle {
          stroke-dasharray: 157;
          stroke-dashoffset: 157;
          animation: drawCircle 0.6s ease-out forwards;
          animation-delay: 0.2s;
        }

        .animate-drawTick {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: drawTick 0.3s ease-out forwards;
          animation-delay: 0.8s;
        }

        .animate-drawCheck {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Contact;