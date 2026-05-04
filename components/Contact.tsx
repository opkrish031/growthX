'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const inputStyle = {
  backgroundColor: '#080810',
  border: '1px solid rgba(108,99,255,0.20)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: '#F8F8FF',
  width: '100%',
  fontSize: '15px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const labelStyle = {
  color: '#94A3B8',
  fontSize: '13px',
  fontWeight: 500,
  marginBottom: '8px',
  display: 'block',
  fontFamily: 'var(--font-body)',
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    service: '',
    budget: '',
    source: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.business.trim()) newErrors.business = 'Business name is required';
    
    // Phone validation (basic India 10-digit)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.budget) newErrors.budget = 'Please select a budget';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#6C63FF';
    e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.15)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    e.target.style.borderColor = errors[name] ? '#ef4444' : 'rgba(108,99,255,0.20)';
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'demo',
          ...formData,
          subject: 'New Lead from GrowthX Website',
        }),
      });
      if (res.ok) setSuccess(true);
    } catch {
      // silently fail for demo
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28"
      style={{ backgroundColor: '#080810' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
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
            GET IN TOUCH
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
            Let&apos;s Scale{' '}
            <span className="text-gradient">Your Brand</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '18px', fontFamily: 'var(--font-body)' }}>
            Free audit — no commitment, just clarity on what&apos;s possible for your business.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
          }}
          className="md:grid-cols-[2fr_1fr]"
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              backgroundColor: '#0E0E1A',
              border: '1px solid rgba(108,99,255,0.20)',
              borderRadius: '20px',
            }}
            className="p-6 sm:p-8 lg:p-10"
          >
            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <CheckCircle
                  size={56}
                  color="#22C55E"
                  style={{ margin: '0 auto 20px' }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '24px',
                    color: '#F8F8FF',
                    marginBottom: '12px',
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px',
                  }}
                  className="grid-cols-1 md:grid-cols-2"
                >
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        borderColor: errors.name ? '#ef4444' : 'rgba(108,99,255,0.20)'
                      }}
                    />
                    {errors.name && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Business Name *</label>
                    <input
                      type="text"
                      name="business"
                      placeholder="Your business"
                      value={formData.business}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        borderColor: errors.business ? '#ef4444' : 'rgba(108,99,255,0.20)'
                      }}
                    />
                    {errors.business && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.business}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        borderColor: errors.phone ? '#ef4444' : 'rgba(108,99,255,0.20)'
                      }}
                    />
                    {errors.phone && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        borderColor: errors.email ? '#ef4444' : 'rgba(108,99,255,0.20)'
                      }}
                    />
                    {errors.email && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Service Interested In *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ 
                      ...inputStyle, 
                      backgroundColor: '#080810',
                      borderColor: errors.service ? '#ef4444' : 'rgba(108,99,255,0.20)'
                    }}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.service}</span>}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px',
                  }}
                  className="grid-cols-1 md:grid-cols-2"
                >
                  <div>
                    <label style={labelStyle}>Monthly Budget *</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{ 
                        ...inputStyle, 
                        backgroundColor: '#080810',
                        borderColor: errors.budget ? '#ef4444' : 'rgba(108,99,255,0.20)'
                      }}
                    >
                      <option value="">Select budget</option>
                      <option>Under ₹10,000</option>
                      <option>₹10,000–₹25,000</option>
                      <option>₹25,000–₹50,000</option>
                      <option>₹50,000+</option>
                    </select>
                    {errors.budget && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.budget}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>How did you hear about us?</label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{ ...inputStyle, backgroundColor: '#080810' }}
                    >
                      <option value="">Select</option>
                      <option>Instagram</option>
                      <option>Google</option>
                      <option>Referral</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>Tell us about your business</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="What does your business do? What are your goals?"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    backgroundColor: loading ? '#4F48CC' : '#6C63FF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '17px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-body)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 0 30px rgba(108,99,255,0.3)',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {loading ? 'Sending...' : 'Get My Free Audit →'}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              backgroundColor: 'rgba(14,14,26,0.60)',
              border: '1px solid rgba(108,99,255,0.20)',
              borderRadius: '20px',
              padding: '40px',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '20px',
                color: '#F8F8FF',
              }}
            >
              Or reach us directly:
            </h3>

            {['+91 9950517638', '+91 7230847461'].map((num) => (
              <a
                key={num}
                href={`tel:${num.replace(/\s/g, '')}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#94A3B8',
                  textDecoration: 'none',
                  fontSize: '15px',
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
                <Phone size={18} color="#6C63FF" />
                {num}
              </a>
            ))}

            <a
              href="https://instagram.com/growth__xmedia"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#94A3B8',
                textDecoration: 'none',
                fontSize: '15px',
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
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6C63FF',
                  fontSize: '16px',
                }}
              >
                IG
              </span>
              @growth__xmedia
            </a>

            <div
              style={{
                borderTop: '1px solid rgba(108,99,255,0.15)',
                paddingTop: '20px',
              }}
            >
              <p
                style={{
                  color: '#94A3B8',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                }}
              >
                ⏱ Response time: within 24 hours
              </p>
              <p
                style={{
                  color: '#94A3B8',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  marginTop: '8px',
                }}
              >
                📍 Serving clients across India
              </p>
            </div>

            {/* Decorative glow element */}
            <div
              style={{
                marginTop: 'auto',
                padding: '20px',
                backgroundColor: 'rgba(108,99,255,0.05)',
                border: '1px solid rgba(108,99,255,0.15)',
                borderRadius: '12px',
              }}
            >
              <p
                style={{
                  color: '#8B83FF',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                💬 &ldquo;Our first consultation is always free. No pressure, no
                upselling — just clarity on how to grow your brand.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
