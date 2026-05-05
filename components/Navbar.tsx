'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);

    if (href === '/') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
      return;
    }

    if (href.startsWith('#')) {
      if (pathname === '/') {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on a different page (like /blog), go home then we'd need to scroll
        // For simplicity in Next.js, we push to the anchor
        router.push('/' + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          ...(scrolled
            ? {
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(8,8,16,0.85)',
                borderBottom: '1px solid rgba(108,99,255,0.2)',
                padding: '12px 0',
              }
            : {
                backgroundColor: 'transparent',
                padding: '20px 0',
              }),
        }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        >
          {/* Logo */}
          <button 
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2 sm:gap-3 min-w-0 bg-transparent border-none cursor-pointer p-0"
          >
            <Image
              src="/logo.png"
              alt="GrowthX Media Logo"
              width={40}
              height={40}
              className="rounded-lg object-cover w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(15px, 4vw, 18px)',
                color: '#F8F8FF',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              GrowthX Media
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  position: 'relative',
                  color: '#94A3B8',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontFamily: 'var(--font-body)',
                  padding: '4px 0',
                  transition: 'color 0.2s ease',
                }}
                className="hover:text-[#F8F8FF]"
              >
                {link.label}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    background: '#6C63FF',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  }}
                  className="nav-underline"
                />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick('#contact')}
              style={{
                border: '1px solid #6C63FF',
                color: '#6C63FF',
                background: 'transparent',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className="hidden md:block hover:bg-[#6C63FF] hover:text-white hover:shadow-[0_0_20px_rgba(108,99,255,0.5)]"
            >
              Get Free Audit →
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#F8F8FF',
                cursor: 'pointer',
              }}
              className="md:hidden p-1 flex items-center justify-center"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#080810',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '48px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#F8F8FF',
                }}
              >
                GrowthX Media
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                }}
                className="p-1"
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleLinkClick(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#F8F8FF',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(24px, 8vw, 32px)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(108,99,255,0.1)',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => handleLinkClick('#contact')}
              style={{
                backgroundColor: '#6C63FF',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                fontWeight: 600,
                fontSize: '16px',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                marginTop: '32px',
              }}
            >
              Get Free Audit →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
