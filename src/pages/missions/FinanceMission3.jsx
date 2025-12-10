// src/pages/missions/FinanceMission3.jsx
// МИССИЯ 3: КАК ПРАВИЛЬНО ТРАТИТЬ ДЕНЬГИ?

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, Star, ShoppingBag } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

// AI импорты с проверкой
let AICharacterEngine = null;
let kapitanMonetiConfig = null;

try {
  AICharacterEngine = require('../../ai/AICharacterEngine').default;
  kapitanMonetiConfig = require('../../ai/characters/kapitanMoneti').kapitanMonetiConfig;
} catch (error) {
  console.warn('AI компоненты не найдены, используем fallback');
}

function FinanceMission3() {
  const navigate = useNavigate();
  const { user, completeMission } = useUser();
  
  const [currentScene, setCurrentScene] = useState('intro');
  const [sceneStep, setSceneStep] = useState(0);
  const [aiEngine, setAiEngine] = useState(null);
  const [lastUserChoice, setLastUserChoice] = useState('');
  const [miniGameScore, setMiniGameScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const missionConfig = {
    id: 'finance-3',
    title: 'Как правильно тратить деньги?',
    planet: 'finance',
    context: 'Капитан и агент на базаре',
    rewards: { xp: 350, coins: 300 }
  };

  // Инициализация AI
  useEffect(() => {
    if (user && AICharacterEngine && kapitanMonetiConfig) {
      try {
        const engine = new AICharacterEngine(
          kapitanMonetiConfig,
          user,
          missionConfig
        );
        setAiEngine(engine);
        console.log('✅ AI Engine инициализирован');
      } catch (error) {
        console.error('❌ Ошибка инициализации AI:', error);
        setAiEngine(null);
      }
    }
  }, [user]);

  // FALLBACK диалоги
  const fallbackResponses = {
    scene2: {
      'Расскажи про НУЖДЫ и ЖЕЛАНИЯ': 'Отлично! НУЖДЫ - это еда, вода, одежда. ЖЕЛАНИЯ - это игрушки и сладости.',
      'Как понять что важнее купить?': 'Спроси себя: без этого я проживу? Если нет - это НУЖДА!',
      'Давай сразу попрактикуемся!': 'Хорошо! Идём на базар, покажу на примере!',
      'default': 'Давай я покажу тебе на практике...'
    }
  };

  // СТРУКТУРА СЦЕН
  const scenes = {
    scene1: {
      steps: [
        { type: 'dialogue', text: 'Йо-хо-хо! Вот мы и вышли на базар, агент! Слышишь этот шум? Крики торговцев, смех покупателей!' },
        { type: 'dialogue', text: 'Видишь как блестят товары на солнце? Фрукты, ткани, игрушки - всё так и манит потратить монеты!' },
        { type: 'dialogue', text: 'Но СТОЙ! Многие теряют все деньги на базаре, потому что покупают не то что НУЖНО, а то что ХОЧЕТСЯ!' },
        { 
          type: 'choice', 
          question: 'Что хочешь узнать?',
          choices: [
            'Расскажи про НУЖДЫ и ЖЕЛАНИЯ',
            'Как понять что важнее купить?',
            'Давай сразу попрактикуемся!'
          ]
        }
      ]
    },
    scene2: {
      steps: [
        { type: 'ai-response', fallbackKey: 'scene2' },
        { type: 'dialogue', text: 'НУЖДЫ - это то без чего нельзя прожить: еда, вода, одежда. Это ВАЖНОЕ!' },
        { type: 'dialogue', text: 'ЖЕЛАНИЯ - это то что хочется, но не обязательно: игрушки, сладости, развлечения. Это ПРИЯТНОЕ!' },
        { type: 'dialogue', text: 'Главное правило умного покупателя: сначала покупай НУЖНОЕ, потом если останутся монеты - что-то ПРИЯТНОЕ!' },
        { type: 'dialogue', text: 'И ВСЕГДА оставляй немного монет в копилке! Никогда не трать всё до последней монеты!' },
        { type: 'dialogue', text: 'Отлично! Сейчас ты сам попробуешь сделать покупки на базаре! У тебя будет 100 монет - покажи мне свою мудрость!' }
      ]
    }
  };

  const handleNext = () => {
    const currentSceneData = scenes[currentScene];
    
    if (sceneStep < currentSceneData.steps.length - 1) {
      setSceneStep(sceneStep + 1);
    } else {
      if (currentScene === 'scene1') {
        setCurrentScene('scene2');
        setSceneStep(0);
      } else if (currentScene === 'scene2') {
        setCurrentScene('minigame');
        setSceneStep(0);
      }
    }
  };

  const handleChoice = (choiceText) => {
    setLastUserChoice(choiceText);
    handleNext();
  };

  const handleMiniGameComplete = (score) => {
    setMiniGameScore(score);
    setCurrentScene('quiz');
  };

  const handleMissionComplete = () => {
    completeMission(
      missionConfig.id,
      missionConfig.rewards.xp,
      missionConfig.rewards.coins,
      'finance'
    );
    setCurrentScene('completion');
  };

  const handleExit = () => {
    navigate('/planet/finance');
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      <AnimatePresence mode="wait">
        {currentScene === 'intro' && (
          <IntroScene 
            key="intro"
            onStart={() => {
              setCurrentScene('scene1');
              setSceneStep(0);
            }} 
            onExit={handleExit} 
          />
        )}

        {(currentScene === 'scene1' || currentScene === 'scene2') && (
          <GameScene
            key={`${currentScene}-${sceneStep}`}
            sceneData={scenes[currentScene]}
            currentStep={sceneStep}
            aiEngine={aiEngine}
            lastUserChoice={lastUserChoice}
            fallbackResponses={fallbackResponses}
            onNext={handleNext}
            onChoice={handleChoice}
          />
        )}

        {currentScene === 'minigame' && (
          <MiniGameScene
            key="minigame"
            onComplete={handleMiniGameComplete}
          />
        )}

        {currentScene === 'quiz' && (
          <QuizScene
            key="quiz"
            questions={[
              {
                id: 1,
                question: 'Что такое НУЖДЫ?',
                options: [
                  'То без чего нельзя жить',
                  'То что хочется',
                  'То что дорого',
                  'То что красиво'
                ],
                correct: 0
              },
              {
                id: 2,
                question: 'Что такое ЖЕЛАНИЯ?',
                options: [
                  'То что важно для жизни',
                  'То что хочется но не обязательно',
                  'То что дешёво',
                  'То что нужно купить'
                ],
                correct: 1
              },
              {
                id: 3,
                question: 'У тебя 50 монет. Что купить: игрушку за 40 или еду за 30?',
                options: [
                  'Игрушку - она красивая',
                  'Еду - это важнее',
                  'Ничего не покупать',
                  'Купить всё'
                ],
                correct: 1
              },
              {
                id: 4,
                question: 'Что значит "жить по средствам"?',
                options: [
                  'Тратить всё что есть',
                  'Копить все деньги',
                  'Тратить столько сколько зарабатываешь',
                  'Жить бедно'
                ],
                correct: 2
              },
              {
                id: 5,
                question: 'Зачем откладывать деньги в копилку?',
                options: [
                  'Это не нужно',
                  'Для важных покупок в будущем',
                  'Чтобы хвастаться',
                  'Просто так'
                ],
                correct: 1
              }
            ]}
            answers={quizAnswers}
            onAnswer={(qid, aIndex) => setQuizAnswers(prev => ({ ...prev, [qid]: aIndex }))}
            onSubmit={() => {
              const correct = [
                { id: 1, correct: 0 },
                { id: 2, correct: 1 },
                { id: 3, correct: 1 },
                { id: 4, correct: 2 },
                { id: 5, correct: 1 }
              ].filter(q => quizAnswers[q.id] === q.correct).length;
              
              setShowResults(true);
              if (correct >= 4) {
                setTimeout(() => handleMissionComplete(), 2000);
              }
            }}
            showResults={showResults}
          />
        )}

        {currentScene === 'completion' && (
          <BazarCelebrationScene 
            key="completion"
            mission={missionConfig}
            miniGameScore={miniGameScore}
            onExit={handleExit} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// ==========================================
// INTRO
// ==========================================
function IntroScene({ onStart, onExit }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative'
      }}
    >
      <button
        onClick={onExit}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid #FFD700',
          borderRadius: '0.75rem',
          padding: '0.75rem 1.5rem',
          color: '#FFD700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 700,
          fontSize: '1rem',
          zIndex: 100
        }}
      >
        <ArrowLeft size={20} />
        Назад
      </button>

      <div style={{
        maxWidth: '800px',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '4px solid #FFD700',
        borderRadius: '2rem',
        padding: '3rem',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(255, 215, 0, 0.4)'
      }}>
        
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: '6rem', marginBottom: '1.5rem' }}
        >
          🛒
        </motion.div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          color: '#FFD700',
          marginBottom: '1rem',
          textShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
        }}>
          Как правильно тратить деньги?
        </h1>

        <p style={{
          fontSize: '1.375rem',
          color: '#FFF',
          marginBottom: '2rem',
          lineHeight: 1.7
        }}>
          Капитан Монети ведёт тебя на шумный базар планеты!<br/>
          Научись отличать НУЖНОЕ от ЖЕЛАЕМОГО и стань умным покупателем!
        </p>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            background: 'rgba(251, 191, 36, 0.2)',
            border: '2px solid #FFD700',
            borderRadius: '1rem',
            padding: '1rem 2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ color: '#FFD700', fontWeight: 800 }}>+350 XP</div>
          </div>
          <div style={{
            background: 'rgba(251, 191, 36, 0.2)',
            border: '2px solid #FFD700',
            borderRadius: '1rem',
            padding: '1rem 2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ color: '#FFD700', fontWeight: 800 }}>+300 монет</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            border: 'none',
            borderRadius: '1.25rem',
            padding: '1.5rem 4rem',
            color: '#000',
            fontSize: '1.75rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '0 auto'
          }}
        >
          <Sparkles size={28} />
          Выйти на базар
        </motion.button>

      </div>
    </motion.div>
  );
}

// ==========================================
// GAME SCENE (ДИАЛОГИ)
// ==========================================
function GameScene({ sceneData, currentStep, aiEngine, lastUserChoice, fallbackResponses, onNext, onChoice }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const step = sceneData.steps[currentStep];
  const isDialogue = step.type === 'dialogue';
  const isChoice = step.type === 'choice';
  const isAIResponse = step.type === 'ai-response';

  // AI ОТВЕТ
  useEffect(() => {
    if (!isAIResponse) return;

    const fallbackKey = step.fallbackKey;
    const fallbackTexts = fallbackResponses[fallbackKey] || {};
    const fallbackText = fallbackTexts[lastUserChoice] || fallbackTexts['default'] || 'Интересно! Давай продолжим...';

    if (!aiEngine) {
      setAiResponse(fallbackText);
      setIsLoadingAI(false);
      return;
    }

    setIsLoadingAI(true);

    const prompt = `Ты Капитан Монети на базаре планеты Финансов. 
Агент спросил: "${lastUserChoice}"

Ответь ОЧЕНЬ КОРОТКО (максимум 15 слов) на его вопрос про траты и покупки.
Твой ответ должен быть РАЗНЫМ в зависимости от вопроса:
- Если спросили про нужды и желания - объясни разницу
- Если спросили как понять что важнее - дай совет
- Если спросили про практику - скажи что покажешь

НЕ используй эмодзи. Говори как пират (йо-хо-хо).`;

    const timeout = setTimeout(() => {
      setAiResponse(fallbackText);
      setIsLoadingAI(false);
    }, 5000);

    aiEngine.generateResponse(prompt, [])
      .then(response => {
        clearTimeout(timeout);
        setAiResponse(response || fallbackText);
        setIsLoadingAI(false);
      })
      .catch(error => {
        clearTimeout(timeout);
        setAiResponse(fallbackText);
        setIsLoadingAI(false);
      });

  }, [isAIResponse, aiEngine, lastUserChoice, step, fallbackResponses]);

  // Печатание
  useEffect(() => {
    const textToType = isAIResponse ? aiResponse : (isDialogue ? step.text : '');
    
    if (!textToType || isChoice || isLoadingAI) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < textToType.length) {
        setDisplayedText(textToType.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [step, isDialogue, isChoice, isAIResponse, aiResponse, isLoadingAI]);

  const handleClick = () => {
    if (isLoadingAI) return;
    
    if (isTyping) {
      const textToType = isAIResponse ? aiResponse : step.text;
      setDisplayedText(textToType);
      setIsTyping(false);
    } else if (isDialogue || isAIResponse) {
      onNext();
    }
  };

  const handleChoiceClick = (choiceText) => {
    onChoice(choiceText);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      
      {/* ФОН */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/uploads/bazar.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
          zIndex: 0
        }}
      />

      {/* ВИНЬЕТКА */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.85) 90%)',
        zIndex: 1
      }} />

      {/* ПЕРСОНАЖ */}
      {(isDialogue || isAIResponse) && (
        <motion.div
          key="character"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{
            position: 'absolute',
            left: '2%',
            bottom: 0,
            height: '92%',
            width: '42%',
            zIndex: 2
          }}
        >
          <img
            src="/uploads/kapitan2.jpg"
            alt="Капитан Монети"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom left',
              filter: 'drop-shadow(0 0 50px rgba(0, 0, 0, 1))'
            }}
          />
        </motion.div>
      )}

      {/* ДИАЛОГ */}
      {(isDialogue || isAIResponse) && (
        <div
          onClick={handleClick}
          style={{
            position: 'absolute',
            inset: 0,
            cursor: isLoadingAI ? 'wait' : 'pointer',
            zIndex: 5
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: '8%',
            left: '3%',
            right: '3%',
            pointerEvents: 'none'
          }}>
            {/* ИМЯ */}
            <div
              style={{
                color: '#FFD700',
                fontSize: '1.5rem',
                fontWeight: 900,
                marginBottom: '1.25rem',
                textShadow: '0 0 20px rgba(0, 0, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8)',
                letterSpacing: '0.05em',
                opacity: 1
              }}
            >
              Капитан Монети
            </div>

            {/* ТЕКСТ */}
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '2rem',
                lineHeight: 1.8,
                margin: 0,
                fontWeight: 700,
                textShadow: '0 0 30px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 1), 0 0 50px rgba(0, 0, 0, 0.9)',
                letterSpacing: '0.02em',
                opacity: 1
              }}
            >
              {isLoadingAI ? 'Думаю над твоим вопросом...' : displayedText}
              {isTyping && !isLoadingAI && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ opacity: 1 }}
                >
                  _
                </motion.span>
              )}
            </p>

            {/* ПОДСКАЗКА */}
            {!isTyping && !isLoadingAI && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: '#FFD700',
                  fontSize: '1.125rem',
                  marginTop: '1.5rem',
                  fontWeight: 600,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 1)',
                  opacity: 1
                }}
              >
                ✨ Нажми в любое место чтобы продолжить...
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ВЫБОР */}
      {isChoice && (
        <div style={{
          position: 'absolute',
          top: '35%',
          right: '8%',
          width: '42%',
          zIndex: 10
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: '#7ec8e3',
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
            }}
          >
            {step.question}
          </motion.div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {step.choices.map((choice, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: -8, textShadow: '0 0 20px rgba(126, 200, 227, 0.8)' }}
                onClick={() => handleChoiceClick(choice)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '1rem 0',
                  fontWeight: 600,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ 
                  color: index === 0 ? '#7ec8e3' : '#999',
                  fontSize: '1.75rem',
                  fontWeight: 700
                }}>
                  {index === 0 ? '▸' : '✖'}
                </span>
                <span>{choice}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
}

// ==========================================
// MINI GAME: ЧИСТЫЙ ДИЗАЙН БЕЗ ПУЗЫРЕЙ
// ==========================================
function MiniGameScene({ onComplete }) {
  const [currentTrader, setCurrentTrader] = useState(0);
  const [money, setMoney] = useState(100);
  const [spent, setSpent] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const traders = [
    {
      name: 'Продавец еды',
      image: '/uploads/npc/seller.jpg',
      hint: 'Еда и вода - это НУЖНОЕ!',
      items: [
        { id: 'apples', name: 'Яблоки', emoji: '🍎', price: 15, type: 'need' },
        { id: 'candy', name: 'Конфеты', emoji: '🍬', price: 20, type: 'want' },
        { id: 'water', name: 'Вода', emoji: '🥤', price: 10, type: 'need' }
      ]
    },
    {
      name: 'Продавец одежды',
      image: '/uploads/npc/seller1.jpg',
      hint: 'Рубашка важна, корона - роскошь!',
      items: [
        { id: 'shirt', name: 'Рубашка', emoji: '👕', price: 30, type: 'need' },
        { id: 'crown', name: 'Корона', emoji: '👑', price: 60, type: 'luxury' },
        { id: 'scarf', name: 'Шарф', emoji: '🧣', price: 15, type: 'useful' }
      ]
    },
    {
      name: 'Продавец развлечений',
      image: '/uploads/npc/seller2.jpg',
      hint: 'Книга полезна, не забывай копилку!',
      items: [
        { id: 'toy', name: 'Игрушка', emoji: '🎮', price: 35, type: 'want' },
        { id: 'book', name: 'Книга', emoji: '📚', price: 20, type: 'useful' },
        { id: 'ticket', name: 'Билет', emoji: '🎪', price: 25, type: 'fun' }
      ]
    }
  ];

  const currentTraderData = traders[currentTrader];

  const handleToggleItem = (item) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleNext = () => {
    const cost = selectedItems.reduce((sum, item) => sum + item.price, 0);
    setSpent(spent + cost);
    setMoney(money - cost);
    setPurchases([...purchases, ...selectedItems]);
    setSelectedItems([]);

    if (currentTrader < traders.length - 1) {
      setCurrentTrader(currentTrader + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    const finalMoney = money - selectedItems.reduce((sum, item) => sum + item.price, 0);
    const finalPurchases = [...purchases, ...selectedItems];
    
    let score = 0;
    const boughtNeeds = finalPurchases.filter(p => p.type === 'need');
    score += boughtNeeds.length * 13;
    if (finalMoney >= 20) score += 30;
    const boughtUseful = finalPurchases.filter(p => p.type === 'useful');
    score += boughtUseful.length * 10;
    const boughtLuxury = finalPurchases.filter(p => p.type === 'luxury');
    if (boughtLuxury.length === 0) score += 10;
    
    onComplete(Math.min(score, 100));
  };

  const totalSelected = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      
      {/* ФОН */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/uploads/bazar.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
          zIndex: 0
        }}
      />

      {/* ВИНЬЕТКА */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 95%)',
        zIndex: 1
      }} />

      {/* СЧЁТЧИК ВВЕРХУ - КОМПАКТНЫЙ */}
      <div style={{
        position: 'absolute',
        top: '3%',
        left: 0,
        right: 0,
        zIndex: 30,
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div style={{ 
            color: '#FFD700', 
            fontSize: '1.5rem', 
            fontWeight: 900,
            textShadow: '0 0 20px rgba(0,0,0,1)'
          }}>
            💰 {money} монет
          </div>
          <div style={{ 
            color: '#10b981', 
            fontSize: '1.5rem', 
            fontWeight: 900,
            textShadow: '0 0 20px rgba(0,0,0,1)'
          }}>
            Выбрано: {totalSelected} 💰
          </div>
          <div style={{ 
            color: '#7ec8e3', 
            fontSize: '1.5rem', 
            fontWeight: 900,
            textShadow: '0 0 20px rgba(0,0,0,1)'
          }}>
            Торговец {currentTrader + 1}/3
          </div>
        </div>
      </div>

      {/* КАПИТАН СЛЕВА - МАЛЕНЬКИЙ */}
      <motion.div
        key={`captain-${currentTrader}`}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          position: 'absolute',
          left: '2%',
          bottom: '5%',
          height: '50%',
          width: '20%',
          zIndex: 10
        }}
      >
        <img
          src="/uploads/kapitan2.jpg"
          alt="Капитан"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 1))',
            opacity: 0.8
          }}
        />
      </motion.div>

      {/* ТОРГОВЕЦ СПРАВА */}
      <motion.div
        key={`trader-${currentTrader}`}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          position: 'absolute',
          right: '2%',
          bottom: '5%',
          height: '65%',
          width: '28%',
          zIndex: 10
        }}
      >
        <img
          src={currentTraderData.image}
          alt={currentTraderData.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom right',
            filter: 'drop-shadow(0 0 40px rgba(0, 0, 0, 1))'
          }}
        />
      </motion.div>

      {/* ТОВАРЫ ПО ЦЕНТРУ - КОМПАКТНО */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        width: '100%',
        maxWidth: '800px'
      }}>
        
        {/* НАЗВАНИЕ ТОРГОВЦА */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          <h2 style={{
            color: '#FFD700',
            fontSize: '2rem',
            fontWeight: 900,
            margin: 0,
            textShadow: '0 0 40px rgba(0,0,0,1), 0 0 60px rgba(255,215,0,0.8)'
          }}>
            {currentTraderData.name}
          </h2>
        </motion.div>

        {/* ТОВАРЫ В РЯД - КОМПАКТНО */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          padding: '0 2rem'
        }}>
          {currentTraderData.items.map((item, index) => {
            const isSelected = selectedItems.find(i => i.id === item.id);
            
            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                style={{
                  textAlign: 'center'
                }}
              >
                {/* ЭМОДЗИ ТОВАРА - МЕНЬШЕ */}
                <div style={{ 
                  fontSize: '5rem', 
                  marginBottom: '0.75rem',
                  filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))',
                  transition: 'all 0.3s'
                }}>
                  {item.emoji}
                </div>
                
                {/* ЦЕНА - МЕНЬШЕ */}
                <div style={{ 
                  color: '#FFD700', 
                  fontSize: '1.75rem', 
                  fontWeight: 900,
                  marginBottom: '1rem',
                  textShadow: '0 0 15px rgba(0, 0, 0, 1)'
                }}>
                  {item.price} 💰
                </div>

                {/* ЧЕКБОКС - КОМПАКТНЕЕ */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggleItem(item)}
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: isSelected 
                      ? '2px solid #10b981' 
                      : '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1.5rem',
                    color: '#FFF',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 1)',
                    boxShadow: isSelected 
                      ? '0 0 20px rgba(16, 185, 129, 0.5)' 
                      : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>
                    {isSelected ? '✓' : '○'}
                  </span>
                  <span>{item.name}</span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ПОДСКАЗКА КАПИТАНА - ТОНКО ВНИЗУ СЛЕВА */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          position: 'absolute',
          left: '2%',
          bottom: '2%',
          zIndex: 25,
          maxWidth: '300px'
        }}
      >
        <p style={{
          color: '#FFD700',
          fontSize: '1rem',
          fontWeight: 600,
          margin: 0,
          textShadow: '0 2px 15px rgba(0, 0, 0, 1)',
          lineHeight: 1.4
        }}>
          💡 {currentTraderData.hint}
        </p>
      </motion.div>

      {/* КНОПКА ДАЛЕЕ - КОМПАКТНЕЕ */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        disabled={money < totalSelected}
        style={{
          position: 'absolute',
          bottom: '4%',
          right: '4%',
          zIndex: 30,
          background: money < totalSelected
            ? 'rgba(107, 114, 128, 0.5)'
            : 'linear-gradient(135deg, #FFD700, #FFA500)',
          border: 'none',
          borderRadius: '1rem',
          padding: '1.25rem 3rem',
          color: money < totalSelected ? '#6b7280' : '#000',
          fontSize: '1.5rem',
          fontWeight: 900,
          cursor: money < totalSelected ? 'not-allowed' : 'pointer',
          boxShadow: money < totalSelected 
            ? 'none'
            : '0 0 30px rgba(255, 215, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        <ShoppingBag size={24} />
        {currentTrader < traders.length - 1 ? 'Следующий торговец →' : 'Завершить покупки'}
      </motion.button>

    </motion.div>
  );
}

// ==========================================
// QUIZ (БЕЗ ИЗМЕНЕНИЙ)
// ==========================================
function QuizScene({ questions, answers, onAnswer, onSubmit, showResults }) {
  const correctCount = questions.filter(q => answers[q.id] === q.correct).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= 80;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/uploads/bazar.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          zIndex: 0
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem'
      }}>
        
        <div style={{ maxWidth: '1100px', width: '100%' }}>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              color: '#FFD700',
              marginBottom: '0.75rem',
              textShadow: '0 0 50px rgba(255, 215, 0, 1)'
            }}>
              Проверка знаний
            </h2>
            <p style={{ 
              color: '#FFFFFF', 
              fontSize: '1.5rem',
              fontWeight: 600,
              textShadow: '0 2px 15px rgba(0, 0, 0, 1)'
            }}>
              Капитан Монети проверяет что ты запомнил
            </p>
          </motion.div>

          {questions.map((q, qIndex) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIndex * 0.1 }}
              style={{ marginBottom: '3rem' }}
            >
              <h3 style={{
                color: '#FFD700',
                fontSize: '1.875rem',
                fontWeight: 800,
                marginBottom: '1.75rem',
                textShadow: '0 0 30px rgba(0, 0, 0, 1)',
                letterSpacing: '0.02em'
              }}>
                {qIndex + 1}. {q.question}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {q.options.map((option, optIndex) => {
                  const isSelected = answers[q.id] === optIndex;
                  const isCorrect = q.correct === optIndex;

                  return (
                    <motion.button
                      key={optIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: qIndex * 0.1 + optIndex * 0.05 }}
                      whileHover={!showResults ? { x: 8, textShadow: '0 0 20px rgba(255, 255, 255, 0.8)' } : {}}
                      onClick={() => !showResults && onAnswer(q.id, optIndex)}
                      disabled={showResults}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: showResults
                          ? isCorrect
                            ? '#10b981'
                            : isSelected
                              ? '#ef4444'
                              : '#FFFFFF'
                          : isSelected
                            ? '#FFD700'
                            : '#FFFFFF',
                        cursor: showResults ? 'default' : 'pointer',
                        textAlign: 'left',
                        fontSize: '1.375rem',
                        fontWeight: 600,
                        padding: '1.25rem 0 1.25rem 3rem',
                        transition: 'all 0.2s',
                        textShadow: '0 2px 15px rgba(0, 0, 0, 1)',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        fontSize: '1.75rem',
                        fontWeight: 700
                      }}>
                        {showResults
                          ? isCorrect
                            ? '✓'
                            : isSelected
                              ? '✗'
                              : '○'
                          : isSelected
                            ? '●'
                            : '○'}
                      </span>
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {showResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                marginTop: '4rem'
              }}
            >
              <div style={{ fontSize: '6rem', marginBottom: '1.5rem' }}>
                {passed ? '🎉' : '😔'}
              </div>
              <h3 style={{
                color: '#FFFFFF',
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '1rem',
                textShadow: '0 0 40px rgba(0, 0, 0, 1)'
              }}>
                {passed ? 'Отлично, агент!' : 'Почти получилось!'}
              </h3>
              <div style={{
                fontSize: '4rem',
                fontWeight: 900,
                color: passed ? '#10b981' : '#ef4444',
                marginBottom: '0.75rem',
                textShadow: '0 0 40px rgba(0, 0, 0, 1)'
              }}>
                {correctCount} / {questions.length}
              </div>
              <div style={{ 
                color: '#FFD700', 
                fontSize: '1.5rem',
                fontWeight: 700,
                textShadow: '0 2px 15px rgba(0, 0, 0, 1)'
              }}>
                {score}% правильных ответов
              </div>
              {!passed && (
                <p style={{ 
                  color: '#FFF', 
                  marginTop: '2rem', 
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
                }}>
                  Нужно минимум 80% чтобы пройти миссию
                </p>
              )}
            </motion.div>
          )}

          {!showResults ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSubmit}
              disabled={Object.keys(answers).length < questions.length}
              style={{
                background: Object.keys(answers).length === questions.length
                  ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                  : 'rgba(107, 114, 128, 0.5)',
                border: 'none',
                borderRadius: '1.25rem',
                padding: '1.75rem',
                color: Object.keys(answers).length === questions.length ? '#000' : '#6b7280',
                fontSize: '1.75rem',
                fontWeight: 900,
                cursor: Object.keys(answers).length === questions.length ? 'pointer' : 'not-allowed',
                width: '100%',
                marginTop: '3rem',
                boxShadow: Object.keys(answers).length === questions.length
                  ? '0 0 50px rgba(255, 215, 0, 0.8)'
                  : 'none'
              }}
            >
              Проверить ответы
            </motion.button>
          ) : !passed && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                border: 'none',
                borderRadius: '1.25rem',
                padding: '1.75rem',
                color: 'white',
                fontSize: '1.75rem',
                fontWeight: 900,
                cursor: 'pointer',
                width: '100%',
                marginTop: '2rem',
                boxShadow: '0 0 50px rgba(59, 130, 246, 0.8)'
              }}
            >
              Попробовать снова
            </motion.button>
          )}

        </div>

      </div>
    </motion.div>
  );
}

// ==========================================
// CELEBRATION (ТОЛЬКО КАПИТАН, БЕЗ NPC)
// ==========================================
function BazarCelebrationScene({ mission, miniGameScore, onExit }) {
  const [showCaptain, setShowCaptain] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const finalMessage = `Йо-хо-хо! БРАВО, агент! Ты научился тратить деньги с УМОМ! В мини-игре ты набрал ${miniGameScore} баллов! Теперь ты знаешь разницу между НУЖДАМИ и ЖЕЛАНИЯМИ! Следующая миссия - про СБЕРЕЖЕНИЯ! Я покажу тебе как копить монеты и достигать своих целей!`;

  useEffect(() => {
    setTimeout(() => setShowCaptain(true), 500);

    let index = 0;
    const timer = setInterval(() => {
      if (index < finalMessage.length) {
        setDisplayedText(finalMessage.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [finalMessage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      
      {/* ФОН */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/uploads/bazar.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
          zIndex: 0
        }}
      />

      {/* ВИНЬЕТКА */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.85) 90%)',
        zIndex: 1
      }} />

      {/* КАПИТАН */}
      {showCaptain && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: 'spring', damping: 20 }}
          style={{
            position: 'absolute',
            left: '5%',
            bottom: 0,
            height: '85%',
            width: '38%',
            zIndex: 50
          }}
        >
          <img
            src="/uploads/kapitan2.jpg"
            alt="Капитан Монети"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom left',
              filter: 'drop-shadow(0 0 60px rgba(255, 215, 0, 0.8))'
            }}
          />
        </motion.div>
      )}

      {/* ТЕКСТ КАПИТАНА */}
      {showCaptain && (
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '5%',
          right: '5%',
          zIndex: 60
        }}>
          <p
            style={{
              color: '#FFFFFF',
              fontSize: '1.75rem',
              fontWeight: 700,
              textShadow: '0 0 30px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 1)',
              lineHeight: 1.8,
              maxWidth: '1000px'
            }}
          >
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              _
            </motion.span>
          </p>
        </div>
      )}

      {/* КАРТОЧКА НАГРАД */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '4px solid #FFD700',
          borderRadius: '2rem',
          padding: '2rem',
          zIndex: 80,
          boxShadow: '0 0 80px rgba(255, 215, 0, 0.8)'
        }}
      >
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <Trophy size={60} color="#FFD700" style={{ marginBottom: '0.5rem' }} />
          <h3 style={{
            color: '#FFD700',
            fontSize: '1.75rem',
            fontWeight: 900,
            margin: 0
          }}>
            МИССИЯ 3/5 ЗАВЕРШЕНА!
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(251, 191, 36, 0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '2px solid #fbbf24',
              textAlign: 'center'
            }}
          >
            <Star size={40} color="#fbbf24" style={{ marginBottom: '0.5rem' }} />
            <div style={{ color: '#fcd34d', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Опыт
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fbbf24' }}>
              +{mission.rewards.xp}
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(251, 191, 36, 0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '2px solid #fbbf24',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ color: '#fcd34d', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Монеты
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fbbf24' }}>
              +{mission.rewards.coins}
            </div>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExit}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none',
            borderRadius: '1rem',
            padding: '1.25rem 2.5rem',
            color: 'white',
            fontSize: '1.375rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)',
            width: '100%'
          }}
        >
          К следующей миссии →
        </motion.button>
      </motion.div>

    </motion.div>
  );
}

export default FinanceMission3;