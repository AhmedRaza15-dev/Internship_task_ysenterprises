import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3
      });
      gsap.to(follower, {
        scale: 2,
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3
      });
      gsap.to(follower, {
        scale: 1,
        duration: 0.3
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden lg:block fixed w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ left: '-100px', top: '-100px' }}
      />
      <div
        ref={followerRef}
        className="hidden lg:block fixed w-8 h-8 border-2 border-amber-500 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ left: '-100px', top: '-100px', transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default Cursor;