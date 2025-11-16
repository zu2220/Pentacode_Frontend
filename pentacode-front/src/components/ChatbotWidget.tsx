import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cargar el script de Chatbase
    const loadChatbaseScript = () => {
      // Evitar cargar el script múltiples veces
      if (document.getElementById('oguqWrXBcmtKguk6uy7vP')) {
        setIsLoaded(true);
        return;
      }

      // Inicializar Chatbase
      if (!window.chatbase || window.chatbase('getState') !== 'initialized') {
        window.chatbase = (...args: any[]) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };

        window.chatbase = new Proxy(window.chatbase, {
          get(target: any, prop: string) {
            if (prop === 'q') {
              return target.q;
            }
            return (...args: any[]) => target(prop, ...args);
          },
        });
      }

      // Crear y cargar el script
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = 'oguqWrXBcmtKguk6uy7vP';
      script.setAttribute('domain', 'www.chatbase.co');
      script.defer = true;
      
      script.onload = () => {
        setIsLoaded(true);
        console.log('Chatbase cargado correctamente');
      };

      script.onerror = () => {
        console.error('Error al cargar Chatbase');
      };

      document.body.appendChild(script);
    };

    if (document.readyState === 'complete') {
      loadChatbaseScript();
    } else {
      window.addEventListener('load', loadChatbaseScript);
      return () => window.removeEventListener('load', loadChatbaseScript);
    }
  }, []);

  const toggleChatbot = () => {
    if (!isLoaded) {
      console.warn('Chatbase aún no está cargado');
      return;
    }

    try {
      if (isOpen) {
        // Cerrar el chatbot
        window.chatbase('close');
      } else {
        // Abrir el chatbot
        window.chatbase('open');
      }
      setIsOpen(!isOpen);
    } catch (error) {
      console.error('Error al interactuar con Chatbase:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleChatbot}
        disabled={!isLoaded}
        className={`
          w-16 h-16 rounded-full shadow-2xl 
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          transform hover:scale-110 active:scale-95
          ${isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-600 hover:bg-blue-700'
          }
          ${!isLoaded ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
          focus:outline-none focus:ring-4 focus:ring-blue-300
        `}
        aria-label={isOpen ? 'Cerrar chat de soporte' : 'Abrir chat de soporte'}
        title={isOpen ? 'Cerrar chat' : 'Abrir chat de soporte'}
      >
        {isOpen ? (
          <X size={28} className="text-white" strokeWidth={2.5} />
        ) : (
          <MessageCircle size={28} className="text-white" strokeWidth={2.5} />
        )}
      </button>

      {/* Indicador de carga */}
      {!isLoaded && (
        <div className="absolute -top-2 -right-2 w-4 h-4">
          <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse"></div>
        </div>
      )}

      {/* Badge de notificación (opcional) */}
      {isLoaded && !isOpen && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      )}
    </div>
  );
}

// Extender el tipo Window para TypeScript
declare global {
  interface Window {
    chatbase: any;
  }
}
