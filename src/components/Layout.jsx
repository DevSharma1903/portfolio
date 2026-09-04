import React, { useState, useEffect, useRef } from 'react';

const THEMES = [
  // Dark Themes (6)
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', type: 'dark', dot: '#cba6f7', bg: '#1e1e2e' },
  { id: 'tokyo-night', name: 'Tokyo Night', type: 'dark', dot: '#7aa2f7', bg: '#1a1b26' },
  { id: 'one-dark-pro', name: 'One Dark Pro', type: 'dark', dot: '#61afef', bg: '#282c34' },
  { id: 'dracula', name: 'Dracula', type: 'dark', dot: '#bd93f9', bg: '#282a36' },
  { id: 'nord', name: 'Nord', type: 'dark', dot: '#88c0d0', bg: '#2e3440' },
  { id: 'github-dark', name: 'GitHub Dark', type: 'dark', dot: '#58a6ff', bg: '#0d1117' },
  
  // Light Themes (3)
  { id: 'macaron-light', name: 'Macaron Light', type: 'light', dot: '#d9778a', bg: '#faf8f5' },
  { id: 'github-light', name: 'GitHub Light', type: 'light', dot: '#0969da', bg: '#ffffff' },
  { id: 'solarized-light', name: 'Solarized Light', type: 'light', dot: '#268bd2', bg: '#fdf6e3' }
];

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vscode_theme') || 'catppuccin-mocha';
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vscode_theme', theme);
  }, [theme]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      
      {/* VS Code Theme Switcher Bar */}
      <div 
        ref={dropdownRef}
        style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          zIndex: 1000 
        }}
      >
        <button 
          onClick={() => setIsOpen(prev => !prev)}
          className="theme-selector-trigger"
          aria-label="Select VS Code Theme"
          title="Select VS Code Theme"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-color)',
            padding: '7px 14px',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82em',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease',
            userSelect: 'none'
          }}
        >
          <span 
            style={{ 
              width: '9px', 
              height: '9px', 
              borderRadius: '50%', 
              backgroundColor: currentThemeObj.dot,
              display: 'inline-block' 
            }} 
          />
          <span>{currentThemeObj.name}</span>
          <i className="fas fa-chevron-down" style={{ fontSize: '0.75em', opacity: 0.7 }}></i>
        </button>

        {/* Dropdown Menu - Translation Animation Only */}
        {isOpen && (
          <div 
            className="theme-dropdown-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '230px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '8px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
              zIndex: 1001,
              animation: 'menuSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            {/* Dark Themes Header */}
            <div style={{ 
              fontSize: '0.7em', 
              color: 'var(--text-secondary)', 
              fontWeight: '700', 
              letterSpacing: '0.6px', 
              padding: '6px 8px 4px',
              textTransform: 'uppercase'
            }}>
              Dark Themes (6)
            </div>

            {THEMES.filter(t => t.type === 'dark').map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className="theme-option-btn"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: theme === t.id ? 'var(--btn-bg)' : 'transparent',
                  color: theme === t.id ? 'var(--accent-color)' : 'var(--text-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82em',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s ease'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: t.dot }}></span>
                <span style={{ flex: 1 }}>{t.name}</span>
                {theme === t.id && <i className="fas fa-check" style={{ fontSize: '0.8em' }}></i>}
              </button>
            ))}

            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '6px 4px' }}></div>

            {/* Light Themes Header */}
            <div style={{ 
              fontSize: '0.7em', 
              color: 'var(--text-secondary)', 
              fontWeight: '700', 
              letterSpacing: '0.6px', 
              padding: '6px 8px 4px',
              textTransform: 'uppercase'
            }}>
              Light Themes (3)
            </div>

            {THEMES.filter(t => t.type === 'light').map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className="theme-option-btn"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: theme === t.id ? 'var(--btn-bg)' : 'transparent',
                  color: theme === t.id ? 'var(--accent-color)' : 'var(--text-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82em',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s ease'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: t.dot }}></span>
                <span style={{ flex: 1 }}>{t.name}</span>
                {theme === t.id && <i className="fas fa-check" style={{ fontSize: '0.8em' }}></i>}
              </button>
            ))}
          </div>
        )}
      </div>

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {children}
      </main>

      <footer style={{ 
        padding: '36px 0 30px', 
        textAlign: 'center', 
        borderTop: '1px solid var(--border-color)',
        marginTop: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '16px'
        }}>
          <a href="https://github.com/DevSharma1903" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-link">
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a href="https://www.linkedin.com/in/dev-sharma-092447316/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a href="https://geniusapple.itch.io/" target="_blank" rel="noopener noreferrer" title="Itch.io" className="social-link">
            <i className="fab fa-itch-io fa-lg"></i>
          </a>
          <a href="https://discord.com/users/751676240850583574" target="_blank" rel="noopener noreferrer" title="Discord" className="social-link">
             <i className="fab fa-discord fa-lg"></i>
          </a>
          <a href="mailto:devsharma.techinnovate@gmail.com" title="Email" className="social-link">
            <i className="fas fa-envelope fa-lg"></i>
          </a>
        </div>
        
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.84em', fontFamily: 'var(--font-mono)' }}>
          <span>dev sharma • 2026</span>
        </div>
      </footer>

      <style>{`
        @keyframes menuSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .theme-selector-trigger:hover {
          transform: translateY(-2px);
          border-color: var(--accent-color);
        }
        .theme-option-btn:hover {
          background-color: var(--btn-bg) !important;
          color: var(--accent-color) !important;
          transform: translateX(4px);
        }
        .social-link {
          color: var(--text-secondary);
          display: inline-block;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
        }
        .social-link:hover {
          color: var(--accent-color);
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
};

export default Layout;
