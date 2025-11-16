import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Header({ currentPage = 'inicio', onNavigate }: HeaderProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => handleNavigation('inicio')}
            >
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✦</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Elecciones Perú 2026
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavigation('inicio')}
                className={`font-medium transition-colors ${
                  currentPage === 'inicio' 
                    ? 'text-red-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Inicio
              </button>
              <button 
                onClick={() => handleNavigation('candidatos')}
                className={`font-medium transition-colors ${
                  currentPage === 'candidatos' 
                    ? 'text-red-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Candidatos
              </button>
              <button 
                onClick={() => handleNavigation('partidos')}
                className={`font-medium transition-colors ${
                  currentPage === 'partidos' 
                    ? 'text-red-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Partidos
              </button>
              <button 
                onClick={() => handleNavigation('noticias')}
                className={`font-medium transition-colors ${
                  currentPage === 'noticias' 
                    ? 'text-red-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Noticias
              </button>
            </nav>
          </div>

        </div>
      </div>
    </header>
  );
}
