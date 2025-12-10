// src/components/LanguageSwitcher.jsx
// Переключатель языков

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div style={{ position: 'relative' }}>
      {/* Кнопка */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0.75rem',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.2s'
        }}
      >
        <Globe size={20} />
        <span style={{ fontSize: '1.25rem' }}>{currentLang?.flag}</span>
      </motion.button>

      {/* Выпадающее меню */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 40
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Меню */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                background: 'rgba(31, 41, 55, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '0.75rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                zIndex: 50,
                minWidth: '180px'
              }}
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: currentLanguage === lang.code ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: currentLanguage === lang.code ? 700 : 500
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {currentLanguage === lang.code && (
                    <motion.div
                      layoutId="activeLanguage"
                      style={{
                        marginLeft: 'auto',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#10b981'
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitcher;