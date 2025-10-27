import { useCallback, useEffect, useState, type FC } from 'react';
import { motion, type Variants } from 'framer-motion';
import LogoTeaserAnimation from './LogoTeaserAnimation';

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
    title: 'SYNC SUMMIT',
    description:
      'A 24-hour collaborative hackathon where interdisciplinary squads prototype solutions for a hyper-connected campus of tomorrow.',
    tags: ['Hackathon', 'AI', 'XR'],
    schedule: 'March 15 • Innovation Arena',
  },
  {
    title: 'CO-LAB SHOWCASE',
    description:
      'Immersive demos from student-founder duos, showcasing breakthroughs in robotics, bio-informatics, and climate-tech.',
    tags: ['Demos', 'Startups'],
    schedule: 'March 16 • Discovery Pavilion',
  },
  {
    title: 'AMPLIFY KEYNOTES',
    description:
      'Visionary product leaders and alumni reveal how collaboration scales impact across industries.',
    tags: ['Keynotes', 'Panels'],
    schedule: 'March 17 • Main Stage',
  },
];

const faqs = [
  {
    question: 'Who can participate in UTKRISHTA 2025?',
    answer:
      'Students, researchers, and early-stage founders from IIIT Sri City and partner institutions. Cross-disciplinary teams are highly encouraged.',
  },
  {
    question: 'Do I need a team in advance?',
    answer:
      'No. Join our on-site team formation mixer or collaborate through the UTKRISHTA app to find your crew before the hack tracks begin.',
  },
  {
    question: 'Is there a registration fee?',
    answer:
      'General access is complimentary. Premium passes for workshops and mentorship clinics will be available starting February 10.',
  },
  {
    question: 'Will sessions be streamed?',
    answer:
      'Keynotes and select finals will stream live for registered participants. Replays drop 48 hours after the fest concludes.',
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
        className="app-header sticky top-0 z-30 border-b border-white/5 bg-slate-950/75 backdrop-blur-sm"
        variants={headerContainerVariants}
        initial="hidden"
        animate={animationState}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          <motion.a
            href="#home"
            className="header-logo flex items-center gap-3"
            variants={headerItemVariants}
            initial="hidden"
            animate={animationState}
          >
            <img
              src="/uk25.png"
              alt="UTKRISHTA 2025 logo"
              className="h-12 w-auto drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]"
            />
          </motion.a>
          <motion.nav
            className="nav-links ml-auto hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.3em] text-slate-300 md:flex"
            variants={headerNavVariants}
            initial="hidden"
            animate={animationState}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-white"
                variants={headerItemVariants}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
          <motion.a
            href="#register"
            className="register-button hidden rounded-full border border-sky-400/70 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-200 transition hover:border-sky-300 hover:text-white md:inline-flex"
            variants={headerItemVariants}
            initial="hidden"
            animate={animationState}
          >
            Register
          </motion.a>
        </div>
      </motion.header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-28 px-6 py-20">
        <section id="home" className="hero-section-banner relative flex min-h-[80vh] flex-col items-center justify-center gap-12 overflow-hidden">
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
                className="hero-main-heading text-4xl font-semibold leading-tight text-white md:text-6xl"
                variants={heroHeadingVariants}
              >
                Innovation Through Collaboration
              </motion.h1>
              <motion.p
                className="mt-6 text-lg text-slate-300 md:text-xl"
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
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {countdownItems.map((item) => (
                      <div
                        key={item.label}
                        className="relative overflow-hidden rounded-2xl border border-sky-500/30 bg-slate-900/80 p-4 shadow-inner shadow-sky-500/10"
                      >
                        <span
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_70%)]"
                          aria-hidden="true"
                        />
                        <span className="relative z-10 text-[0.65rem] uppercase tracking-[0.6em] text-sky-300">{item.label}</span>
                        <span className="relative z-10 mt-2 block text-3xl font-semibold text-white md:text-4xl">
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
            className="grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={sectionVariants}
            transition={{ staggerChildren: 0.15 }}
          >
            {["5K+ Innovators", "48 Hrs of Creation", "70+ Mentors"].map((stat, index) => (
              <motion.div
                key={stat}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                variants={sectionVariants}
              >
                <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Highlight 0{index + 1}</p>
                <p className="mt-4 text-2xl font-semibold text-white">{stat}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="grid gap-12 md:grid-cols-[1.2fr_1fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Why Innovation Thrives Here</h2>
            <p className="mt-6 text-slate-300">
              UTKRISHTA is the annual techfest of IIIT Sri City, celebrating the collision of bold ideas and collaborative spirit. Across three immersive days, experience high-voltage hackathons, speculative design labs, deep-tech showcases, and fireside chats that unlock shared intelligence.
            </p>
            <p className="mt-4 text-slate-400">
              From dawn-to-dusk maker zones to midnight strategy rituals, every encounter is engineered to spark partnerships that outlast the fest.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
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
          <div className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-950 p-8">
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
        </motion.section>

        <motion.section
          id="events"
          className="flex flex-col gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Three Days. Infinite Collaboration.</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Anchor into curated tracks that pair technologists, artists, strategists, and makers. Earn collab badges, unlock mentorship nodes, and ship your boldest prototype yet.
              </p>
            </div>
            <a
              href="#register"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.45em] text-sky-200 hover:text-white"
            >
              View Schedule →
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.title}
                className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.45em] text-sky-300">Featured Track</span>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{event.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{event.description}</p>
                </div>
                <div className="mt-6 space-y-3 text-xs uppercase tracking-[0.4em] text-slate-400">
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-[0.6rem] text-sky-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-200">{event.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-10 md:grid-cols-[1fr_1fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="rounded-3xl border border-white/10 bg-linear-to-br from-blue-900/40 to-slate-900 p-8">
            <h3 className="text-2xl font-semibold text-white">Collaboration Arenas</h3>
            <p className="mt-4 text-sm text-slate-300">
              Choose from hybrid pods: AI + Design, BioTech + Data, Robotics + Storytelling, and more. Each arena pairs you with co-pilots who complement your craft.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li>↳ Daily sync huddles facilitated by alumni mentors</li>
              <li>↳ Immersive prototyping suites with spatial computing rigs</li>
              <li>↳ Collaboration heatmaps tracking your impact in real-time</li>
            </ul>
          </div>
          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur">
              <p className="uppercase tracking-[0.4em] text-slate-400">Spotlight</p>
              <p className="mt-3 text-lg text-white">
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
            <h2 className="text-3xl font-semibold text-white md:text-4xl">FAQs</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Everything you need to know to plug into the UTKRISHTA energy.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{faq.question}</p>
                <p className="mt-3 text-sm text-slate-200">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/5 bg-slate-950/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-xs uppercase tracking-[0.4em] text-slate-500 md:flex-row md:items-center md:justify-between">
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
