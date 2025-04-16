import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

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

      {loading ? (
        <p className="text-gray-600">Loading entries...</p>
      ) : (
        <ul className="space-y-6">
          {entries.map((entry) => (
            <li key={entry.id} className="border-b pb-4">
              <p className="text-sm text-gray-500">{entry.date}</p>
              {entry.title && (
                <h3 className="text-lg font-semibold mt-1 mb-1">{entry.title}</h3>
              )}
              <p className="text-gray-700">{entry.content}</p>
              {entry.image && (
                <img
                  src={entry.image}
                  alt="Log"
                  className="mt-3 rounded-md max-w-full border"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
