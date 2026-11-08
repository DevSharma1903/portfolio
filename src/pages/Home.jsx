import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HairlineFigure from '../components/HairlineFigure';
import { CursorDrivenParticleTypography } from '../components/ui/cursor-driven-particle-typography';
import { OrbitCardStack } from '../components/ui/orbit-card-stack';
import { projects } from '../data/site';

const featuredWork = projects.slice(0, 3).map((project) => ({
  name: project.title,
  role: project.role,
  description: project.description,
  accent: project.accent,
  initials: project.mark,
  stat: project.meta,
  href: project.href,
}));

function PayloadSpotlight() {
  return (
    <div className="home-hero-side">
      <p className="hero-thrustmit-label">thrustMIT / payload computation</p>
      <div className="hero-flight-result"><strong>Code that flew.</strong><span>Sensing. Control. Flight.</span></div>
      <p className="hero-thrustmit-detail">ESP32 software for sensor feedback and magnetic levitation.</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="hero-context">Computer Science and Financial Technology <span>·</span> Manipal Institute of Technology</p>
            <h1 id="home-title" className="hero-name">
              <span className="hero-particles">
                <CursorDrivenParticleTypography
                  text="Dev Sharma"
                  fontFamily="Switzer, sans-serif"
                  fontSize={190}
                  letterSpacing={0.02}
                  particleSize={1.6}
                  particleDensity={8}
                  dispersionStrength={5.5}
                  returnSpeed={0.105}
                  color="#F0EEE7"
                />
              </span>
            </h1>
            <p className="hero-lead">I build embedded software and sensor pipelines for flight, alongside work in AI and financial technology.</p>
            <div className="hero-actions">
              <a href="#work" className="action-link action-link-primary"><span>See selected work</span><ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <PayloadSpotlight />
        </div>
      </section>

      <section className="home-work" id="work" aria-labelledby="work-title">
        <div className="content-width">
          <div className="section-marker"><span>Selected work</span></div>
          <div className="work-heading">
            <h2 id="work-title">A few things<br />put into motion.</h2>
            <Link to="/projects/" className="inline-link">All projects</Link>
          </div>
          <p className="work-intro">Embedded payload systems, audience intelligence, and financial analytics.</p>
          <div className="orbit-stack-stage">
            <OrbitCardStack
              items={featuredWork}
              defaultActiveIndex={0}
              spread={150}
              lift={16}
              className="orbit-stack"
              cardClassName="orbit-card-dark"
            />
          </div>
          <div className="work-stack-caption"><span>3 projects</span><span>Hover, focus, or tap a card</span></div>
        </div>
      </section>

      <section className="home-method content-width" aria-labelledby="method-title">
        <div className="section-marker"><span>How I approach a problem</span></div>
        <div className="method-heading"><h2 id="method-title">Start with the source.<br /><em>Keep the answer clear.</em></h2></div>
        <div className="method-steps">
            <article><HairlineFigure kind="Loupe" label="Interactive magnifying loupe" /><h3>Understand the system</h3><p>Trace how data moves between sensors, models, databases, and the people using the result.</p></article>
            <article><HairlineFigure kind="Exploded" label="Interactive layers of an application" /><h3>Build to the constraint</h3><p>Work across embedded C and Python, ML pipelines, APIs, React interfaces, and automation.</p></article>
            <article><HairlineFigure kind="Settle" label="Interactive parts settling into place" play /><h3>Validate the outcome</h3><p>Test the payload, compare the scenarios, or check whether the recommendation has useful evidence.</p></article>
        </div>
      </section>

      <section className="home-contact content-width" aria-labelledby="contact-title">
        <div className="contact-trace" aria-hidden="true"><span /></div>
        <div><p className="section-marker"><span>Contact</span></p><h2 id="contact-title">What are you<br /><em>trying to figure out?</em></h2></div>
        <Link to="/contact/" className="contact-round-link" aria-label="Contact Dev Sharma"><ArrowUpRight size={22} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
