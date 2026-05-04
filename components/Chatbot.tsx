'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hey! 👋 I'm GrowthX AI. Ask me anything about our services, pricing, or how we can grow your brand!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Sorry, I had trouble responding. Please call us at +91 9950517638!' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'For detailed info, call us at +91 9950517638 — our team will sort you out!' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end"
    >
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full sm:w-90 mb-4 rounded-2xl overflow-hidden shadow-lg flex flex-col"
            style={{
              maxHeight: '500px',
              backgroundColor: '#0E0E1A',
              border: '1px solid rgba(108,99,255,0.30)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(108,99,255,0.2)',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(to right, rgba(108,99,255,0.20), rgba(167,139,250,0.10))',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#22C55E',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      color: '#F8F8FF',
                      fontWeight: 700,
                      fontSize: '14px',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    GrowthX AI
                  </div>
                  <div
                    style={{
                      color: '#22C55E',
                      fontSize: '11px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '280px',
                maxHeight: '340px',
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: '8px',
                    alignItems: 'flex-end',
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#6C63FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 700,
                        flexShrink: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      GX
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: '78%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      backgroundColor: msg.role === 'user' ? '#6C63FF' : '#080810',
                      border: msg.role === 'user' ? 'none' : '1px solid rgba(108,99,255,0.20)',
                      color: '#F8F8FF',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#6C63FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    GX
                  </div>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '16px 16px 16px 2px',
                      backgroundColor: '#080810',
                      border: '1px solid rgba(108,99,255,0.20)',
                      display: 'flex',
                      gap: '4px',
                      alignItems: 'center',
                    }}
                  >
                    {[0, 1, 2].map((j) => (
                      <motion.div
                        key={j}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: j * 0.15,
                        }}
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(108,99,255,0.60)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              style={{
                borderTop: '1px solid rgba(108,99,255,0.20)',
                padding: '12px 16px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  backgroundColor: '#080810',
                  border: '1px solid rgba(108,99,255,0.20)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: '#F8F8FF',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#6C63FF';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'rgba(108,99,255,0.20)';
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={!input.trim()}
                style={{
                  backgroundColor: input.trim() ? '#6C63FF' : '#1a1a2e',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <Send size={16} color={input.trim() ? '#fff' : '#475569'} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <div style={{ position: 'relative' }}>
        {/* Pulse rings */}
        {!isOpen && (
          <>
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px solid rgba(108,99,255,0.50)',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px solid rgba(108,99,255,0.30)',
                pointerEvents: 'none',
              }}
            />
          </>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen((v) => !v)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#6C63FF',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(108,99,255,0.6)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} color="#fff" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={22} color="#fff" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
