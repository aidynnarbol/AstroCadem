import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shield, Zap, Award, Trophy, Star } from 'lucide-react';

function CyberMission5() {
  const [step, setStep] = useState('intro');
  const [challenge, setChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const challenges = [
    {
      type: 'password',
      title: '🔐 ЗАЩИТА ПАРОЛЕЙ',
      question: 'Хакер атакует! Какой пароль самый надёжный?',
      options: [
        'qwerty123',
        'Tr0p!c@L_P@rr0t#2024',
        'password',
        '12345678'
      ],
      correct: 1,
      explanation: 'Длинный + разнообразный + уникальный = надёжный!'
    },
    {
      type: 'phishing',
      title: '🎣 ФИШИНГ ДЕТЕКТОР',
      question: 'Email: "Ваш аккаунт заблокирован! Нажмите СРОЧНО!" От: paypaI.com',
      options: [
        'Это настоящее письмо',
        'Это фишинг!',
        'Нужно перейти по ссылке',
        'Можно ввести пароль'
      ],
      correct: 1,
      explanation: 'Срочность + подозрительный домен (I вместо l) = ФИШИНГ!'
    },
    {
      type: 'virus',
      title: '🦠 АНТИВИРУС',
      question: 'Файл "Бесплатная_игра.exe" из неизвестного источника',
      options: [
        'Скачать и запустить',
        'Удалить! Это подозрительно',
        'Проверить на вирусы',
        'Отправить другу'
      ],
      correct: 1,
      explanation: '.exe + неизвестный источник = потенциальный вирус!'
    },
    {
      type: 'privacy',
      title: '🔒 ПРИВАТНОСТЬ',
      question: 'Игра просит: имя, адрес, телефон родителей, номер карты',
      options: [
        'Указать всё',
        'Только ник, минимум данных',
        'Всё кроме карты',
        'Спросить у друзей'
      ],
      correct: 1,
      explanation: 'В играх - только псевдоним! Личные данные не нужны!'
    },
    {
      type: 'combo',
      title: '⚡ КОМБО-АТАКА',
      question: 'Пришло SMS: "Выиграли миллион! Перейдите: bit.ly/win123 и введите данные карты"',
      options: [
        'Перейти по ссылке',
        'МОШЕННИЧЕСТВО! Удалить',
        'Ввести данные',
        'Переслать родителям'
      ],
      correct: 1,
      explanation: 'Фишинг + мошенничество! Никогда не давай данные карты через SMS!'
    },
    {
      type: 'social',
      title: '📱 СОЦИНЖЕНЕРИЯ',
      question: '"Привет! Это техподдержка ВКонтакте. Сообщи код из SMS для проверки"',
      options: [
        'Сказать код',
        'НЕТ! Техподдержка не просит коды',
        'Переспросить',
        'Отправить скриншот'
      ],
      correct: 1,
      explanation: 'Настоящая техподдержка НИКОГДА не просит коды из SMS!'
    },
    {
      type: 'network',
      title: '📡 WI-FI БЕЗОПАСНОСТЬ',
      question: 'В кафе есть открытая сеть "Free_WiFi_No_Password"',
      options: [
        'Подключиться и зайти в банк',
        'Опасно! Не вводить пароли',
        'Всё безопасно',
        'Скачивать файлы'
      ],
      correct: 1,
      explanation: 'Публичный Wi-Fi опасен! Хакеры могут перехватить данные!'
    },
    {
      type: 'update',
      title: '🔄 ОБНОВЛЕНИЯ',
      question: 'Windows предлагает критическое обновление безопасности',
      options: [
        'Отложить на месяц',
        'Установить немедленно!',
        'Игнорировать',
        'Выключить обновления'
      ],
      correct: 1,
      explanation: 'Обновления закрывают уязвимости! Всегда обновляйся!'
    },
    {
      type: 'backup',
      title: '💾 РЕЗЕРВНОЕ КОПИРОВАНИЕ',
      question: 'Все важные файлы только на компьютере, резервной копии нет',
      options: [
        'Всё нормально',
        'ОПАСНО! Сделать бэкап',
        'Компьютер не сломается',
        'Антивирус защитит'
      ],
      correct: 1,
      explanation: 'Вирусы-шифровальщики, поломки - всегда делай резервные копии!'
    },
    {
      type: 'final',
      title: '🏆 МАСТЕР-ВОПРОС',
      question: 'Главное правило кибербезопасности?',
      options: [
        'Иметь сложный пароль',
        'ВСЕГДА быть бдительным!',
        'Установить антивирус',
        'Не ходить в интернет'
      ],
      correct: 1,
      explanation: 'Безопасность - это постоянная бдительность и применение ВСЕХ знаний!'
    }
  ];

  useEffect(() => {
    if (step === 'battle' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && step === 'battle') {
      setStep('defeat');
    }
  }, [step, timeLeft]);

  const handleAnswer = (index) => {
    const isCorrect = index === challenges[challenge].correct;
    setSelectedAnswer({ index, isCorrect });
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (challenge < challenges.length - 1) {
        setChallenge(challenge + 1);
        setSelectedAnswer(null);
      } else {
        setStep('victory');
      }
    }, 2500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated matrix background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [-100, window.innerHeight + 100] }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5
          }}
          style={{
            position: 'fixed',
            left: `${Math.random() * 100}%`,
            fontSize: '14px',
            color: '#00ff41',
            fontFamily: 'monospace',
            opacity: 0.2,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {Array(20).fill(0).map(() => String.fromCharCode(33 + Math.random() * 94)).join('\n')}
        </motion.div>
      ))}

      <motion.button
        onClick={() => window.history.back()}
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 100,
          background: 'rgba(26, 31, 58, 0.9)',
          border: '2px solid #00ff41',
          borderRadius: '1rem',
          padding: '0.75rem 1.5rem',
          color: '#00ff41',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'monospace',
          fontWeight: 700
        }}
      >
        <ArrowLeft size={20} />
        НАЗАД
      </motion.button>

      <div style={{ position: 'relative', zIndex: 10, padding: '7rem 2rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center' }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ fontSize: '8rem', marginBottom: '2rem', filter: 'drop-shadow(0 0 30px #00ff41)' }}
              >
                🛡️
              </motion.div>
              
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 900,
                color: '#00ff41',
                marginBottom: '1.5rem',
                textShadow: '0 0 30px rgba(0, 255, 65, 0.5)',
                fontFamily: 'monospace'
              }}>
                ФИНАЛЬНОЕ ИСПЫТАНИЕ
              </h1>

              <div style={{
                background: 'rgba(255, 0, 85, 0.2)',
                border: '3px solid #ff0055',
                borderRadius: '1.5rem',
                padding: '2rem',
                marginBottom: '2rem',
                maxWidth: '700px',
                margin: '0 auto 2rem'
              }}>
                <div style={{ fontSize: '1.5rem', color: '#ff0055', fontWeight: 700, marginBottom: '1rem' }}>
                  🚨 КРАСНАЯ ТРЕВОГА!
                </div>
                <div style={{ fontSize: '1.25rem', color: '#FFF', lineHeight: 1.8 }}>
                  Хакеры атакуют ЯДРО СИСТЕМЫ! Используют все методы: взлом паролей, фишинг, вирусы, социальную инженерию...
                  <br /><br />
                  Только ТЫ можешь их остановить!
                </div>
              </div>

              <div style={{
                background: 'rgba(26, 31, 58, 0.9)',
                borderRadius: '1.5rem',
                border: '3px solid #00ff41',
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto 2rem',
                textAlign: 'left'
              }}>
                <h3 style={{ color: '#00ff41', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  📋 Условия испытания:
                </h3>
                <div style={{ fontSize: '1.125rem', color: '#FFF', lineHeight: 2 }}>
                  <div>⚡ 10 вопросов разной сложности</div>
                  <div>⏱️ 60 секунд на выполнение</div>
                  <div>🎯 Применяй ВСЕ изученные навыки</div>
                  <div>🏆 Стань Мастером Кибербезопасности!</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setStep('battle'); setTimeLeft(60); }}
                style={{
                  background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                  border: 'none',
                  borderRadius: '1.5rem',
                  padding: '1.5rem 3rem',
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: '#000',
                  cursor: 'pointer',
                  boxShadow: '0 10px 40px rgba(0, 255, 65, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  margin: '0 auto'
                }}
              >
                <Shield size={32} />
                НАЧАТЬ ЗАЩИТУ
                <Zap size={32} />
              </motion.button>
            </motion.div>
          )}

          {step === 'battle' && (
            <motion.div
              key={`battle-${challenge}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  background: 'rgba(0, 255, 65, 0.2)',
                  border: '3px solid #00ff41',
                  borderRadius: '1rem',
                  padding: '1rem 1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#00ff41',
                  fontFamily: 'monospace'
                }}>
                  {challenge + 1} / {challenges.length}
                </div>
                
                <motion.div
                  animate={timeLeft < 10 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{
                    background: timeLeft < 10 ? 'rgba(255, 0, 85, 0.3)' : 'rgba(0, 217, 255, 0.2)',
                    border: `3px solid ${timeLeft < 10 ? '#ff0055' : '#00d9ff'}`,
                    borderRadius: '1rem',
                    padding: '1rem 1.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: timeLeft < 10 ? '#ff0055' : '#00d9ff',
                    fontFamily: 'monospace',
                    minWidth: '100px',
                    textAlign: 'center'
                  }}
                >
                  ⏱️ {timeLeft}s
                </motion.div>
              </div>

              <div style={{
                background: 'rgba(26, 31, 58, 0.9)',
                borderRadius: '1.5rem',
                border: '3px solid #00ff41',
                padding: '2.5rem'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#00d9ff',
                  marginBottom: '1rem',
                  fontFamily: 'monospace'
                }}>
                  {challenges[challenge].title}
                </div>

                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#FFF',
                  marginBottom: '2rem',
                  lineHeight: 1.6
                }}>
                  {challenges[challenge].question}
                </div>

                {!selectedAnswer ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {challenges[challenge].options.map((option, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(i)}
                        style={{
                          background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(55, 65, 81, 0.8))',
                          border: '2px solid rgba(0, 255, 65, 0.3)',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#FFF',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.3s'
                        }}
                      >
                        {String.fromCharCode(65 + i)}. {option}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: selectedAnswer.isCorrect ? 'rgba(0, 255, 65, 0.2)' : 'rgba(255, 0, 85, 0.2)',
                      border: `3px solid ${selectedAnswer.isCorrect ? '#00ff41' : '#ff0055'}`,
                      borderRadius: '1rem',
                      padding: '2rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
                      {selectedAnswer.isCorrect ? '✅' : '❌'}
                    </div>
                    <div style={{ fontSize: '1.5rem', color: '#FFF', lineHeight: 1.8 }}>
                      {challenges[challenge].explanation}
                    </div>
                  </motion.div>
                )}
              </div>

              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                {challenges.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '40px',
                      height: '8px',
                      borderRadius: '4px',
                      background: i < challenge ? '#00ff41' : i === challenge ? '#00d9ff' : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: i <= challenge ? '0 0 10px currentColor' : 'none'
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 'victory' && (
            <motion.div
              key="victory"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center' }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: [1, 0]
                  }}
                  transition={{ duration: 2, delay: i * 0.02 }}
                  style={{
                    position: 'fixed',
                    fontSize: '2rem',
                    pointerEvents: 'none',
                    zIndex: 100
                  }}
                >
                  {['🎉', '⭐', '🏆', '💎', '✨'][i % 5]}
                </motion.div>
              ))}

              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '10rem', marginBottom: '2rem', filter: 'drop-shadow(0 0 50px #fbbf24)' }}
              >
                🏆
              </motion.div>

              <h1 style={{
                fontSize: '4rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
                textShadow: '0 0 30px rgba(251, 191, 36, 0.5)'
              }}>
                ПОБЕДА!
              </h1>

              <div style={{ fontSize: '2rem', color: '#00ff41', fontWeight: 700, marginBottom: '2rem' }}>
                Счёт: {score} / {challenges.length}
              </div>

              {score === challenges.length && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
                  border: '3px solid #fbbf24',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  maxWidth: '700px',
                  margin: '0 auto 2rem'
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24', marginBottom: '1rem' }}>
                    🎓 ИДЕАЛЬНЫЙ РЕЗУЛЬТАТ!
                  </div>
                  <div style={{ fontSize: '1.25rem', color: '#FFF' }}>
                    Ты ответил на все вопросы правильно!<br />
                    Теперь ты настоящий МАСТЕР КИБЕРБЕЗОПАСНОСТИ!
                  </div>
                </div>
              )}

              <div style={{
                background: 'rgba(26, 31, 58, 0.9)',
                borderRadius: '1.5rem',
                border: '3px solid #00ff41',
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto 2rem',
                textAlign: 'left'
              }}>
                <h3 style={{ color: '#00ff41', fontSize: '1.75rem', marginBottom: '1rem', textAlign: 'center' }}>
                  🌟 ТЫ ОСВОИЛ:
                </h3>
                <div style={{ fontSize: '1.125rem', color: '#FFF', lineHeight: 2 }}>
                  <div>✅ Создание надёжных паролей</div>
                  <div>✅ Распознавание фишинга</div>
                  <div>✅ Защиту от вирусов</div>
                  <div>✅ Контроль приватности</div>
                  <div>✅ Безопасное поведение онлайн</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.history.back()}
                style={{
                  background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                  border: 'none',
                  borderRadius: '1.5rem',
                  padding: '1.5rem 3rem',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  margin: '0 auto'
                }}
              >
                <Trophy size={28} />
                ВЕРНУТЬСЯ К ПЛАНЕТЕ
                <Star size={28} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CyberMission5;