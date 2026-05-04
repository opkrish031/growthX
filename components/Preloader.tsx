'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const nbColumns = 5;

const columnVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: (i: number) => ({
    y: '-100%',
    transition: {
      duration: 1.0,
      delay: 0.05 * i + 0.5, // Start after counter reaches 100
      ease: [0.87, 0, 0.13, 1], // Expo ease
    },
  }),
};

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setIsComplete(true), 200);
        setTimeout(() => setShouldRender(false), 2500); // Clean up after animation
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Background Columns (Stairs) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          zIndex: 1,
        }}
      >
        {[...Array(nbColumns)].map((_, i) => (
          <motion.div
            key={i}
            variants={columnVariants}
            initial="initial"
            animate={isComplete ? 'animate' : 'initial'}
            custom={i}
            style={{
              position: 'relative',
              height: '100%',
              width: `${100 / nbColumns}%`,
              backgroundColor: '#0E0E1A',
            }}
          />
        ))}
      </div>

      {/* Progress Counter */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '50px',
              zIndex: 2,
              display: 'flex',
              alignItems: 'flex-end',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '120px',
                fontWeight: 700,
                lineHeight: 0.8,
                color: '#F8F8FF',
              }}
            >
              {progress}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 600,
                color: '#6C63FF',
                marginBottom: '10px',
              }}
            >
              %
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loader Tag (Bottom Right) */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: '50px',
              right: '50px',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '10px 20px',
                borderRadius: '100px',
                border: '1px solid rgba(108, 99, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#6C63FF',
                  borderRadius: '50%',
                  animation: 'pulse-loader 1.5s infinite',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: '#8B83FF',
                  textTransform: 'uppercase',
                }}
              >
                Initialising Experience
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes pulse-loader {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
