import { useNavigate } from 'react-router-dom';

export default function BackButton({ className = '' }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`text-blue-600 hover:underline font-medium mb-4 inline-block bg-transparent border-none p-0 cursor-pointer ${className}`}
    >
      ← Back
    </button>
  );
}
