import { Filter, User, Globe, Users, HelpCircle } from 'lucide-react';

interface FilterSidebarProps {
  isOpen?: boolean;
}

export default function FilterSidebar({ isOpen = true }: FilterSidebarProps) {
  return (
    <aside
      className={`${
        isOpen ? 'block' : 'hidden'
      } md:block w-full md:w-64 bg-white rounded-lg shadow-sm p-6 space-y-4`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-gray-700" />
        <h2 className="font-semibold text-gray-900">Filtros Avanzados</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">Refina tu búsqueda</p>

      <button className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
        <User className="w-5 h-5" />
        <span className="font-medium">Filtrar por Cargo</span>
      </button>

      <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        <Globe className="w-5 h-5" />
        <span>Región</span>
      </button>

      <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        <Users className="w-5 h-5" />
        <span>Agrupación Política</span>
      </button>

      <button className="w-full mt-8 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
        Limpiar Filtros
      </button>

      <button className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mt-8">
        <HelpCircle className="w-5 h-5" />
        <span>Ayuda</span>
      </button>
    </aside>
  );
}
