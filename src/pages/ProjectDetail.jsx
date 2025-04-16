import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from('Projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ Error fetching project:', error);
        setProject(null);
      } else {
        setProject(data);
      }

      setLoading(false);
    }

    fetchProject();
  }, [id]);

  if (loading) return <p className="p-6">Loading project...</p>;
  if (!project) return <p className="p-6">Project not found.</p>;

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-700 mb-4">{project.description}</p>

      {project.stack && Array.isArray(project.stack) && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Tech Stack</h3>
          <ul className="list-disc list-inside text-gray-600">
            {project.stack.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      {project.links && project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View on GitHub
        </a>
      )}

      {project.images && Array.isArray(project.images) && project.images.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold">Screenshots</h3>
          {project.images.map((src, idx) => (
            <img key={idx} src={src} alt={`Screenshot ${idx + 1}`} className="rounded shadow" />
          ))}
        </div>
      )}
    </section>
  );
}
