import { useParams, Link } from 'react-router-dom';
import { ChevronRight, MapPin, Calendar, Globe } from 'lucide-react';
import { mockCandidates } from '../data/mockCandidates';
import Header from '../components/Header';

export default function CandidateDetail() {
  const { id } = useParams<{ id: string }>();
  const candidate = mockCandidates.find(c => c.id === Number(id));

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Candidato no encontrado</h1>
            <Link to="/" className="text-red-600 hover:underline mt-4 block">
              Volver al inicio
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">Inicio</Link>
          <ChevronRight size={16} />
          <Link to="/" className="hover:text-gray-900">Candidatos</Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">{candidate.name}</span>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Photo */}
            <div className="flex-shrink-0">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
              />
            </div>

            {/* Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{candidate.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{candidate.party} - Número {candidate.number}</p>
              <p className="text-sm text-gray-500">Candidato a {candidate.position}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="border-b border-gray-200 flex gap-8">
              <button className="px-4 py-4 text-lg font-semibold text-red-600 border-b-2 border-red-600">
                Hoja de Vida
              </button>
              <button className="px-4 py-4 text-lg font-semibold text-gray-600 hover:text-gray-900">
                Bienes y Rentas
              </button>
              <button className="px-4 py-4 text-lg font-semibold text-gray-600 hover:text-gray-900">
                Antecedentes Judiciales
              </button>
            </div>

            {/* Datos Personales */}
            {candidate.birthDate && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos Personales</h2>
                <div className="space-y-4">
                  {candidate.birthDate && (
                    <div className="flex gap-2">
                      <Calendar className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-gray-600 font-medium">Fecha de Nacimiento</p>
                        <p className="text-gray-900">{candidate.birthDate}</p>
                      </div>
                    </div>
                  )}
                  {candidate.birthPlace && (
                    <div className="flex gap-2">
                      <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-gray-600 font-medium">Lugar de Nacimiento</p>
                        <p className="text-gray-900">{candidate.birthPlace}</p>
                      </div>
                    </div>
                  )}
                  {candidate.nationality && (
                    <div className="flex gap-2">
                      <Globe className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-gray-600 font-medium">Nacionalidad</p>
                        <p className="text-gray-900">{candidate.nationality}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Formación Académica */}
            {candidate.education && candidate.education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Formación Académica</h2>
                <div className="space-y-4">
                  {candidate.education.map((edu, idx) => (
                    <div key={idx} className="pb-4 border-b border-gray-200 last:border-0">
                      <p className="text-gray-900 font-semibold">{edu.institution}</p>
                      <p className="text-gray-600 text-sm">{edu.degree}</p>
                      {edu.country && <p className="text-gray-500 text-sm">{edu.country}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experiencia Laboral */}
            {candidate.experience && candidate.experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Experiencia Laboral</h2>
                <div className="space-y-4">
                  {candidate.experience.map((exp, idx) => (
                    <div key={idx} className="pb-4 border-b border-gray-200 last:border-0">
                      <p className="text-gray-900 font-semibold">{exp.organization}</p>
                      <p className="text-gray-600 font-medium">{exp.title}</p>
                      <p className="text-gray-500 text-sm">Período: {exp.period}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Propuestas por Sector */}
            {candidate.proposals && candidate.proposals.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Propuestas por Sector</h2>
                <div className="space-y-4">
                  {candidate.proposals.map((prop, idx) => (
                    <div key={idx} className="pb-4 border-b border-gray-200 last:border-0">
                      <div className="flex gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-red-600 font-bold text-sm">{prop.sector.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{prop.sector}</h3>
                          <p className="text-gray-600 text-sm">{prop.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botón Comparar */}
                <button className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                  <span>⚡</span>
                  Comparar Candidato
                </button>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          <p>Fuente: JNE - Hoja de Vida Oficial</p>
        </div>
      </main>
    </div>
  );
}
