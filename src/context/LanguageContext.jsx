import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const getStoredLanguage = () => {
    if (typeof window === "undefined") {
      return "en";
    }
    const stored = window.localStorage.getItem("plasynex-language");
    return stored && translations[stored] ? stored : "en";
  };

  const [language, setLanguage] = useState(getStoredLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("plasynex-language", language);
    }
  }, [language]);

  const safeSetLanguage = (value) => {
    setLanguage(translations[value] ? value : "en");
  };

  const value = useMemo(() => {
    const content = translations[language] ?? translations.en;
    return {
      language,
      setLanguage: safeSetLanguage,
      content,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
};

