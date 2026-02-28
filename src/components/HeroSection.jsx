'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import socials from '@/data/social';
import { gsap } from 'gsap';
import { FaLinkedin, FaGithub, FaTwitter, FaKaggle, FaMedium } from 'react-icons/fa';

const NeuralNetworkScene = dynamic(
    () => import('@/components/three/NeuralNetworkScene'),
    { ssr: false }
);

const titles = [
    'AI/ML Researcher',
    'Deep Learning Engineer',
    'Systems Builder',
];

export default function HeroSection() {
    const sectionRef = useRef(null);
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter effect
    useEffect(() => {
        const current = titles[titleIndex];
        let timeout;

        if (!isDeleting && displayText.length < current.length) {
            timeout = setTimeout(() => {
                setDisplayText(current.slice(0, displayText.length + 1));
            }, 60);
        } else if (!isDeleting && displayText.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText.length > 0) {
            timeout = setTimeout(() => {
                setDisplayText(current.slice(0, displayText.length - 1));
            }, 30);
        } else if (isDeleting && displayText.length === 0) {
            setIsDeleting(false);
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, titleIndex]);

    // Staggered entrance
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const items = el.querySelectorAll('.hero-animate');
        gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.3,
            }
        );
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="chapter-section flex items-center justify-center relative"
            style={{ background: 'var(--bg-deep)' }}
        >
            <NeuralNetworkScene />

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Overline */}
                <p className="hero-animate text-xs uppercase tracking-[0.4em] text-[var(--accent-blue)] font-mono mb-6 opacity-0">
                    Portfolio · 2026
                </p>

                {/* Name */}
                <h1 className="hero-animate text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4 opacity-0"
                    style={{
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 40%, #60a5fa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Viraj Paradkar
                </h1>

                {/* Typewriter tagline */}
                <div className="hero-animate h-10 flex items-center justify-center opacity-0">
                    <p className="text-xl md:text-2xl font-mono text-[var(--text-secondary)]">
                        {displayText}
                        <span className="animate-cursor-blink text-[var(--accent-blue)] ml-0.5">|</span>
                    </p>
                </div>

                {/* Blurb */}
                <p className="hero-animate text-base md:text-lg lg:text-xl max-w-2xl mx-auto mt-6 leading-relaxed opacity-0 font-medium"
                    style={{
                        color: '#e2e8f0',
                        textShadow: '0 0 30px rgba(96,165,250,0.25), 0 0 60px rgba(96,165,250,0.1)',
                    }}
                >
                    Master&apos;s in AI @ Northeastern University. I build production-grade,
                    research-driven systems — from real-time detection pipelines to multilingual LLM agents.
                </p>

                {/* Status badge */}
                <div className="hero-animate mt-6 opacity-0">
                    <span className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border border-[var(--border-accent)] bg-[rgba(96,165,250,0.05)]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[var(--text-secondary)]">Seeking Applied AI & ML Research Roles · Summer &rsquo;26</span>
                    </span>
                </div>

                {/* CTAs */}
                <div className="hero-animate flex items-center justify-center gap-4 mt-8 opacity-0">
                    <Link
                        href={socials.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-lg bg-[var(--accent-blue)] text-[var(--bg-deep)] font-semibold text-sm hover:bg-[#93bbfd] transition-all duration-300 hover:shadow-[0_0_20px_var(--glow-blue)]"
                    >
                        Resume
                    </Link>
                    <Link
                        href="#contact"
                        className="px-6 py-3 rounded-lg border border-[var(--border-accent)] text-[var(--accent-blue)] font-semibold text-sm hover:bg-[rgba(96,165,250,0.08)] transition-all duration-300"
                    >
                        Get in Touch
                    </Link>
                </div>

                {/* Social row */}
                <div className="hero-animate flex items-center justify-center gap-5 mt-8 opacity-0">
                    {[
                        { href: socials.linkedin, Icon: FaLinkedin },
                        { href: socials.github, Icon: FaGithub },
                        { href: socials.twitter, Icon: FaTwitter },
                        { href: socials.medium, Icon: FaMedium },
                        { href: socials.kaggle, Icon: FaKaggle },
                    ].map(({ href, Icon }, i) => (
                        <Link key={i} href={href} target="_blank" rel="noopener noreferrer"
                            className="text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors duration-300"
                        >
                            <Icon className="w-5 h-5" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-mono">
                    Scroll
                </span>
                <div className="w-px h-8 bg-gradient-to-b from-[var(--accent-blue)] to-transparent opacity-50" />
            </div>
        </section>
    );
}