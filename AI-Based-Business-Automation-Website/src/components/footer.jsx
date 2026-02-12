import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-2xl font-bold mb-4">CodeCelix<span className="text-brand-info">.</span></h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Empowering businesses through intelligent automation. 
            We build the future of work, today.
          </p>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-info hover:text-white transition-all duration-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h6 className="font-bold uppercase mb-4 text-gray-200">Company</h6>
          <div className="flex flex-col gap-2">
            {['About Us', 'Careers', 'Blog'].map(link => (
              <a key={link} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        </div>

        <div>
          <h6 className="font-bold uppercase mb-4 text-gray-200">Solutions</h6>
          <div className="flex flex-col gap-2">
            {['Chatbots', 'Workflow', 'Analytics'].map(link => (
              <a key={link} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h6 className="font-bold uppercase mb-4 text-gray-200">Contact</h6>
          <p className="text-gray-400 text-sm mb-2">Email: hello@codecelix.com</p>
          <p className="text-gray-400 text-sm mb-2">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-400 text-sm">Location: Silicon Valley, CA</p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-xs">
        &copy; 2025 CodeCelix Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;