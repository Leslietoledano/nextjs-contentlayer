'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function AnimatedContent({ children }) {
  const container = useRef();

  useGSAP(() => {
    // Basic Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.fade-in', {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    })
    .from('li', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, "-=0.5"); // Starts half a second early for a smooth flow

  }, { scope: container }); // Scoping prevents GSAP from selecting elements outside this component

  return <div ref={container}>{children}</div>;
}