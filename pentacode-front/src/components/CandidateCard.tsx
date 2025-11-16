import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Candidate } from '../types/candidate.ts'
interface CandidateCardProps {
  candidate: Candidate;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-red-400">
          <img
            src={candidate.photoUrl}
            alt={candidate.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
        {candidate.name}
      </h3>

      <p className="text-sm text-gray-600 text-center mb-2">
        {candidate.party}
      </p>

      <p className="text-red-600 font-bold text-sm mb-4">
        N° {candidate.number}
      </p>

      <Link
        to={`/candidate/${candidate.id}`}
        className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors mb-3 text-center block"
      >
        Ver Perfil
      </Link>

      <button className="w-full flex items-center justify-center space-x-2 text-red-600 py-2 text-sm hover:bg-red-50 rounded-lg transition-colors">
        <FileText className="w-4 h-4" />
        <span>Hoja de Vida (JNE)</span>
      </button>
    </div>
  );
}
