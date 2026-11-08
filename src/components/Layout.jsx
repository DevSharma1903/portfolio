import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import angelStatue from '../../—Pngtree—black and white photo of_22424400.png';
import { AsciiImage } from './AsciiEffect';

const links = [
  { to: '/projects/', label: 'Work' },
  { to: '/about/', label: 'About' },
  { to: '/skills/', label: 'Skills' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const nav = navRef.current;
    const focusable = nav?.querySelectorAll('a');
    focusable?.[0]?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        toggleRef.current?.focus();
      }
      if (event.key !== 'Tab' || !focusable?.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
        event.preventDefault();
        focusable[0].focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-ascii-backdrop" aria-hidden="true">
        <AsciiImage
          imageSrc={angelStatue}
          alt=""
          fontSize={8}
          fontFamily="Switzer, Arial, sans-serif"
          lineHeight={1.04}
          characterSpacing={0.92}
          brightnessBoost={1.46}
          contrast={1.08}
          threshold={0.08}
          posterize={18}
          dither="floyd-steinberg"
          ditherStrength={0.16}
          scale={0.84}
          fit="cover"
          colors={['#766d62', '#c3b39b']}
          backgroundColor="#0B0D0D"
        />
      </div>
      <header className={menuOpen ? 'site-header menu-open' : 'site-header'}>
        <Link to="/" className="wordmark" aria-label="Dev Sharma, home" onClick={closeMenu}>DEV SHARMA<span aria-hidden="true">.</span></Link>
        <button
          ref={toggleRef}
          className="mobile-nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        <nav ref={navRef} id="primary-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={closeMenu} className={({ isActive }) => isActive ? 'main-nav-link active' : 'main-nav-link'}>{item.label}</NavLink>
          ))}
          <Link className="nav-contact" to="/contact/" onClick={closeMenu}>Contact</Link>
        </nav>
      </header>
      <main className="site-main" id="main" tabIndex="-1">{children}</main>
      <footer className="site-footer">
        <div className="footer-bottom">
          <Link to="/" className="footer-signature">DEV SHARMA<span aria-hidden="true">.</span></Link>
          <nav className="footer-pages" aria-label="Footer navigation">
            {links.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
            <Link to="/contact/">Contact</Link>
          </nav>
          <span className="footer-year">© {new Date().getFullYear()}</span>
        </div>
      </footer>
      <div className="signal-curtain" aria-hidden="true">
        <svg viewBox="0 0 460 250" fill="none" preserveAspectRatio="xMidYMid meet">
          <path className="signal-curtain-trace" pathLength="1000" d="M8 131h55l20-58 25 119 29-91 22 49h34l19-28 22 14h38l27-75 24 123 31-78 23 25h57" />
        </svg>
      </div>
    </div>
  );
}
