// File: App.tsx
import { Routes, Route } from 'react-router-dom';
import SentenceGame from './pages/SentenceGame';
import ResultPage from './pages/ResultPage';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quiz" element={<SentenceGame />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
};

export default App;
