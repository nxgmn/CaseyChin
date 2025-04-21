import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import './Admin.css';

export default function ProjectsDashboard() {
  /* ---------------------- State for Add‑Project Form -------------------- */
  const [projectData, setProjectData] = useState({
    title: '',
    short: '',
    description: '',
    stack: '',
    github: '',
    demo: '',
    images: '',
    date: '',
  });

  /* -------------------- State for Existing Projects -------------------- */
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ----------------- State for Edit‑in‑Place Function ------------------ */
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    short: '',
    description: '',
    stack: '',
    github: '',
    demo: '',
    images: '',
    date: '',
  });

  /* ----------------------------- Helpers ------------------------------ */
  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Projects')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('❌ Error fetching projects:', error);
    } else {
      setProjects(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* --------------------- Add New Project Handler ---------------------- */
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const { title, short, description, stack, github, demo, images, date } = projectData;

    const payload = {
      title,
      short,
      description,
      stack: stack
        ? stack.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      github,
      demo,
      images: images
        ? images.split(',').map((i) => i.trim()).filter(Boolean)
        : [],
      date,
      visible: true,
    };

    const { error } = await supabase.from('Projects').insert([payload]);
    if (error) {
      alert('Error adding project: ' + error.message);
    } else {
      alert('Project added!');
      setProjectData({
        title: '',
        short: '',
        description: '',
        stack: '',
        github: '',
        demo: '',
        images: '',
        date: '',
      });
      fetchProjects();
    }
  };

  /* -------------------- Visibility Toggle & Delete -------------------- */
  const handleToggleVisible = async (id, currentVisible) => {
    const { error } = await supabase
      .from('Projects')
      .update({ visible: !currentVisible })
      .eq('id', id);

    if (error) {
      alert(`Error updating visibility: ${error.message}`);
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, visible: !currentVisible } : p))
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;

    const { error } = await supabase.from('Projects').delete().eq('id', id);
    if (error) {
      alert(`Error deleting project: ${error.message}`);
    } else {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  /* --------------------------- Edit Helpers --------------------------- */
  const startEdit = (project) => {
    setEditingId(project.id);
    setEditForm({
      title: project.title || '',
      short: project.short || '',
      description: project.description || '',
      stack: Array.isArray(project.stack) ? project.stack.join(', ') : project.stack || '',
      github: project.github || '',
      demo: project.demo || '',
      images: Array.isArray(project.images) ? project.images.join(', ') : project.images || '',
      date: project.date || '',
    });
  };

  const cancelEdit = () => setEditingId(null);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { title, short, description, stack, github, demo, images, date } = editForm;

    const payload = {
      title,
      short,
      description,
      stack: stack
        ? stack.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      github,
      demo,
      images: images
        ? images.split(',').map((i) => i.trim()).filter(Boolean)
        : [],
      date,
    };

    const { error } = await supabase.from('Projects').update(payload).eq('id', editingId);
    if (error) {
      alert(`Error updating project: ${error.message}`);
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...payload } : p))
      );
      setEditingId(null);
    }
  };

  /* ------------------------------- Render ------------------------------ */
  return (
    <div className="projects-dashboard">
      {/* ---------------------- Add‑Project Form ------------------------ */}
      <form onSubmit={handleProjectSubmit} className="admin-form mb-10">
        <h3 className="text-xl font-semibold mb-2">Add Project</h3>

        <label>Title</label>
        <input
          type="text"
          value={projectData.title}
          onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={projectData.date}
          onChange={(e) => setProjectData({ ...projectData, date: e.target.value })}
          required
        />

        <label>Short Summary</label>
        <input
          type="text"
          value={projectData.short}
          onChange={(e) => setProjectData({ ...projectData, short: e.target.value })}
          required
        />

        <label>Description</label>
        <textarea
          value={projectData.description}
          onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
          required
        />

        <label>Stack (comma separated)</label>
        <input
          type="text"
          value={projectData.stack}
          onChange={(e) => setProjectData({ ...projectData, stack: e.target.value })}
        />

        <label>GitHub Link</label>
        <input
          type="text"
          value={projectData.github}
          onChange={(e) => setProjectData({ ...projectData, github: e.target.value })}
        />

        <label>Live Demo Link</label>
        <input
          type="text"
          value={projectData.demo}
          onChange={(e) => setProjectData({ ...projectData, demo: e.target.value })}
        />

        <label>Images (comma separated URLs)</label>
        <input
          type="text"
          value={projectData.images}
          onChange={(e) => setProjectData({ ...projectData, images: e.target.value })}
        />

        <button type="submit">Add Project</button>
      </form>

      <hr className="my-8" />

      {/* ---------------------- Existing Projects ----------------------- */}
      <h3 className="text-xl font-semibold mb-4">Existing Projects</h3>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="box-scroll">
          <table className="admin-table w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Visible</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t">
                  <td className="py-2">
                    {editingId === project.id ? (
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="w-full"
                        required
                      />
                    ) : (
                      project.title
                    )}
                  </td>

                  <td className="py-2 text-center">
                    <input
                      type="checkbox"
                      checked={project.visible}
                      onChange={() => handleToggleVisible(project.id, project.visible)}
                    />
                  </td>

                  <td className="py-2 space-x-2">
                    {editingId === project.id ? (
                      <>
                        <button
                          className="text-green-600 hover:underline"
                          onClick={handleEditSubmit}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-600 hover:underline"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => startEdit(project)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(project.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingId && (
        <form
        onSubmit={handleEditSubmit}
        className="mt-6 p-4 border rounded bg-gray-50"
        >
            <h4 className="font-semibold mb-4">Edit Project Details</h4>
        
            <div className="form-grid">
            <label>Short Summary</label>
            <input
                name="short"
                value={editForm.short}
                onChange={handleEditChange}
            />
        
            <label>Description</label>
            <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                rows={4}
            />
        
            <label>Stack (comma separated)</label>
            <input
                name="stack"
                value={editForm.stack}
                onChange={handleEditChange}
            />
        
            <label>GitHub Link</label>
            <input
                name="github"
                value={editForm.github}
                onChange={handleEditChange}
            />
        
            <label>Live Demo Link</label>
            <input
                name="demo"
                value={editForm.demo}
                onChange={handleEditChange}
            />
        
            <label>Images (comma separated URLs)</label>
            <input
                name="images"
                value={editForm.images}
                onChange={handleEditChange}
            />
        
            <label>Date</label>
            <input
                type="date"
                name="date"
                value={editForm.date}
                onChange={handleEditChange}
            />
            </div>
        
            <div className="mt-4 space-x-4">
            <button type="submit" className="text-green-600 hover:underline">Save Changes</button>
            <button type="button" onClick={cancelEdit} className="text-gray-600 hover:underline">Cancel</button>
            </div>
        </form>
      
      )}
    </div>
  );
}
