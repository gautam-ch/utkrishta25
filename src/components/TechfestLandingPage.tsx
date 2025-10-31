import React, { useCallback, useEffect, useState, useRef, useMemo, type FC } from 'react';
import { createPortal } from 'react-dom';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LogoTeaserAnimation from './LogoTeaserAnimation';

// Image array constant
const CAROUSEL_IMAGES = [
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

const FOOTER_SOCIAL_LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/utkrishtaiiits',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/student-development-council-iiit-sri-city/posts/?feedView=all',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@iiit-sricity9081',
  }
] as const;

// Timeline Component
const EventsTimeline: FC = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const currentEvents = eventsByDay[selectedDay] || [];

  const timelineItemVariants: Variants = {
    hidden: { opacity: 0, x: -50, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      rotateY: 15,
      transition: {
        duration: 0.4,
        ease: easeOutExpo,
      },
    },
  };

  const cardHoverVariants: Variants = {
    rest: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
    },
    hover: {
      scale: 1.03,
      rotateX: 2,
      rotateY: -2,
      z: 10,
      transition: {
        duration: 0.3,
        ease: easeOutExpo,
      },
    },
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Day Selection Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <motion.button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold overflow-hidden ${
              selectedDay === day
                ? 'border-sky-400 bg-sky-400/20 text-sky-200 shadow-lg shadow-sky-400/30'
                : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, delay: day * 0.06, ease: easeOutExpo }}
          >
            {selectedDay === day && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl"
                  layoutId="activeDay"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.7 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sky-400/20 via-sky-400/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              </>
            )}
            <span className="relative z-10">Day {day}</span>
          </motion.button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Animated Vertical Line with Glow */}
        <motion.div
          className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/60 via-sky-400/40 to-slate-800/40" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-sky-400/80 via-sky-400/60 to-slate-800/40 blur-sm"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Animated pulse dots along the line */}
          {currentEvents.map((_, index) => (
            <motion.div
              key={`pulse-${index}`}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400"
              style={{
                top: `${(index / (currentEvents.length - 1 || 1)) * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Timeline Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.15,
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  staggerChildren: 0.1,
                  staggerDirection: -1,
                },
              },
            }}
            className="space-y-6 sm:space-y-8"
          >
            {currentEvents.map((event, index) => (
              <motion.div
                key={`${selectedDay}-${index}`}
                variants={timelineItemVariants}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                {/* Connecting Line to Card */}
                <motion.div
                  className="absolute left-6 sm:left-8 top-6 sm:top-7 w-4 sm:w-6 h-0.5 bg-gradient-to-r from-sky-400/60 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.5, ease: easeOutExpo }}
                />

                {/* Timeline Dot with Pulse Animation */}
                <div className="relative z-10 flex-shrink-0">
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-sky-400/30 blur-md"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-sky-400/60 bg-slate-950 flex items-center justify-center backdrop-blur relative overflow-hidden"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.2 + 0.2, 
                      type: "spring", 
                      bounce: 0.5,
                      duration: 0.8 
                    }}
                    whileHover={{ scale: 1.15, rotate: 360 }}
                  >
                    {/* Rotating gradient inside */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-sky-400/40 to-sky-600/20"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div
                      className="relative w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-sky-400 shadow-lg shadow-sky-400/70 z-10"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(56, 189, 248, 0.7)',
                          '0 0 0 8px rgba(56, 189, 248, 0)',
                          '0 0 0 0 rgba(56, 189, 248, 0)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>
                  {/* Time Badge */}
                  <motion.div
                    className="absolute -top-2 -left-2 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-sky-400/20 border border-sky-400/40 text-[0.6rem] sm:text-xs font-medium text-sky-200 backdrop-blur-sm"
                    initial={{ opacity: 0, y: -15, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.2 + 0.4,
                      type: "spring",
                      bounce: 0.4 
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {event.time}
                  </motion.div>
                </div>

                {/* Event Card with Enhanced Animations */}
                <motion.div
                  className="flex-1 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur group relative overflow-hidden"
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  style={{ perspective: 1000 }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-400/10 via-sky-400/5 to-transparent"
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute -inset-0.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-400/20 via-sky-400/10 to-sky-400/20 opacity-0 blur-sm"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                      {event.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          className="rounded-full bg-sky-400/20 border border-sky-400/30 px-2.5 sm:px-3 py-1 text-[0.55rem] sm:text-[0.6rem] text-sky-200 font-medium backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.5, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ 
                            delay: index * 0.2 + tagIndex * 0.08 + 0.3,
                            type: "spring",
                            bounce: 0.5 
                          }}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: 'rgba(56, 189, 248, 0.3)',
                            borderColor: 'rgba(56, 189, 248, 0.6)',
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    
                    <motion.h3 
                      className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-sky-200 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      {event.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 sm:mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.6 }}
                    >
                      {event.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Image Carousel Component
const ImageCarousel: FC = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const gap = 16; // gap between cards in pixels
  const activeCardTimeout = useRef<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => () => {
    if (activeCardTimeout.current != null) {
      window.clearTimeout(activeCardTimeout.current);
    }
  }, []);

  const handleActivateCard = useCallback((index: number) => {
    setActiveIndex(index);
    if (activeCardTimeout.current != null) {
      window.clearTimeout(activeCardTimeout.current);
    }
    activeCardTimeout.current = window.setTimeout(() => {
      setActiveIndex((current) => (current === index ? null : current));
    }, 1500);
  }, []);

  const cardsPerView = useMemo(() => {
    if (screenWidth >= 1280) return 4;
    if (screenWidth >= 1024) return 3;
    if (screenWidth >= 768) return 2.5;
    if (screenWidth >= 480) return 2;
    return 1.4;
  }, [screenWidth]);

  // Calculate card size based on dynamic cards per view and include gaps
  const cardSize = screenWidth > 0
    ? Math.floor((screenWidth - gap * (cardsPerView - 1)) / cardsPerView)
    : 240;

  // Duplicate images for seamless loop (2 sets is enough for smooth looping)
  const duplicatedImages = useMemo(() => [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES], []);

  // Calculate total distance to scroll (one full set of images)
  const scrollDistance = useMemo(
    () => (cardSize + gap) * CAROUSEL_IMAGES.length,
    [cardSize, gap]
  );

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: screenWidth >= 1024 ? '100vw' : '100%',
        marginLeft: screenWidth >= 1024 ? 'calc(-50vw + 50%)' : undefined,
        marginRight: screenWidth >= 1024 ? 'calc(-50vw + 50%)' : undefined,
      }}
    >
      <div 
        className="relative overflow-hidden"
        style={{
          height: `${cardSize}px`,
          width: '100vw',
          willChange: 'contents',
        }}
      >
        <motion.div
          className="flex items-center h-full"
          style={{
            gap: `${gap}px`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: screenWidth > 0 ? [0, -scrollDistance] : 0,
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: CAROUSEL_IMAGES.length * 4,
              ease: "linear",
            },
          }}
        >
          {duplicatedImages.map((image, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={`${image}-${index}`}
                className="flex-shrink-0 relative group"
                style={{
                  width: `${cardSize}px`,
                  height: `${cardSize}px`,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === 'touch') {
                    handleActivateCard(index);
                  }
                }}
              >
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/20 bg-white/5 overflow-hidden">
                  <img
                    src={image}
                    alt={`UTKRISHTA Previous Year ${(index % CAROUSEL_IMAGES.length) + 1}`}
                    className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${isActive ? 'grayscale-0' : 'grayscale'} group-hover:grayscale-0`}
                    loading="lazy"
                    style={{
                      willChange: 'filter',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </motion.div>
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

// Events organized by day (Day 1 = Nov 1, Day 2 = Nov 2, etc.) - All 31 events from schedule page
const eventsByDay: Record<number, Array<{
  title: string;
  description: string;
  tags: string[];
  time: string;
}>> = {
  1: [
    {
      title: 'Inauguration',
      description: 'Official opening ceremony of UTKRISHTA 2025',
      tags: ['Opening', 'Ceremony'],
      time: '11:00 AM',
    },
    {
      title: 'ElectroQuest',
      description: 'An electrifying technical event organized by Connexion.',
      tags: ['Technical', 'Connexion'],
      time: 'Post-Inauguration',
    },
    {
      title: 'Synergia',
      description: 'A collaborative technical challenge organized by Nexsync.',
      tags: ['Technical', 'Nexsync'],
      time: 'Post-Inauguration',
    },
    {
      title: 'Neural Nexus',
      description: 'An AI and machine learning focused event organized by Epoch.',
      tags: ['AI/ML', 'Technical', 'Epoch'],
      time: 'Post-Inauguration',
    },
    {
      title: 'Problem Statement Declaration',
      description: 'Official announcement of problem statements for various competitions.',
      tags: ['Official'],
      time: '12:00 PM',
    },
    {
      title: 'Recursia',
      description: 'A hackathon discussion and competition organized by Gradient.',
      tags: ['Hackathon', 'Technical', 'Gradient'],
      time: '3:30 PM - 5:30 PM',
    },
    {
      title: 'Battle of Beats and Voices',
      description: 'A musical and vocal competition organized by Reverb.',
      tags: ['Cultural', 'Music', 'Performance', 'Reverb'],
      time: '5:45 PM - 6:45 PM',
    },
    {
      title: 'Free Fire',
      description: 'Gaming tournament featuring Free Fire, starting with knockout stage.',
      tags: ['Gaming', 'Esports'],
      time: '5:45 PM',
    },
  ],
  2: [
    {
      title: 'Snakes and Coderssss',
      description: 'A coding competition with a twist, organized by Enigma.',
      tags: ['Technical', 'Coding', 'Enigma'],
      time: '9:30 AM - 10:30 AM',
    },
    {
      title: 'Origin of Universe',
      description: 'An exploration event organized by Nirvana.',
      tags: ['Technical', 'Nirvana'],
      time: '9:30 AM - 10:30 AM',
    },
    {
      title: 'Gully Cricket',
      description: 'An exciting cricket tournament bringing sportsmanship and competition together.',
      tags: ['Sports', 'Cricket'],
      time: '9:30 AM - 8:30 PM',
    },
    {
      title: 'Frame by Frame',
      description: 'A creative photography and videography event organized by Mise-en-scène.',
      tags: ['Cultural', 'Photography', 'Creative', 'Mise-en-scène'],
      time: '3:00 PM - 4:30 PM',
    },
    {
      title: 'Ludo King',
      description: 'A fun gaming competition featuring the classic board game.',
      tags: ['Gaming', 'Casual'],
      time: '4:30 PM - 5:30 PM',
    },
    {
      title: 'CineRemake',
      description: 'A creative filmmaking challenge organized by Mise-en-scène.',
      tags: ['Cultural', 'Filmmaking', 'Creative', 'Mise-en-scène'],
      time: '5:45 PM - 6:45 PM',
    },
  ],
  3: [
    {
      title: 'Snakes and Coderssss',
      description: 'A coding competition with a twist, organized by Enigma.',
      tags: ['Technical', 'Coding', 'Enigma'],
      time: '5:45 PM - 7:45 PM',
    },
    {
      title: 'CSS Battle',
      description: 'A web design and CSS competition organized by IOTA.',
      tags: ['Technical', 'Web Design', 'IOTA'],
      time: '5:45 PM - 7:45 PM',
    },
    {
      title: 'Dance Till You Drop',
      description: 'A high-energy dance competition organized by Beatripperzz.',
      tags: ['Cultural', 'Dance', 'Performance', 'Beatripperzz'],
      time: '5:45 PM - 7:45 PM',
    },
    {
      title: 'Smash Karts',
      description: 'An exciting kart racing gaming tournament.',
      tags: ['Gaming', 'Racing'],
      time: '5:45 PM - 7:45 PM',
    },
  ],
  4: [
    {
      title: 'CSS Battle',
      description: 'A web design and CSS competition organized by IOTA.',
      tags: ['Technical', 'Web Design', 'IOTA'],
      time: '5:45 PM - 7:45 PM',
    },
    {
      title: 'Chakravyuh',
      description: 'Navigate through complex challenges in this technical competition organized by GDG.',
      tags: ['Technical', 'GDG', 'Competition'],
      time: '5:45 PM - 7:45 PM',
    },
    {
      title: 'Face Painting',
      description: 'A creative artistic event organized by Meraki.',
      tags: ['Cultural', 'Art', 'Creative', 'Meraki'],
      time: '5:45 PM - 7:45 PM',
    },
    {
      title: 'Valorant',
      description: 'Competitive Valorant gaming tournament.',
      tags: ['Gaming', 'Esports', 'FPS'],
      time: '5:45 PM - 7:45 PM',
    },
  ],
  5: [
    {
      title: 'Chakravyuh',
      description: 'Navigate through complex challenges in this technical competition organized by GDG.',
      tags: ['Technical', 'GDG', 'Competition'],
      time: '9:30 AM - 10:30 AM',
    },
    {
      title: 'Debattle: The Oxford Style',
      description: 'A formal debate competition in Oxford style format organized by Keynote.',
      tags: ['Debate', 'Keynote', 'Academic'],
      time: '9:30 AM - 10:30 AM',
    },
    {
      title: 'Dodge Ball',
      description: 'An energetic sports tournament featuring dodgeball.',
      tags: ['Sports', 'Dodgeball'],
      time: '9:30 AM - 6:30 PM',
    },
    {
      title: 'Cinematic Essence',
      description: 'A photography and videography showcase organized by F-Stops.',
      tags: ['Cultural', 'Photography', 'Creative', 'F-Stops'],
      time: '3:00 PM - 4:30 PM',
    },
    {
      title: 'Powerlifting',
      description: 'A strength competition showcasing physical prowess.',
      tags: ['Sports', 'Strength', 'Fitness'],
      time: '3:00 PM - 4:30 PM',
    },
    {
      title: 'Battle of Drills',
      description: 'A fitness and drill competition organized by Health and Fitness Club.',
      tags: ['Sports', 'Fitness', 'Health and Fitness Club'],
      time: '4:30 PM - 5:30 PM',
    },
    {
      title: 'E-Sell Event',
      description: 'An entrepreneurial event focused on selling and marketing skills.',
      tags: ['Business', 'Entrepreneurship'],
      time: '4:30 PM - 5:30 PM',
    },
    {
      title: 'Data X Hunter',
      description: 'A data science competition organized by Matrix.',
      tags: ['Data Science', 'Technical', 'Matrix'],
      time: '5:30 PM - 7:30 PM',
    },
    {
      title: 'Face Off Frenzy',
      description: 'An exciting competition organized by Beatripperzz.',
      tags: ['Cultural', 'Competition', 'Beatripperzz'],
      time: '5:30 PM - 7:30 PM',
    },
  ],
  6: [
    {
      title: 'Battle of Drills',
      description: 'A fitness and drill competition organized by Health and Fitness Club.',
      tags: ['Sports', 'Fitness', 'Health and Fitness Club'],
      time: '5:45 PM - 7:45 PM',
    },
    {
      title: 'SellFiesta',
      description: 'An entrepreneurial selling competition organized by E-Cell.',
      tags: ['Business', 'Entrepreneurship', 'E-Cell'],
      time: '5:45 PM - 7:45 PM',
    },
    {
      title: 'BGMI',
      description: 'BattleGrounds Mobile India gaming tournament.',
      tags: ['Gaming', 'Esports', 'Mobile'],
      time: '5:45 PM - 7:45 PM',
    },
  ],
  7: [
    {
      title: 'Closure Ceremony',
      description: 'The grand closing ceremony of UTKRISHTA 2025.',
      tags: ['Closing', 'Ceremony'],
      time: '5:45 PM - 7:45 PM',
    },
  ],
};

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

type FooterSocialId = typeof FOOTER_SOCIAL_LINKS[number]['id'];

const FOOTER_SOCIAL_ICONS: Record<FooterSocialId, React.ReactNode> = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x={3.2} y={3.2} width={17.6} height={17.6} rx={5} />
      <circle cx={12} cy={12} r={4.2} />
      <circle cx={17.3} cy={6.7} r={0.8} fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x={3} y={3} width={18} height={18} rx={3.6} />
      <line x1={8.4} y1={10.3} x2={8.4} y2={16.5} />
      <line x1={8.4} y1={7.7} x2={8.4} y2={7.8} />
      <path d="M12.6 16.5V10.9c1.5-1 3.9-0.3 3.9 1.7v3.9" />
    </svg>
  ),
  youtube: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M3.5 8.6c0-1.6 1.2-3 2.8-3.2 3-0.4 8.4-0.4 11.4 0 1.6 0.2 2.8 1.6 2.8 3.2v6.8c0 1.6-1.2 3-2.8 3.2-3 0.4-8.4 0.4-11.4 0-1.6-0.2-2.8-1.6-2.8-3.2z" />
      <path d="M10.4 9.3l4.8 2.7-4.8 2.7z" fill="currentColor" stroke="none" />
    </svg>
  )
};

const FooterDivider: FC = () => (
  <div className="flex items-center justify-center gap-4">
    <span className="h-px w-14 bg-linear-to-r from-transparent via-sky-400/60 to-transparent" />
    <div className="grid h-2.5 w-2.5 rotate-45 place-items-center border border-sky-400/60 bg-slate-950" />
    <span className="h-px w-14 bg-linear-to-r from-transparent via-sky-400/60 to-transparent" />
  </div>
);

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
      const headerOffset = 100;
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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4">
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
          <div className="flex items-center gap-4">
            <motion.nav
              className="nav-links hidden items-center gap-6 lg:gap-8 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 md:flex"
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
              href="https://play.google.com/store/apps/details?id=com.campus.life.app"
              target="_blank"
              rel="noreferrer"
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
                    href="https://play.google.com/store/apps/details?id=com.campus.life.app"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
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
                className="hero-subheading mb-6 flex flex-col items-center -mt-5 gap-2 text-xs uppercase tracking-[0.45em] text-sky-300/90 sm:flex-row sm:gap-12 sm:text-sm sm:tracking-[0.6em]"
                variants={heroSubheadingVariants}
              >
                <span className="rounded-full bg-sky-400/20 px-3 py-1 text-[0.7rem] font-semibold text-sky-200 sm:text-xs">IIIT SriCity Presents</span>
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
                className="mt-8 sm:mt-10 w-full max-w-2xl px-2 sm:px-0"
                variants={heroCardVariants}
              >
                <div className="rounded-2xl sm:rounded-3xl border border-sky-500/40 bg-slate-950/70 p-4 sm:p-5 md:p-6 shadow-lg shadow-sky-500/20 backdrop-blur">
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-sky-200">
                    <span>THE COUNTDOWN IS FINAL. BE READY.</span>
                    <span className="text-sky-100">Nov 01</span>
                  </div>
                  <div className="mt-3 sm:mt-4 md:mt-6 grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 sm:grid-cols-4">
                    {countdownItems.map((item) => (
                      <div
                        key={item.label}
                        className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-sky-500/30 bg-slate-900/80 p-2.5 sm:p-3 md:p-4 shadow-inner shadow-sky-500/10"
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
                  <p className="mt-4 sm:mt-5 md:mt-6 text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.30em] text-slate-400 px-1 sm:px-0">
                    {eventStarted
                      ? 'UTKRISHTA is live — dive in and claim your collab pod. Don\'t forget to register via campus life app!'
                      : 'Sync your crew. Gates open sharp at midnight on November 1st. Download campus life app to register.'}
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
            {/* {["5K+ Innovators", "48 Hrs of Creation", "70+ Mentors"].map((stat, index) => (
              <motion.div
                key={stat}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur"
                variants={sectionVariants}
              >
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-400">Highlight 0{index + 1}</p>
                <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-semibold text-white">{stat}</p>
              </motion.div>
            ))} */}
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
                <p className="mt-3 text-xl font-semibold">Engage with club pioneers, hackathon winners, and creative trailblazers.</p>
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
                <li>⚡ High-Octane Hackathons & Tech Challenges</li>
                <li>🎮 Epic Esports & Gaming Showdowns</li>
                <li>🎶 Vibrant Cultural & Creative Contests</li>
                <li>🏆 Thrilling Sports & Fitness Battles</li>
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
              className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-sky-400/50 bg-sky-400/10 px-6 py-3 text-xs uppercase tracking-[0.45em] text-sky-200 shadow-lg shadow-sky-400/30 transition-all hover:border-sky-300 hover:bg-sky-400/20 hover:text-white hover:shadow-xl hover:shadow-sky-400/50 text-center"
            >
              <span className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl transition-opacity group-hover:opacity-75"></span>
              <span className="relative text-center">View Schedule →</span>
            </Link>
          </div>

          <EventsTimeline />
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
          <div className="grid items-start gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
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

      <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950/90">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/30 to-transparent" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-7 text-center">
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute h-20 w-20 rounded-full bg-sky-500/15 blur-2xl"
              animate={{ opacity: [0.2, 0.38, 0.2], scale: [0.88, 1.04, 0.88] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="/uk.png"
              alt="Utkrishta emblem"
              className="relative h-12 w-auto object-contain sm:h-16"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              animate={{ y: [0, -3, 0] }}
              whileHover={{ scale: 1.03 }}
            />
          </div>

          <FooterDivider />

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-sky-100">
            {FOOTER_SOCIAL_LINKS.map((social, index) => (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-sky-500/30 bg-slate-900/70 transition-shadow duration-300"
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.08 }}
                whileHover={{ scale: 1.08, rotate: 1.5, boxShadow: '0 0 22px rgba(56,189,248,0.3)' }}
                whileTap={{ scale: 0.94 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0"
                  style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(30,41,59,0) 65%)' }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <span className="relative text-sky-200">{FOOTER_SOCIAL_ICONS[social.id]}</span>
              </motion.a>
            ))}
          </div>

          <motion.p
            className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
          >
            Designed by IIITS Team
          </motion.p>

          <FooterDivider />

          <motion.div
            className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.3 }}
          >
            © {new Date().getFullYear()} Utkrishta · IIIT Sri City
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-sky-400/20 to-transparent" />
      </footer>
    </motion.div>
  );
};

export default TechfestLandingPage;
