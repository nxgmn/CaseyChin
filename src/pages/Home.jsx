import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import './Home.css';

export default function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('Logs')
        .select('*')
        .eq('visible', true)
        .order('date', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching logs:', error);
      } else {
        setLogs(data);
      }
    }

    fetchLogs();
  }, []);

  return (
    <div className="home-page px-6 py-10 max-w-4xl mx-auto">
      {/* Intro Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hi, I’m Casey Chin</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          I’m a second-year Computer Science and Economics student at the Rochester Institute of Technology. I love exploring new technologies, learning by building, and turning ideas into real, impactful software.
        </p>
      </section>

      {/* What I Do Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">What I Do</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          I like making fun projects and little productivity tools in my free time. Plus anything else that'll help me to learn something new. Check it out!
        </p>
        <Link to="/projects" className="text-blue-600 hover:underline">Explore my projects →</Link>
      </section>

      {/* What I've Done Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">What I’ve Done</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          I like to think I've done a couple cool things in the past. Worked with different people, explored different areas, accomplished a couple things here and there.
        </p>
        <Link to="/experience" className="text-blue-600 hover:underline">View my experiences →</Link>
      </section>

      {/* Latest Updates Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">What’s Coming Up</h2>
        {logs.length === 0 ? (
          <p className="text-gray-500 italic">No recent logs yet.</p>
        ) : (
          <ul className="space-y-3 text-gray-800">
            {logs.map((entry) => {
              const maxLength = 80;
              const content =
                entry.content.length > maxLength
                  ? entry.content.slice(0, maxLength).split(' ').slice(0, -1).join(' ') + ' ...'
                  : entry.content;

              return (
                <li key={entry.id} className="flex items-start gap-4">
                  <span className="min-w-[90px] text-sm text-gray-500">{entry.date} &nbsp;</span>
                  <span className="flex-1 leading-relaxed">{content}</span>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-2">
          <Link to="/logs" className="text-blue-600 hover:underline">View all updates →</Link>
        </div>
      </section>
    </div>
  );
}
