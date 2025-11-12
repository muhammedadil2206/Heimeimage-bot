import { motion } from 'framer-motion';

const MotionButton = motion.button;

const PromptHistory = ({ history = [], onSelect }) => {
  if (!history.length) {
    return (
      <div className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 text-center text-white/60">
        <p className="text-sm sm:text-base">No generations yet. Your creations will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white font-display">
        Recent Generations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {history.map((item, index) => (
          <MotionButton
            type="button"
            key={`${item.prompt}-${index}`}
            onClick={() => onSelect?.(item)}
            className="group text-left rounded-2xl sm:rounded-3xl overflow-hidden bg-white/10 border border-white/5 hover:border-hb-primary transition active:scale-95"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.prompt || 'Generated image'}
                className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-3 sm:p-4 space-y-2">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 text-xs uppercase tracking-wider rounded-full bg-white/10 text-white/70">
                {item.style}
              </span>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-2 sm:line-clamp-3 break-words">{item.prompt}</p>
              <p className="text-xs text-white/40">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: new Date(item.createdAt).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                    })
                  : 'Recently generated'}
              </p>
            </div>
          </MotionButton>
        ))}
      </div>
    </div>
  );
};

export default PromptHistory;

