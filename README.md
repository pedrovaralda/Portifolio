# Developer Portfolio & Engineering Showcase

A clean, minimalist, editorial developer portfolio built for senior software engineers, full-stack developers, and engineering leaders to present real-world projects and impact to tech recruiters.

Optimized for **instant zero-config deployment on [Vercel](https://vercel.com)**.

---

## ⚡ Design Aesthetic & Engineering Philosophy

- **Bilingual (PT-BR / EN-US)**: Instant client-side language toggle button with complete translations across the whole portfolio, browser language auto-detection, and `localStorage` persistence.
- **Editorial & Content-Focused**: Avoids AI design tropes (no glossy gradients, no 3D glassmorphism, no neon glows).
- **High-Contrast Typography**: System sans-serif paired with monospace fonts for metrics, dates, and technology tags.
- **Micro-Interactions**: Crisp 150ms hover states, instant email copy with visual feedback, and live status ping.
- **Deep Zinc Palette**: Designed with a refined dark theme (`#09090b` / `zinc-950`) with high contrast text (`zinc-100` / `zinc-400`).
- **Recruiter Optimized**:
  - Direct, accessible CTA buttons for **GitHub**, **LinkedIn**, and **Resume**.
  - **Live Availability Badge** ("Available for new roles" with emerald pulse).
  - Fast-facts grid (Years of Experience, Core Stack, Production Scale, Work Preference).
  - Impact-oriented project cards displaying quantifiable metrics (e.g. *Reduced p99 latency from 140ms to 24ms*).
  - Career history timeline with bulleted engineering achievements.
  - Categorized skill grid with precision SVG icons.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict type checking)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Precision SVG Brand Icons
- **Deployment**: [Vercel](https://vercel.com/) (Static Optimization & Edge Caching)

---

## 📁 Project Structure

```text
├── public/
│   └── resume.pdf                 # Replace with your actual resume PDF
├── src/
│   ├── app/
│   │   ├── globals.css            # Dark mode styles, scrollbars, Tailwind
│   │   ├── layout.tsx             # SEO metadata, OpenGraph, font setup
│   │   └── page.tsx               # Primary page layout & section assembly
│   ├── components/
│   │   ├── Header.tsx             # Minimalist sticky header with status badge
│   │   ├── Hero.tsx               # Summary, primary CTAs & fast facts
│   │   ├── FeaturedProjects.tsx   # Card layout with metrics & repo links
│   │   ├── Experience.tsx         # Career history timeline with bullets
│   │   ├── Skills.tsx             # Grouped icon grid with hover states
│   │   ├── ContactSection.tsx     # Direct channels, time zone SLA
│   │   ├── CopyEmailButton.tsx    # Interactive clipboard copy with feedback
│   │   ├── Footer.tsx             # Minimalist footer & back-to-top
│   │   └── icons/
│   │       └── TechIcons.tsx      # Curated SVG icons for tech stacks
│   ├── data/
│   │   └── portfolio.ts           # Single source of truth for all data
│   ├── lib/
│   │   └── utils.ts               # Class merging utilities (tailwind-merge, clsx)
│   └── types/
│       └── portfolio.ts           # Strongly-typed data contracts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## ✏️ How to Customize Your Portfolio

All personal information, experience, projects, and skills are decoupled from the UI and live in a single typed file:

👉 **[`src/data/portfolio.ts`](src/data/portfolio.ts)**

You can update:
1. **Personal Details**: Name, role title, specialization, bio, location, time zone, email, and social links.
2. **Availability Status**: Toggle `isOpen: true/false` and update status text.
3. **Projects**: Add your own GitHub repositories, live demo URLs, tech tags, and quantifiable impact metrics.
4. **Experience**: Customize roles, companies, dates, and bulleted achievements.
5. **Resume**: Replace `public/resume.pdf` with your actual resume file.

---

## 🌐 Deploy to Vercel (Zero Config)

### Option A: Via GitHub (Recommended)

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: initial developer portfolio"
   ```
2. Push to your GitHub repository:
   ```bash
   git remote add origin https://github.com/your-username/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new).
4. Select your GitHub repository.
5. Vercel will automatically detect Next.js — click **Deploy**!

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel
```
Select the default settings and your site will be live within seconds.
