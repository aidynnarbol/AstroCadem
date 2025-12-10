// src/components/DialogSystem.jsx
// СИСТЕМА ДИАЛОГОВ ДЛЯ МИССИЙ

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

function DialogSystem({ character, messages, onComplete }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  const currentMessage = messages[currentMessageIndex];

  // Эффект печатной машинки
  useEffect(() => {
    if (!currentMessage) return;

    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < currentMessage.text.length) {
        setDisplayedText(currentMessage.text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30); // Скорость печати

    return () => clearInterval(interval);
  }, [currentMessageIndex, currentMessage]);

  const handleNext = () => {
    if (isTyping) {
      // Если еще печатается - показать полностью
      setDisplayedText(currentMessage.text);
      setIsTyping(false);
    } else if (currentMessageIndex < messages.length - 1) {
      // Следующее сообщение
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      // Завершить диалог
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!currentMessage) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8))',
      backdropFilter: 'blur(20px)',
      padding: '2rem',
      zIndex: 1000,
      borderTop: '2px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
        
        {/* Character Avatar */}
        <motion.div
          initial={{ scale: 0, x: -50 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          style={{
            minWidth: '150px',
            width: '150px',
            height: '150px',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: `3px solid ${character.color}`,
            boxShadow: `0 0 30px ${character.color}80`,
            backgroundImage: `url(${character.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          {/* Если нет изображения - показать иконку */}
          {!character.avatar && (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${character.color}40, ${character.color}20)`,
              fontSize: '4rem'
            }}>
              {character.icon}
            </div>
          )}
        </motion.div>

        {/* Dialog Box */}
        <div style={{ flex: 1 }}>
          {/* Character Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: '1.125rem',
              fontWeight: 800,
              color: character.color,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            {character.name}
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(31, 41, 55, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              minHeight: '120px',
              position: 'relative'
            }}
          >
            <div style={{
              fontSize: '1.125rem',
              color: 'white',
              lineHeight: 1.8,
              whiteSpace: 'pre-line'
            }}>
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: character.color }}
                >
                  ▊
                </motion.span>
              )}
            </div>

            {/* Progress Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '1rem',
              fontSize: '0.75rem',
              color: '#9ca3af'
            }}>
              {currentMessageIndex + 1} / {messages.length}
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            style={{
              background: `linear-gradient(135deg, ${character.color}, ${character.color}cc)`,
              color: 'white',
              padding: '1rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9375rem',
              boxShadow: `0 10px 30px ${character.color}60`
            }}
          >
            {isTyping ? 'Пропустить' : currentMessageIndex < messages.length - 1 ? 'Далее' : 'Продолжить'}
            <ChevronRight size={18} />
          </motion.button>

          {currentMessageIndex < messages.length - 1 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkip}
              style={{
                background: 'rgba(55, 65, 81, 0.8)',
                color: '#9ca3af',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.8125rem'
              }}
            >
              Пропустить диалог
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DialogSystem;