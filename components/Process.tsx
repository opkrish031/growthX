'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS } from '@/lib/constants';

export default function Process() {
  const lineRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="process"
      className="py-20 lg:py-28"
      style={{
        backgroundColor: '#080810',
      }}
    >
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <div
            style={{
              color: '#6C63FF',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '16px',
              fontFamily: 'var(--font-body)',
            }}
          >
            HOW IT WORKS
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 52px)',
              color: '#F8F8FF',
              marginBottom: '16px',
              lineHeight: 1.1,
            }}
          >
            From Zero to{' '}
            <span className="text-gradient">Growth</span> in 4 Steps
          </h2>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '18px',
              fontFamily: 'var(--font-body)',
            }}
          >
            A clear, structured process — no guesswork, no waiting.
          </p>
        </motion.div>

        {/* Desktop: horizontal steps */}
        <div
          style={{
            position: 'relative',
          }}
        >
          {/* SVG connecting line (desktop) */}
          <div
            style={{
              position: 'absolute',
              top: '32px',
              left: '12%',
              right: '12%',
              height: '2px',
              zIndex: 0,
            }}
            className="hidden md:block"
          >
            <svg
              width="100%"
              height="2"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6C63FF" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
              <motion.line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="1000"
                initial={{ strokeDashoffset: 1000 }}
                animate={isInView ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* Steps grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10"
          >
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  textAlign: 'center',
                  padding: '0 16px',
                  position: 'relative',
                }}
              >
                {/* Big background number */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(60px, 12vw, 80px)',
                    color: 'rgba(108,99,255,0.06)',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                >
                  {step.step}
                </div>

                {/* Circle */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid #6C63FF',
                    backgroundColor: '#080810',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: isInView ? '0 0 20px rgba(108,99,255,0.6)' : 'none',
                    transition: 'box-shadow 0.5s ease',
                    animation: isInView ? 'pulse-glow 2s ease-in-out infinite' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: '#6C63FF',
                      fontSize: '18px',
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#F8F8FF',
                    marginBottom: '12px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: '#94A3B8',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-body)',
                    maxWidth: '200px',
                    margin: '0 auto',
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
