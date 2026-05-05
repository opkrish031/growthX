'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const floatingPills = [
  { text: '📈 50+ Brands Scaled', delay: 0 },
  { text: '⚡ 48h Launch', delay: 0.5 },
  { text: '🎯 3x ROI Average', delay: 1 },
];

export default function Hero() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBtnPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };

  const handleMouseLeave = () => setBtnPos({ x: 0, y: 0 });

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#080810',
      }}
    >
      {/* Background layers */}
      <div
        className="bg-grid"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />
      {/* Bottom glow blob */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background:
            'radial-gradient(ellipse, rgba(108,99,255,0.20) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
          animation: 'pulse-glow 4s ease-in-out infinite alternate',
        }}
      />
      {/* Top-right violet blob */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="px-4 sm:px-6 lg:px-24"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1100px',
          width: '100%',
          textAlign: 'center',
          paddingTop: '80px',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(108,99,255,0.40)',
            backgroundColor: 'rgba(108,99,255,0.10)',
            color: '#8B83FF',
            borderRadius: '100px',
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '32px',
            fontFamily: 'var(--font-body)',
          }}
        >
          🚀 India&apos;s #1 Growth Agency — ESTD 2026
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 2.0, ease: [0.87, 0, 0.13, 1] as const }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(40px, 8vw, 88px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#F8F8FF',
                margin: 0,
              }}
            >
              We Don&apos;t Just Grow Followers.
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 2.15, ease: [0.87, 0, 0.13, 1] as const }}
              className="text-gradient"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(40px, 8vw, 88px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              We Grow Businesses.
            </motion.div>
          </div>
        </div>

        {/* Sub-headline */}
        <div style={{ overflow: 'hidden', maxWidth: '620px', margin: '0 auto 40px' }}>
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0, delay: 2.4, ease: [0.87, 0, 0.13, 1] as const }}
            style={{
              color: '#94A3B8',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}
          >
            GrowthX Media — India&apos;s premier results-driven social media agency. Helping brands across the country scale with engagement that converts.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center flex-wrap"
          style={{
            marginBottom: '64px',
          }}
        >
          <motion.button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleMouseLeave();
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 40px rgba(108,99,255,0.4)';
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6C63FF';
            }}
            animate={{ x: btnPos.x, y: btnPos.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold"
            style={{
              backgroundColor: '#6C63FF',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(108,99,255,0.4)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 60px rgba(108,99,255,0.6)';
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#8B83FF';
            }}
          >
            Start Growing →
          </motion.button>

          <motion.button
            whileHover={{ borderColor: 'rgba(108,99,255,0.60)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToServices}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold border border-white/20 text-white bg-transparent rounded-lg"
            style={{
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
            }}
          >
            View Our Services
          </motion.button>
        </motion.div>

        {/* Floating Stats Pills */}
        <div
          className="flex flex-wrap gap-3 justify-center"
          style={{ marginBottom: '120px' }}
        >
          {floatingPills.map((pill, i) => (
            <motion.div
              key={pill.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 3.0 + pill.delay, duration: 0.5 },
                y: {
                  delay: pill.delay,
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              style={{
                backgroundColor: '#0E0E1A',
                border: '1px solid rgba(108,99,255,0.30)',
                backdropFilter: 'blur(8px)',
                borderRadius: '100px',
                padding: '8px 16px',
                fontSize: 'clamp(12px, 2vw, 14px)',
                color: '#8B83FF',
                fontFamily: 'var(--font-body)',
              }}
            >
              {pill.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
          cursor: 'pointer',
        }}
        onClick={() =>
          document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <span style={{ 
          fontSize: '9px', 
          letterSpacing: '0.25em', 
          textTransform: 'uppercase', 
          fontFamily: 'var(--font-body)',
          color: '#64748B',
          fontWeight: 700
        }}>
          Scroll
        </span>
        
        <div style={{
          width: '22px',
          height: '36px',
          borderRadius: '12px',
          border: '1.5px solid rgba(108, 99, 255, 0.25)',
          display: 'flex',
          justifyContent: 'center',
          padding: '4px',
          backgroundColor: 'rgba(108, 99, 255, 0.02)',
        }}>
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.4, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            style={{
              width: '3px',
              height: '6px',
              borderRadius: '2px',
              backgroundColor: '#6C63FF',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
