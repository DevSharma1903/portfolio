import { useCallback, useMemo, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { caseStudies, projects } from '../data/site';
import HairlineFigure from '../components/HairlineFigure';
import { scrollToTarget } from '../lib/scroll';

const projectFigures = { thrustmit: 'Relay', zukunft: 'Hub', investsure: 'Plot', mobilis: 'Terrain' };

const categories = ['All', ...new Set(projects.map((project) => project.group))];

export default function Projects() {
  const [category, setCategory] = useState('All');
  const [activeStory, setActiveStory] = useState(caseStudies[0].id);
  const storySectionRef = useRef(null);
  const storiesHeadingRef = useRef(null);
  const visible = useMemo(
    () => category === 'All' ? projects : projects.filter((project) => project.group === category),
    [category],
  );
  const story = caseStudies.find((item) => item.id === activeStory) ?? caseStudies[0];
  const showStory = useCallback((id) => {
    setActiveStory(id);
    scrollToTarget(storySectionRef.current, {
      immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      duration: 0.9,
    });
    storiesHeadingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="route-page projects-page">
      <header className="page-intro projects-intro">
        <p className="page-context">Work / Selected projects</p>
        <h1>Different signals.<br /><em>Useful systems.</em></h1>
        <p>Software across flight, finance, machine learning, cities, and everyday tools.</p>
      </header>

      <section className="project-index" aria-labelledby="index-title">
        <div className="index-heading"><div><p className="section-marker"><span>Project index</span></p><h2 id="index-title">Open a project at its source.</h2></div><span className="index-count">{visible.length} projects</span></div>
        <div className="filter-row" role="group" aria-label="Filter projects by area">
          {categories.map((item) => (
            <button key={item} type="button" className={category === item ? 'filter-button active' : 'filter-button'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <ol className="project-list">
          {visible.map((project) => (
            <li className="project-row" key={project.id}>
              <div className="project-row-copy">
                <p className="project-discipline">{project.group}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {caseStudies.some((item) => item.id === project.id) && (
                  <button className="project-story-link" type="button" aria-label={`Read its signal path for ${project.title}`} onClick={() => showStory(project.id)}>
                    Read its signal path <ArrowDownRight aria-hidden="true" />
                  </button>
                )}
              </div>
              <a className="project-open" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} at its source`}><ArrowUpRight aria-hidden="true" /></a>
            </li>
          ))}
        </ol>
      </section>

      <section className="project-stories" aria-labelledby="stories-title" ref={storySectionRef}>
        <div className="project-stories-heading">
          <div>
            <p className="section-marker"><span>Signal to decision</span></p>
            <h2 id="stories-title" tabIndex="-1" ref={storiesHeadingRef}>What the systems <em>actually do.</em></h2>
          </div>
          <p>Four projects, from payload flight data to a useful next step.</p>
        </div>

        <div className="project-story-layout">
          <div className="project-story-picker" role="group" aria-label="Choose a project story">
            {caseStudies.map((item) => (
              <button
                key={item.id}
                type="button"
                className={story.id === item.id ? 'project-story-choice active' : 'project-story-choice'}
                aria-pressed={story.id === item.id}
                aria-controls="project-story-panel"
                onClick={() => setActiveStory(item.id)}
              >
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          <article
            className="project-story-panel"
            id="project-story-panel"
            key={story.id}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="project-story-topline">
              <p>{story.group} <span aria-hidden="true">·</span> {story.context}</p>
              <a href={story.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${story.title} at its source`}>
                Source
              </a>
            </div>
            <div className="project-story-intro">
              <h3>{story.title}</h3>
              <HairlineFigure kind={projectFigures[story.id]} label={`Interactive illustration for ${story.title}`} className="hairline-story" />
            </div>
            <div className="project-story-flow">
              {story.steps.map((step) => (
                <div className="project-story-step" key={step.label}>
                  <p>{step.label}</p>
                  <h4>{step.title}</h4>
                  <span className="project-story-step-detail">{step.detail}</span>
                </div>
              ))}
            </div>
            <div className="project-story-outcome">
              <p>Built output</p>
              <p>{story.outcome}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
