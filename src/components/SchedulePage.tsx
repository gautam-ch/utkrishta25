import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface EventDetail {
  title: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  schedule: string;
  date?: string;
  venue?: string;
  rules?: string[];
  prizes?: string;
  registration?: string;
}

const eventDetails: EventDetail[] = [
  {
    title: 'Inauguration',
    description: 'Official opening ceremony of UTKRISHTA 2025',
    fullDescription: 'Join us for the grand inauguration ceremony marking the beginning of UTKRISHTA 2025, where we celebrate innovation, creativity, and collaboration.',
    tags: ['Opening', 'Ceremony'],
    schedule: 'Nov 1 • 11:00 AM',
    date: 'November 1, 2025 • 11:00 AM',
    venue: 'G04',
  },
  {
    title: 'ElectroQuest',
    description: 'An electrifying technical event organized by Connexion.',
    tags: ['Technical', 'Connexion'],
    schedule: 'Nov 1 • Post-Inauguration',
    date: 'November 1, 2025 • Post-Inauguration',
    venue: 'G04',
  },
  {
    title: 'Synergia',
    description: 'A collaborative technical challenge organized by Nexsync.',
    tags: ['Technical', 'Nexsync'],
    schedule: 'Nov 1 • Post-Inauguration',
    date: 'November 1, 2025 • Post-Inauguration',
    venue: 'G04',
  },
  {
    title: 'Neural Nexus',
    description: 'An AI and machine learning focused event organized by Epoch.',
    tags: ['AI/ML', 'Technical', 'Epoch'],
    schedule: 'Nov 1 • Post-Inauguration',
    date: 'November 1, 2025 • Post-Inauguration',
    venue: 'G04',
  },
  {
    title: 'Problem Statement Declaration',
    description: 'Official announcement of problem statements for various competitions.',
    tags: ['Official'],
    schedule: 'Nov 1 • 12:00 PM',
    date: 'November 1, 2025 • 12:00 PM',
    venue: 'G04',
  },
  {
    title: 'Recursia',
    description: 'A hackathon discussion and competition organized by Gradient.',
    tags: ['Hackathon', 'Technical', 'Gradient'],
    schedule: 'Nov 1 • 3:30 PM - 5:30 PM',
    date: 'November 1, 2025 • 3:30 PM - 5:30 PM',
    venue: 'G04',
  },
  {
    title: 'Battle of Beats and Voices',
    description: 'A musical and vocal competition organized by Reverb.',
    tags: ['Cultural', 'Music', 'Performance', 'Reverb'],
    schedule: 'Nov 1 • 5:45 PM - 6:45 PM',
    date: 'November 1, 2025 • 5:45 PM - 6:45 PM',
    venue: 'Reverb',
  },
  {
    title: 'Free Fire',
    description: 'Gaming tournament featuring Free Fire, starting with knockout stage.',
    tags: ['Gaming', 'Esports'],
    schedule: 'Nov 1 • 5:45 PM',
    date: 'November 1, 2025 • 5:45 PM onwards',
  },
  {
    title: 'Snakes and Coderssss',
    description: 'A coding competition with a twist, organized by Enigma.',
    tags: ['Technical', 'Coding', 'Enigma'],
    schedule: 'Nov 2 & 3 • 9:30 AM & 5:45 PM',
    date: 'November 2, 2025 • 9:30 AM - 10:30 AM\nNovember 3, 2025 • 5:45 PM - 7:45 PM',
    venue: 'Enigma',
  },
  {
    title: 'Origin of Universe',
    description: 'An exploration event organized by Nirvana.',
    tags: ['Technical', 'Nirvana'],
    schedule: 'Nov 2 • 9:30 AM - 10:30 AM',
    date: 'November 2, 2025 • 9:30 AM - 10:30 AM',
  },
  {
    title: 'Gully Cricket',
    description: 'An exciting cricket tournament bringing sportsmanship and competition together.',
    tags: ['Sports', 'Cricket'],
    schedule: 'Nov 2 • Multiple slots',
    date: 'November 2, 2025 • 9:30 AM - 8:30 PM',
  },
  {
    title: 'Frame by Frame',
    description: 'A creative photography and videography event organized by Mise-en-scène.',
    tags: ['Cultural', 'Photography', 'Creative', 'Mise-en-scène'],
    schedule: 'Nov 2 • 3:00 PM - 4:30 PM',
    date: 'November 2, 2025 • 3:00 PM - 4:30 PM',
  },
  {
    title: 'Ludo King',
    description: 'A fun gaming competition featuring the classic board game.',
    tags: ['Gaming', 'Casual'],
    schedule: 'Nov 2 • 4:30 PM - 5:30 PM',
    date: 'November 2, 2025 • 4:30 PM - 5:30 PM',
  },
  {
    title: 'CineRemake',
    description: 'A creative filmmaking challenge organized by Mise-en-scène.',
    tags: ['Cultural', 'Filmmaking', 'Creative', 'Mise-en-scène'],
    schedule: 'Nov 2 • 5:45 PM - 6:45 PM',
    date: 'November 2, 2025 • 5:45 PM - 6:45 PM',
  },
  {
    title: 'CSS Battle',
    description: 'A web design and CSS competition organized by IOTA.',
    tags: ['Technical', 'Web Design', 'IOTA'],
    schedule: 'Nov 3 & 4 • 5:45 PM',
    date: 'November 3, 2025 • 5:45 PM - 7:45 PM\nNovember 4, 2025 • 5:45 PM - 7:45 PM',
    venue: 'IOTA',
  },
  {
    title: 'Dance Till You Drop',
    description: 'A high-energy dance competition organized by Beatripperzz.',
    tags: ['Cultural', 'Dance', 'Performance', 'Beatripperzz'],
    schedule: 'Nov 3 • 5:45 PM - 7:45 PM',
    date: 'November 3, 2025 • 5:45 PM - 7:45 PM',
  },
  {
    title: 'Smash Karts',
    description: 'An exciting kart racing gaming tournament.',
    tags: ['Gaming', 'Racing'],
    schedule: 'Nov 3 • 5:45 PM - 7:45 PM',
    date: 'November 3, 2025 • 5:45 PM - 7:45 PM',
  },
  {
    title: 'Chakravyuh',
    description: 'Navigate through complex challenges in this technical competition organized by GDG.',
    tags: ['Technical', 'GDG', 'Competition'],
    schedule: 'Nov 4 & 5 • 5:45 PM & 9:30 AM',
    date: 'November 4, 2025 • 5:45 PM - 7:45 PM\nNovember 5, 2025 • 9:30 AM - 10:30 AM',
    venue: 'GDG',
  },
  {
    title: 'Face Painting',
    description: 'A creative artistic event organized by Meraki.',
    tags: ['Cultural', 'Art', 'Creative', 'Meraki'],
    schedule: 'Nov 4 • 5:45 PM - 7:45 PM',
    date: 'November 4, 2025 • 5:45 PM - 7:45 PM',
  },
  {
    title: 'Valorant',
    description: 'Competitive Valorant gaming tournament.',
    tags: ['Gaming', 'Esports', 'FPS'],
    schedule: 'Nov 4 • 5:45 PM - 7:45 PM',
    date: 'November 4, 2025 • 5:45 PM - 7:45 PM',
  },
  {
    title: 'Debattle: The Oxford Style',
    description: 'A formal debate competition in Oxford style format organized by Keynote.',
    tags: ['Debate', 'Keynote', 'Academic'],
    schedule: 'Nov 5 • 9:30 AM - 10:30 AM',
    date: 'November 5, 2025 • 9:30 AM - 10:30 AM',
  },
  {
    title: 'Dodge Ball',
    description: 'An energetic sports tournament featuring dodgeball.',
    tags: ['Sports', 'Dodgeball'],
    schedule: 'Nov 5 • Multiple slots',
    date: 'November 5, 2025 • 9:30 AM - 6:30 PM',
  },
  {
    title: 'Cinematic Essence',
    description: 'A photography and videography showcase organized by F-Stops.',
    tags: ['Cultural', 'Photography', 'Creative', 'F-Stops'],
    schedule: 'Nov 5 • 3:00 PM - 4:30 PM',
    date: 'November 5, 2025 • 3:00 PM - 4:30 PM',
  },
  {
    title: 'Powerlifting',
    description: 'A strength competition showcasing physical prowess.',
    tags: ['Sports', 'Strength', 'Fitness'],
    schedule: 'Nov 5 • 3:00 PM - 4:30 PM',
    date: 'November 5, 2025 • 3:00 PM - 4:30 PM',
  },
  {
    title: 'Battle of Drills',
    description: 'A fitness and drill competition organized by Health and Fitness Club.',
    tags: ['Sports', 'Fitness', 'Health and Fitness Club'],
    schedule: 'Nov 5 & 6 • 4:30 PM & 5:45 PM',
    date: 'November 5, 2025 • 4:30 PM - 5:30 PM\nNovember 6, 2025 • 5:45 PM - 7:45 PM',
  },
  {
    title: 'E-Sell Event',
    description: 'An entrepreneurial event focused on selling and marketing skills.',
    tags: ['Business', 'Entrepreneurship'],
    schedule: 'Nov 5 • 4:30 PM - 5:30 PM',
    date: 'November 5, 2025 • 4:30 PM - 5:30 PM',
  },
  {
    title: 'Data X Hunter',
    description: 'A data science competition organized by Matrix.',
    tags: ['Data Science', 'Technical', 'Matrix'],
    schedule: 'Nov 5 • 5:30 PM - 7:30 PM',
    date: 'November 5, 2025 • 5:30 PM - 7:30 PM',
  },
  {
    title: 'Face Off Frenzy',
    description: 'An exciting competition organized by Beatripperzz.',
    tags: ['Cultural', 'Competition', 'Beatripperzz'],
    schedule: 'Nov 5 • 5:30 PM - 7:30 PM',
    date: 'November 5, 2025 • 5:30 PM - 7:30 PM',
  },
  {
    title: 'SellFiesta',
    description: 'An entrepreneurial selling competition organized by E-Cell.',
    tags: ['Business', 'Entrepreneurship', 'E-Cell'],
    schedule: 'Nov 6 • 5:45 PM - 7:45 PM',
    date: 'November 6, 2025 • 5:45 PM - 7:45 PM',
  },
  {
    title: 'BGMI',
    description: 'BattleGrounds Mobile India gaming tournament.',
    tags: ['Gaming', 'Esports', 'Mobile'],
    schedule: 'Nov 6 • 5:45 PM - 7:45 PM',
    date: 'November 6, 2025 • 5:45 PM - 7:45 PM',
  },
  {
    title: 'Closure Ceremony',
    description: 'The grand closing ceremony of UTKRISHTA 2025.',
    tags: ['Closing', 'Ceremony'],
    schedule: 'Nov 7 • 5:45 PM - 7:45 PM',
    date: 'November 7, 2025 • 5:45 PM - 7:45 PM',
  },
];

const SchedulePage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '/' || href === '/#home') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      return;
    }
    
    const section = href.split('#')[1];
    // Store the target section in sessionStorage
    sessionStorage.setItem('scrollToSection', section);
    navigate('/');
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen bg-slate-950 text-slate-100"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_65%)]"
        aria-hidden="true"
      />

      <motion.header
        className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/75 backdrop-blur-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4">
          <Link
            to="/"
            onClick={(e) => {
              handleNavClick(e, '/');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          >
            <img
              src="/uk25.png"
              alt="UTKRISHTA 2025 logo"
              className="h-8 sm:h-10 md:h-12 w-auto drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]"
            />
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 lg:gap-8 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 md:flex">
              <Link
                to="/"
                onClick={(e) => handleNavClick(e, '/')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/#about"
                onClick={(e) => handleNavClick(e, '/#about')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                About
              </Link>
              <Link
                to="/#events"
                onClick={(e) => handleNavClick(e, '/#events')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                Events
              </Link>
              <Link
                to="/#faqs"
                onClick={(e) => handleNavClick(e, '/#faqs')}
                className="transition-colors hover:text-white cursor-pointer"
              >
                FAQs
              </Link>
            </nav>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg z-[100] relative"
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
                  <motion.a
                    href="/"
                    onClick={(e) => {
                      handleNavClick(e, '/');
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 rounded-lg transition-colors hover:bg-white/5 hover:text-white cursor-pointer whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                  >
                    Home
                  </motion.a>
                  <motion.a
                    href="/#about"
                    onClick={(e) => {
                      handleNavClick(e, '/#about');
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 rounded-lg transition-colors hover:bg-white/5 hover:text-white cursor-pointer whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    About
                  </motion.a>
                  <motion.a
                    href="/#events"
                    onClick={(e) => {
                      handleNavClick(e, '/#events');
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 rounded-lg transition-colors hover:bg-white/5 hover:text-white cursor-pointer whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Events
                  </motion.a>
                  <motion.a
                    href="/#faqs"
                    onClick={(e) => {
                      handleNavClick(e, '/#faqs');
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 rounded-lg transition-colors hover:bg-white/5 hover:text-white cursor-pointer whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    FAQs
                  </motion.a>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-28 px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.section
          className="flex flex-col gap-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">Event Schedule</h1>
            <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-slate-300">
              Complete details of all events happening during UTKRISHTA 2025.
            </p>
          </div>

          {eventDetails.length === 0 ? (
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-slate-300">Event details will be added here.</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-6 sm:gap-7 md:gap-8 md:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {eventDetails.map((event, index) => (
                <motion.div
                  key={event.title}
                  className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 backdrop-blur transition-transform hover:scale-[1.02] hover:border-white/20"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-sky-300">Event {index + 1}</span>
                    <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-white">{event.title}</h2>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-300">{event.description}</p>
                  </div>

                  {event.fullDescription && (
                    <div className="mt-4 sm:mt-5 md:mt-6">
                      <h3 className="text-base sm:text-lg font-semibold text-white">About the Event</h3>
                      <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">{event.fullDescription}</p>
                    </div>
                  )}

                  <div className="mt-4 sm:mt-5 md:mt-6 grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
                    {event.date && (
                      <div className="rounded-xl sm:rounded-2xl border border-sky-400/30 bg-sky-400/10 p-3 sm:p-4">
                        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-sky-200">Date & Time</p>
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-sky-100 whitespace-pre-line">{event.date}</p>
                      </div>
                    )}
                    {event.venue && (
                      <div className="rounded-xl sm:rounded-2xl border border-indigo-400/30 bg-indigo-400/10 p-3 sm:p-4">
                        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-indigo-200">Venue</p>
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-indigo-100">{event.venue}</p>
                      </div>
                    )}
                  </div>

                  {event.tags.length > 0 && (
                    <div className="mt-4 sm:mt-5 md:mt-6">
                      <p className="mb-2 sm:mb-3 text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-400">Categories</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/10 px-2.5 sm:px-3 py-1 text-[0.6rem] sm:text-[0.65rem] text-sky-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.rules && event.rules.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">Rules & Guidelines</h3>
                      <ul className="space-y-2 text-sm text-slate-300">
                        {event.rules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-sky-400">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.prizes && (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-slate-800/40 p-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Prizes</p>
                      <p className="mt-2 text-sm text-slate-200">{event.prizes}</p>
                    </div>
                  )}

                  {event.registration && (
                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Registration</p>
                      <p className="mt-2 text-sm text-slate-300">{event.registration}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      </main>

      <footer className="border-t border-white/5 bg-slate-950/80 py-6 sm:py-8 md:py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 text-xs uppercase tracking-[0.4em] text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} UTKRISHTA · IIIT Sri City</span>
          <div className="flex flex-wrap gap-4">
            <Link to="/#register" className="hover:text-sky-200">
              Become a Partner
            </Link>
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

export default SchedulePage;

