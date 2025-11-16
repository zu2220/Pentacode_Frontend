import { useState, useEffect, useRef } from 'react';

// ==================== INTERFACES ====================
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Partido {
  id: number;
  nombre: string;
  logo: string;
  presidente: {
    nombre: string;
    foto: string;
    hojaVida: string;
  };
  vicepresidentes: Array<{
    nombre: string;
    foto: string;
  }>;
  planGobierno: string;
}

interface EventoElectoral {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  detalles: string[];
}

interface InfoElector {
  id: number;
  titulo: string;
  icono: string;
  descripcion: string;
  contenido: string[];
}

interface NoticiaElectoral {
  id: number;
  titulo: string;
  subtitulo: string;
  fecha: string;
  categoria: string;
  imagen: string;
  destacada: boolean;
}

interface FAQ {
  id: number;
  pregunta: string;
  respuesta: string;
  icono: string;
}

// ==================== DATOS MOCK ====================
const partidos: Partido[] = [
  {
    id: 1,
    nombre: "Partido Democrático Peruano",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    presidente: {
      nombre: "María Elena González",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
      hojaVida: "Economista con 20 años de experiencia en el sector público. Ex ministra de Economía y Finanzas. Especialista en políticas de inclusión social y desarrollo económico sostenible."
    },
    vicepresidentes: [
      { nombre: "Carlos Mendoza", foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" },
      { nombre: "Ana Torres", foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop" }
    ],
    planGobierno: "Nuestro plan se enfoca en tres pilares fundamentales: 1) Reactivación económica post-pandemia con énfasis en MYPES, 2) Reforma educativa integral con inversión en infraestructura tecnológica, 3) Lucha frontal contra la corrupción mediante fortalecimiento institucional."
  },
  {
    id: 2,
    nombre: "Alianza Nacional",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop",
    presidente: {
      nombre: "Roberto Castillo Pérez",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      hojaVida: "Ingeniero civil y empresario exitoso. Ha liderado proyectos de infraestructura en todo el país. Presidente de la Cámara de Comercio durante 5 años."
    },
    vicepresidentes: [
      { nombre: "Patricia Vargas", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
      { nombre: "Luis Ramírez", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" }
    ],
    planGobierno: "Proponemos un modelo de desarrollo basado en infraestructura moderna, inversión privada responsable y emprendimiento. Prioridades: carreteras, hospitales, colegios y conectividad digital en zonas rurales."
  },
  {
    id: 3,
    nombre: "Frente Popular",
    logo: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=200&h=200&fit=crop",
    presidente: {
      nombre: "Jorge Luis Salazar",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      hojaVida: "Abogado constitucionalista y defensor de derechos humanos. Ha trabajado en organizaciones internacionales y fue congresista por dos periodos."
    },
    vicepresidentes: [
      { nombre: "Rosa Quispe", foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop" },
      { nombre: "Manuel Castro", foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" }
    ],
    planGobierno: "Justicia social y equidad son nuestros ejes. Proponemos reforma agraria moderna, acceso universal a salud de calidad, educación gratuita hasta nivel superior y protección de pueblos originarios."
  },
  {
    id: 4,
    nombre: "Movimiento Ciudadano",
    logo: "https://images.unsplash.com/photo-1621252179027-94459d278660?w=200&h=200&fit=crop",
    presidente: {
      nombre: "Carmen Flores Díaz",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
      hojaVida: "Médica cirujana especializada en salud pública. Dirigió programas de salud comunitaria en zonas vulnerables. Reconocida por su trabajo durante la pandemia."
    },
    vicepresidentes: [
      { nombre: "Alberto Ramos", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
      { nombre: "Silvia Morales", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" }
    ],
    planGobierno: "Salud para todos es posible. Implementaremos un sistema de salud preventivo, fortaleceremos la atención primaria, modernizaremos hospitales y garantizaremos medicamentos accesibles para toda la población."
  },
  {
    id: 5,
    nombre: "Partido Liberal",
    logo: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=200&h=200&fit=crop",
    presidente: {
      nombre: "Fernando Rojas Silva",
      foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
      hojaVida: "Economista y empresario tecnológico. Fundador de startups exitosas. Impulsor de la transformación digital del Estado y la innovación como motor de desarrollo."
    },
    vicepresidentes: [
      { nombre: "Lucía Paredes", foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop" },
      { nombre: "Diego Herrera", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" }
    ],
    planGobierno: "Perú digital y competitivo. Fomentaremos emprendimiento tecnológico, eliminaremos burocracia innecesaria, implementaremos gobierno electrónico y promoveremos educación en ciencia y tecnología desde inicial."
  },
  {
    id: 6,
    nombre: "Unión Progresista",
    logo: "https://images.unsplash.com/photo-1623039405147-547794f92e9e?w=200&h=200&fit=crop",
    presidente: {
      nombre: "Gabriela Núñez Torres",
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      hojaVida: "Socióloga y activista ambiental. Ha liderado movimientos de protección de recursos naturales. Ex viceministra de Ambiente. Promotora de economía verde y sostenible."
    },
    vicepresidentes: [
      { nombre: "Raúl Espinoza", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
      { nombre: "Isabel Campos", foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" }
    ],
    planGobierno: "Desarrollo sostenible y protección ambiental. Impulsaremos energías renovables, reforestación masiva, agricultura orgánica, turismo ecológico y economía circular para un Perú verde y próspero."
  }
];

const eventosElectorales: EventoElectoral[] = [
  {
    id: 1,
    titulo: "Sorteo de miembros de mesa",
    descripcion: "Los ciudadanos son seleccionados para conformar las mesas de votación",
    fecha: "20 de Febrero, 2026",
    detalles: [
      "Se realiza mediante sistema informático del RENIEC",
      "Se seleccionan titulares y suplentes de manera aleatoria",
      "Son elegibles ciudadanos entre 18 y 70 años alfabetos",
      "La designación es obligatoria bajo sanción de multa",
      "Se publican las listas en la página web de ONPE y locales de votación"
    ]
  },
  {
    id: 2,
    titulo: "Publicación de local de votación",
    descripcion: "Los electores pueden consultar dónde les toca votar",
    fecha: "01 de Marzo, 2026",
    detalles: [
      "Puedes consultar tu local de votación en la página de ONPE",
      "Verifica tu número de mesa y dirección exacta del local",
      "Disponible en web, app móvil y SMS",
      "Importante revisar con anticipación para evitar contratiempos",
      "Tu local puede haber cambiado desde las últimas elecciones"
    ]
  },
  {
    id: 3,
    titulo: "Capacitación de miembros de mesa",
    descripcion: "Talleres presenciales y virtuales para titulares y suplentes",
    fecha: "Marzo, 2026 - Fechas diversas",
    detalles: [
      "Talleres gratuitos organizados por la ONPE",
      "Modalidad presencial y virtual disponible",
      "Se enseña el proceso de instalación de mesa",
      "Capacitación sobre el escrutinio y llenado de actas",
      "Entrega de material informativo y certificados",
      "La asistencia es obligatoria para los miembros designados"
    ]
  },
  {
    id: 4,
    titulo: "Jornada Electoral - Primera vuelta",
    descripcion: "Día oficial de votación en todo el país",
    fecha: "12 de Abril, 2026 • 8:00 AM - 4:00 PM",
    detalles: [
      "Las mesas de sufragio abren a las 8:00 AM en punto",
      "Cierran a las 4:00 PM o cuando vote el último elector en cola",
      "Es obligatorio portar DNI original para poder sufragar",
      "El voto es obligatorio para ciudadanos entre 18 y 70 años",
      "Los resultados preliminares se publican progresivamente durante la noche",
      "Prohibida la venta de alcohol 24 horas antes y durante la jornada"
    ]
  }
];

const infoElectores: InfoElector[] = [
  {
    id: 1,
    titulo: "¿Cómo votar?",
    icono: "📝",
    descripcion: "Guía paso a paso del proceso de votación",
    contenido: [
      "1. Ubica tu local de votación y número de mesa con tu DNI",
      "2. Llega temprano al local asignado portando tu DNI original",
      "3. Dirígete a tu mesa y entrega tu DNI al miembro de mesa",
      "4. Firma el padrón electoral y recibe tu cédula de sufragio",
      "5. Pasa a la cámara secreta y marca tu preferencia con una X o aspa",
      "6. Dobla la cédula y deposítala en el ánfora correspondiente",
      "7. Recibe tu DNI con el holograma que acredita que votaste",
      "Recuerda: El voto es personal, secreto y obligatorio"
    ]
  },
  {
    id: 2,
    titulo: "¿Dónde voto?",
    icono: "📍",
    descripcion: "Encuentra tu local y mesa de votación",
    contenido: [
      "Puedes consultar tu local de votación en:",
      "• Página web de la ONPE: www.onpe.gob.pe",
      "• Aplicación móvil 'Info ONPE'",
      "• Enviando un SMS con tu DNI al 3366",
      "• Llamando a la línea gratuita 0800-ONPE (6673)",
      "Es importante verificar esta información con anticipación",
      "Tu local puede cambiar, así que consulta siempre antes de las elecciones",
      "Lleva anotado tu número de mesa y local para evitar contratiempos"
    ]
  },
  {
    id: 3,
    titulo: "Consejos de seguridad",
    icono: "🛡️",
    descripcion: "Recomendaciones para un día de votación seguro",
    contenido: [
      "• Lleva solo lo necesario: DNI, agua y tu lista si la elaboraste",
      "• No lleves objetos de valor ni grandes sumas de dinero",
      "• Mantén tu celular en silencio y guárdalo mientras votas",
      "• No compartas fotos de tu voto, es secreto y puede invalidarse",
      "• Respeta las medidas sanitarias vigentes",
      "• No discusas preferencias políticas en el local de votación",
      "• Si ves irregularidades, repórtalas a los personeros o miembros de mesa",
      "• Regresa a casa por rutas seguras y conocidas"
    ]
  },
  {
    id: 4,
    titulo: "Marco legal básico",
    icono: "⚖️",
    descripcion: "Conoce tus derechos y deberes como elector",
    contenido: [
      "Derechos del elector:",
      "• Votar libremente por el candidato de tu preferencia",
      "• Acceder a información sobre candidatos y planes de gobierno",
      "• Denunciar irregularidades durante el proceso electoral",
      "• Recibir atención preferente si eres adulto mayor, gestante o con discapacidad",
      "",
      "Deberes del elector:",
      "• Votar es obligatorio si tienes entre 18 y 70 años",
      "• Portar tu DNI original en buen estado",
      "• No votar conlleva multa y restricciones administrativas",
      "• Respetar el orden y las normas del local de votación"
    ]
  }
];

const noticiasElectorales: NoticiaElectoral[] = [
  {
    id: 1,
    titulo: "ONPE presenta nueva plataforma digital para consulta de locales de votación",
    subtitulo: "Sistema actualizado permitirá verificar ubicación exacta y recibir alertas personalizadas sobre el proceso electoral",
    fecha: "15 de Noviembre, 2025",
    categoria: "Tecnología",
    imagen: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    destacada: true
  },
  {
    id: 2,
    titulo: "Sorteo de miembros de mesa se realizará el 20 de febrero",
    subtitulo: "Más de 300,000 ciudadanos serán designados para cumplir esta importante función cívica",
    fecha: "10 de Noviembre, 2025",
    categoria: "Cronograma",
    imagen: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop",
    destacada: false
  },
  {
    id: 3,
    titulo: "JNE aprueba nuevas medidas de seguridad para jornada electoral",
    subtitulo: "Protocolos actualizados garantizarán transparencia y orden durante todo el proceso",
    fecha: "8 de Noviembre, 2025",
    categoria: "Normativa",
    imagen: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    destacada: false
  },
  {
    id: 4,
    titulo: "Padrón electoral supera los 25 millones de electores habilitados",
    subtitulo: "RENIEC confirma cifra récord de ciudadanos aptos para ejercer su derecho al voto en 2026",
    fecha: "5 de Noviembre, 2025",
    categoria: "Padrón",
    imagen: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&h=400&fit=crop",
    destacada: false
  },
  {
    id: 5,
    titulo: "Partidos inscritos presentan oficialmente sus planes de gobierno",
    subtitulo: "JNE publica documentos completos en plataforma digital para consulta ciudadana",
    fecha: "3 de Noviembre, 2025",
    categoria: "Candidatos",
    imagen: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    destacada: true
  },
  {
    id: 6,
    titulo: "Capacitaciones virtuales para miembros de mesa iniciarán en marzo",
    subtitulo: "ONPE habilitará talleres online y presenciales en todo el país",
    fecha: "1 de Noviembre, 2025",
    categoria: "Capacitación",
    imagen: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    destacada: false
  },
  {
    id: 7,
    titulo: "Implementarán voto asistido para personas con discapacidad",
    subtitulo: "Nueva tecnología facilitará el ejercicio del sufragio de manera autónoma e inclusiva",
    fecha: "28 de Octubre, 2025",
    categoria: "Inclusión",
    imagen: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    destacada: false
  }
];

const faqData: FAQ[] = [
  {
    id: 1,
    pregunta: "¿Qué es un miembro de mesa?",
    respuesta: "Es un ciudadano elegido por sorteo para encargarse de la instalación de la mesa, el control del proceso de votación y el conteo de los votos. Hay tres cargos: presidente, secretario y tercer miembro.",
    icono: "👤"
  },
  {
    id: 2,
    pregunta: "¿Qué documentos debo llevar para votar?",
    respuesta: "Debes llevar tu DNI (azul o electrónico). No es necesario llevar algún otro documento adicional.",
    icono: "🪪"
  },
  {
    id: 3,
    pregunta: "¿Qué pasa si no voto?",
    respuesta: "Si no votas, deberás pagar una multa según tu distrito. También aplica multa si no acudes como miembro de mesa seleccionado.",
    icono: "⚠️"
  },
  {
    id: 4,
    pregunta: "¿Dónde puedo saber mi local de votación?",
    respuesta: "Puedes consultarlo ingresando al enlace oficial de la ONPE. También se actualizará automáticamente dentro de la plataforma.",
    icono: "📍"
  },
  {
    id: 5,
    pregunta: "¿A qué hora abren las mesas de votación?",
    respuesta: "Las mesas funcionan de 8:00 AM a 4:00 PM. Se recomienda asistir temprano para evitar filas.",
    icono: "🕐"
  }
];

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

  // Estados para modales
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<Partido | null>(null);
  const [infoElectorSeleccionada, setInfoElectorSeleccionada] = useState<InfoElector | null>(null);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<NoticiaElectoral | null>(null);

  // Estados para acordeones
  const [eventoAbierto, setEventoAbierto] = useState<number | null>(null);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  // Ref para el slider
  const sliderRef = useRef<HTMLDivElement>(null);

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

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Funciones para controlar el slider
  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 350;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Función para redirigir a donde-votar
  const handleDondeVotar = () => {
    window.location.href = '/donde-votar';
  };

  return (
    <div className="w-full">
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Elecciones Presidenciales del Perú 2026
          </h1>
          <p className="text-xl md:text-2xl mb-12 drop-shadow-md">
            12 de Abril, 2026 - 08:00 AM
          </p>

          {/* Contador regresivo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="text-5xl md:text-7xl font-bold mb-2">
                {String(timeRemaining.days).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                Días
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="text-5xl md:text-7xl font-bold mb-2">
                {String(timeRemaining.hours).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                Horas
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="text-5xl md:text-7xl font-bold mb-2">
                {String(timeRemaining.minutes).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                Minutos
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="text-5xl md:text-7xl font-bold mb-2">
                {String(timeRemaining.seconds).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                Segundos
              </div>
            </div>
          </div>

          {/* Botón que redirige a /donde-votar */}
          <button 
            onClick={handleDondeVotar}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg md:text-xl px-12 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-red-500/50 active:scale-95"
          >
            Conoce dónde votar
          </button>
        </div>
      </section>

      {/* ==================== 2. PARTIDOS POLÍTICOS DESTACADOS (SLIDER) ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Partidos Políticos 
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Conoce las planchas presidenciales y sus planes de gobierno
          </p>

          {/* Slider Container */}
          <div className="relative">
            {/* Botón Izquierdo */}
            <button
              onClick={() => scrollSlider('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {partidos.map((partido) => (
                <div
                  key={partido.id}
                  className="flex-none w-72 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  {/* Logo del partido */}
                  <div className="h-40 bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-6">
                    <img
                      src={partido.logo}
                      alt={partido.nombre}
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />
                  </div>

                  {/* Información */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center line-clamp-2 h-14">
                      {partido.nombre}
                    </h3>

                    <button
                      onClick={() => setPartidoSeleccionado(partido)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Ver plancha
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Derecho */}
            <button
              onClick={() => scrollSlider('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 3. CALENDARIO ELECTORAL (LÍNEA DE TIEMPO) ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Cronograma Electoral 2026
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Línea de tiempo del proceso electoral presidencial
          </p>

          {/* Timeline Container */}
          <div className="relative">
            {/* Línea vertical central (visible en desktop) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-red-400"></div>

            {/* Eventos en la línea de tiempo */}
            <div className="space-y-12 md:space-y-24">
              {eventosElectorales.map((evento, index) => {
                // Colores alternados para cada evento
                const colors = [
                  { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-600', lightBg: 'bg-blue-50' },
                  { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-600', lightBg: 'bg-purple-50' },
                  { bg: 'bg-pink-500', border: 'border-pink-500', text: 'text-pink-600', lightBg: 'bg-pink-50' },
                  { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-600', lightBg: 'bg-red-50' },
                  { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-600', lightBg: 'bg-orange-50' }
                ];
                const color = colors[index % colors.length];
                const isLeft = index % 2 === 0;

                return (
                  <div key={evento.id} className="relative">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center">
                      {isLeft ? (
                        <>
                          {/* Tarjeta a la izquierda */}
                          <div className="w-1/2 pr-12 text-right">
                            <div 
                              className={`inline-block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 ${color.border} cursor-pointer hover:scale-105`}
                              onClick={() => setEventoAbierto(eventoAbierto === evento.id ? null : evento.id)}
                            >
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {evento.titulo}
                              </h3>
                              <p className={`text-sm font-semibold mb-3 ${color.text}`}>
                                📅 {evento.fecha}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {evento.descripcion}
                              </p>
                              {eventoAbierto === evento.id && (
                                <ul className="mt-4 space-y-2 text-left">
                                  {evento.detalles.map((detalle, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                      <span className={`${color.text} mr-2 mt-1`}>▪</span>
                                      <span>{detalle}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                          {/* Círculo numerado central */}
                          <div className={`w-16 h-16 ${color.bg} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10 ring-4 ring-white`}>
                            {evento.id}
                          </div>

                          {/* Espacio derecho vacío */}
                          <div className="w-1/2 pl-12"></div>
                        </>
                      ) : (
                        <>
                          {/* Espacio izquierdo vacío */}
                          <div className="w-1/2 pr-12"></div>

                          {/* Círculo numerado central */}
                          <div className={`w-16 h-16 ${color.bg} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10 ring-4 ring-white`}>
                            {evento.id}
                          </div>

                          {/* Tarjeta a la derecha */}
                          <div className="w-1/2 pl-12 text-left">
                            <div 
                              className={`inline-block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 ${color.border} cursor-pointer hover:scale-105`}
                              onClick={() => setEventoAbierto(eventoAbierto === evento.id ? null : evento.id)}
                            >
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {evento.titulo}
                              </h3>
                              <p className={`text-sm font-semibold mb-3 ${color.text}`}>
                                📅 {evento.fecha}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {evento.descripcion}
                              </p>
                              {eventoAbierto === evento.id && (
                                <ul className="mt-4 space-y-2">
                                  {evento.detalles.map((detalle, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                      <span className={`${color.text} mr-2 mt-1`}>▪</span>
                                      <span>{detalle}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden flex items-start gap-4">
                      {/* Círculo numerado */}
                      <div className={`flex-shrink-0 w-12 h-12 ${color.bg} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {evento.id}
                      </div>

                      {/* Tarjeta */}
                      <div 
                        className={`flex-1 bg-white rounded-xl shadow-lg p-4 border-2 ${color.border}`}
                        onClick={() => setEventoAbierto(eventoAbierto === evento.id ? null : evento.id)}
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {evento.titulo}
                        </h3>
                        <p className={`text-xs font-semibold mb-2 ${color.text}`}>
                          📅 {evento.fecha}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {evento.descripcion}
                        </p>
                        {eventoAbierto === evento.id && (
                          <ul className="mt-3 space-y-2">
                            {evento.detalles.map((detalle, idx) => (
                              <li key={idx} className="flex items-start text-xs text-gray-700">
                                <span className={`${color.text} mr-2 mt-1`}>▪</span>
                                <span>{detalle}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Línea conectora vertical (mobile) */}
                    {index < eventosElectorales.length - 1 && (
                      <div className="md:hidden ml-6 w-0.5 h-12 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nota informativa */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-600">
            <p className="text-gray-700 text-center">
              <span className="font-bold text-gray-900">📌 Importante:</span> Mantente informado sobre cualquier cambio en las fechas del proceso electoral visitando las páginas oficiales de ONPE y JNE.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 4. INFORMACIÓN PARA ELECTORES (CARDS → MODAL) ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Información para Electores
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Todo lo que necesitas saber para ejercer tu derecho al voto
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoElectores.map((info) => (
              <div
                key={info.id}
                onClick={() => setInfoElectorSeleccionada(info)}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100"
              >
                <div className="text-5xl mb-4 text-center">{info.icono}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {info.titulo}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  {info.descripcion}
                </p>
                <div className="mt-4 text-center">
                  <span className="text-blue-600 text-sm font-semibold hover:underline">
                    Ver más →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. NOTICIAS ELECTORALES 2026 (GRID MODERNO) ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Noticias Electorales 2026
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Mantente informado sobre las últimas actualizaciones del proceso electoral
          </p>

          {/* Grid de Noticias - Diseño Masonry/Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
            {/* Noticia destacada 1 - Grande (Izquierda) */}
            {noticiasElectorales[0] && (
              <div
                onClick={() => setNoticiaSeleccionada(noticiasElectorales[0])}
                className="md:col-span-6 lg:col-span-7 row-span-2 group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={noticiasElectorales[0].imagen}
                    alt={noticiasElectorales[0].titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {noticiasElectorales[0].categoria}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm mb-2 opacity-90">📅 {noticiasElectorales[0].fecha}</p>
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                      {noticiasElectorales[0].titulo}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-2">
                      {noticiasElectorales[0].subtitulo}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Noticias secundarias (Derecha superior) */}
            <div className="md:col-span-6 lg:col-span-5 grid grid-cols-1 gap-6">
              {noticiasElectorales.slice(1, 3).map((noticia) => (
                <div
                  key={noticia.id}
                  onClick={() => setNoticiaSeleccionada(noticia)}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex h-full">
                    <div className="w-2/5 relative overflow-hidden">
                      <img
                        src={noticia.imagen}
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                          {noticia.categoria}
                        </span>
                      </div>
                    </div>
                    <div className="w-3/5 p-4 flex flex-col justify-center">
                      <p className="text-xs text-gray-500 mb-2">📅 {noticia.fecha}</p>
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {noticia.titulo}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {noticia.subtitulo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Noticia destacada 2 - Grande (Centro) */}
            {noticiasElectorales[4] && (
              <div
                onClick={() => setNoticiaSeleccionada(noticiasElectorales[4])}
                className="md:col-span-6 lg:col-span-7 row-span-2 group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={noticiasElectorales[4].imagen}
                    alt={noticiasElectorales[4].titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {noticiasElectorales[4].categoria}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm mb-2 opacity-90">📅 {noticiasElectorales[4].fecha}</p>
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                      {noticiasElectorales[4].titulo}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-2">
                      {noticiasElectorales[4].subtitulo}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Noticias terciarias (Derecha inferior) */}
            <div className="md:col-span-6 lg:col-span-5 grid grid-cols-1 gap-6">
              {noticiasElectorales.slice(5, 7).map((noticia) => (
                <div
                  key={noticia.id}
                  onClick={() => setNoticiaSeleccionada(noticia)}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex h-full">
                    <div className="w-2/5 relative overflow-hidden">
                      <img
                        src={noticia.imagen}
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                          {noticia.categoria}
                        </span>
                      </div>
                    </div>
                    <div className="w-3/5 p-4 flex flex-col justify-center">
                      <p className="text-xs text-gray-500 mb-2">📅 {noticia.fecha}</p>
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {noticia.titulo}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {noticia.subtitulo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón para ver todas las noticias */}
          <div className="mt-12 text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Ver todas las noticias →
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 6. PREGUNTAS FRECUENTES (FAQ) ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-600">
              Resuelve tus dudas sobre las Elecciones 2026
            </p>
          </div>

          {/* FAQ Cards Grid */}
          <div className="grid gap-6 md:gap-8">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => setFaqAbierta(faqAbierta === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-start gap-6 text-left hover:bg-gray-50 transition-colors"
                >
                  {/* Ícono a la izquierda */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                    {faq.icono}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {faq.pregunta}
                    </h3>
                    {faqAbierta !== faq.id && (
                      <p className="text-gray-600 text-sm">
                        Haz clic para ver la respuesta
                      </p>
                    )}
                  </div>

                  {/* Flecha indicadora */}
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                        faqAbierta === faq.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Respuesta expandible */}
                {faqAbierta === faq.id && (
                  <div className="px-6 pb-6 pl-[7rem]">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-blue-600">
                      <p className="text-gray-800 leading-relaxed">
                        {faq.respuesta}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                ¿Tienes más preguntas?
              </h3>
              <p className="text-white/90 mb-5">
                Visita nuestras secciones especializadas o contacta con soporte electoral
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.location.href = '/donde-votar'}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition-colors shadow-md"
                >
                  Consultar local de votación
                </button>
                <button
                  onClick={() => window.location.href = '/candidatos'}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-lg transition-colors backdrop-blur-sm"
                >
                  Ver candidatos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MODALES ==================== */}
      
      {/* Modal: Plancha del Partido */}
      {partidoSeleccionado && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setPartidoSeleccionado(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-red-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={partidoSeleccionado.logo}
                    alt={partidoSeleccionado.nombre}
                    className="w-16 h-16 rounded-lg bg-white p-2"
                  />
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {partidoSeleccionado.nombre}
                  </h2>
                </div>
                <button
                  onClick={() => setPartidoSeleccionado(null)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Presidente */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Presidente</h3>
                <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-xl">
                  <img
                    src={partidoSeleccionado.presidente.foto}
                    alt={partidoSeleccionado.presidente.nombre}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {partidoSeleccionado.presidente.nombre}
                    </h4>
                    <p className="text-gray-700">
                      {partidoSeleccionado.presidente.hojaVida}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vicepresidentes */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vicepresidentes</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {partidoSeleccionado.vicepresidentes.map((vice, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                      <img
                        src={vice.foto}
                        alt={vice.nombre}
                        className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          {idx === 0 ? 'Primer' : 'Segundo'} Vicepresidente
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {vice.nombre}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan de Gobierno */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Plan de Gobierno</h3>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                  <p className="text-gray-800 leading-relaxed">
                    {partidoSeleccionado.planGobierno}
                  </p>
                </div>
              </div>

              {/* Botón Ver más */}
              <button
                onClick={() => {
                  window.location.href = '/candidatos';
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver más información completa →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Información para Electores */}
      {infoElectorSeleccionada && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setInfoElectorSeleccionada(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{infoElectorSeleccionada.icono}</div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {infoElectorSeleccionada.titulo}
                  </h2>
                </div>
                <button
                  onClick={() => setInfoElectorSeleccionada(null)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-lg text-gray-700 mb-6">
                {infoElectorSeleccionada.descripcion}
              </p>
              <div className="space-y-3">
                {infoElectorSeleccionada.contenido.map((item, idx) => (
                  <div
                    key={idx}
                    className={`${
                      item.startsWith('•') || item.match(/^\d+\./)
                        ? 'pl-4 text-gray-700'
                        : item === ''
                        ? 'h-2'
                        : 'font-bold text-gray-900 mt-4'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Noticia Electoral Completa */}
      {noticiaSeleccionada && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setNoticiaSeleccionada(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen destacada */}
            <div className="relative h-96 overflow-hidden rounded-t-2xl">
              <img
                src={noticiaSeleccionada.imagen}
                alt={noticiaSeleccionada.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setNoticiaSeleccionada(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full uppercase shadow-lg">
                  {noticiaSeleccionada.categoria}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-8">
              <p className="text-sm text-gray-500 mb-3">📅 {noticiaSeleccionada.fecha}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {noticiaSeleccionada.titulo}
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {noticiaSeleccionada.subtitulo}
              </p>

              {/* Contenido expandido de la noticia */}
              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-600 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Detalles de la noticia</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Esta es una noticia importante relacionada con el proceso electoral peruano 2026. 
                    Los ciudadanos deben estar atentos a las actualizaciones oficiales publicadas por 
                    los organismos electorales competentes como la ONPE, el JNE y el RENIEC.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Para más información detallada, se recomienda visitar los portales oficiales 
                    o acercarse a las oficinas descentralizadas en todo el país. El proceso electoral 
                    requiere la participación informada y comprometida de todos los peruanos.
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl mb-6">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">💡</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Importante</h4>
                      <p className="text-gray-700 text-sm">
                        Mantente informado a través de los canales oficiales y verifica siempre 
                        la autenticidad de la información relacionada con el proceso electoral.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md">
                  Compartir noticia
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Leer más tarde
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
