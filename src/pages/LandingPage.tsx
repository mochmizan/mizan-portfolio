import { useState, useEffect } from 'react';
import { RetroGlobe } from '@/components/RetroGlobe';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    image: '/projects/raksadana.webp'
  },
  {
    title: 'GCS — UAV Ground Control Station',
    year: '2025',
    description: "Browser-based ground control interface for drone/UAV operation built during Gamaforce UGM's developer recruitment trial, featuring satellite map view and flight simulation tooling.",
    tags: ['React', 'Leaflet', 'Geoman', 'JavaScript', 'Vite'],
    url: '',
    image: '/projects/gcs.webp'
  },
  {
    title: 'KalkulatorWarisan',
    year: '2024',
    description: 'Islamic inheritance calculator implementing faraid computation rules from Indonesian Ministry of Religious Affairs jurisprudence, including edge-case heir distribution logic.',
    tags: ['PHP', 'Vercel'],
    url: 'https://kalkulator-warisan.vercel.app/',
    image: '/projects/kalkulatorwarisan.webp'
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
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript' },
      { name: 'PHP', icon: 'https://cdn.simpleicons.org/php' }
    ]
  },
  {
    title: 'Framework & Libraries',
    items: [
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi' },
      { name: 'React', icon: 'https://cdn.simpleicons.org/react' },
      { name: 'Nuxt.js', icon: 'https://cdn.simpleicons.org/nuxt' },
      { name: 'Pandas', icon: '/images/stack/pandas.svg' },
      { name: 'NumPy', icon: 'https://www.svgrepo.com/show/373938/numpy.svg' },
      { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
      { name: 'Seaborn', icon: 'https://seaborn.pydata.org/_images/logo-mark-lightbg.svg' },
      { name: 'Scikit-Learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
      { name: 'Leaflet', icon: 'https://cdn.simpleicons.org/leaflet' }
    ]
  },
  {
    title: 'Tech & Tools',
    items: [
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
      { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel' },
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git' },
      { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github' },
      { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux' },
      { name: 'Cisco CCNA', icon: 'https://cdn.simpleicons.org/cisco' }
    ]
  },
  {
    title: 'AI Engineering',
    items: [
      { name: 'Claude Code', icon: 'https://cdn.simpleicons.org/claude' },
      { name: 'Gemini API', icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google-gemini.svg' },
      { name: 'Antigravity', icon: 'https://static.wikia.nocookie.net/logopedia/images/4/4a/Google_Antigravity_icon.svg/revision/latest/scale-to-width-down/1200?cb=20251119202403' },
      { name: 'Cursor', icon: 'https://cdn.simpleicons.org/cursor' },
      { name: 'Codex', icon: '/images/stack/codex-color.svg' }
    ]
  }
];

interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  logo: string;
  url: string;
}

const certifications: Certification[] = [
  {
    title: 'Membangun Sistem Machine Learning',
    issuer: 'Dicoding Indonesia',
    issueDate: 'May 2026',
    expiryDate: 'May 2029',
    credentialId: 'JMZVOJ723XN9',
    logo: '/images/dicoding.webp',
    url: '#'
  },
  {
    title: 'Belajar Fundamental Deep Learning',
    issuer: 'Dicoding Indonesia',
    issueDate: 'May 2026',
    expiryDate: 'May 2029',
    credentialId: 'KEXLQJ64WPG2',
    logo: '/images/dicoding.webp',
    url: '#'
  },
  {
    title: 'Belajar Machine Learning untuk Pemula',
    issuer: 'Dicoding Indonesia',
    issueDate: 'Apr 2026',
    expiryDate: 'Apr 2029',
    credentialId: '1RXYW1JEKZVM',
    logo: '/images/dicoding.webp',
    url: '#'
  },
  {
    title: 'Belajar Dasar Git dengan GitHub',
    issuer: 'Dicoding Indonesia',
    issueDate: 'Feb 2026',
    expiryDate: 'Feb 2029',
    credentialId: '81P25E93NPOY',
    logo: '/images/dicoding.webp',
    url: '#'
  },
  {
    title: 'Career Management Essentials',
    issuer: 'IBM',
    issueDate: 'Dec 2025',
    logo: '/images/ibm.webp',
    url: '#'
  },
  {
    title: 'Memulai Pemrograman dengan Python',
    issuer: 'Dicoding Indonesia',
    issueDate: 'Nov 2025',
    expiryDate: 'Nov 2028',
    credentialId: '4EXG313VDZRL',
    logo: '/images/dicoding.webp',
    url: '#'
  },
  {
    title: 'Belajar Dasar AI',
    issuer: 'Dicoding Indonesia',
    issueDate: 'Oct 2025',
    expiryDate: 'Oct 2028',
    credentialId: 'KEXL228G0ZG2',
    logo: '/images/dicoding.webp',
    url: '#'
  },
  {
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco',
    issueDate: 'Jul 2025',
    logo: '/images/cisco.webp',
    url: '#'
  },
  {
    title: 'English for IT 2',
    issuer: 'Cisco',
    issueDate: 'Jun 2025',
    logo: '/images/cisco.webp',
    url: '#'
  },
  {
    title: 'Digital Awareness',
    issuer: 'Cisco',
    issueDate: 'Apr 2025',
    logo: '/images/cisco.webp',
    url: '#'
  },
  {
    title: 'Python Data Fundamentals',
    issuer: 'DataCamp',
    issueDate: 'Jan 2025',
    expiryDate: 'Jan 2027',
    credentialId: '930e1741d713e671385577a6fca9831cfee6f402',
    logo: '/images/datacamp.webp',
    url: '#'
  },
  {
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco',
    issueDate: 'Dec 2024',
    logo: '/images/cisco.webp',
    url: '#'
  },
  {
    title: 'Creating Compelling Reports',
    issuer: 'Cisco',
    issueDate: 'Dec 2024',
    logo: '/images/cisco.webp',
    url: '#'
  },
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco',
    issueDate: 'Dec 2024',
    logo: '/images/cisco.webp',
    url: '#'
  },
  {
    title: 'English for IT 1',
    issuer: 'Cisco',
    issueDate: 'Oct 2024',
    logo: '/images/cisco.webp',
    url: '#'
  },
  {
    title: 'Computer Hardware Basics',
    issuer: 'Cisco',
    issueDate: 'Sep 2024',
    logo: '/images/cisco.webp',
    url: '#'
  }
];

interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

const awards: Award[] = [
  {
    title: '1st Winner – PROCOMMIT Excel Advance Programming',
    issuer: 'PRODISTIK Institut Teknologi Sepuluh Nopember (ITS) | Associated with MAN Sidoarjo',
    date: 'Nov 2022',
    description: 'Focused on advanced spreadsheet programming and complex mathematical formulas.',
    url: '#'
  },
  {
    title: '3rd Winner – Programming and Computer Competition MAGE 8',
    issuer: 'Himpunan Mahasiswa Teknik Komputer ITS',
    date: 'Nov 2022',
    description: 'Competed in algorithms, logical problem-solving, and implementation speed.',
    url: '#'
  },
  {
    title: '4th Place – Best Final Project PRODISTIK MAN Sidoarjo',
    issuer: 'PRODISTIK MAN Sidoarjo',
    date: 'May 2023',
    description: 'Developed a PHP-based heritage division calculator translating Islamic jurisprudence rules into software logic.',
    url: '#'
  },
  {
    title: '2nd Runner Up – OLIEFEB Essay Competition',
    issuer: 'Himpunan Mahasiswa Ilmu Ekonomi Universitas Brawijaya',
    date: 'Oct 2021',
    description: 'Co-authored an academic paper on socioeconomic policy dynamics.',
    url: '#'
  }
];

interface ExperienceEntry {
  title: string;
  org: string;
  period: string;
  bullets: string[];
  url?: string;
}

const experiences: ExperienceEntry[] = [
  {
    title: 'AI Engineer Cohort – Pijak',
    org: 'IBM SkillsBuild & Dicoding',
    period: 'Jan 2026 – Present',
    bullets: [
      'Selected participant of Program Pijak, an AI scholarship program by Dicoding in collaboration with IBM SkillsBuild, targeting 30,000 Indonesian digital talents.',
      'Completed intensive training in Machine Learning, Deep Learning, Python Programming, and MLOps.',
      'Accessed IBM SkillsBuild materials covering AI, Generative AI, and AI Ethics with globally recognized credentials.',
      'Built hands-on portfolios and machine learning endpoints as part of the program curriculum.'
    ]
  },
  {
    title: 'Staff of Science and Technology – FORKOMTI SV UGM',
    org: 'FORKOMTI SV UGM',
    period: 'May 2025 – Present',
    bullets: [
      'Academic technology community coordination, technical planning, and student networking infrastructure development.'
    ]
  },
  {
    title: 'Sub Coordinator of Competition – NETCOMP UGM',
    org: 'NETCOMP UGM',
    period: 'Sep 2025 – Mar 2026',
    bullets: [
      'Managed network competition logistics, scheduling, and technical routing for the National Networking Competition SV UGM.',
      'Liaised between contests participants, event coordinators, and networking professional judges.'
    ]
  },
  {
    title: 'Competitive Programming Member – KOMATIK UGM',
    org: 'KOMATIK UGM',
    period: 'Feb 2025 – Mar 2026',
    bullets: [
      'Participated in algorithm training and programming competitions. Applied data structures and code optimizations in Python and C++.'
    ]
  },
  {
    title: 'Software Programmer Intern – GAMAFORCE UGM',
    org: 'GAMAFORCE UGM',
    period: 'Nov 2025 – Dec 2025',
    bullets: [
      'Built a browser-based Ground Control Station (GCS) for UAV/drone operation as part of the recruitment development trial.'
    ],
    url: '#'
  },
  {
    title: 'Laboratory Assistant (Basic Computer Work) – Universitas Gadjah Mada',
    org: 'Universitas Gadjah Mada',
    period: 'Aug 2025 – Dec 2025',
    bullets: [
      'Assisted in practical lab sessions covering computer fundamentals, networking basics, and student support.'
    ],
    url: '#'
  }
];

export function LandingPage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [displayedSpecialty, setDisplayedSpecialty] = useState('');
  const [isSpecialtyDeleting, setIsSpecialtyDeleting] = useState(false);
  const [specialtyTypingSpeed, setSpecialtyTypingSpeed] = useState(100);
  const [globeSize, setGlobeSize] = useState(600);

  const [expandedAwards, setExpandedAwards] = useState<Set<number>>(new Set());
  const [expandedExps, setExpandedExps] = useState<Set<number>>(new Set());
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  const toggleAward = (idx: number) => setExpandedAwards(prev => {
    const next = new Set(prev);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    return next;
  });

  const toggleExp = (idx: number) => setExpandedExps(prev => {
    const next = new Set(prev);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    return next;
  });

  useEffect(() => {
    const activeRole = roles[roleIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = activeRole.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
        setTypingSpeed(100);

        if (nextText === activeRole) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        const nextText = activeRole.substring(0, displayedText.length - 1);
        setDisplayedText(nextText);
        setTypingSpeed(40);

        if (nextText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400);
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
          setSpecialtyTypingSpeed(2500);
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
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGlobeSize(320); // Scale down on mobile (standard 320px)
      } else if (window.innerWidth < 1024) {
        setGlobeSize(480); // Scale down on tablet
      } else {
        setGlobeSize(600); // Default desktop size
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-trigger-container",
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      tl.to(".showcase-card-0", {
        yPercent: -105,
        opacity: 0,
        ease: "power1.inOut"
      }, 0)
      .to(".showcase-card-1", {
        y: 0,
        ease: "power1.inOut"
      }, 0)
      .to(".showcase-card-2", {
        y: 20,
        ease: "power1.inOut"
      }, 0);

      tl.to(".showcase-card-1", {
        yPercent: -105,
        opacity: 0,
        ease: "power1.inOut"
      }, 0.5)
      .to(".showcase-card-2", {
        y: 0,
        ease: "power1.inOut"
      }, 0.5);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen text-[#fcfdfc] overflow-y-auto scroll-smooth flex flex-col items-center" style={{ backgroundColor: 'var(--bg-color)' }}>
      <header className="absolute top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-2">
          <span className="font-mono font-extrabold text-2xl lowercase tracking-normal text-white">mizan-web</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative px-4">
        <div
          className="absolute w-[600px] h-[600px] rounded-full filter blur-[120px] pointer-events-none opacity-20 z-0"
          style={{
            background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="absolute z-0 animate-fade-in" style={{ animationDuration: '2s' }}>
          <RetroGlobe size={globeSize} interactive={true} />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center gap-4 max-w-md px-6 select-none pointer-events-auto">
          <div className="space-y-1 font-mono text-white">
            <p className="text-xl font-normal opacity-90 tracking-wide">
              Hi! I’am
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-wrap-balance">
              Moch. Mizan Ghodafail
            </h1>
          </div>

          <div className="h-12 flex items-center justify-center">
            <div
              className="bg-[var(--accent-color)] text-[var(--accent-text)] px-5 py-2.5 font-mono text-sm uppercase tracking-wider font-bold shadow-md min-w-[240px] text-center"
            >
              {displayedText}<span className="animate-pulse font-normal">|</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section & Footer Wrapper */}
      <div className="w-full bg-pattern-dark flex flex-col items-center border-t border-[var(--accent-color)]" style={{ backgroundColor: 'var(--bg-color)' }}>
        <section className="w-full max-w-7xl px-6 py-20 z-10 font-mono">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col gap-6 items-center lg:items-start">
              <div className="profile-image-placeholder">
                <img 
                  src="/profile.webp" 
                  alt="Moch Mizan Ghodafail" 
                  width={280}
                  height={350}
                  className="profile-image-actual"
                />
              </div>

              <div className="space-y-3 w-full text-center lg:text-left font-mono">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none text-wrap-balance">
                  Portrait of Me
                </h2>
                <div className="border-t border-[var(--accent-color)] w-full py-0.5" />
                
                <div className="font-mono text-[11px] uppercase tracking-wider h-6 flex items-center justify-center lg:justify-start" style={{ color: 'var(--accent-color)' }}>
                  <span>&gt; {displayedSpecialty}</span>
                  <span className="animate-pulse ml-0.5 font-normal">|</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 text-[10px] font-bold uppercase tracking-wider justify-center lg:justify-start font-mono">
                <a 
                  href="#resume" 
                  className="psyche-btn text-[10px] font-bold px-3 py-1.5"
                >
                  [ DOWNLOAD CV ]
                </a>
                <a 
                  href="https://github.com/mie-intel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="psyche-btn text-[10px] font-bold px-3 py-1.5"
                >
                  [ GITHUB ]
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="psyche-btn text-[10px] font-bold px-3 py-1.5"
                >
                  [ LINKEDIN ]
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-[11px] uppercase tracking-widest font-mono" style={{ color: 'var(--accent-color)' }}>
                // 01. About Me
              </h2>
              <h3 className="font-mono font-bold text-[24px] max-md:text-[19px] tracking-tight leading-tight text-white text-wrap-balance">
                About
              </h3>
              <div className="leading-relaxed text-white font-normal space-y-4 text-justify font-mono text-[15px] lg:text-[16px]">
                <p>
                  I didn’t plan to end up in <strong className="font-semibold text-white">AI</strong>. I started out as a <strong className="font-semibold text-white">networking kid</strong> who just wanted to understand how the internet worked. But somewhere between configuring routers and writing my first Python script, I got completely hooked on the idea of <strong className="font-semibold text-white">building systems that actually think</strong>. Now I’m doing both, and I wouldn’t have it any other way.
                </p>
                <p>
                  Right now I’m a <strong className="font-semibold text-white">4th-semester Internet Engineering Technology student at UGM</strong>, juggling coursework in <strong className="font-semibold text-white">network security, AI, and server infrastructure</strong> while also building real projects on the side. I’m part of <strong className="font-semibold text-white">Program Pijak</strong>, a selective AI scholarship by Dicoding and IBM SkillsBuild, and I just wrapped up as <strong className="font-semibold text-white">Sub Coordinator of Competition for NETCOMP UGM</strong>, a national networking competition. Busy? Yes. Complaining? Not really.
                </p>
                <p>
                  My first serious project was an <strong className="font-semibold text-white">Islamic inheritance calculator</strong> I built in high school, implementing <strong className="font-semibold text-white">faraid law in PHP</strong> because I thought it would be interesting to see classical jurisprudence run as an algorithm. That kind of thinking still drives everything I build: <strong className="font-semibold text-white">what is the real-world system underneath this problem, and how do you actually encode it?</strong>
                </p>
                <p>
                  Personality-wise I am the quiet type until you get me on a topic I care about, then good luck shutting me up. I think deeply about things, probably too deeply sometimes. But I genuinely believe <strong className="font-semibold text-white">Indonesia’s next generation of intelligent infrastructure</strong> will be built by engineers who understand both the technology and the context it has to operate in. That is the engineer I am working toward being.
                </p>
                <p>
                  If you want to talk <strong className="font-semibold text-white">AI, networks</strong>, or why <strong className="font-semibold text-white">Habibie</strong> is still the most underrated engineer in Indonesian history, I am here for it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="w-full max-w-7xl px-6 pb-20 z-10 font-mono">
          <div className="space-y-6">
            <h2 className="text-[11px] uppercase tracking-widest font-mono" style={{ color: 'var(--accent-color)' }}>
              // 02. Tech Stack
            </h2>
            <h3 className="font-mono font-bold text-[24px] max-md:text-[19px] tracking-tight leading-tight text-white text-wrap-balance">
              Skills & Technologies
            </h3>
            
            <div className="w-full flex flex-col md:flex-row md:gap-12 gap-8 justify-start items-start pt-4">
              <div className="w-full md:w-1/2 flex flex-col gap-8">
                {stackCategories.slice(0, 2).map((category, catIdx) => (
                  <div key={catIdx} className="flex flex-col gap-3">
                    <p className="font-mono text-[16px] font-medium lg:font-semibold mb-1" style={{ color: 'var(--accent-color)' }}>
                      {category.title}
                    </p>
                    <div className="flex justify-start flex-wrap items-center gap-x-6 gap-y-3 font-mono">
                      {category.items.map((item, itemIdx) => (
                        <div 
                          key={itemIdx}
                          className="flex items-center gap-2 group/tag cursor-default"
                        >
                          <img 
                            src={item.icon} 
                            alt={item.name}
                            width={32}
                            height={32}
                            className={`w-8 h-8 max-lg:w-6 max-lg:h-6 object-contain ${item.name === 'Linux' ? 'brightness-0' : ''}`}
                          />
                          <span className="text-[14px] max-lg:text-[12px] text-white font-medium font-mono">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-8">
                {stackCategories.slice(2, 4).map((category, catIdx) => (
                  <div key={catIdx + 2} className="flex flex-col gap-3">
                    <p className="font-mono text-[16px] font-medium lg:font-semibold mb-1" style={{ color: 'var(--accent-color)' }}>
                      {category.title}
                    </p>
                    <div className="flex justify-start flex-wrap items-center gap-x-6 gap-y-3 font-mono">
                      {category.items.map((item, itemIdx) => (
                        <div 
                          key={itemIdx}
                          className="flex items-center gap-2 group/tag cursor-default"
                        >
                          <img 
                            src={item.icon} 
                            alt={item.name}
                            width={32}
                            height={32}
                            className={`w-8 h-8 max-lg:w-6 max-lg:h-6 object-contain ${item.name === 'Linux' ? 'brightness-0' : ''}`}
                          />
                          <span className="text-[14px] max-lg:text-[12px] text-white font-medium font-mono">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="cards-trigger-container w-full h-screen relative flex flex-col justify-between py-12 px-6 md:px-12 z-10 font-mono select-none overflow-hidden">
          <div className="space-y-2 w-full max-w-7xl mx-auto">
            <h2 className="text-[11px] uppercase tracking-widest font-mono" style={{ color: 'var(--accent-color)' }}>
              // 03. Featured Projects
            </h2>
            <h3 className="font-mono font-bold text-[24px] max-md:text-[19px] tracking-tight leading-tight text-white text-wrap-balance">
              Project Showcase
            </h3>
          </div>

          <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto relative my-4">
            <ul className="relative w-full h-[60vh] md:h-[65vh] list-none p-0 flex items-center justify-center">
              {projects.map((project, idx) => (
                <li 
                  key={idx}
                  className={`showcase-card showcase-card-${idx} absolute top-0 left-0 w-full h-full border border-[var(--panel-border-color)] hover:border-[var(--accent-color)] transition-[border-color,transform] duration-500 rounded-none bg-cover bg-center grayscale hover:grayscale-0 flex flex-col justify-end`}
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                    zIndex: 10 + (projects.length - idx),
                    transform: `translateY(${idx * 20}px)`
                  }}
                >
                  <div className="absolute inset-0 bg-black/60 transition-colors duration-300 pointer-events-none z-0" />
                  
                  <div 
                    className="absolute inset-0 pointer-events-none z-10" 
                    style={{
                      background: 'repeating-linear-gradient(rgba(18, 16, 16, 0) 0px, rgba(18, 16, 16, 0) 1px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 3px)',
                      mixBlendMode: 'overlay'
                    }}
                  />
                  <div className="relative flex flex-col justify-between items-start z-20 h-full p-8 text-white select-none w-full">
                    <div className="flex w-full justify-between items-center text-[20px] max-lg:text-[14px] font-mono text-white tracking-normal font-bold">
                      <span>{idx === 0 ? "AI & Fullstack Developer" : idx === 1 ? "Frontend Developer" : "Solo Developer"}</span>
                      <span className="font-normal">{idx === 0 ? "Jan 2026 - Feb 2026" : idx === 1 ? "Nov 2025 - Dec 2025" : "May 2024 - June 2024"}</span>
                    </div>

                    <div className="flex flex-col w-full gap-2 mt-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                        <h4 className="font-mono font-bold text-[24px] max-lg:text-[18px] tracking-tight leading-tight text-white">
                          {project.title}
                        </h4>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="psyche-btn text-xs font-bold px-4 py-1.5 tracking-wider self-start sm:self-auto font-mono"
                          >
                            View Project &rarr;
                          </a>
                        )}
                      </div>

                      <p className="text-[15px] max-lg:text-[14px] text-gray-300 font-light leading-relaxed max-w-3xl text-justify font-mono">
                        {project.description}
                      </p>

                      <hr className="w-full border-t border-[var(--border-muted)] opacity-50 my-1" />

                      <div className="flex flex-wrap gap-1.5 font-mono">
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

        {/* Experience Section */}
        <section className="w-full max-w-7xl px-6 pb-20 z-10 font-mono">
          <div className="space-y-6">
            <h2 className="text-[11px] uppercase tracking-widest font-mono" style={{ color: 'var(--accent-color)' }}>
              // 04. Experience
            </h2>
            <h3 className="font-mono font-bold text-[24px] max-md:text-[19px] tracking-tight leading-tight text-white text-wrap-balance">
              Experience
            </h3>

            <div className="flex flex-col gap-0 pt-4">
              <h4 className="text-[16px] font-medium lg:font-semibold font-mono mb-2" style={{ color: 'var(--accent-color)' }}>
                Honors &amp; Awards
              </h4>
              <div className="flex flex-col">
                {awards.map((award, idx) => {
                  const open = expandedAwards.has(idx);
                  return (
                    <div key={idx} className="py-3">
                      <button
                        onClick={() => toggleAward(idx)}
                        className="w-full flex items-start gap-2 text-left group"
                      >
                        <span className="flex-1 text-[14px] max-lg:text-[13px] font-semibold text-white font-mono leading-snug">
                          {award.title} <span className="font-light text-[12px]" style={{ color: 'var(--accent-color)' }}>({award.date})</span> <span className="font-light text-[13px]" style={{ color: 'var(--accent-color)' }}>{open ? '[-]' : '[+]'}</span>
                        </span>
                      </button>
                      {open && (
                        <div className="mt-2 flex flex-col gap-1">
                          <p className="text-[12px] max-lg:text-[11px] font-mono font-light" style={{ color: 'var(--accent-color)' }}>
                            {award.issuer}
                          </p>
                          <p className="text-[13px] max-lg:text-[12px] font-mono font-light text-white leading-relaxed">
                            {award.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <h4 className="text-[16px] font-medium lg:font-semibold font-mono mt-8 mb-2" style={{ color: 'var(--accent-color)' }}>
                Experience Ledger
              </h4>
              <div className="flex flex-col">
                {(showAllExperiences ? experiences : experiences.slice(0, 3)).map((exp, idx) => {
                  const open = expandedExps.has(idx);
                  return (
                    <div key={idx} className="py-3">
                      <button
                        onClick={() => toggleExp(idx)}
                        className="w-full flex items-start gap-2 text-left group"
                      >
                        <span className="flex-1 text-[14px] max-lg:text-[13px] font-semibold text-white font-mono leading-snug">
                          {exp.title} <span className="font-light text-[12px]" style={{ color: 'var(--accent-color)' }}>({exp.period})</span> <span className="font-light text-[13px]" style={{ color: 'var(--accent-color)' }}>{open ? '[-]' : '[+]'}</span>
                        </span>
                      </button>
                      {open && (
                        <div className="mt-2 flex flex-col gap-1.5">
                          <p className="text-[12px] max-lg:text-[11px] font-mono font-light" style={{ color: 'var(--accent-color)' }}>
                            {exp.org}
                          </p>
                          <ul className="flex flex-col gap-0.5">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="text-[13px] max-lg:text-[12px] font-mono font-light text-white leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {experiences.length > 3 && (
                <div className="flex justify-start mt-4">
                  <button
                    onClick={() => setShowAllExperiences(prev => !prev)}
                    className="psyche-btn text-[10px] font-bold px-3 py-1.5"
                  >
                    {showAllExperiences ? '[ SHOW LESS ]' : '[ SHOW MORE ]'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Licenses & Certifications Section */}
        <section className="w-full max-w-7xl px-6 pb-20 z-10 font-mono">
          <div className="space-y-6">
            <h2 className="text-[11px] uppercase tracking-widest font-mono" style={{ color: 'var(--accent-color)' }}>
              // 05. Licenses & Certifications
            </h2>
            <h3 className="font-mono font-bold text-[24px] max-md:text-[19px] tracking-tight leading-tight text-white text-wrap-balance">
              Certifications
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 pt-4">
              {(showAllCertifications ? certifications : certifications.slice(0, 4)).map((cert, idx) => (
                <div 
                  key={idx} 
                  className="relative flex items-start border rounded-none overflow-hidden group p-4 md:p-5"
                  style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border-color)' }}
                >
                  <a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 overflow-hidden relative bg-neutral-900 flex items-center justify-center"
                  >
                    <img 
                      src={cert.logo} 
                      alt={`${cert.issuer} Logo`} 
                      width={56}
                      height={56}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>
                  
                  <div className="flex-1 pl-4 flex flex-col gap-1 min-w-0">
                    <h4 className="text-[16px] max-lg:text-[14px] font-medium lg:font-semibold leading-tight font-mono text-white">
                      {cert.title}
                    </h4>
                    <p className="text-[14px] max-lg:text-[12px] font-medium font-mono" style={{ color: 'var(--accent-color)' }}>
                      {cert.issuer}
                    </p>
                    <div className="relative w-full h-5 text-[12px] max-lg:text-[10px] text-white font-light font-mono mt-0.5 overflow-hidden">
                      {cert.credentialId ? (
                        <div className="w-full overflow-hidden whitespace-nowrap">
                          <span className="block overflow-hidden whitespace-nowrap leading-5" title={cert.credentialId}>
                            Cred ID {cert.credentialId}
                          </span>
                        </div>
                      ) : (
                        <div className="w-full h-full" />
                      )}
                      <div className="absolute right-0 top-0 bottom-0 flex items-center bg-[var(--panel-bg)] pl-2 z-10 select-none whitespace-nowrap">
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-24 -translate-x-full pointer-events-none"
                          style={{ background: 'linear-gradient(to right, transparent 0%, var(--panel-bg) 70%)' }}
                        />
                        <span className="leading-5">
                          {cert.issueDate}
                          {cert.expiryDate ? ` · ${cert.expiryDate}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {certifications.length > 4 && (
              <div className="flex justify-start mt-8">
                <button
                  onClick={() => setShowAllCertifications(prev => !prev)}
                  className="psyche-btn text-[10px] font-bold px-3 py-1.5"
                >
                  {showAllCertifications ? '[ SHOW LESS ]' : '[ SHOW MORE ]'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-16 flex items-center justify-center relative overflow-hidden">
          <div className="z-10 select-none flex flex-row items-center justify-center gap-6">
            <h3 className="font-mono font-bold text-[24px] max-md:text-[19px] tracking-tight leading-none text-white">
              Lets Connect<span style={{ color: 'var(--accent-color)' }}>!</span>
            </h3>
            
            <div className="flex gap-4 items-center">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="transition-transform duration-300 hover:scale-110"
                style={{ color: 'var(--accent-color)' }}
              >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/mie-intel" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                className="transition-transform duration-300 hover:scale-110"
                style={{ color: 'var(--accent-color)' }}
              >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
