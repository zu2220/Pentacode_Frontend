import { useState, useEffect } from 'react';

// Interfaz para el tipo de candidato
interface Candidato {
  nombre: string;
  partido: string;
  foto: string;
  logo: string;
}

// Datos estáticos de candidatos destacados
const candidatos: Candidato[] = [
  {
    nombre: "María Elena González",
    partido: "Partido Democrático Peruano",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop"
  },
  {
    nombre: "Carlos Ramírez Torres",
    partido: "Alianza Nacional",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop"
  },
  {
    nombre: "Ana Lucía Mendoza",
    partido: "Frente Popular",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=100&h=100&fit=crop"
  },
  {
    nombre: "Roberto Castillo Pérez",
    partido: "Movimiento Ciudadano",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1621252179027-94459d278660?w=100&h=100&fit=crop"
  },
  {
    nombre: "Patricia Vargas Luna",
    partido: "Partido Liberal",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=100&h=100&fit=crop"
  },
  {
    nombre: "Jorge Luis Salazar",
    partido: "Unión Progresista",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1623039405147-547794f92e9e?w=100&h=100&fit=crop"
  }
];

// Interfaz para el tiempo restante
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Home = () => {
  // Fecha objetivo: 12 de abril del 2026, 08:00 AM Perú (UTC-5)
  const targetDate = new Date('2026-04-12T08:00:00-05:00').getTime();

  // Estado para el contador regresivo
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Hook para actualizar el contador cada segundo
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calcular inmediatamente
    calculateTimeRemaining();

    // Actualizar cada segundo
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full">
      {/* SECCIÓN DE CUENTA REGRESIVA */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&h=1080&fit=crop')",
          }}
        >
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Contenido del contador */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Elecciones Presidenciales del Perú 2026
          </h1>
          <p className="text-xl md:text-2xl mb-12 drop-shadow-md">
            12 de Abril, 2026 - 08:00 AM
          </p>

          {/* Contador regresivo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
            {/* Días */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="text-5xl md:text-7xl font-bold mb-2">
                {String(timeRemaining.days).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                Días
              </div>
            </div>

            {/* Horas */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="text-5xl md:text-7xl font-bold mb-2">
                {String(timeRemaining.hours).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                Horas
              </div>
            </div>

            {/* Minutos */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="text-5xl md:text-7xl font-bold mb-2">
                {String(timeRemaining.minutes).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                Minutos
              </div>
            </div>

            {/* Segundos */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="text-5xl md:text-7xl font-bold mb-2">
                {String(timeRemaining.seconds).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                Segundos
              </div>
            </div>
          </div>

          {/* Botón destacado */}
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg md:text-xl px-12 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-red-500/50 active:scale-95">
            Conoce dónde votar
          </button>
        </div>
      </section>

      {/* SECCIÓN DE PARTIDOS POLÍTICOS DESTACADOS */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título de la sección */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Partidos políticos destacados
          </h2>
          <p className="text-center text-gray-600 mb-12 md:mb-16 text-lg">
            Conoce a los candidatos presidenciales con mayor preferencia
          </p>

          {/* Grid de candidatos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {candidatos.map((candidato, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  {/* Contenedor de la foto con logo */}
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    {/* Foto del candidato */}
                    <img
                      src={candidato.foto}
                      alt={candidato.nombre}
                      className="w-full h-full rounded-full object-cover border-4 border-gray-200 shadow-md"
                    />
                    
                    {/* Logo del partido en la esquina inferior derecha */}
                    <div className="absolute bottom-2 right-2 w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                      <img
                        src={candidato.logo}
                        alt={`Logo ${candidato.partido}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Información del candidato */}
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {candidato.nombre}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg font-medium">
                      {candidato.partido}
                    </p>
                  </div>
                </div>

                {/* Barra inferior decorativa */}
                <div className="h-2 bg-gradient-to-r from-blue-600 via-red-600 to-blue-600"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
