"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeading from "@/components/ChapterHeading";
import socials from "@/data/social";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter, FaKaggle, FaMedium } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll(".contact-animate");
    if (!items?.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xovdgjyj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus("sent");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const socialLinks = [
    { href: socials.github, Icon: FaGithub, label: "GitHub" },
    { href: socials.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
    { href: socials.twitter, Icon: FaTwitter, label: "X / Twitter" },
    { href: socials.kaggle, Icon: FaKaggle, label: "Kaggle" },
    { href: socials.medium, Icon: FaMedium, label: "Medium" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="chapter-section section-tone px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-16"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ChapterHeading
          number="05"
          title="Let's Connect"
          subtitle="For research collaboration, product engineering, or AI consulting discussions, feel free to reach out."
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <form onSubmit={onSubmit} className="surface-card contact-animate space-y-5 rounded-2xl p-6 opacity-0 md:p-8">
            <div>
              <label className="mb-2 block text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
                Name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300/20 bg-slate-200/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-200/60 focus:outline-none focus:ring-1 focus:ring-cyan-200/45"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
                Email
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300/20 bg-slate-200/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-200/60 focus:outline-none focus:ring-1 focus:ring-cyan-200/45"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full resize-none rounded-lg border border-slate-300/20 bg-slate-200/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-200/60 focus:outline-none focus:ring-1 focus:ring-cyan-200/45"
                placeholder="How can I help?"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-md border border-cyan-200/65 bg-[linear-gradient(135deg,#a5f3fc_0%,#7dd3fc_48%,#93c5fd_100%)] px-8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send Message"}
              </button>
              {status === "error" && (
                <p className="mt-2 text-xs text-red-300">Something went wrong. Try again.</p>
              )}
            </div>
          </form>

          <div className="space-y-6">
            <div className="surface-card contact-animate rounded-2xl p-6 opacity-0 md:p-8">
              <h3 className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                Find me online
              </h3>
              <div className="grid gap-3">
                {socialLinks.map(({ href, Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-slate-300/20 bg-slate-200/10 px-4 py-3 text-slate-300 transition-all duration-300 hover:border-cyan-200/55 hover:text-cyan-100"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                    <span className="ml-auto text-[10px] font-mono uppercase tracking-[0.12em] text-slate-500 transition-colors group-hover:text-slate-200">
                      Open
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="surface-card contact-animate space-y-4 rounded-2xl p-6 opacity-0 md:p-8">
              <div>
                <h3 className="mb-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                  Location
                </h3>
                <p className="text-sm text-slate-300">Boston, MA</p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                  Availability
                </h3>
                <p className="text-sm text-slate-300">
                  Open to Summer 2026 internships and research collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 mx-auto mt-20 max-w-5xl border-t border-slate-300/20 pt-8">
        <p className="text-center font-mono text-xs uppercase tracking-[0.12em] text-slate-500">
          {new Date().getFullYear()} Viraj Paradkar. Built with Next.js, Three.js, and GSAP.
        </p>
      </footer>
    </section>
  );
}
