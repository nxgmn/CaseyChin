import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import './Admin.css';
import BackButton from '../components/BackButton';

export default function LogsDashboard() {
  // Form state
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  // Logs state
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ------------------------------ Helpers ------------------------------ */
  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Logs')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('❌ Error fetching logs:', error);
    } else {
      setLogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  /* --------------------------- CRUD Handlers --------------------------- */
  const handleLogSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date,
      content,
      title: title.trim() !== '' ? title.trim() : null,
      image: image.trim() !== '' ? image.trim() : null,
      visible: true,
    };

    try {
      const { error } = await supabase.from('Logs').insert([payload]).select();
      if (error) {
        alert(`Error adding log: ${error.message}`);
      } else {
        alert('Log entry added!');
        setDate('');
        setContent('');
        setTitle('');
        setImage('');
        fetchLogs();
      }
    } catch (err) {
      console.error('🔥 Unexpected JS error:', err);
      alert('An unexpected error occurred. Check the console.');
    }
  };

  const handleToggleVisible = async (id, currentVisible) => {
    const { error } = await supabase
      .from('Logs')
      .update({ visible: !currentVisible })
      .eq('id', id);

    if (error) {
      alert(`Error updating log: ${error.message}`);
    } else {
      setLogs((prev) =>
        prev.map((log) =>
          log.id === id ? { ...log, visible: !currentVisible } : log
        )
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this log permanently?')) return;

    const { error } = await supabase.from('Logs').delete().eq('id', id);

    if (error) {
      alert(`Error deleting log: ${error.message}`);
    } else {
      setLogs((prev) => prev.filter((log) => log.id !== id));
    }
  };

  /* ------------------------------- Render ------------------------------ */
  return (
    <div className="logs-dashboard">
      <BackButton />
      {/* ---------------------------- Add Form --------------------------- */}
      <form onSubmit={handleLogSubmit} className="admin-form mb-10">
        <h3 className="text-xl font-semibold mb-2">Add Log Entry</h3>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Title (optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Started AWS setup"
        />

        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you work on or learn?"
          required
        />

        <label>Image URL (optional)</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://i.imgur.com/..."
        />

        <button type="submit">Add Log</button>
      </form>

      {/* --------------------------- Logs Table -------------------------- */}
      <hr className="my-8" />
      <h3 className="text-xl font-semibold mb-4">Existing Logs</h3>

      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p>No logs yet.</p>
      ) : (
        <div className="logs-box">
          <table className="admin-table w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Title</th>
                <th className="py-2">Visible</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="py-2">{log.date}</td>
                  <td className="py-2">{log.title ?? '(untitled)'}</td>
                  <td className="py-2 text-center">
                    <input
                      type="checkbox"
                      checked={log.visible}
                      onChange={() => handleToggleVisible(log.id, log.visible)}
                    />
                  </td>
                  <td className="py-2">
                    <button
                      className="btn-delete text-red-600 hover:underline"
                      onClick={() => handleDelete(log.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
