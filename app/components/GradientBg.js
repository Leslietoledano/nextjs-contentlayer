'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function GradientBg(){
     const bgRef = useRef();

     useGSAP(() => {
            const tl = gsap.timeline({
                repeat: -1,
                yoyo: true,
            })

            tl.to(bgRef.current, {
                duration: 10,
                "--gradient-pos": "100% 100%",
                ease: "sine.inOut",
            });
     }, {scope: bgRef});

     return (
        <div
            ref={bgRef}
            className='moving-gradient'
        />
     );
}