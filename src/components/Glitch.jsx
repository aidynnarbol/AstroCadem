// src/components/Glitch.jsx
// УЛУЧШЕННЫЙ Глюк с AI, стрелками-указателями, речевым пузырем И МУЛЬТИЯЗЫЧНОСТЬЮ

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { useGlitch, GLITCH_TIPS } from '../contexts/GlitchContext';
import { useLanguage } from '../contexts/LanguageContext';

function Glitch() {
  const {
    isActive,
    currentTip,
    isMinimized,
    currentPage,
    dismissTip,
    markAsCompleted,
    skipForever,
    showTip
  } = useGlitch();

  const { currentLanguage, t } = useLanguage();

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Получить переведенный текст из объекта
  const getTranslatedText = (textObj) => {
    if (!textObj) return '';
    if (typeof textObj === 'string') return textObj;
    return textObj[currentLanguage] || textObj.ru || '';
  };

  // Проактивные советы - Глюк сам предлагает помощь (переведено)
  useEffect(() => {
    if (showChat && messages.length === 0) {
      const timer = setTimeout(() => {
        const welcomeMessages = {
          ru: '👋 **Чем могу помочь?**\n\nЗадай мне вопрос о:\n• Текущей странице\n• Миссиях и планетах\n• Финансах или безопасности\n• Как пользоваться платформой\n\nЛибо просто напиши "помощь"! 😊',
          kk: '👋 **Қалай көмектесе аламын?**\n\nМынау туралы сұрақ қойыңыз:\n• Ағымдағы бет\n• Миссиялар мен планеталар\n• Қаржы немесе қауіпсіздік\n• Платформаны қалай пайдалану\n\nНемесе жай "көмек" деп жазыңыз! 😊',
          en: '👋 **How can I help?**\n\nAsk me about:\n• Current page\n• Missions and planets\n• Finance or security\n• How to use the platform\n\nOr just type "help"! 😊'
        };
        
        setMessages([{
          role: 'assistant',
          content: welcomeMessages[currentLanguage] || welcomeMessages.ru
        }]);
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, [showChat, messages.length, currentLanguage]);

  // Автоскролл чата
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Обработка кнопок подсказки
  const handleButtonClick = (button) => {
    if (button.action === 'dismiss') {
      markAsCompleted(currentTip.id);
    } else if (button.action === 'next' && button.nextTip) {
      markAsCompleted(currentTip.id);
      showTip(button.nextTip, GLITCH_TIPS[button.nextTip]);
    } else if (button.action === 'skip') {
      skipForever(currentTip.id);
    }
  };

  // Отправка сообщения в AI
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Получаем умный ответ на текущем языке
      const aiResponse = getSmartResponse(userMessage.content, currentLanguage);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse
      }]);
      
    } catch (error) {
      console.error('AI Error:', error);
      
      const errorMessages = {
        ru: '⚠️ Упс! Что-то пошло не так 😅 Но я всё равно постараюсь помочь! Задай вопрос по-другому.',
        kk: '⚠️ Ой! Бірдеңе дұрыс болмады 😅 Бірақ көмектесуге тырысамын! Сұрақты басқаша қойыңыз.',
        en: '⚠️ Oops! Something went wrong 😅 But I\'ll still try to help! Rephrase your question.'
      };
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessages[currentLanguage] || errorMessages.ru
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Умные ответы с поддержкой 3 языков (RU, KK, EN)
  const getSmartResponse = (question, lang = 'ru') => {
    const q = question.toLowerCase();
    
    // ВАЖНО: Здесь твоя огромная база ответов!
    // Для краткости покажу пример структуры - ты добавишь остальное
    
    const responses = {
      // Приветствие
      greeting: {
        condition: (q) => q.includes('привет') || q.includes('hello') || q.includes('сәлем'),
        answer: {
          ru: '👋 **Привет, агент!**\n\nЯ **Глюк** - твой AI-помощник!\n\n🎯 **Могу помочь:**\n• Объяснить финансы 💰\n• Рассказать о безопасности 🛡️\n• Показать путь в технологиях 🚀\n• Научить понимать рекламу 📺\n• Ответить на вопросы о платформе ❓\n\n💬 **Спрашивай что хочешь!** 😊',
          kk: '👋 **Сәлем, агент!**\n\nМен **Глюк** - сенің AI-көмекшің!\n\n🎯 **Көмектесе аламын:**\n• Қаржыны түсіндіру 💰\n• Қауіпсіздік туралы айту 🛡️\n• Технологиялар жолын көрсету 🚀\n• Жарнаманы түсінуге үйрету 📺\n• Платформа туралы сұрақтарға жауап беру ❓\n\n💬 **Қалағаныңды сұра!** 😊',
          en: '👋 **Hi, agent!**\n\nI\'m **Glitch** - your AI assistant!\n\n🎯 **Can help with:**\n• Explain finance 💰\n• Tell about security 🛡️\n• Show the way in technologies 🚀\n• Teach to understand advertising 📺\n• Answer questions about the platform ❓\n\n💬 **Ask anything!** 😊'
        }
      },
      
      // Помощь
      help: {
        condition: (q) => q.includes('помощь') || q.includes('help') || q.includes('көмек'),
        answer: {
          ru: '🤖 **Я Глюк - твой умный помощник!**\n\n❓ **Спрашивай про:**\n\n💰 **Финансы**\nДеньги, накопления, траты\n\n🛡️ **Безопасность**\nПароли, фишинг, защита\n\n🚀 **Технологии**\nПрограммирование, AI\n\n📺 **Реклама**\nМаркетинг, влияние\n\n🗺️ **Платформа**\nМиссии, прогресс, награды\n\n💬 **Пиши - отвечу!** 😊',
          kk: '🤖 **Мен Глюк - сенің ақылды көмекшің!**\n\n❓ **Мынау туралы сұра:**\n\n💰 **Қаржы**\nАқша, жинақтау, шығындар\n\n🛡️ **Қауіпсіздік**\nПарольдер, фишинг, қорғау\n\n🚀 **Технологиялар**\nПрограммалау, AI\n\n📺 **Жарнама**\nМаркетинг, әсер ету\n\n🗺️ **Платформа**\nМиссиялар, прогресс, сыйлықтар\n\n💬 **Жаз - жауап берем!** 😊',
          en: '🤖 **I\'m Glitch - your smart assistant!**\n\n❓ **Ask about:**\n\n💰 **Finance**\nMoney, savings, spending\n\n🛡️ **Security**\nPasswords, phishing, protection\n\n🚀 **Technologies**\nProgramming, AI\n\n📺 **Advertising**\nMarketing, influence\n\n🗺️ **Platform**\nMissions, progress, rewards\n\n💬 **Write - I\'ll answer!** 😊'
        }
      },
      
      // ВАЖНО: Добавь сюда ВСЕ твои ответы из оригинального файла
      // Для каждого ответа создай структуру с 3 языками
      // Примеры ниже:
      
      missions: {
        condition: (q) => q.includes('миссии') || q.includes('missions') || q.includes('миссиялар'),
        answer: {
          ru: '🗺️ **Все миссии FinSmart:**\n\n💰 Финансы (5 миссий)\n🛡️ Кибербезопасность (5 миссий)\n🚀 Технологии (5 миссий)\n📺 Реклама (4 миссии)\n\n📊 Всего: **19 миссий!**\n\n🎯 Начни с Финансов! 💰',
          kk: '🗺️ **FinSmart барлық миссиялары:**\n\n💰 Қаржы (5 миссия)\n🛡️ Киберқауіпсіздік (5 миссия)\n🚀 Технологиялар (5 миссия)\n📺 Жарнама (4 миссия)\n\n📊 Барлығы: **19 миссия!**\n\n🎯 Қаржыдан бастаңыз! 💰',
          en: '🗺️ **All FinSmart missions:**\n\n💰 Finance (5 missions)\n🛡️ Cybersecurity (5 missions)\n🚀 Technologies (5 missions)\n📺 Advertising (4 missions)\n\n📊 Total: **19 missions!**\n\n🎯 Start with Finance! 💰'
        }
      }
    };
    
    // Проверяем каждый ответ
    for (const [key, data] of Object.entries(responses)) {
      if (data.condition(q)) {
        return data.answer[lang] || data.answer.ru;
      }
    }
    
    // Дефолтный ответ
    const defaultResponse = {
      ru: '🤔 **Хм, не совсем понял...**\n\n💡 **Попробуй спросить:**\n• "Расскажи о миссиях"\n• "Как копить деньги?"\n• "Что такое фишинг?"\n• "Помощь"\n\n💬 Переформулируй вопрос! 😊',
      kk: '🤔 **Хм, толық түсінбедім...**\n\n💡 **Мынаны сұрап көріңіз:**\n• "Миссиялар туралы айтып бер"\n• "Ақшаны қалай жинауға болады?"\n• "Фишинг дегеніміз не?"\n• "Көмек"\n\n💬 Сұрақты қайта қойыңыз! 😊',
      en: '🤔 **Hmm, didn\'t quite understand...**\n\n💡 **Try asking:**\n• "Tell me about missions"\n• "How to save money?"\n• "What is phishing?"\n• "Help"\n\n💬 Rephrase your question! 😊'
    };
    
    return defaultResponse[lang] || defaultResponse.ru;
  };

  // Определение элемента для указателя
  const getTargetElement = () => {
    if (!currentTip) return null;

    const targets = {
      'dashboard_map': t('dashboard.mission_map'),
      'dashboard_lab': t('dashboard.laboratory'),
      'dashboard_library': t('dashboard.library'),
      'dashboard_profile': t('dashboard.profile')
    };

    const targetText = targets[currentTip.id];
    if (!targetText) return null;

    const elements = Array.from(document.querySelectorAll('div, button, a'));
    return elements.find(el => el.textContent.includes(targetText));
  };

  const targetElement = getTargetElement();
  const targetRect = targetElement?.getBoundingClientRect();

  // Переведенные тексты для интерфейса
  const uiTexts = {
    chatTitle: {
      ru: 'Чат с Глюком',
      kk: 'Глюкпен чат',
      en: 'Chat with Glitch'
    },
    online: {
      ru: 'Онлайн',
      kk: 'Онлайн',
      en: 'Online'
    },
    typing: {
      ru: 'Печатает...',
      kk: 'Теруде...',
      en: 'Typing...'
    },
    placeholder: {
      ru: 'Задай вопрос...',
      kk: 'Сұрақ қойыңыз...',
      en: 'Ask a question...'
    },
    noMoreShow: {
      ru: 'Больше не показывать',
      kk: 'Енді көрсетпе',
      en: 'Don\'t show again'
    },
    welcomeEmpty: {
      ru: '👋 Привет! Я Глюк, твой AI-помощник!\nЗадавай мне любые вопросы о финансах, технологиях или платформе!',
      kk: '👋 Сәлем! Мен Глюк, сенің AI-көмекшің!\nҚаржы, технологиялар немесе платформа туралы кез келген сұрақ қойыңыз!',
      en: '👋 Hi! I\'m Glitch, your AI assistant!\nAsk me any questions about finance, technology or the platform!'
    }
  };

  const getText = (key) => {
    return uiTexts[key]?.[currentLanguage] || uiTexts[key]?.ru || '';
  };

  return (
    <>
      {/* РОБОТ - ВСЕГДА ВИДИМЫЙ */}
      <motion.div
        initial={{ scale: 0, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9998
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => setShowChat(!showChat)}
          style={{
            width: '100px',
            height: '100px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            border: '4px solid rgba(59, 130, 246, 0.3)'
          }}
        >
          <img 
            src="/uploads/b294b3d93d7825d85082136e118d21ba.png" 
            alt="Glitch"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />

          {/* Индикатор онлайн */}
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#10b981',
            border: '3px solid white',
            boxShadow: '0 0 12px #10b981'
          }} />

          {/* Уведомление */}
          {isActive && !isMinimized && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: '-5px',
                left: '-5px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#ef4444',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}
            >
              !
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* РЕЧЕВОЙ ПУЗЫРЬ */}
      <AnimatePresence>
        {isActive && !isMinimized && currentTip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            style={{
              position: 'fixed',
              bottom: '10rem',
              right: '2rem',
              maxWidth: '400px',
              zIndex: 9999
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.98), rgba(37, 99, 235, 0.98))',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.5)',
              position: 'relative'
            }}>
              {/* Хвостик */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '40px',
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '20px solid rgba(37, 99, 235, 0.98)'
              }} />

              {/* Кнопка закрыть */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={dismissTip}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(239, 68, 68, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                <X size={16} />
              </motion.button>

              {/* Заголовок */}
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: 'white',
                marginBottom: '0.75rem',
                paddingRight: '2rem'
              }}>
                {getTranslatedText(currentTip.title)}
              </h3>

              {/* Сообщение */}
              <p style={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {getTranslatedText(currentTip.message)}
              </p>

              {/* Кнопки */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {currentTip.buttons?.map((button, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleButtonClick(button)}
                    style={{
                      padding: '0.625rem 1.25rem',
                      background: index === 0 ? 'white' : 'rgba(255, 255, 255, 0.25)',
                      color: index === 0 ? '#3b82f6' : 'white',
                      border: 'none',
                      borderRadius: '0.625rem',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      cursor: 'pointer'
                    }}
                  >
                    {getTranslatedText(button.text)}
                  </motion.button>
                ))}
              </div>

              {/* Кнопка "Больше не показывать" */}
              <button
                onClick={() => skipForever(currentTip.id)}
                style={{
                  marginTop: '0.75rem',
                  width: '100%',
                  padding: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {getText('noMoreShow')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* СТРЕЛКА-УКАЗАТЕЛЬ */}
      <AnimatePresence>
        {isActive && !isMinimized && targetRect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              left: targetRect.right + 10,
              top: targetRect.top + targetRect.height / 2,
              zIndex: 9997,
              pointerEvents: 'none',
              fontSize: '3rem',
              filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.6))'
            }}
          >
            👉
          </motion.div>
        )}
      </AnimatePresence>

      {/* ЧАТ С AI */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '14rem',
              right: '2rem',
              width: '400px',
              maxHeight: '500px',
              background: 'rgba(17, 24, 39, 0.98)',
              backdropFilter: 'blur(30px)',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Заголовок чата */}
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))'
            }}>
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: 900, color: 'white' }}>
                  {getText('chatTitle')}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>
                  ● {getText('online')}
                </div>
              </div>

              <button
                onClick={() => setShowChat(false)}
                style={{
                  background: 'rgba(239, 68, 68, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Сообщения */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {messages.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.875rem',
                  padding: '2rem 1rem',
                  whiteSpace: 'pre-line'
                }}>
                  {getText('welcomeEmpty')}
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '1rem',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                      : 'rgba(55, 65, 81, 0.8)',
                    color: 'white',
                    fontSize: '0.875rem',
                    lineHeight: '1.7',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line'
                  }}>
                    {msg.content.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{
                  alignSelf: 'flex-start',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  background: 'rgba(55, 65, 81, 0.8)',
                  color: 'white'
                }}>
                  {getText('typing')}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода */}
            <div style={{
              padding: '1rem',
              borderTop: '2px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '0.75rem'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={getText('placeholder')}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!input.trim()}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: input.trim() 
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                    : 'rgba(55, 65, 81, 0.5)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 700
                }}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Glitch;