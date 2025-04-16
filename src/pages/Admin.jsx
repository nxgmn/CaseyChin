import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './Admin.css';

export default function Admin() {
  // Log entry
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');


  // Project entry
  const [projectData, setProjectData] = useState({
    title: '',
    short: '',
    description: '',
    stack: '',
    github: '',
    demo: '',
    images: '',
    date: '',
  });

  const handleLogSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      date,
      content,
      title: title.trim() !== '' ? title.trim() : null,
      image: image.trim() !== '' ? image.trim() : null,
    };
  
    console.log('🛠 Submitting payload to Supabase:', payload);
  
    try {
      const { error, data } = await supabase.from('Logs').insert([payload]);
  
      if (error) {
        console.error('❌ Supabase error:', error);
        alert(`Error adding log: ${error.message || JSON.stringify(error)}`);
      } else {
        console.log('✅ Log added:', data);
        alert('Log entry added!');
        setDate('');
        setContent('');
        setTitle('');
        setImage('');
      }
    } catch (err) {
      console.error('🔥 Unexpected JS error:', err);
      alert('An unexpected error occurred. Check the console.');
    }
  };
  
  
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const { title, short, description, stack, github, demo, images, date } = projectData;
    const { error } = await supabase.from('Projects').insert([{
      title,
      short,
      description,
      stack: stack.split(',').map((s) => s.trim()),
      github,
      demo,
      images: images.split(',').map((i) => i.trim()),
      date,
    }]);
    if (error) {
      alert('Error adding project: ' + error.message);
    } else {
      alert('Project added!');
      setProjectData({
        title: '',
        short: '',
        description: '',
        stack: '',
        github: '',
        demo: '',
        images: '',
        date: '',
      });
    }
  };

  return (
    <section className="admin-container">
      <h2 className="text-2xl font-bold mb-6">🔒 Admin Panel</h2>

      <form onSubmit={handleLogSubmit} className="admin-form mb-10">
        <h3 className="text-xl font-semibold mb-2">Add Log Entry</h3>
        <label>Date</label>
        <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        />
        <label>Title (optional)</label>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Started AWS setup"
        />

        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you work on or learn?"
          required
        />

        <label>Image URL (optional)</label>
        <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="https://i.imgur.com/..."
        />
        <button type="submit">Add Log</button>
      </form>

      <form onSubmit={handleProjectSubmit} className="admin-form">
        <h3 className="text-xl font-semibold mb-2">Add Project</h3>
        <label>Title</label>
        <input
          type="text"
          value={projectData.title}
          onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
          required
        />
        <label>Date</label>
        <input
        type="date"
        value={projectData.date}
        onChange={(e) => setProjectData({ ...projectData, date: e.target.value })}
        required
        />

        <label>Short Summary</label>
        <input
          type="text"
          value={projectData.short}
          onChange={(e) => setProjectData({ ...projectData, short: e.target.value })}
          required
        />
        <label>Description</label>
        <textarea
          value={projectData.description}
          onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
          required
        />
        <label>Stack (comma separated)</label>
        <input
          type="text"
          value={projectData.stack}
          onChange={(e) => setProjectData({ ...projectData, stack: e.target.value })}
        />
        <label>GitHub Link</label>
        <input
          type="text"
          value={projectData.github}
          onChange={(e) => setProjectData({ ...projectData, github: e.target.value })}
        />
        <label>Live Demo Link</label>
        <input
          type="text"
          value={projectData.demo}
          onChange={(e) => setProjectData({ ...projectData, demo: e.target.value })}
        />
        <label>Images (comma separated URLs)</label>
        <input
          type="text"
          value={projectData.images}
          onChange={(e) => setProjectData({ ...projectData, images: e.target.value })}
        />
        <button type="submit">Add Project</button>
      </form>
    </section>
  );
}
