'use client';

import { useEffect, useState } from 'react';

const chapters = [
    { id: 'hero', label: 'Intro' },
    { id: 'skills', label: 'Toolkit' },
    { id: 'projects', label: 'Work' },
    { id: 'experience', label: 'Field' },
    { id: 'academics', label: 'Foundation' },
    { id: 'contact', label: 'Connect' },
];

export default function ChapterNav() {
    const [active, setActive] = useState('hero');

    useEffect(() => {
        const observers = [];

        chapters.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActive(id);
                    }
                },
                { threshold: 0.3 }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 xl:flex">
            <div className="rounded-2xl border border-slate-200/20 bg-slate-200/10 px-3 py-3 backdrop-blur-md shadow-[0_16px_40px_rgba(2,6,23,0.35)]">
                <div className="flex flex-col items-end gap-1.5">
                    {chapters.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            className="group flex w-28 items-center justify-end gap-3 rounded-lg px-2 py-2 text-right transition-colors duration-300 hover:bg-slate-900/45"
                            aria-label={`Go to ${label}`}
                        >
                            <span
                                className={`text-[10px] font-mono uppercase tracking-[0.16em] transition-colors duration-300 ${
                                    active === id ? 'text-cyan-200' : 'text-slate-400 group-hover:text-slate-200'
                                }`}
                            >
                                {label}
                            </span>
                            <span
                                className={`block h-2.5 rounded-full transition-all duration-300 ${
                                    active === id
                                        ? 'w-5 bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.6)]'
                                        : 'w-2.5 bg-slate-500/60 group-hover:bg-slate-300/75'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
