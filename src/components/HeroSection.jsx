'use client';

import React, { useEffect, useRef, useState } from 'react';
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
            }, 35);
        } else if (isDeleting && displayText.length === 0) {
            setIsDeleting(false);
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, titleIndex]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const items = el.querySelectorAll('.hero-animate');
        gsap.fromTo(
            items,
            { opacity: 0, y: 36 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: 'power3.out',
                delay: 0.18,
            }
        );
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="chapter-section section-tone relative flex items-center overflow-hidden"
        >
            <NeuralNetworkScene />

            <div
                className="absolute inset-0 z-[1] pointer-events-none opacity-60"
                style={{
                    background:
                        'radial-gradient(circle at 16% 20%, rgba(125,211,252,0.16), transparent 34%), radial-gradient(circle at 86% 15%, rgba(203,213,225,0.12), transparent 32%)',
                }}
            />
            <div
                className="absolute inset-0 z-[1] pointer-events-none opacity-20"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
                    backgroundSize: '52px 52px',
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-28">
                <div className="grid items-center gap-10 lg:grid-cols-[1.22fr_0.78fr]">
                    <div className="space-y-6">
                        <p className="hero-animate eyebrow-label">Portfolio 2026</p>

                        <h1 className="hero-animate text-[clamp(3rem,9vw,7.3rem)] font-black leading-[0.9] tracking-[-0.04em] text-slate-50">
                            Viraj Paradkar
                        </h1>

                        <p className="hero-animate max-w-3xl text-lg font-semibold text-cyan-100 sm:text-2xl">
                            AI/ML Engineer building research-backed systems for production impact.
                        </p>

                        <div className="hero-animate inline-flex h-12 items-center rounded-md border border-slate-200/25 bg-slate-200/10 px-4 font-mono text-base text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] sm:text-xl">
                            {displayText}
                            <span className="ml-1 animate-cursor-blink text-cyan-300">|</span>
                        </div>

                        <p className="hero-animate max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                            MS in AI at Northeastern University. I design and ship full-stack AI products, from
                            real-time computer vision pipelines to multilingual LLM agents.
                        </p>

                        <div className="hero-animate flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.16em] text-emerald-100">
                                Open to Applied AI Roles
                            </span>
                            <span className="rounded-full border border-slate-200/25 bg-slate-200/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.16em] text-slate-200">
                                Summer 2026
                            </span>
                        </div>
                    </div>

                    <aside className="w-full max-w-md space-y-4 lg:justify-self-end">
                        <div className="hero-animate surface-card rounded-[1.5rem] p-5">
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300">
                                Quick Actions
                            </p>

                            <div className="mt-4 grid gap-3">
                                <Link
                                    href={socials.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md border border-cyan-200/65 bg-[linear-gradient(135deg,#a5f3fc_0%,#7dd3fc_48%,#93c5fd_100%)] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(56,189,248,0.35)]"
                                >
                                    View Resume
                                </Link>
                                <Link
                                    href="/projects"
                                    className="rounded-md border border-slate-200/35 bg-slate-200/10 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-slate-100 transition-all duration-300 hover:border-cyan-200/60 hover:text-cyan-100"
                                >
                                    See All Projects
                                </Link>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                {[
                                    { href: socials.linkedin, Icon: FaLinkedin },
                                    { href: socials.github, Icon: FaGithub },
                                    { href: socials.twitter, Icon: FaTwitter },
                                    { href: socials.medium, Icon: FaMedium },
                                    { href: socials.kaggle, Icon: FaKaggle },
                                ].map(({ href, Icon }, i) => (
                                    <Link
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200/30 bg-slate-200/10 text-slate-200 transition-all duration-300 hover:border-cyan-200/70 hover:text-cyan-100"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="hero-animate surface-card rounded-[1.5rem] p-5">
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                                Professional Snapshot
                            </p>

                            <div className="mt-4 space-y-3">
                                <div className="rounded-xl border border-slate-200/15 bg-slate-200/10 p-3">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">Focus</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-100">
                                        Production AI and Applied Research
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200/15 bg-slate-200/10 p-3">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">Strength</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-100">
                                        Computer Vision, LLM Systems, MLOps
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200/15 bg-slate-200/10 p-3">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">Location</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-100">Boston, Massachusetts</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Scroll</span>
                <div className="h-9 w-px bg-gradient-to-b from-slate-100/70 to-transparent" />
            </div>
        </section>
    );
}
