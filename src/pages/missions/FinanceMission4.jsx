// src/pages/missions/FinanceMission4.jsx
// МИССИЯ 4: СБЕРЕЖЕНИЯ И НАКОПЛЕНИЯ
// ПОЛНОСТЬЮ ПЕРЕПИСАНО С НУЛЯ!

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, Star, Play } from 'lucide-react';
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

function FinanceMission4() {
  const navigate = useNavigate();
  const { user, completeMission } = useUser();
  
  const [currentPhase, setCurrentPhase] = useState('intro'); // intro, story, video, practice, completion
  const [storyBranch, setStoryBranch] = useState(null); // 'spend', 'save', 'balance'
  const [storyStep, setStoryStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [aiEngine, setAiEngine] = useState(null);
  const [practiceAnswers, setPracticeAnswers] = useState({ monthly: '', months: '' });
  const [practiceResult, setPracticeResult] = useState(null);

  const missionConfig = {
    id: 'finance-4',
    title: 'Сбережения и накопления',
    rewards: { xp: 400, coins: 350 }
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

  // СТРУКТУРА ИСТОРИЙ
  const storyContent = {
    intro: [
      'Йо-хо-хо! Агент, идём со мной в банк планеты!',
      'Эта дорога... По ней я шёл много лет назад, когда был молод и беден.',
      'Я работал простым матросом. Зарплата - всего 100 монет в месяц.',
      'Но у меня была МЕЧТА! Свой корабль за 5000 монет!',
      'Казалось невозможным... Товарищи говорили: трать деньги сейчас на радость!',
      'Но я встретил мудрого торговца. Он задал мне вопрос, изменивший мою жизнь...'
    ],
    
    // ВЕТКА: ТРАТИТЬ
    spend: {
      choice1Response: 'Многие так думают! И я тоже так думал в молодости...',
      story: [
        'Я выбрал путь удовольствий! Тратил ВСЁ что зарабатывал!',
        'Лучшая еда в тавернах! Подарки друзьям! Развлечения каждый вечер!',
        'Было весело... Но через год в кармане - НИ МОНЕТЫ!',
        'Корабль так и оставался недостижимой мечтой!',
        'Я понял: если тратить ВСЁ - большую цель не достичь никогда!'
      ],
      choice2Options: [
        'Перестать тратить совсем и копить всё',
        'СНАЧАЛА откладывать, ПОТОМ тратить остальное',
        'Найти дополнительную работу'
      ],
      choice2Response: 'Именно! Золотое правило накоплений!',
      ending: [
        'Я начал откладывать СНАЧАЛА 50 монет, ПОТОМ тратить 50!',
        'Через год - 1000 монет! Через два года - 2000!',
        'Через 5 лет я купил СВОЙ корабль!',
        'Вот он стоит в порту - моя гордость!'
      ]
    },
    
    // ВЕТКА: КОПИТЬ
    save: {
      choice1Response: 'Мудрый ответ! Именно это сказал мне торговец!',
      story: [
        'Он рассказал историю про двух пиратов - Джека и Билла.',
        'Оба работали матросами. Одинаковая зарплата.',
        'Джек тратил ВСЁ сразу на веселье.',
        'Билл откладывал половину каждый месяц.',
        'Прошло 5 лет... Джек беден. А Билл?'
      ],
      choice2Options: [
        'Купил маленькую рыбацкую лодку',
        'Купил большой торговый корабль',
        'Стал владельцем целого флота'
      ],
      choice2Response: 'Верно! Сила регулярных накоплений!',
      ending: [
        'Билл купил свой первый корабль!',
        'Продолжая копить, он купил второй! Третий!',
        'Сейчас у него целый флот!',
        'Всё благодаря СБЕРЕЖЕНИЯМ!'
      ]
    },
    
    // ВЕТКА: БАЛАНС
    balance: {
      choice1Response: 'Мудрейший ответ! К этому я пришёл через опыт!',
      story: [
        'Сначала я пробовал копить ВСЁ до последней монеты.',
        'Жил впроголодь... Отказывался от всего...',
        'Накопил быстро, но был ГЛУБОКО несчастлив!',
        'Потом стал тратить ВСЁ. Весело, но цель далека!',
        'Нужен был баланс...'
      ],
      choice2Options: [
        'Откладывал 50%, тратил 50%',
        'Откладывал 70%, тратил 30%',
        'Откладывал 30%, тратил 70%'
      ],
      choice2Response: 'Золотое правило баланса!',
      ending: [
        'Половина на мечту будущего, половина на радость сейчас!',
        'Я радовался каждый день И шёл к цели!',
        'Через разумное время мечта сбылась!',
        'Баланс - вот секрет счастья!'
      ]
    },
    
    finale: [
      'Вот мы и пришли в банк планеты Финансов!',
      'Здесь хранятся сбережения всех жителей!',
      'Сейчас покажу современные инструменты накоплений!'
    ]
  };

  const handleIntroComplete = () => {
    setCurrentPhase('story');
    setStoryStep(0);
  };

  const handleFirstChoice = (choice) => {
    console.log('=== ПЕРВЫЙ ВЫБОР ===');
    console.log('Выбор:', choice);
    
    if (choice.includes('СЕЙЧАС')) {
      console.log('→ Ветка: ТРАТИТЬ');
      setStoryBranch('spend');
    } else if (choice.includes('БОЛЬШУЮ')) {
      console.log('→ Ветка: КОПИТЬ');
      setStoryBranch('save');
    } else {
      console.log('→ Ветка: БАЛАНС');
      setStoryBranch('balance');
    }
    
    setUserChoices([choice]);
    setStoryStep(0);
  };

  const handleSecondChoice = (choice) => {
    console.log('=== ВТОРОЙ ВЫБОР ===');
    console.log('Выбор:', choice);
    setUserChoices([...userChoices, choice]);
  };

  const handleStoryComplete = () => {
    console.log('=== ИСТОРИЯ ЗАВЕРШЕНА ===');
    console.log('Переход на видео');
    setCurrentPhase('video');
  };

  const handleVideoComplete = () => {
    console.log('=== ВИДЕО ЗАВЕРШЕНО ===');
    console.log('Переход на практику');
    setCurrentPhase('practice');
  };

  const handlePracticeSubmit = () => {
    const monthly = parseInt(practiceAnswers.monthly) || 0;
    const months = parseInt(practiceAnswers.months) || 0;
    
    console.log('Ответы:', { monthly, months });
    
    if (monthly === 500 && months === 10) {
      setPracticeResult('correct');
      setTimeout(() => {
        completeMission(
          missionConfig.id,
          missionConfig.rewards.xp,
          missionConfig.rewards.coins,
          'finance'
        );
        setCurrentPhase('completion');
      }, 2500);
    } else {
      setPracticeResult('incorrect');
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
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
            key="story"
            content={storyContent}
            branch={storyBranch}
            step={storyStep}
            onStepNext={() => setStoryStep(s => s + 1)}
            onFirstChoice={handleFirstChoice}
            onSecondChoice={handleSecondChoice}
            onComplete={handleStoryComplete}
            aiEngine={aiEngine}
          />
        )}

        {currentPhase === 'video' && (
          <VideoScene
            key="video"
            onComplete={handleVideoComplete}
          />
        )}

        {currentPhase === 'practice' && (
          <PracticeScene
            key="practice"
            answers={practiceAnswers}
            onAnswer={(field, value) => setPracticeAnswers(prev => ({ ...prev, [field]: value }))}
            onSubmit={handlePracticeSubmit}
            result={practiceResult}
          />
        )}

        {currentPhase === 'completion' && (
          <CompletionScene
            key="completion"
            mission={missionConfig}
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
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
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
          fontSize: '1rem'
        }}
      >
        <ArrowLeft size={20} />
        Назад
      </button>

      <div style={{
        maxWidth: '800px',
        background: 'rgba(0, 0, 0, 0.85)',
        border: '4px solid #FFD700',
        borderRadius: '2rem',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: '6rem', marginBottom: '1.5rem' }}
        >
          🏦
        </motion.div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          color: '#FFD700',
          marginBottom: '1rem',
          textShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
        }}>
          Сбережения и накопления
        </h1>

        <p style={{
          fontSize: '1.375rem',
          color: '#FFF',
          marginBottom: '2rem',
          lineHeight: 1.7
        }}>
          Капитан Монети ведёт тебя в банк!<br/>
          Узнай секрет накоплений и научись копить на мечту!
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
            <div style={{ color: '#FFD700', fontWeight: 800 }}>+{mission.rewards.xp} XP</div>
          </div>
          <div style={{
            background: 'rgba(251, 191, 36, 0.2)',
            border: '2px solid #FFD700',
            borderRadius: '1rem',
            padding: '1rem 2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ color: '#FFD700', fontWeight: 800 }}>+{mission.rewards.coins} монет</div>
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
// STORY SCENE
// ==========================================
function StoryScene({ content, branch, step, onStepNext, onFirstChoice, onSecondChoice, onComplete, aiEngine }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentContent, setCurrentContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChoice, setShowChoice] = useState(false);
  const [choiceType, setChoiceType] = useState(null); // 'first' or 'second'
  const [choiceOptions, setChoiceOptions] = useState([]);

  // Определяем контент для показа
  useEffect(() => {
    console.log('=== UPDATE CONTENT ===');
    console.log('Branch:', branch);
    console.log('Step:', step);

    if (!branch) {
      // Интро история
      console.log('→ Показываем интро');
      setCurrentContent(content.intro);
      setCurrentIndex(0);
    } else {
      // Ветка выбрана
      const branchContent = content[branch];
      console.log('→ Контент ветки:', branchContent);
      
      if (step === 0) {
        // Показываем ответ на первый выбор + историю
        console.log('→ Показываем ответ + историю');
        setCurrentContent([
          branchContent.choice1Response,
          ...branchContent.story
        ]);
        setCurrentIndex(0);
      } else if (step === 1) {
        // Показываем ответ на второй выбор + концовку
        console.log('→ Показываем ответ2 + концовку');
        setCurrentContent([
          branchContent.choice2Response,
          ...branchContent.ending,
          ...content.finale
        ]);
        setCurrentIndex(0);
      }
    }
  }, [branch, step, content]);

  // Печатание текста
  useEffect(() => {
    if (!currentContent || !currentContent[currentIndex]) {
      console.log('Нет текста для печати');
      return;
    }

    const text = currentContent[currentIndex];
    console.log(`Печатаем текст ${currentIndex}:`, text);
    
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
      // Моментально показать весь текст
      setDisplayedText(currentContent[currentIndex]);
      setIsTyping(false);
      return;
    }

    // Переход к следующему тексту
    if (currentIndex < currentContent.length - 1) {
      console.log('→ Следующий текст');
      setCurrentIndex(i => i + 1);
    } else {
      // Контент закончился - показываем выбор или переходим дальше
      console.log('→ Контент закончился');
      
      if (!branch) {
        // После интро - показываем первый выбор
        console.log('→ Показываем первый выбор');
        setShowChoice(true);
        setChoiceType('first');
        setChoiceOptions([
          'Тратить деньги СЕЙЧАС на радость',
          'Копить деньги на БОЛЬШУЮ мечту',
          'Найти БАЛАНС между тем и другим'
        ]);
      } else if (step === 0) {
        // После первой части ветки - показываем второй выбор
        console.log('→ Показываем второй выбор');
        setShowChoice(true);
        setChoiceType('second');
        setChoiceOptions(content[branch].choice2Options);
      } else {
        // Всё закончилось - переход на видео
        console.log('→ История полностью завершена');
        onComplete();
      }
    }
  };

  const handleChoiceClick = (choice) => {
    console.log('=== ВЫБОР СДЕЛАН ===');
    console.log('Тип:', choiceType);
    console.log('Выбор:', choice);
    
    setShowChoice(false);
    
    if (choiceType === 'first') {
      onFirstChoice(choice);
    } else {
      onSecondChoice(choice);
      onStepNext();
    }
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
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/uploads/lock/bank.jpg)',
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

      {/* КАПИТАН */}
      {!showChoice && (
        <motion.div
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
            src="/uploads/sensei/kapitan4.jpg"
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
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
            }}
          >
            {choiceType === 'first' ? 'Что важнее в жизни?' : 'Как думаешь?'}
          </motion.div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {choiceOptions.map((choice, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: -8 }}
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
                  gap: '1rem'
                }}
              >
                <span style={{ 
                  color: i === 0 ? '#7ec8e3' : '#999',
                  fontSize: '1.75rem'
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
// VIDEO SCENE - СТРОГО ПО ЦЕНТРУ!
// ==========================================
function VideoScene({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}
    >
      {/* ФОН */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/uploads/lock/bank1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.3)'
      }} />

      {/* ВИНЬЕТКА */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.95) 100%)'
      }} />

      {/* КАПИТАН - МАЛЕНЬКИЙ СЛЕВА ВНИЗУ */}
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
          src="/uploads/sensei/kapitan3.jpg"
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

      {/* КОНТЕЙНЕР КОНТЕНТА - СТРОГО ПО ЦЕНТРУ */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0 5%'
      }}>
        
        {/* ЗАГОЛОВОК */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            color: '#FFD700',
            fontSize: '2.5rem',
            fontWeight: 900,
            marginBottom: '2rem',
            textAlign: 'center',
            textShadow: '0 0 40px rgba(255, 215, 0, 1)',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))'
          }}
        >
          ✨ Урок от экспертов ✨
        </motion.h2>

        {/* ВИДЕО - СТРОГО ПО ЦЕНТРУ */}
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
            title="Сбережения"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        {/* КНОПКА */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            border: 'none',
            borderRadius: '1rem',
            padding: '1.25rem 3.5rem',
            color: '#000',
            fontSize: '1.5rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <Play size={24} />
          К практике →
        </motion.button>
      </div>

      {/* ПОДСКАЗКА ВНИЗУ СЛЕВА */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          left: '2%',
          bottom: '1%',
          color: '#FFD700',
          fontSize: '0.875rem',
          maxWidth: '250px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 1)',
          zIndex: 6
        }}
      >
        💡 Посмотри внимательно!
      </motion.p>
    </motion.div>
  );
}

// ==========================================
// PRACTICE SCENE - СТРОГО ПО ЦЕНТРУ!
// ==========================================
function PracticeScene({ answers, onAnswer, onSubmit, result }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}
    >
      {/* ФОН */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/uploads/lock/bank1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.3)'
      }} />

      {/* ВИНЬЕТКА */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.95) 100%)'
      }} />

      {/* КАПИТАН - МАЛЕНЬКИЙ СЛЕВА ВНИЗУ */}
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
          src="/uploads/sensei/kapitan3.jpg"
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

      {/* КОНТЕЙНЕР ПРАКТИКИ - СТРОГО ПО ЦЕНТРУ */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '700px',
          padding: '0 2rem',
          textAlign: 'center'
        }}
      >
        
        {/* ЗАГОЛОВОК */}
        <h2 style={{
          background: 'linear-gradient(135deg, #FFD700, #FFA500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: 900,
          marginBottom: '2rem',
          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))'
        }}>
          ПЛАН НАКОПЛЕНИЙ
        </h2>

        {/* ЛИНИЯ */}
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
          marginBottom: '2.5rem',
          filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'
        }} />

        {/* УСЛОВИЯ */}
        <div style={{
          fontSize: '1.4rem',
          color: '#FFF',
          marginBottom: '2.5rem',
          textShadow: '0 2px 15px rgba(0, 0, 0, 1)'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: '#7ec8e3' }}>Твоя зарплата:</span>{' '}
            <span style={{ color: '#FFD700', fontWeight: 900, fontSize: '1.6rem' }}>1000 💰</span>
          </div>
          <div>
            <span style={{ color: '#7ec8e3' }}>Цель:</span>{' '}
            <span style={{ color: '#FFD700', fontWeight: 900, fontSize: '1.6rem' }}>5000 💰</span>
          </div>
        </div>

        {/* ВОПРОСЫ */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              color: '#FFF',
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
            }}>
              💰 Сколько копить в месяц?
            </label>
            <input
              type="number"
              value={answers.monthly}
              onChange={(e) => onAnswer('monthly', e.target.value)}
              placeholder="Введи число"
              style={{
                width: '100%',
                padding: '1.25rem',
                fontSize: '1.5rem',
                fontWeight: 700,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '3px solid rgba(255, 215, 0, 0.5)',
                borderRadius: '1rem',
                color: '#FFD700',
                outline: 'none',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#FFF',
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
            }}>
              📅 За сколько месяцев?
            </label>
            <input
              type="number"
              value={answers.months}
              onChange={(e) => onAnswer('months', e.target.value)}
              placeholder="Введи число"
              style={{
                width: '100%',
                padding: '1.25rem',
                fontSize: '1.5rem',
                fontWeight: 700,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '3px solid rgba(255, 215, 0, 0.5)',
                borderRadius: '1rem',
                color: '#FFD700',
                outline: 'none',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
              }}
            />
          </div>
        </div>

        {/* РЕЗУЛЬТАТ */}
        {result && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              marginBottom: '2rem',
              color: result === 'correct' ? '#10b981' : '#ef4444',
              textShadow: result === 'correct' 
                ? '0 0 30px rgba(16, 185, 129, 1)' 
                : '0 0 30px rgba(239, 68, 68, 1)'
            }}
          >
            {result === 'correct' ? '✅ ОТЛИЧНО!' : '❌ ПОПРОБУЙ ЕЩЁ!'}
          </motion.div>
        )}

        {/* КНОПКА */}
        {!result && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSubmit}
            disabled={!answers.monthly || !answers.months}
            style={{
              background: (!answers.monthly || !answers.months)
                ? 'rgba(107, 114, 128, 0.5)'
                : 'linear-gradient(135deg, #FFD700, #FFA500)',
              border: 'none',
              borderRadius: '1rem',
              padding: '1.25rem',
              color: (!answers.monthly || !answers.months) ? '#6b7280' : '#000',
              fontSize: '1.5rem',
              fontWeight: 900,
              cursor: (!answers.monthly || !answers.months) ? 'not-allowed' : 'pointer',
              boxShadow: (!answers.monthly || !answers.months)
                ? 'none'
                : '0 0 40px rgba(255, 215, 0, 0.7)',
              width: '100%'
            }}
          >
            Проверить ответы
          </motion.button>
        )}

        {/* ПОДСКАЗКА ПРИ ОШИБКЕ */}
        {result === 'incorrect' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '2px solid #ef4444',
              borderRadius: '1rem',
              color: '#FFF',
              fontSize: '1.1rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 1)'
            }}
          >
            💡 Подумай: 5000 ÷ что = 10 месяцев?
          </motion.div>
        )}
      </motion.div>

      {/* ПОДСКАЗКА ВНИЗУ СЛЕВА */}
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
          maxWidth: '250px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 1)',
          zIndex: 6
        }}
      >
        💡 Используй математику!
      </motion.p>
    </motion.div>
  );
}

// ==========================================
// COMPLETION SCENE
// ==========================================
function CompletionScene({ mission, onExit }) {
  const [displayedText, setDisplayedText] = useState('');
  const finalMessage = 'Йо-хо-хо! БРАВО! Ты освоил СБЕРЕЖЕНИЯ! Теперь знаешь как копить на мечту! Следующая миссия - последняя! Расскажу про ИНВЕСТИЦИИ!';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < finalMessage.length) {
        setDisplayedText(finalMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 35);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: '#000'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/uploads/lock/bank1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.7)'
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.85) 90%)',
        zIndex: 1
      }} />

      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, type: 'spring' }}
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
          src="/uploads/sensei/kapitan3.jpg"
          alt="Капитан"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            filter: 'drop-shadow(0 0 60px rgba(255, 215, 0, 0.8))'
          }}
        />
      </motion.div>

      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '5%',
        right: '5%',
        zIndex: 60
      }}>
        <p style={{
          color: '#FFFFFF',
          fontSize: '1.75rem',
          fontWeight: 700,
          textShadow: '0 0 30px rgba(0, 0, 0, 1)',
          lineHeight: 1.8,
          maxWidth: '1000px'
        }}>
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            _
          </motion.span>
        </p>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3 }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          background: 'rgba(0, 0, 0, 0.95)',
          border: '4px solid #FFD700',
          borderRadius: '2rem',
          padding: '2rem',
          zIndex: 80,
          boxShadow: '0 0 80px rgba(255, 215, 0, 0.8)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Trophy size={60} color="#FFD700" />
          <h3 style={{
            color: '#FFD700',
            fontSize: '1.75rem',
            fontWeight: 900,
            margin: 0,
            marginTop: '0.5rem'
          }}>
            МИССИЯ 4/5 ЗАВЕРШЕНА!
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(251, 191, 36, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '2px solid #fbbf24',
            textAlign: 'center'
          }}>
            <Star size={40} color="#fbbf24" />
            <div style={{ color: '#fcd34d', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Опыт
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fbbf24' }}>
              +{mission.rewards.xp}
            </div>
          </div>
          <div style={{
            background: 'rgba(251, 191, 36, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '2px solid #fbbf24',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem' }}>💰</div>
            <div style={{ color: '#fcd34d', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Монеты
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fbbf24' }}>
              +{mission.rewards.coins}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExit}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none',
            borderRadius: '1rem',
            padding: '1.25rem',
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

export default FinanceMission4;