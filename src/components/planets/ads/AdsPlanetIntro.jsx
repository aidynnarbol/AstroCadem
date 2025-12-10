// src/components/planets/ads/AdsPlanetIntro.jsx
// УЛУЧШЕННАЯ ВСТУПИТЕЛЬНАЯ СЦЕНА - Кинематографичная посадка

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, AlertTriangle, Shield } from 'lucide-react';
import AdsPlanetBackground from './AdsPlanetBackground';

function AdsPlanetIntro({ onComplete }) {
  const [dialogIndex, setDialogIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [landingPhase, setLandingPhase] = useState('approach'); // approach, descent, landed

  useEffect(() => {
    // Фазы посадки
    const timer1 = setTimeout(() => setLandingPhase('descent'), 2000);
    const timer2 = setTimeout(() => setLandingPhase('landed'), 4000);
    const timer3 = setTimeout(() => setShowLanding(false), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const introDialog = [
    {
      speaker: 'Система корабля',
      text: '⚠️ ВНИМАНИЕ! Обнаружена планета с повышенной цифровой активностью. Уровень мошенничества: КРИТИЧЕСКИЙ.',
      color: '#EF4444',
      emotion: 'warning'
    },
    {
      speaker: 'Навигатор Прайс',
      text: 'Йо! Добро пожаловать на самую опасную планету в галактике! Здесь правят ИЛЛЮЗИИ и ОБМАН! 🎭',
      color: '#EC4899',
      avatar: '/uploads/navigator-price.jpg',
      emotion: 'excited'
    },
    {
      speaker: 'Навигатор Прайс',
      text: '*смотрит на неоновый город* Видишь эти голограммы? Здесь КАЖДАЯ реклама - потенциальная ЛОВУШКА!',
      color: '#EC4899',
      avatar: '/uploads/navigator-price.jpg',
      emotion: 'serious'
    },
    {
      speaker: 'Навигатор Прайс',
      text: 'Этот город называется "Город Иллюзий". Здесь мошенники создали империю фейковых предложений и обмана!',
      color: '#EC4899',
      avatar: '/uploads/navigator-price.jpg',
      emotion: 'mysterious'
    },
    {
      speaker: 'Навигатор Прайс',
      text: 'НО! Я научу тебя видеть сквозь их трюки! После моих уроков ты станешь МАСТЕРОМ распознавания обмана! 🛡️',
      color: '#EC4899',
      avatar: '/uploads/navigator-price.jpg',
      emotion: 'confident'
    },
    {
      speaker: 'Навигатор Прайс',
      text: 'Каждая миссия приблизит нас к центру города, где находится ГЛАВНЫЙ МОШЕННИК. Но чтобы победить его...',
      color: '#EC4899',
      avatar: '/uploads/navigator-price.jpg',
      emotion: 'determined'
    },
    {
      speaker: 'Навигатор Прайс',
      text: '...ты должен узнать ВСЕ их секреты! Готов начать обучение? Первый урок ждёт! 🎯',
      color: '#EC4899',
      avatar: '/uploads/navigator-price.jpg',
      emotion: 'ready'
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
      <AdsPlanetBackground missionProgress={0} />

      {/* УЛУЧШЕННАЯ АНИМАЦИЯ ПОСАДКИ */}
      <AnimatePresence>
        {showLanding && (
          <>
            {/* Корабль */}
            <motion.div
              initial={{ y: '-100vh', x: '50%', scale: 0.3, rotate: -45 }}
              animate={{
                y: landingPhase === 'approach' ? '-20vh' : landingPhase === 'descent' ? '40vh' : '60vh',
                x: landingPhase === 'approach' ? '60%' : '50%',
                scale: landingPhase === 'approach' ? 0.5 : landingPhase === 'descent' ? 0.8 : 1,
                rotate: landingPhase === 'approach' ? -20 : landingPhase === 'descent' ? -5 : 0
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                left: '-100px',
                fontSize: '8rem',
                filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.8))',
                zIndex: 50
              }}
            >
              🚀
            </motion.div>

            {/* Турбо-след */}
            {landingPhase !== 'landed' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: landingPhase === 'approach' ? '-10vh' : '50vh',
                  width: '4px',
                  height: landingPhase === 'approach' ? '100px' : '200px',
                  background: 'linear-gradient(to bottom, rgba(236, 72, 153, 0.8), transparent)',
                  boxShadow: '0 0 20px rgba(236, 72, 153, 0.8)',
                  transform: 'translateX(-50%)',
                  zIndex: 45
                }}
              />
            )}

            {/* Ударная волна при посадке */}
            {landingPhase === 'landed' && (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 1 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '70vh',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: '3px solid #EC4899',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 40
                  }}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '70vh',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: '3px solid #00FFFF',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 40
                  }}
                />
              </>
            )}

            {/* Текст фазы посадки */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 60
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  textShadow: [
                    '0 0 20px #EC4899',
                    '0 0 40px #00FFFF',
                    '0 0 20px #EC4899'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#FFF',
                  marginBottom: '1rem',
                  fontFamily: 'monospace'
                }}
              >
                {landingPhase === 'approach' && '⚠️ ПРИБЛИЖЕНИЕ К ПЛАНЕТЕ'}
                {landingPhase === 'descent' && '⬇️ НАЧАЛО СНИЖЕНИЯ'}
                {landingPhase === 'landed' && '✅ ПОСАДКА ЗАВЕРШЕНА'}
              </motion.div>

              {landingPhase === 'approach' && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    fontSize: '1.25rem',
                    color: '#EF4444',
                    fontWeight: 700
                  }}
                >
                  ПРЕДУПРЕЖДЕНИЕ: ВЫСОКИЙ УРОВЕНЬ ЦИФРОВОЙ ОПАСНОСТИ
                </motion.div>
              )}
            </motion.div>

            {/* Сканирующая рамка */}
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.98, 1, 0.98]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: '10%',
                border: '2px solid #EC4899',
                borderRadius: '2rem',
                boxShadow: '0 0 30px rgba(236, 72, 153, 0.5), inset 0 0 30px rgba(236, 72, 153, 0.2)',
                zIndex: 35,
                pointerEvents: 'none'
              }}
            >
              {/* Углы сканера */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                <div
                  key={corner}
                  style={{
                    position: 'absolute',position: 'absolute',
                    [corner.includes('top') ? 'top' : 'bottom']: '-2px',
                    [corner.includes('left') ? 'left' : 'right']: '-2px',
                    width: '50px',
                    height: '50px',
                    borderTop: corner.includes('top') ? '4px solid #00FFFF' : 'none',
                    borderBottom: corner.includes('bottom') ? '4px solid #00FFFF' : 'none',
                    borderLeft: corner.includes('left') ? '4px solid #00FFFF' : 'none',
                    borderRight: corner.includes('right') ? '4px solid #00FFFF' : 'none',
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)'
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Затемнение */}
      {!showLanding && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
          zIndex: 1
        }} />
      )}

      {/* Навигатор Прайс - голограмма */}
      {!showLanding && (
        <AnimatePresence mode="wait">
          {currentDialog.avatar && (
            <motion.div
              key={dialogIndex}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{
                position: 'absolute',
                left: '8%',
                bottom: '25%',
                width: '450px',
                height: '550px',
                zIndex: 2
              }}
            >
              {/* Голограмма эффект */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(20px)'
                }}
              />

              {/* Сканирующие линии */}
              <motion.div
                animate={{ y: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(236, 72, 153, 0.5) 50%, transparent 100%)',
                  height: '30%',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              />

              <div style={{
                width: '100%',
                height: '100%',
                border: '3px solid #EC4899',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(236, 72, 153, 0.6), inset 0 0 30px rgba(236, 72, 153, 0.2)',
                position: 'relative'
              }}>
                <img
                  src={currentDialog.avatar}
                  alt="Навигатор Прайс"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'contrast(1.2) brightness(1.1)',
                    mixBlendMode: 'screen'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Глитч эффект */}
                <motion.div
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(236, 72, 153, 0.3)',
                    mixBlendMode: 'color-dodge'
                  }}
                />
              </div>

              {/* Голограмма рамка */}
              <div style={{
                position: 'absolute',
                inset: '-10px',
                border: '2px solid rgba(236, 72, 153, 0.3)',
                borderRadius: '2rem',
                pointerEvents: 'none'
              }}>
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    style={{
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      background: '#EC4899',
                      borderRadius: '50%',
                      boxShadow: '0 0 15px #EC4899',
                      [i === 0 || i === 1 ? 'top' : 'bottom']: '-5px',
                      [i === 0 || i === 2 ? 'left' : 'right']: '-5px'
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* УЛУЧШЕННОЕ ДИАЛОГОВОЕ ОКНО */}
      {!showLanding && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            background: 'linear-gradient(to top, rgba(10, 0, 21, 0.98) 0%, rgba(10, 0, 21, 0.9) 100%)',
            backdropFilter: 'blur(30px)',
            borderTop: '4px solid #EC4899',
            boxShadow: '0 -10px 100px rgba(236, 72, 153, 0.5)'
          }}
        >
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2.5rem',
            paddingLeft: currentDialog.avatar ? '520px' : '2.5rem'
          }}>
            
            {/* Имя говорящего с неоновым эффектом */}
            <motion.div
              key={`speaker-${dialogIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                background: `linear-gradient(135deg, ${currentDialog.color}40, ${currentDialog.color}20)`,
                border: `3px solid ${currentDialog.color}`,
                borderRadius: '1.5rem',
                padding: '1rem 2rem',
                boxShadow: `0 0 40px ${currentDialog.color}80, inset 0 0 30px ${currentDialog.color}20`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Сканирующая линия */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${currentDialog.color}60, transparent)`,
                    pointerEvents: 'none'
                  }}
                />

                {currentDialog.speaker === 'Навигатор Прайс' && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{ fontSize: '2rem' }}
                  >
                    🎭
                  </motion.span>
                )}
                {currentDialog.speaker === 'Система корабля' && (
                  <AlertTriangle size={28} color={currentDialog.color} />
                )}

                <span style={{
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: currentDialog.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textShadow: `0 0 30px ${currentDialog.color}`,
                  zIndex: 1,
                  fontFamily: 'monospace'
                }}>
                  {currentDialog.speaker}
                </span>

                {/* Статус индикатор */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: currentDialog.color,
                    boxShadow: `0 0 15px ${currentDialog.color}`,
                    zIndex: 1
                  }}
                />
              </div>
            </motion.div>

            {/* Текст с киберпанк рамкой */}
            <motion.div
              key={`text-${dialogIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, rgba(26, 0, 48, 0.8), rgba(15, 0, 26, 0.6))',
                backdropFilter: 'blur(15px)',
                border: '3px solid rgba(236, 72, 153, 0.4)',
                borderRadius: '2rem',
                padding: '2.5rem',
                minHeight: '140px',
                position: 'relative',
                boxShadow: '0 10px 50px rgba(0,0,0,0.7), inset 0 0 40px rgba(236, 72, 153, 0.1)'
              }}
            >
              {/* Угловые элементы */}
              {[
                { top: '1rem', left: '1rem', border: 'Top Left' },
                { top: '1rem', right: '1rem', border: 'Top Right' },
                { bottom: '1rem', left: '1rem', border: 'Bottom Left' },
                { bottom: '1rem', right: '1rem', border: 'Bottom Right' }
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      `0 0 10px #EC4899`,
                      `0 0 20px #00FFFF`,
                      `0 0 10px #EC4899`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  style={{
                    position: 'absolute',
                    ...pos,
                    width: '40px',
                    height: '40px',
                    [`border${pos.border.split(' ')[0]}`]: '4px solid #EC4899',
                    [`border${pos.border.split(' ')[1]}`]: '4px solid #EC4899',
                    borderRadius: '8px'
                  }}
                />
              ))}

              {/* Текст диалога */}
              <div style={{
                fontSize: '1.5rem',
                color: '#FFF',
                lineHeight: 2,
                fontWeight: 500,
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                zIndex: 1,
                position: 'relative'
              }}>
                {currentDialog.text}
                {isTyping && (
                  <motion.span
                    animate={{
                      opacity: [0, 1, 0],
                      textShadow: [
                        '0 0 5px #EC4899',
                        '0 0 15px #00FFFF',
                        '0 0 5px #EC4899'
                      ]
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{
                      color: '#EC4899',
                      marginLeft: '0.5rem',
                      fontSize: '2rem',
                      fontWeight: 900
                    }}
                  >
                    ▊
                  </motion.span>
                )}
              </div>

              {/* Плавающие эмодзи */}
              {currentDialog.emotion && (
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                    y: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '30px',
                    fontSize: '3rem',
                    filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.8))',
                    zIndex: 10
                  }}
                >
                  {currentDialog.emotion === 'warning' && '⚠️'}
                  {currentDialog.emotion === 'excited' && '🎭'}
                  {currentDialog.emotion === 'serious' && '🛡️'}
                  {currentDialog.emotion === 'mysterious' && '🌃'}
                  {currentDialog.emotion === 'confident' && '💪'}
                  {currentDialog.emotion === 'determined' && '🎯'}
                  {currentDialog.emotion === 'ready' && '⚡'}
                </motion.div>
              )}

              {/* Данные сканер */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1.5rem',
                display: 'flex',
                gap: '0.5rem',
                opacity: 0.6
              }}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: ['10px', `${Math.random() * 30 + 10}px`, '10px'],
                      backgroundColor: [
                        '#EC4899',
                        '#00FFFF',
                        '#EC4899'
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{
                      width: '4px',
                      background: '#EC4899',
                      borderRadius: '2px'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Кнопки управления */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex',
                gap: '1.5rem',
                marginTop: '2rem',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {/* Прогресс диалога */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center'
              }}>
                {introDialog.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      width: index === dialogIndex ? '50px' : '12px',
                      backgroundColor: index <= dialogIndex ? '#EC4899' : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: index === dialogIndex ? '0 0 15px #EC4899' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      height: '6px',
                      borderRadius: '3px',
                      background: index <= dialogIndex ? '#EC4899' : 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                ))}
                <span style={{
                  color: '#EC4899',
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  marginLeft: '0.5rem'
                }}>
                  {dialogIndex + 1}/{introDialog.length}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                {dialogIndex < introDialog.length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSkip}
                    style={{
                      background: 'rgba(239, 68, 68, 0.3)',
                      border: '3px solid rgba(239, 68, 68, 0.6)',
                      color: '#EF4444',
                      padding: '1rem 2rem',
                      borderRadius: '1rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontSize: '1.125rem',
                      transition: 'all 0.3s',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <AlertTriangle size={20} />
                    Пропустить
                  </motion.button>
                )}

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  style={{
                    background: dialogIndex === introDialog.length - 1
                      ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                      : 'linear-gradient(135deg, #EC4899, #DB2777)',
                    border: 'none',
                    color: '#FFF',
                    padding: '1rem 3rem',
                    borderRadius: '1rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 10px 40px rgba(236, 72, 153, 0.5)',
                    transition: 'all 0.3s',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em'
                  }}
                >
                  {dialogIndex === introDialog.length - 1 ? (
                    <>
                      <Shield size={24} />
                      Начать обучение!
                      <Shield size={24} />
                    </>
                  ) : (
                    <>
                      Далее
                      <ChevronRight size={24} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Дигитальные частицы */}
      {!showLanding && [...Array(12)].map((_, i) => (
        <motion.div
          key={`dialog-particle-${i}`}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: Math.random() > 0.5 ? '#EC4899' : '#00FFFF',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80}%`,
            zIndex: 1,
            boxShadow: `0 0 10px ${Math.random() > 0.5 ? '#EC4899' : '#00FFFF'}`
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
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

export default AdsPlanetIntro;