import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Log from './pages/Log';
import Admin from './pages/Admin';
import ProjectDetail from './pages/ProjectDetail';
import ProjectsDashboard from './pages/ProjectsDashboard';
import LogsDashboard from './pages/LogsDashboard';
import SecretLogin from './pages/SecretLogin';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logs" element={<Log />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/projects/:title" element={<ProjectDetail />} />
          <Route path="/admin/projects" element={<ProjectsDashboard />} />
          <Route path="admin/logs" element={<LogsDashboard />} />
          <Route path="/secret" element={<SecretLogin />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router basename="/CaseyChin">
      <div className="app-container">
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      </div>
    </Router>
  );
}
