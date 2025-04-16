import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('Logs')
        .select('*')
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
    <>
      <section className="home-container">
        <h1 className="text-3xl font-bold mb-4">Hey, I'm Casey 👋</h1>

        <p className="mb-4 text-gray-700">
          I’m a Computer Science and Economics student at RIT, usually found building tools to help me stay focused (because staying focused is hard), writing logs when I remember to, and trying to figure out how everything connects.
        </p>

        <p className="mb-4 text-gray-700">
          This site is where I keep track of the stuff I’m working on, learning, or experimenting with. It’s not meant to be polished — more like a living record of where I’m at.
        </p>

        <p className="mb-4 text-gray-700">Right now I’m:</p>

        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Prepping for my summer internship at Liberty Mutual</li>
          <li>Learning AWS and building a few projects</li>
          <li>Very slowly working on this website</li>
        </ul>

        <p className="text-gray-700">
          You can check out my <Link to="/projects" className="text-blue-600 hover:underline">projects</Link>, peek at what I’ve <Link to="/log" className="text-blue-600 hover:underline">been working on</Link>, or just click around.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Latest Updates</h2>
        <ul className="list-disc list-inside text-gray-800 mb-2">
          {logs.map((entry) => (
            <li key={entry.id}>
              <span className="text-sm text-gray-600 mr-2">{entry.date}:&nbsp;</span>
              {entry.content}
            </li>
          ))}
        </ul>
        <Link to="/log" className="text-blue-600 hover:underline">View All Updates →</Link>
      </section>
    </>
  );
}
