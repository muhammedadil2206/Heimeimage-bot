import { motion } from 'framer-motion';

const MotionDiv = motion.div;
const MotionForm = motion.form;
const MotionButton = motion.button;

const styleOptions = [
  'Realistic',
  'Anime',
  'Art',
  'Cartoon',
  '3D',
];

const Hero = ({
  prompt,
  setPrompt,
  style,
  setStyle,
  onGenerate,
  isGenerating,
}) => (
  <section className="grid gap-8 sm:gap-10 lg:grid-cols-2 items-start lg:items-center">
    <MotionDiv
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="space-y-4 sm:space-y-6 order-2 lg:order-1"
    >
      <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase rounded-full bg-white/10 text-white/70">
        unleash creativity
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white leading-tight">
        Turn Text Prompts Into Stunning Visuals
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
        Describe your imagination and let Heimage Bot craft a matching artwork.
        Choose from multiple styles and download your favorite generations.
      </p>
    </MotionDiv>

    <MotionForm
      onSubmit={onGenerate}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      className="rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 p-4 sm:p-6 space-y-4 shadow-2xl order-1 lg:order-2"
    >
      <div>
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-white/80 mb-2"
        >
          Your Prompt
        </label>
        <textarea
          id="prompt"
          rows={4}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="A cyberpunk city skyline at sunset..."
          className="w-full rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-hb-primary transition resize-none"
          disabled={isGenerating}
          required
        />
      </div>

      <div>
        <label
          htmlFor="style"
          className="block text-sm font-medium text-white/80 mb-2"
        >
          Style
        </label>
        <select
          id="style"
          value={style}
          onChange={(event) => setStyle(event.target.value)}
          className="w-full rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-hb-primary transition cursor-pointer"
          disabled={isGenerating}
        >
          {styleOptions.map((option) => (
            <option key={option} value={option} className="text-gray-900">
              {option}
            </option>
          ))}
        </select>
      </div>

      <MotionButton
        type="submit"
        className="w-full py-2.5 sm:py-3 rounded-full bg-hb-primary text-white text-sm sm:text-base font-medium shadow-lg hover:bg-hb-secondary transition disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
        whileTap={{ scale: 0.97 }}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </MotionButton>
    </MotionForm>
  </section>
);

export default Hero;

