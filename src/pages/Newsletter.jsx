import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const subscribe = (event) => {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;
    window.location.href = `mailto:devsharma.techinnovate@gmail.com?subject=${encodeURIComponent('Portfolio updates')}&body=${encodeURIComponent(`Please send occasional updates to ${address}.`)}`;
    setMessage('Your email app is opening with the signup request.');
  };

  return (
    <div className="route-page newsletter-page">
      <section className="newsletter-card">
        <p className="eyebrow">OCCASIONAL NOTES</p>
        <h1>A little signal<br />for your inbox.</h1>
        <p>Updates on software, flight and useful ideas. Sent only when there is something to share.</p>
        <form className="newsletter-form" onSubmit={subscribe}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" autoComplete="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <button type="submit">Sign up <ArrowRight size={16} /></button>
        </form>
        <span className="newsletter-note"><Mail size={14} /> Opens your email app to send the request.</span>
        {message && <p className="newsletter-message" role="status">{message}</p>}
      </section>
    </div>
  );
}
