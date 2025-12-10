import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shield, Lock, Zap } from 'lucide-react';
import CyberPlanetBackground from './CyberPlanetBackground';

function CyberPlanetIntro({ onComplete }) {
  const [dialogIndex, setDialogIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Диалог при высадке
  const introDialog = [
    {
      speaker: 'Система',
      text: '⚠️ ВНИМАНИЕ! Обнаружена попытка несанкционированного доступа к системе...',
      color: '#ff0055',
      isSystem: true
    },
    {
      speaker: 'Система',
      text: '🔒 Активирую защитные протоколы. Идентификация агента...',
      color: '#00d9ff',
      isSystem: true
    },
    {
      speaker: 'Кибериа',
      text: 'Доступ разрешён. Приветствую тебя, агент. Я - Кибериа, искусственный интеллект и главный защитник этой цифровой реальности.',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      emotion: 'neutral'
    },
    {
      speaker: 'Кибериа',
      text: 'Эта планета находится под постоянной угрозой. Хакеры, вирусы, фишинговые атаки... Цифровой мир полон опасностей.',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      emotion: 'serious'
    },
    {
      speaker: 'Агент',
      text: '*оглядывается на неоновый город* Здесь всё так... странно. Это действительно опасно?',
      color: '#FFF',
      isAgent: true
    },
    {
      speaker: 'Кибериа',
      text: 'Опасно? *голографический интерфейс показывает статистику* Каждые 39 секунд происходит кибератака. Каждый день крадутся миллионы паролей.',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      emotion: 'alert'
    },
    {
      speaker: 'Кибериа',
      text: 'Но ты здесь не случайно, агент. Твоя миссия - освоить основы КИБЕРБЕЗОПАСНОСТИ. Научиться защищать себя в цифровом мире.',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      emotion: 'determined'
    },
    {
      speaker: 'Агент',
      text: 'Я готов учиться! С чего начнём?',
      color: '#FFF',
      isAgent: true
    },
    {
      speaker: 'Кибериа',
      text: 'Видишь эти башни? *указывает на цифровые небоскрёбы* Каждая - это отдельная тема безопасности. Пароли, фишинг, вирусы, приватность...',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      emotion: 'teaching'
    },
    {
      speaker: 'Кибериа',
      text: 'С каждой завершённой миссией город станет безопаснее. Защитные системы активируются. Хакеры отступят.',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      emotion: 'encouraging'
    },
    {
      speaker: 'Кибериа',
      text: 'Но помни, агент: в кибербезопасности нет мелочей. Один слабый пароль может обрушить всю защиту. Готов к первой миссии?',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      emotion: 'serious'
    },
    {
      speaker: 'Агент',
      text: 'Да! Защитим цифровой мир!',
      color: '#FFF',
      isAgent: true
    }
  ];

  const currentDialog = introDialog[dialogIndex];

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 1500);
    return () => clearTimeout(timer);
  }, [dialogIndex]);

  // Глитч эффект при системных сообщениях
  useEffect(() => {
    if (currentDialog.isSystem) {
      const glitchInterval = setInterval(() => {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100);
      }, 500);
      return () => clearInterval(glitchInterval);
    }
  }, [currentDialog.isSystem]);

  const handleNext = () => {
    if (dialogIndex < introDialog.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      overflow: 'hidden'
    }}>
      {/* Фон планеты */}
      <CyberPlanetBackground missionProgress={0} />

      {/* Дополнительное затемнение */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
        zIndex: 1
      }} />

      {/* Голографические сканирующие линии */}
      <motion.div
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
          boxShadow: '0 0 20px #00ff41',
          zIndex: 2
        }}
      />

      {/* Кибериа - большое изображение */}
      <AnimatePresence mode="wait">
        {currentDialog.avatar && (
          <motion.div
            key={dialogIndex}
            initial={{ opacity: 0, scale: 0.9, x: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: '5%',
              bottom: '20%',
              width: '450px',
              height: '550px',
              zIndex: 3,
              filter: `drop-shadow(0 0 40px ${currentDialog.color}80)`
            }}
          >
            {/* Голографическая рамка */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: '-10px',
                border: `2px solid ${currentDialog.color}`,
                borderRadius: '10px',
                boxShadow: `0 0 20px ${currentDialog.color}, inset 0 0 20px ${currentDialog.color}40`
              }}
            />

            <img
              src={currentDialog.avatar}
              alt="Кибериа"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: glitchEffect ? 'hue-rotate(180deg)' : 'brightness(1.1) contrast(1.2)',
                borderRadius: '10px',
                transition: 'filter 0.1s'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />

            {/* Сканирующая линия по портрету */}
            <motion.div
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${currentDialog.color}, transparent)`,
                boxShadow: `0 0 15px ${currentDialog.color}`,
                opacity: 0.6
              }}
            />

            {/* Голографические угловые элементы */}
            {[
              { top: 0, left: 0, rotate: 0 },
              { top: 0, right: 0, rotate: 90 },
              { bottom: 0, left: 0, rotate: -90 },
              { bottom: 0, right: 0, rotate: 180 }
            ].map((pos, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                style={{
                  position: 'absolute',
                  ...pos,
                  width: '30px',
                  height: '30px',
                  border: `3px solid ${currentDialog.color}`,
                  borderRight: 'none',
                  borderBottom: 'none',
                  transform: `rotate(${pos.rotate}deg)`,
                  boxShadow: `0 0 10px ${currentDialog.color}`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Диалоговое окно */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          background: currentDialog.isSystem 
            ? 'linear-gradient(to top, rgba(10, 14, 39, 0.98) 0%, rgba(26, 31, 58, 0.95) 100%)'
            : 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(10, 14, 39, 0.9) 100%)',
          backdropFilter: 'blur(30px)',
          borderTop: `4px solid ${currentDialog.color}`,
          boxShadow: `0 -10px 100px ${currentDialog.color}40, inset 0 4px 30px ${currentDialog.color}20`,
          transition: 'all 0.3s'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '2rem',
          paddingLeft: currentDialog.avatar ? '520px' : '2rem',
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 6
        }}>
          
          {/* Имя говорящего */}
          <motion.div
            key={`speaker-${dialogIndex}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'inline-block',
              marginBottom: '1rem'
            }}
          >
            <div style={{
              background: currentDialog.isSystem 
                ? `linear-gradient(135deg, ${currentDialog.color}30, ${currentDialog.color}10)`
                : `linear-gradient(135deg, ${currentDialog.color}40, ${currentDialog.color}20)`,
              border: `3px solid ${currentDialog.color}`,
              borderRadius: '1rem',
              padding: '0.75rem 2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: `0 0 30px ${currentDialog.color}50, inset 0 0 20px ${currentDialog.color}20`
            }}>
              {currentDialog.isSystem && <Shield size={20} style={{ color: currentDialog.color }} />}
              {currentDialog.speaker === 'Кибериа' && <Zap size={20} style={{ color: currentDialog.color }} />}
              
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: currentDialog.color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textShadow: `0 0 20px ${currentDialog.color}80, 0 2px 10px rgba(0,0,0,0.8)`,
                fontFamily: 'monospace'
              }}>
                {currentDialog.speaker}
              </span>
            </div>
          </motion.div>

          {/* Текст диалога */}
          <motion.div
            key={`text-${dialogIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              fontSize: '1.75rem',
              color: '#FFF',
              lineHeight: 1.9,
              fontWeight: 500,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              marginBottom: '2rem',
              position: 'relative',
              paddingLeft: '1.5rem',
              borderLeft: `4px solid ${currentDialog.color}50`,
              zIndex: 7,
              fontFamily: currentDialog.isSystem ? 'monospace' : 'inherit',
              filter: glitchEffect ? 'blur(2px)' : 'none',
              transition: 'filter 0.1s'
            }}
          >
            {currentDialog.text}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: currentDialog.color, marginLeft: '5px' }}
              >
                ▊
              </motion.span>
            )}
          </motion.div>

          {/* Кнопки управления */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1.5rem',
              borderTop: `2px solid ${currentDialog.color}20`
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkip}
              style={{
                background: 'rgba(255, 0, 85, 0.2)',
                border: '2px solid rgba(255, 0, 85, 0.5)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1.5rem',
                color: '#ff0055',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s',
                fontFamily: 'monospace'
              }}
            >
              ⏭️ ПРОПУСТИТЬ ВВОД
            </motion.button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              {/* Прогресс */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {introDialog.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: i <= dialogIndex ? 1 : 0.7 }}
                    style={{
                      width: i === dialogIndex ? '32px' : '10px',
                      height: '10px',
                      borderRadius: '5px',
                      background: i <= dialogIndex 
                        ? `linear-gradient(90deg, #00ff41, #00d9ff)` 
                        : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: i <= dialogIndex ? '0 0 10px #00ff41' : 'none',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>

              <span style={{
                fontSize: '1rem',
                color: currentDialog.color,
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                fontFamily: 'monospace'
              }}>
                {dialogIndex + 1} / {introDialog.length}
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                style={{
                  background: dialogIndex === introDialog.length - 1
                    ? 'linear-gradient(135deg, #00ff41, #00d9ff)' 
                    : `linear-gradient(135deg, ${currentDialog.color}, ${currentDialog.color}cc)`,
                  border: 'none',
                  borderRadius: '1rem',
                  padding: '1rem 2.5rem',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: dialogIndex === introDialog.length - 1 ? '#000' : '#FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: `0 8px 30px ${currentDialog.color}40`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'monospace'
                }}
              >
                {dialogIndex === introDialog.length - 1 ? (
                  <>
                    НАЧАТЬ ЗАЩИТУ
                    <Lock size={24} />
                  </>
                ) : (
                  <>
                    ДАЛЕЕ
                    <ChevronRight size={24} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Декоративные голографические линии в диалоге */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${currentDialog.color}, transparent)`,
          boxShadow: `0 0 10px ${currentDialog.color}`
        }} />
      </motion.div>

      {/* Плавающие предупреждения безопасности */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '250px',
          right: '3rem',
          zIndex: 11,
          color: '#00ff41',
          fontSize: '0.875rem',
          fontWeight: 700,
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(0, 255, 65, 0.1)',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(0, 255, 65, 0.3)'
        }}
      >
        <Shield size={16} />
        SECURE CONNECTION
      </motion.div>
    </div>
  );
}

export default CyberPlanetIntro;