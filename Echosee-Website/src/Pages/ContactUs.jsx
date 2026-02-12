// ContactUs.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageSquare,
  User,
  AlertCircle
} from 'lucide-react';

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSocial, setActiveSocial] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 3000);
  };

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', color: '#0A66C2', url: 'https://linkedin.com/company/echosee' },
    { icon: Twitter, label: 'Twitter', color: '#1DA1F2', url: 'https://twitter.com/echosee' },
    { icon: Facebook, label: 'Facebook', color: '#1877F2', url: 'https://facebook.com/echosee' },
    { icon: Instagram, label: 'Instagram', color: '#E4405F', url: 'https://instagram.com/echosee' }
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@echosee.com', color: '#22D3EE' },
    { icon: Phone, label: 'Phone', value: '+92 300 123 4567', color: '#7C84FD' },
    { icon: MapPin, label: 'Office', value: 'Tech Hub, Karachi, Pakistan', color: '#C084FC' }
  ];

  const FloatingInput = ({ label, name, type = 'text', validation = {}, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className="relative mb-6">
        <motion.div
          animate={{
            borderColor: errors[name] ? '#EF4444' : isFocused ? '#22D3EE' : '#374151',
            backgroundColor: isFocused ? '#1E293B' : '#111827'
          }}
          className="relative border rounded-xl transition-all duration-200"
        >
          <input
            {...register(name, validation)}
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
            }}
            onChange={(e) => setHasValue(!!e.target.value)}
            className="w-full px-4 pt-6 pb-2 bg-transparent outline-none text-white"
            {...props}
          />
          
          <motion.label
            animate={{
              y: isFocused || hasValue ? -8 : 0,
              fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
              color: errors[name] ? '#EF4444' : isFocused ? '#22D3EE' : '#9CA3AF'
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200"
          >
            {label}
          </motion.label>
        </motion.div>

        <AnimatePresence>
          {errors[name] && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center mt-1 text-red-500 text-sm"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              {errors[name]?.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#22D3EE] via-[#7C84FD] to-[#C084FC] bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1E3A8A]/30 backdrop-blur-sm rounded-3xl p-8 border border-[#22D3EE]/10"
          >
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-2 text-white">Send us a Message</h2>
                  <p className="text-gray-400 mb-8">We'll get back to you within 24 hours</p>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FloatingInput
                          label="First Name"
                          name="firstName"
                          validation={{ required: "First name is required" }}
                        />
                        <FloatingInput
                          label="Last Name"
                          name="lastName"
                          validation={{ required: "Last name is required" }}
                        />
                      </div>

                      <FloatingInput
                        label="Email Address"
                        name="email"
                        type="email"
                        validation={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        }}
                      />

                      <FloatingInput
                        label="Subject"
                        name="subject"
                        validation={{ required: "Subject is required" }}
                      />

                      {/* Message Textarea */}
                      <div className="relative">
                        <motion.div
                          animate={{
                            borderColor: errors.message ? '#EF4444' : '#22D3EE'
                          }}
                          className="relative border rounded-xl transition-all duration-200"
                        >
                          <textarea
                            {...register('message', { 
                              required: "Message is required",
                              minLength: {
                                value: 10,
                                message: "Message must be at least 10 characters"
                              }
                            })}
                            rows="5"
                            className="w-full px-4 pt-8 pb-4 bg-[#111827] rounded-xl outline-none text-white resize-none"
                            placeholder=" "
                          />
                          <label className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all duration-200">
                            Your Message
                          </label>
                        </motion.div>
                        
                        <AnimatePresence>
                          {errors.message && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center mt-1 text-red-500 text-sm"
                            >
                              <AlertCircle className="w-4 h-4 mr-2" />
                              {errors.message?.message}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white font-semibold disabled:opacity-50 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-3" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4 text-white">Message Sent!</h2>
                  <p className="text-gray-300 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-3 rounded-xl bg-[#1E293B] text-white hover:bg-[#2D3748] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 border border-[#C084FC]/20"
            >
              <h2 className="text-2xl font-bold mb-8 text-white">Get in Touch</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-[#1E293B]/30 hover:bg-[#1E293B]/50 transition-all cursor-pointer group"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${info.color}20` }}
                    >
                      <info.icon className="w-6 h-6" style={{ color: info.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-300">{info.label}</h3>
                      <p className="text-white">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-white">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-red-400">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E3A8A]/30 backdrop-blur-sm rounded-3xl p-8 border border-[#22D3EE]/10"
            >
              <h2 className="text-2xl font-bold mb-8 text-white">Connect With Us</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      backgroundColor: `${social.color}20`
                    }}
                    onHoverStart={() => setActiveSocial(index)}
                    onHoverEnd={() => setActiveSocial(null)}
                    className="relative p-4 rounded-xl bg-[#1E293B]/30 border border-gray-700 hover:border-transparent transition-all group"
                    style={{ backgroundColor: activeSocial === index ? `${social.color}20` : '' }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: social.color }}
                      >
                        <social.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-white">{social.label}</span>
                    </div>
                    
                    <AnimatePresence>
                      {activeSocial === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 rounded text-xs whitespace-nowrap"
                        >
                          Follow us on {social.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-white">Stay Updated</h3>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[#1E293B] border border-gray-600 rounded-xl focus:outline-none focus:border-[#22D3EE] text-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white rounded-lg"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* FAQ Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 border border-[#C084FC]/20"
            >
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-[#22D3EE]" />
                Quick Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "What's the warranty period?", a: "2 years comprehensive warranty" },
                  { q: "Do you offer enterprise solutions?", a: "Yes, custom plans available" },
                  { q: "Is international shipping available?", a: "Yes, worldwide delivery" }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-[#1E293B]/30 hover:bg-[#1E293B]/50 transition-colors cursor-pointer"
                  >
                    <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                    <p className="text-sm text-gray-400">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;