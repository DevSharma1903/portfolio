import { Mail } from 'lucide-react';
import { site } from '../data/site';

export default function Contact() {
  return (
    <div className="route-page contact-page">
      <header className="page-intro contact-intro">
        <p className="page-context">Contact / Start a conversation</p>
        <h1>Have a problem<br /><em>worth untangling?</em></h1>
        <p>Tell me what you're building, what is getting in the way, or what you would like to explore.</p>
      </header>

      <section className="contact-panel" aria-labelledby="email-title">
        <div className="contact-panel-copy">
          <p className="section-marker"><span>Email</span></p>
          <h2 id="email-title">The simplest place to start.</h2>
          <a className="contact-email" href={`mailto:${site.email}`}><span>{site.email}</span></a>
        </div>
        <span className="contact-panel-mark" aria-hidden="true"><Mail /></span>
      </section>

      <section className="contact-socials" aria-label="Other ways to connect">
        <p className="section-marker"><span>Elsewhere</span></p>
        {site.socials.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
            <strong>{social.label}</strong>
          </a>
        ))}
      </section>
    </div>
  );
}
