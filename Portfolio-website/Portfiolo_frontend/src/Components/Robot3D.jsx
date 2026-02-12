import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Robot3D = () => {
  const robotRef = useRef(null);
  const headRef = useRef(null);
  const armLeftRef = useRef(null);
  const armRightRef = useRef(null);
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const [isWaving, setIsWaving] = useState(false);

  
  useEffect(() => {
    // Initial greeting animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    
    // Wave animation
    tl.to(armRightRef.current, {
      rotation: -45,
      duration: 0.3,
      ease: 'power2.out',
      transformOrigin: 'top center'
    })
    .to(armRightRef.current, {
      rotation: -20,
      duration: 0.2,
      yoyo: true,
      repeat: 3,
      transformOrigin: 'top center'
    })
    .to(armRightRef.current, {
      rotation: 0,
      duration: 0.3,
      ease: 'power2.in',
      transformOrigin: 'top center'
    });

    // Blinking animation
    const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    blinkTl.to([eyeLeftRef.current, eyeRightRef.current], {
      scaleY: 0.1,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    // Breathing animation
    gsap.to(robotRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Mouse follow effect
    const handleMouseMove = (e) => {
      const rect = robotRef.current.getBoundingClientRect();
      const robotX = rect.left + rect.width / 2;
      const robotY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate angle to mouse
      const deltaX = mouseX - robotX;
      const deltaY = mouseY - robotY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      // Rotate head slightly toward mouse
      gsap.to(headRef.current, {
        rotation: angle * 0.05,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Move eyes toward mouse
      const eyeMoveX = (deltaX / window.innerWidth) * 3;
      const eyeMoveY = (deltaY / window.innerHeight) * 3;
      
      gsap.to([eyeLeftRef.current, eyeRightRef.current], {
        x: eyeMoveX,
        y: eyeMoveY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
      blinkTl.kill();
    };
  }, []);

  return (
    <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div ref={robotRef} className="relative w-64 h-80">
        {/* Robot Head */}
        <div
          ref={headRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32"
        >
          {/* Head container */}
          <div className="relative w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-2xl border-4 border-amber-500/50 shadow-2xl shadow-amber-500/20">
            {/* Antenna */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-amber-500">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>

            {/* Eyes */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-6">
              <div
                ref={eyeLeftRef}
                className="w-6 h-6 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
              >
                <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1"></div>
              </div>
              <div
                ref={eyeRightRef}
                className="w-6 h-6 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
              >
                <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1"></div>
              </div>
            </div>

            {/* Mouth */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                <path
                  d="M 0 6 Q 20 12 40 6"
                  stroke="#d4af37"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-28 h-32 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-xl border-4 border-amber-500/30">
          {/* Chest light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500/30 rounded-full">
            <div className="w-full h-full bg-amber-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Arms */}
        <div
          ref={armLeftRef}
          className="absolute top-32 left-4 w-6 h-24 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-full border-2 border-amber-500/30"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-zinc-700 rounded-full border-2 border-amber-500/30"></div>
        </div>
        <div
          ref={armRightRef}
          className="absolute top-32 right-4 w-6 h-24 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-full border-2 border-amber-500/30"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-zinc-700 rounded-full border-2 border-amber-500/30"></div>
        </div>

        {/* Legs */}
        <div className="absolute bottom-8 left-8 w-6 h-20 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-lg border-2 border-amber-500/30">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-zinc-700 rounded-full border-2 border-amber-500/30"></div>
        </div>
        <div className="absolute bottom-8 right-8 w-6 h-20 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-lg border-2 border-amber-500/30">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-zinc-700 rounded-full border-2 border-amber-500/30"></div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full"></div>
      </div>

      {/* Speech bubble */}
      <div className="absolute -left-48 top-8 bg-zinc-800 border-2 border-amber-500/50 rounded-2xl p-4 shadow-xl animate-pulse">
        <p className="text-amber-400 text-sm font-semibold">Hello! 👋</p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-amber-500/50"></div>
        </div>
      </div>
    </div>
  );
};

export default Robot3D;