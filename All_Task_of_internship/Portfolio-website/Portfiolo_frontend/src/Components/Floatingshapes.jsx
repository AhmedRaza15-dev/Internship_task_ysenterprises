import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


const FloatingShapes = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const shapes = containerRef.current.querySelectorAll('.floating-shape');

    
    shapes.forEach((shape, index) => {
      // Random floating animation
      gsap.to(shape, {
        y: `${Math.random() * 100 - 50}`,
        x: `${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.2,
      });

      // Rotation animation
      gsap.to(shape, {
        rotationY: 360,
        duration: 20 + Math.random() * 10,
        repeat: -1,
        ease: 'none',
      });

      // Scale pulsing
      gsap.to(shape, {
        scale: 1.1,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cube 1 */}
      <div
        className="floating-shape absolute top-20 left-10 w-32 h-32"
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Triangle */}
      <div className="floating-shape absolute top-40 right-20 w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,10 90,90 10,90"
            fill="url(#triangleGradient)"
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0.2)" />
              <stop offset="100%" stopColor="rgba(251, 191, 36, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Circle */}
      <div className="floating-shape absolute bottom-32 left-1/4 w-24 h-24">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/30 backdrop-blur-sm"></div>
      </div>

      {/* Hexagon */}
      <div className="floating-shape absolute top-1/3 right-1/4 w-36 h-36">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="url(#hexGradient)"
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0.2)" />
              <stop offset="100%" stopColor="rgba(180, 146, 47, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Square */}
      <div className="floating-shape absolute bottom-1/4 right-1/3 w-28 h-28">
        <div className="w-full h-full bg-gradient-to-br from-amber-600/20 to-transparent border border-amber-500/30 backdrop-blur-sm transform rotate-45"></div>
      </div>

      {/* Pentagon */}
      <div className="floating-shape absolute top-1/2 left-1/3 w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,5 95,40 80,90 20,90 5,40"
            fill="url(#pentGradient)"
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="pentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.2)" />
              <stop offset="100%" stopColor="rgba(212, 175, 55, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Small circles cluster */}
      <div className="floating-shape absolute top-1/4 left-1/2 w-20 h-20">
        <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/30"></div>
        <div className="absolute top-2 right-0 w-6 h-6 rounded-full bg-amber-400/20 border border-amber-300/30"></div>
        <div className="absolute bottom-0 left-1/2 w-10 h-10 rounded-full bg-amber-600/20 border border-amber-500/30"></div>
      </div>

      {/* Octagon */}
      <div className="floating-shape absolute bottom-40 right-40 w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
            fill="url(#octGradient)"
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="octGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0.2)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default FloatingShapes;