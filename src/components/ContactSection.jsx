"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeading from "@/components/ChapterHeading";
import socials from "@/data/social";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter, FaKaggle, FaMedium } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll('.contact-animate');
    if (!items?.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://formspree.io/f/xovdgjyj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus('sent');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const socialLinks = [
    { href: socials.github, Icon: FaGithub, label: 'GitHub' },
    { href: socials.linkedin, Icon: FaLinkedin, label: 'LinkedIn' },
    { href: socials.twitter, Icon: FaTwitter, label: 'X / Twitter' },
    { href: socials.kaggle, Icon: FaKaggle, label: 'Kaggle' },
    { href: socials.medium, Icon: FaMedium, label: 'Medium' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="chapter-section py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{
        background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <ChapterHeading
          number="05"
          title="Let's Connect"
          subtitle="Whether it's a research collaboration, an engineering role, or just a conversation about AI — I'd love to hear from you."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="contact-animate opacity-0">
              <label className="block text-xs uppercase tracking-wider font-mono text-[var(--text-muted)] mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-dim)] text-[var(--text-primary)] text-sm focus:border-[var(--accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] transition-colors placeholder:text-[var(--text-muted)]"
                placeholder="Your name"
              />
            </div>

            <div className="contact-animate opacity-0">
              <label className="block text-xs uppercase tracking-wider font-mono text-[var(--text-muted)] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-dim)] text-[var(--text-primary)] text-sm focus:border-[var(--accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] transition-colors placeholder:text-[var(--text-muted)]"
                placeholder="your@email.com"
              />
            </div>

            <div className="contact-animate opacity-0">
              <label className="block text-xs uppercase tracking-wider font-mono text-[var(--text-muted)] mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-dim)] text-[var(--text-primary)] text-sm focus:border-[var(--accent-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)] transition-colors resize-none placeholder:text-[var(--text-muted)]"
                placeholder="What's on your mind?"
              />
            </div>

            <div className="contact-animate opacity-0">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3 rounded-xl bg-[var(--accent-blue)] text-[var(--bg-deep)] font-semibold text-sm hover:bg-[#93bbfd] transition-all duration-300 hover:shadow-[0_0_20px_var(--glow-blue)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Sent!' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="text-xs text-red-400 mt-2">Something went wrong. Try again.</p>
              )}
            </div>
          </form>

          {/* Info & Social */}
          <div className="space-y-8">
            <div className="contact-animate opacity-0">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
                Find me elsewhere
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {socialLinks.map(({ href, Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border-dim)] hover:border-[var(--border-accent)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                    <span className="ml-auto text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="contact-animate opacity-0">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Location
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                📍 Boston, MA
              </p>
            </div>

            <div className="contact-animate opacity-0">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Availability
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Open for Summer &rsquo;26 internships and research collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-20 pt-8 border-t border-[var(--border-dim)]">
        <p className="text-xs text-[var(--text-muted)] text-center font-mono">
          © {new Date().getFullYear()} Viraj Paradkar. Built with Next.js, Three.js & GSAP.
        </p>
      </div>
    </section>
  );
}