import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface WorkPanelProps {
  isActive: boolean;
}

interface Project {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NEXUS PLATFORM',
    year: '2025',
    description: 'A real-time collaborative workspace built with WebSockets and CRDT for seamless multi-user editing.',
    image: '/project-01.jpg',
    tags: ['React', 'WebSocket', 'Node.js'],
  },
  {
    id: 2,
    title: 'LIQUID MOTION',
    year: '2024',
    description: 'WebGL-powered interactive experiences featuring custom shader pipelines and GPU-accelerated animations.',
    image: '/project-02.jpg',
    tags: ['WebGL', 'Three.js', 'GLSL'],
  },
  {
    id: 3,
    title: 'QUANTUM UI',
    year: '2024',
    description: 'A design system and component library serving 40+ micro-frontends across the organization.',
    image: '/project-03.jpg',
    tags: ['TypeScript', 'Design Systems', 'A11y'],
  },
];

export default function WorkPanel({ isActive }: WorkPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline({ delay: 0.2 });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        tl.fromTo(
          card,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          0.15 * i
        );
      }
    });

    return () => { tl.kill(); };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 8vw 60px',
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '48px' }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.25em',
            color: '#ff6b35',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          SELECTED WORK
        </p>
        <h2
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#f8f8f8',
            letterSpacing: '-0.02em',
          }}
        >
          Projects that define
          <br />
          my craft
        </h2>
      </div>

      {/* Project Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          maxWidth: '1200px',
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredId === project.id ? 'translateY(-8px)' : 'translateY(0)',
            }}
          >
            {/* Image */}
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                aspectRatio: '16/10',
                marginBottom: '20px',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: hoveredId === project.id ? 'scale(1.05)' : 'scale(1)',
                }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.8) 100%)',
                  opacity: hoveredId === project.id ? 1 : 0.6,
                  transition: 'opacity 0.6s ease',
                }}
              />
            </div>

            {/* Info */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '8px',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: '#f8f8f8',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.title}
                </h3>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: 300,
                    letterSpacing: '0.1em',
                    color: '#a0a0a0',
                  }}
                >
                  {project.year}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#a0a0a0',
                  marginBottom: '12px',
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '9px',
                      fontWeight: 400,
                      letterSpacing: '0.1em',
                      color: hoveredId === project.id ? '#ff6b35' : '#a0a0a0',
                      border: '1px solid rgba(160,160,160,0.2)',
                      borderRadius: '100px',
                      padding: '4px 10px',
                      transition: 'color 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
