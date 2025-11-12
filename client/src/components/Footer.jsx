import { motion } from 'framer-motion';

const MotionFooter = motion.footer;

// Simple SVG Icons
const CodeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

const TechBadge = ({ children, className = '' }) => (
  <motion.span
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:bg-white/10 hover:border-hb-primary/50 hover:text-hb-primary transition-all ${className}`}
  >
    {children}
  </motion.span>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <MotionFooter
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mt-12 sm:mt-20 pt-8 sm:pt-12 pb-6 sm:pb-8"
    >
      {/* Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hb-primary/50 to-transparent"></div>
      
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Developer Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-hb-primary/10 border border-hb-primary/20">
                <CodeIcon />
              </div>
              <h3 className="text-sm font-semibold text-white/90 font-display">Developer</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Created and developed with{' '}
              <span className="inline-flex items-center gap-1 text-hb-primary">
                <HeartIcon />
              </span>{' '}
              by
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-sm sm:text-base font-semibold text-white font-display">
                <span className="bg-gradient-to-r from-hb-primary to-hb-secondary bg-clip-text text-transparent">
                  Muhammed Adil
                </span>
              </p>
              <p className="text-xs text-white/50 font-medium">A Techy • Full-Stack Developer</p>
              <p className="text-xs text-white/40 mt-1">MERN Stack Specialist</p>
            </div>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-hb-secondary/10 border border-hb-secondary/20">
                <RocketIcon />
              </div>
              <h3 className="text-sm font-semibold text-white/90 font-display">Tech Stack</h3>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-white/60 mb-2">Built with modern technologies</p>
              <div className="flex flex-wrap gap-2">
                <TechBadge className="text-xs">
                  <span className="text-hb-primary">⚛️</span> React
                </TechBadge>
                <TechBadge className="text-xs">
                  <span className="text-green-400">🚀</span> Express
                </TechBadge>
                <TechBadge className="text-xs">
                  <span className="text-green-500">🍃</span> MongoDB
                </TechBadge>
                <TechBadge className="text-xs">
                  <span className="text-purple-400">🔐</span> JWT
                </TechBadge>
              </div>
            </div>
          </motion.div>

          {/* Powered By Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <SparklesIcon />
              </div>
              <h3 className="text-sm font-semibold text-white/90 font-display">Powered By</h3>
            </div>
            <div className="flex flex-col gap-2">
              <motion.a
                href="https://clipdrop.co"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-hb-primary/50 hover:text-hb-primary transition-all group"
              >
                <span className="text-base sm:text-lg">✨</span>
                <span className="text-xs sm:text-sm font-medium text-white/80 group-hover:text-hb-primary transition">
                  Clipdrop API
                </span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
              <p className="text-xs text-white/50 mt-2">AI-powered image generation</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Features Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs"
          >
            <span className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition">
              🎨 MERN Stack
            </span>
            <span className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition">
              🖼️ Image Generator
            </span>
            <span className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition">
              🔒 JWT Auth
            </span>
            <span className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition">
              📱 Responsive
            </span>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col items-center md:items-end gap-1 text-xs text-white/40"
          >
            <p>
              © {currentYear} <span className="text-hb-primary font-medium">Heimage Bot</span>
            </p>
            <p className="text-white/30">All rights reserved</p>
          </motion.div>
        </div>

        {/* Decorative Bottom Accent */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-hb-primary/30 to-transparent"></div>
      </div>
    </MotionFooter>
  );
};

export default Footer;

