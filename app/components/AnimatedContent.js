'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedContent({ children }) {
  const container = useRef();

  useGSAP(() => {
    // 1. Initial Hero Animations (Run immediately)
    gsap.from('.fade-in', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out'
    });

    // 2. Scroll Animation for the List
    gsap.from('li', {
      scrollTrigger: {
        trigger: 'ul',      // Animation starts when the <ul> enters the screen
        start: 'top 85%',   // Start when the top of the list is 85% down the screen
        toggleActions: 'play none none reverse', // Plays forward on scroll down, reverses on scroll up
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.2)'
    });

  }, { scope: container }); // Scoping prevents GSAP from selecting elements outside this component

  return <div ref={container} style={{ padding: '40px' }}>{children}</div>;
}