'use client';

import Image from 'next/image';
import { Phone } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
  { label: 'Get Free Audit', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#080810',
        borderTop: '1px solid rgba(108,99,255,0.20)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fade gradient from above */}
      <div
        style={{
          position: 'absolute',
          top: '-96px',
          left: 0,
          right: 0,
          height: '96px',
          background: 'linear-gradient(to bottom, transparent, #080810)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <Image
                src="/logo.png"
                alt="GrowthX Media Logo"
                width={36}
                height={36}
                style={{
                  borderRadius: '8px',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#F8F8FF',
                }}
              >
                GrowthX Media
              </span>
            </div>
            <p
              style={{
                color: '#475569',
                fontSize: '13px',
                lineHeight: 1.7,
                fontFamily: 'var(--font-body)',
                marginBottom: '16px',
              }}
            >
              Scale Faster. Grow Smarter.
              <br />
              India&apos;s results-driven social media & digital marketing agency.
              <br />
              ESTD 2026.
            </p>
            <a
              href="https://instagram.com/growth__xmedia"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#94A3B8',
                fontSize: '14px',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#6C63FF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600 }}>IG</span>
              @growth__xmedia
            </a>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: '#F8F8FF',
                fontSize: '15px',
                marginBottom: '16px',
              }}
            >
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  href="#services"
                  style={{
                    color: '#94A3B8',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#6C63FF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
                  }}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: '#F8F8FF',
                fontSize: '15px',
                marginBottom: '16px',
              }}
            >
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    color: '#94A3B8',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#6C63FF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: '#F8F8FF',
                fontSize: '15px',
                marginBottom: '16px',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['+91 9950517638', '+91 7230847461'].map((num) => (
                <a
                  key={num}
                  href={`tel:${num.replace(/\s/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#94A3B8',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#6C63FF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
                  }}
                >
                  <Phone size={14} color="#6C63FF" />
                  {num}
                </a>
              ))}
              <div
                style={{
                  color: '#475569',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  marginTop: '8px',
                }}
              >
                We respond within 24 hours
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            borderTop: '1px solid rgba(108,99,255,0.10)',
            padding: '24px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ color: '#475569', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
              © 2026 GrowthX Media. All rights reserved.
            </span>
          </div>
            <a href="https://www.linkedin.com/in/pratyakshjangid/" style={{ color: '#6C63FF', fontSize: '12px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Designed & Developed by Pratyaksh Jangid
            </a>
          {/* <span style={{ color: '#475569', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
            Made with 🔥 for Indian businesses
          </span> */}
        </div>
      </div>
    </footer>
  );
}
