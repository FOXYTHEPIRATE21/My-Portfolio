# Miguel Angel Osorio — Portfolio

Personal portfolio website for **Miguel Angel Osorio Hernandez**, a Fullstack Developer based in Colombia.

Built with **React + Vite + Tailwind CSS v4**.

## Features

- Dark, minimalist design with violet accents
- Smooth scroll navigation with fixed navbar
- **Hero** section with tech stack badges and CTA buttons
- **Projects** section with 3 cards (Taxi App, Trading Tool, School Admin)
- **About** section with professional bio and skill grid
- **Contact** section with email and GitHub links
- Fade-in animations and hover effects
- Fully responsive (mobile + desktop)

## Tech Stack

| Layer    | Technologies                        |
|----------|-------------------------------------|
| Frontend | React, Flutter                      |
| Backend  | FastAPI, PHP                        |
| Database | PostgreSQL                          |
| Cloud    | Firebase, AWS, Cloudflare, Docker   |

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build   # Outputs to dist/
```

Deploy to [Vercel](https://vercel.com) by connecting the repository — no extra configuration needed.

## Project Structure

```
src/
  components/
    Navbar.jsx     # Fixed top navigation
    Hero.jsx       # Landing hero section
    Projects.jsx   # Project cards grid
    About.jsx      # Bio + skill grid
    Contact.jsx    # Email + GitHub links
  App.jsx
  index.css        # Tailwind + custom animations
```
