import React, { useCallback, useEffect, useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LogoTeaserAnimation from './LogoTeaserAnimation';

// Image Carousel Component
const ImageCarousel: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Convert Google Drive links to direct image URLs
  const images = [
    '/pics/DSC_0015.JPG',
    '/pics/DSC_0153.JPG',
    '/pics/DSC_0451.JPG',
    '/pics/DSC_1401.JPG',
    '/pics/DSC_1433.JPG',
    '/pics/DSC_2921.jpg',
    '/pics/DSC_3102.jpg',
    '/pics/DSC_3127.jpg',
    '/pics/DSC_3294.jpg',
    '/pics/DSC_3312.jpg',
    '/pics/DSC_3373.jpg',
    '/pics/DSC_3465.jpg',
    '/pics/DSC_3472.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex]}
              alt={`UTKRISHTA Previous Year ${currentIndex + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 sm:p-3 text-white backdrop-blur transition-all hover:bg-white/20 hover:border-white/40"
          aria-label="Previous image"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 sm:p-3 text-white backdrop-blur transition-all hover:bg-white/20 hover:border-white/40"
          aria-label="Next image"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-sky-400'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Target timestamp aligns with 1 Nov 2025, 00:00 IST (UTC+5:30)
const TARGET_EVENT_DATE = new Date('2025-10-31T18:30:00Z');

type TimeRemaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const computeTimeRemaining = (): TimeRemaining => {
  const now = Date.now();
  const total = Math.max(TARGET_EVENT_DATE.getTime() - now, 0);

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds };
};

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const pageVariants: Variants = {
  initial: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeOutExpo, delay: 0.15 },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

const headerContainerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const headerNavVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const heroTextContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.22, staggerChildren: 0.16 },
  },
};

const heroSubheadingVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

const heroHeadingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOutExpo },
  },
};

const heroParagraphVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

const heroCardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const events = [
  {
    title: 'RECURSIA',
    description:
      'A collaborative hackathon where interdisciplinary teams prototype innovative solutions and showcase their coding prowess in a competitive environment.',
    tags: ['Hackathon', 'Technical', 'Competition'],
    schedule: 'Nov 1 • 3:30 PM • G04',
  },
  {
    title: 'NEURAL NEXUS',
    description:
      'An exciting technical event focused on AI and machine learning challenges that test your problem-solving skills and innovation.',
    tags: ['AI/ML', 'Technical', 'Epoch'],
    schedule: 'Nov 1 • Post-Inauguration • G04',
  },
  {
    title: 'BATTLE OF BEATS AND VOICES',
    description:
      'Showcase your musical and vocal talents in this thrilling competition where rhythm meets creativity. A platform for artists to shine.',
    tags: ['Cultural', 'Music', 'Performance'],
    schedule: 'Nov 1 • 5:45 PM • Reverb',
  },
  {
    title: 'CHAKRAVYUH',
    description:
      'Navigate through complex technical and algorithmic challenges in this brain-teasing competition organized by GDG.',
    tags: ['Technical', 'GDG', 'Competition'],
    schedule: 'Nov 4 & 5 • 5:45 PM & 9:30 AM',
  },
  {
    title: 'DATA X HUNTER',
    description:
      'Test your data science skills in this intensive competition where you analyze, visualize, and extract insights from complex datasets.',
    tags: ['Data Science', 'Technical', 'Matrix'],
    schedule: 'Nov 5 • 5:30 PM',
  },
  {
    title: 'CINEMATIC ESSENCE',
    description:
      'Capture and present your photography and videography skills in this creative showcase organized by F-Stops.',
    tags: ['Cultural', 'Photography', 'Creative'],
    schedule: 'Nov 5 • 3:00 PM • Online',
  },
];

const faqs = [
  {
    question: 'When will UTKRISHTA be held?',
    answer:
      'UTKRISHTA will take place from November 1st to November 7th.',
  },
  {
    question: 'Does it include only technical events?',
    answer:
      'No, UTKRISHTA features a diverse range of technical, cultural, and fun events, offering something for everyone.',
  },
  {
    question: 'What kind of fun events will be there?',
    answer:
      'Fun events include BGMI, Ludo King, Valorant, Gully Cricket, and several other engaging activities.',
  },
  {
    question: 'Is there a limit to the number of events I can participate in?',
    answer:
      'No, there is no limit — you can participate in as many events as you like.',
  },
  {
    question: 'How can I register for the events?',
    answer:
      'Registrations will be done through the Campus Life App.',
  },
  {
    question: 'Can students from other colleges participate?',
    answer:
      'Unfortunately, UTKRISHTA is exclusively for IIIT Sri City students.',
  },
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'FAQs', href: '#faqs' },
];

const TechfestLandingPage: FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => computeTimeRemaining());
  const [logoSequenceComplete, setLogoSequenceComplete] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(computeTimeRemaining());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!logoSequenceComplete) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    return undefined;
  }, [logoSequenceComplete]);

  const handleLogoComplete = useCallback(() => {
    setLogoSequenceComplete(true);
  }, []);

  // Handle scrolling to section after logo animation completes (from schedule page)
  useEffect(() => {
    if (logoSequenceComplete) {
      const scrollToSection = sessionStorage.getItem('scrollToSection');
      if (scrollToSection) {
        sessionStorage.removeItem('scrollToSection');
        setTimeout(() => {
          const element = document.querySelector(`#${scrollToSection}`);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 300);
      }
    }
  }, [logoSequenceComplete]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const countdownItems = [
    { label: 'Days', value: Math.min(timeLeft.days, 999), pad: 1 },
    { label: 'Hours', value: timeLeft.hours, pad: 2 },
    { label: 'Minutes', value: timeLeft.minutes, pad: 2 },
    { label: 'Seconds', value: timeLeft.seconds, pad: 2 },
  ];
  const eventStarted = timeLeft.total === 0;
  const animationState = logoSequenceComplete ? 'visible' : 'hidden';

  return (
    <motion.div
      className="min-h-screen bg-slate-950 text-slate-100"
      variants={pageVariants}
      initial="initial"
      animate="visible"
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_65%)]"
        aria-hidden="true"
      />

      <motion.header
        className="app-header sticky top-0 z-50 border-b border-white/5 bg-slate-950/75 backdrop-blur-sm"
        variants={headerContainerVariants}
        initial="hidden"
        animate={animationState}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6 py-3 sm:py-4">
          <motion.a
            href="#home"
            onClick={(e) => {
              handleNavClick(e, '#home');
              setMobileMenuOpen(false);
            }}
            className="header-logo flex items-center gap-2 sm:gap-3 cursor-pointer"
            variants={headerItemVariants}
            initial="hidden"
            animate={animationState}
          >
            <img
              src="/uk25.png"
              alt="UTKRISHTA 2025 logo"
              className="h-8 sm:h-10 md:h-12 w-auto drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]"
            />
          </motion.a>
          <motion.nav
            className="nav-links ml-auto hidden items-center gap-6 lg:gap-8 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 md:flex"
            variants={headerNavVariants}
            initial="hidden"
            animate={animationState}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="transition-colors hover:text-white cursor-pointer"
                variants={headerItemVariants}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
          <motion.a
            href="#register"
            onClick={(e) => handleNavClick(e, '#register')}
            className="register-button hidden rounded-full border border-sky-400/70 px-4 lg:px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-sky-200 transition hover:border-sky-300 hover:text-white cursor-pointer md:inline-flex"
            variants={headerItemVariants}
            initial="hidden"
            animate={animationState}
          >
            Register
          </motion.a>
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              className="block h-0.5 w-6 bg-slate-300 rounded"
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-slate-300 rounded"
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-slate-300 rounded"
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu - Rendered via Portal to ensure proper z-index */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9998] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="fixed top-[73px] right-0 bottom-0 w-[280px] sm:w-[320px] bg-slate-950 border-l border-white/10 z-[9999] md:hidden"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <nav className="flex flex-col gap-1 p-6 h-full overflow-y-auto">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        handleNavClick(e, link.href);
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 rounded-lg transition-colors hover:bg-white/5 hover:text-white cursor-pointer whitespace-nowrap"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  <motion.a
                    href="#register"
                    onClick={(e) => {
                      handleNavClick(e, '#register');
                      setMobileMenuOpen(false);
                    }}
                    className="mt-4 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-200 border border-sky-400/70 rounded-lg text-center transition hover:border-sky-300 hover:text-white hover:bg-sky-400/10 cursor-pointer whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    Register
                  </motion.a>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-28 px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <section id="home" className="hero-section-banner relative flex min-h-[80vh] flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 overflow-hidden">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-12">
            <div className="relative flex w-full flex-col items-center">
              <motion.div
                className="relative z-10 w-full hero-logo"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <LogoTeaserAnimation
                  onComplete={handleLogoComplete}
                  mode="inline"
                  showPresenter={false}
                  showSubtitle={false}
                />
              </motion.div>
            </div>

            <motion.div
              className="max-w-3xl"
              variants={heroTextContainerVariants}
              initial="hidden"
              animate={animationState}
            >
              <motion.div
                className="hero-subheading mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.6em] text-sky-300/90"
                variants={heroSubheadingVariants}
              >
                <span className="rounded-full bg-sky-400/20 px-3 py-1 text-xs font-semibold text-sky-200">IIIT SriCity Presents</span>
                <span>annual techno fest</span>
              </motion.div>
              <motion.h1
                className="hero-main-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-white px-2 sm:px-0"
                variants={heroHeadingVariants}
              >
                Innovation Through Collaboration
              </motion.h1>
              <motion.p
                className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl text-slate-300 px-2 sm:px-0"
                variants={heroParagraphVariants}
              >
                A cinematic tech carnival where coders, designers, storytellers, and makers co-create the next wave of human-centered innovation.
              </motion.p>
              <motion.div
                id="register"
                className="mt-10 w-full max-w-2xl"
                variants={heroCardVariants}
              >
                <div className="rounded-3xl border border-sky-500/40 bg-slate-950/70 p-6 shadow-lg shadow-sky-500/20 backdrop-blur">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.45em] text-sky-200">
                    <span>THE COUNTDOWN IS FINAL. BE READY.</span>
                    <span className="text-sky-100">Nov 01</span>
                  </div>
                  <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-4">
                    {countdownItems.map((item) => (
                      <div
                        key={item.label}
                        className="relative overflow-hidden rounded-2xl border border-sky-500/30 bg-slate-900/80 p-4 shadow-inner shadow-sky-500/10"
                      >
                        <span
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_70%)]"
                          aria-hidden="true"
                        />
                        <span className="relative z-10 text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.4em] sm:tracking-[0.5em] md:tracking-[0.6em] text-sky-300">{item.label}</span>
                        <span className="relative z-10 mt-1 sm:mt-2 block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
                          {item.value.toString().padStart(item.pad, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.30em] text-slate-400">
                    {eventStarted
                      ? 'UTKRISHTA is live — dive in and claim your collab pod.'
                      : 'Sync your crew. Gates open sharp at midnight on November 1st.'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={sectionVariants}
            transition={{ staggerChildren: 0.15 }}
          >
            {["5K+ Innovators", "48 Hrs of Creation", "70+ Mentors"].map((stat, index) => (
              <motion.div
                key={stat}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur"
                variants={sectionVariants}
              >
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-400">Highlight 0{index + 1}</p>
                <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-semibold text-white">{stat}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <motion.section
          className="flex flex-col gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Memories from Previous Years</h2>
            <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-slate-300">
              Relive the magic of past UTKRISHTA festivals through these unforgettable moments.
            </p>
          </div>
          <ImageCarousel />
        </motion.section>

        <motion.section
          id="about"
          className="grid gap-12 md:grid-cols-[1.2fr_1fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="mt-8 md:mt-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Why Innovation Thrives Here</h2>
            <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base text-slate-300">
            UTKRISHTA, the Techno-Cultural Festival of IIIT Sri City, is a celebration of innovation, creativity, and spirit. It serves as a vibrant platform where technology meets art, ideas meet execution, and students push the limits of imagination.
            </p>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400">
            The festival embodies the institute's vision of empowering young minds to explore, create, and collaborate. With an exciting mix of technical, cultural, and entrepreneurial events, UTKRISHTA offers students the opportunity to showcase their skills, connect with peers, and gain transformative experiences. It's more than just a fest it's a movement that celebrates knowledge, creativity, and the unstoppable drive to achieve excellence.
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10 grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-sky-400/30 bg-sky-400/10 p-5 text-sky-100">
                <p className="text-sm uppercase tracking-[0.4em]">Collab Arenas</p>
                <p className="mt-3 text-xl font-semibold">Domain mash-ups that accelerate moonshot thinking.</p>
              </div>
              <div className="rounded-3xl border border-indigo-400/30 bg-indigo-400/10 p-5 text-indigo-100">
                <p className="text-sm uppercase tracking-[0.4em]">Mentor Speedruns</p>
                <p className="mt-3 text-xl font-semibold">Meet industry catalysts, venture scouts, and alumni champions.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <div id="about-college" className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 text-slate-200 backdrop-blur">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">About IIIT Sri City</h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                Indian Institute of Information Technology Sri City (IIITS), Chittoor, established in 2013 by the Government of India, is an Institute of National Importance created under the Public-Private Partnership (PPP) model. The institute is a collaborative venture between the Government of India, the Government of Andhra Pradesh, and Sri City Pvt. Ltd.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-950 p-6">
              <h3 className="text-xl font-semibold text-white">Pulse of the Fest</h3>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
                <li>⚡ Lightning Labs every morning</li>
                <li>🎛️ Collaboration Studio with realtime dashboards</li>
                <li>🛰️ Student ventures pitching to micro-funds</li>
                <li>🎶 Sundown synthwave social + creator lounge</li>
              </ul>
              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-800/40 p-4 text-xs uppercase tracking-[0.35em] text-slate-300">
                Curated by the UTKRISHTA student council with support from IIIT Sri City innovation partners.
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="events"
          className="flex flex-col gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Seven Days. Infinite Collaboration.</h2>
              <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-slate-300">
                Experience a week-long celebration of innovation, creativity, and talent. From technical hackathons to cultural performances, gaming tournaments to sports competitions - UTKRISHTA offers something for everyone.
              </p>
            </div>
            <Link
              to="/schedule"
              className="group relative inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-sky-400/10 px-6 py-3 text-xs uppercase tracking-[0.45em] text-sky-200 shadow-lg shadow-sky-400/30 transition-all hover:border-sky-300 hover:bg-sky-400/20 hover:text-white hover:shadow-xl hover:shadow-sky-400/50"
            >
              <span className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl transition-opacity group-hover:opacity-75"></span>
              <span className="relative">View Schedule →</span>
            </Link>
          </div>

          <div className="grid gap-5 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.title}
                className="flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur"
              >
                <div>
                  <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-sky-300">Featured Event</span>
                  <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-semibold text-white">{event.title}</h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-300">{event.description}</p>
                </div>
                <div className="mt-4 sm:mt-5 md:mt-6 space-y-2 sm:space-y-3 text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-400">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {event.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-2.5 sm:px-3 py-1 text-[0.55rem] sm:text-[0.6rem] text-sky-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm">{event.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-[1fr_1fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-linear-to-br from-blue-900/40 to-slate-900 p-5 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white">Collaboration Arenas</h3>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-300">
              Choose from hybrid pods: AI + Design, BioTech + Data, Robotics + Storytelling, and more. Each arena pairs you with co-pilots who complement your craft.
            </p>
            <ul className="mt-4 sm:mt-5 md:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-200">
              <li>↳ Daily sync huddles facilitated by alumni mentors</li>
              <li>↳ Immersive prototyping suites with spatial computing rigs</li>
              <li>↳ Collaboration heatmaps tracking your impact in real-time</li>
            </ul>
          </div>
          <div className="grid gap-4 sm:gap-5 md:gap-6">
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 text-xs sm:text-sm text-slate-200 backdrop-blur">
              <p className="uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-400">Spotlight</p>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg text-white">
                “UTKRISHTA’s collab labs pushed our mixed reality healthcare prototype from idea to incubator-ready in three days.”
              </p>
              <span className="mt-4 block text-xs uppercase tracking-[0.3em] text-slate-400">
                2024 Winning Team — Project SyncPulse
              </span>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-200">
              <p className="uppercase tracking-[0.4em] text-slate-400">Powered By</p>
              <p className="mt-3 text-lg text-white">
                IIIT Sri City Innovation Lab · Sri City Smart Ecosystem · Industry Guild Partners · Alumni Collective
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="faqs"
          className="flex flex-col gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">FAQs</h2>
            <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-slate-300">
              Everything you need to know to plug into the UTKRISHTA energy.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{faq.question}</p>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0"
                    >
                      <svg
                        className="h-5 w-5 text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-slate-200">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/5 bg-slate-950/80 py-6 sm:py-8 md:py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 text-xs uppercase tracking-[0.4em] text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} UTKRISHTA · IIIT Sri City</span>
          <div className="flex flex-wrap gap-4">
            <a href="#register" className="hover:text-sky-200">
              Become a Partner
            </a>
            <a href="mailto:utkrishta@iiits.in" className="hover:text-sky-200">
              Contact Us
            </a>
            <a href="#" className="hover:text-sky-200">
              Code of Collaboration
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default TechfestLandingPage;
