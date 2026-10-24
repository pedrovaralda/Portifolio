"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, FileText, Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personal, socials } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-zinc-950/85 backdrop-blur-md border-b border-zinc-850 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Name & Status */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-sm"
        >
          <div className="flex flex-col">
            <span className="font-mono text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
              {personal.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              {personal.roleTitle}
            </span>
          </div>
          {personal.availability.isOpen && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Available</span>
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md border border-transparent hover:border-zinc-800 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md border border-transparent hover:border-zinc-800 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-200 transition-all duration-150"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-5 bg-zinc-950 border-b border-zinc-850 mt-2 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-mono text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-zinc-850 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-zinc-800 bg-zinc-900 text-zinc-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
