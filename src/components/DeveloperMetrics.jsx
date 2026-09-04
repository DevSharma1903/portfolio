import React, { useState, useEffect } from 'react';

const DeveloperMetrics = () => {
  const [repoCount, setRepoCount] = useState(9);
  const [followers, setFollowers] = useState(6);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const res = await fetch('https://api.github.com/users/DevSharma1903', {
          signal: AbortSignal.timeout(4000)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.public_repos) setRepoCount(data.public_repos);
          if (data.followers) setFollowers(data.followers);
        }
      } catch {
        // Retain default verified counts
      }
    };

    fetchGithubData();
  }, []);

  const languages = [
    { name: 'Python', percent: 44, color: '#3572A5' },
    { name: 'JavaScript / React', percent: 26, color: '#f1e05a' },
    { name: 'C / C++', percent: 18, color: '#f34b7d' },
    { name: 'SQL & Database', percent: 12, color: '#e38c00' }
  ];

  const telemetryStats = [
    { label: 'Public Repositories', value: repoCount, icon: 'fas fa-code-branch' },
    { label: 'Yearly Contributions', value: '302+', icon: 'fas fa-circle-check' }
  ];

  return (
    <div style={{
      marginTop: '28px',
      padding: '22px',
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-mono)'
    }}>
      {/* Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fas fa-chart-pie" style={{ color: 'var(--accent-color)' }}></i>
          <span style={{ fontWeight: '600', fontSize: '0.96em', color: 'var(--text-color)' }}>
            developer telemetry & metrics
          </span>
        </div>
        <span style={{ fontSize: '0.78em', color: 'var(--text-secondary)' }}>
          active workspace stats
        </span>
      </div>

      {/* Languages Segmented Bar */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.78em',
          color: 'var(--text-secondary)',
          marginBottom: '6px'
        }}>
          <span>Top Languages</span>
          <span>WakaTime / GitHub Index</span>
        </div>

        {/* Multi-segment colored progress bar */}
        <div style={{
          display: 'flex',
          height: '8px',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'var(--btn-bg)',
          gap: '2px'
        }}>
          {languages.map((lang, idx) => (
            <div
              key={idx}
              title={`${lang.name}: ${lang.percent}%`}
              style={{
                width: `${lang.percent}%`,
                backgroundColor: lang.color,
                transition: 'width 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '8px',
          fontSize: '0.76em'
        }}>
          {languages.map((lang, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: lang.color,
                display: 'inline-block'
              }} />
              <span style={{ color: 'var(--text-color)', fontWeight: '500' }}>{lang.name}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{lang.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Metric Badges Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {telemetryStats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--tag-bg)',
              border: '1px solid var(--border-color)',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72em', color: 'var(--text-secondary)' }}>
              <i className={stat.icon} style={{ color: 'var(--accent-color)', fontSize: '0.9em' }}></i>
              <span>{stat.label}</span>
            </div>
            <div style={{ fontSize: '1.08em', fontWeight: '700', color: 'var(--text-color)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Current Stack & Focus Footer */}
      <div style={{
        paddingTop: '12px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        fontSize: '0.76em',
        color: 'var(--text-secondary)'
      }}>
        <div>
          <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>Focus: </span>
          <span>Edge AI/ML inference & real-time rocket payload avionics</span>
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {['PyTorch', 'FastAPI', 'ESP32', 'React', 'PID'].map((t, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: 'var(--btn-bg)',
                padding: '1px 5px',
                borderRadius: '3px',
                fontSize: '0.92em'
              }}
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DeveloperMetrics;
