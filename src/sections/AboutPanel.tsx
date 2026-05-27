import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AboutPanelProps {
  isActive: boolean;
}

export default function AboutPanel({ isActive }: AboutPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayBlackRef = useRef<HTMLDivElement>(null);
  const overlayAccentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Cinematic border reveal
    if (overlayAccentRef.current) {
      tl.fromTo(
        overlayAccentRef.current,
        { clipPath: 'inset(0 0 0 0)' },
        { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'power4.inOut' },
        0
      );
    }

    if (overlayBlackRef.current) {
      tl.fromTo(
        overlayBlackRef.current,
        { clipPath: 'inset(0 0 0 0)' },
        { clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'power4.inOut' },
        0.1
      );
    }

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.4 },
        { scale: 1.0, duration: 2.0, ease: 'power4.out' },
        0
      );
    }

    // Text reveal
    if (textRef.current) {
      tl.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.0, ease: 'power3.out' },
        0.6
      );
    }

    return () => { tl.kill(); };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 8vw 60px',
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        transition: 'opacity 0.8s ease',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '60px',
          maxWidth: '1200px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {/* Image with cinematic reveal */}
        <div
          ref={imageContainerRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
            aspectRatio: '3/4',
          }}
        >
          <img
            ref={imageRef}
            src="/avatar-portrait.jpg"
            alt="Portrait"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {/* Black overlay */}
          <div
            ref={overlayBlackRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#050505',
              clipPath: 'inset(0 0 0 0)',
            }}
          />
          {/* Accent overlay */}
          <div
            ref={overlayAccentRef}
            style={{
              position: 'absolute',
              inset: 0,
              top: '-10px',
              left: '20px',
              backgroundColor: '#ff6b35',
              clipPath: 'inset(0 0 0 0)',
            }}
          />
        </div>

        {/* Text Content */}
        <div ref={textRef}>
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
            ABOUT ME
          </p>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#f8f8f8',
              letterSpacing: '-0.02em',
              marginBottom: '32px',
            }}
          >
            Bridging Engineering
            <br />
            &amp; Artistry
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#a0a0a0',
              marginBottom: '20px',
              maxWidth: '480px',
            }}
          >
            With over a decade of experience in full-stack development, I bridge the gap between
            engineering precision and artistic fluidity. I specialize in building immersive web
            experiences that combine cutting-edge technology with thoughtful design.
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#a0a0a0',
              marginBottom: '32px',
              maxWidth: '480px',
            }}
          >
            My expertise spans React, TypeScript, Node.js, and WebGL, with a passion for creating
            performant, accessible, and visually stunning applications. I believe that great software
            should feel as good as it looks.
          </p>

          <div style={{ display: 'flex', gap: '32px' }}>
            <div>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2.5rem',
                  fontWeight: 400,
                  color: '#f8f8f8',
                  lineHeight: 1,
                }}
              >
                10+
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: '#a0a0a0',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}
              >
                YEARS EXP
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2.5rem',
                  fontWeight: 400,
                  color: '#f8f8f8',
                  lineHeight: 1,
                }}
              >
                50+
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: '#a0a0a0',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}
              >
                PROJECTS
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2.5rem',
                  fontWeight: 400,
                  color: '#f8f8f8',
                  lineHeight: 1,
                }}
              >
                20+
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: '#a0a0a0',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}
              >
                CLIENTS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
