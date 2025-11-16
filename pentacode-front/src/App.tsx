import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import CandidateDetail from './pages/CandidateDetail';
import PartiesPage from './pages/PartiesPage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidate/:id" element={<CandidateDetail />} />
        <Route path="/parties" element={<PartiesPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
