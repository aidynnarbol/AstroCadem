// src/components/ai/AIMissionDialog.jsx
// Полноэкранный диалог с AI-наставником для миссий

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  ChevronRight, 
  Sparkles, 
  HelpCircle,
  RotateCcw,
  Lightbulb,
  Target
} from 'lucide-react';
import AICharacterAvatar from './AICharacterAvatar';

function AIMissionDialog({ 
  aiEngine, 
  onMissionComplete,
  onExit 
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [showQuickButtons, setShowQuickButtons] = useState(true);
  const [missionProgress, setMissionProgress] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Загружаем историю при монтировании
  useEffect(() => {
    const history = aiEngine.getConversationHistory();
    if (history.length === 0) {
      // Первая встреча - запускаем миссию
      startMission();
    } else {
      // Восстанавливаем историю
      setMessages(history.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      })));
    }
  }, []);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Запуск миссии
  const startMission = async () => {
    setIsAIThinking(true);
    try {
      const response = await aiEngine.startMission();
      
      setMessages([{
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString()
      }]);
      
      setMissionProgress(response.metadata?.missionProgress);
    } catch (error) {
      console.error('Error starting mission:', error);
    } finally {
      setIsAIThinking(false);
    }
  };

  // Отправка сообщения
  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || isAIThinking) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowQuickButtons(false);
    setIsAIThinking(true);

    try {
      // Получаем ответ от AI
      const response = await aiEngine.sendMessage(messageText);
      
      const aiMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setMissionProgress(response.metadata?.missionProgress);

      // Проверяем можно ли завершить миссию
      if (response.metadata?.canProceedToQuiz) {
        setShowQuickButtons(true);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback сообщение
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Упс! Что-то пошло не так. Попробуй ещё раз!',
        timestamp: new Date().toISOString(),
        isError: true
      }]);
    } finally {
      setIsAIThinking(false);
    }
  };

  // Быстрые кнопки
  const quickButtons = [
    { 
      text: 'Продолжить рассказ', 
      icon: ChevronRight,
      action: () => handleSend('Продолжай, интересно!') 
    },
    { 
      text: 'Дай пример', 
      icon: Lightbulb,
      action: () => handleSend('Можешь привести пример?') 
    },
    { 
      text: 'Не понял, объясни проще', 
      icon: HelpCircle,
      action: () => handleSend('Не совсем понял, можешь объяснить проще?') 
    },
    { 
      text: 'Повтори ещё раз', 
      icon: RotateCcw,
      action: () => handleSend('Можешь повторить?') 
    }
  ];

  // Кнопка завершения миссии
  const handleCompleteMission = () => {
    aiEngine.completeMission();
    if (onMissionComplete) {
      onMissionComplete({
        success: true,
        conversationLength: messages.length,
        relationship: aiEngine.memory.memory.relationship
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      
      {/* Header с прогрессом */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '1.5rem',
          borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Инфо о миссии */}
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              {aiEngine.mission?.title || 'Разговор с наставником'}
            </h2>
            {missionProgress && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af'
                }}>
                  Прогресс: {missionProgress.covered} / {missionProgress.total} тем
                </div>
                <div style={{
                  width: '200px',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${missionProgress.percentage}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${aiEngine.character.color}, white)`,
                      borderRadius: '10px'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Иконка персонажа (маленькая) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: aiEngine.character.color,
              fontWeight: 700,
              textAlign: 'right'
            }}>
              {aiEngine.character.name}
            </div>
            <AICharacterAvatar 
              character={aiEngine.character}
              size="small"
              isThinking={isAIThinking}
            />
          </div>
        </div>
      </motion.div>

      {/* Область сообщений */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              character={aiEngine.character}
              isLatest={index === messages.length - 1}
            />
          ))}

          {/* AI думает */}
          {isAIThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start'
              }}
            >
              <AICharacterAvatar 
                character={aiEngine.character}
                size="medium"
                isThinking={true}
              />
              <div style={{
                flex: 1,
                background: 'rgba(31, 41, 55, 0.6)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${aiEngine.character.color}40`,
                borderRadius: '1.5rem',
                padding: '1.5rem',
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Sparkles 
                  size={20} 
                  style={{ color: aiEngine.character.color }} 
                />
                <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                  {aiEngine.character.name} думает...
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Быстрые кнопки */}
      <AnimatePresence>
        {showQuickButtons && !isAIThinking && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              padding: '0 2rem 1rem',
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%'
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {quickButtons.map((button, index) => {
                const Icon = button.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={button.action}
                    style={{
                      background: 'rgba(55, 65, 81, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1rem',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Icon size={16} />
                    {button.text}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Поле ввода */}
      <div style={{
        padding: '1.5rem',
        borderTop: '2px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-end'
        }}>
          {/* Текстовое поле */}
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Пиши сюда... (Enter для отправки)`}
              disabled={isAIThinking}
              rows={3}
              style={{
                width: '100%',
                background: 'rgba(31, 41, 55, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '1rem 1.5rem',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = `${aiEngine.character.color}80`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            
            {/* Счётчик символов */}
            <div style={{
              position: 'absolute',
              bottom: '0.5rem',
              right: '1rem',
              fontSize: '0.75rem',
              color: '#6b7280'
            }}>
              {input.length} / 500
            </div>
          </div>

          {/* Кнопка отправки */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={!input.trim() || isAIThinking}
            style={{
              background: input.trim() && !isAIThinking
                ? `linear-gradient(135deg, ${aiEngine.character.color}, ${aiEngine.character.color}cc)`
                : 'rgba(55, 65, 81, 0.5)',
              border: 'none',
              borderRadius: '1rem',
              padding: '1rem 2rem',
              color: 'white',
              fontWeight: 900,
              fontSize: '1rem',
              cursor: input.trim() && !isAIThinking ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: input.trim() && !isAIThinking 
                ? `0 0 30px ${aiEngine.character.color}60` 
                : 'none',
              transition: 'all 0.3s',
              minWidth: '120px',
              justifyContent: 'center'
            }}
          >
            <Send size={20} />
            Отправить
          </motion.button>

          {/* Кнопка завершить миссию (если можно) */}
          {missionProgress?.canProceedToQuiz && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCompleteMission}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '1rem',
                padding: '1rem 2rem',
                color: 'white',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)',
                minWidth: '180px',
                justifyContent: 'center'
              }}
            >
              <Target size={20} />
              Завершить миссию
            </motion.button>
          )}
        </div>
      </div>

      {/* Фоновые эффекты */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        {/* Звёзды */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              width: Math.random() > 0.7 ? '3px' : '2px',
              height: Math.random() > 0.7 ? '3px' : '2px',
              background: 'white',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Компонент отдельного сообщения
function MessageBubble({ message, character, isLatest }) {
  const isUser = message.role === 'user';
  const isError = message.isError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start',
        flexDirection: isUser ? 'row-reverse' : 'row'
      }}
    >
      {/* Аватар */}
      {!isUser && (
        <AICharacterAvatar 
          character={character}
          size="medium"
          emotion={isLatest ? 'happy' : 'neutral'}
        />
      )}

      {isUser && (
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          border: '3px solid #3b82f6',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
          flexShrink: 0
        }}>
          🚀
        </div>
      )}

      {/* Сообщение */}
      <div style={{ flex: 1, maxWidth: '70%' }}>
        {/* Имя отправителя */}
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 700,
          color: isUser ? '#60a5fa' : character.color,
          marginBottom: '0.5rem',
          textAlign: isUser ? 'right' : 'left'
        }}>
          {isUser ? 'Ты' : character.name}
        </div>

        {/* Текст сообщения */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          style={{
            background: isError 
              ? 'rgba(239, 68, 68, 0.2)'
              : isUser 
                ? 'rgba(59, 130, 246, 0.2)' 
                : 'rgba(31, 41, 55, 0.6)',
            backdropFilter: 'blur(10px)',
            border: isError
              ? '2px solid rgba(239, 68, 68, 0.5)'
              : isUser
                ? '2px solid rgba(59, 130, 246, 0.3)'
                : `2px solid ${character.color}40`,
            borderRadius: '1.5rem',
            padding: '1.5rem',
            color: 'white',
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            position: 'relative',
            boxShadow: isError
              ? '0 10px 30px rgba(239, 68, 68, 0.2)'
              : isUser
                ? '0 10px 30px rgba(59, 130, 246, 0.2)'
                : `0 10px 30px ${character.color}20`
          }}
        >
          {message.content}

          {/* Время */}
          <div style={{
            marginTop: '0.75rem',
            fontSize: '0.75rem',
            color: '#6b7280',
            textAlign: 'right'
          }}>
            {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AIMissionDialog;