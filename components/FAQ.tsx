'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/lib/constants';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="py-20 lg:py-28"
      style={{
        backgroundColor: '#080810',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
          }}
          className="md:grid-cols-[1fr_2fr]"
        >
          {/* Left: header + decoration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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
              FAQ
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 44px)',
                color: '#F8F8FF',
                marginBottom: '24px',
                lineHeight: 1.1,
              }}
            >
              Questions?{' '}
              <span className="text-gradient">We&apos;ve Got Answers.</span>
            </h2>

            {/* Decorative large "?" */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '140px',
                color: 'rgba(108,99,255,0.08)',
                lineHeight: 1,
                userSelect: 'none',
                marginBottom: '32px',
              }}
            >
              ?
            </div>

            {/* Contact card */}
            <div
              style={{
                backgroundColor: '#0E0E1A',
                border: '1px solid rgba(108,99,255,0.20)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <p
                style={{
                  color: '#F8F8FF',
                  fontWeight: 600,
                  fontSize: '16px',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Still have questions?
              </p>
              <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                Talk to us — we respond within 24 hours.
              </p>
              <div style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>
                📞 +91 9950517638
              </div>
              <div style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                📱 @growth__xmedia
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                style={{
                  backgroundColor: '#6C63FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Chat With Us →
              </motion.button>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{
                  backgroundColor: '#0E0E1A',
                  border: `1px solid ${openIndex === i ? 'rgba(108,99,255,0.40)' : 'rgba(108,99,255,0.15)'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      color: openIndex === i ? '#8B83FF' : '#F8F8FF',
                      fontWeight: 600,
                      fontSize: '15px',
                      fontFamily: 'var(--font-body)',
                      transition: 'color 0.2s ease',
                      flex: 1,
                      paddingRight: '16px',
                    }}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ flexShrink: 0 }}
                  >
                    <ChevronDown size={18} color="#6C63FF" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 24px 20px',
                          color: '#94A3B8',
                          fontSize: '14px',
                          lineHeight: 1.7,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
