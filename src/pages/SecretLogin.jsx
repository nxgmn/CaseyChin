import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SecretLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      navigate('/admin');
    } else {
      alert('Incorrect password');
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
        <button type="submit" className="text-blue-600 hover:underline">
          Enter
        </button>
      </form>
    </section>
  );
}
