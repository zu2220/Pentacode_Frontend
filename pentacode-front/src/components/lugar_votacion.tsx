import { useState, useEffect } from 'react';
import { Search, MapPin, User, CreditCard, Building2, Hash, Map as MapIcon, CheckCircle, Award, X } from 'lucide-react';

// Datos mock de padrón electoral
const padronMock = [
  {
    dni: '12345678',
    nombre: 'Carlos Mendoza Ruiz',
    miembroMesa: true,
    cargo: 'Presidente',
    local: 'IE 3047 República del Perú',
    direccion: 'Av. Los Próceres 1520, San Juan de Lurigancho',
    mesa: '003547',
    distrito: 'San Juan de Lurigancho',
    coordenadas: { lat: -12.0464, lng: -77.0428 }
  },
  {
    dni: '87654321',
    nombre: 'Lucía Quispe Flores',
    miembroMesa: false,
    local: 'IE Juan Pablo II',
    direccion: 'Jr. Los Jardines 450, Comas',
    mesa: '002341',
    distrito: 'Comas',
    coordenadas: { lat: -11.9389, lng: -77.0536 }
  },
  {
    dni: '11223344',
    nombre: 'Ana Patricia Torres Villegas',
    miembroMesa: true,
    cargo: 'Secretaria',
    local: 'Universidad Nacional Mayor de San Marcos',
    direccion: 'Av. Venezuela s/n, Lima',
    mesa: '001256',
    distrito: 'Lima',
    coordenadas: { lat: -12.0582, lng: -77.0852 }
  },
  {
    dni: '55667788',
    nombre: 'Roberto Silva Paredes',
    miembroMesa: true,
    cargo: 'Tercer Miembro',
    local: 'Colegio San Martín de Porres',
    direccion: 'Jr. Bolívar 789, San Isidro',
    mesa: '004523',
    distrito: 'San Isidro',
    coordenadas: { lat: -12.0931, lng: -77.0465 }
  },
  {
    dni: '99887766',
    nombre: 'María Elena González Pérez',
    miembroMesa: false,
    local: 'I.E. José María Arguedas',
    direccion: 'Av. La Cultura 456, Cercado de Lima',
    mesa: '002187',
    distrito: 'Lima',
    coordenadas: { lat: -12.0464, lng: -77.0428 }
  }
];

export default function LugarVotacion() {
  const [dni, setDni] = useState('');
  const [fechaEmision, setFechaEmision] = useState('');
  const [codigoVerificador, setCodigoVerificador] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Auto-cerrar modal después de 4 segundos
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleConsultar = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResultado(null);

    // Validación DNI
    if (dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos');
      return;
    }

    if (!/^\d+$/.test(dni)) {
      setError('El DNI solo debe contener números');
      return;
    }

    // Validación Fecha de Emisión
    if (!fechaEmision) {
      setError('Debes ingresar la fecha de emisión del DNI');
      return;
    }

    // Validación Código Verificador
    if (!codigoVerificador) {
      setError('Debes ingresar el código verificador');
      return;
    }

    if (codigoVerificador.length !== 1) {
      setError('El código verificador debe tener exactamente 1 dígito');
      return;
    }

    if (!/^[0-9]$/.test(codigoVerificador)) {
      setError('El código verificador solo puede ser un número del 0 al 9');
      return;
    }

    // Simular búsqueda
    setIsSearching(true);
    setTimeout(() => {
      const data = padronMock.find(persona => persona.dni === dni);
      if (data) {
        setResultado(data);
        // Mostrar modal si es miembro de mesa
        if (data.miembroMesa) {
          setShowModal(true);
        }
      } else {
        setError('DNI no encontrado en el padrón. Intenta con: 12345678, 87654321, 11223344, 55667788 o 99887766');
      }
      setIsSearching(false);
    }, 800);
  };

  const handleReset = () => {
    setDni('');
    setFechaEmision('');
    setCodigoVerificador('');
    setResultado(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <MapPin className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Consulta tu Lugar de Votación
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ingresa tu número de DNI para conocer dónde te corresponde votar en las Elecciones 2026
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleConsultar} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Campo DNI */}
            <div className="mb-6">
              <label htmlFor="dni" className="block text-sm font-semibold text-gray-700 mb-3">
                Número de DNI *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CreditCard className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  id="dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  placeholder="Ingresa tu DNI (8 dígitos)"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                  maxLength={8}
                />
              </div>
            </div>

            {/* Grid para Fecha de Emisión y Código Verificador */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Campo Fecha de Emisión */}
              <div>
                <label htmlFor="fechaEmision" className="block text-sm font-semibold text-gray-700 mb-3">
                  Fecha de Emisión *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">📅</span>
                  </div>
                  <input
                    type="date"
                    id="fechaEmision"
                    value={fechaEmision}
                    onChange={(e) => setFechaEmision(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                  />
                </div>
              </div>

              {/* Campo Código Verificador */}
              <div>
                <label htmlFor="codigoVerificador" className="block text-sm font-semibold text-gray-700 mb-3">
                  Código Verificador (1 dígito) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">🔢</span>
                  </div>
                  <input
                    type="text"
                    id="codigoVerificador"
                    value={codigoVerificador}
                    onChange={(e) => setCodigoVerificador(e.target.value.replace(/\D/g, '').slice(0, 1))}
                    placeholder="0-9"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg text-center font-bold"
                    maxLength={1}
                  />
                </div>
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSearching || dni.length !== 8 || !fechaEmision || !codigoVerificador}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Consultar
                  </>
                )}
              </button>
              {(resultado || error) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Nota informativa */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              * Todos los campos son obligatorios. Puedes encontrar la fecha de emisión y el código verificador en la parte posterior de tu DNI.
            </p>
          </form>
        </div>

        {/* Modal de Miembro de Mesa */}
        {showModal && resultado?.miembroMesa && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform animate-fadeIn">
              {/* Header del modal */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-t-2xl relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                  aria-label="Cerrar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-8 text-center">
                {/* Ícono grande */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-6xl">🎖️</span>
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  ¡Felicidades!
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Eres <span className="font-bold text-yellow-600">Miembro de Mesa</span> para las Elecciones 2026
                </p>

                {/* Cargo */}
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Tu cargo designado:</p>
                  <p className="text-2xl font-bold text-yellow-900">{resultado.cargo}</p>
                </div>

                {/* Información adicional */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">📋 Importante:</span> Debes asistir a las capacitaciones obligatorias.
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">📅 Fecha:</span> 12 de Abril, 2026 - Llegar a las 7:00 AM
                  </p>
                </div>

                {/* Botón de cerrar */}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Entendido
                </button>

                {/* Contador automático */}
                <p className="text-xs text-gray-500 mt-4">
                  Este mensaje se cerrará automáticamente
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        {resultado && (
          <div className="max-w-6xl mx-auto animate-fadeIn">
            {/* Alerta de éxito */}
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={24} />
                <div>
                  <p className="font-semibold text-green-900">¡Información encontrada!</p>
                  <p className="text-sm text-green-700">Aquí está tu lugar de votación para las Elecciones 2026</p>
                </div>
              </div>
            </div>

            {/* Grid de información y mapa */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Card de información */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-1">Información del Elector</h2>
                  <p className="text-blue-100">Elecciones Presidenciales 2026</p>
                </div>

                <div className="p-8 space-y-6">
                  {/* Nombre */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Nombre Completo</p>
                      <p className="text-lg font-bold text-gray-900">{resultado.nombre}</p>
                    </div>
                  </div>

                  {/* DNI */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-purple-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-semibold mb-1">DNI</p>
                      <p className="text-lg font-bold text-gray-900">{resultado.dni}</p>
                    </div>
                  </div>

                  {/* Local de votación */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Building2 className="text-green-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Local de Votación</p>
                      <p className="text-lg font-bold text-gray-900">{resultado.local}</p>
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-orange-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Dirección</p>
                      <p className="text-lg font-bold text-gray-900">{resultado.direccion}</p>
                      <p className="text-sm text-gray-600 mt-1">{resultado.distrito}</p>
                    </div>
                  </div>

                  {/* Número de mesa */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Hash className="text-red-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Número de Mesa</p>
                      <p className="text-2xl font-bold text-gray-900">{resultado.mesa}</p>
                    </div>
                  </div>

                  {/* Estado de Miembro de Mesa */}
                  <div className={`flex items-start gap-4 ${resultado.miembroMesa ? 'bg-yellow-50 -mx-8 px-8 py-4 border-l-4 border-yellow-500' : ''}`}>
                    <div className={`flex-shrink-0 w-12 h-12 ${resultado.miembroMesa ? 'bg-yellow-100' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                      <span className="text-2xl">{resultado.miembroMesa ? '🎖️' : '👤'}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Miembro de Mesa</p>
                      {resultado.miembroMesa ? (
                        <>
                          <p className="text-lg font-bold text-yellow-900 mb-1">Sí - Designado/a</p>
                          <p className="text-sm font-semibold text-yellow-800">
                            Cargo: <span className="font-bold">{resultado.cargo}</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-bold text-gray-900">No</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer de la card */}
                <div className="bg-gray-50 p-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600 text-center">
                    📅 <span className="font-semibold">Fecha de votación:</span> 12 de Abril, 2026
                  </p>
                  <p className="text-sm text-gray-600 text-center mt-1">
                    🕐 <span className="font-semibold">Horario:</span> 8:00 AM - 4:00 PM
                  </p>
                </div>
              </div>

              {/* Mapa */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Ubicación en el Mapa</h2>
                    <p className="text-blue-100">Cómo llegar a tu local</p>
                  </div>
                  <MapIcon className="text-white" size={32} />
                </div>

                {/* Mapa integrado */}
                <div className="relative h-96 lg:h-full min-h-[500px]">
                  <iframe
                    title="Mapa del local de votación"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${resultado.coordenadas.lat},${resultado.coordenadas.lng}&zoom=16`}
                  ></iframe>
                </div>

                {/* Footer del mapa */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${resultado.coordenadas.lat},${resultado.coordenadas.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <MapIcon size={20} />
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className={`mt-8 p-6 rounded-lg border-l-4 ${resultado.miembroMesa ? 'bg-yellow-50 border-yellow-600' : 'bg-blue-50 border-blue-600'}`}>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {resultado.miembroMesa ? '🎖️ Información para Miembros de Mesa' : '📌 Recomendaciones importantes'}
              </h3>
              {resultado.miembroMesa ? (
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>Llegar a las 7:00 AM</strong> - Los miembros de mesa deben presentarse una hora antes del inicio de la votación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>Capacitación obligatoria</strong> - Debes asistir a las charlas de capacitación en tu distrito</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>Material electoral</strong> - Recibirás actas, ánfora, útiles y material de votación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>Compensación económica</strong> - Recibirás S/ 120.00 por tu participación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>No asistir es sancionable</strong> - La multa por inasistencia es de S/ 230.00</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span><strong>Certificado de participación</strong> - Al finalizar recibirás tu constancia oficial</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Llega temprano a tu local de votación (se recomienda entre 8:00 AM - 10:00 AM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Lleva tu DNI original en buen estado (no se aceptan copias)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Ubica tu mesa con anticipación usando el número proporcionado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Respeta las normas sanitarias y de seguridad del local</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Ayuda adicional */}
        {!resultado && (
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">¿Necesitas ayuda?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Línea ONPE</h4>
                  <p className="text-gray-600 text-sm">0800-ONPE (6673)</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">WhatsApp</h4>
                  <p className="text-gray-600 text-sm">999 999 999</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Web ONPE</h4>
                  <p className="text-gray-600 text-sm">www.onpe.gob.pe</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}