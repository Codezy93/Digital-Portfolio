"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ContactSection (GSAP-Enhanced)
 * Path: /components/ContactSection.jsx
 * Tailwind-only UI + subtle entrance animations
 */
export default function ContactSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gradient heading shimmer + rise
      gsap.fromTo(
        headingRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      gsap.to(headingRef.current, {
        backgroundPositionX: "200%",
        duration: 6,
        repeat: -1,
        ease: "none",
      });

      // Stagger the two cards when they enter viewport
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending…" });

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ type: "error", message: "Please fill in name, email, and message." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        e.currentTarget.reset();
        setStatus({ type: "success", message: "Message sent! I’ll get back to you soon." });
      } else {
        throw new Error("Non-200 response");
      }
    } catch (err) {
      const subject = encodeURIComponent(payload.subject || "Website contact");
      const body = encodeURIComponent(`From: ${payload.name} <${payload.email}>

${payload.message}`);
      window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
      setStatus({ type: "idle", message: "Opening your email client…" });
    }
  }

  const socials = [
    { label: "GitHub", href: "https://github.com/Codezy93", icon: GitHubIcon },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/viraj-paradkar/", icon: LinkedInIcon },
    { label: "X (Twitter)", href: "https://x.com/Codezy93", icon: XIcon },
    { label: "Kaggle", href: "https://www.kaggle.com/virajparadkar", icon: KaggleIcon },
    { label: "Medium", href: "https://medium.com/@virajsparadkar", icon: MediumIcon },
    { label: "Google Scholar", href: "https://scholar.google.com/", icon: ScholarIcon },
    { label: "Email", href: "mailto:virajsparadkar@gmail.com", icon: MailIcon },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full h-screen p-4 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-purple-950 "
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-center font-mono text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-[length:200%_auto] bg-clip-text text-transparent"
        >
          CONTACT;
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-300">
          Building something cool, hiring, or want to jam on AI/ML? Drop a note or find me on the platforms below.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Info + Socials */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="rounded-2xl border border-zinc-800/60 bg-black/30 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-white">Where to find me</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <PinIcon className="h-5 w-5" /> Boston, MA (open to relocate for the right role)
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <MailIcon className="h-5 w-5" /> virajsparadkar@gmail.com
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-zinc-500">Profiles</h4>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900/70"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="group-hover:underline">{label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:virajsparadkar@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900/70"
                >
                  <MailIcon className="h-4 w-4" /> Email me directly
                </a>
                <a
                  href="https://calendly.com/virajsparadkar/30min"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900/70"
                >
                  <CalendarIcon className="h-4 w-4" /> Book a quick call
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={(el) => (cardsRef.current[1] = el)} className="lg:col-span-2">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-zinc-800/60 bg-black/30 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-zinc-200">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-zinc-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-zinc-200">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-zinc-600"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="text-sm font-medium text-zinc-200">Subject <span className="text-zinc-500">(optional)</span></label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-zinc-600"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="text-sm font-medium text-zinc-200">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-1 w-full resize-y rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-zinc-600"
                ></textarea>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
                >
                  {status.type === "loading" ? "Sending…" : "Send message"}
                </button>
                {status.message && (
                  <p className={`text-sm ${status.type === "error" ? "text-red-400" : "text-zinc-400"}`}>
                    {status.message}
                  </p>
                )}
              </div>

              <p className="mt-4 text-xs text-zinc-500">
                By submitting, you agree to be contacted about your inquiry. No spam — promise.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Icons (inline SVG, no external deps) ---------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function IconBase({ className, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function MailIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="m22 7-10 6L2 7" />
    </IconBase>
  );
}

function PinIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 21s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" />
      <circle cx="12" cy="10" r="3" />
    </IconBase>
  );
}

function ClockIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </IconBase>
  );
}

function CalendarIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </IconBase>
  );
}

function GitHubIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.43c.58.1.8-.25.8-.56V20.1c-3.26.72-3.95-1.57-3.95-1.57-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.72-1.56-2.6-.3-5.34-1.32-5.34-5.88 0-1.3.46-2.35 1.22-3.17-.12-.3-.53-1.52.11-3.16 0 0 1-.32 3.3 1.21a11.4 11.4 0 0 1 6 0c2.28-1.53 3.28-1.21 3.28-1.21.64 1.64.23 2.86.12 3.16.77.82 1.22 1.86 1.22 3.16 0 4.58-2.75 5.58-5.37 5.88.4.35.77 1.04.77 2.1v3.11c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </IconBase>
  );
}

function LinkedInIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </IconBase>
  );
}

function XIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 3l18 18M21 3 3 21" />
    </IconBase>
  );
}

function KaggleIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 4v16M5 12l13-8M5 12l13 8" />
    </IconBase>
  );
}

function MediumIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 7l4 10 4-10 4 10 4-10" />
    </IconBase>
  );
}

function ScholarIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5Z" />
      <path d="M12 13c-4.5 0-8 2-8 4.5V21h16v-3.5c0-2.5-3.5-4.5-8-4.5Z" />
    </IconBase>
  );
}