// Language utilities for internationalization
export type Language = 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it';

export interface Translation {
  [key: string]: string | Translation;
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      blog: 'Blog',
      contact: 'Contact',
      language: 'Language',
    },
    hero: {
      title: 'Building products that bring people together',
      subtitle:
        'Product Manager passionate about community-driven development and responsible AI',
      cta: 'View My Work',
      blogCta: 'Read My Blog',
    },
    blog: {
      title: 'Blog',
      subtitle:
        'Thoughts on product management, community building, and the intersection of technology and human connection',
      subscribeEmail: 'Subscribe via Email',
      subscribeRss: 'Subscribe to RSS',
      readMore: 'Read More',
      backToBlog: 'Back to Blog',
      allPosts: 'All Posts',
    },
  },
  es: {
    nav: {
      about: 'Acerca de',
      experience: 'Experiencia',
      blog: 'Blog',
      contact: 'Contacto',
      language: 'Idioma',
    },
    hero: {
      title: 'Construyendo productos que unen a las personas',
      subtitle:
        'Product Manager apasionado por el desarrollo impulsado por la comunidad y la IA responsable',
      cta: 'Ver Mi Trabajo',
      blogCta: 'Leer Mi Blog',
    },
    blog: {
      title: 'Blog',
      subtitle:
        'Reflexiones sobre gestión de productos, construcción de comunidades, y la intersección entre tecnología y conexión humana',
      subscribeEmail: 'Suscribirse por Email',
      subscribeRss: 'Suscribirse al RSS',
      readMore: 'Leer Más',
      backToBlog: 'Volver al Blog',
      allPosts: 'Todas las Publicaciones',
    },
  },
  fr: {
    nav: {
      about: 'À propos',
      experience: 'Expérience',
      blog: 'Blog',
      contact: 'Contact',
      language: 'Langue',
    },
    hero: {
      title: 'Construire des produits qui rassemblent les gens',
      subtitle:
        "Product Manager passionné par le développement communautaire et l'IA responsable",
      cta: 'Voir Mon Travail',
      blogCta: 'Lire Mon Blog',
    },
    blog: {
      title: 'Blog',
      subtitle:
        "Réflexions sur la gestion de produits, la construction de communautés, et l'intersection entre technologie et connexion humaine",
      subscribeEmail: "S'abonner par Email",
      subscribeRss: "S'abonner au RSS",
      readMore: 'Lire Plus',
      backToBlog: 'Retour au Blog',
      allPosts: 'Tous les Articles',
    },
  },
  pt: {
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      blog: 'Blog',
      contact: 'Contato',
      language: 'Idioma',
    },
    hero: {
      title: 'Construindo produtos que unem pessoas',
      subtitle:
        'Product Manager apaixonado por desenvolvimento orientado pela comunidade e IA responsável',
      cta: 'Ver Meu Trabalho',
      blogCta: 'Ler Meu Blog',
    },
    blog: {
      title: 'Blog',
      subtitle:
        'Reflexões sobre gestão de produtos, construção de comunidades, e a interseção entre tecnologia e conexão humana',
      subscribeEmail: 'Inscrever-se por Email',
      subscribeRss: 'Inscrever-se no RSS',
      readMore: 'Ler Mais',
      backToBlog: 'Voltar ao Blog',
      allPosts: 'Todas as Publicações',
    },
  },
  de: {
    nav: {
      about: 'Über',
      experience: 'Erfahrung',
      blog: 'Blog',
      contact: 'Kontakt',
      language: 'Sprache',
    },
    hero: {
      title: 'Produkte entwickeln, die Menschen zusammenbringen',
      subtitle:
        'Product Manager mit Leidenschaft für gemeinschaftsgetriebene Entwicklung und verantwortliche KI',
      cta: 'Meine Arbeit Ansehen',
      blogCta: 'Meinen Blog Lesen',
    },
    blog: {
      title: 'Blog',
      subtitle:
        'Gedanken zu Produktmanagement, Community-Building und der Schnittstelle zwischen Technologie und menschlicher Verbindung',
      subscribeEmail: 'Per E-Mail Abonnieren',
      subscribeRss: 'RSS Abonnieren',
      readMore: 'Mehr Lesen',
      backToBlog: 'Zurück zum Blog',
      allPosts: 'Alle Beiträge',
    },
  },
  it: {
    nav: {
      about: 'Chi Sono',
      experience: 'Esperienza',
      blog: 'Blog',
      contact: 'Contatto',
      language: 'Lingua',
    },
    hero: {
      title: 'Costruire prodotti che uniscono le persone',
      subtitle:
        'Product Manager appassionato di sviluppo guidato dalla comunità e IA responsabile',
      cta: 'Vedi il Mio Lavoro',
      blogCta: 'Leggi il Mio Blog',
    },
    blog: {
      title: 'Blog',
      subtitle:
        "Riflessioni sulla gestione dei prodotti, la costruzione di comunità, e l'intersezione tra tecnologia e connessione umana",
      subscribeEmail: 'Iscriviti via Email',
      subscribeRss: 'Iscriviti al RSS',
      readMore: 'Leggi di Più',
      backToBlog: 'Torna al Blog',
      allPosts: 'Tutti gli Articoli',
    },
  },
};

// Get current language from URL or localStorage
export function getCurrentLanguage(): Language {
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang') as Language;
  if (urlLang && translations[urlLang]) {
    return urlLang;
  }

  // Check localStorage
  const storedLang = localStorage.getItem('preferred-language') as Language;
  if (storedLang && translations[storedLang]) {
    return storedLang;
  }

  // Check browser language
  const browserLang = navigator.language.split('-')[0] as Language;
  if (browserLang && translations[browserLang]) {
    return browserLang;
  }

  // Default to English
  return 'en';
}

// Set language preference
export function setLanguage(lang: Language): void {
  localStorage.setItem('preferred-language', lang);

  // Update URL parameter
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
}

// Get translation for a key
export function t(key: string, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const keys = key.split('.');
  let value: unknown = translations[currentLang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Fallback to English if key not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = (value as Record<string, unknown>)[fallbackKey];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }

  return typeof value === 'string' ? value : key;
}

// Language configuration
export const languageConfig = {
  defaultLanguage: 'en' as Language,
  supportedLanguages: ['en', 'es', 'fr', 'pt', 'de', 'it'] as Language[],
  languageNames: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    pt: 'Português',
    de: 'Deutsch',
    it: 'Italiano',
  },
};
