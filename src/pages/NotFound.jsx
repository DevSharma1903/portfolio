import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="route-page not-found-page">
      <p className="page-context">404 / Lost signal</p>
      <h1>This path<br /><em>goes nowhere.</em></h1>
      <p>The page you're looking for is not part of this portfolio.</p>
      <Link className="action-link action-link-primary" to="/"><ArrowLeft size={16} aria-hidden="true" /><span>Back to the start</span></Link>
    </div>
  );
}
