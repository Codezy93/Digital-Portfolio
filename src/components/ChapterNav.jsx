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
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
            {chapters.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="group flex items-center gap-3 cursor-pointer"
                    aria-label={`Go to ${label}`}
                >
                    <span
                        className={`text-[10px] uppercase tracking-widest font-mono transition-all duration-300 ${active === id
                            ? 'text-[var(--accent-blue)] opacity-100 translate-x-0'
                            : 'text-[var(--text-muted)] opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
                            }`}
                    >
                        {label}
                    </span>
                    <span
                        className={`block rounded-full transition-all duration-300 ${active === id
                            ? 'w-3 h-3 bg-[var(--accent-blue)] shadow-[0_0_8px_var(--accent-blue)]'
                            : 'w-2 h-2 bg-[var(--text-muted)] opacity-40 group-hover:opacity-70'
                            }`}
                    />
                </button>
            ))}
        </nav>
    );
}
