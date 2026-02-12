import React, { useState } from 'react';
import { PhoneIcon, EmailIcon, LocationIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './Icons';
import DemoBooking from './DemoBooking';
import { WEB3FORMS_CONFIG } from '../components/web3forms/config';
import Footer from '../components/Footer';

// 1. Accept isDarkMode Prop
const ContactUs = ({ isDarkMode = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showDemoBooking, setShowDemoBooking] = useState(false);
  const [showDemoPopup, setShowDemoPopup] = useState(false);

  // --- Validation Logic ---
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phone) return 'Phone number is required';
    if (phone.length < 10) return 'Phone number must be at least 10 digits';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return '';
  };

  const validateName = (name, fieldName) => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    if (name.length > 50) return `${fieldName} must be less than 50 characters`;
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return `${fieldName} can only contain letters`;
    return '';
  };

  const validateMessage = (message) => {
    if (!message) return 'Message is required';
    if (message.length < 10) return 'Message must be at least 10 characters';
    if (message.length > 1000) return 'Message must be less than 1000 characters';
    return '';
  };

  const validateSubject = (subject) => {
    if (!subject) return 'Please select a subject';
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName': return validateName(value, 'First name');
      case 'lastName': return validateName(value, 'Last name');
      case 'email': return validateEmail(value);
      case 'phone': return validatePhone(value);
      case 'message': return validateMessage(value);
      case 'subject': return validateSubject(value);
      default: return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, email: true, phone: true, subject: true, message: true });

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_CONFIG.CONTACT_ACCESS_KEY,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Failed to send message');

      setShowPopup(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    }
  };

  const closePopup = () => setShowPopup(false);
  const closeDemoPopup = () => setShowDemoPopup(false);
  const handleDemoSuccess = () => {
    setShowDemoBooking(false);
    setShowDemoPopup(true);
  };

  return (
    // 2. Use isDarkMode for background
    <div className={`flex flex-col min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-gray-800 via-gray-900 to-gray-800' : 'from-purple-100 via-purple-50 to-purple-100'} bg-[length:400%_400%] animate-[gradientShift_15s_ease_infinite]`}>
      
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* 3. REMOVED CustomNavbar (App.jsx handles it) */}

      <div className="flex-grow flex items-center justify-center pt-32 pb-12 px-5 relative z-10">
        
        <div className={`flex max-w-[1200px] w-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(108,73,172,0.12)] min-h-[600px] ${isDarkMode ? 'bg-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.5)]' : 'bg-white'}`}>
          {/* LEFT PANEL - Contact Information */}
          <div className="flex-[0_0_40%] bg-gradient-to-b from-purple-600 to-purple-700 py-16 px-12 relative overflow-hidden flex flex-col">
            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-white text-4xl font-bold mb-3 -tracking-tight">Contact Information</h2>
              <p className="text-white/85 text-base mb-20 leading-relaxed">Say something to start a live chat!</p>
              
              <div className="flex flex-col gap-10 mb-auto">
                <div className="flex items-start gap-5 text-white text-base leading-relaxed">
                  <PhoneIcon />
                  <span>+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-start gap-5 text-white text-base leading-relaxed">
                  <EmailIcon />
                  <span>hrcodecelix@gmail.com</span>
                </div>
                
                <div className="flex items-start gap-5 text-white text-base leading-relaxed">
                  <LocationIcon />
                  <span>NASTP Rawalpindi<br />Delta Aplha</span>
                </div>
              </div>
              
              <div className="flex gap-5 mt-16">
                <a href="#" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5" aria-label="Twitter">
                  <TwitterIcon />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
            
            <div className="absolute rounded-full bg-white/8 w-[200px] h-[200px] -bottom-12 -right-12"></div>
            <div className="absolute rounded-full bg-white/8 w-[120px] h-[120px] bottom-36 right-10"></div>
          </div>

          {/* RIGHT PANEL - Contact Form */}
          <div className={`flex-1 py-16 px-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <form onSubmit={handleSubmit} className="max-w-full">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} className={`py-3 px-0 text-base outline-none border-b-2 transition-all duration-300 ${errors.firstName && touched.firstName ? 'border-red-500' : isDarkMode ? 'bg-transparent text-gray-100 border-gray-600 focus:border-purple-400' : 'bg-transparent text-gray-900 border-gray-300 focus:border-purple-600'}`} />
                  {errors.firstName && touched.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName}</span>}
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="lastName" className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} className={`py-3 px-0 text-base outline-none border-b-2 transition-all duration-300 ${errors.lastName && touched.lastName ? 'border-red-500' : isDarkMode ? 'bg-transparent text-gray-100 border-gray-600 focus:border-purple-400' : 'bg-transparent text-gray-900 border-gray-300 focus:border-purple-600'}`} />
                  {errors.lastName && touched.lastName && <span className="text-red-500 text-xs mt-1">{errors.lastName}</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col">
                  <label htmlFor="email" className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`py-3 px-0 text-base outline-none border-b-2 transition-all duration-300 ${errors.email && touched.email ? 'border-red-500' : isDarkMode ? 'bg-transparent text-gray-100 border-gray-600 focus:border-purple-400' : 'bg-transparent text-gray-900 border-gray-300 focus:border-purple-600'}`} />
                  {errors.email && touched.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="phone" className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={`py-3 px-0 text-base outline-none border-b-2 transition-all duration-300 ${errors.phone && touched.phone ? 'border-red-500' : isDarkMode ? 'bg-transparent text-gray-100 border-gray-600 focus:border-purple-400' : 'bg-transparent text-gray-900 border-gray-300 focus:border-purple-600'}`} />
                  {errors.phone && touched.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
                </div>
              </div>

              <div className="flex flex-col mb-8">
                <label className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Subject?</label>
                <div className="flex flex-wrap gap-5">
                  {['general', 'support', 'sales', 'partnership'].map((value) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="subject" value={value} checked={formData.subject === value} onChange={handleChange} onBlur={handleBlur} className="w-5 h-5 cursor-pointer accent-purple-600" />
                      <span className={`text-base capitalize ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{value === 'general' ? 'General Inquiry' : value.charAt(0).toUpperCase() + value.slice(1)}</span>
                    </label>
                  ))}
                </div>
                {errors.subject && touched.subject && <span className="text-red-500 text-xs mt-2">{errors.subject}</span>}
              </div>

              <div className="flex flex-col mb-8">
                <label htmlFor="message" className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} className={`py-3 px-4 text-base outline-none border-b-2 transition-all duration-300 resize-none ${errors.message && touched.message ? 'border-red-500' : isDarkMode ? 'bg-transparent text-gray-100 border-gray-600 focus:border-purple-400' : 'bg-transparent text-gray-900 border-gray-300 focus:border-purple-600'}`} placeholder="Write your message..." rows="5"></textarea>
                {errors.message && touched.message && <span className="text-red-500 text-xs mt-1">{errors.message}</span>}
              </div>

              <div className="flex gap-4 justify-end">
                <button type="button" className="py-4 px-10 text-base font-semibold text-purple-600 bg-transparent border-2 border-purple-600 rounded-xl cursor-pointer transition-all duration-300 tracking-wide hover:bg-purple-600 hover:text-white" onClick={() => setShowDemoBooking(true)}>BOOK A DEMO</button>
                <button type="submit" className="py-4 px-10 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 border-0 rounded-xl cursor-pointer transition-all duration-300 tracking-wide shadow-[0_4px_15px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)]">SEND</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] animate-[fadeIn_0.3s_ease]" onClick={closePopup}>
          <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-[scaleIn_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-6">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="2" fill="#f3e8ff"/><path d="M8 12L11 15L16 9" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Message Sent!</h3>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">We'll get back to you shortly.</p>
            <button className="py-3 px-10 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 border-0 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <DemoBooking isOpen={showDemoBooking} onClose={() => setShowDemoBooking(false)} onSuccess={handleDemoSuccess} />
      
      {showDemoPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] animate-[fadeIn_0.3s_ease]" onClick={closeDemoPopup}>
          <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-[scaleIn_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-6">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="2" fill="#f3e8ff"/><path d="M8 12L11 15L16 9" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Demo Booked!</h3>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">Your demo is scheduled.</p>
            <button className="py-3 px-10 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 border-0 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg" onClick={closeDemoPopup}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ContactUs;