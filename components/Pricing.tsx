'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/constants';

const planColorMap: Record<string, { main: string; border: string; btnBg: string; btnText: string }> = {
  blue: {
    main: '#6C63FF',
    border: 'rgba(108,99,255,0.20)',
    btnBg: 'transparent',
    btnText: '#6C63FF',
  },
  violet: {
    main: '#A78BFA',
    border: '#6C63FF',
    btnBg: '#6C63FF',
    btnText: '#fff',
  },
  cyan: {
    main: '#22D3EE',
    border: 'rgba(167,139,250,0.20)',
    btnBg: 'transparent',
    btnText: '#A78BFA',
  },
};

const addOns = [
  'GMB ₹5,199/mo',
  'Product Shoot ₹1,299+',
  'Video Shoot ₹1,999+',
  'Web Dev ₹7,000+',
  'E-commerce ₹9,999+',
  'Marketplace ₹5,299/mo',
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cardAnimations = [
    { initial: { opacity: 0, x: -60 }, whileInView: { opacity: 1, x: 0 } },
    { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 } },
    { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 } },
  ];

  return (
    <section
      id="pricing"
      className="py-20 lg:py-28"
      style={{
        backgroundColor: '#080810',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            PRICING
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
            Transparent Pricing.{' '}
            <span className="text-gradient">Zero Surprises.</span>
          </h2>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '18px',
              fontFamily: 'var(--font-body)',
              marginBottom: '32px',
            }}
          >
            No hidden fees. No lock-in contracts. Just results.
          </p>

          {/* Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#0E0E1A',
              border: '1px solid rgba(108,99,255,0.20)',
              borderRadius: '100px',
              padding: '6px',
            }}
          >
            <button
              onClick={() => setAnnual(false)}
              style={{
                backgroundColor: !annual ? '#6C63FF' : 'transparent',
                color: !annual ? '#fff' : '#94A3B8',
                border: 'none',
                borderRadius: '100px',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              style={{
                backgroundColor: annual ? '#6C63FF' : 'transparent',
                color: annual ? '#fff' : '#94A3B8',
                border: 'none',
                borderRadius: '100px',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              Annual{' '}
              <span style={{ fontSize: '11px', color: '#22D3EE' }}>Save 20%</span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {PRICING_PLANS.map((plan, i) => {
            const colors = planColorMap[plan.color] || planColorMap.blue;
            const isFeatured = plan.tag === 'Most Popular';

            return (
              <motion.div
                key={plan.name}
                initial={cardAnimations[i].initial}
                whileInView={cardAnimations[i].whileInView}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  backgroundColor: isFeatured
                    ? 'transparent'
                    : '#0E0E1A',
                  background: isFeatured
                    ? 'linear-gradient(to bottom, rgba(108,99,255,0.20), #0E0E1A)'
                    : '#0E0E1A',
                  border: `${isFeatured ? '2px' : '1px'} solid ${colors.border}`,
                  borderRadius: '20px',
                  padding: isFeatured ? '48px 32px' : '36px 28px',
                  position: 'relative',
                  ...(isFeatured ? { animation: 'pulse-glow 3s ease-in-out infinite' } : {}),
                }}
                className={isFeatured ? 'card-featured' : ''}
              >
                {/* Most Popular badge */}
                {isFeatured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#6C63FF',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      borderRadius: '100px',
                      padding: '6px 16px',
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                {plan.tag && plan.tag !== 'Most Popular' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#22D3EE',
                      color: '#080810',
                      fontSize: '11px',
                      fontWeight: 700,
                      borderRadius: '100px',
                      padding: '6px 16px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {plan.tag}
                  </div>
                )}

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#F8F8FF',
                    marginBottom: '12px',
                  }}
                >
                  {plan.name}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 'clamp(32px, 4vw, 48px)',
                        color: colors.main,
                      }}
                    >
                      {annual ? (plan as any).annualPrice : plan.price}
                    </span>
                    {plan.period && (
                      <span
                        style={{
                          color: '#94A3B8',
                          fontSize: '16px',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {annual && plan.name !== 'Enterprise' && (
                    <span
                      style={{
                        color: '#22D3EE',
                        fontSize: '12px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                      }}
                    >
                      Billed Annually
                    </span>
                  )}
                </div>

                <div
                  style={{
                    borderTop: '1px solid rgba(108,99,255,0.20)',
                    marginBottom: '24px',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '32px',
                  }}
                >
                  {plan.features.map((feat) => (
                    <div
                      key={feat}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        color: '#94A3B8',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      <CheckCircle2 size={16} color="#6C63FF" style={{ flexShrink: 0 }} />
                      {feat}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToContact}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: `1px solid ${colors.main}`,
                    backgroundColor: colors.btnBg,
                    color: colors.btnText,
                    fontWeight: 600,
                    fontSize: '15px',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    ...(isFeatured
                      ? { boxShadow: '0 0 20px rgba(108,99,255,0.3)' }
                      : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (isFeatured) {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        '0 0 40px rgba(108,99,255,0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFeatured) {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        '0 0 20px rgba(108,99,255,0.3)';
                    }
                  }}
                >
                  {plan.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '22px',
              color: '#F8F8FF',
              marginBottom: '20px',
            }}
          >
            Add-Ons
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
            }}
          >
            {addOns.map((addon) => (
              <span
                key={addon}
                style={{
                  backgroundColor: '#0E0E1A',
                  border: '1px solid rgba(108,99,255,0.20)',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: '#94A3B8',
                  fontFamily: 'var(--font-body)',
                  cursor: 'default',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.borderColor =
                    'rgba(108,99,255,0.60)';
                  (e.currentTarget as HTMLSpanElement).style.boxShadow =
                    '0 0 12px rgba(108,99,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.borderColor =
                    'rgba(108,99,255,0.20)';
                  (e.currentTarget as HTMLSpanElement).style.boxShadow = 'none';
                }}
              >
                {addon}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
