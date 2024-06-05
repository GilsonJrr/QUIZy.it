import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import translations
import translationEN from "locales/en.json";
import translationPT from "locales/pt.json";

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en", // fallback language
    detection: {
      order: ["navigator"], // Prioriza a detecção através do navegador
    },
    resources: {
      en: {
        translation: translationEN,
      },
      pt: {
        translation: translationPT,
      },
    },
    // lng: "en", // default language
    interpolation: {
      escapeValue: true, // not needed for React
    },
  });

export default i18n;
