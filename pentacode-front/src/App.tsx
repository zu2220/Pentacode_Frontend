import { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import CandidatesPage from './pages/CandidatesPage';
import PartiesPage from './pages/PartiesPage';
import NewsPage from './pages/NewsPage';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('inicio');

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Home />;
      case 'candidatos':
        return <CandidatesPage />;
      case 'partidos':
        return <PartiesPage />;
      case 'noticias':
        return <NewsPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
