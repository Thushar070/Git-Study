import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Home } from './pages/Home';
import { GitOverview } from './pages/GitOverview';
import { CommandDetail } from './pages/CommandDetail';
import { GitHubOverview } from './pages/GitHubOverview';
import { VisualLab } from './pages/VisualLab';
import { Situations } from './pages/Situations';
import { Troubleshooting } from './pages/Troubleshooting';
import { CheatSheet } from './pages/CheatSheet';
import { Comparisons } from './pages/Comparisons';
import { LearningPath } from './pages/LearningPath';
import { Glossary } from './pages/Glossary';
import { CommandIndex } from './pages/CommandIndex';
import { TerminalPlayground } from './pages/TerminalPlayground';
import { NotFound } from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/git" element={<GitOverview />} />
          <Route path="/git/commands/:commandId" element={<CommandDetail />} />
          <Route path="/github" element={<GitHubOverview />} />
          <Route path="/github/commands/:commandId" element={<CommandDetail />} />
          <Route path="/visual-lab" element={<VisualLab />} />
          <Route path="/visual-lab/:topic" element={<VisualLab />} />
          <Route path="/situations" element={<Situations />} />
          <Route path="/troubleshooting" element={<Troubleshooting />} />
          <Route path="/cheatsheet" element={<CheatSheet />} />
          <Route path="/compare" element={<Comparisons />} />
          <Route path="/learn" element={<LearningPath />} />
          <Route path="/reference/glossary" element={<Glossary />} />
          <Route path="/reference/command-index" element={<CommandIndex />} />
          <Route path="/terminal" element={<TerminalPlayground />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
