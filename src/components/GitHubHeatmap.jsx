import React, { useState, useEffect, useMemo } from 'react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = [
  { text: 'Mon', row: 1 },
  { text: 'Wed', row: 3 },
  { text: 'Fri', row: 5 }
];

const GitHubHeatmap = ({ username = 'DevSharma1903' }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContributions = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
          signal: AbortSignal.timeout(6000)
        });
        if (!res.ok) throw new Error('Failed to fetch contributions');
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [username]);

  // Group contributions into 7-day columns
  const weeks = useMemo(() => {
    if (!data?.contributions) return [];
    const list = data.contributions;
    const result = [];
    for (let i = 0; i < list.length; i += 7) {
      result.push(list.slice(i, i + 7));
    }
    return result;
  }, [data]);

  // Month label positions (x position in SVG coordinates)
  const monthLabels = useMemo(() => {
    if (weeks.length === 0) return [];
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIdx) => {
      if (week[0]?.date) {
        const d = new Date(week[0].date);
        const m = d.getMonth();
        if (m !== lastMonth && weekIdx > 0) {
          labels.push({ month: MONTH_NAMES[m], colIdx: weekIdx });
          lastMonth = m;
        }
      }
    });

    return labels;
  }, [weeks]);

  // Color mapping based on level (0 - 4)
  const getCellColor = (level) => {
    switch (level) {
      case 1:
        return 'color-mix(in srgb, var(--accent-color) 30%, var(--card-bg))';
      case 2:
        return 'color-mix(in srgb, var(--accent-color) 55%, var(--card-bg))';
      case 3:
        return 'color-mix(in srgb, var(--accent-color) 80%, var(--card-bg))';
      case 4:
        return 'var(--accent-color)';
      default:
        return 'var(--btn-bg)';
    }
  };

  const totalCount = data?.total?.lastYear ?? 300;

  // SVG Dimension Calculations (Auto-scales with viewBox)
  const CELL_SIZE = 10;
  const GAP = 3;
  const LEFT_OFFSET = 26; // room for Mon, Wed, Fri
  const TOP_OFFSET = 18;  // room for month labels
  const totalWeeks = Math.max(weeks.length, 52);
  const svgWidth = LEFT_OFFSET + totalWeeks * (CELL_SIZE + GAP);
  const svgHeight = TOP_OFFSET + 7 * (CELL_SIZE + GAP);

  return (
    <div style={{
      marginTop: '28px',
      padding: '20px 22px',
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-mono)'
    }}>
      {/* Heatmap Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fab fa-github" style={{ fontSize: '1.1em', color: 'var(--accent-color)' }}></i>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: '600', fontSize: '0.9em', color: 'var(--text-color)' }}
            className="github-link"
          >
            @{username}
          </a>
        </div>

        <div style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>
          <span style={{ color: 'var(--accent-color)', fontWeight: '700' }}>
            {loading ? '...' : totalCount.toLocaleString()}
          </span> contributions in the last year
        </div>
      </div>

      {/* Scalable SVG Container: 100% width, NEVER scrolls */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.84em' }}>
            loading contribution activity...
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <img
              src={`https://ghchart.rshah.org/${username}`}
              alt={`${username}'s GitHub Contributions`}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-sm)' }}
            />
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              overflow: 'visible'
            }}
          >
            {/* Month Headings */}
            {monthLabels.map((item, idx) => (
              <text
                key={idx}
                x={LEFT_OFFSET + item.colIdx * (CELL_SIZE + GAP)}
                y={11}
                fill="var(--text-secondary)"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
              >
                {item.month}
              </text>
            ))}

            {/* Day of Week Labels */}
            {DAY_LABELS.map((day, idx) => (
              <text
                key={idx}
                x={0}
                y={TOP_OFFSET + day.row * (CELL_SIZE + GAP) + 8}
                fill="var(--text-secondary)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
              >
                {day.text}
              </text>
            ))}

            {/* Contribution Cells */}
            {weeks.map((week, colIdx) => {
              const xPos = LEFT_OFFSET + colIdx * (CELL_SIZE + GAP);

              return (
                <g key={colIdx}>
                  {week.map((day, rowIdx) => {
                    const yPos = TOP_OFFSET + rowIdx * (CELL_SIZE + GAP);
                    const isHovered = hoveredDay?.date === day.date;

                    return (
                      <rect
                        key={rowIdx}
                        x={xPos}
                        y={yPos}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                        rx={2}
                        ry={2}
                        fill={getCellColor(day.level)}
                        stroke={isHovered ? 'var(--text-color)' : 'transparent'}
                        strokeWidth={isHovered ? 1 : 0}
                        style={{
                          cursor: 'pointer',
                          transition: 'fill 0.15s ease'
                        }}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Dynamic Hover Details & Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.74em',
        color: 'var(--text-secondary)'
      }}>
        <div>
          {hoveredDay ? (
            <span>
              <strong style={{ color: 'var(--text-color)' }}>{hoveredDay.count}</strong> contributions on {hoveredDay.date}
            </span>
          ) : (
            <span>hover over any block for details</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(lvl => (
            <span
              key={lvl}
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '2px',
                backgroundColor: getCellColor(lvl),
                display: 'inline-block'
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <style>{`
        .github-link:hover {
          color: var(--accent-color) !important;
        }
      `}</style>
    </div>
  );
};

export default GitHubHeatmap;
