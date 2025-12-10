// src/contexts/LanguageContext.jsx
// Простая система управления языками

import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../locales/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  // Загружаем сохраненный язык при монтировании
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['ru', 'kk', 'en'].includes(savedLang)) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  // Функция смены языка
  const changeLanguage = (lang) => {
    if (['ru', 'kk', 'en'].includes(lang)) {
      setCurrentLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  // Функция получения перевода
  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value[currentLanguage] || value.ru || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    languages: [
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
      { code: 'en', name: 'English', flag: '🇬🇧' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;