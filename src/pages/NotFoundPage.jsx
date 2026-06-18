import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

//Fallback route for unknown paths.
export default function NotFoundPage() {
  return (
    <div className="page">
      <div className="state state--empty" role="status">
        <div className="state__icon" aria-hidden="true">
          🧭
        </div>
        <h2 className="state__title">Page not found</h2>
        <p className="state__text">The page you’re looking for doesn’t exist.</p>
        <Link to="/flights">
          <Button variant="primary">Back to flights</Button>
        </Link>
      </div>
    </div>
  );
}
