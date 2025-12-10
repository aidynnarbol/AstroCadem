// src/pages/missions/FinanceMission5.jsx
// МИССИЯ 5: ИНВЕСТИЦИИ И БОГАТСТВО - ФИНАЛЬНАЯ ЭПИЧНАЯ МИССИЯ!

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, Star, TrendingUp, DollarSign, Zap } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

// AI импорты
let AICharacterEngine = null;
let kapitanMonetiConfig = null;

try {
  AICharacterEngine = require('../../ai/AICharacterEngine').default;
  kapitanMonetiConfig = require('../../ai/characters/kapitanMoneti').kapitanMonetiConfig;
} catch (error) {
  console.warn('AI не найден');
}

function FinanceMission5() {
  const navigate = useNavigate();
  const { user, completeMission } = useUser();
  
  const [currentPhase, setCurrentPhase] = useState('intro');
  const [storyAct, setStoryAct] = useState(1); // 1, 2, 3
  const [storyBranch, setStoryBranch] = useState(null); // 'ships', 'trade', 'stocks'
  const [storyStep, setStoryStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [gameData, setGameData] = useState({
    round: 0,
    capital: 10000,
    history: []
  });
  const [aiEngine, setAiEngine] = useState(null);

  const missionConfig = {
    id: 'finance-5',
    title: 'Инвестиции и богатство',
    rewards: { xp: 700, coins: 600 }
  };

  // AI инициализация
  useEffect(() => {
    if (user && AICharacterEngine && kapitanMonetiConfig) {
      try {
        const engine = new AICharacterEngine(kapitanMonetiConfig, user, missionConfig);
        setAiEngine(engine);
      } catch (error) {
        console.error('AI ошибка:', error);
      }
    }
  }, [user]);

  // СТРУКТУРА ИСТОРИИ
  const storyContent = {
    // АКТ 1: ОТКРОВЕНИЕ (на вершине)
    act1: {
      intro: [
        'Йо-хо-хо! Агент, поднимайся сюда! На самую вершину планеты!',
        'Посмотри вниз... Видишь всю планету Финансов? Красота!',
        'Это последний урок. Самый важный из всех.',
        'Я расскажу тебе как стал по-настоящему БОГАТЫМ!',
        'Ты научился зарабатывать, тратить, копить...',
        'Но есть последняя тайна - как заставить деньги РАБОТАТЬ на тебя!',
        'Слушай внимательно. Это история моей жизни...'
      ],
      flashback: [
        'Много лет назад у меня был один корабль.',
        'Я заработал на нём деньги благодаря сбережениям.',
        'Плавал сам, торговал, зарабатывал монеты...',
        'Но однажды понял: я работаю ЗА деньги.',
        'А настоящие богачи заставляют деньги работать за НИХ!',
        'Я стоял перед выбором. Что сделать с накопленными деньгами?'
      ],
      choice: [
        'Купить второй корабль и нанять капитана',
        'Вложить в торговлю редкими специями',
        'Купить акции Галактической Корпорации'
      ]
    },

    // АКТ 2: ИСТОРИИ УСПЕХА (разные ветки)
    act2: {
      ships: {
        response: 'Умный выбор! Именно так я и поступил!',
        story: [
          'Я купил второй корабль. Нанял надёжного капитана.',
          'Теперь ДВА корабля приносили мне прибыль!',
          'Я не работал вдвое больше - корабли работали на меня!',
          'Это называется ПАССИВНЫЙ ДОХОД - деньги идут пока ты спишь!',
          'Прибыль от второго корабля я вложил в третий...',
          'Потом в четвёртый... Пятый... Десятый!',
          'Через несколько лет у меня был целый ФЛОТ!',
          'Я стал владельцем бизнеса. Деньги работали сами!'
        ],
        choice2: [
          'Вложить всю прибыль в новые корабли',
          'Половину в корабли, половину откладывать',
          'Диверсифицировать - вложить в разное'
        ],
        response2: 'Мудрое решение о диверсификации!',
        ending: [
          'Я научился не класть все яйца в одну корзину!',
          'Часть денег - в корабли, часть - в другое.',
          'Так мой капитал рос быстрее и безопаснее!',
          'Вот секрет: ДЕНЬГИ должны РАБОТАТЬ!'
        ]
      },

      trade: {
        response: 'Рискованно, но прибыльно! Я тоже так думал!',
        story: [
          'Я вложил деньги в торговлю специями с далёких планет.',
          'Редкие специи стоили копейки там, но ЦЕЛОЕ состояние здесь!',
          'Первая партия принесла 300% прибыли!',
          'Но был риск - корабль мог не вернуться...',
          'Я понял главное правило: БОЛЬШЕ РИСК = БОЛЬШЕ ПРИБЫЛЬ!',
          'Но нужно управлять рисками мудро.',
          'Я не вкладывал все деньги в одну партию товара.',
          'Разные товары, разные маршруты, разные корабли!'
        ],
        choice2: [
          'Продолжать торговать только специями',
          'Расширить ассортимент товаров',
          'Инвестировать в корабли и специи'
        ],
        response2: 'Диверсификация - ключ к успеху!',
        ending: [
          'Я расширил торговлю на разные товары!',
          'Если один товар падал в цене - другой рос!',
          'Это называется ДИВЕРСИФИКАЦИЯ - не держи всё в одном!',
          'Так я минимизировал риски и рос быстрее!'
        ]
      },

      stocks: {
        response: 'Самое мудрое решение! Путь настоящих инвесторов!',
        story: [
          'Я купил акции Галактической Корпорации.',
          'Акция - это часть компании. Я стал совладельцем!',
          'Компания росла и богатела - мои акции дорожали!',
          'Плюс компания платила ДИВИДЕНДЫ - часть прибыли!',
          'Я ничего не делал - компания работала за меня!',
          'Сначала я заработал 20%... Потом 50%... Потом 200%!',
          'Через годы мои акции стоили в 10 раз больше!',
          'Это ДОЛГОСРОЧНЫЕ инвестиции - терпение приносит богатство!'
        ],
        choice2: [
          'Продать акции и забрать прибыль',
          'Держать акции и получать дивиденды',
          'Купить акции других компаний тоже'
        ],
        response2: 'Портфель из разных акций - мудро!',
        ending: [
          'Я создал ПОРТФЕЛЬ инвестиций!',
          'Акции разных компаний, разных отраслей.',
          'Если одна падает - другая растёт!',
          'Баланс риска и прибыли - вот секрет!',
          'Деньги работают, множатся, приносят богатство!'
        ]
      }
    },

    // АКТ 3: ИСПЫТАНИЕ
    act3: [
      'Вот так я стал богатым, агент!',
      'Не работой ЗА деньги, а работой ДЕНЕГ для меня!',
      'Теперь твоя очередь понять этот секрет!',
      'Представь: у тебя есть 10,000 монет.',
      'Цель - превратить их в 50,000!',
      'Сначала посмотри урок от экспертов...',
      'А потом... Покажи что ты настоящий ИНВЕСТОР!'
    ]
  };

  // ИНВЕСТИЦИОННЫЕ ВОЗМОЖНОСТИ ДЛЯ ИГРЫ
  const investmentOptions = [
    // Раунд 1
    [
      { name: '🏦 Облигации', risk: 'low', return: 0.10, chance: 0.95, desc: 'Безопасно +10%' },
      { name: '📈 Акции TechCorp', risk: 'medium', return: 0.25, chance: 0.70, desc: 'Средний риск ±25%' },
      { name: '💎 Криптовалюта', risk: 'high', return: 0.50, chance: 0.50, desc: 'Высокий риск ±50%' }
    ],
    // Раунд 2
    [
      { name: '🏠 Недвижимость', risk: 'low', return: 0.15, chance: 0.90, desc: 'Надёжно +15%' },
      { name: '🚀 Акции SpaceX', risk: 'medium', return: 0.30, chance: 0.65, desc: 'Рост ±30%' },
      { name: '🎮 Стартап игр', risk: 'high', return: 0.60, chance: 0.45, desc: 'Риск ±60%' }
    ],
    // Раунд 3
    [
      { name: '💰 Золото', risk: 'low', return: 0.08, chance: 0.98, desc: 'Стабильно +8%' },
      { name: '⚡ Энергетика', risk: 'medium', return: 0.20, chance: 0.75, desc: 'Умеренно ±20%' },
      { name: '🌟 NFT коллекция', risk: 'high', return: 0.70, chance: 0.40, desc: 'Риск ±70%' }
    ],
    // Раунд 4
    [
      { name: '🏦 Банковский вклад', risk: 'low', return: 0.12, chance: 1.00, desc: 'Гарантия +12%' },
      { name: '🍎 Акции Apple', risk: 'medium', return: 0.28, chance: 0.68, desc: 'Рост ±28%' },
      { name: '🚗 Tesla акции', risk: 'high', return: 0.55, chance: 0.48, desc: 'Волатильно ±55%' }
    ],
    // Раунд 5
    [
      { name: '📊 Индексный фонд', risk: 'low', return: 0.14, chance: 0.92, desc: 'Диверсифицировано +14%' },
      { name: '🏭 Промышленность', risk: 'medium', return: 0.22, chance: 0.72, desc: 'Средний риск ±22%' },
      { name: '🎬 Кино стартап', risk: 'high', return: 0.65, chance: 0.42, desc: 'Высокий риск ±65%' }
    ],
    // Раунд 6
    [
      { name: '🌾 Сельское хозяйство', risk: 'low', return: 0.11, chance: 0.94, desc: 'Стабильно +11%' },
      { name: '💊 Фарма компании', risk: 'medium', return: 0.26, chance: 0.69, desc: 'Умеренно ±26%' },
      { name: '🤖 AI стартап', risk: 'high', return: 0.80, chance: 0.38, desc: 'Очень рискованно ±80%' }
    ],
    // Раунд 7
    [
      { name: '💼 Корпоративные облигации', risk: 'low', return: 0.13, chance: 0.96, desc: 'Надёжно +13%' },
      { name: '🏨 Гостиничный бизнес', risk: 'medium', return: 0.24, chance: 0.71, desc: 'Средний ±24%' },
      { name: '🌐 Метавселенная', risk: 'high', return: 0.75, chance: 0.35, desc: 'Экстремально ±75%' }
    ],
    // Раунд 8
    [
      { name: '🏛️ Государственные облигации', risk: 'low', return: 0.09, chance: 1.00, desc: 'Безопасно +9%' },
      { name: '📱 Технологии 5G', risk: 'medium', return: 0.27, chance: 0.67, desc: 'Перспективно ±27%' },
      { name: '🎯 Венчурный фонд', risk: 'high', return: 0.85, chance: 0.33, desc: 'Максимум риска ±85%' }
    ],
    // Раунд 9
    [
      { name: '💵 Валюта евро', risk: 'low', return: 0.10, chance: 0.93, desc: 'Стабильно +10%' },
      { name: '🔋 Зелёная энергия', risk: 'medium', return: 0.29, chance: 0.66, desc: 'Рост ±29%' },
      { name: '🎰 Казино бизнес', risk: 'high', return: 0.90, chance: 0.30, desc: 'Азарт ±90%' }
    ],
    // Раунд 10
    [
      { name: '📈 Диверсифицированный ETF', risk: 'low', return: 0.16, chance: 0.91, desc: 'Сбалансированно +16%' },
      { name: '🌍 Глобальный фонд', risk: 'medium', return: 0.31, chance: 0.64, desc: 'Международный ±31%' },
      { name: '🚀 Космический туризм', risk: 'high', return: 1.00, chance: 0.25, desc: 'Максимальный риск ±100%' }
    ]
  ];

  const handleIntroComplete = () => {
    setCurrentPhase('story');
    setStoryAct(1);
    setStoryStep(0);
  };

  const handleFirstChoice = (choice) => {
    console.log('=== ВЫБОР 1 ===', choice);
    
    if (choice.includes('корабль')) {
      setStoryBranch('ships');
    } else if (choice.includes('специ')) {
      setStoryBranch('trade');
    } else {
      setStoryBranch('stocks');
    }
    
    setUserChoices([choice]);
    setStoryAct(2);
    setStoryStep(0);
  };

  const handleSecondChoice = (choice) => {
    console.log('=== ВЫБОР 2 ===', choice);
    setUserChoices([...userChoices, choice]);
    setStoryStep(0);
  };

  const handleStoryComplete = () => {
    if (storyAct === 1) {
      // Не должно сюда попасть, т.к. после Акта 1 идёт выбор
      console.log('Act 1 complete');
    } else if (storyAct === 2) {
      console.log('Act 2 complete, переход на Act 3');
      setStoryAct(3);
      setStoryStep(0);
    } else if (storyAct === 3) {
      console.log('Act 3 complete, переход на видео');
      setCurrentPhase('video');
    }
  };

  const handleVideoComplete = () => {
    console.log('Видео complete, переход на игру');
    setCurrentPhase('game');
    setGameData({ round: 1, capital: 10000, history: [] });
  };

  const handleInvestmentChoice = (option) => {
    const success = Math.random() < option.chance;
    const multiplier = success ? (1 + option.return) : (1 - option.return);
    const newCapital = Math.round(gameData.capital * multiplier);
    const profit = newCapital - gameData.capital;

    const result = {
      round: gameData.round,
      option: option.name,
      invested: gameData.capital,
      profit: profit,
      newCapital: newCapital,
      success: success
    };

    const newHistory = [...gameData.history, result];

    if (gameData.round < 10) {
      setGameData({
        round: gameData.round + 1,
        capital: newCapital,
        history: newHistory
      });
    } else {
      // Игра закончена
      setGameData({
        ...gameData,
        capital: newCapital,
        history: newHistory
      });
      
      setTimeout(() => {
        completeMission(
          missionConfig.id,
          missionConfig.rewards.xp,
          missionConfig.rewards.coins,
          'finance'
        );
        setCurrentPhase('completion');
      }, 3000);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#000'
    }}>
      <AnimatePresence mode="wait">
        
        {currentPhase === 'intro' && (
          <IntroScene
            key="intro"
            mission={missionConfig}
            onStart={handleIntroComplete}
            onExit={() => navigate('/planet/finance')}
          />
        )}

        {currentPhase === 'story' && (
          <StoryScene
            key={`story-act${storyAct}-${storyStep}`}
            content={storyContent}
            act={storyAct}
            branch={storyBranch}
            step={storyStep}
            onStepNext={() => setStoryStep(s => s + 1)}
            onFirstChoice={handleFirstChoice}
            onSecondChoice={handleSecondChoice}
            onComplete={handleStoryComplete}
          />
        )}

        {currentPhase === 'video' && (
          <VideoScene
            key="video"
            onComplete={handleVideoComplete}
          />
        )}

        {currentPhase === 'game' && (
          <GameScene
            key="game"
            gameData={gameData}
            options={investmentOptions[gameData.round - 1] || investmentOptions[0]}
            onChoice={handleInvestmentChoice}
          />
        )}

        {currentPhase === 'completion' && (
          <CompletionScene
            key="completion"
            mission={missionConfig}
            finalCapital={gameData.capital}
            onExit={() => navigate('/planet/finance')}
          />
        )}

      </AnimatePresence>
    </div>
  );
}

// ==========================================
// INTRO SCENE
// ==========================================
function IntroScene({ mission, onStart, onExit }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* ЗВЁЗДЫ ФОНА */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent)',
        backgroundSize: '200px 200px',
        opacity: 0.3
      }} />

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
        maxWidth: '900px',
        background: 'rgba(0, 0, 0, 0.9)',
        border: '5px solid #FFD700',
        borderRadius: '2rem',
        padding: '3.5rem',
        textAlign: 'center',
        boxShadow: '0 0 100px rgba(255, 215, 0, 0.6)',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* ЭПИЧНАЯ ИКОНКА */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ fontSize: '8rem', marginBottom: '1.5rem' }}
        >
          🏆
        </motion.div>

        {/* ФИНАЛЬНАЯ МИССИЯ */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: '#ef4444',
            fontSize: '1.5rem',
            fontWeight: 900,
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            textShadow: '0 0 20px rgba(239, 68, 68, 1)'
          }}
        >
          ⚡ ФИНАЛЬНАЯ МИССИЯ ⚡
        </motion.div>

        <h1 style={{
          fontSize: '4rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1.5rem',
          textShadow: '0 0 50px rgba(255, 215, 0, 1)',
          lineHeight: 1.2
        }}>
          Инвестиции и богатство
        </h1>

        <p style={{
          fontSize: '1.5rem',
          color: '#FFF',
          marginBottom: '2.5rem',
          lineHeight: 1.8,
          fontWeight: 600
        }}>
          Капитан раскрывает последнюю тайну:<br/>
          Как заставить деньги работать на ТЕБЯ!<br/>
          <span style={{ color: '#FFD700', fontSize: '1.75rem' }}>
            Стань настоящим инвестором!
          </span>
        </p>

        {/* НАГРАДЫ - ЭПИЧНЫЕ */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          marginBottom: '3rem'
        }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.1))',
              border: '3px solid #FFD700',
              borderRadius: '1.5rem',
              padding: '1.5rem 2.5rem',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ color: '#FFD700', fontWeight: 900, fontSize: '2rem' }}>+{mission.rewards.xp}</div>
            <div style={{ color: '#fcd34d', fontSize: '0.875rem' }}>XP</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.1))',
              border: '3px solid #FFD700',
              borderRadius: '1.5rem',
              padding: '1.5rem 2.5rem',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ color: '#FFD700', fontWeight: 900, fontSize: '2rem' }}>+{mission.rewards.coins}</div>
            <div style={{ color: '#fcd34d', fontSize: '0.875rem' }}>монет</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(147, 51, 234, 0.1))',
              border: '3px solid #a855f7',
              borderRadius: '1.5rem',
              padding: '1.5rem 2.5rem',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎖️</div>
            <div style={{ color: '#a855f7', fontWeight: 900, fontSize: '1.25rem' }}>МАСТЕР</div>
            <div style={{ color: '#c084fc', fontSize: '0.875rem' }}>ФИНАНСОВ</div>
          </motion.div>
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 60px rgba(255, 215, 0, 1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            border: 'none',
            borderRadius: '1.5rem',
            padding: '1.75rem 5rem',
            color: '#000',
            fontSize: '2rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 0 50px rgba(255, 215, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            margin: '0 auto',
            textTransform: 'uppercase'
          }}
        >
          <Sparkles size={32} />
          Начать финал!
          <TrendingUp size={32} />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ==========================================
// STORY SCENE
// ==========================================
function StoryScene({ content, act, branch, step, onStepNext, onFirstChoice, onSecondChoice, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentContent, setCurrentContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChoice, setShowChoice] = useState(false);
  const [choiceOptions, setChoiceOptions] = useState([]);
  const [choiceType, setChoiceType] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  // Определяем фон и персонажа по акту
  const getSceneAssets = () => {
    if (act === 1 && currentIndex < 7) {
      return {
        bg: '/uploads/sensei/kapitan5.jpg', // Вершина с капитаном
        character: null // Капитан уже на фоне
      };
    } else if (act === 1 && currentIndex >= 7) {
      return {
        bg: '/uploads/lock/port.jpg', // Флешбек - порт
        character: '/uploads/sensei/kapitan7.jpg' // Капитан вспоминает
      };
    } else if (act === 2) {
      return {
        bg: '/uploads/lock/port.jpg', // История успеха
        character: '/uploads/sensei/kapitan7.jpg'
      };
    } else { // act === 3
      return {
        bg: '/uploads/sensei/kapitan5.jpg', // Снова на вершине
        character: null
      };
    }
  };

  const { bg, character } = getSceneAssets();

  // Определяем контент
  useEffect(() => {
    console.log(`=== ACT ${act} ===`);
    
    if (act === 1) {
      if (step === 0) {
        setCurrentContent([...content.act1.intro, ...content.act1.flashback]);
        setCurrentIndex(0);
      }
    } else if (act === 2) {
      const branchContent = content.act2[branch];
      if (step === 0) {
        setCurrentContent([
          branchContent.response,
          ...branchContent.story
        ]);
        setCurrentIndex(0);
      } else if (step === 1) {
        setCurrentContent([
          branchContent.response2,
          ...branchContent.ending
        ]);
        setCurrentIndex(0);
      }
    } else if (act === 3) {
      setCurrentContent(content.act3);
      setCurrentIndex(0);
    }
  }, [act, branch, step, content]);

  // Печатание
  useEffect(() => {
    if (!currentContent[currentIndex]) return;

    const text = currentContent[currentIndex];
    setIsTyping(true);
    setDisplayedText('');
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentContent, currentIndex]);

  const handleClick = () => {
    if (isTyping) {
      setDisplayedText(currentContent[currentIndex]);
      setIsTyping(false);
      return;
    }

    if (currentIndex < currentContent.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      // Контент закончился
      if (act === 1 && step === 0) {
        // Показать первый выбор
        setShowChoice(true);
        setChoiceType('first');
        setChoiceOptions(content.act1.choice);
      } else if (act === 2 && step === 0) {
        // Показать второй выбор
        setShowChoice(true);
        setChoiceType('second');
        setChoiceOptions(content.act2[branch].choice2);
      } else {
        onComplete();
      }
    }
  };

  const handleChoiceClick = (choice) => {
    setShowChoice(false);
    setIsExiting(true);
    
    setTimeout(() => {
      if (choiceType === 'first') {
        onFirstChoice(choice);
      } else {
        onSecondChoice(choice);
        onStepNext();
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: '#000'
      }}
    >
      {/* ФОН */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.5)'
      }} />

      {/* ВИНЬЕТКА */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.85) 90%)',
        zIndex: 1
      }} />

      {/* ПЕРСОНАЖ (если есть) */}
      {character && !showChoice && (
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{
            position: 'absolute',
            left: '2%',
            bottom: 0,
            height: '75%',
            width: '38%',
            zIndex: 2
          }}
        >
          <img
            src={character}
            alt="Капитан"
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
      {!showChoice && (
        <div
          onClick={handleClick}
          style={{
            position: 'absolute',
            inset: 0,
            cursor: 'pointer',
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
            <div style={{
              color: '#FFD700',
              fontSize: '1.5rem',
              fontWeight: 900,
              marginBottom: '1.25rem',
              textShadow: '0 0 20px rgba(0, 0, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8)'
            }}>
              Капитан Монети
            </div>

            <p style={{
              color: '#FFFFFF',
              fontSize: '2rem',
              lineHeight: 1.8,
              margin: 0,
              fontWeight: 700,
              textShadow: '0 0 30px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 1)'
            }}>
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              )}
            </p>

            {!isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: '#FFD700',
                  fontSize: '1.125rem',
                  marginTop: '1.5rem',
                  fontWeight: 600,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
                }}
              >
                ✨ Нажми чтобы продолжить...
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ВЫБОР */}
      {showChoice && (
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
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '2rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
            }}
          >
            {choiceType === 'first' ? 'Что я сделал с деньгами?' : 'Как я поступил дальше?'}
          </motion.div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {choiceOptions.map((choice, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ x: -10, borderColor: 'rgba(126, 200, 227, 0.8)' }}
                onClick={() => handleChoiceClick(choice)}
                style={{
                  background: 'transparent',
                  border: '2px solid rgba(126, 200, 227, 0.4)',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '1rem 1.5rem',
                  fontWeight: 600,
                  textShadow: '0 2px 15px rgba(0, 0, 0, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.3s'
                }}
              >
                <span style={{ 
                  color: i === 0 ? '#7ec8e3' : '#999',
                  fontSize: '2rem',
                  fontWeight: 900
                }}>
                  {i === 0 ? '▸' : '✖'}
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
// VIDEO SCENE
// ==========================================
function VideoScene({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/uploads/lock/birja.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.3)'
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.95) 100%)'
      }} />

      {/* КАПИТАН МАЛЕНЬКИЙ */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          position: 'absolute',
          left: '2%',
          bottom: '3%',
          height: '35%',
          width: '15%',
          zIndex: 5
        }}
      >
        <img
          src="/uploads/sensei/kapitan7.jpg"
          alt="Капитан"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            opacity: 0.6
          }}
        />
      </motion.div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '0 5%'
      }}>
        
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            fontWeight: 900,
            marginBottom: '2rem',
            textAlign: 'center',
            filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))'
          }}
        >
          💡 Урок инвестора 💡
        </motion.h2>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            boxShadow: '0 0 80px rgba(255, 215, 0, 0.6)',
            marginBottom: '2rem'
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Инвестиции"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none',
            borderRadius: '1rem',
            padding: '1.25rem 3.5rem',
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <TrendingUp size={24} />
          К испытанию инвестора! →
        </motion.button>
      </div>
    </motion.div>
  );
}

// ==========================================
// GAME SCENE - СИМУЛЯТОР ИНВЕСТОРА
// ==========================================
function GameScene({ gameData, options, onChoice }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleChoice = (option) => {
    setSelectedOption(option);
    
    // Симуляция результата
    const success = Math.random() < option.chance;
    const multiplier = success ? (1 + option.return) : (1 - option.return);
    const profit = Math.round(gameData.capital * option.return);
    
    setResult({
      success,
      profit: success ? profit : -profit,
      message: success 
        ? getSuccessMessage(option.risk)
        : getFailMessage(option.risk)
    });
    
    setShowResult(true);
    
    setTimeout(() => {
      onChoice(option);
      setSelectedOption(null);
      setShowResult(false);
      setResult(null);
    }, 3000);
  };

  const getSuccessMessage = (risk) => {
    if (risk === 'low') return 'Йо-хо-хо! Надёжный выбор! Стабильная прибыль!';
    if (risk === 'medium') return 'Отличное решение! Баланс риска и прибыли!';
    return 'НЕВЕРОЯТНО! Рискованно, но прибыльно! Храбрец!';
  };

  const getFailMessage = (risk) => {
    if (risk === 'low') return 'Хм, даже надёжное может упасть. Не переживай!';
    if (risk === 'medium') return 'Бывает! Средний риск есть средний риск!';
    return 'Увы! Высокий риск оправдался. Учись на ошибках!';
  };

  const progressPercent = (gameData.capital / 50000) * 100;
  const isWinning = gameData.capital >= 50000;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/uploads/lock/birja.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.3)'
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.95) 100%)'
      }} />

      {/* КАПИТАН СЛЕВА */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          position: 'absolute',
          left: '2%',
          bottom: '3%',
          height: '40%',
          width: '18%',
          zIndex: 5
        }}
      >
        <img
          src="/uploads/sensei/kapitan7.jpg"
          alt="Капитан"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            opacity: 0.7
          }}
        />
      </motion.div>

      {/* СОВЕТНИК СПРАВА */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          position: 'absolute',
          right: '2%',
          bottom: '3%',
          height: '40%',
          width: '18%',
          zIndex: 5
        }}
      >
        <img
          src="/uploads/npc/sovetnik.jpg"
          alt="Советник"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom right',
            opacity: 0.7
          }}
        />
      </motion.div>

      {/* ИГРА ПО ЦЕНТРУ */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '900px',
        padding: '0 2rem'
      }}>
        
        {/* СТАТУС БАР */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: '3px solid #FFD700',
            borderRadius: '1.5rem',
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <div>
              <span style={{ color: '#7ec8e3', fontSize: '1.2rem', fontWeight: 700 }}>
                РАУНД {gameData.round}/10
              </span>
            </div>
            <div>
              <span style={{ color: '#FFD700', fontSize: '1.8rem', fontWeight: 900 }}>
                💰 {gameData.capital.toLocaleString()}
              </span>
            </div>
            <div>
              <span style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: 700 }}>
                🎯 Цель: 50,000
              </span>
            </div>
          </div>

          {/* ПРОГРЕСС БАР */}
          <div style={{
            width: '100%',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressPercent, 100)}%` }}
              style={{
                height: '100%',
                background: isWinning 
                  ? 'linear-gradient(90deg, #10b981, #059669)'
                  : 'linear-gradient(90deg, #FFD700, #FFA500)',
                borderRadius: '10px'
              }}
            />
          </div>
        </motion.div>

        {/* РЕЗУЛЬТАТ (если есть) */}
        {showResult && result && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: result.success 
                ? 'rgba(16, 185, 129, 0.2)'
                : 'rgba(239, 68, 68, 0.2)',
              border: `3px solid ${result.success ? '#10b981' : '#ef4444'}`,
              borderRadius: '1.5rem',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              {result.success ? '✅' : '❌'}
            </div>
            <div style={{
              color: result.success ? '#10b981' : '#ef4444',
              fontSize: '2rem',
              fontWeight: 900,
              marginBottom: '0.5rem'
            }}>
              {result.profit > 0 ? '+' : ''}{result.profit.toLocaleString()} 💰
            </div>
            <div style={{
              color: '#FFF',
              fontSize: '1.2rem',
              fontWeight: 600
            }}>
              {result.message}
            </div>
          </motion.div>
        )}

        {/* ЗАГОЛОВОК */}
        {!showResult && (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: '#FFD700',
              fontSize: '2rem',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '2rem',
              textShadow: '0 0 20px rgba(255, 215, 0, 0.8)'
            }}
          >
            Выбери инвестицию:
          </motion.h3>
        )}

        {/* ОПЦИИ ИНВЕСТИЦИЙ */}
        {!showResult && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {options.map((option, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice(option)}
                style={{
                  background: option.risk === 'low' 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))'
                    : option.risk === 'medium'
                    ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05))'
                    : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))',
                  border: `3px solid ${
                    option.risk === 'low' ? '#10b981'
                    : option.risk === 'medium' ? '#fbbf24'
                    : '#ef4444'
                  }`,
                  borderRadius: '1.5rem',
                  padding: '1.5rem 1rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '0.5rem'
                }}>
                  {option.name.split(' ')[0]}
                </div>
                <div style={{
                  color: '#FFF',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  {option.name.split(' ').slice(1).join(' ')}
                </div>
                <div style={{
                  color: option.risk === 'low' ? '#10b981'
                    : option.risk === 'medium' ? '#fbbf24'
                    : '#ef4444',
                  fontSize: '1.3rem',
                  fontWeight: 900,
                  marginBottom: '0.25rem'
                }}>
                  {option.desc}
                </div>
                <div style={{
                  color: '#999',
                  fontSize: '0.875rem'
                }}>
                  Шанс: {Math.round(option.chance * 100)}%
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* ПОДСКАЗКА */}
      {!showResult && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            left: '2%',
            bottom: '1%',
            color: '#FFD700',
            fontSize: '0.875rem',
            maxWidth: '200px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 1)',
            zIndex: 6
          }}
        >
          💡 Думай стратегически!
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          position: 'absolute',
          right: '2%',
          bottom: '1%',
          color: '#7ec8e3',
          fontSize: '0.875rem',
          maxWidth: '200px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 1)',
          zIndex: 6,
          textAlign: 'right'
        }}
      >
        📊 Баланс риска!
      </motion.p>
    </motion.div>
  );
}

// ==========================================
// COMPLETION SCENE - ЭПИЧНЫЙ ФИНАЛ
// ==========================================
function CompletionScene({ mission, finalCapital, onExit }) {
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  const messages = [
    'НЕВЕРОЯТНО! Ты справился, агент!',
    `Твой капитал: ${finalCapital.toLocaleString()} монет! ${finalCapital >= 50000 ? 'Цель достигнута!' : 'Молодец, учишься!'}`,
    'Ты прошёл ВСЕ 5 миссий планеты Финансов!',
    'Научился ЗАРАБАТЫВАТЬ деньги честным трудом!',
    'Научился ТРАТИТЬ с умом, отличать нужды от желаний!',
    'Научился КОПИТЬ и достигать больших целей!',
    'И теперь знаешь как ИНВЕСТИРОВАТЬ!',
    'Йо-хо-хо! Я ГОРЖУСЬ тобой!',
    'Ты теперь не просто агент...',
    'Ты МАСТЕР ФИНАНСОВ! Настоящий эксперт!',
    'Помни эти уроки всю жизнь!',
    'Работай за деньги, но и пусть деньги работают за тебя!',
    'Трать с умом, копи на мечту, инвестируй в будущее!',
    'Мы прощаемся, но знания остаются с тобой навсегда!',
    'Удачи тебе, юный финансовый гений! ДО НОВЫХ ВСТРЕЧ!'
  ];

  useEffect(() => {
    if (step >= messages.length) return;

    const text = messages[step];
    setDisplayedText('');
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setStep(s => s + 1);
        }, step === messages.length - 1 ? 2000 : 1500);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: '#000'
      }}
    >
      {/* ФОН ПЛАНЕТЫ */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/uploads/lock/planet.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.6)'
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 10%, rgba(0,0,0,0.8) 80%)'
      }} />

      {/* КОНФЕТТИ ЭФФЕКТ */}
      {step > 5 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #FFD700 2px, transparent 2px)',
          backgroundSize: '50px 50px',
          animation: 'fall 3s linear infinite',
          opacity: 0.3,
          zIndex: 2
        }} />
      )}

      {/* КАПИТАН */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, type: 'spring' }}
        style={{
          position: 'absolute',
          left: '5%',
          bottom: 0,
          height: '65%',
          width: '28%',
          zIndex: 50
        }}
      >
        <img
          src="/uploads/sensei/kapitan6.jpg"
          alt="Капитан"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            filter: 'drop-shadow(0 0 80px rgba(255, 215, 0, 1))'
          }}
        />
      </motion.div>

      {/* ТЕКСТ КАПИТАНА */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        right: '5%',
        zIndex: 60
      }}>
        <p style={{
          color: '#FFFFFF',
          fontSize: '2rem',
          fontWeight: 700,
          textShadow: '0 0 40px rgba(0, 0, 0, 1), 0 4px 25px rgba(0, 0, 0, 1)',
          lineHeight: 1.9,
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {displayedText}
          {step < messages.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              _
            </motion.span>
          )}
        </p>
      </div>

      {/* НАГРАДЫ */}
      {step >= messages.length && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{
            position: 'absolute',
            top: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.95)',
            border: '5px solid #FFD700',
            borderRadius: '2.5rem',
            padding: '2.5rem 3rem',
            zIndex: 80,
            boxShadow: '0 0 100px rgba(255, 215, 0, 1)',
            textAlign: 'center'
          }}
        >
          <Trophy size={80} color="#FFD700" style={{ marginBottom: '1rem' }} />
          <h3 style={{
            color: '#FFD700',
            fontSize: '2.5rem',
            fontWeight: 900,
            margin: 0,
            marginBottom: '1.5rem',
            textShadow: '0 0 30px rgba(255, 215, 0, 1)'
          }}>
            ВСЕ 5 МИССИЙ ЗАВЕРШЕНЫ!
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(251, 191, 36, 0.2)',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              border: '3px solid #fbbf24'
            }}>
              <Star size={50} color="#fbbf24" />
              <div style={{ color: '#fcd34d', fontSize: '0.875rem', marginTop: '0.5rem' }}>XP</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24' }}>
                +{mission.rewards.xp}
              </div>
            </div>
            <div style={{
              background: 'rgba(251, 191, 36, 0.2)',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              border: '3px solid #fbbf24'
            }}>
              <div style={{ fontSize: '3rem' }}>💰</div>
              <div style={{ color: '#fcd34d', fontSize: '0.875rem', marginTop: '0.5rem' }}>Монеты</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24' }}>
                +{mission.rewards.coins}
              </div>
            </div>
            <div style={{
              background: 'rgba(147, 51, 234, 0.2)',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              border: '3px solid #a855f7'
            }}>
              <div style={{ fontSize: '3rem' }}>🎖️</div>
              <div style={{ color: '#c084fc', fontSize: '0.875rem', marginTop: '0.5rem' }}>БЕЙДЖ</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#a855f7' }}>
                МАСТЕР<br/>ФИНАНСОВ
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(16, 185, 129, 1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onExit}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              borderRadius: '1.5rem',
              padding: '1.5rem 4rem',
              color: 'white',
              fontSize: '1.75rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 0 50px rgba(16, 185, 129, 0.7)',
              width: '100%'
            }}
          >
            🎉 ЗАВЕРШИТЬ ОБУЧЕНИЕ 🎉
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default FinanceMission5;