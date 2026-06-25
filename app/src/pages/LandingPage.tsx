import { useState, useEffect } from 'react';
import { RetroGlobe } from '@/components/RetroGlobe';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onEnter: () => void;
}

const roles = ['Web3 Developer', 'Vibe Coder', 'ML Infrastructure', 'Consensus Builder'];

const specialties = [
  'Internet Engineering Technology @ UGM',
  'AI/ML Engineer in Training',
  'Network & Cyber Security'
];

interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  url: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'RaksaDana',
    year: '2026',
    description: 'AI-powered stock investment dashboard predicting BBCA, BBRI, and BMRI price movements using multivariate LSTM models, with Gemini-generated Indonesian market commentary.',
    tags: ['Python', 'FastAPI', 'Google Gemini API', 'Docker', 'Nuxt.js', 'HuggingFace Spaces', 'Vercel'],
    url: 'https://raksa-dana.vercel.app/',
    image: '/projects/raksadana.png'
  },
  {
    title: 'GCS — UAV Ground Control Station',
    year: '2025',
    description: "Browser-based ground control interface for drone/UAV operation built during Gamaforce UGM's developer recruitment trial, featuring satellite map view and flight simulation tooling.",
    tags: ['React', 'Leaflet', 'Geoman', 'JavaScript', 'Vite'],
    url: '', // Private repo, no link
    image: '/projects/gcs.png'
  },
  {
    title: 'KalkulatorWarisan',
    year: '2024',
    description: 'Islamic inheritance calculator implementing faraid computation rules from Indonesian Ministry of Religious Affairs jurisprudence, including edge-case heir distribution logic.',
    tags: ['PHP', 'Vercel'],
    url: 'https://kalkulator-warisan.vercel.app/',
    image: '/projects/kalkulatorwarisan.png'
  }
];

interface StackItem {
  name: string;
  icon: string;
}

interface StackCategory {
  title: string;
  items: StackItem[];
}

const stackCategories: StackCategory[] = [
  {
    title: 'Programming Language',
    items: [
      { name: 'Typescript', icon: '/images/stack/ts.svg' },
      { name: 'Javascript', icon: '/images/stack/js.svg' },
      { name: 'Golang', icon: '/images/stack/go.svg' }
    ]
  },
  {
    title: 'Framework and Library',
    items: [
      { name: 'Next JS', icon: '/images/stack/next.svg' },
      { name: 'Tailwind', icon: '/images/stack/tailwind.svg' },
      { name: 'Shadcn-ui', icon: '/images/stack/shadcn.svg' },
      { name: 'Flutter', icon: '/images/stack/flutter.svg' },
      { name: 'Gin', icon: '/images/stack/go.svg' }
    ]
  },
  {
    title: 'Animation',
    items: [
      { name: 'GSAP', icon: '/images/stack/gsap.jpg' },
      { name: 'Scroll Magic', icon: '/images/stack/scrollmagic.jpg' },
      { name: 'Frammer Motion', icon: '/images/stack/frammer.svg' },
      { name: 'AOS', icon: '/images/stack/aos.png' }
    ]
  },
  {
    title: 'Project Management',
    items: [
      { name: 'Github Projects', icon: '/images/stack/gh.svg' },
      { name: 'Jira', icon: '/images/stack/jira.svg' },
      { name: 'Notion', icon: '/images/stack/notion.svg' }
    ]
  }
];

export function LandingPage({ onEnter }: LandingPageProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [displayedSpecialty, setDisplayedSpecialty] = useState('');
  const [isSpecialtyDeleting, setIsSpecialtyDeleting] = useState(false);
  const [specialtyTypingSpeed, setSpecialtyTypingSpeed] = useState(100);

  useEffect(() => {
    const activeRole = roles[roleIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        const nextText = activeRole.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
        setTypingSpeed(100);

        if (nextText === activeRole) {
          // Pause at the end of the text
          setTypingSpeed(2000); // 2 seconds hold
          setIsDeleting(true);
        }
      } else {
        // Deleting phase
        const nextText = activeRole.substring(0, displayedText.length - 1);
        setDisplayedText(nextText);
        setTypingSpeed(40); // Delete faster than type

        if (nextText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400); // Pause before typing next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  useEffect(() => {
    const activeSpecialty = specialties[specialtyIndex];
    
    const handleTyping = () => {
      if (!isSpecialtyDeleting) {
        const nextText = activeSpecialty.substring(0, displayedSpecialty.length + 1);
        setDisplayedSpecialty(nextText);
        setSpecialtyTypingSpeed(80);

        if (nextText === activeSpecialty) {
          setSpecialtyTypingSpeed(2500); // Hold for 2.5s
          setIsSpecialtyDeleting(true);
        }
      } else {
        const nextText = activeSpecialty.substring(0, displayedSpecialty.length - 1);
        setDisplayedSpecialty(nextText);
        setSpecialtyTypingSpeed(30);

        if (nextText === '') {
          setIsSpecialtyDeleting(false);
          setSpecialtyIndex((prev) => (prev + 1) % specialties.length);
          setSpecialtyTypingSpeed(400);
        }
      }
    };

    const timer = setTimeout(handleTyping, specialtyTypingSpeed);
    return () => clearTimeout(timer);
  }, [displayedSpecialty, isSpecialtyDeleting, specialtyIndex, specialtyTypingSpeed]);

  useEffect(() => {
    // Enable global scroll normalization to match original smooth feel
    ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-trigger-container",
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            if (self.progress >= 0.95) {
              gsap.set(".cards-trigger-container", {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 0,
              });
            } else {
              gsap.set(".cards-trigger-container", {
                position: "",
                top: "",
                left: "",
                width: "",
                zIndex: 10,
              });
            }
          },
          onLeaveBack: () => {
            gsap.set(".cards-trigger-container", {
              clearProps: "all",
            });
          }
        }
      })
      .to(".showcase-card", {
        yPercent: -100,
        stagger: 0.5,
        ease: "none"
      });
    });

    return () => {
      ctx.revert();
      // Disable normalizeScroll when unmounting
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  return (
    <div className="w-full min-h-screen text-[#fcfdfc] overflow-y-auto scroll-smooth flex flex-col items-center" style={{ backgroundColor: 'var(--bg-color)' }}>
      <header className="absolute top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-2">
          <span className="font-prompt font-extrabold text-2xl lowercase tracking-normal text-white">mizan-web</span>
        </div>
        <button
          onClick={onEnter}
          className="psyche-btn text-xs font-prompt font-bold uppercase tracking-wider"
        >
          Explore Runs &rarr;
        </button>
      </header>

      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative px-4">
        {/* Background ambient light */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full filter blur-[120px] pointer-events-none opacity-20 z-0"
          style={{
            background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* The Dithered Interactive Globe */}
        <div className="absolute z-0 animate-fade-in" style={{ animationDuration: '2s' }}>
          <RetroGlobe size={600} interactive={true} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center flex flex-col items-center gap-4 max-w-md px-6 select-none pointer-events-auto">
          <div className="space-y-1 font-prompt text-white">
            <p className="text-xl font-normal opacity-90 tracking-wide">
              Hi! I'am
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Moch. Mizan Ghodafail
            </h1>
          </div>

          {/* Transitioning Role Pill (Terminal Retype Effect) */}
          <div className="h-12 flex items-center justify-center">
            <div
              className="bg-[var(--accent-color)] text-[var(--accent-text)] px-5 py-2.5 font-prompt text-sm uppercase tracking-wider font-bold shadow-md min-w-[240px] text-center"
            >
              {displayedText}<span className="animate-pulse font-normal">|</span>
            </div>
          </div>
        </div>


      </section>

      {/* About Section & Footer Wrapper with dynamic grid background below the fold */}
      <div className="w-full bg-pattern-dark flex flex-col items-center border-t border-[var(--accent-color)]" style={{ backgroundColor: 'var(--bg-color)' }}>
        {/* About & Hero Intro Section */}
        <section className="w-full max-w-7xl px-6 py-20 z-10 font-prompt">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Hero / Intro (span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6 items-center lg:items-start">
              {/* Photo Box Placeholder */}
              <div className="profile-image-placeholder">
                <img 
                  src="/profile.png" 
                  alt="Moch Mizan Ghodafail" 
                  className="profile-image-actual"
                />
              </div>

              {/* Title & Specialty Header */}
              <div className="space-y-3 w-full text-center lg:text-left font-prompt">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  Portrait of Me
                </h1>
                <div className="border-t border-[var(--accent-color)] w-full py-0.5" />
                
                {/* Intro bullet items */}
                <div className="font-mono text-[11px] uppercase tracking-wider h-6 flex items-center justify-center lg:justify-start" style={{ color: 'var(--accent-color)' }}>
                  <span>&gt; {displayedSpecialty}</span>
                  <span className="animate-pulse ml-0.5 font-normal">|</span>
                </div>
              </div>

              {/* Social and Download Buttons */}
              <div className="flex flex-wrap gap-3 pt-2 text-[10px] font-bold uppercase tracking-wider justify-center lg:justify-start font-prompt">
                <a 
                  href="#resume" 
                  className="psyche-btn text-[10px] font-bold px-3 py-1.5"
                  style={{ '--btn-color': 'var(--accent-color)' } as React.CSSProperties}
                >
                  [ DOWNLOAD CV ]
                </a>
                <a 
                  href="https://github.com/mie-intel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="psyche-btn text-[10px] font-bold px-3 py-1.5"
                  style={{ '--btn-color': 'var(--accent-color)' } as React.CSSProperties}
                >
                  [ GITHUB ]
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="psyche-btn text-[10px] font-bold px-3 py-1.5"
                  style={{ '--btn-color': 'var(--accent-color)' } as React.CSSProperties}
                >
                  [ LINKEDIN ]
                </a>
              </div>
            </div>

            {/* Right Column: About Biography text (span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-[11px] uppercase tracking-widest font-roboto" style={{ color: 'var(--accent-color)' }}>
                // 01. About Me
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight font-roboto text-[24px] max-md:text-[19px]">
                About
              </h3>
              <div className="leading-relaxed text-white font-normal space-y-4 text-justify font-roboto text-[15px] lg:text-[16px]">
                <p>
                  I didn't plan to end up in <strong className="font-semibold text-white">AI</strong>. I started out as a <strong className="font-semibold text-white">networking kid</strong> who just wanted to understand how the internet worked. But somewhere between configuring routers and writing my first Python script, I got completely hooked on the idea of <strong className="font-semibold text-white">building systems that actually think</strong>. Now I'm doing both, and I wouldn't have it any other way.
                </p>
                <p>
                  Right now I'm a <strong className="font-semibold text-white">4th-semester Internet Engineering Technology student at UGM</strong>, juggling coursework in <strong className="font-semibold text-white">network security, AI, and server infrastructure</strong> while also building real projects on the side. I'm part of <strong className="font-semibold text-white">Program Pijak</strong>, a selective AI scholarship by Dicoding and IBM SkillsBuild, and I just wrapped up as <strong className="font-semibold text-white">Sub Coordinator of Competition for NETCOMP UGM</strong>, a national networking competition. Busy? Yes. Complaining? Not really.
                </p>
                <p>
                  My first serious project was an <strong className="font-semibold text-white">Islamic inheritance calculator</strong> I built in high school, implementing <strong className="font-semibold text-white">faraid law in PHP</strong> because I thought it would be interesting to see classical jurisprudence run as an algorithm. That kind of thinking still drives everything I build: <strong className="font-semibold text-white">what is the real-world system underneath this problem, and how do you actually encode it?</strong>
                </p>
                <p>
                  Personality-wise I am the quiet type until you get me on a topic I care about, then good luck shutting me up. I think deeply about things, probably too deeply sometimes. But I genuinely believe <strong className="font-semibold text-white">Indonesia's next generation of intelligent infrastructure</strong> will be built by engineers who understand both the technology and the context it has to operate in. That is the engineer I am working toward being.
                </p>
                <p>
                  If you want to talk <strong className="font-semibold text-white">AI, networks</strong>, or why <strong className="font-semibold text-white">Habibie</strong> is still the most underrated engineer in Indonesian history, I am here for it.
                </p>
              </div>
            </div>
            
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="w-full max-w-7xl px-6 pb-20 z-10 font-roboto">
          <div className="space-y-6">
            <h2 className="text-[11px] uppercase tracking-widest font-roboto" style={{ color: 'var(--accent-color)' }}>
              // 02. Tech Stack
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight font-roboto text-[24px] max-md:text-[19px]">
              Skills & Technologies
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {stackCategories.map((category, catIdx) => (
                <div 
                  key={catIdx}
                  className="p-6 border flex flex-col gap-4 rounded-none"
                  style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border-color)' }}
                >
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-color)] font-roboto border-b border-[var(--border-muted)] pb-2 text-[16px] font-semibold lg:font-semibold">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2.5 font-roboto">
                    {category.items.map((item, itemIdx) => (
                      <div 
                        key={itemIdx}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--panel-bg-darker)] border border-[var(--border-muted)] hover:border-[var(--accent-color)] transition-colors duration-200"
                      >
                        <img 
                          src={item.icon} 
                          alt={item.name}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-[14px] max-lg:text-[12px] text-white font-medium font-roboto">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects (GSAP Pinned Stacking Showcase) */}
        <section className="cards-trigger-container w-full h-screen relative flex flex-col justify-between py-12 px-6 md:px-12 z-10 font-prompt select-none overflow-hidden">
          {/* Header (stays visible while pinned) */}
          <div className="space-y-2 w-full max-w-7xl mx-auto">
            <h2 className="text-[11px] uppercase tracking-widest font-roboto" style={{ color: 'var(--accent-color)' }}>
              // 03. Featured Projects
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight font-roboto text-[24px] max-md:text-[19px]">
              Project Showcase
            </h3>
          </div>

          {/* Cards Deck (centered in the remaining height) */}
          <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto relative my-4 overflow-hidden">
            <ul className="relative w-full h-[60vh] md:h-[65vh] list-none p-0">
              {projects.map((project, idx) => (
                <li 
                  key={idx}
                  className="showcase-card absolute left-0 w-full border border-[var(--panel-border-color)] hover:border-[var(--accent-color)] transition-[filter,border-color] duration-300 rounded-none bg-cover bg-center grayscale hover:grayscale-0 flex flex-col justify-end"
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                    zIndex: 10 + (projects.length - idx), // Lower indexes are on top (RaksaDana on top)
                    top: `${idx * 2}%`, // Shifts lower cards down slightly so they don't perfectly overlap
                    height: '85%', // Ensures cards have a height of 85% of the container, leaving room for stack offset
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300 pointer-events-none z-0" />
                  
                  {/* Subtle Scanlines overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10" 
                    style={{
                      background: 'repeating-linear-gradient(rgba(18, 16, 16, 0) 0px, rgba(18, 16, 16, 0) 1px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 3px)',
                      mixBlendMode: 'overlay'
                    }}
                  />

                  {/* Card Body */}
                  <div className="relative flex flex-col justify-between items-start z-20 h-full p-8 text-white select-none w-full">
                    {/* Top row: Role and Duration */}
                    <div className="flex w-full justify-between items-center text-[20px] max-lg:text-[14px] font-prompt text-white tracking-wider font-bold">
                      <span>{idx === 0 ? "AI & Fullstack Developer" : idx === 1 ? "Frontend Developer" : "Solo Developer"}</span>
                      <span className="font-normal">{idx === 0 ? "Jan 2026 - Feb 2026" : idx === 1 ? "Nov 2025 - Dec 2025" : "May 2024 - June 2024"}</span>
                    </div>

                    {/* Middle/Bottom details */}
                    <div className="flex flex-col w-full gap-1.5 mt-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                        <h4 className="text-[24px] max-lg:text-[18px] font-semibold tracking-tight text-white leading-tight font-prompt font-bold">
                          {project.title}
                        </h4>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="psyche-btn text-xs font-bold px-4 py-1.5 uppercase tracking-wider self-start sm:self-auto font-prompt"
                            style={{ '--btn-color': 'var(--accent-color)' } as React.CSSProperties}
                          >
                            View Project &rarr;
                          </a>
                        )}
                      </div>

                      <p className="text-[15px] max-lg:text-[14px] text-gray-300 font-light leading-relaxed max-w-3xl text-justify font-prompt">
                        {project.description}
                      </p>

                      <hr className="w-full border-t border-[var(--border-muted)] opacity-50 my-1" />

                      {/* Tech Stack tags */}
                      <div className="flex flex-wrap gap-1.5 font-prompt">
                        {project.tags.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx}
                            className="px-2 py-0.5 text-[16px] max-lg:text-[10px] font-bold tracking-wider bg-[var(--panel-bg-darker)] text-[var(--accent-color)] border border-[var(--border-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pinned Scroll Spacer (Compensates for 300vh pin duration minus 100vh section height) */}
        <div className="w-full h-[200vh] pointer-events-none" />

        {/* Projects Section */}
        <section className="w-full max-w-7xl px-6 pb-20 relative z-10 font-prompt" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="space-y-6">
            <h2 className="text-[11px] uppercase tracking-widest font-roboto" style={{ color: 'var(--accent-color)' }}>
              // 04. Selected Work
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight font-roboto text-[24px] max-md:text-[19px]">
              Projects & Experiments
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 w-full">
              {projects.map((project, idx) => {
                const CardComponent = project.url ? 'a' : 'div';
                return (
                  <CardComponent
                    key={idx}
                    {...(project.url ? {
                      href: project.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    } : {})}
                    className={`border overflow-hidden flex flex-col rounded-none group transition-all duration-300 hover:border-[var(--accent-color)] hover:shadow-lg ${project.url ? 'cursor-pointer' : 'cursor-default'} font-prompt`}
                    style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border-color)' }}
                  >
                    {/* Aspect Video Screenshot Frame */}
                    <div className="aspect-video w-full overflow-hidden relative border-b border-[var(--border-muted)] bg-[var(--panel-bg-darker)]">
                      {/* Retro Subtle Scanlines overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none z-10" 
                        style={{
                          background: 'repeating-linear-gradient(rgba(18, 16, 16, 0) 0px, rgba(18, 16, 16, 0) 1px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 3px)',
                          mixBlendMode: 'overlay'
                        }}
                      />
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Card Details */}
                    <div className="p-5 flex flex-col gap-1.5 flex-1 font-prompt">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[24px] max-lg:text-[18px] font-semibold text-white leading-snug font-prompt">
                          {project.title}
                        </h4>
                        <span className="text-[20px] max-lg:text-[14px] text-white shrink-0 mt-1 font-medium font-prompt">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-[15px] max-lg:text-[14px] leading-relaxed text-white font-light flex-1 font-prompt">
                        {project.description}
                      </p>
                      
                      <hr className="w-full border-t border-[var(--border-muted)] opacity-50 my-1" />

                      {/* Technology tags */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5 font-prompt">
                        {project.tags.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx}
                            className="px-2 py-0.5 rounded-none text-[16px] max-lg:text-[10px] font-bold tracking-wider bg-[var(--panel-bg-darker)] text-[var(--accent-color)] border border-[var(--border-muted)] font-prompt"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardComponent>
                );
              })}
            </div>
          </div>
        </section>

        {/* Decorative footer details */}
        <footer className="w-full py-8 text-center font-prompt text-[9px] text-[#4e6b54] tracking-widest uppercase border-t border-[var(--accent-color)] select-none relative z-10" style={{ backgroundColor: 'var(--bg-color)' }}>
          Mizan Ghodafail // Distributed Intelligence Network v0.0.1
        </footer>
      </div>
    </div>
  );
}
