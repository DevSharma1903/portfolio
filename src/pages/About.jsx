import { RadioTower, ChartNoAxesCombined, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

const interests = [
  { icon: RadioTower, title: 'Flight systems', text: 'Payload computation engineer at thrustMIT, building ESP32 flight software, sensor pipelines, and control loops.' },
  { icon: Workflow, title: 'Enterprise AI', text: 'During a Jun–Jul 2026 internship at Hughes Communications India, built NLP-to-SQL and RPA workflows and integrated locally hosted language models.' },
  { icon: ChartNoAxesCombined, title: 'Machine learning and fintech', text: 'Building audience intelligence and financial analytics products with Python, React, APIs, and machine learning.' },
];

export default function About() {
  return (
    <div className="route-page about-page">
      <header className="page-intro about-intro">
        <p className="page-context">About / Manipal, India</p>
        <h1>Curious about<br /><em>what makes things work.</em></h1>
        <p>I'm Dev Sharma, a Computer Science and Financial Technology student at Manipal Institute of Technology (2024–2028), with a 9.14 CGPA. I work across enterprise AI, embedded flight systems, machine learning, and financial technology.</p>
      </header>

      <section className="about-bio" aria-labelledby="bio-title">
        <div className="section-marker"><span>A little context</span></div>
        <div className="about-bio-copy">
          <h2 id="bio-title">I like working between raw data and the decision.</h2>
          <p>At thrustMIT, I develop embedded software and real-time sensor pipelines for rocket payloads, and optimize and deploy Python AI/ML models to Raspberry Pi for payload testing. Our 2026 payload achieved 100% success across a 10,000-foot flight and received an SDL Payload Challenge Honorable Mention. During my Jun–Jul 2026 IT internship at Hughes Communications India, I built enterprise NLP-to-SQL and RPA solutions and integrated locally hosted language models into enterprise software.</p>
          <p>I led development of Zukunft AI, which reached the Hackfluence Grand Final as a Top 40 finalist after two elimination rounds. I also contributed to Mobilis, a Flipkart Gridlock 2.0 Round 2 project. From Jul–Oct 2025, I served on TechTatva’s technical organizing committee, establishing 30+ GitHub repositories, supporting 90+ participants, and integrating GitHub issues with web platforms and backend databases.</p>
          <Link to="/projects/" className="inline-link">See the projects</Link>
        </div>
      </section>

      <section className="about-interests" aria-labelledby="interests-title">
        <div className="section-marker"><span id="interests-title">Where I spend time</span></div>
        <div className="interest-list">
          {interests.map(({ icon: Icon, title, text }) => (
            <article className="interest-row" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-current">
        <p className="section-marker"><span>Currently</span></p>
        <p>Contributing to thrustMIT flight software and developing practical AI and financial technology projects.</p>
        <a href="https://github.com/DevSharma1903" target="_blank" rel="noopener noreferrer" className="inline-link">Find me on GitHub</a>
      </section>
    </div>
  );
}
