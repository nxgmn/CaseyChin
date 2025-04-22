import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './log.css';

export default function Log() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('Logs')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching logs:', error);
      } else {
        setEntries(data);
      }
      setLoading(false);
    }

    fetchLogs();
  }, []);

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Personal Log</h2>
      <br></br>

      {loading ? (
        <p className="text-gray-600">Loading entries...</p>
      ) : (
        <div className="log-scroll-container">
          {entries.map((entry) => (
            <div key={entry.id} className="log-card">
              <p className="log-date-absolute">
                {new Date(entry.date).toLocaleDateString()}
              </p>
              {entry.title && <h3 className="log-title mt-0">{entry.title}</h3>}
              <p className="log-content">{entry.content}</p>
              {entry.image && (
                <img
                  src={entry.image}
                  alt="Log"
                  className="log-image"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>

  );
}
