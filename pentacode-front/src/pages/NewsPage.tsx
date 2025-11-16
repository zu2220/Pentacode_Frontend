import Header from '../components/Header';
import { Calendar, Newspaper } from 'lucide-react';

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: 'Se inician los debates presidenciales oficiales',
      excerpt: 'Los candidatos presidenciales se enfrentan en el primer debate oficial de la campaña 2026...',
      date: '15 de noviembre de 2025',
      image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Debates',
    },
    {
      id: 2,
      title: 'Nuevas propuestas en educación presentadas por candidatos',
      excerpt: 'Los aspirantes a la presidencia detallan sus planes para mejorar la calidad educativa...',
      date: '14 de noviembre de 2025',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Propuestas',
    },
    {
      id: 3,
      title: 'Participación ciudadana en las elecciones alcanza máximo histórico',
      excerpt: 'El registro de votantes muestra un incremento significativo en la participación electoral...',
      date: '13 de noviembre de 2025',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Participación',
    },
    {
      id: 4,
      title: 'JNE publica calendario electoral actualizado',
      excerpt: 'La Junta Nacional Electoral da a conocer los fechas clave del proceso electoral 2026...',
      date: '12 de noviembre de 2025',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Calendario',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Noticias Electorales</h1>
          <p className="text-gray-600">Últimas noticias y actualizaciones del proceso electoral 2026</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar size={14} />
                    {article.date}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-600 transition">
                  {article.title}
                </h2>

                <p className="text-gray-600 mb-4 flex-grow">{article.excerpt}</p>

                <button className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1">
                  Leer más →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <section className="bg-red-600 text-white rounded-lg p-8 mt-16">
          <div className="max-w-2xl mx-auto text-center">
            <Newspaper className="mx-auto mb-4" size={40} />
            <h2 className="text-3xl font-bold mb-4">Suscríbete a nuestro boletín</h2>
            <p className="mb-6 text-red-100">
              Recibe las últimas noticias y actualizaciones sobre las elecciones 2026
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition">
                Suscribirse
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
