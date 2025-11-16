import type { Candidate } from '../types/candidate';

export const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: 'Juan Pérez García',
    party: 'Partido Innovación Cívica',
    number: 1,
    photoUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Presidente',
    biography: 'Economista y político peruano con más de 20 años de experiencia en el sector público y privado. Ha dedicado su carrera a impulsar políticas de inclusión social y desarrollo económico sostenible. Fue Ministro de Economía (2018-2020) donde implementó reformas fiscales que redujeron la pobreza en 3.5%. Reconocido por su transparencia y compromiso con la lucha anticorrupción.',
    experience: [
      {
        role: 'Ministro de Economía y Finanzas',
        organization: 'Gobierno del Perú',
        period: '2018 - 2020'
      },
      {
        role: 'Viceministro de Hacienda',
        organization: 'MEF',
        period: '2015 - 2018'
      },
      {
        role: 'Consultor Económico Senior',
        organization: 'Banco Mundial',
        period: '2010 - 2015'
      }
    ],
    education: [
      {
        degree: 'Doctorado en Economía',
        institution: 'Universidad de Cambridge, Reino Unido',
        year: '2009'
      },
      {
        degree: 'Maestría en Políticas Públicas',
        institution: 'London School of Economics',
        year: '2005'
      },
      {
        degree: 'Economía',
        institution: 'Universidad Nacional Mayor de San Marcos',
        year: '2003'
      }
    ],
    proposals: [
      'Reducir la pobreza extrema a menos del 5% mediante programas sociales focalizados',
      'Crear 500,000 nuevos empleos formales en el primer año de gobierno',
      'Inversión de S/ 10,000 millones en infraestructura educativa y hospitalaria',
      'Implementar el Proyecto Nacional de Digitalización para todas las regiones',
      'Reforma tributaria progresiva que beneficie a micro y pequeñas empresas',
      'Combate frontal a la corrupción con fiscalías especializadas autónomas'
    ],
    socialMedia: {
      twitter: 'https://twitter.com/juanperez',
      facebook: 'https://facebook.com/juanperezoficial',
      instagram: 'https://instagram.com/juanperez',
      linkedin: 'https://linkedin.com/in/juanperezgarcia'
    }
  },
  {
    id: 2,
    name: 'María Quispe Flores',
    party: 'Frente Unido por el Progreso',
    number: 2,
    photoUrl: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Presidente',
    biography: 'Abogada especializada en derechos humanos y justicia social. Lideró importantes reformas en el sistema judicial peruano como presidenta de la Comisión de Justicia del Congreso. Reconocida defensora de los derechos de las comunidades indígenas y promotora de la igualdad de género. Ha trabajado con organizaciones internacionales en proyectos de gobernabilidad democrática.',
    experience: [
      {
        role: 'Presidenta de la Comisión de Justicia',
        organization: 'Congreso de la República',
        period: '2020 - 2024'
      },
      {
        role: 'Congresista de la República',
        organization: 'Congreso del Perú',
        period: '2016 - 2024'
      },
      {
        role: 'Asesora en Derechos Humanos',
        organization: 'ONU Mujeres - Región Andina',
        period: '2012 - 2016'
      }
    ],
    education: [
      {
        degree: 'Maestría en Derechos Humanos',
        institution: 'Universidad de Columbia, Estados Unidos',
        year: '2011'
      },
      {
        degree: 'Derecho',
        institution: 'Pontificia Universidad Católica del Perú',
        year: '2008'
      }
    ],
    proposals: [
      'Reforma integral del sistema de justicia con procesos más rápidos y transparentes',
      'Política nacional de igualdad de género con presupuesto garantizado',
      'Protección efectiva de comunidades indígenas y campesinas',
      'Programa nacional de vivienda social con 200,000 unidades',
      'Fortalecer la descentralización con mayor autonomía regional',
      'Educación pública gratuita y de calidad desde inicial hasta universidad'
    ],
    socialMedia: {
      twitter: 'https://twitter.com/mariaquispef',
      facebook: 'https://facebook.com/mariaquispeficial',
      instagram: 'https://instagram.com/mariaquispef'
    }
  },
  {
    id: 3,
    name: 'Carlos Mendoza Torres',
    party: 'Alianza Democrática Nacional',
    number: 3,
    photoUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Presidente',
    biography: 'Ingeniero civil y empresario con amplia trayectoria en gestión pública. Fue alcalde de Lima (2015-2019) donde modernizó el transporte público e implementó el sistema de reciclaje más grande del país. Especialista en infraestructura y desarrollo urbano sostenible. Promotor de alianzas público-privadas para grandes proyectos nacionales.',
    experience: [
      {
        role: 'Alcalde de Lima Metropolitana',
        organization: 'Municipalidad de Lima',
        period: '2015 - 2019'
      },
      {
        role: 'Ministro de Transportes y Comunicaciones',
        organization: 'Gobierno del Perú',
        period: '2012 - 2014'
      },
      {
        role: 'Gerente General',
        organization: 'Constructora Mendoza SAC',
        period: '2005 - 2012'
      }
    ],
    education: [
      {
        degree: 'MBA en Gestión Estratégica',
        institution: 'ESAN Graduate School of Business',
        year: '2010'
      },
      {
        degree: 'Ingeniería Civil',
        institution: 'Universidad Nacional de Ingeniería',
        year: '2004'
      }
    ],
    proposals: [
      'Construcción de 2,000 km de carreteras y autopistas para conectar todas las regiones',
      'Modernización total del sistema de transporte público en Lima y principales ciudades',
      'Programa masivo de agua y saneamiento para zonas rurales',
      'Incentivos tributarios para empresas que generen empleo formal',
      'Creación de 10 parques industriales tecnológicos en provincias',
      'Inversión privada en energías renovables con meta del 50% para 2030'
    ],
    socialMedia: {
      twitter: 'https://twitter.com/carlosmendozat',
      facebook: 'https://facebook.com/carlosmendozaoficial',
      linkedin: 'https://linkedin.com/in/carlosmendozatorres'
    }
  },
  {
    id: 4,
    name: 'Ana Castillo Vargas',
    party: 'Partido Innovación Cívica',
    number: 4,
    photoUrl: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Congresista',
  },
  {
    id: 5,
    name: 'Luis Rojas Vidal',
    party: 'Frente Unido por el Progreso',
    number: 5,
    photoUrl: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Congresista',
  },
  {
    id: 6,
    name: 'Sofía Díaz Chavez',
    party: 'Alianza Democrática Nacional',
    number: 6,
    photoUrl: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Congresista',
  },
  {
    id: 7,
    name: 'Ricardo Flores Medina',
    party: 'Partido Innovación Cívica',
    number: 7,
    photoUrl: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Congresista',
  },
  {
    id: 8,
    name: 'Patricia López Sánchez',
    party: 'Frente Unido por el Progreso',
    number: 8,
    photoUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Congresista',
  },
  {
    id: 9,
    name: 'Miguel Fernández Castro',
    party: 'Alianza Democrática Nacional',
    number: 9,
    photoUrl: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Congresista',
  },
  {
    id: 10,
    name: 'Elena Torres Ramírez',
    party: 'Partido Innovación Cívica',
    number: 10,
    photoUrl: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    position: 'Congresista',
  },
];
