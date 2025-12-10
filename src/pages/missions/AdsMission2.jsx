// src/pages/missions/AdsMission2.jsx
// МИССИЯ 2: ДАВЛЕНИЕ ВРЕМЕНИ

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Clock, AlertTriangle, Shield } from 'lucide-react';
import { adsStoryArc } from '../../data/adsStoryArc';
import { useUser } from '../../contexts/UserContext';

function AdsMission2() {
  const { completeMission, addCoins, addXP } = useUser();
  
  const [step, setStep] = useState('intro');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [timer, setTimer] = useState(300); // 5 минут для демонстрации

  const mission = adsStoryArc.missions[1];

  const storyDialogs = [
    {
      speaker: 'Навигатор Прайс',
      text: '*указывает на мигающие таймеры* Видишь эти цифры? 00:05:47... 00:05:46... Это МАНИПУЛЯЦИЯ!',
      color: '#EC4899'
    },
    {
      speaker: 'Навигатор Прайс',
      text: 'Они создают ИЛЛЮЗИЮ срочности! Заставляют тебя паниковать и покупать БЕЗ РАЗДУМИЙ!',
      color: '#EC4899'
    },
    {
      speaker: 'Агент',
      text: 'Но ведь если осталось мало времени, можно упустить выгоду?',
      color: '#FFF'
    },
    {
      speaker: 'Навигатор Прайс',
      text: '*смеётся* Вот именно так они тебя и ловят! Запомни: настоящие предложения НЕ ИСЧЕЗАЮТ за 5 минут!',
      color: '#EC4899'
    },
    {
      speaker: 'Навигатор Прайс',
      text: 'Правило 24 часов: если тебя торопят - остановись и подожди сутки. Если предложение исчезло - значит, это был обман!',
      color: '#EC4899'
    }
  ];

  const quizQuestions = [
    {
      question: 'На сайте горит таймер: "До конца акции осталось 00:04:37". Что делать?',
      options: [
        'Быстро купить, пока не закончилось!',
        'Обновить страницу и проверить таймер',
        'Позвонить друзьям за советом',
        'Паниковать и метаться'
      ],
      correct: 1,
      explanation: '✅ Отлично! Таймеры часто "обнуляются" при обновлении. Это искусственное давление!',
      funFact: '⏰ 95% таймеров на сайтах - фейковые! Они сбрасываются каждый раз заново.'
    },
    {
      question: '"ПОСЛЕДНИЙ ШАНС! ТОЛЬКО СЕГОДНЯ!" - что это значит?',
      options: [
        'Реально последний день акции',
        'Психологический трюк для ускорения покупки',
        'Магазин завтра закроется',
        'Надо срочно покупать'
      ],
      correct: 1,
      explanation: '✅ Правильно! Это классический приём создания искусственной срочности!',
      funFact: '📅 "Последний день" часто повторяется каждый день. Проверь завтра - увидишь то же самое!'
    },
    {
      question: 'Продавец говорит: "Решайте быстрее, другие клиенты заинтересованы!" Твоя реакция?',
      options: [
        'Немедленно согласиться из страха упустить',
        'Сказать "Подумаю" и уйти проверить информацию',
        'Торговаться ещё сильнее',
        'Попросить скидку из-за спешки'
      ],
      correct: 1,
      explanation: '✅ Верно! Это давление через "искусственную конкуренцию". Настоящий товар никуда не денется!',
      funFact: '🎭 "Другие клиенты" часто не существуют. Это трюк для создания паники!'
    },
    {
      question: 'Что такое "Правило 24 часов"?',
      options: [
        'Возврат товара в течение суток',
        'Подождать сутки перед покупкой под давлением',
        'Доставка за один день',
        'Акция длится 24 часа'
      ],
      correct: 1,
      explanation: '✅ Точно! Если тебя торопят - сделай паузу на 24 часа. Это защитит от импульсивных покупок!',
      funFact: '🛡️ 90% импульсивных покупок не совершаются, если подождать сутки!'
    },
    {
      question: 'На экране: "ОСТАЛОСЬ 3 ТОВАРА!" Как проверить правду?',
      options: [
        'Поверить и купить быстро',
        'Обновить страницу несколько раз',
        'Позвонить в магазин',
        'Добавить в корзину и ждать'
      ],
      correct: 1,
      explanation: '✅ Умно! Часто "осталось 3 товара" не меняется даже после покупок. Это фейк!',
      funFact: '📦 Счётчик "осталось товаров" часто захардкожен и показывает одно и то же число!'
    }
  ];

  const handleDialogNext = () => {
    if (dialogIndex < storyDialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      setStep('lesson');
    }
  };

  const handleQuizAnswer = (answerIndex) => {
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correct;
    
    setQuizAnswers({
      ...quizAnswers,
      [currentQuestion]: { answer: answerIndex, correct: isCorrect }
    });

    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleMissionComplete();
      }
    }, 2000);
  };

  const handleMissionComplete = () => {
    const earnedCoins = 200 + (score * 40);
    const earnedXP = 100 + (score * 20);
    
    completeMission('ads-2');
    addCoins(earnedCoins);
    addXP(earnedXP);
    
    setStep('conclusion');
  };

  // Таймер для демонстрации
  useState(() => {
    if (step === 'lesson') {
      const interval = setInterval(() => {
        setTimer(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0a0015 0%, #1a0030 50%, #0f001a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2,
        zIndex: 0
      }} />

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => window.history.back()}
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 100,
          background: 'rgba(26, 0, 48, 0.9)',
          backdropFilter: 'blur(15px)',
          border: '2px solid #EC4899',
          borderRadius: '1rem',
          padding: '0.75rem 1.5rem',
          color: '#EC4899',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'monospace'
        }}
      >
        <ArrowLeft size={20} />
        НАЗАД
      </motion.button>

      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '6rem 2rem 2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div style={{
                background: 'linear-gradient(135deg, rgba(26, 0, 48, 0.95), rgba(15, 0, 26, 0.85))',
                backdropFilter: 'blur(25px)',
                border: '3px solid #EC4899',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                marginBottom: '2rem',
                boxShadow: '0 20px 60px rgba(236, 72, 153, 0.4)'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#00FFFF',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
                  fontFamily: 'monospace'
                }}>
                  <Clock size={32} />
                  {mission.title}
                </h3>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={dialogIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '2rem',
                      borderRadius: '1rem',
                      border: '2px solid rgba(236, 72, 153, 0.3)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: 900,
                      color: storyDialogs[dialogIndex].color,
                      marginBottom: '1rem',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase'
                    }}>
                      {storyDialogs[dialogIndex].speaker}:
                    </div>
                    <p style={{
                      fontSize: '1.25rem',
                      color: '#FFF',
                      lineHeight: 1.8
                    }}>
                      {storyDialogs[dialogIndex].text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {storyDialogs.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: i === dialogIndex ? '40px' : '10px',
                          height: '4px',
                          background: i <= dialogIndex ? '#00FFFF' : 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '2px',
                          transition: 'all 0.3s'
                        }}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDialogNext}
                    style={{
                      background: 'linear-gradient(135deg, #00FFFF, #06B6D4)',
                      border: 'none',
                      borderRadius: '1rem',
                      padding: '1rem 2rem',
                      fontSize: '1.125rem',
                      fontWeight: 900,
                      color: '#000',
                      cursor: 'pointer',
                      fontFamily: 'monospace'
                    }}
                  >
                    {dialogIndex === storyDialogs.length - 1 ? 'НАЧАТЬ УРОК →' : 'ДАЛЕЕ →'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'lesson' && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                background: 'linear-gradient(135deg, rgba(26, 0, 48, 0.95), rgba(15, 0, 26, 0.85))',
                backdropFilter: 'blur(25px)',
                border: '3px solid #00FFFF',
                borderRadius: '1.5rem',
                padding: '2rem',
                boxShadow: '0 20px 60px rgba(0, 255, 255, 0.4)'
              }}
            >
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#00FFFF',
                marginBottom: '2rem',
                textAlign: 'center',
                fontFamily: 'monospace'
              }}>
                ⏰ УРОК: ДАВЛЕНИЕ ВРЕМЕНИ
              </h2>

              {/* Демонстрация фейкового таймера */}
              <div style={{
                background: 'rgba(255, 0, 0, 0.2)',
                border: '3px solid #EF4444',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 10px #EF4444',
                      '0 0 30px #EF4444',
                      '0 0 10px #EF4444'
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    fontSize: '3rem',
                    fontWeight: 900,
                    color: '#EF4444',
                    marginBottom: '1rem',
                    fontFamily: 'monospace'
                  }}
                >
                  {formatTime(timer)}
                </motion.div>
                <p style={{ color: '#FFF', fontSize: '1.25rem', fontWeight: 700 }}>
                  ⚠️ АКЦИЯ ЗАКАНЧИВАЕТСЯ! УСПЕЙ КУПИТЬ!
                </p>
              </div>

              <div style={{ color: '#FFF', fontSize: '1.125rem', lineHeight: 1.8 }}>
                <h3 style={{ color: '#00FFFF', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  🎯 Что такое давление времени?
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  Это <strong style={{color: '#00FFFF'}}>психологический трюк</strong>, когда тебя заставляют 
                  принять решение БЫСТРО, не дав времени подумать.
                </p>

                <h3 style={{ color: '#00FFFF', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  🚩 Признаки искусственной срочности:
                </h3>
                <ul style={{ paddingLeft: '2rem', marginBottom: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>⏰ <strong>Таймеры обратного отсчёта</strong></li>
                  <li style={{ marginBottom: '0.75rem' }}>📅 "Только сегодня!" / "Последний день!"</li>
                  <li style={{ marginBottom: '0.75rem' }}>📦 "Осталось 3 штуки!"</li>
                  <li style={{ marginBottom: '0.75rem' }}>👥 "Другие клиенты смотрят этот товар"</li>
                  <li style={{ marginBottom: '0.75rem' }}>🔥 "Горячее предложение истекает!"</li>
                </ul>

                <div style={{
                  background: 'rgba(34, 197, 94, 0.2)',
                  border: '2px solid #22C55E',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginTop: '2rem'
                }}>
                  <h3 style={{ color: '#22C55E', fontSize: '1.25rem', marginBottom: '1rem' }}>
                    🛡️ ПРАВИЛО 24 ЧАСОВ:
                  </h3>
                  <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
                    Если тебя торопят - <strong style={{color: '#22C55E'}}>ОСТАНОВИСЬ</strong> и подожди сутки.
                    Настоящие предложения не исчезнут. Если исчезло - это был обман!
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('quiz')}
                style={{
                  width: '100%',
                  marginTop: '2rem',
                  background: 'linear-gradient(135deg, #00FFFF, #06B6D4)',
                  border: 'none',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#000',
                  cursor: 'pointer',
                  fontFamily: 'monospace'
                }}
              >
                ПЕРЕЙТИ К ТЕСТУ →
              </motion.button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                background: 'linear-gradient(135deg, rgba(26, 0, 48, 0.95), rgba(15, 0, 26, 0.85))',
                backdropFilter: 'blur(25px)',
                border: '3px solid #EC4899',
                borderRadius: '1.5rem',
                padding: '2rem'
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{ color: '#00FFFF', fontWeight: 700, fontSize: '1.125rem', fontFamily: 'monospace' }}>
                    ВОПРОС {currentQuestion + 1} / {quizQuestions.length}
                  </span>
                  <span style={{ color: '#EC4899', fontWeight: 700, fontSize: '1.125rem', fontFamily: 'monospace' }}>
                    🛡️ СЧЁТ: {score}/{quizQuestions.length}
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #EC4899, #00FFFF)',
                      borderRadius: '1rem'
                    }}
                  />
                </div>
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#FFF',
                marginBottom: '2rem',
                lineHeight: 1.4
              }}>
                {quizQuestions[currentQuestion].question}
              </h3>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  const isAnswered = quizAnswers[currentQuestion] !== undefined;
                  const isThisAnswer = quizAnswers[currentQuestion]?.answer === index;
                  const isCorrect = index === quizQuestions[currentQuestion].correct;
                  const showResult = isAnswered && (isThisAnswer || isCorrect);

                  return (
                    <motion.button
                      key={index}
                      whileHover={!isAnswered ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                      onClick={() => !isAnswered && handleQuizAnswer(index)}
                      disabled={isAnswered}
                      style={{
                        background: showResult
                          ? isCorrect
                            ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                            : isThisAnswer
                            ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                            : 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.05)',
                        border: showResult
                          ? isCorrect
                            ? '3px solid #22C55E'
                            : isThisAnswer
                            ? '3px solid #EF4444'
                            : '2px solid rgba(236, 72, 153, 0.3)'
                          : '2px solid rgba(236, 72, 153, 0.3)',
                        borderRadius: '1rem',
                        padding: '1.25rem',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: '#FFF',
                        cursor: isAnswered ? 'default' : 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'all 0.3s'
                      }}
                    >
                      <span style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontFamily: 'monospace',
                        fontWeight: 900
                      }}>
                        {showResult ? (
                          isCorrect ? <Check size={20} /> : isThisAnswer ? <X size={20} /> : String.fromCharCode(65 + index)
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </span>
                      <span style={{ flex: 1 }}>{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {quizAnswers[currentQuestion] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '1.5rem',
                    padding: '1.5rem',
                    background: quizAnswers[currentQuestion].correct
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                    border: `2px solid ${quizAnswers[currentQuestion].correct ? '#22C55E' : '#EF4444'}`,
                    borderRadius: '1rem'
                  }}
                >
                  <p style={{ color: '#FFF', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {quizQuestions[currentQuestion].explanation}
                  </p>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '1rem',
                    borderRadius: '0.75rem'
                  }}>
                    <p style={{ color: '#00FFFF', fontSize: '1rem', margin: 0, fontWeight: 600 }}>
                      {quizQuestions[currentQuestion].funFact}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'conclusion' && (
            <motion.div
              key="conclusion"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                background: 'linear-gradient(135deg, rgba(26, 0, 48, 0.95), rgba(15, 0, 26, 0.85))',
                backdropFilter: 'blur(25px)',
                border: '3px solid #22C55E',
                borderRadius: '1.5rem',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(34, 197, 94, 0.4)'
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
                style={{ fontSize: '5rem', marginBottom: '1rem' }}
              >
                🛡️
              </motion.div>

              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#22C55E',
                marginBottom: '1rem',
                fontFamily: 'monospace'
              }}>
                МИССИЯ ЗАВЕРШЕНА!
              </h2>

              <p style={{
                fontSize: '1.5rem',
                color: '#FFF',
                marginBottom: '2rem'
              }}>
                Правильных ответов: {score} из {quizQuestions.length}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(236, 72, 153, 0.2)',
                  borderRadius: '1rem',
                  border: '2px solid #EC4899'
                }}>
                  <Shield size={32} color="#EC4899" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontSize: '1.125rem', color: '#EC4899', fontWeight: 700, fontFamily: 'monospace' }}>
                    +{200 + (score * 40)} МОНЕТ
                  </p>
                </div>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(0, 255, 255, 0.2)',
                  borderRadius: '1rem',
                  border: '2px solid #00FFFF'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                  <p style={{ fontSize: '1.125rem', color: '#00FFFF', fontWeight: 700, fontFamily: 'monospace' }}>
                    +{100 + (score * 20)} XP
                  </p>
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '1rem',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#22C55E',
                  fontStyle: 'italic',
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}>
                  "{mission.storyConclusion.captainDialog[0]}"
                </p>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#22C55E',
                  fontStyle: 'italic',
                  fontWeight: 600
                }}>
                  "{mission.storyConclusion.captainDialog[1]}"
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                  border: 'none',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#FFF',
                  cursor: 'pointer',
                  fontFamily: 'monospace'
                }}
              >
                ВЕРНУТЬСЯ НА ПЛАНЕТУ →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AdsMission2;