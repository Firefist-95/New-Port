import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroPanelProps {
  isActive: boolean;
}

export default function HeroPanel({ isActive }: HeroPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Animate heading lines
    if (line1Ref.current) {
      const chars1 = line1Ref.current.querySelectorAll('.hero-char');
      tl.fromTo(
        chars1,
        { opacity: 0, y: '100%', rotationZ: 5 },
        { opacity: 1, y: 0, rotationZ: 0, stagger: 0.02, duration: 1.5, ease: 'power4.out' },
        0
      );
    }

    if (line2Ref.current) {
      const chars2 = line2Ref.current.querySelectorAll('.hero-char');
      tl.fromTo(
        chars2,
        { opacity: 0, y: '100%', rotationZ: 5 },
        { opacity: 1, y: 0, rotationZ: 0, stagger: 0.02, duration: 1.5, ease: 'power4.out' },
        0.15
      );
    }

    // Animate metadata
    if (metaRef.current) {
      tl.fromTo(
        metaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: 'power3.out' },
        0.8
      );
    }

    return () => { tl.kill(); };
  }, [isActive]);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-char"
        style={{
          display: 'inline-block',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8vw',
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* Main Heading */}
      <div style={{ marginBottom: '48px' }}>
        <div
          ref={line1Ref}
          style={{
            overflow: 'hidden',
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#f8f8f8',
            letterSpacing: '-0.02em',
          }}
        >
          {splitText('I CREATE')}
        </div>
        <div
          ref={line2Ref}
          style={{
            overflow: 'hidden',
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#f8f8f8',
            letterSpacing: '-0.02em',
          }}
        >
          {splitText('DIGITAL EXPERIENCES')}
        </div>
      </div>

      {/* Metadata Row */}
      <div
        ref={metaRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          maxWidth: '900px',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              color: '#a0a0a0',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            BASED IN TOKYO, JP
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: '#a0a0a0',
              fontFamilyMono: true,
            }}
          >
            [ 35.6762&deg; N, 139.6503&deg; E ]
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              color: '#a0a0a0',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            AVAILABLE FOR WORK
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              color: '#ff6b35',
            }}
          >
            [ STATUS: OPEN ]
          </p>
        </div>
      </div>
    </div>
  );
}
