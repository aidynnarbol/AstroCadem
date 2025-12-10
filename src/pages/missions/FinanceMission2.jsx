// src/pages/missions/FinanceMission2.jsx
// МИССИЯ 2: ГДЕ И КАК ЗАРАБАТЫВАЮТ ДЕНЬГИ? (ИСПРАВЛЕННАЯ ВЕРСИЯ)

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, Star } from 'lucide-react';
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

function FinanceMission2() {
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
    id: 'finance-2',
    title: 'Где и как зарабатывают деньги?',
    planet: 'finance',
    context: 'Капитан и агент в центре таверны',
    rewards: { xp: 300, coins: 250 }
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
      'Расскажи про разные профессии': 'Отлично! В галактике тысячи профессий...',
      'Почему одни зарабатывают больше других?': 'Хороший вопрос! Всё зависит от сложности работы...',
      'Давай сразу к практике': 'Хорошо, покажу тебе на примере!',
      'default': 'Давай я покажу тебе на примере...'
    },
    scene3: {
      'Интересно, что дальше?': 'Сейчас проверим твои знания!',
      'Готов к испытанию': 'Отлично! Давай проверим что ты запомнил!',
      'default': 'Хорошо, продолжим обучение...'
    }
  };

  // СТРУКТУРА СЦЕН
  const scenes = {
    scene1: {
      steps: [
        { type: 'dialogue', text: 'Йо-хо-хо! Рад снова видеть тебя, агент! Присаживайся в центр зала.' },
        { type: 'dialogue', text: 'Сегодня я расскажу тебе, откуда же берутся деньги! Ты готов узнать секреты богатства?' },
        { type: 'dialogue', text: 'Видишь всех этих людей в таверне? Каждый из них РАБОТАЕТ и зарабатывает деньги своим трудом!' },
        { 
          type: 'choice', 
          question: 'О чём хочешь узнать?',
          choices: [
            'Расскажи про разные профессии',
            'Почему одни зарабатывают больше других?',
            'Давай сразу к практике'
          ]
        }
      ]
    },
    scene2: {
      steps: [
        { type: 'ai-response', fallbackKey: 'scene2' },
        { type: 'dialogue', text: 'Работа - это когда ты делаешь что-то полезное для других и получаешь за это ЗАРПЛАТУ!' },
        { type: 'dialogue', text: 'Бард играет музыку, повар готовит еду, солдат защищает город. Каждый делает своё дело!' },
        { type: 'dialogue', text: 'Чем сложнее работа и больше навыков нужно, тем больше платят! Врач учится много лет, поэтому его зарплата высокая.' },
        { 
          type: 'choice',
          question: 'Что думаешь?',
          choices: [
            'Интересно, что дальше?',
            'Готов к испытанию'
          ]
        }
      ]
    },
    scene3: {
      steps: [
        { type: 'ai-response', fallbackKey: 'scene3' },
        { type: 'dialogue', text: 'Хорошо! Давай проверим, сможешь ли ты угадать профессии людей в этой таверне!' },
        { type: 'dialogue', text: 'Я позову их по очереди, а ты попробуй понять, кто чем занимается. Готов?' }
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
        setCurrentScene('scene3');
        setSceneStep(0);
      } else if (currentScene === 'scene3') {
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

        {(currentScene === 'scene1' || currentScene === 'scene2' || currentScene === 'scene3') && (
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
                question: 'Что такое РАБОТА?',
                options: [
                  'Делать что-то полезное за деньги',
                  'Играть в игры',
                  'Спать весь день',
                  'Смотреть телевизор'
                ],
                correct: 0
              },
              {
                id: 2,
                question: 'Что такое ЗАРПЛАТА?',
                options: [
                  'Подарок от друга',
                  'Деньги за работу',
                  'Случайная находка',
                  'Выигрыш в лотерею'
                ],
                correct: 1
              },
              {
                id: 3,
                question: 'От чего зависит размер зарплаты?',
                options: [
                  'От дня недели',
                  'От погоды',
                  'От сложности работы и навыков',
                  'От удачи'
                ],
                correct: 2
              },
              {
                id: 4,
                question: 'Почему врачи получают много денег?',
                options: [
                  'Им повезло',
                  'Работа сложная, учатся много лет',
                  'Они волшебники',
                  'Просто так'
                ],
                correct: 1
              },
              {
                id: 5,
                question: 'Что такое ПРОФЕССИЯ?',
                options: [
                  'Хобби на выходных',
                  'Вид работы, которой занимаешься',
                  'Название игры',
                  'Место отдыха'
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
                { id: 3, correct: 2 },
                { id: 4, correct: 1 },
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
          <TavernCelebrationScene 
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
          💼
        </motion.div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          color: '#FFD700',
          marginBottom: '1rem',
          textShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
        }}>
          Где и как зарабатывают деньги?
        </h1>

        <p style={{
          fontSize: '1.375rem',
          color: '#FFF',
          marginBottom: '2rem',
          lineHeight: 1.7
        }}>
          Капитан Монети в центре таверны покажет тебе всех работников.<br/>
          Узнай про профессии и научись зарабатывать!
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
            <div style={{ color: '#FFD700', fontWeight: 800 }}>+300 XP</div>
          </div>
          <div style={{
            background: 'rgba(251, 191, 36, 0.2)',
            border: '2px solid #FFD700',
            borderRadius: '1rem',
            padding: '1rem 2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ color: '#FFD700', fontWeight: 800 }}>+250 монет</div>
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
          Начать урок
        </motion.button>

      </div>
    </motion.div>
  );
}

// ==========================================
// GAME SCENE (БЕЗ ВСПЫШКИ!)
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

    const prompt = `Ты Капитан Монети. Агент сказал: "${lastUserChoice}"
Ответь ОЧЕНЬ КОРОТКО (1 предложение, макс 10 слов) про работу и профессии.
НЕ используй эмодзи.`;

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
          backgroundImage: 'url(/uploads/taverna1.jpg)',
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
            src="/uploads/kapitan1.jpg"
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

      {/* ДИАЛОГ - БЕЗ ВСПЫШКИ! */}
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

            {/* ТЕКСТ - БЕЗ MOTION! */}
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
// MINI GAME: NPC В ПОЛНЫЙ РОСТ + РЕЧЕВОЙ ПУЗЫРЬ
// ==========================================
function MiniGameScene({ onComplete }) {
  const [currentNPC, setCurrentNPC] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const npcs = [
    {
      name: 'Бард',
      image: '/uploads/npc/bard.jpg',
      hint: 'Я играю музыку для гостей таверны и пою песни о героях!',
      options: ['Музыкант', 'Повар', 'Солдат'],
      correct: 0
    },
    {
      name: 'Повар',
      image: '/uploads/npc/cooker.jpg',
      hint: 'Я готовлю вкусную еду на кухне для всех посетителей!',
      options: ['Официант', 'Повар', 'Бард'],
      correct: 1
    },
    {
      name: 'Официант',
      image: '/uploads/npc/servant.jpg',
      hint: 'Я приношу еду и напитки гостям, обслуживаю столики!',
      options: ['Повар', 'Наёмник', 'Официант'],
      correct: 2
    },
    {
      name: 'Наёмник',
      image: '/uploads/npc/soldier.jpg',
      hint: 'Я защищаю караваны торговцев от разбойников в пустыне!',
      options: ['Наёмник', 'Музыкант', 'Повар'],
      correct: 0
    }
  ];

  const currentNPCData = npcs[currentNPC];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentNPCData.correct;
    if (isCorrect) setScore(score + 1);
    setShowResult(true);

    setTimeout(() => {
      if (currentNPC < npcs.length - 1) {
        setCurrentNPC(currentNPC + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        onComplete(score + (isCorrect ? 1 : 0));
      }
    }, 2000);
  };

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
          backgroundImage: 'url(/uploads/taverna1.jpg)',
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

      {/* СЧЁТЧИК ВВЕРХУ */}
      <div style={{
        position: 'absolute',
        top: '3%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          color: '#FFD700',
          marginBottom: '0.5rem',
          textShadow: '0 0 40px rgba(255, 215, 0, 1)'
        }}>
          Угадай профессию!
        </h2>
        <p style={{
          color: '#FFFFFF',
          fontSize: '1.25rem',
          fontWeight: 600,
          textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
        }}>
          Персонаж {currentNPC + 1} из {npcs.length} • Правильно: {score}
        </p>
      </div>

      {/* NPC В ПОЛНЫЙ РОСТ СЛЕВА */}
      <motion.div
        key={currentNPC}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          position: 'absolute',
          left: '5%',
          bottom: 0,
          height: '85%',
          width: '35%',
          zIndex: 2
        }}
      >
        <img
          src={currentNPCData.image}
          alt={currentNPCData.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            filter: 'drop-shadow(0 0 50px rgba(0, 0, 0, 1))'
          }}
        />
      </motion.div>

      {/* РЕЧЕВОЙ ПУЗЫРЬ */}
      <motion.div
        key={`bubble-${currentNPC}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        style={{
          position: 'absolute',
          left: '42%',
          top: '30%',
          maxWidth: '500px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '4px solid #FFD700',
          borderRadius: '2rem',
          padding: '2rem',
          zIndex: 10,
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* ХВОСТИК ПУЗЫРЯ */}
        <div style={{
          position: 'absolute',
          left: '-20px',
          top: '50%',
          width: 0,
          height: 0,
          borderTop: '15px solid transparent',
          borderBottom: '15px solid transparent',
          borderRight: '20px solid #FFD700'
        }} />
        <div style={{
          position: 'absolute',
          left: '-14px',
          top: '50%',
          width: 0,
          height: 0,
          borderTop: '12px solid transparent',
          borderBottom: '12px solid transparent',
          borderRight: '16px solid rgba(255, 255, 255, 0.95)'
        }} />

        <p style={{
          color: '#000',
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: 1.6,
          margin: 0,
          fontStyle: 'italic'
        }}>
          "{currentNPCData.hint}"
        </p>
      </motion.div>

      {/* ВАРИАНТЫ БЕЗ КАРТОЧЕК */}
      <div style={{
        position: 'absolute',
        top: '55%',
        right: '8%',
        width: '42%',
        zIndex: 10
      }}>
        <div style={{
          color: '#7ec8e3',
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
        }}>
          Кто это?
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {currentNPCData.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentNPCData.correct;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!showResult ? { x: -8 } : {}}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: showCorrect
                    ? '#10b981'
                    : showWrong
                      ? '#ef4444'
                      : '#ffffff',
                  fontSize: '1.5rem',
                  cursor: showResult ? 'default' : 'pointer',
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
                  color: showCorrect
                    ? '#10b981'
                    : showWrong
                      ? '#ef4444'
                      : index === 0 && !showResult
                        ? '#7ec8e3'
                        : '#999',
                  fontSize: '1.75rem',
                  fontWeight: 700
                }}>
                  {showCorrect ? '✓' : showWrong ? '✗' : index === 0 ? '▸' : '○'}
                </span>
                <span>{option}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

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
          backgroundImage: 'url(/uploads/taverna1.jpg)',
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
// CELEBRATION (БЕЗ ЭФФЕКТОВ, С АНИМИРОВАННЫМИ NPC СЗАДИ)
// ==========================================
function TavernCelebrationScene({ mission, miniGameScore, onExit }) {
  const [showCaptain, setShowCaptain] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showNPCs, setShowNPCs] = useState(false);
  const finalMessage = `Йо-хо-хо! Отлично, агент! Ты узнал где и как зарабатывают деньги! В мини-игре ты угадал ${miniGameScore} из 4 профессий! Следующий урок будет у ВЫХОДА таверны - там я покажу тебе настоящий БАЗАР и научу тратить деньги с умом!`;

  useEffect(() => {
    setTimeout(() => setShowCaptain(true), 500);
    setTimeout(() => setShowNPCs(true), 1500);

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
          backgroundImage: 'url(/uploads/taverna1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
          zIndex: 0
        }}
      />

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
            src="/uploads/kapitan1.jpg"
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

      {/* 3 NPC СЗАДИ С АНИМАЦИЕЙ ОБСУЖДЕНИЯ */}
      {showNPCs && (
        <>
          {/* БАРД */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              rotate: [-2, 2, -2]
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{
              position: 'absolute',
              right: '25%',
              bottom: '5%',
              height: '45%',
              width: '20%',
              zIndex: 20
            }}
          >
            <img
              src="/uploads/npc/bard.jpg"
              alt="Бард"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom',
                filter: 'brightness(0.8) drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))'
              }}
            />
            <motion.div
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              style={{
                position: 'absolute',
                top: '10%',
                right: '-10%',
                fontSize: '1.5rem'
              }}
            >
              💬
            </motion.div>
          </motion.div>

          {/* ПОВАР */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.3 },
              y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{
              position: 'absolute',
              right: '45%',
              bottom: '5%',
              height: '50%',
              width: '22%',
              zIndex: 19
            }}
          >
            <img
              src="/uploads/npc/cooker.jpg"
              alt="Повар"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom',
                filter: 'brightness(0.8) drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))'
              }}
            />
            <motion.div
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              style={{
                position: 'absolute',
                top: '8%',
                left: '-5%',
                fontSize: '1.5rem'
              }}
            >
              💬
            </motion.div>
          </motion.div>

          {/* НАЁМНИК */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              x: [-5, 5, -5]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.6 },
              x: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{
              position: 'absolute',
              right: '5%',
              bottom: '5%',
              height: '48%',
              width: '21%',
              zIndex: 18
            }}
          >
            <img
              src="/uploads/npc/soldier.jpg"
              alt="Наёмник"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom',
                filter: 'brightness(0.8) drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))'
              }}
            />
            <motion.div
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              style={{
                position: 'absolute',
                top: '5%',
                right: '-8%',
                fontSize: '1.5rem'
              }}
            >
              💬
            </motion.div>
          </motion.div>
        </>
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
            МИССИЯ 2/5 ЗАВЕРШЕНА!
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

export default FinanceMission2;