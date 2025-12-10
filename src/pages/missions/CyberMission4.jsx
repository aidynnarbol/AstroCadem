import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Lock, Unlock, MapPin, Camera, UserX, Shield, AlertTriangle, ChevronRight } from 'lucide-react';

function CyberMission4() {
  const [step, setStep] = useState('story');
  const [dialogIndex, setDialogIndex] = useState(0);
  const [privacyScore, setPrivacyScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const storyDialogs = [
    {
      id: 1,
      speaker: 'Система Безопасности',
      text: '📊 ВНИМАНИЕ! Обнаружена утечка личных данных пользователей!',
      color: '#ff0055',
      background: 'rgba(255, 0, 85, 0.1)',
      isSystem: true
    },
    {
      id: 2,
      speaker: 'Кибериа',
      text: 'Агент, компании собирают информацию о каждом твоём шаге в сети! Каждый лайк, поиск, переход - всё это анализируется и продаётся рекламодателям.',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 3,
      speaker: 'Агент',
      text: 'Мои данные кому-то интересны? Я же ничего особенного не делаю...',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    },
    {
      id: 4,
      speaker: 'Кибериа',
      text: 'ОЧЕНЬ интересны! Твои данные СТОЯТ ДЕНЕГ! Знание твоих привычек, интересов, местоположения - всё это используется для таргетированной рекламы.',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 5,
      speaker: 'Кибериа',
      text: '*показывает статистику* Средняя стоимость данных одного человека - от $100 до $1000 в год! А ещё есть опасность: утечки данных, слежка, кража личности...',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 6,
      speaker: 'Агент',
      text: 'Что же делать? Как защитить свои данные?',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    },
    {
      id: 7,
      speaker: 'Кибериа',
      text: 'Контролируй информацию о себе! Проверяй настройки приватности, будь осторожен с фото и геолокацией, не делись слишком личной информацией!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 8,
      speaker: 'Кибериа',
      text: 'Сегодня я научу тебя ЗАЩИЩАТЬ ПРИВАТНОСТЬ! Ты узнаешь, как контролировать свои данные в цифровом мире!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 9,
      speaker: 'Агент',
      text: 'Готов учиться! Моя приватность под моим контролем!',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    }
  ];

  const scenarios = [
    {
      id: 1,
      situation: '📱 Новое приложение "Весёлые Пазлы" просит доступ к:',
      permissions: [
        '📷 Камера',
        '🎤 Микрофон', 
        '📇 Контакты',
        '📍 Местоположение',
        '🖼️ Галерея фото'
      ],
      appType: 'Игра-головоломка',
      question: 'Что делать?',
      choices: [
        {
          text: 'Разрешить всё - хочу поиграть!',
          isCorrect: false,
          feedback: '❌ СТОП! Игре-головоломке НЕ нужны камера, микрофон и контакты! Каждое разрешение = доступ к твоим данным. Давай только НЕОБХОДИМЫЕ разрешения!'
        },
        {
          text: 'Отказать во всём подозрительном',
          isCorrect: true,
          feedback: '✅ Молодец! Головоломке достаточно минимальных разрешений. Камера, микрофон, контакты, геолокация - всё это лишнее! Всегда спрашивай себя: "Зачем приложению ЭТО?"'
        }
      ]
    },
    {
      id: 2,
      situation: '📸 Друг хочет выложить твоё фото в Instagram',
      details: [
        '🏠 На фото виден номер твоего дома',
        '🎒 Видна школьная форма с эмблемой',
        '📍 В подписи указана точная геолокация',
        '⏰ Время публикации - 9:00 (когда ты в школе)'
      ],
      question: 'Разрешить публикацию?',
      choices: [
        {
          text: 'Да, классное фото!',
          isCorrect: false,
          feedback: '❌ ОПАСНО! По этому фото можно узнать где ты живёшь, в какой школе учишься и когда тебя нет дома! Это информация для злоумышленников!'
        },
        {
          text: 'Только после размытия адреса и без геолокации',
          isCorrect: true,
          feedback: '✅ Правильно! Личная информация (адрес, школа, расписание) не должна быть публичной. Это вопрос ТВОЕЙ БЕЗОПАСНОСТИ! Можно публиковать фото, но без личных данных.'
        }
      ]
    },
    {
      id: 3,
      situation: '🍪 Сайт магазина предлагает сохранить cookies:',
      details: [
        '✅ Необходимые - для работы корзины покупок',
        '📊 Функциональные - для запоминания настроек',
        '📈 Аналитические - для сбора статистики посещений',
        '🎯 Рекламные - для показа персональной рекламы',
        '🔗 Отслеживающие - передача данных партнёрам'
      ],
      question: 'Какие cookies разрешить?',
      choices: [
        {
          text: 'Все - не хочу разбираться',
          isCorrect: false,
          feedback: '❌ Стоп! Рекламные и отслеживающие cookies собирают МАССУ данных о тебе и следят за каждым действием! Они создают твой цифровой профиль для рекламы!'
        },
        {
          text: 'Только необходимые и функциональные',
          isCorrect: true,
          feedback: '✅ Отлично! Разрешай только cookies для РАБОТЫ сайта. Отключай рекламные и отслеживающие - они собирают данные о тебе по всему интернету!'
        }
      ]
    },
    {
      id: 4,
      situation: '🎮 Онлайн-игра просит заполнить профиль:',
      details: [
        '👤 Настоящее имя и фамилию',
        '🎂 Точную дату рождения',
        '🏠 Адрес проживания',
        '📞 Номер телефона',
        '👨‍👩‍👧 Имена родителей',
        '💳 Email для "восстановления доступа"'
      ],
      question: 'Что указать в профиле?',
      choices: [
        {
          text: 'Всё честно - хочу полный доступ',
          isCorrect: false,
          feedback: '❌ НЕТ НЕТ НЕТ! НИКОГДА не указывай реальные данные в играх! Это золотая жила для мошенников! Твои данные могут продать или использовать для взлома!'
        },
        {
          text: 'Псевдоним, минимум данных, не указывать адрес',
          isCorrect: true,
          feedback: '✅ Умница! В играх ВСЕГДА используй ПСЕВДОНИМ, не указывай реальное имя, адрес, телефон. Для регистрации достаточно ника и email. Твоя приватность важнее любой игры!'
        }
      ]
    },
    {
      id: 5,
      situation: '📊 Онлайн-викторина обещает iPhone за участие! Нужно указать:',
      details: [
        '👤 ФИО полностью',
        '📧 Email родителей',
        '📍 Точный адрес для доставки приза',
        '💳 Номер банковской карты "для проверки возраста"',
        '🔐 CVV код "для активации приза"'
      ],
      question: 'Участвовать?',
      choices: [
        {
          text: 'Да! Хочу iPhone, заполню всё!',
          isCorrect: false,
          feedback: '❌ ЭТО МОШЕННИЧЕСТВО 100%! Настоящие конкурсы НИКОГДА не просят данные карты! Это способ украсть деньги! Как только введёшь CVV - спишут все деньги с карты!'
        },
        {
          text: 'НЕТ! Это подозрительно и опасно',
          isCorrect: true,
          feedback: '✅ ПРАВИЛЬНО! Главное правило: если ПРОСЯТ ДАННЫЕ КАРТЫ "для приза" - это МОШЕННИКИ! Настоящие конкурсы не требуют финансовой информации. НИКОГДА не давай CVV код!'
        }
      ]
    },
    {
      id: 6,
      situation: '🌐 Подключение к бесплатному Wi-Fi в кафе "Free_Coffee_WiFi":',
      details: [
        '📶 Сеть без пароля (открытая)',
        '⚠️ Нужно зайти в банковское приложение',
        '💬 Отправить важное сообщение с паролем',
        '🛒 Оплатить покупку онлайн'
      ],
      question: 'Безопасно ли использовать эту сеть?',
      choices: [
        {
          text: 'Да, бесплатный WiFi - отлично!',
          isCorrect: false,
          feedback: '❌ ОПАСНО! Открытые WiFi сети - рай для хакеров! Они могут ПЕРЕХВАТИТЬ всё: пароли, данные карт, сообщения. НИКОГДА не вводи важные данные в публичных сетях!'
        },
        {
          text: 'НЕТ! Отложить важные дела до дома',
          isCorrect: true,
          feedback: '✅ Умно! Публичный WiFi подходит только для простого сёрфинга. Банки, пароли, оплата - только через защищённое соединение дома или через мобильный интернет!'
        }
      ]
    },
    {
      id: 7,
      situation: '📱 Новый друг в соцсети просит:',
      details: [
        '📸 Прислать фото из школы',
        '📍 Рассказать где живёшь',
        '⏰ Когда родителей нет дома',
        '👥 С кем дружишь в реале',
        '💰 Сколько денег дают на карманные расходы'
      ],
      question: 'Как ответить?',
      choices: [
        {
          text: 'Рассказать всё - он же друг!',
          isCorrect: false,
          feedback: '❌ СТОП! Это признаки ГРУМИНГА! Незнакомцы выдают себя за друзей, чтобы получить личную информацию. НИКОГДА не делись такими данными с людьми из интернета!'
        },
        {
          text: 'Заблокировать и сообщить родителям/админам',
          isCorrect: true,
          feedback: '✅ ПРАВИЛЬНО! Настоящие друзья не задают такие вопросы! Это попытка узнать личную информацию. Заблокируй, сообщи взрослым, пожалуйся администрации соцсети!'
        }
      ]
    }
  ];

  const currentDialog = storyDialogs[dialogIndex];

  const handleNextDialog = () => {
    if (dialogIndex < storyDialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      setStep('scenarios');
    }
  };

  const handleSkipStory = () => {
    setStep('scenarios');
  };

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    if (choice.isCorrect) {
      setPrivacyScore(privacyScore + 1);
    }
    
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setSelectedChoice(null);
      } else {
        setStep('conclusion');
      }
    }, 4000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Grid background */}
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
          fontFamily: 'monospace'
        }}
      >
        <ArrowLeft size={20} />
        НАЗАД К ПЛАНЕТЕ
      </motion.button>

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
              style={{ position: 'fixed', inset: 0, zIndex: 200 }}
            >
              <motion.div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)'
              }} />

              <AnimatePresence mode="wait">
                {currentDialog.avatar && (
                  <motion.div
                    key={`character-${dialogIndex}`}
                    initial={{ opacity: 0, x: -100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      bottom: '10px',
                      width: '470px',
                      height: '410px',
                      zIndex: 5,
                      filter: `drop-shadow(0 0 40px ${currentDialog.color}80)`
                    }}
                  >
                    <img
                      src={currentDialog.avatar}
                      alt={currentDialog.speaker}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(1.1) contrast(1.2)',
                        borderRadius: '1rem',
                        border: `3px solid ${currentDialog.color}`
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                key={`dialog-box-${dialogIndex}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 4,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(10,14,39,0.9) 100%)',
                  backdropFilter: 'blur(30px)',
                  borderTop: `4px solid ${currentDialog.color}`,
                  boxShadow: `0 -10px 100px ${currentDialog.color}40`
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
                  
                  <motion.div style={{
                    display: 'inline-block',
                    marginBottom: '1rem'
                  }}>
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

                  <motion.div style={{
                    fontSize: '1.75rem',
                    color: '#FFF',
                    lineHeight: 1.9,
                    fontWeight: 500,
                    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                    marginBottom: '2rem',
                    paddingLeft: '1.5rem',
                    borderLeft: `4px solid ${currentDialog.color}50`,
                    fontFamily: currentDialog.isSystem ? 'monospace' : 'inherit'
                  }}>
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
                      whileHover={{ scale: 1.05 }}
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
                      ⏭️ ПРОПУСТИТЬ
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

          {step === 'scenarios' && (
            <motion.div
              key={`scenario-${currentScenario}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div style={{
                background: 'rgba(26, 31, 58, 0.9)',
                borderRadius: '1.5rem',
                border: '3px solid #00ff41',
                padding: '2.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    color: '#00d9ff',
                    fontFamily: 'monospace'
                  }}>
                    СЦЕНАРИЙ {currentScenario + 1} / {scenarios.length}
                  </h3>
                  <div style={{
                    background: 'rgba(0, 255, 65, 0.2)',
                    border: '2px solid #00ff41',
                    borderRadius: '0.75rem',
                    padding: '0.5rem 1rem',
                    color: '#00ff41',
                    fontWeight: 700,
                    fontFamily: 'monospace'
                  }}>
                    Счёт: {privacyScore}
                  </div>
                </div>

                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#FFF',
                  marginBottom: '1.5rem'
                }}>
                  {scenarios[currentScenario].situation}
                </div>

                {scenarios[currentScenario].appType && (
                  <div style={{
                    background: 'rgba(0, 217, 255, 0.1)',
                    border: '2px solid rgba(0, 217, 255, 0.3)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '1.125rem',
                      color: '#00d9ff',
                      fontWeight: 700,
                      marginBottom: '0.5rem'
                    }}>
                      Приложение: {scenarios[currentScenario].appType}
                    </div>
                  </div>
                )}

                <div style={{
                  background: 'rgba(255, 0, 85, 0.1)',
                  border: '2px solid rgba(255, 0, 85, 0.3)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  {(scenarios[currentScenario].permissions || scenarios[currentScenario].details).map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '1.125rem',
                      color: '#FFF',
                      marginBottom: i < (scenarios[currentScenario].permissions?.length || scenarios[currentScenario].details.length) - 1 ? '0.75rem' : 0
                    }}>
                      <div style={{ fontSize: '1.5rem' }}>
                        {scenarios[currentScenario].permissions ? '⚠️' : '📌'}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#00ff41',
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {scenarios[currentScenario].question}
                </div>

                {!selectedChoice ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {scenarios[currentScenario].choices.map((choice, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChoice(choice)}
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
                        {choice.text}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: selectedChoice.isCorrect ? 'rgba(0, 255, 65, 0.2)' : 'rgba(255, 0, 85, 0.2)',
                      border: `3px solid ${selectedChoice.isCorrect ? '#00ff41' : '#ff0055'}`,
                      borderRadius: '1rem',
                      padding: '2rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                      {selectedChoice.isCorrect ? '✅' : '❌'}
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      color: '#FFF',
                      lineHeight: 1.8
                    }}>
                      {selectedChoice.feedback}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'conclusion' && (
            <motion.div
              key="conclusion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>
                {privacyScore === scenarios.length ? '🏆' : privacyScore >= scenarios.length * 0.6 ? '⭐' : '📚'}
              </div>
              <h2 style={{
                fontSize: '3rem',
                color: '#00ff41',
                marginBottom: '1rem',
                fontFamily: 'monospace'
              }}>
                МИССИЯ ЗАВЕРШЕНА!
              </h2>
              <div style={{
                fontSize: '1.5rem',
                color: '#FFF',
                marginBottom: '2rem'
              }}>
                Правильных решений: {privacyScore} / {scenarios.length}
              </div>

              {privacyScore === scenarios.length && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
                    border: '3px solid #fbbf24',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    maxWidth: '700px',
                    margin: '0 auto 2rem'
                  }}
                >
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: '#fbbf24',
                    marginBottom: '1rem'
                  }}>
                    🎓 ИДЕАЛЬНЫЙ РЕЗУЛЬТАТ!
                  </div>
                  <div style={{ fontSize: '1.25rem', color: '#FFF' }}>
                    Ты принял все правильные решения!<br />
                    Теперь ты настоящий СТРАЖ ПРИВАТНОСТИ!
                  </div>
                </motion.div>
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
                <h3 style={{
                  color: '#00ff41',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  🔒 ПРАВИЛА ПРИВАТНОСТИ:
                </h3>
                <div style={{
                  fontSize: '1.125rem',
                  color: '#FFF',
                  lineHeight: 2
                }}>
                  <div>✅ Минимум личных данных онлайн</div>
                  <div>✅ Проверяй настройки приватности</div>
                  <div>✅ Не делись адресом и школой публично</div>
                  <div>✅ Используй псевдонимы в играх</div>
                  <div>✅ Отключай ненужную геолокацию</div>
                  <div>✅ Будь осторожен с фото</div>
                  <div>✅ Не доверяй незнакомцам в сети</div>
                  <div>✅ Контролируй cookies и разрешения</div>
                </div>
              </div>

              <div style={{
                background: 'rgba(0, 217, 255, 0.1)',
                border: '3px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto 2rem',
                textAlign: 'left'
              }}>
                <h3 style={{
                  color: '#00d9ff',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  💡 ЗАПОМНИ:
                </h3>
                <div style={{
                  fontSize: '1.125rem',
                  color: '#FFF',
                  lineHeight: 1.8
                }}>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: '#00ff41' }}>Твои данные = твоя ценность!</strong> Компании готовы платить за информацию о тебе.
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: '#00ff41' }}>Приватность в интернете - это не паранойя,</strong> это разумная осторожность!
                  </p>
                  <p>
                    <strong style={{ color: '#00ff41' }}>Всегда спрашивай себя:</strong> "Зачем им ЭТА информация?" Если ответа нет - не давай!
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                style={{
                  background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                  border: 'none',
                  borderRadius: '1rem',
                  padding: '1rem 2.5rem',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  margin: '0 auto',
                  boxShadow: '0 8px 30px rgba(0, 255, 65, 0.4)'
                }}
              >
                <Shield size={24} />
                ВЕРНУТЬСЯ К ПЛАНЕТЕ
                <Lock size={24} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CyberMission4;