import React, { useState } from 'react';
import { WEB3FORMS_CONFIG } from '../components/web3forms/config';

const DemoBooking = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    date: '',
    time: '',
    participants: '1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send email using Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_CONFIG.DEMO_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Not provided',
          subject: 'Demo Booking Request',
          message: `Preferred Date: ${formData.date}\nPreferred Time: ${formData.time}\nNumber of Participants: ${formData.participants}`,
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to book demo');
      }

      console.log('Demo booking submitted successfully via Web3Forms');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        date: '',
        time: '',
        participants: '1'
      });
      
      // Call success handler to show popup
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting demo booking:', error);
      alert('There was an error booking your demo. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[2000] animate-[fadeIn_0.3s_ease]" onClick={onClose}></div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
      
      <div className="fixed top-0 right-0 w-[500px] h-screen bg-white z-[2001] overflow-y-auto p-10 shadow-[-10px_0_40px_rgba(0,0,0,0.2)] animate-[slideIn_0.4s_ease]">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-3xl font-bold text-gray-800 m-0 -tracking-tight">Book a Demo</h2>
          <button 
            className="bg-transparent border-0 cursor-pointer text-gray-600 p-1 transition-all duration-200 rounded-md hover:bg-gray-100 hover:text-gray-800" 
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <p className="text-base text-gray-600 mb-8 leading-relaxed">Schedule a personalized demo with our team</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="demo-name" className="text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              id="demo-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="py-3 px-4 text-base text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-purple-600 focus:bg-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="demo-email" className="text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              id="demo-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-3 px-4 text-base text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-purple-600 focus:bg-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="demo-company" className="text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              id="demo-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="py-3 px-4 text-base text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-purple-600 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="demo-date" className="text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
              <input
                type="date"
                id="demo-date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="py-3 px-4 text-base text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-purple-600 focus:bg-white"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="demo-time" className="text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
              <select
                id="demo-time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="py-3 px-4 pr-10 text-base text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201.5L6%206.5L11%201.5%27%20stroke=%27%236b7280%27%20stroke-width=%272%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-[length:12px] bg-[position:right_16px_center] bg-no-repeat focus:border-purple-600 focus:bg-white"
                required
              >
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="demo-participants" className="text-sm font-medium text-gray-700 mb-2">Number of Participants</label>
            <select
              id="demo-participants"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className="py-3 px-4 pr-10 text-base text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201.5L6%206.5L11%201.5%27%20stroke=%27%236b7280%27%20stroke-width=%272%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-[length:12px] bg-[position:right_16px_center] bg-no-repeat focus:border-purple-600 focus:bg-white"
            >
              <option value="1">1 person</option>
              <option value="2-5">2-5 people</option>
              <option value="6-10">6-10 people</option>
              <option value="10+">10+ people</option>
            </select>
          </div>

          <div className="flex gap-3 mt-5">
            <button 
              type="button" 
              className="flex-1 py-4 px-6 text-base font-semibold text-gray-600 bg-gray-100 border-0 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-200 hover:text-gray-700" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4 px-6 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 border-0 rounded-lg cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(124,58,237,0.4)] active:translate-y-0"
            >
              Book Demo
            </button>
          </div>
        </form>

        <div className="flex items-start gap-3 py-4 px-4 bg-purple-50 rounded-xl mt-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-purple-600 flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="text-sm text-gray-700 leading-relaxed m-0">Our team will confirm your demo within 24 hours</p>
        </div>
      </div>
    </>
  );
};

export default DemoBooking;
