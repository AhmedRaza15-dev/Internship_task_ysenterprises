import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';


import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaPaperPlane,
  FaCheckCircle,
  FaMapPin,
  FaUser,
  FaComment
} from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const locations = [
    { id: 1, x: '30%', y: '40%', name: 'New York Office', address: '123 Business St, SF, CA' },
    { id: 2, x: '70%', y: '60%', name: 'London Office', address: '456 Corporate Ave, London, UK' },
    { id: 3, x: '50%', y: '25%', name: 'Tokyo Office', address: '789 Industrial Rd, Tokyo, Japan' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const formVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const mapVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    initial: { 
      scale: 1,
      backgroundColor: "#f59e0b",
      boxShadow: "0 4px 6px -1px rgba(245, 158, 11, 0.2)"
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "#d97706",
      boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const markerVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.3, 
      y: -10,
      color: "#f59e0b",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    active: {
      scale: [1, 1.5, 1.2],
      color: ["#3b82f6", "#10b981", "#f59e0b"],
      transition: {
        duration: 0.8,
        times: [0, 0.5, 1]
      }
    }
  };

  const inputVariants = {
    initial: { scale: 1, borderColor: "#4b5563" }, // Changed from gray-300 to gray-600 equivalent
    focus: { 
      scale: 1.02,
      borderColor: "#f59e0b",
      boxShadow: "0 0 0 3px rgba(245, 158, 11, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const handleMarkerClick = (index, location) => {
    setActiveMarker(index);
    setHoveredMarker(null);
    alert(`Selected location: ${location.name}\n${location.address}`);
  };

  const onSubmit = async (data) => {
    console.log('Contact form submission:');
    console.log('Name:', data.name);
    console.log('Email:', data.email);
    console.log('Subject:', data.subject);
    console.log('Message:', data.message);

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg = json?.message || (json?.errors ? json.errors.join(', ') : 'Failed to send message');
        console.error('Server response error:', errMsg, json);
        alert(errMsg);
        return;
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      console.log('Form data at failure:', data);
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gradient-to-br from-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              LET'S <span className="text-amber-500">TALK</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear about it. Send us a message 
              and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div className="flex flex-col">
              <motion.div 
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="bg-black rounded-2xl shadow-xl p-8 flex-grow h-full flex flex-col border border-gray-800"
              >
                <motion.h2 
                  className="text-2xl font-bold text-white mb-6 flex items-center"
                  variants={itemVariants}
                >
                  <FaEnvelope className="mr-2 text-amber-500" />
                  Send us a Message
                </motion.h2>
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit(onSubmit)} 
                      className="space-y-6 flex-grow flex flex-col"
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants}>
                          <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <FaUser className="mr-2 text-amber-500" />
                            Your Name
                          </label>
                          <div className="relative">
                            <motion.input
                              {...register("name", { required: "Name is required" })}
                              type="text"
                              className="w-full px-4 py-3 pl-11 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                              placeholder="John Doe"
                              variants={inputVariants}
                              initial="initial"
                              whileFocus="focus"
                            />
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                          )}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <MdEmail className="mr-2 text-amber-500" />
                            Email Address
                          </label>
                          <div className="relative">
                            <motion.input
                              {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                }
                              })}
                              type="email"
                              className="w-full px-4 py-3 pl-11 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                              placeholder="john@example.com"
                              variants={inputVariants}
                              initial="initial"
                              whileFocus="focus"
                            />
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                          )}
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants}>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                          <FaComment className="mr-2 text-amber-500" />
                          Subject
                        </label>
                        <div className="relative">
                          <motion.input
                            {...register("subject", { required: "Subject is required" })}
                            type="text"
                            className="w-full px-4 py-3 pl-11 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                            placeholder="How can we help?"
                            variants={inputVariants}
                            initial="initial"
                            whileFocus="focus"
                          />
                          <FaComment className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants} className="flex-grow">
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                          <FaEnvelope className="mr-2 text-amber-500" />
                          Message
                        </label>
                        <div className="relative h-full">
                          <motion.textarea
                            {...register("message", { 
                              required: "Message is required",
                              minLength: {
                                value: 10,
                                message: "Message must be at least 10 characters"
                              }
                            })}
                            rows="6"
                            className="w-full h-full px-4 py-3 pl-11 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                            placeholder="Tell us about your project..."
                            variants={inputVariants}
                            initial="initial"
                            whileFocus="focus"
                          />
                          <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                        </div>
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                        )}
                      </motion.div>

                      <motion.button
                        type="submit"
                        className="w-full bg-amber-500 text-black font-bold text-lg py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-auto hover:bg-amber-400"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                      >
                        <span className="flex items-center justify-center">
                          <motion.span
                            animate={isButtonHovered ? { x: 5 } : { x: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <FaPaperPlane className="mr-2" />
                          </motion.span>
                          Send Message
                        </span>
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      variants={successVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-center py-12 flex-grow flex flex-col justify-center"
                    >
                      <motion.div 
                        className="inline-flex items-center justify-center w-24 h-24 bg-black rounded-full mb-6 mx-auto border border-amber-500"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 1,
                          times: [0, 0.3, 0.6, 1]
                        }}
                      >
                        <FaCheckCircle className="w-12 h-12 text-amber-500" />
                      </motion.div>
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Message Sent Successfully!
                      </motion.h3>
                      <motion.p 
                        className="text-gray-400 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Thank you for contacting us. We'll get back to you soon.
                      </motion.p>
                      <motion.div 
                        className="text-sm text-amber-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          This message will disappear in a few seconds...
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Column - Map and Location Info */}
            <div className="flex flex-col">
              <motion.div 
                variants={mapVariants}
                initial="hidden"
                animate="visible"
                className="bg-black rounded-2xl shadow-xl overflow-hidden border border-gray-800 h-full flex flex-col"
              >
                {/* Map Header */}
                <div className="p-6 bg-gradient-to-r from-amber-600 to-amber-800">
                  <motion.h2 
                    className="text-2xl font-bold text-white flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FaMapMarkerAlt className="mr-3" />
                    Our Offices
                  </motion.h2>
                  <motion.p 
                    className="text-amber-100 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Click on markers for details
                  </motion.p>
                </div>
                
                {/* Map Container */}
                <div className="flex-grow relative bg-black overflow-hidden min-h-[300px]">
                  {/* Simple map background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" 
                         style={{
                           backgroundImage: `linear-gradient(to right, #f59e0b 1px, transparent 1px),
                                            linear-gradient(to bottom, #f59e0b 1px, transparent 1px)`,
                           backgroundSize: '40px 40px'
                         }}>
                    </div>
                  </div>
                  
                  {/* Map markers */}
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: location.x, top: location.y }}
                      animate={activeMarker === index ? "active" : "initial"}
                    >
                      <motion.div 
                        className="relative"
                        onMouseEnter={() => setHoveredMarker(index)}
                        onMouseLeave={() => hoveredMarker === index && setHoveredMarker(null)}
                        onClick={() => handleMarkerClick(index, location)}
                        variants={markerVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <FaMapPin
                          className={`w-10 h-10 ${activeMarker === index ? 'text-amber-500' : 'text-amber-500'}`}
                        />
                        {hoveredMarker === index && (
                          <motion.div 
                            className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white px-3 py-2 rounded-lg text-sm shadow-lg z-20 border border-amber-500"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            {location.name}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45 border-l border-t border-amber-500"></div>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Location Details */}
                <motion.div 
                  className="p-6 bg-black border-t border-gray-700"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.h3 
                    className="font-semibold text-white mb-4"
                    variants={itemVariants}
                  >
                    Our Offices
                  </motion.h3>
                  <div className="space-y-4">
                    {locations.map((location, index) => (
                      <motion.div 
                        key={location.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${activeMarker === index ? 'bg-black border-amber-500' : 'bg-black border-gray-700 hover:border-amber-500'}`}
                        onMouseEnter={() => setHoveredMarker(index)}
                        onMouseLeave={() => hoveredMarker === index && setHoveredMarker(null)}
                        onClick={() => handleMarkerClick(index, location)}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 400, damping: 17 }
                        }}
                      >
                        <div className="flex items-start">
                          <motion.div 
                            className={`p-2 rounded-lg mr-3 ${activeMarker === index ? 'bg-black' : 'bg-black'}`}
                            animate={{ 
                              rotate: activeMarker === index ? [0, 10, 0] : 0
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <FaMapPin className={activeMarker === index ? 'text-amber-500' : 'text-gray-400'} />
                          </motion.div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-white">{location.name}</h4>
                            <p className="text-sm text-gray-400 mt-1">{location.address}</p>
                          </div>
                          <motion.button 
                            className={`px-3 py-1 text-sm rounded-full ${activeMarker === index ? 'bg-amber-500 text-black' : 'bg-black text-gray-300 hover:bg-black'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkerClick(index, location);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {activeMarker === index ? 'Selected' : 'Select'}
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <motion.div 
                    className="mt-6 pt-6 border-t border-gray-700"
                    variants={itemVariants}
                  >
                    <h3 className="font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <MdPhone className="w-5 h-5 text-amber-500 mr-3" />
                        <span>+924567890</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MdEmail className="w-5 h-5 text-amber-500 mr-3" />
                        <span>codecelix@gmail.com</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MdLocationOn className="w-5 h-5 text-amber-500 mr-3" />
                        <span>Nastp Rawalpindi, Pakistan</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Business Hours: 9AM - 6PM (Mon-Fri)</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;