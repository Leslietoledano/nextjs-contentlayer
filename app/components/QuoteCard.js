'use client';
import React, { useRef } from 'react';
import Markdoc from '@markdoc/markdoc';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function QuoteCard({ renderable, page }) {
  const cardRef = useRef();

  useGSAP(() => {
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 90%",
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
    });
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="quote-card">
      <div className="quote-content">
        {Markdoc.renderers.react(renderable, React)}
      </div>
      <cite>Page Num. {page}</cite>
    </div>
  );
}