import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('Projects')
        .select('*')
        .eq('visible', true)
        .order('date', { ascending: true });

      if (error) {
        console.error('❌ Error fetching projects:', error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <section className="projects">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>

      {loading ? (
        <p className="text-gray-600">Loading projects...</p>
      ) : (
        <div className="project-grid">
          {projects.map(project => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="project-card"
            >
              <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {project.short || project.short_desc || 'No short description provided.'}
              </p>
              {project.stack && Array.isArray(project.stack) && (
                <div className="tech-stack text-xs text-gray-500 italic">
                  {project.stack.join(', ')}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
