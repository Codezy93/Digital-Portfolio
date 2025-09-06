'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import skills from '@/data/skills'; // Assuming you have a skills data file

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
    const sectionRef = useRef(null);
    const categories = Object.keys(skills);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        const trigger = sectionRef.current;

        ScrollTrigger.create({
            trigger: trigger,
            start: 'top 0%',
            end: 'bottom 10%',
            scrub: true,
            pin: true,
            markers: false,
            onEnter: () => setActiveIndex(0),
            onLeave: () => setActiveIndex(categories.length - 1),
            onEnterBack: () => setActiveIndex(0),
            onLeaveBack: () => setActiveIndex(0), // this ensures reset when scrolling above
            onUpdate: (self) => {
                const progress = self.progress;
                const total = categories.length;
                let newIndex = Math.floor(progress * total);

                if (progress <= 0) newIndex = 0;
                if (progress >= 1) newIndex = total - 1;

                if (newIndex !== activeIndex) {
                    setActiveIndex(newIndex);
                }
            },
        });
    }, { scope: sectionRef });

    return (
    <section ref={sectionRef} className="relative w-full h-screen p-4 overflow-hidden bg-gradient-to-r from-slate-900 to-black ">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-mono">SKILLS;</h1>
        <div className="flex w-full h-full">
            <Link href="/skills" className="absolute bottom-4 left-4 text-slate-800 hover:text-slate-900 transition-colors duration-300 bg-blue-300 p-4 w rounded-3xl w-sm hover:bg-blue-400 text-center font-bold text-xl">Certifications</Link>
            {/* Sidebar */}
            <ul className="w-2/5 flex flex-col justify-start items-start gap-4 pt-5 pr-6">
            {categories.map((category, index) => (
                <li
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`subcategory-${index} cursor-pointer ${
                    index === activeIndex
                    ? "font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                    : "text-slate-400 text-1xl"
                } min-w-3/5 p-2 rounded-xl`}
                >
                {category}
                </li>
            ))}
            </ul>

            {/* Content Area */}
            <div className="w-3/5 relative">
            {categories.map((category, index) => (
                <div
                key={index}
                className={`absolute transition-opacity duration-500 ease-in-out ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                } ${index === activeIndex ? "z-10" : "z-0"}`}
                >
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-mono mb-4">
                    {category}
                </h1>
                <div className="flex flex-wrap text-slate-800 font-mono gap-4">
                    {Object.entries(skills[category]).map(([skill, imageUrl], i) => (
                        <span key={i} className="mb-1 flex items-center gap-2 p-2 bg-indigo-400 text-white rounded-xl shadow-md shadow-gray-600 border-slate-400 border-3">
                            {imageUrl && (
                                <img src={`/icons/${imageUrl}.svg`} alt={skill} className="w-7 h-7 inline-block" />
                            )}
                            {skill}
                        </span>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}