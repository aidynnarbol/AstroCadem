// src/components/planets/FinancePlanetIntro.jsx
// ВСТУПИТЕЛЬНАЯ СЦЕНА ПЛАНЕТЫ ФИНАНСОВ - встреча с Капитаном Монети

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import FinancePlanetBackground from './FinancePlanetBackground';

function FinancePlanetIntro({ onComplete }) {
  const [dialogIndex, setDialogIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Диалог при высадке
  const introDialog = [
    {
      speaker: 'Система',
      text: '🚀 Посадка завершена. Открываю люк...',
      color: '#60a5fa'
    },
    {
      speaker: 'Капитан Монети',
      text: 'Йо-хо-хо! Смотрите-ка, кто к нам пожаловал на Планету Золотых Песков!',
      color: '#FFD700',
      avatar: '/uploads/Искандер_Зулькарнайн.jpg', // Путь к загруженному изображению
      emotion: 'excited'
    },
    {
      speaker: 'Капитан Монети',
      text: 'Добро пожаловать, юный путешественник! Я - Капитан Монети, величайший торговец и авантюрист этих земель! 🏴‍☠️💰',
      color: '#FFD700',
      avatar: '/uploads/Искандер_Зулькарнайн.jpg',
      emotion: 'proud'
    },
    {
      speaker: 'Капитан Монети',
      text: '*оглядывается на далёкий город* Видишь тот город на горизонте? Это Золотой Базар - крупнейший торговый центр галактики!',
      color: '#FFD700',
      avatar: '/uploads/Искандер_Зулькарнайн.jpg',
      emotion: 'mysterious'
    },
    {
      speaker: 'Капитан Монети',
      text: 'Твоему кораблю нужны припасы, верно? Вода, еда, топливо... Всё это стоит ДЕНЕГ, молодой агент!',
      color: '#FFD700',
      avatar: '/uploads/Искандер_Зулькарнайн.jpg',
      emotion: 'serious'
    },
    {
      speaker: 'Капитан Монети',
      text: 'Но не волнуйся! Я научу тебя всему, что знаю о деньгах, торговле и богатстве! А путь до города неблизкий...',
      color: '#FFD700',
      avatar: '/uploads/Искандер_Зулькарнайн.jpg',
      emotion: 'friendly'
    },
    {
      speaker: 'Капитан Монети',
      text: 'Каждая миссия будет приближать нас к Золотому Базару! С каждым шагом ты будешь становиться мудрее в финансовых делах! 📚💎',
      color: '#FFD700',
      avatar: '/uploads/Искандер_Зулькарнайн.jpg',
      emotion: 'excited'
    },
    {
      speaker: 'Капитан Монети',
      text: 'Готов начать своё путешествие по миру финансов? Тогда вперёд, к первой миссии! ⚓',
      color: '#FFD700',
      avatar: '/uploads/Искандер_Зулькарнайн.jpg',
      emotion: 'determined'
    }
  ];

  const currentDialog = introDialog[dialogIndex];

  const handleNext = () => {
    if (dialogIndex < introDialog.length - 1) {
      setDialogIndex(dialogIndex + 1);
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1500);
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
      <FinancePlanetBackground missionProgress={0} />

      {/* Затемнение */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
        zIndex: 1
      }} />

      {/* Капитан Монети - большое изображение */}
      <AnimatePresence mode="wait">
        {currentDialog.avatar && (
          <motion.div
            key={dialogIndex}
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 50 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: '5%',
              bottom: '20%',
              width: '500px',
              height: '600px',
              zIndex: 2,
              filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))'
            }}
          >
            <img
              src={currentDialog.avatar}
              alt="Капитан Монети"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom'
              }}
            />
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
          zIndex: 3,
          padding: '2rem',
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 100%)',
          backdropFilter: 'blur(20px)',
          borderTop: '3px solid #FFD700'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginLeft: currentDialog.avatar ? '550px' : 'auto' // Сдвигаем текст вправо если есть аватар
        }}>
          
          {/* Имя говорящего */}
          <motion.div
            key={dialogIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              color: currentDialog.color,
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textShadow: `0 0 20px ${currentDialog.color}80`
            }}
          >
            {currentDialog.speaker === 'Капитан Монети' && '💰'}
            {currentDialog.speaker === 'Система' && '🤖'}
            {currentDialog.speaker}
          </motion.div>

          {/* Текст диалога */}
          <motion.div
            key={`text-${dialogIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.4), rgba(205, 133, 63, 0.3))',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '1.5rem',
              padding: '2rem',
              minHeight: '120px',
              position: 'relative',
              boxShadow: '0 10px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(255, 215, 0, 0.1)'
            }}
          >
            {/* Декоративные уголки */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              width: '30px',
              height: '30px',
              borderTop: '3px solid #FFD700',
              borderLeft: '3px solid #FFD700',
              borderRadius: '8px 0 0 0'
            }} />
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '30px',
              height: '30px',
              borderTop: '3px solid #FFD700',
              borderRight: '3px solid #FFD700',
              borderRadius: '0 8px 0 0'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              width: '30px',
              height: '30px',
              borderBottom: '3px solid #FFD700',
              borderLeft: '3px solid #FFD700',
              borderRadius: '0 0 0 8px'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              width: '30px',
              height: '30px',
              borderBottom: '3px solid #FFD700',
              borderRight: '3px solid #FFD700',
              borderRadius: '0 0 8px 0'
            }} />

            <div style={{
              fontSize: '1.25rem',
              color: '#FFF',
              lineHeight: 1.8,
              whiteSpace: 'pre-line'
            }}>
              {currentDialog.text}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: '#FFD700' }}
                >
                  ▊
                </motion.span>
              )}
            </div>

            {/* Монетки как декор */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity
              }}
              style={{
                position: 'absolute',
                top: '-15px',
                right: '20px',
                fontSize: '2rem',
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'
              }}
            >
              💰
            </motion.div>
          </motion.div>

          {/* Кнопки управления */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1.5rem',
            justifyContent: 'flex-end'
          }}>
            {dialogIndex < introDialog.length - 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkip}
                style={{
                  background: 'rgba(107, 70, 193, 0.3)',
                  border: '2px solid rgba(107, 70, 193, 0.5)',
                  color: '#a78bfa',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9375rem',
                  transition: 'all 0.3s'
                }}
              >
                Пропустить всё
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                border: '2px solid #FFD700',
                color: '#000',
                padding: '0.75rem 2rem',
                borderRadius: '1rem',
                fontWeight: 900,
                cursor: 'pointer',
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                transition: 'all 0.3s'
              }}
            >
              {dialogIndex < introDialog.length - 1 ? 'Далее' : 'Начать приключение!'}
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Прогресс диалога */}
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center'
          }}>
            {introDialog.map((_, index) => (
              <div
                key={index}
                style={{
                  width: index === dialogIndex ? '40px' : '10px',
                  height: '4px',
                  background: index <= dialogIndex ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '2px',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Subtle dust particles - NO EMOJIS */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: 'rgba(255, 215, 0, 0.4)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 70}%`,
            zIndex: 1
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            delay: i * 0.6
          }}
        />
      ))}
    </div>
  );
}

export default FinancePlanetIntro;