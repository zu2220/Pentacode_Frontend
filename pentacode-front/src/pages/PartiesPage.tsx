import React, { useState } from 'react';
import { Search, Download, PieChart, List, X } from 'lucide-react';

// --- Colores para el Gráfico ---
const CHART_COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899'];

// --- Componente del Gráfico de Pastel ---
interface ChartData {
  name: string;
  percentage: number;
}

function PieChartDisplay({ data }: { data: ChartData[] }) {
  let gradientString = 'conic-gradient(';
  let currentPercentage = 0;
  
  data.forEach((item, index) => {
    const color = CHART_COLORS[index % CHART_COLORS.length];
    gradientString += `${color} ${currentPercentage}% ${currentPercentage + item.percentage}%`;
    currentPercentage += item.percentage;
    if (index < data.length - 1) {
      gradientString += ', ';
    }
  });
  gradientString += ')';

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div 
        className="w-40 h-40 md:w-48 md:h-48 rounded-full flex-shrink-0"
        style={{ backgroundImage: gradientString }}
        role="img"
        aria-label="Gráfico de pastel de ejes del plan"
      >
      </div>
      <ul className="w-full space-y-2">
        {data.map((item, index) => (
          <li key={item.name} className="flex items-center text-sm">
            <span 
              className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
            ></span>
            <span className="font-semibold text-gray-700">{item.name}:</span>
            <span className="ml-auto text-gray-600 font-medium">{item.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Componente Modal del Partido ---
interface PartyData {
  name: string;
  axes: string[];
  planData: {
    '2026': ChartData[];
    '2022': ChartData[];
  };
}

function PartyModal({ party, onClose }: { party: PartyData; onClose: () => void }) {
  const [selectedYear, setSelectedYear] = useState<'2026' | '2022'>('2026');
  const planData = party.planData[selectedYear];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 md:p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{party.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex justify-center mb-6">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setSelectedYear('2026')}
                className={`w-28 py-2 px-4 rounded-lg font-semibold transition-colors ${selectedYear === '2026' ? 'bg-red-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                Plan 2026
              </button>
              <button
                onClick={() => setSelectedYear('2022')}
                className={`w-28 py-2 px-4 rounded-lg font-semibold transition-colors ${selectedYear === '2022' ? 'bg-red-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                Plan 2022
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <List size={20} className="mr-2 text-red-600" />
              Ejes Principales (Resumen)
            </h3>
            <div className="flex flex-wrap gap-2">
              {party.axes.map((axis, idx) => (
                <span key={idx} className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {axis}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <PieChart size={20} className="mr-2 text-red-600" />
              Distribución del Plan de Gobierno ({selectedYear})
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <PieChartDisplay data={planData} />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// --- Modal de Prioridades ---
interface PrioritiesModalProps {
  selectedPriorities: string[];
  onTogglePriority: (priority: string) => void;
  onClose: () => void;
  onApply: () => void;
}

function PrioritiesModal({ selectedPriorities, onTogglePriority, onClose, onApply }: PrioritiesModalProps) {
  const priorities = [
    { id: 'Seguridad', icon: '🚨', label: 'Seguridad' },
    { id: 'Economía', icon: '💰', label: 'Economía' },
    { id: 'Salud', icon: '❤️', label: 'Salud' },
    { id: 'Educación', icon: '🎒', label: 'Educación' },
    { id: 'Transporte', icon: '🚍', label: 'Transporte' },
    { id: 'Empleo', icon: '👷', label: 'Empleo' },
    { id: 'Corrupción', icon: '⚖️', label: 'Corrupción' },
    { id: 'Medio Ambiente', icon: '🌱', label: 'Medio Ambiente' },
    { id: 'Innovación', icon: '💡', label: 'Innovación' },
    { id: 'Infraestructura', icon: '🏗', label: 'Infraestructura' },
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Selecciona Prioridades</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
              <X size={28} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">Selecciona una o más prioridades sociales</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {priorities.map((priority) => {
              const isSelected = selectedPriorities.includes(priority.id);
              return (
                <button
                  key={priority.id}
                  onClick={() => onTogglePriority(priority.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-red-600 bg-red-50 shadow-md scale-105'
                      : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-sm'
                  }`}
                >
                  <span className="text-4xl mb-2">{priority.icon}</span>
                  <span className={`text-sm font-semibold text-center ${
                    isSelected ? 'text-red-700' : 'text-gray-700'
                  }`}>
                    {priority.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-md"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Componente Principal de la Aplicación ---
export default function PartiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Todos');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrioritiesModalOpen, setIsPrioritiesModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState<PartyData | null>(null);

  // Handlers para el modal de prioridades
  const handleTogglePriority = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const handleApplyPriorities = () => {
    setIsPrioritiesModalOpen(false);
  };

  const handleClosePrioritiesModal = () => {
    setIsPrioritiesModalOpen(false);
  };

  const parties = [
    {
      id: 1,
      name: 'Partido Alianza Nacional',
      shortName: 'PAN',
      icon: '🛡️',
      bgColor: 'bg-teal-700',
      axes: ['Economía', 'Seguridad', 'Salud'],
      planData: {
        '2026': [
          { name: 'Economía', percentage: 35 },
          { name: 'Seguridad', percentage: 30 },
          { name: 'Salud', percentage: 25 },
          { name: 'Otros', percentage: 10 }
        ],
        '2022': [
          { name: 'Economía', percentage: 40 },
          { name: 'Seguridad', percentage: 25 },
          { name: 'Salud', percentage: 20 },
          { name: 'Otros', percentage: 15 }
        ]
      }
    },
    {
      id: 2,
      name: 'Frente Popular Unido',
      shortName: 'FPU',
      icon: '🌱',
      bgColor: 'bg-teal-600',
      axes: ['Educación', 'Medio Ambiente', 'Jóvenes'],
      planData: {
        '2026': [
          { name: 'Educación', percentage: 40 },
          { name: 'Medio Ambiente', percentage: 30 },
          { name: 'Jóvenes', percentage: 20 },
          { name: 'Cultura', percentage: 10 }
        ],
        '2022': [
          { name: 'Educación', percentage: 35 },
          { name: 'Medio Ambiente', percentage: 25 },
          { name: 'Jóvenes', percentage: 25 },
          { name: 'Cultura', percentage: 15 }
        ]
      }
    },
    {
      id: 3,
      name: 'Movimiento Cívico Renovador',
      shortName: 'MCR',
      icon: '🌾',
      bgColor: 'bg-yellow-400',
      axes: ['Reforma del Estado', 'Infraestructura', 'Agricultura'],
      planData: {
        '2026': [
          { name: 'Reforma E.', percentage: 30 },
          { name: 'Infraestructura', percentage: 45 },
          { name: 'Agricultura', percentage: 15 },
          { name: 'Otros', percentage: 10 }
        ],
        '2022': [
          { name: 'Reforma E.', percentage: 25 },
          { name: 'Infraestructura', percentage: 40 },
          { name: 'Agricultura', percentage: 25 },
          { name: 'Otros', percentage: 10 }
        ]
      }
    },
    {
      id: 4,
      name: 'Unión por el Progreso',
      shortName: 'UPP',
      icon: '❤️',
      bgColor: 'bg-emerald-700',
      axes: ['Integración', 'Igualdad', 'Descentralización'],
      planData: {
        '2026': [
          { name: 'Integración', percentage: 25 },
          { name: 'Igualdad', percentage: 40 },
          { name: 'Descentralización', percentage: 35 }
        ],
        '2022': [
          { name: 'Integración', percentage: 30 },
          { name: 'Igualdad', percentage: 30 },
          { name: 'Descentralización', percentage: 40 }
        ]
      }
    },
    {
      id: 5,
      name: 'Democracia Activa',
      shortName: 'DA',
      icon: '🕊️',
      bgColor: 'bg-gray-100',
      axes: ['Mujer', 'Inclusión Social', 'Cultura'],
      planData: {
        '2026': [
          { name: 'Mujer', percentage: 35 },
          { name: 'Inclusión Social', percentage: 45 },
          { name: 'Cultura', percentage: 20 }
        ],
        '2022': [
          { name: 'Mujer', percentage: 30 },
          { name: 'Inclusión Social', percentage: 40 },
          { name: 'Cultura', percentage: 30 }
        ]
      }
    },
    {
      id: 6,
      name: 'Partido del Futuro',
      shortName: 'PDF',
      icon: '🚀',
      bgColor: 'bg-teal-800',
      axes: ['Tecnología', 'Desarrollo Sostenible', 'Trabajo'],
      planData: {
        '2026': [
          { name: 'Tecnología', percentage: 50 },
          { name: 'Desarrollo S.', percentage: 25 },
          { name: 'Trabajo', percentage: 25 }
        ],
        '2022': [
          { name: 'Tecnología', percentage: 40 },
          { name: 'Desarrollo S.', percentage: 30 },
          { name: 'Trabajo', percentage: 30 }
        ]
      }
    },
  ];

  const filteredParties = parties.filter((party) =>
    party.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (party: typeof parties[0]) => {
    setSelectedParty(party);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedParty(null);
    }, 300);
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Explora los Partidos Políticos</h1>
        <p className="text-lg text-gray-600 mb-6">
          Compara los planes de gobierno de cada partido de forma fácil y visual
        </p>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar partido por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>
          
          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Select de Región */}
            <div className="flex-1">
              <label htmlFor="region" className="block text-sm font-semibold text-gray-700 mb-2">
                📍 Región
              </label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition shadow-sm hover:shadow-md bg-white font-medium text-gray-700"
              >
                <option value="Todos">Todos</option>
                <option value="Costa">Costa</option>
                <option value="Sierra">Sierra</option>
                <option value="Selva">Selva</option>
              </select>
            </div>

            {/* Prioridad Social con "Ver más" */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⭐ Prioridad Social
              </label>
              <div className="space-y-2">
                {/* 3 principales categorías */}
                <div className="flex flex-wrap gap-2">
                  {['Seguridad', 'Economía', 'Salud'].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => handleTogglePriority(priority)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedPriorities.includes(priority)
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
                {/* Botón "Ver más" */}
                <button
                  onClick={() => setIsPrioritiesModalOpen(true)}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold underline hover:no-underline transition-all flex items-center gap-1"
                >
                  Ver más... 
                  {selectedPriorities.length > 3 && (
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                      +{selectedPriorities.length - 3}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredParties.map((party) => (
            <div
              key={party.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer transform hover:scale-105"
              onClick={() => handleCardClick(party)}
            >
              <div
                className={`${party.bgColor} h-32 flex items-center justify-center text-6xl relative overflow-hidden`}
              >
                <div className="opacity-20 text-8xl transform scale-150">{party.icon}</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${party.bgColor === 'bg-gray-100' ? 'text-gray-700' : 'text-white'} opacity-80`}>
                    {party.shortName}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-4 h-14">{party.name}</h2>
                <div className="mb-6 flex-grow">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Ejes principales:</p>
                  <div className="flex flex-wrap gap-2">
                    {party.axes.map((axis, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded"
                      >
                        {axis}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Descarga de PDF iniciada (simulación)');
                  }}
                >
                  <Download size={18} />
                  Descargar Plan Oficial (PDF)
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredParties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No se encontraron partidos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </main>

      {isModalOpen && selectedParty && (
        <PartyModal party={selectedParty} onClose={handleCloseModal} />
      )}
      
      {isPrioritiesModalOpen && (
        <PrioritiesModal
          selectedPriorities={selectedPriorities}
          onTogglePriority={handleTogglePriority}
          onClose={handleClosePrioritiesModal}
          onApply={handleApplyPriorities}
        />
      )}
    </>
  );
}
