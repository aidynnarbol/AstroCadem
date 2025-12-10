import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Zap, Loader } from 'lucide-react';

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Привет! Я Глюк 🔮, твой AI-помощник на станции AstroCadem! Задавай любые вопросы о финансах и гаджетах!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Автоскролл вниз при новых сообщениях
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Симуляция ИИ-ответа (замените на реальный API)
  const simulateAI = async (question) => {
    // Примеры быстрых ответов для демо
    const responses = {
      'бюджет': '💰 Бюджет - это план твоих доходов и расходов! Представь, что у тебя есть 1000 тенге. Ты решаешь: 600 на еду, 200 на развлечения, 200 - в копилку. Это и есть бюджет!',
      'накопления': '🏦 Копить - это откладывать деньги на важную цель! Правило "10%": от каждых денег откладывай хотя бы 10%. Через год накопится много!',
      'реклама': '📢 Реклама использует хитрости: яркие цвета, любимых персонажей, слова "срочно" и "скидка"! Всегда думай: "Это мне ПРАВДА нужно?"',
      'экранное время': '⏰ Слишком много экрана вредит глазам и сну! Правило 20-20-20: каждые 20 минут смотри на что-то далеко 20 секунд. И ставь телефон за час до сна!',
      'пароль': '🔐 Сильный пароль = минимум 12 символов + буквы + цифры + символы! Никогда не используй "123456" или свою дату рождения! И не говори никому!',
      'default': '🤔 Интересный вопрос! В нашей базе миссий есть ответ. Пройди соответствующую миссию, и я все объясню подробно с примерами!'
    };

    // Простой поиск по ключевым словам
    const lowerQuestion = question.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(keyword)) {
        return response;
      }
    }

    return responses.default;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Симуляция задержки ответа
    setTimeout(async () => {
      const aiResponse = await simulateAI(input);
      
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const quickQuestions = [
    '💰 Что такое бюджет?',
    '🏦 Как копить деньги?',
    '📱 Сколько можно сидеть в телефоне?',
    '🔐 Как создать надёжный пароль?'
  ];

  return (
    <>
      {/* Кнопка вызова помощника */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        
        {/* Пульсирующее кольцо */}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Заголовок */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl"
                >
                  🔮
                </motion.div>
                <div>
                  <h3 className="text-white font-black text-lg">Глюк</h3>
                  <p className="text-purple-100 text-xs">AI-помощник станции</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900'
                        : 'bg-slate-800 text-white border border-white/10'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Индикатор загрузки */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-800 border border-white/10 rounded-2xl p-3 flex items-center gap-2">
                    <Loader className="w-4 h-4 text-purple-400 animate-spin" />
                    <span className="text-gray-400 text-sm">Глюк думает...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Быстрые вопросы */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2">💡 Быстрые вопросы:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((q, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(q.slice(2))}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-gray-300 p-2 rounded-lg text-left transition-all"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Поле ввода */}
            <div className="p-4 border-t border-white/10 bg-slate-900/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Задай вопрос..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none transition-all"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: input.trim() ? 1.1 : 1 }}
                  whileTap={{ scale: input.trim() ? 0.9 : 1 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIAssistant;