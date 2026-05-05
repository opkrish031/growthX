'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Rocket,
  Search,
  Target,
  MapPin,
  Camera,
  Video,
  Globe,
  ShoppingCart,
  Package,
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Rocket,
  Search,
  Target,
  MapPin,
  Camera,
  Video,
  Globe,
  ShoppingCart,
  Package,
};

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'rgba(108,99,255,0.15)', icon: '#6C63FF' },
  violet: { bg: 'rgba(167,139,250,0.15)', icon: '#A78BFA' },
  cyan: { bg: 'rgba(34,211,238,0.15)', icon: '#22D3EE' },
};

const priceColorMap: Record<string, string> = {
  blue: '#6C63FF',
  violet: '#A78BFA',
  cyan: '#22D3EE',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function ServiceCard({ service }: { service: (typeof SERVICES)[0] }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const IconComponent = iconMap[service.icon];
  const colors = colorMap[service.color] || colorMap.blue;
  const priceColor = priceColorMap[service.color] || '#6C63FF';

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#0E0E1A',
        border: hovered ? '1px solid rgba(108,99,255,0.40)' : '1px solid rgba(108,99,255,0.15)',
        borderRadius: '16px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 20px 60px rgba(108,99,255,0.15)'
          : '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      {/* Shimmer gradient on hover */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(108,99,255,0.08) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top row: icon + badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: colors.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {IconComponent && <IconComponent size={20} color={colors.icon} />}
        </div>
        {service.badge && (
          <span
            style={{
              backgroundColor: 'rgba(108,99,255,0.20)',
              color: '#8B83FF',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '100px',
              padding: '4px 10px',
              fontFamily: 'var(--font-body)',
            }}
          >
            {service.badge}
          </span>
        )}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '18px',
          color: '#F8F8FF',
          marginTop: '16px',
          marginBottom: '8px',
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          color: '#94A3B8',
          fontSize: '14px',
          lineHeight: 1.6,
          marginBottom: '16px',
        }}
      >
        {service.description}
      </p>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '22px',
          color: priceColor,
          marginBottom: '16px',
        }}
      >
        {service.price}
      </div>

      <a
        href={`https://wa.me/918290016906?text=${encodeURIComponent('Hi GrowthX Media, I am interested in ' + service.title)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: '#6C63FF',
          fontSize: '14px',
          fontWeight: 500,
          transition: 'gap 0.2s ease',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '8px'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '4px'; }}
      >
        Contact Us →
      </a>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
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
            WHAT WE DO
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
            Services Built for{' '}
            <span className="text-gradient">Growth</span>
          </h2>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto',
              fontFamily: 'var(--font-body)',
            }}
          >
            Every service is engineered to deliver measurable results for your brand, across India and beyond.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
