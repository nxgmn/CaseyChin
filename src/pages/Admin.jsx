import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Admin.css';

export default function Admin() {

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthed = localStorage.getItem('admin_auth') === 'true';
    if (!isAuthed) {
      navigate('/');
    }
  }, [navigate]);


  return (
    <section className="admin-container">
      <h2 className="text-2xl font-bold mb-6">🔒 Admin Panel</h2>
      
      <h3><Link to="/admin/projects">Projects Dashboard</Link></h3>
      <h3><Link to="/admin/logs">Logs Dashboard</Link></h3>
      <button
        onClick={() => {
          localStorage.removeItem('admin_auth');
          navigate('/');
        }}
        className="text-blue-600 hover:underline mt-4"
      >
        Log out
      </button>

    </section>
    
  );
}
