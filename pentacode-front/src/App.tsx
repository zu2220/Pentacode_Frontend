import { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import CandidatesPage from './pages/CandidatesPage';
import PartiesPage from './pages/PartiesPage';
import NewsPage from './pages/NewsPage';
import LugarVotacion from './components/lugar_votacion';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('inicio');

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Home onNavigate={setCurrentPage} />;
      case 'candidatos':
        return <CandidatesPage />;
      case 'partidos':
        return <PartiesPage />;
      case 'noticias':
        return <NewsPage />;
      case 'donde-votar':
        return <LugarVotacion />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <ChatbotWidget />
    </div>
  );
}

export default App;
