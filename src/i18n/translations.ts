export const languages = {
  en: "English",
  es: "Español",
} as const;

export const defaultLang = "en" as const;

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.quote": "Request a Quote",

    "hero.title": "Elite Global Cleaning Services",
    "hero.subtitle":
      "Certified asbestos, lead, and mold removal plus professional cleaning for homes, schools, and businesses.",
    "hero.ctaPrimary": "Request a Quote",
    "hero.ctaSecondary": "Learn More",

    "home.familyTitle": "EGCS is Family Owned & Operated",
    "home.familyBody":
      "We treat every project like it's our own building—prioritizing safety, clear communication, and long-term peace of mind.",

    "about.introTitle": "Why We Started EGCS",
    "about.introBody":
      "We started EGCS because after years in this industry, we knew it could be done better—not just faster or cheaper, but with more honesty, more care, and more accountability.",
    "about.founderTitle": "Founder: Olga Burbano",
    "about.founderBody":
      "Olga spent years working inside this industry before deciding to build something of her own. After seeing cut corners, vague timelines, and clients left in the dark, she knew she could do better—so in 2019, she did.",
    "about.clientsTitle": "Who We Work With",
    "about.clientsBody":
      "We partner with school administrators, property managers, homeowners, and industrial facility owners who need critical work done right the first time.",
    "about.promiseTitle": "What We Promise",
    "about.promiseBody":
      "You don’t get handed off to a faceless crew. You get Olga’s team, her standards, and her direct involvement. You’ll always know what’s happening, why, and what comes next.",
    "about.ctaText": "Request a Quote",

    "contact.title": "Contact Our Team",

    "footer.copyright":
      "© {year} Elite Global Cleaning Services. All rights reserved.",
    "footer.tagline":
      "Licensed, certified, and committed to safer environments.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.about": "Nosotros",
    "nav.quote": "Solicitar Cotización",

    "hero.title": "Elite Global Cleaning Services",
    "hero.subtitle":
      "Servicios certificados de eliminación de asbesto, plomo y moho, además de limpieza profesional para hogares, escuelas y negocios.",
    "hero.ctaPrimary": "Solicitar Cotización",
    "hero.ctaSecondary": "Ver más",

    "home.familyTitle": "EGCS es una empresa familiar",
    "home.familyBody":
      "Tratamos cada proyecto como si fuera nuestro propio edificio, priorizando la seguridad, la comunicación clara y la tranquilidad a largo plazo.",

    "about.introTitle": "Por qué iniciamos EGCS",
    "about.introBody":
      "Comenzamos EGCS porque después de años en esta industria, sabíamos que se podía hacer mejor; no solo más rápido o más barato, sino con más honestidad, más cuidado y más responsabilidad.",
    "about.founderTitle": "Fundadora: Olga Burbano",
    "about.founderBody":
      "Olga trabajó durante años en esta industria antes de decidir crear algo propio. Había visto trabajos con atajos, plazos poco claros y clientes que no sabían qué se había hecho realmente en su edificio. Sabía que podía hacerlo mejor, y en 2019 lo hizo.",
    "about.clientsTitle": "Con quién trabajamos",
    "about.clientsBody":
      "Trabajamos con administradores escolares, administradores de propiedades, propietarios de viviendas y dueños de instalaciones industriales que necesitan que el trabajo crítico se haga bien a la primera.",
    "about.promiseTitle": "Lo que prometemos",
    "about.promiseBody":
      "No será derivado a un equipo que nunca ha visto. Trabajará con el equipo de Olga, con sus estándares y su participación directa. Siempre sabrá qué está pasando, por qué y qué sigue.",
    "about.ctaText": "Solicitar Cotización",

    "contact.title": "Contacta a Nuestro Equipo",

    "footer.copyright":
      "© {year} Elite Global Cleaning Services. Todos los derechos reservados.",
    "footer.tagline":
      "Con licencia, certificados y comprometidos con entornos más seguros.",
  },
} as const;

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang && Object.prototype.hasOwnProperty.call(ui, lang)) {
    return lang as Lang;
  }
  return defaultLang;
}

type UiTree = (typeof ui)[Lang];

function getFromTree(tree: UiTree, key: string): string | undefined {
  const value = (tree as any)[key];
  return typeof value === "string" ? value : undefined;
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const primary = getFromTree(ui[lang], key);
    if (primary !== undefined) return primary;

    const fallback = getFromTree(ui[defaultLang], key);
    if (fallback !== undefined) return fallback;

    // As a last resort, return the key itself to aid debugging.
    return key;
  };
}

