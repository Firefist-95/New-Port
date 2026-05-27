import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import LiquidCanvas from '../sections/LiquidCanvas';
import PortfolioNav from '../sections/PortfolioNav';
import HeroPanel from '../sections/HeroPanel';
import AboutPanel from '../sections/AboutPanel';
import WorkPanel from '../sections/WorkPanel';
import ContactPanel from '../sections/ContactPanel';

type Section = 'hero' | 'about' | 'work' | 'contact';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const mainRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const navigateTo = useCallback((section: Section) => {
    if (isAnimating.current || section === activeSection) return;
    isAnimating.current = true;

    // Fade out current, then fade in new
    if (mainRef.current) {
      gsap.to(mainRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setActiveSection(section);
          gsap.to(mainRef.current, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              isAnimating.current = false;
            },
          });
        },
      });
    } else {
      setActiveSection(section);
      isAnimating.current = false;
    }
  }, [activeSection]);

  // Keyboard navigation
  useEffect(() => {
    const sections: Section[] = ['hero', 'about', 'work', 'contact'];
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = sections.indexOf(activeSection);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = sections[(currentIndex + 1) % sections.length];
        navigateTo(next);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = sections[(currentIndex - 1 + sections.length) % sections.length];
        navigateTo(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, navigateTo]);

  // Mouse wheel navigation
  useEffect(() => {
    const sections: Section[] = ['hero', 'about', 'work', 'contact'];
    let accumulatedDelta = 0;
    const threshold = 100;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulatedDelta += e.deltaY;

      if (Math.abs(accumulatedDelta) > threshold) {
        const currentIndex = sections.indexOf(activeSection);
        if (accumulatedDelta > 0) {
          const next = sections[(currentIndex + 1) % sections.length];
          navigateTo(next);
        } else {
          const prev = sections[(currentIndex - 1 + sections.length) % sections.length];
          navigateTo(prev);
        }
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, navigateTo]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        overflow: 'hidden',
      }}
    >
      {/* WebGL Background */}
      <LiquidCanvas />

      {/* Navigation */}
      <PortfolioNav activeSection={activeSection} onNavigate={navigateTo} />

      {/* Content Panels */}
      <div
        ref={mainRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
        }}
      >
        <HeroPanel isActive={activeSection === 'hero'} />
        <AboutPanel isActive={activeSection === 'about'} />
        <WorkPanel isActive={activeSection === 'work'} />
        <ContactPanel isActive={activeSection === 'contact'} />
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '40px',
          zIndex: 100,
          mixBlendMode: 'difference',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: '#a0a0a0',
            textTransform: 'uppercase',
          }}
        >
          &copy; 2026 AETHER. ALL RIGHTS RESERVED.
        </p>
      </div>

      {/* Section indicator */}
      <div
        style={{
          position: 'fixed',
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {(['hero', 'about', 'work', 'contact'] as Section[]).map((section) => (
          <button
            key={section}
            onClick={() => navigateTo(section)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: '1px solid',
              borderColor: activeSection === section ? '#ff6b35' : 'rgba(160,160,160,0.4)',
              background: activeSection === section ? '#ff6b35' : 'transparent',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.4s ease',
            }}
            aria-label={`Navigate to ${section}`}
          />
        ))}
      </div>
    </div>
  );
}
