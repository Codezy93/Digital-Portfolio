'use client';

import DynamicMemoji from "@/components/DynamicMemoji";
import SplashCursor from "@/components/SplashCursor";
import socials from "@/data/social";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter, FaKaggle, FaMedium } from 'react-icons/fa';

const homeSkills = [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Computer Vision",
    "Natural Language Processing",
    "Reinforcement Learning",
    "Generative AI",
    "LLM Provider",
    "Pattern Recognition",
    "Data Analytics",
    "Vector Databases",
    "Transformers",
    "RAG",
    "AI Agents",
    "Prompt Engineering",
];

const blurb = `I’m a Master’s in AI student at Northeastern University, passionate about building real-world applications of AI/ML. I specialize in turning algorithms into dependable systems, transforming raw data into actionable insights, and going beyond routine automation.`;

function ScrollPrompt() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
        setIsVisible(window.scrollY < 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-300 z-50 ${
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        >
        <ChevronDown className="w-7 h-7 text-blue-600 animate-bounce bg-blue-100 rounded-4xl" />
        </div>
    );
}

export default function HeroSection() {
    return (
        <>
        <section className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-slate-900 to-black ">
            <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 opacity-50 z-0 pointer-events-none">
                <SplashCursor />
            </div>
            <div className="relative w-full h-screen overflow-hidden">
                <div className="relative z-10 flex flex-col items-center justify-start pt-6 h-full text-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Hey, I&apos;m Viraj</h1>

                <h2 className="text-md sm:text-xl text-gray-300 font-medium">
                    Master&apos;s in Artificial Intelligence @{" "}
                    <strong className="text-red-600">Northeastern University</strong>
                </h2>

                <h3 className="text-sm text-gray-400 hidden sm:block">
                    VIT Alumnus · 📍 Boston · Open for Summer &rsquo;26 Internships
                </h3>

                <p className="text-sm sm:text-base text-gray-400 max-w-xl hidden sm:block">
                    {blurb}
                </p>

                <span className="text-sm rounded-full bg-white px-4 py-1 text-gray-800 hidden sm:inline shadow-md shadow-white/50">
                    <strong className="text-green-600">🟢</strong> Actively Seeking Applied AI & ML Research Roles
                </span>

                <DynamicMemoji />

                <div className="flex items-center justify-center mt-4 gap-3">
                    <Link
                    href={socials.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded-full shadow-md text-sm font-medium"
                    >
                    Resume
                    </Link>
                    <Link
                    href="#contact"
                    className="bg-white text-blue-600 hover:text-blue-800 transition px-4 py-2 rounded-full shadow-md text-sm font-medium"
                    >
                    Get in Touch
                    </Link>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-2 mt-4 max-w-3xl px-2">
                    {homeSkills.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                        {skill}
                    </span>
                    ))}
                </div>
                </div>
                <div className="absolute flex gap-3 top-3 right-4 z-20">
                <Link href={socials.linkedin} target="_blank">
                    <FaLinkedin className="text-white hover:text-slate-500 transition w-5 h-5" />
                </Link>
                <Link href={socials.github} target="_blank">
                    <FaGithub className="text-white hover:text-slate-500 transition w-5 h-5" />
                </Link>
                <Link href={socials.twitter} target="_blank">
                    <FaTwitter className="text-white hover:text-slate-500 transition w-5 h-5" />
                </Link>
                <Link href={socials.medium} target="_blank">
                    <FaMedium className="text-white hover:text-slate-500 transition w-5 h-5" />
                </Link>
                <Link href={socials.kaggle} target="_blank">
                    <FaKaggle className="text-white hover:text-slate-500 transition w-5 h-5" />
                </Link>
                </div>
            </div>
            <ScrollPrompt />
        </div>
        </section>
        </>
    );
}