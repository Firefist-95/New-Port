import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { trpc } from '@/providers/trpc';

interface ContactPanelProps {
  isActive: boolean;
}

export default function ContactPanel({ isActive }: ContactPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const sendMessage = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    },
  });

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline({ delay: 0.2 });

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.0, ease: 'power3.out' }
      );
    }

    return () => { tl.kill(); };
  }, [isActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      sendMessage.mutate(formData);
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GITHUB', href: 'https://github.com' },
    { icon: Linkedin, label: 'LINKEDIN', href: 'https://linkedin.com' },
    { icon: Twitter, label: 'TWITTER', href: 'https://twitter.com' },
    { icon: Mail, label: 'EMAIL', href: 'mailto:hello@aether.dev' },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 8vw 60px',
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        transition: 'opacity 0.8s ease',
      }}
    >
      <div
        ref={contentRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          maxWidth: '1000px',
          width: '100%',
        }}
      >
        {/* Left - Info */}
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              color: '#ff6b35',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            GET IN TOUCH
          </p>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#f8f8f8',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            Let&apos;s create
            <br />
            something together
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#a0a0a0',
              marginBottom: '40px',
              maxWidth: '360px',
            }}
          >
            Whether you have a project in mind or just want to explore possibilities,
            I&apos;d love to hear from you. Let&apos;s build the future, one pixel at a time.
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  color: '#a0a0a0',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ff6b35';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#a0a0a0';
                }}
              >
                <Icon size={14} strokeWidth={1.5} />
                <span>{label}</span>
                <ArrowUpRight size={10} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: '#a0a0a0',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(160,160,160,0.3)',
                  padding: '8px 0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#f8f8f8',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#ff6b35'; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(160,160,160,0.3)'; }}
                placeholder="Your name"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: '#a0a0a0',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(160,160,160,0.3)',
                  padding: '8px 0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#f8f8f8',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#ff6b35'; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(160,160,160,0.3)'; }}
                placeholder="your@email.com"
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: '#a0a0a0',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                MESSAGE
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(160,160,160,0.3)',
                  padding: '8px 0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#f8f8f8',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#ff6b35'; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(160,160,160,0.3)'; }}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={sendMessage.isPending}
              style={{
                width: '100%',
                padding: '14px 0',
                background: submitted ? 'rgba(255,107,53,0.2)' : 'transparent',
                border: '1px solid #ff6b35',
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: '#ff6b35',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={(e) => {
                if (!submitted) {
                  e.currentTarget.style.background = '#ff6b35';
                  e.currentTarget.style.color = '#050505';
                }
              }}
              onMouseLeave={(e) => {
                if (!submitted) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#ff6b35';
                }
              }}
            >
              {sendMessage.isPending ? 'SENDING...' : submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
