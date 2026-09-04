import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const COUNTAPI_KEYS = {
  'zukunft-ai': 'ds_proj_zukunft_v1',
  'thrustmit-payload': 'ds_proj_thrustmit_v1',
  'investsure': 'ds_proj_investsure_v1',
  'mobilis': 'ds_proj_mobilis_v1',
  'optimum-notes': 'ds_proj_optnotes_v1',
  'college-mgmt': 'ds_proj_collegemgmt_v1'
};

const Projects = () => {
  // Store user's upvoted state locally
  const [userVotes, setUserVotes] = useState(() => {
    try {
      const saved = localStorage.getItem('devsharma_user_votes_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // All vote counts start at 0
  const [voteCounts, setVoteCounts] = useState(() => {
    try {
      const saved = localStorage.getItem('devsharma_cached_counts_v1');
      return saved ? JSON.parse(saved) : {
        'zukunft-ai': 0,
        'thrustmit-payload': 0,
        'investsure': 0,
        'mobilis': 0,
        'optimum-notes': 0,
        'college-mgmt': 0
      };
    } catch {
      return {
        'zukunft-ai': 0,
        'thrustmit-payload': 0,
        'investsure': 0,
        'mobilis': 0,
        'optimum-notes': 0,
        'college-mgmt': 0
      };
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('devsharma_user_votes_v1', JSON.stringify(userVotes));
    } catch (e) {
      console.error(e);
    }
  }, [userVotes]);

  useEffect(() => {
    try {
      localStorage.setItem('devsharma_cached_counts_v1', JSON.stringify(voteCounts));
    } catch (e) {
      console.error(e);
    }
  }, [voteCounts]);

  // Fetch live count from CountAPI
  const fetchLiveCount = useCallback(async (projId) => {
    const key = COUNTAPI_KEYS[projId];
    if (!key) return;

    try {
      const res = await fetch(`https://countapi.mileshilliard.com/api/v1/get/${key}`, {
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        const hits = typeof data.value === 'number' ? data.value : 0;
        setVoteCounts(prev => ({
          ...prev,
          [projId]: hits
        }));
      }
    } catch {
      // Retain local count
    }
  }, []);

  const refreshAllCounts = useCallback(() => {
    Object.keys(COUNTAPI_KEYS).forEach(id => {
      fetchLiveCount(id);
    });
  }, [fetchLiveCount]);

  useEffect(() => {
    refreshAllCounts();

    const handleFocus = () => refreshAllCounts();
    window.addEventListener('focus', handleFocus);

    let bc;
    try {
      bc = new BroadcastChannel('devsharma_project_votes_v1');
      bc.onmessage = (event) => {
        if (event.data?.type === 'VOTE_UPDATE') {
          const { projId, newTotal } = event.data;
          setVoteCounts(prev => ({
            ...prev,
            [projId]: newTotal
          }));
        }
      };
    } catch {}

    const interval = setInterval(refreshAllCounts, 20000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
      if (bc) bc.close();
    };
  }, [refreshAllCounts]);

  const handleUpvote = async (projId) => {
    const hasVoted = !!userVotes[projId];
    const key = COUNTAPI_KEYS[projId];

    if (!hasVoted) {
      const newScore = (voteCounts[projId] || 0) + 1;
      setUserVotes(prev => ({ ...prev, [projId]: true }));
      setVoteCounts(prev => ({ ...prev, [projId]: newScore }));

      try {
        const bc = new BroadcastChannel('devsharma_project_votes_v1');
        bc.postMessage({ type: 'VOTE_UPDATE', projId, newTotal: newScore });
        bc.close();
      } catch {}

      if (key) {
        try {
          const res = await fetch(`https://countapi.mileshilliard.com/api/v1/hit/${key}`, {
            signal: AbortSignal.timeout(4000)
          });
          if (res.ok) {
            const data = await res.json();
            const hits = typeof data.value === 'number' ? data.value : newScore;
            setVoteCounts(prev => ({ ...prev, [projId]: hits }));
          }
        } catch {}
      }
    } else {
      const newScore = Math.max(0, (voteCounts[projId] || 1) - 1);
      setUserVotes(prev => ({ ...prev, [projId]: false }));
      setVoteCounts(prev => ({ ...prev, [projId]: newScore }));

      try {
        const bc = new BroadcastChannel('devsharma_project_votes_v1');
        bc.postMessage({ type: 'VOTE_UPDATE', projId, newTotal: newScore });
        bc.close();
      } catch {}
    }
  };

  const projects = [
    {
      id: 'zukunft-ai',
      title: 'Zukunft AI',
      subtitle: 'Audience Intelligence & Trend Discovery',
      badge: 'Hackfluence Grand Finalist (Top 40)',
      desc: 'Audience intelligence platform analyzing YouTube creator trends using NLP semantic vector embeddings, K-means topic discovery, and LLMs.',
      tags: ['FastAPI', 'React', 'Python', 'NLP', 'LLMs', 'YouTube API'],
      link: 'https://github.com/DevSharma1903/Hackfluence',
      linkText: 'GitHub'
    },
    {
      id: 'thrustmit-payload',
      title: 'thrustMIT 2026 Payload',
      subtitle: 'Sounding Rocket Avionics & Magnetic Levitation',
      badge: 'SDL Payload Award — IREC',
      desc: 'Flight-critical embedded software on ESP32 with real-time sensor pipelines and tuned closed-loop PID control for active magnetic levitation across a 10,000-ft rocket flight.',
      tags: ['ESP32', 'C/C++', 'PID Control', 'Sensors (ToF / Hall)', 'Avionics'],
      link: 'https://www.thrustmit.in',
      linkText: 'thrustMIT'
    },
    {
      id: 'investsure',
      title: 'InvestSure',
      subtitle: 'Financial Analytics & Advisory Platform',
      badge: 'FinHack Finalist',
      desc: 'Financial analytics platform modeling SIPs, Fixed Deposits, and RDs with trained ML recommendation models, Gemini API scenario forecasting, and multilingual access.',
      tags: ['React', 'Machine Learning', 'Gemini API', 'FastAPI', 'FinTech'],
      link: 'https://github.com/DevSharma1903/FinHack',
      linkText: 'GitHub'
    },
    {
      id: 'mobilis',
      title: 'Mobilis',
      subtitle: 'Smart Parking & Traffic Decision Support',
      badge: 'Flipkart Gridlock 2.0 Round 2',
      desc: 'Urban decision support system with a Python backend and Leaflet.js dashboard visualizing traffic violation heatmaps and spatial clustering across 298k+ records.',
      tags: ['React', 'Python', 'Leaflet.js', 'Clustering', 'LLM Assistant'],
      link: 'https://github.com/Praketr7/Mobilis',
      linkText: 'GitHub'
    },
    {
      id: 'optimum-notes',
      title: 'Optimum Notes',
      subtitle: 'Privacy-First Minimalist Notepad',
      badge: 'Deployed App',
      desc: 'Zero-tracking local-first browser notepad built in pure vanilla JavaScript for instant keystroke rendering, complete privacy, and offline persistence.',
      tags: ['JavaScript', 'HTML5/CSS3', 'LocalStorage', 'Vercel'],
      link: 'https://optimum-notes.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      id: 'college-mgmt',
      title: 'College Management System',
      subtitle: 'Academic Database & Records Portal',
      badge: 'Coursework Project',
      desc: 'Full-stack university administrative portal engineered with normalized MySQL relational schemas, role workflows, and complete CRUD audit operations.',
      tags: ['MySQL', 'JavaScript', 'HTML/CSS', 'Relational DB'],
      link: 'https://github.com/DevSharma1903/College-Managment-Webpage',
      linkText: 'GitHub'
    }
  ];

  return (
    <div className="container page-transition" style={{ maxWidth: '820px', padding: '40px 20px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 className="page-title" style={{ marginBottom: '8px' }}>
          projects<span className="blinker"></span>
        </h2>
        <p className="text-body" style={{ margin: '0 auto', maxWidth: '600px', fontSize: '0.92em' }}>
          A curated selection of machine learning, avionics, and full-stack software systems.
        </p>
      </div>

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
        {projects.map((proj) => {
          const isSelected = !!userVotes[proj.id];
          const count = voteCounts[proj.id] || 0;

          return (
            <article
              key={proj.id}
              className="boosted-project-card"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '22px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease'
              }}
            >
              {/* Card Top Row: Title, Subtitle, and Badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{
                    fontSize: '1.24em',
                    fontWeight: '600',
                    margin: '0 0 2px 0',
                    color: 'var(--text-color)',
                    letterSpacing: '-0.3px'
                  }}>
                    {proj.title}
                  </h3>
                  <span style={{
                    fontSize: '0.85em',
                    color: 'var(--accent-color)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {proj.subtitle}
                  </span>
                </div>

                {proj.badge && (
                  <span style={{
                    fontSize: '0.74em',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--tag-bg)',
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    {proj.badge}
                  </span>
                )}
              </div>

              {/* Boosted 1-2 sentence description */}
              <p style={{
                fontSize: '0.91em',
                lineHeight: '1.58',
                color: 'var(--text-color)',
                margin: 0,
                opacity: 0.92
              }}>
                {proj.desc}
              </p>

              {/* Tech Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {proj.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.73em',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--tag-bg)',
                      border: '1px solid var(--tag-border)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom Row: Upvote Button + Action Link */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-color)',
                marginTop: '4px'
              }}>
                {/* Full-Color Upvote Button */}
                <button
                  onClick={() => handleUpvote(proj.id)}
                  aria-label="Upvote project"
                  className="upvote-pill-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82em',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--upvote-color)' : 'var(--border-color)',
                    backgroundColor: isSelected ? 'var(--upvote-bg)' : 'var(--btn-bg)',
                    color: isSelected ? 'var(--upvote-text)' : 'var(--text-color)',
                    fontWeight: isSelected ? '700' : '500',
                    transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s ease, color 0.15s ease',
                    userSelect: 'none'
                  }}
                >
                  <i className="fas fa-arrow-up" style={{ fontSize: '0.88em' }}></i>
                  <span>{isSelected ? 'Upvoted' : 'Upvote'}</span>
                  <span style={{
                    backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.2)' : 'var(--card-bg)',
                    color: isSelected ? 'var(--upvote-text)' : 'var(--text-color)',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88em',
                    fontWeight: '700',
                    marginLeft: '2px'
                  }}>
                    {count}
                  </span>
                </button>

                {/* Direct Action Link */}
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    padding: '5px 14px',
                    fontSize: '0.82em'
                  }}
                >
                  {proj.linkText} <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.75em', marginLeft: '3px' }}></i>
                </a>
              </div>

            </article>
          );
        })}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/" className="btn-primary" style={{ width: '150px' }}>back</Link>
      </div>

      <style>{`
        .upvote-pill-btn:hover {
          transform: translateY(-2px);
          border-color: var(--upvote-color) !important;
        }
        .upvote-pill-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Projects;
