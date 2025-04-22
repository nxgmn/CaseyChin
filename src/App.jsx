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
          <Route path="./CaseyChinPortfolio/" element={<Home />} />
          <Route path="/CaseyChinPortfolio/projects" element={<Projects />} />
          <Route path="/CaseyChinPortfolio/skills" element={<Skills />} />
          <Route path="/CaseyChinPortfolio/experience" element={<Experience />} />
          <Route path="/CaseyChinPortfolio/contact" element={<Contact />} />
          <Route path="/CaseyChinPortfolio/logs" element={<Log />} />
          <Route path="/CaseyChinPortfolio/admin" element={<Admin />} />
          <Route path="/CaseyChinPortfolio/projects/:title" element={<ProjectDetail />} />
          <Route path="/CaseyChinPortfolio/admin/projects" element={<ProjectsDashboard />} />
          <Route path="/CaseyChinPortfolio/admin/logs" element={<LogsDashboard />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      </div>
    </Router>
  );
}
