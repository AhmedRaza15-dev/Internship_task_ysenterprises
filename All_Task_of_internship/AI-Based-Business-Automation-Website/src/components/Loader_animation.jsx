import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import AIimage from '/AI-bot.png';

import { useNavigate } from 'react-router-dom';

export const Loader_animation = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            navigate('/how-it-works');
        }, 1500);
        return () => clearTimeout(timer);
      }, [navigate]);

      if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.65 0.09 327.77 / 0.27)' }}>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="text-4xl"
          >
            <img src={AIimage} alt="Loading AI Bot" className="w-48 h-48 animate-bounce" />
          </motion.div>
        </div>
      </div>
    );
  }

 
}

// export default Loader_animation;
