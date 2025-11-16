import { Search } from 'lucide-react';
import CandidateCard from './CandidateCard';
import type { Candidate } from '../types/candidate.ts';

interface CandidateGridProps {
  candidates: Candidate[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CandidateGrid({
  candidates,
  currentPage,
  totalPages,
  onPageChange,
}: CandidateGridProps) {
  const startIndex = (currentPage - 1) * 9 + 1;
  const endIndex = Math.min(currentPage * 9, candidates.length);

  return (
    <div className="flex-1">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Candidatos a las Elecciones Generales 2026
        </h1>
        <p className="text-gray-600">
          Explora, filtra y conoce a los candidatos que postulan en estas elecciones.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por nombre de candidato..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Mostrando {startIndex} de {candidates.length} candidatos
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {candidates.slice(startIndex - 1, endIndex).map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-6">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-medium">{startIndex}</span> a{' '}
          <span className="font-medium">{endIndex}</span> de{' '}
          <span className="font-medium">{candidates.length}</span> resultados
        </p>

        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
