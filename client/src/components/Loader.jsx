import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const Loader = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-8 sm:py-10">
    <MotionDiv
      className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-hb-secondary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      }}
    />
    <p className="text-xs sm:text-sm text-gray-300 tracking-wide uppercase">Generating</p>
  </div>
);

export default Loader;

