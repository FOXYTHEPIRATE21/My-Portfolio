import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

function detectLanguage() {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language || 'en';
  return lang.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);
  const t = translations[lang];
  const toggleLang = () => setLang((l) => (l === 'en' ? 'es' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
