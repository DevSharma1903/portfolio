import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Generate some cozy background coding text
  const backgroundText = Array(40).fill(`
function initCozyVibe() {
  const cat = new Mascot({ type: 'sleepy', accessory: 'coffee' });
  const theme = loadTheme();
  
  if (theme === 'light') {
    applyPastelColors({
      primary: '#ffb6c1',
      secondary: '#e8f5e9'
    });
  } else {
    applyDarkCozy();
  }
  
  renderLoop(cat.purr);
  return { status: 'cozy and ready to code' };
}
  `).join('\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      
      {/* Blurred Background Text */}
      <div className="bg-text-container">
        <div className="bg-text">
          {backgroundText}
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle" 
        onClick={toggleTheme} 
        aria-label="Toggle Theme"
        title="Toggle Theme"
      >
        <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} fa-lg`}></i>
      </button>

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {children}
      </main>

      <footer style={{ padding: '40px 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '20px'
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
          <a href="https://www.youtube.com/@geniusapple6471" target="_blank" rel="noopener noreferrer" title="YouTube" className="social-link">
            <i className="fab fa-youtube fa-lg"></i>
          </a>
        </div>
        
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
          <p>dev sharma 2025</p>
          <p>all rights reserved</p>
        </div>
      </footer>

      <style>{`
        .social-link {
          color: var(--text-secondary);
          transition: color 0.2s, transform 0.2s;
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
