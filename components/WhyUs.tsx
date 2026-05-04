'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Flag, BarChart2, Zap, Users, Play } from 'lucide-react';
import { WHY_US } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Flag,
  BarChart2,
  Zap,
  Users,
  Play,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function WhyUs() {
  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundColor: '#080810',
      }}
    >
      {/* Large decorative background text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(100px, 15vw, 200px)',
          color: 'rgba(108,99,255,0.03)',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        GROWTH
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
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
            WHY GROWTHX
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
            Built Different.{' '}
            <span className="text-gradient">Built for Results.</span>
          </h2>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '18px',
              fontFamily: 'var(--font-body)',
            }}
          >
            We don&apos;t just post content — we engineer growth systems.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {WHY_US.map((feat, i) => {
            const IconComponent = iconMap[feat.icon];
            return (
              <motion.div
                key={feat.title}
                variants={item}
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: 'rgba(14,14,26,0.80)',
                  border: '1px solid rgba(108,99,255,0.15)',
                  borderRadius: '16px',
                  padding: '28px',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(108,99,255,0.40)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(108,99,255,0.15)';
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(108,99,255,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  {IconComponent && <IconComponent size={20} color="#6C63FF" />}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#F8F8FF',
                    marginBottom: '8px',
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    color: '#94A3B8',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
