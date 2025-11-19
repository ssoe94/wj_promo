import { useEffect, useMemo, useRef, useState } from "react";
import { languageOptions } from "../data/translations";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLanguage = useMemo(
    () => languageOptions.find((option) => option.code === language) ?? languageOptions[0],
    [language],
  );

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div className={`lang-dropdown ${open ? "open" : ""}`} ref={dropdownRef}>
      <button
        type="button"
        className="lang-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`flag-icon ${activeLanguage.code}`} aria-hidden="true">
          {activeLanguage.code.toUpperCase()}
        </span>
        <span>{activeLanguage.label}</span>
        <svg className="chevron" viewBox="0 0 12 7" role="presentation">
          <path d="M1 1.5 6 5.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div className="lang-menu" role="listbox">
        {languageOptions.map((option) => (
          <button
            key={option.code}
            type="button"
            className={`lang-menu-item ${language === option.code ? "selected" : ""}`}
            onClick={() => handleSelect(option.code)}
          >
            <span className={`flag-icon ${option.code}`} aria-hidden="true">
              {option.code.toUpperCase()}
            </span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
