import { skillGroups } from '../data/site';

export default function Skills() {
  return (
    <div className="route-page skills-page">
      <header className="page-intro">
        <p className="page-context">Skills / Tools and methods</p>
        <h1>A practical<br /><em>technical toolkit.</em></h1>
        <p>Things I use to build, test, and bring software into the world.</p>
      </header>
      <section className="skills-index" aria-label="Skills and tools">
        {skillGroups.map((group) => (
          <article className="skill-row" key={group.title}>
            <h2>{group.title}</h2>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>
    </div>
  );
}
