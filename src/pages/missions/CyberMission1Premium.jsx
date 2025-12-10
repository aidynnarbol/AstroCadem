import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Shield, ChevronRight, Award, Lock, Eye, EyeOff, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

function CyberMission1Premium() {
  const [step, setStep] = useState('story');
  const [dialogIndex, setDialogIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  
  // Password strength checker states
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState(null);
  const [passwordScene, setPasswordScene] = useState(0);

  const storyDialogs = [
    {
      id: 1,
      speaker: 'Система Безопасности',
      text: '🚨 ВНИМАНИЕ! Обнаружена попытка несанкционированного доступа к базе данных!',
      color: '#ff0055',
      background: 'rgba(255, 0, 85, 0.1)',
      isSystem: true
    },
    {
      id: 2,
      speaker: 'Кибериа',
      text: 'Агент, хакеры пытаются взломать нашу защиту! Видишь эти мигающие коды? Они атакуют слабые пароли!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 3,
      speaker: 'Агент',
      text: '*смотрит на экран с бегущим кодом* Что происходит? Это опасно?',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    },
    {
      id: 4,
      speaker: 'Кибериа',
      text: 'ОЧЕНЬ опасно! Каждую секунду хакеры взламывают тысячи аккаунтов. Знаешь почему? Потому что люди используют СЛАБЫЕ ПАРОЛИ!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 5,
      speaker: 'Агент',
      text: 'Слабые пароли? Типа "123456" или "password"?',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    },
    {
      id: 6,
      speaker: 'Кибериа',
      text: '*выводит статистику на голограмму* Именно! Знаешь какие ТОП-5 самых популярных паролей? "123456", "password", "qwerty", "abc123", "12345678"',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 7,
      speaker: 'Кибериа',
      text: 'Эти пароли взламываются за МИЛЛИСЕКУНДЫ! Компьютер хакера проверяет миллионы комбинаций в секунду!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 8,
      speaker: 'Агент',
      text: 'Миллисекунды?! Но как же защититься?',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    },
    {
      id: 9,
      speaker: 'Кибериа',
      text: 'Вот для этого ты здесь! Сегодня я научу тебя создавать НАДЁЖНЫЕ пароли. Пароли, которые не взломать даже за годы!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 10,
      speaker: 'Кибериа',
      text: 'Запомни главное правило: ХОРОШИЙ ПАРОЛЬ = ДЛИННЫЙ + РАЗНООБРАЗНЫЙ + УНИКАЛЬНЫЙ!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    }
  ];

  const passwordScenes = [
    {
      id: 1,
      title: '🔴 СЛАБЫЙ ПАРОЛЬ',
      description: 'Хакер пытается взломать пароль "123456"',
      password: '123456',
      hackTime: '0.001 секунды',
      status: 'ВЗЛОМАН',
      color: '#ff0055',
      explanation: 'Это один из самых популярных паролей в мире! Компьютер хакера проверяет его в первую очередь.'
    },
    {
      id: 2,
      title: '🟡 СРЕДНИЙ ПАРОЛЬ',
      description: 'Хакер атакует пароль "password123"',
      password: 'password123',
      hackTime: '2 минуты',
      status: 'ВЗЛОМАН',
      color: '#ffa500',
      explanation: 'Хотя есть цифры, это слишком простое слово. Хакеры проверяют все слова из словаря!'
    },
    {
      id: 3,
      title: '🟢 НАДЁЖНЫЙ ПАРОЛЬ',
      description: 'Хакер пытается взломать "Tr0p!c@L_P@rr0t#2024"',
      password: 'Tr0p!c@L_P@rr0t#2024',
      hackTime: '5 МИЛЛИОНОВ ЛЕТ',
      status: 'ЗАЩИЩЁН',
      color: '#00ff41',
      explanation: 'Этот пароль НАДЁЖНЫЙ! Длинный, с буквами разного регистра, цифрами и символами. Взломать практически невозможно!'
    }
  ];

  const quizQuestions = [
    {
      question: 'Какой из этих паролей самый НАДЁЖНЫЙ?',
      options: [
        '123456',
        'password',
        'Tr0p!c@L_Sunset#2024',
        'qwerty'
      ],
      correct: 2,
      explanation: '✅ Правильно! Этот пароль надёжный потому что: ДЛИННЫЙ (больше 12 символов), использует ЗАГЛАВНЫЕ и строчные буквы, содержит ЦИФРЫ и СПЕЦИАЛЬНЫЕ символы (@, !, #)',
      funFact: '💡 Факт: Пароль из 12+ символов с разными типами символов взламывается МИЛЛИОНЫ лет!'
    },
    {
      question: 'Сколько времени нужно, чтобы взломать пароль "123456"?',
      options: [
        'Меньше 1 секунды',
        '1 час',
        '1 день',
        '1 год'
      ],
      correct: 0,
      explanation: '✅ Верно! Компьютер хакера проверяет МИЛЛИАРДЫ комбинаций в секунду. "123456" - один из первых паролей в списке для проверки!',
      funFact: '⚠️ Внимание: "123456" используют более 23 МИЛЛИОНОВ человек в мире!'
    },
    {
      question: 'Что делает пароль НАДЁЖНЫМ?',
      options: [
        'Только длина',
        'Только цифры',
        'Длина + разнообразие символов + уникальность',
        'Имя и дата рождения'
      ],
      correct: 2,
      explanation: '✅ Идеально! Надёжный пароль - это КОМБИНАЦИЯ: минимум 12 символов, заглавные и строчные буквы, цифры, специальные символы, уникальный для каждого сайта!',
      funFact: '🎯 Правило: Чем больше РАЗНООБРАЗИЯ - тем сложнее взломать!'
    },
    {
      question: 'Почему НЕЛЬЗЯ использовать один и тот же пароль везде?',
      options: [
        'Это неудобно',
        'Если один сайт взломают - взломают ВСЕ аккаунты',
        'Это против правил интернета',
        'Компьютер будет тормозить'
      ],
      correct: 1,
      explanation: '✅ Точно! Если хакер украдёт пароль с одного сайта и увидит, что вы используете его везде - получит доступ ко ВСЕМ вашим аккаунтам!',
      funFact: '🔒 Совет: Используй менеджер паролей для хранения уникальных паролей!'
    },
    {
      question: 'Что из этого делает пароль СЛАБЫМ?',
      options: [
        'Длина больше 15 символов',
        'Использование специальных символов',
        'Имя, фамилия или дата рождения',
        'Комбинация букв и цифр'
      ],
      correct: 2,
      explanation: '✅ Правильно! Личная информация (имя, дата рождения, кличка питомца) легко найти в соцсетях. Хакеры в первую очередь пробуют именно эти данные!',
      funFact: '⚠️ Опасно: Хакеры изучают ваши соцсети, чтобы угадать пароль!'
    }
  ];

  const currentDialog = storyDialogs[dialogIndex];

  const handleNextDialog = () => {
    if (dialogIndex < storyDialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      setStep('interactiveLesson');
    }
  };

  const handleSkipStory = () => {
    setStep('interactiveLesson');
  };

  const handlePasswordCheck = (password) => {
    setCurrentPassword(password);
    
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 12) {
      strength += 25;
    } else if (password.length >= 8) {
      strength += 15;
      feedback.push('Увеличь длину до 12+ символов');
    } else {
      feedback.push('Слишком короткий! Нужно минимум 8 символов');
    }
    
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Добавь заглавные И строчные буквы');
    }
    
    if (/\d/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Добавь цифры');
    }
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Добавь специальные символы (!@#$%^&*)');
    }
    
    setPasswordFeedback({
      strength,
      feedback: feedback.length > 0 ? feedback : ['Отличный пароль! 🎉'],
      color: strength >= 100 ? '#00ff41' : strength >= 75 ? '#00d9ff' : strength >= 50 ? '#ffa500' : '#ff0055',
      status: strength >= 100 ? 'НАДЁЖНЫЙ' : strength >= 75 ? 'ХОРОШИЙ' : strength >= 50 ? 'СРЕДНИЙ' : 'СЛАБЫЙ'
    });
  };

  const handleQuizAnswer = (answerIndex) => {
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correct;
    setQuizAnswers({ ...quizAnswers, [currentQuestion]: { answer: answerIndex, correct: isCorrect } });
    if (isCorrect) setScore(score + 1);
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStep('conclusion');
      }
    }, 3000);
  };

  // Confetti effect
  const Confetti = () => (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: 360,
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            ease: 'linear',
            delay: Math.random() * 0.5
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: ['#00ff41', '#00d9ff', '#ff0055', '#ffa500'][i % 4],
            borderRadius: '50%'
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background grid */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
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
          background: 'rgba(26, 31, 58, 0.9)',
          backdropFilter: 'blur(15px)',
          border: '2px solid #00ff41',
          borderRadius: '1rem',
          padding: '0.75rem 1.5rem',
          color: '#00ff41',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          fontFamily: 'monospace'
        }}
      >
        <ArrowLeft size={20} />
        НАЗАД К ПЛАНЕТЕ
      </motion.button>

      <div style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 100,
        background: 'rgba(26, 31, 58, 0.9)',
        backdropFilter: 'blur(15px)',
        border: '2px solid #00ff41',
        borderRadius: '1rem',
        padding: '1rem 1.5rem',
        color: '#00ff41',
        fontWeight: 700,
        fontFamily: 'monospace'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {['story', 'interactiveLesson', 'passwordTest', 'quiz'].map((s, i) => (
            <div key={s} style={{
              width: '40px',
              height: '6px',
              background: step === s || ['story', 'interactiveLesson', 'passwordTest', 'quiz'].indexOf(step) > i 
                ? '#00ff41' 
                : 'rgba(0, 255, 65, 0.2)',
              borderRadius: '3px',
              transition: 'all 0.3s',
              boxShadow: step === s ? '0 0 10px #00ff41' : 'none'
            }} />
          ))}
        </div>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '7rem 2rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <AnimatePresence mode="wait">
          {step === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 200,
                overflow: 'hidden'
              }}
            >
              <motion.div
                key={`bg-${dialogIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)'
                }}
              />

              <AnimatePresence mode="wait">
                {currentDialog.avatar && (
                  <motion.div
                    key={`character-${dialogIndex}`}
                    initial={{ opacity: 0, x: -100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      bottom: '10px',
                      width: '470px',
                      height: '410px',
                      zIndex: 5,
                      filter: `drop-shadow(0 0 40px ${currentDialog.color}80)`,
                      pointerEvents: 'none'
                    }}
                  >
                    <img
                      src={currentDialog.avatar}
                      alt={currentDialog.speaker}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        filter: 'brightness(1.1) contrast(1.2)',
                        borderRadius: '1rem',
                        border: `3px solid ${currentDialog.color}`
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                key={`dialog-box-${dialogIndex}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 4,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(10,14,39,0.9) 100%)',
                  backdropFilter: 'blur(30px)',
                  borderTop: `4px solid ${currentDialog.color}`,
                  boxShadow: `0 -10px 100px ${currentDialog.color}40, inset 0 4px 30px ${currentDialog.color}20`
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
                  justifyContent: 'center'
                }}>
                  
                  <motion.div
                    key={`speaker-${dialogIndex}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      display: 'inline-block',
                      marginBottom: '1rem'
                    }}
                  >
                    <div style={{
                      background: currentDialog.background,
                      border: `3px solid ${currentDialog.color}`,
                      borderRadius: '1rem',
                      padding: '0.75rem 2rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: `0 0 30px ${currentDialog.color}50`
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: currentDialog.color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        textShadow: `0 0 20px ${currentDialog.color}80`,
                        fontFamily: 'monospace'
                      }}>
                        {currentDialog.speaker}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    key={`text-${dialogIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontSize: '1.75rem',
                      color: '#FFF',
                      lineHeight: 1.9,
                      fontWeight: 500,
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                      marginBottom: '2rem',
                      paddingLeft: '1.5rem',
                      borderLeft: `4px solid ${currentDialog.color}50`,
                      fontFamily: currentDialog.isSystem ? 'monospace' : 'inherit'
                    }}
                  >
                    {currentDialog.text}
                  </motion.div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1.5rem',
                    borderTop: `2px solid ${currentDialog.color}20`
                  }}>
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSkipStory}
                      style={{
                        background: 'rgba(255, 0, 85, 0.2)',
                        border: '2px solid rgba(255, 0, 85, 0.5)',
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1.5rem',
                        color: '#ff0055',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'monospace'
                      }}
                    >
                      ⏭️ ПРОПУСТИТЬ СЮЖЕТ
                    </motion.button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {storyDialogs.map((_, i) => (
                          <div
                            key={i}
                            style={{
                              width: i === dialogIndex ? '32px' : '10px',
                              height: '10px',
                              borderRadius: '5px',
                              background: i <= dialogIndex ? 'linear-gradient(90deg, #00ff41, #00d9ff)' : 'rgba(255, 255, 255, 0.2)',
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
                        fontFamily: 'monospace'
                      }}>
                        {dialogIndex + 1} / {storyDialogs.length}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextDialog}
                        style={{
                          background: dialogIndex === storyDialogs.length - 1
                            ? 'linear-gradient(135deg, #00ff41, #00d9ff)' 
                            : `linear-gradient(135deg, ${currentDialog.color}, ${currentDialog.color}cc)`,
                          border: 'none',
                          borderRadius: '1rem',
                          padding: '1rem 2.5rem',
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          color: dialogIndex === storyDialogs.length - 1 ? '#000' : '#FFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          boxShadow: `0 8px 30px ${currentDialog.color}40`,
                          fontFamily: 'monospace'
                        }}
                      >
                        {dialogIndex === storyDialogs.length - 1 ? 'НАЧАТЬ ОБУЧЕНИЕ' : 'ДАЛЕЕ'}
                        <ChevronRight size={24} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Остальные шаги будут в следующем сообщении из-за ограничения размера */}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CyberMission1Premium;