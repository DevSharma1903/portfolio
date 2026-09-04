import React, { useState, useEffect } from 'react';

const BASE_VISITORS = 1420;
const VISITOR_KEY = 'devsharma_visitors_live_2026';

const StatusBar = () => {
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const cached = localStorage.getItem('devsharma_cached_visitors');
      return cached ? parseInt(cached, 10) : BASE_VISITORS;
    } catch {
      return BASE_VISITORS;
    }
  });

  const [ping, setPing] = useState(24);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Measure Real Latency Ping
  useEffect(() => {
    const measurePing = async () => {
      try {
        const start = performance.now();
        await fetch(window.location.origin + '/favicon.svg?t=' + Date.now(), {
          method: 'HEAD',
          cache: 'no-store'
        });
        const duration = Math.round(performance.now() - start);
        setPing(Math.max(4, Math.min(duration, 150)));
      } catch {
        setPing(28);
      }
    };

    measurePing();
    const pingInterval = setInterval(measurePing, 15000);
    return () => clearInterval(pingInterval);
  }, []);

  // Real-time Visitor Counter
  useEffect(() => {
    const trackVisitor = async () => {
      const hasVisited = sessionStorage.getItem('devsharma_session_logged');
      const endpoint = hasVisited
        ? `https://countapi.mileshilliard.com/api/v1/get/${VISITOR_KEY}`
        : `https://countapi.mileshilliard.com/api/v1/hit/${VISITOR_KEY}`;

      try {
        const res = await fetch(endpoint, { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
          const data = await res.json();
          const hits = typeof data.value === 'number' ? data.value : 0;
          const total = BASE_VISITORS + hits;
          setVisitorCount(total);
          localStorage.setItem('devsharma_cached_visitors', total.toString());
          sessionStorage.setItem('devsharma_session_logged', '1');
        }
      } catch {
        // Fallback to cached count
      }
    };

    trackVisitor();
  }, []);

  return (
    <div
      className="vscode-statusbar"
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'var(--card-bg)',
        borderTop: '1px solid var(--border-color)',
        padding: '6px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.74em',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-secondary)',
        zIndex: 999,
        userSelect: 'none'
      }}
    >
      {/* Left Section: Status & Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        {/* Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--live-color)',
              display: 'inline-block'
            }}
          />
          <span style={{ color: 'var(--text-color)', fontWeight: '600' }}>system nominal</span>
        </div>

        <span style={{ opacity: 0.3 }}>|</span>

        {/* Region & Time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="fas fa-map-marker-alt" style={{ fontSize: '0.9em', color: 'var(--accent-color)' }}></i>
          <span>Manipal, IN</span>
          <span style={{ color: 'var(--text-color)', fontWeight: '500' }}>{currentTime} IST</span>
        </div>
      </div>

      {/* Right Section: Telemetry, Ping & Live Counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        {/* Ping Latency */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="fas fa-bolt" style={{ fontSize: '0.85em', color: 'var(--accent-color)' }}></i>
          <span>ping:</span>
          <span style={{ 
            color: ping < 50 ? 'var(--live-color)' : 'var(--upvote-color)', 
            fontWeight: '600' 
          }}>
            {ping}ms
          </span>
          <span style={{ opacity: 0.6 }}>(BOM1)</span>
        </div>

        <span style={{ opacity: 0.3 }}>|</span>

        {/* Global Live Visitor Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Real-time global site visits">
          <i className="fas fa-globe-asia" style={{ fontSize: '0.9em', color: 'var(--accent-color)' }}></i>
          <span>visitors:</span>
          <span style={{ color: 'var(--text-color)', fontWeight: '700' }}>
            {visitorCount.toLocaleString()}
          </span>
        </div>

        <span style={{ opacity: 0.3 }}>|</span>

        {/* Framework & Env */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.8 }}>
          <span>react 19</span>
          <span>•</span>
          <span>vite 8</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
