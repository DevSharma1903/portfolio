import { Component, useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, MemoryRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { pageMeta, site } from './data/site';
import { scrollToTarget, setLenisInstance } from './lib/scroll';

const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
let hasNavigated = false;

function setMeta(selector, content) {
  let element = document.querySelector(selector);
  if (!element) {
    const [, attribute, name] = selector.match(/^meta\[(name|property)="([^"]+)"\]$/);
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.append(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.append(element);
  }
  element.href = href;
}

function PageMeta() {
  const { pathname } = useLocation();
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const page = pageMeta[path] ?? pageMeta['/404'];

  useEffect(() => {
    document.title = page.title;
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[property="og:image"]', `${site.url}og.png`);
    const canonicalPath = path === '/' ? '' : `${path.slice(1)}/`;
    setMeta('meta[property="og:url"]', `${site.url}${canonicalPath}`);
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', page.title);
    setMeta('meta[name="twitter:description"]', page.description);
    setLink('canonical', `${site.url}${canonicalPath}`);
  }, [page.description, page.title, path]);

  return <span className="sr-only" aria-live="polite" aria-atomic="true">{page.title}</span>;
}

function MotionEngine() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ticker;
    let lenisInstance = null;

    const sync = () => {
      if (lenisInstance) {
        if (ticker) gsap.ticker.remove(ticker);
        lenisInstance.off('scroll', updateBackdrop);
        lenisInstance.destroy();
        lenisInstance = null;
        setLenisInstance(null);
        ticker = null;
      }
      document.documentElement.style.setProperty('--scroll-depth', '0');
      if (preference.matches) return;

      const lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.82,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
      });
      lenisInstance = lenis;
      setLenisInstance(lenis);
      lenis.on('scroll', updateBackdrop);
      ticker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    };

    const updateBackdrop = (lenis) => {
      const progress = lenis.limit > 0 ? Math.min(1, Math.max(0, lenis.animatedScroll / lenis.limit)) : 0;
      document.documentElement.style.setProperty('--scroll-depth', progress.toFixed(3));
    };

    sync();
    preference.addEventListener('change', sync);
    return () => {
      preference.removeEventListener('change', sync);
      if (ticker) gsap.ticker.remove(ticker);
      if (lenisInstance) {
        lenisInstance.off('scroll', updateBackdrop);
        lenisInstance.destroy();
        lenisInstance = null;
      }
      setLenisInstance(null);
      document.documentElement.style.removeProperty('--scroll-depth');
    };
  }, []);
  return null;
}

function RouteMotion({ children }) {
  const { pathname } = useLocation();
  const viewRef = useRef(null);

  useBrowserLayoutEffect(() => {
    if (!hasNavigated) {
      hasNavigated = true;
      return undefined;
    }
    const main = document.querySelector('.site-main');
    scrollToTarget(0, { immediate: true });
    main?.focus({ preventScroll: true });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const view = viewRef.current;
    const curtain = document.querySelector('.signal-curtain');
    if (!view || !curtain) return undefined;
    const trace = curtain.querySelector('.signal-curtain-trace');

    const context = gsap.context(() => {
      gsap.set(curtain, { scaleX: 0, transformOrigin: 'left center' });
      if (trace) gsap.set(trace, { strokeDashoffset: 1000 });
      const timeline = gsap.timeline();
      timeline
        .to(curtain, { scaleX: 1, duration: 0.28, ease: 'power3.out' })
        .fromTo(view, { y: 9, autoAlpha: 0.8 }, { y: 0, autoAlpha: 1, duration: 0.42, ease: 'power3.out' }, '<0.02')
        .to(trace, { strokeDashoffset: 0, duration: 0.96, ease: 'power1.inOut' }, 0.06)
        .set(curtain, { transformOrigin: 'right center' })
        .to(curtain, { scaleX: 0, duration: 0.32, ease: 'power3.inOut' });
    }, view);
    return () => context.revert();
  }, [pathname]);

  return <div className="route-view" ref={viewRef} key={pathname}>{children}</div>;
}

class RouteErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Page failed to render:', error);
  }

  render() {
    if (this.state.hasError) {
      return <section className="route-error" role="alert"><p className="page-context">Signal lost</p><h1>This page did not load.</h1><p>Try again, or return to the portfolio.</p><a className="action-link action-link-primary" href="/">Return home</a></section>;
    }
    return this.props.children;
  }
}

export function AppRoutes() {
  const location = useLocation();
  return (
    <Layout>
      <MotionEngine />
      <PageMeta />
      <RouteMotion>
        <Routes location={location}>
          <Route path="/" element={<RouteErrorBoundary><Home /></RouteErrorBoundary>} />
          <Route path="/about" element={<RouteErrorBoundary><About /></RouteErrorBoundary>} />
          <Route path="/skills" element={<RouteErrorBoundary><Skills /></RouteErrorBoundary>} />
          <Route path="/projects" element={<RouteErrorBoundary><Projects /></RouteErrorBoundary>} />
          <Route path="/contact" element={<RouteErrorBoundary><Contact /></RouteErrorBoundary>} />
          <Route path="/newsletter" element={<Navigate to="/contact/" replace />} />
          <Route path="*" element={<RouteErrorBoundary><NotFound /></RouteErrorBoundary>} />
        </Routes>
      </RouteMotion>
    </Layout>
  );
}

export default function App() {
  return <Router basename={import.meta.env.BASE_URL}><AppRoutes /></Router>;
}

export function renderRoute(path) {
  const base = import.meta.env.BASE_URL;
  const location = base === '/' ? path : `${base.replace(/\/$/, '')}${path === '/' ? '' : path}`;
  return <MemoryRouter basename={base} initialEntries={[location]}><AppRoutes /></MemoryRouter>;
}
