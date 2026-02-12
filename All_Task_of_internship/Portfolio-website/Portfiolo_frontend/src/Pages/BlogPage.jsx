import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Clock, Loader2, ArrowRight, Calendar, User, Tag } from 'lucide-react';

// Mock blog post data
const mockPosts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Creative Design Project ${i + 1}`,
  excerpt: `Exploring innovative design solutions for modern digital experiences. This project showcases cutting-edge techniques in user interface design...`,
  author: 'Alex Morgan',
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  category: i % 3 === 0 ? 'Design' : i % 3 === 1 ? 'Development' : 'Strategy',
  readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
  image: `https://picsum.photos/seed/blog${i + 1}/600/400`
}));

const BlogCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const contentVariants = {
    initial: { y: 0 },
    hover: { 
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const buttonArrowVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative overflow-hidden rounded-2xl bg-black/60 backdrop-blur-sm border border-gray-800/50 shadow-2xl cursor-pointer group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-300/6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Card Image - Fixed to always show */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/18 to-amber-300/12" />
        <img 
          src={post.image} 
          alt={post.title}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onLoad={() => setImageLoaded(true)}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in'
          }}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse" />
        )}
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <motion.span 
            className="px-3 py-1 bg-black/70 backdrop-blur-sm text-xs font-semibold rounded-full text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {post.category}
          </motion.span>
        </div>
      </div>

      {/* Card Content */}
      <motion.div 
        className="p-6 relative z-10"
        variants={contentVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      >
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <User size={14} />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-amber-300 transition-all duration-300">
          {post.title}
        </h3>
        
        <p className="text-gray-400 mb-6 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-amber-400 font-semibold group/btn">
            Read More
            <motion.span
              variants={buttonArrowVariants}
              animate={isHovered ? "hover" : "initial"}
            >
              <ArrowRight size={16} />
            </motion.span>
          </button>
          
          <div className="flex gap-2">
            {['Design', 'Creative', 'Tech'].map(tag => (
              <motion.span 
                key={tag} 
                className="px-2 py-1 text-xs bg-gray-800/50 rounded-lg text-gray-300"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(75, 85, 99, 0.8)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Hover border effect */}
      <motion.div 
        className="absolute inset-0 border-2 border-transparent rounded-2xl"
        animate={{ 
          borderColor: isHovered ? "rgba(245,159,11,0.28)" : "transparent"
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

const LoadingSpinner = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-800 rounded-full"></div>
        <motion.div 
          className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-amber-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-amber-400 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p 
        className="text-gray-500 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading creative insights...
      </motion.p>
    </motion.div>
  );
};

const LoadingPlaceholder = () => {
  const placeholderVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={placeholderVariants}
      initial="hidden"
      animate="visible"
    >
      {[1, 2, 3].map(i => (
        <motion.div key={i} variants={itemVariants}>
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl overflow-hidden border border-gray-800/30">
            <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-900"></div>
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <div className="h-4 bg-gray-800 rounded w-24"></div>
                <div className="h-4 bg-gray-800 rounded w-20"></div>
              </div>
              <div className="h-6 bg-gray-800 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-gray-800 rounded"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts.slice(0, 9));
      setIsLoading(false);
    }, 1500);
  }, []);

  // Load more posts when scrolled to bottom
  useEffect(() => {
    if (inView && hasMore && !loadingMore && !isLoading) {
      loadMorePosts();
    }
  }, [inView, hasMore, loadingMore, isLoading]);

  const loadMorePosts = () => {
    setLoadingMore(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = posts.length;
      const newPosts = mockPosts.slice(startIndex, startIndex + 3);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
      }
      
      setLoadingMore(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(245,159,11,0.06) 0%, transparent 50%), 
                          radial-gradient(circle at 80% 20%, rgba(245,159,11,0.03) 0%, transparent 50%)`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          y: backgroundY
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full mix-blend-overlay opacity-8"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(245,159,11,0.22)' : 'rgba(34,197,94,0.12)'})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            Creative Insights
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our latest projects, design thinking, and creative explorations in digital innovation
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <LoadingPlaceholder />
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={posts.length} // Re-animate when posts change
              >
                <AnimatePresence mode="wait">
                  {posts.map((post, index) => (
                    <motion.div 
                      key={`${post.id}-${index}`}
                      variants={itemVariants}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <BlogCard post={post} index={index} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Infinite scroll trigger */}
              <div ref={ref} className="h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {loadingMore && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <LoadingSpinner />
                    </motion.div>
                  )}
                  
                  {!hasMore && (
                    <motion.div 
                      className="text-center py-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <p className="text-gray-500 font-medium">
                        You've reached the end of our creative journey... for now!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="fixed bottom-8 right-8 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-24 h-0.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                }}
              />
            </div>
            <motion.span 
              className="text-xs font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Scroll
            </motion.span>
          </div>
        </motion.div>
      </div>
      


      {/* Global styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;