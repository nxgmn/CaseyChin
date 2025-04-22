// src/pages/Contact.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function Contact() {
  const [keys, setKeys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => {
        const newKeys = [...prev, e.key].slice(-KONAMI_CODE.length);

        if (JSON.stringify(newKeys) === JSON.stringify(KONAMI_CODE)) {
          const isAuthed = localStorage.getItem('admin_auth') === 'true';
          if (isAuthed) {
            navigate('/admin');
          } else {
            navigate('/secret');
          }
        }

        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <section>
      <h2 className="text-2xl font-bold">Contact</h2>
      <p>Email: <a href="mailto:cc5778@rit.edu" className="text-blue-600 hover:underline">cc5778@rit.edu</a></p>
      <p>GitHub: <a className="text-blue-600 hover:underline" href="https://github.com/nxgmn" target="_blank" rel="noopener noreferrer">github.com/nxgmn</a></p>
      <p>LinkedIn: <a className="text-blue-600 hover:underline" href="https://linkedin.com/in/caseyechin" target="_blank" rel="noopener noreferrer">linkedin.com/in/caseyechin</a></p>
      <p>Resume: <a className="text-blue-600 hover:underline" href="/resume.pdf" target="_blank" rel="noopener noreferrer" download="CaseyChin_Resume.pdf">Download Resume (PDF)</a></p>
    </section>
  );
}
