import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut } from 'lucide-react';

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set('client_id', appID);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'profile');
  url.searchParams.set('state', state);

  return url.toString();
}

interface PortfolioNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function PortfolioNav({ activeSection, onNavigate }: PortfolioNavProps) {
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mixBlendMode: 'difference',
      }}
    >
      {/* Brand */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          color: '#f8f8f8',
          cursor: 'pointer',
        }}
        onClick={() => onNavigate('hero')}
      >
        AETHER.
      </div>

      {/* Center Links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: activeSection === link.id ? '#ff6b35' : '#a0a0a0',
              transition: 'color 0.3s ease',
              padding: '4px 0',
            }}
            onMouseEnter={(e) => {
              if (activeSection !== link.id) e.currentTarget.style.color = '#f8f8f8';
            }}
            onMouseLeave={(e) => {
              if (activeSection !== link.id) e.currentTarget.style.color = '#a0a0a0';
            }}
          >
            [ {link.label} ]
          </button>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#a0a0a0',
              }}
            >
              {user?.name || 'User'}
            </span>
            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: '1px solid rgba(160,160,160,0.3)',
                borderRadius: '100px',
                padding: '6px 14px',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.15em',
                color: '#a0a0a0',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ff6b35';
                e.currentTarget.style.color = '#ff6b35';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(160,160,160,0.3)';
                e.currentTarget.style.color = '#a0a0a0';
              }}
            >
              <LogOut size={12} />
              SIGN OUT
            </button>
          </div>
        ) : (
          <button
            onClick={() => { window.location.href = getOAuthUrl(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: '1px solid rgba(160,160,160,0.3)',
              borderRadius: '100px',
              padding: '6px 14px',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              color: '#a0a0a0',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ff6b35';
              e.currentTarget.style.color = '#ff6b35';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(160,160,160,0.3)';
              e.currentTarget.style.color = '#a0a0a0';
            }}
          >
            <LogIn size={12} />
            SIGN IN
          </button>
        )}
      </div>
    </nav>
  );
}
