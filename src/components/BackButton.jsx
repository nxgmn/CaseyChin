import { useNavigate } from 'react-router-dom';
import './backButton.css';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="back-button">
      ← Back
    </button>
  );
}
