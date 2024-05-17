import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import translationEN from "locales/en.json";
import translationPT from "locales/pt.json";

// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      pt: {
        translation: translationPT,
      },
    },
    lng: "en", // default language
    fallbackLng: "en", // fallback language
    interpolation: {
      escapeValue: true, // not needed for React
    },
  });

export default i18n;
