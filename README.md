# Moch. Mizan Ghodafail — Personal Website

A premium, minimalist, and responsive developer portfolio built with React, TypeScript, and Tailwind CSS. The design uses a dark forest green monospace aesthetic powered entirely by the **Roboto Mono** font family and interactive animations.

## 🚀 Technologies Used

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) & ScrollTrigger
- **Visuals**: [RetroGlobe](https://github.com/mochmizan/personal-website) (Three.js/Canvas-based)
- **Deployment**: [Vercel](https://vercel.com/) (configured with clean URLs and custom asset caching)

## 📦 Project Structure

```text
portfolio/
├── public/                 # Static assets (favicons, images, projects, webp logos)
├── src/
│   ├── components/         # Reusable UI components (Globe, etc.)
│   ├── pages/              # Landing page layout and sub-elements
│   ├── types/              # TypeScript typings
│   ├── App.tsx             # Root component
│   ├── index.css           # Custom styling (forest green variables, custom buttons)
│   └── main.tsx            # Application entry point
├── vercel.json             # Vercel static routing and headers configuration
└── tailwind.config.js      # Tailwind configurations (Roboto Mono font mapping)
```

## 🛠️ Local Development

Follow these steps to run the project locally:

### 1. Prerequisites
Ensure you have **Node.js** (version 20+ recommended) and **npm** installed on your system.

### 2. Install Dependencies
Navigate to the `portfolio` folder and install the required modules:
```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
Compile the TypeScript code and bundle static files into the `dist/` folder:
```bash
npm run build
```

### 5. Preview Production Build
Run a local web server to preview your built bundle:
```bash
npm run preview
```

## 🌐 Deployment to Vercel

This repository is optimized for deployment on Vercel's Free Tier:
- Push your changes to `main` and Vercel will automatically trigger a clean static build.
- Caching for assets and clean routing are handled by `vercel.json` without requiring serverless compute functions.
