import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const GeneratedImage = ({ imageUrl, prompt, onDownload, isGenerating }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 space-y-4"
  >
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white font-display mb-1">
          Generated Image
        </h2>
        <p className="text-xs sm:text-sm text-white/60 line-clamp-2 break-words">
          {prompt || 'Your result will appear here.'}
        </p>
      </div>
      <button
        onClick={onDownload}
        className="flex-shrink-0 w-full sm:w-auto px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium hover:bg-white/20 transition disabled:opacity-40 active:scale-95"
        disabled={!imageUrl || isGenerating}
      >
        Download
      </button>
    </div>

    <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 aspect-square flex items-center justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={prompt || 'Generated image'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <p className="text-white/40 text-xs sm:text-sm text-center px-4 sm:px-6">
          Generate an image to see it here.
        </p>
      )}
    </div>
  </MotionDiv>
);

export default GeneratedImage;

