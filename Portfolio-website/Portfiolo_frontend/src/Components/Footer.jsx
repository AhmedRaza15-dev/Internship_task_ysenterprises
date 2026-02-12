import React from "react";
import { MdEmail, MdLocationOn, MdPhone, MdAccessTime } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Code<span className="text-amber-500">Celix</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Innovative communication solutions for businesses.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 pb-2 border-b border-amber-500">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MdPhone className="w-5 h-5 text-amber-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MdEmail className="w-5 h-5 text-amber-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-300">contact@example.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MdLocationOn className="w-5 h-5 text-amber-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-300">123 Business St, SF, CA</p>
                </div>
              </div>
              <div className="flex items-start">
                <MdAccessTime className="w-5 h-5 text-amber-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-gray-300">9AM - 6PM (Mon-Fri)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 pb-2 border-b border-amber-500">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 pb-2 border-b border-amber-500">
              Newsletter
            </h4>
            <p className="text-gray-300 mb-4">
              Get updates in your inbox.
            </p>
            <div className="flex gap-2 -ml-6">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-800"
              />
              <button 
                className="px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                style={{backgroundColor: 'rgb(212 175 55)'}}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-amber-500 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} CodeCelix. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
          <p className="mt-4 text-gray-500 text-sm flex items-center justify-center">
            Made with <FaHeart className="w-4 h-4 text-red-500 mx-1" /> by our
            team
          </p>
        </div>
      </div>
    </footer>
  );
  
};

export default Footer;