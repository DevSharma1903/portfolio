import { useEffect, useState } from 'react';
import { Activity, Boxes, Code2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const languages = [
  { name: 'Python', percent: 44, color: '#78a8dc' },
  { name: 'JavaScript / React', percent: 26, color: '#d6ff70' },
  { name: 'C / C++', percent: 18, color: '#df7b9a' },
  { name: 'SQL & databases', percent: 12, color: '#e5a957' },
];

export default function DeveloperMetrics() {
  const [repoCount, setRepoCount] = useState(9);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/DevSharma1903', {
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(4000)]),
    })
      .then((response) => response.ok ? response.json() : null)
      .then((profile) => {
        if (typeof profile?.public_repos === 'number') setRepoCount(profile.public_repos);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <Card className="developer-metrics">
      <div className="metrics-heading">
        <span><Activity /> DEVELOPER TELEMETRY</span>
        <small>PUBLIC WORK / GITHUB</small>
      </div>
      <div className="metrics-summary">
        <div className="metric-tile"><Boxes /><span>PUBLIC REPOSITORIES</span><strong>{repoCount}</strong></div>
        <div className="metric-tile"><Code2 /><span>YEARLY CONTRIBUTIONS</span><strong>302+</strong></div>
      </div>
      <div className="language-heading"><span>LANGUAGE MIX</span><span>PROJECT INDEX / ESTIMATE</span></div>
      <div className="language-bar" aria-label="Estimated language mix">
        {languages.map((language) => <i key={language.name} style={{ width: language.percent + '%', background: language.color }} />)}
      </div>
      <div className="language-legend">
        {languages.map((language) => <Badge variant="outline" key={language.name}><i style={{ background: language.color }} />{language.name}<span>{language.percent}%</span></Badge>)}
      </div>
      <div className="metrics-focus"><span>FOCUS</span><p>Edge AI, real-time avionics, and software that connects digital systems to physical work.</p></div>
    </Card>
  );
}
