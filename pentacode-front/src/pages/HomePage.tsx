import Header from '../components/Header';
import { Calendar, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Elecciones Perú 2026</h1>
          <p className="text-xl text-red-100 mb-8">
            Conoce a los candidatos, sus propuestas y toda la información sobre las elecciones generales
          </p>
          <Link
            to="/candidates"
            className="inline-block bg-white text-red-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Explorar Candidatos
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <Link
            to="/candidates"
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center"
          >
            <Users className="mx-auto text-red-600 mb-4" size={40} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Candidatos</h2>
            <p className="text-gray-600">Conoce a todos los candidatos, sus perfiles y propuestas</p>
          </Link>

          {/* Card 2 */}
          <Link
            to="/parties"
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center"
          >
            <Zap className="mx-auto text-red-600 mb-4" size={40} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Partidos Políticos</h2>
            <p className="text-gray-600">Información sobre las agrupaciones políticas participantes</p>
          </Link>

          {/* Card 3 */}
          <Link
            to="/news"
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center"
          >
            <Calendar className="mx-auto text-red-600 mb-4" size={40} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Noticias</h2>
            <p className="text-gray-600">Últimas noticias y actualizaciones del proceso electoral</p>
          </Link>
        </div>

        {/* Calendar Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Calendario Electoral</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">Fechas de Elecciones</h3>
              <p className="text-gray-600 mt-2">Información sobre las fechas electorales principales</p>
            </div>
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">Fechas Relevantes</h3>
              <p className="text-gray-600 mt-2">Hitos importantes del proceso electoral</p>
            </div>
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">Miembros de Mesa</h3>
              <p className="text-gray-600 mt-2">Información para los miembros de mesa</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
