import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, CodeXml } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const EMPTY_CONTRIBUTIONS = [];

export default function GitHubHeatmap({ username = 'DevSharma1903' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://github-contributions-api.jogruber.de/v4/' + username + '?y=last', {
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(5000)]),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Contribution activity is unavailable');
        return response.json();
      })
      .then((result) => setData(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [username]);

  const contributionDays = data?.contributions ?? EMPTY_CONTRIBUTIONS;
  const firstDayOffset = contributionDays.length
    ? (new Date(contributionDays[0].date).getDay() + 6) % 7
    : 0;
  const weekCount = Math.ceil((contributionDays.length + firstDayOffset) / 7);
  const totalCount = data?.total?.lastYear
    ?? contributionDays.reduce((total, day) => total + day.count, 0);
  const monthLabels = useMemo(() => {
    if (!contributionDays.length) return [];
    const labels = [];
    let lastMonth = -1;
    contributionDays.forEach((day, index) => {
      const month = new Date(day.date).getMonth();
      const column = Math.floor((index + firstDayOffset) / 7);
      if (month !== lastMonth) {
        labels.push({ month: MONTHS[month], column });
        lastMonth = month;
      }
    });
    return labels;
  }, [contributionDays, firstDayOffset]);

  const colorFor = (level) => [
    'var(--heat-0)',
    'var(--heat-1)',
    'var(--heat-2)',
    'var(--heat-3)',
    'var(--heat-4)',
  ][Math.min(4, Math.max(0, level ?? 0))];

  return (
    <section className="github-heatmap" aria-label="GitHub contribution activity">
      <header className="heatmap-heading">
        <div><CodeXml /><a href={'https://github.com/' + username} target="_blank" rel="noopener noreferrer">@{username}</a></div>
        <span><strong>{loading ? '--' : totalCount.toLocaleString()}</strong> contributions / last year</span>
      </header>
      {loading ? (
        <div className="heatmap-empty" role="status"><span className="loading-pulse" />Loading contribution activity</div>
      ) : error || !contributionDays.length ? (
        <div className="heatmap-empty"><CalendarDays /><span>Contribution activity is unavailable right now.</span></div>
      ) : (
        <div className="heatmap-scroll">
          <svg className="heatmap-svg" viewBox={'0 0 ' + (32 + weekCount * 13) + ' 116'} role="img" aria-label={totalCount.toLocaleString() + ' contributions over the last year'}>
            {monthLabels.map((item, index) => <text key={index} x={30 + item.column * 13} y="10">{item.month}</text>)}
            {[['Mon', 1], ['Wed', 3], ['Fri', 5]].map(([label, row]) => <text key={label} x="0" y={28 + row * 13}>{label}</text>)}
            {contributionDays.map((day, index) => {
              const position = index + firstDayOffset;
              const column = Math.floor(position / 7);
              const row = position % 7;
              const isHovered = hoveredDay?.date === day.date;
              return <rect key={day.date} className="heatmap-cell" x={30 + column * 13} y={19 + row * 13} width="10" height="10" rx="1.5" fill={colorFor(day.level)} stroke={isHovered ? 'var(--foreground)' : 'transparent'} tabIndex="0" role="img" aria-label={day.count + ' contributions on ' + day.date} onFocus={() => setHoveredDay(day)} onBlur={() => setHoveredDay(null)} onMouseEnter={() => setHoveredDay(day)} onMouseLeave={() => setHoveredDay(null)}><title>{day.count} contributions on {day.date}</title></rect>;
            })}
          </svg>
        </div>
      )}
      <footer className="heatmap-footer">
        <span>{hoveredDay ? hoveredDay.count + ' contributions on ' + hoveredDay.date : 'Hover a day to inspect activity'}</span>
        <div className="heatmap-legend"><span>LESS</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} style={{ background: colorFor(level) }} />)}<span>MORE</span></div>
      </footer>
    </section>
  );
}
