import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Shield, ChevronRight, Award, AlertTriangle, Mail, Link, Eye } from 'lucide-react';

function CyberMission2() {
  const [step, setStep] = useState('story');
  const [dialogIndex, setDialogIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [phishingScene, setPhishingScene] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const storyDialogs = [
    {
      id: 1,
      speaker: 'Система Безопасности',
      text: '⚠️ КРИТИЧЕСКАЯ УГРОЗА! Обнаружена массовая волна фишинговых атак!',
      color: '#ff0055',
      background: 'rgba(255, 0, 85, 0.1)',
      isSystem: true
    },
    {
      id: 2,
      speaker: 'Кибериа',
      text: 'Агент, хакеры рассылают поддельные письма от имени банков и соцсетей! Тысячи людей попадаются на их уловки!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 3,
      speaker: 'Агент',
      text: 'Фишинг? Это как рыбалка на людей?',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    },
    {
      id: 4,
      speaker: 'Кибериа',
      text: 'Именно! Хакеры "ловят" жертв на приманку. Они создают ПОДДЕЛЬНЫЕ сайты, которые выглядят как настоящие банки, почта, соцсети...',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 5,
      speaker: 'Кибериа',
      text: 'Цель - украсть твой ЛОГИН, ПАРОЛЬ, данные карты! *показывает примеры фишинговых писем*',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 6,
      speaker: 'Агент',
      text: 'Но как их распознать? Ведь они выглядят настоящими!',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    },
    {
      id: 7,
      speaker: 'Кибериа',
      text: 'Есть ПРИЗНАКИ! Срочность, угрозы блокировки, странный адрес отправителя, грамматические ошибки, подозрительные ссылки...',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 8,
      speaker: 'Кибериа',
      text: 'Главное правило: НАСТОЯЩИЕ банки НИКОГДА не просят пароль в письме! Всегда проверяй АДРЕС сайта в браузере!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41',
      background: 'rgba(0, 255, 65, 0.1)'
    },
    {
      id: 9,
      speaker: 'Агент',
      text: 'Понял! Научи меня распознавать фишинг!',
      color: '#FFF',
      background: 'rgba(255, 255, 255, 0.05)'
    }
  ];

  const phishingEmails = [
    {
      id: 1,
      from: 'security@paypaI.com',
      subject: '🚨 СРОЧНО! Ваш аккаунт будет заблокирован!',
      body: 'Уважаемый клиент! Мы обнаружили подозрительную активность в вашем аккаунте. Нажмите на ссылку НЕМЕДЛЕННО чтобы подтвердить данные, иначе аккаунт будет заблокирован через 24 часа!',
      link: 'hxxp://paypaI-secure.com/verify',
      isPhishing: true,
      redFlags: [
        '❌ Буква "I" вместо "l" в PayPal',
        '❌ Создание срочности и паники',
        '❌ Подозрительный домен',
        '❌ Угрозы блокировки'
      ]
    },
    {
      id: 2,
      from: 'noreply@amazon.com',
      subject: 'Подтверждение заказа №A12345',
      body: 'Спасибо за покупку! Ваш заказ будет доставлен в течение 3-5 рабочих дней. Номер отслеживания: TR123456789. Если у вас есть вопросы, свяжитесь с нами через ваш аккаунт на Amazon.',
      link: null,
      isPhishing: false,
      goodSigns: [
        '✅ Правильный адрес отправителя',
        '✅ Нет запросов личных данных',
        '✅ Нет подозрительных ссылок',
        '✅ Спокойный тон без паники'
      ]
    },
    {
      id: 3,
      from: 'prize@lottery-winner.ru',
      subject: '🎉 Поздравляем! Вы выиграли 1,000,000₽!',
      body: 'Вы выйграли в лотерею! Для получения приза перейдите по ссылке и введите данные карты для переводa денег!!! Торопитесь, предложение действует 2 часа!',
      link: 'hxxp://lottery-winner.ru/claim',
      isPhishing: true,
      redFlags: [
        '❌ Вы не участвовали в лотерее',
        '❌ Просят данные карты',
        '❌ Грамматические ошибки',
        '❌ Искусственная срочность'
      ]
    }
  ];

  const quizQuestions = [
    {
      question: 'Что такое ФИШИНГ?',
      options: [
        'Рыбалка в интернете',
        'Обман для кражи личных данных',
        'Компьютерная игра',
        'Способ заработка'
      ],
      correct: 1,
      explanation: '✅ Фишинг - это мошенничество, когда хакеры притворяются кем-то другим, чтобы украсть пароли, данные карт и личную информацию!',
      funFact: '🎣 Название "phishing" произошло от "fishing" (рыбалка) - хакеры "ловят" жертв на приманку!'
    },
    {
      question: 'Какой ГЛАВНЫЙ признак фишингового письма?',
      options: [
        'Красивое оформление',
        'Создание паники и срочности',
        'Длинный текст',
        'Много картинок'
      ],
      correct: 1,
      explanation: '✅ Правильно! Фишеры ВСЕГДА создают срочность: "Аккаунт заблокируют!", "Последний шанс!", "Действуйте немедленно!" - чтобы вы не думали и действовали!',
      funFact: '⚠️ 97% фишинговых атак начинаются с письма!'
    },
    {
      question: 'Как проверить НАСТОЯЩИЙ ли это сайт банка?',
      options: [
        'По красивому дизайну',
        'По адресу в строке браузера',
        'По количеству кнопок',
        'По скорости загрузки'
      ],
      correct: 1,
      explanation: '✅ ВСЕГДА проверяй адрес сайта! Настоящий: "https://sberbank.ru", Поддельный: "https://sberbank-secure.com" или "https://sberbаnk.ru" (русская "а")!',
      funFact: '🔒 Ищи HTTPS и замочек в адресной строке!'
    },
    {
      question: 'Банк прислал письмо: "Срочно подтвердите пароль!" Что делать?',
      options: [
        'Сразу ввести пароль',
        'Позвонить в банк по номеру на карте',
        'Нажать на ссылку в письме',
        'Отправить СМС с паролем'
      ],
      correct: 1,
      explanation: '✅ НАСТОЯЩИЕ банки НИКОГДА не просят пароль! Всегда звони в банк по номеру, указанному на ТВОЕЙ карте, а не в письме!',
      funFact: '📞 Запомни номер банка из официального источника!'
    },
    {
      question: 'Что делать, если перешёл по фишинговой ссылке?',
      options: [
        'Ничего страшного',
        'Немедленно сменить все пароли',
        'Перезагрузить компьютер',
        'Удалить браузер'
      ],
      correct: 1,
      explanation: '✅ Если ты ввёл данные на фишинговом сайте - СРОЧНО меняй пароли, свяжись с банком, проверь аккаунты! Чем быстрее - тем лучше!',
      funFact: '⏱️ У тебя есть считанные минуты до того, как хакер использует данные!'
    }
  ];

  const currentDialog = storyDialogs[dialogIndex];

  const handleNextDialog = () => {
    if (dialogIndex < storyDialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      setStep('emailAnalysis');
    }
  };

  const handleEmailAnalysis = (email, verdict) => {
    const isCorrect = (verdict === 'phishing' && email.isPhishing) || (verdict === 'safe' && !email.isPhishing);
    
    setSelectedEmail({ ...email, userVerdict: verdict, isCorrect });
    
    setTimeout(() => {
      if (phishingScene < phishingEmails.length - 1) {
        setPhishingScene(phishingScene + 1);
        setSelectedEmail(null);
      } else {
        setStep('quiz');
      }
    }, 4000);
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
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
              {/* История - аналогично Mission 1 */}
              <motion.div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 4,
                background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(10,14,39,0.9) 100%)',
                backdropFilter: 'blur(30px)',
                borderTop: `4px solid ${currentDialog.color}`,
                padding: '2rem'
              }}>
                <motion.div style={{
                  fontSize: '1.75rem',
                  color: '#FFF',
                  lineHeight: 1.9,
                  marginBottom: '2rem'
                }}>
                  {currentDialog.text}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleNextDialog}
                  style={{
                    background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                    border: 'none',
                    borderRadius: '1rem',
                    padding: '1rem 2.5rem',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: '#000',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
                  }}
                >
                  ДАЛЕЕ <ChevronRight size={24} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {step === 'emailAnalysis' && (
            <motion.div
              key="emailAnalysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#00ff41',
                textAlign: 'center',
                marginBottom: '2rem',
                fontFamily: 'monospace'
              }}>
                📧 АНАЛИЗ ПИСЕМ
              </h2>

              <div style={{
                background: 'rgba(26, 31, 58, 0.9)',
                borderRadius: '1.5rem',
                border: '3px solid #00ff41',
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid rgba(0, 255, 65, 0.3)'
                }}>
                  <div>
                    <Mail size={24} style={{ color: '#00d9ff', marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>От:</div>
                    <div style={{ fontSize: '1.125rem', color: '#FFF', fontFamily: 'monospace' }}>
                      {phishingEmails[phishingScene].from}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Тема:</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFF' }}>
                    {phishingEmails[phishingScene].subject}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  marginBottom: '2rem',
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  color: '#d1d5db'
                }}>
                  {phishingEmails[phishingScene].body}
                </div>

                {phishingEmails[phishingScene].link && (
                  <div style={{
                    background: 'rgba(255, 0, 85, 0.1)',
                    border: '2px solid rgba(255, 0, 85, 0.3)',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Link size={20} style={{ color: '#ff0055' }} />
                      <span style={{ fontSize: '0.875rem', color: '#ff0055', fontWeight: 700 }}>Ссылка в письме:</span>
                    </div>
                    <div style={{ fontSize: '1rem', color: '#FFF', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {phishingEmails[phishingScene].link}
                    </div>
                  </div>
                )}

                {!selectedEmail ? (
                  <div>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#00ff41',
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      ЭТО ФИШИНГ ИЛИ БЕЗОПАСНОЕ ПИСЬМО?
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEmailAnalysis(phishingEmails[phishingScene], 'phishing')}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #ff0055, #ff3366)',
                          border: 'none',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          color: '#FFF',
                          cursor: 'pointer',
                          fontFamily: 'monospace'
                        }}
                      >
                        🚨 ФИШИНГ
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEmailAnalysis(phishingEmails[phishingScene], 'safe')}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                          border: 'none',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          color: '#000',
                          cursor: 'pointer',
                          fontFamily: 'monospace'
                        }}
                      >
                        ✅ БЕЗОПАСНО
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: selectedEmail.isCorrect ? 'rgba(0, 255, 65, 0.2)' : 'rgba(255, 0, 85, 0.2)',
                      border: `3px solid ${selectedEmail.isCorrect ? '#00ff41' : '#ff0055'}`,
                      borderRadius: '1rem',
                      padding: '2rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                      {selectedEmail.isCorrect ? '✅' : '❌'}
                    </div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: selectedEmail.isCorrect ? '#00ff41' : '#ff0055',
                      marginBottom: '1.5rem'
                    }}>
                      {selectedEmail.isCorrect ? 'ПРАВИЛЬНО!' : 'НЕВЕРНО!'}
                    </div>
                    <div style={{
                      textAlign: 'left',
                      fontSize: '1.125rem',
                      lineHeight: 1.8,
                      color: '#FFF'
                    }}>
                      {selectedEmail.isPhishing ? (
                        <div>
                          <div style={{ fontWeight: 700, marginBottom: '1rem', color: '#ff0055' }}>
                            🚨 Признаки фишинга:
                          </div>
                          {selectedEmail.redFlags.map((flag, i) => (
                            <div key={i} style={{ marginBottom: '0.5rem' }}>{flag}</div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontWeight: 700, marginBottom: '1rem', color: '#00ff41' }}>
                            ✅ Признаки безопасности:
                          </div>
                          {selectedEmail.goodSigns.map((sign, i) => (
                            <div key={i} style={{ marginBottom: '0.5rem' }}>{sign}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Quiz и Conclusion аналогично Mission 1 */}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CyberMission2;