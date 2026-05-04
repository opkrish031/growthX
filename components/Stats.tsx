'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { STATS } from '@/lib/constants';
import { useCountUp } from '@/lib/useCountUp';

function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textAlign: 'center',
        padding: '24px 16px',
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(48px, 6vw, 64px)',
          lineHeight: 1,
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 50%, #22D3EE 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {count}
        <span style={{ color: '#6C63FF' }}>{suffix}</span>
      </div>
      <div
        style={{
          color: '#94A3B8',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontFamily: 'var(--font-body)',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      style={{
        borderTop: '1px solid rgba(108,99,255,0.20)',
        borderBottom: '1px solid rgba(108,99,255,0.20)',
        background: 'rgba(14,14,26,0.60)',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial gradient bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(108,99,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center relative z-10"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '1 1 50%',
              minWidth: '160px',
            }}
          >
            <StatItem
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={i}
            />
            {i < STATS.length - 1 && (
              <div
                style={{
                  width: '1px',
                  height: '60px',
                  background:
                    'linear-gradient(to bottom, transparent, rgba(108,99,255,0.30), transparent)',
                  flexShrink: 0,
                  display: 'none',
                }}
                className="md:block"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
