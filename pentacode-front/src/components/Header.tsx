import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✦</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Elecciones Perú 2026
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-red-700 font-medium">
                Inicio
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Candidatos
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Donde votar
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar"
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              />
            </div>

            <button className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
