import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function SecretLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase
      .from('secrets')
      .select('value')
      .eq('key', 'admin_pass')
      .single();

    if (error) {
      console.error('Error fetching password:', error);
      setError('Something went wrong.');
      return;
    }

    if (password === data.value) {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Admin Access</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="text-blue-600 hover:underline">Enter</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </section>
  );
}
