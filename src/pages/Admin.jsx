import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function Admin() {

  return (
    <section className="admin-container">
      <h2 className="text-2xl font-bold mb-6">🔒 Admin Panel</h2>
      
      <h3><Link to="/admin/projects">Projects Dashboard</Link></h3>
      <h3><Link to="/admin/logs">Logs Dashboard</Link></h3>
     
    </section>
  );
}
