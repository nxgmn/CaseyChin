import { Link } from 'react-router-dom';
import './nav.css';

export default function Navbar() {
  return (
    <nav>
      <div className="navbar-container">
        <Link className="name" to="/">Casey Chin</Link>
        <ul className="nav-links">
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/experience">Experience</Link></li>
          <li><Link to="/logs">Logs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
