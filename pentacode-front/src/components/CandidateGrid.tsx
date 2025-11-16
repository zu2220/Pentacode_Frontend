import { useState } from 'react';
import { Search, X, Briefcase, GraduationCap, Target, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import CandidateCard from './CandidateCard';
import type { Candidate } from '../types/candidate.ts';

interface CandidateGridProps {
  candidates: Candidate[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Modal de Perfil del Candidato
function CandidateProfileModal({ candidate, onClose }: { candidate: Candidate; onClose: () => void }) {
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-red-400 flex-shrink-0">
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{candidate.name}</h2>
                <p className="text-red-600 font-semibold text-lg">{candidate.party}</p>
                <p className="text-gray-600 text-sm">{candidate.position} • N° {candidate.number}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Cerrar modal"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 space-y-6">
          {/* Biografía */}
          {candidate.biography && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">👤</span>
                Biografía
              </h3>
              <p className="text-gray-700 leading-relaxed">{candidate.biography}</p>
            </section>
          )}

          {/* Experiencia Laboral */}
          {candidate.experience && candidate.experience.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="text-red-600" size={24} />
                Experiencia Laboral
              </h3>
              <div className="space-y-4">
                {candidate.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-red-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 text-lg">{exp.role}</h4>
                    <p className="text-gray-700">{exp.organization}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Formación Académica */}
          {candidate.education && candidate.education.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="text-red-600" size={24} />
                Formación Académica
              </h3>
              <div className="space-y-4">
                {candidate.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Propuestas Principales */}
          {candidate.proposals && candidate.proposals.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="text-red-600" size={24} />
                Propuestas Principales
              </h3>
              <ul className="space-y-3">
                {candidate.proposals.map((proposal, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <p className="text-gray-700 flex-1">{proposal}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Redes Sociales */}
          {candidate.socialMedia && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                Redes Sociales
              </h3>
              <div className="flex flex-wrap gap-3">
                {candidate.socialMedia.twitter && (
                  <a
                    href={candidate.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Twitter size={20} />
                    <span className="font-medium">Twitter</span>
                  </a>
                )}
                {candidate.socialMedia.facebook && (
                  <a
                    href={candidate.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Facebook size={20} />
                    <span className="font-medium">Facebook</span>
                  </a>
                )}
                {candidate.socialMedia.instagram && (
                  <a
                    href={candidate.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors"
                  >
                    <Instagram size={20} />
                    <span className="font-medium">Instagram</span>
                  </a>
                )}
                {candidate.socialMedia.linkedin && (
                  <a
                    href={candidate.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin size={20} />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Footer del Modal */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CandidateGrid({
  candidates,
  currentPage,
  totalPages,
  onPageChange,
}: CandidateGridProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const startIndex = (currentPage - 1) * 9 + 1;
  const endIndex = Math.min(currentPage * 9, candidates.length);

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
  };

  return (
    <>
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
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate} 
            onViewProfile={handleViewProfile}
          />
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

      {/* Modal de Perfil */}
      {selectedCandidate && (
        <CandidateProfileModal 
          candidate={selectedCandidate} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
}
