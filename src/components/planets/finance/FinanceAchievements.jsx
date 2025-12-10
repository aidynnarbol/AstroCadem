// src/components/planets/finance/FinanceAchievements.jsx
// ДОСКА ДОСТИЖЕНИЙ

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUser } from '../../../contexts/UserContext';

function FinanceAchievements({ onClose }) {
  const { user } = useUser();
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const achievements = [
    {
      id: 'first_steps',
      title: 'Первые шаги',
      description: 'Встретился с капитаном Монети и узнал что такое деньги. Это начало твоего пути к финансовой грамотности!',
      requirement: 'Завершить миссию "Первая встреча"',
      category: 'story',
      rarity: 'common',
      position: { top: '15%', left: '12%', rotate: -3 },
      color: '#f4e4c1'
    },
    {
      id: 'profession_master',
      title: 'Знаток профессий',
      description: 'Изучил различные способы заработка денег и понял важность выбора профессии. Теперь ты знаешь как люди получают деньги!',
      requirement: 'Завершить миссию "Урок профессии"',
      category: 'story',
      rarity: 'common',
      position: { top: '12%', left: '38%', rotate: 2 },
      color: '#e8d5b7'
    },
    {
      id: 'smart_buyer',
      title: 'Умный покупатель',
      description: 'Научился отличать нужное от желаемого на базаре. Капитан научил тебя делать разумные покупки и не тратить деньги впустую!',
      requirement: 'Завершить миссию "Урок на базаре"',
      category: 'story',
      rarity: 'rare',
      position: { top: '18%', right: '15%', rotate: -2 },
      color: '#d4c4a8'
    },
    {
      id: 'all_missions',
      title: 'Мастер финансов',
      description: 'Завершил все миссии на планете Финансов! Ты прошёл путь от новичка до настоящего знатока денег. Капитан Монети гордится тобой!',
      requirement: 'Завершить все 5 миссий',
      category: 'missions',
      rarity: 'legendary',
      position: { top: '45%', left: '10%', rotate: 3 },
      color: '#ffd700'
    },
    {
      id: 'saver',
      title: 'Хранитель сбережений',
      description: 'Освоил искусство накопления денег. Ты понял силу терпения и дисциплины в управлении финансами!',
      requirement: 'Завершить миссию "Путь к банку"',
      category: 'missions',
      rarity: 'rare',
      position: { top: '42%', left: '35%', rotate: -1 },
      color: '#c9a961'
    },
    {
      id: 'captain_student',
      title: 'Ученик капитана',
      description: 'Выслушал историю капитана Монети и получил его последний урок. Теперь его мудрость живёт в твоём сердце!',
      requirement: 'Завершить миссию "История капитана"',
      category: 'missions',
      rarity: 'epic',
      position: { top: '48%', right: '12%', rotate: 2 },
      color: '#8b6914'
    },
    {
      id: 'perfect_score',
      title: 'Идеальный результат',
      description: 'Завершил все миссии с максимальным баллом! Твоё понимание финансов безупречно!',
      requirement: 'Получить 100% на всех миссиях',
      category: 'missions',
      rarity: 'legendary',
      position: { top: '72%', left: '15%', rotate: -2 },
      color: '#ff6b6b',
      secret: true
    },
    {
      id: 'video_watcher',
      title: 'Любитель знаний',
      description: 'Просмотрел все обучающие видео на планете Финансов. Теория - основа практики!',
      requirement: 'Просмотреть все 5 видео',
      category: 'videos',
      rarity: 'common',
      position: { top: '75%', left: '40%', rotate: 1 },
      color: '#e8d5b7'
    },
    {
      id: 'quick_learner',
      title: 'Быстрый ученик',
      description: 'Завершил все миссии меньше чем за один день! Впечатляющая скорость обучения!',
      requirement: 'Завершить все миссии за 24 часа',
      category: 'special',
      rarity: 'epic',
      position: { top: '70%', right: '18%', rotate: -3 },
      color: '#c9a961',
      secret: true
    }
  ];

  const isUnlocked = (achievement) => {
    if (achievement.secret && !user?.financeAchievements?.unlocked?.[achievement.id]) {
      return false;
    }
    return user?.financeAchievements?.unlocked?.[achievement.id] || false;
  };

  const isSecret = (achievement) => {
    return achievement.secret && !isUnlocked(achievement);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.97)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1400px',
          width: '100%',
          height: '85vh',
          position: 'relative',
          filter: 'drop-shadow(0 40px 100px rgba(0,0,0,0.9))'
        }}
      >
        {/* ДЕРЕВЯННАЯ РАМКА */}
        <div style={{
          position: 'absolute',
          inset: '-25px',
          background: `
            repeating-linear-gradient(90deg, #5d4e37 0px, #6d5e47 4px, #5d4e37 8px),
            linear-gradient(135deg, #4d3e27 0%, #5d4e37 50%, #4d3e27 100%)
          `,
          borderRadius: '1rem',
          padding: '25px',
          boxShadow: `
            0 0 0 12px #3d2f28,
            0 0 0 16px #8b6914,
            inset 0 8px 40px rgba(0,0,0,0.9),
            0 60px 120px rgba(0,0,0,0.95)
          `
        }}>
          {/* МЕТАЛЛИЧЕСКИЕ ГВОЗДИ ПО УГЛАМ */}
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              ...(pos.includes('t') ? { top: '10px' } : { bottom: '10px' }),
              ...(pos.includes('l') ? { left: '10px' } : { right: '10px' }),
              width: '24px',
              height: '24px',
              background: `radial-gradient(circle, #3d3d3d 0%, #1a1a1a 70%, #000 100%)`,
              borderRadius: '50%',
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.3),
                inset 0 -2px 4px rgba(0,0,0,0.8),
                0 4px 8px rgba(0,0,0,0.9)
              `
            }} />
          ))}
        </div>

        {/* КНОПКА ЗАКРЫТЬ */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            zIndex: 1000,
            width: '70px',
            height: '70px',
            background: `radial-gradient(circle at 30% 30%, #8b6914, #5d4e37)`,
            border: '4px solid #3d2f28',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 8px 25px rgba(0,0,0,0.9), inset 0 2px 5px rgba(201,169,97,0.5)`
          }}
        >
          <X size={36} color="#f4e4c1" strokeWidth={3} />
        </motion.button>

        {/* ТАБЛИЧКА "ДОСКА ДОСТИЖЕНИЙ" */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.75rem 3rem',
          background: `
            linear-gradient(135deg, #5d4e37 0%, #4d3e27 50%, #5d4e37 100%)
          `,
          border: '3px solid #3d2f28',
          borderRadius: '0.5rem',
          boxShadow: `
            0 8px 20px rgba(0,0,0,0.9),
            inset 0 2px 5px rgba(139,105,20,0.3)
          `,
          zIndex: 100
        }}>
          <h1 style={{
            color: '#c9a961',
            fontSize: '2rem',
            fontWeight: 900,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontFamily: 'Georgia, serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.9)'
          }}>
            ДОСКА ДОСТИЖЕНИЙ
          </h1>
        </div>

        {/* ДЕРЕВЯННАЯ ДОСКА */}
        <div style={{
          width: '100%',
          height: '100%',
          background: `
            repeating-linear-gradient(90deg, #5d4e37 0px, #6d5e47 3px, #5d4e37 6px),
            repeating-linear-gradient(0deg, #5d4e37 0px, #6d5e47 120px, #5d4e37 240px),
            linear-gradient(135deg, #6d5e47 0%, #5d4e37 50%, #4d3e27 100%)
          `,
          borderRadius: '0.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `inset 0 0 100px rgba(0,0,0,0.6)`
        }}>
          {/* БУМАГИ-ДОСТИЖЕНИЯ */}
          {achievements.map((achievement) => {
            const unlocked = isUnlocked(achievement);
            const secret = isSecret(achievement);

            return (
              <motion.div
                key={achievement.id}
                whileHover={!secret ? { scale: 1.05, zIndex: 10 } : {}}
                onClick={() => !secret && setSelectedAchievement(achievement)}
                style={{
                  position: 'absolute',
                  ...achievement.position,
                  width: '220px',
                  minHeight: '180px',
                  padding: '1.5rem',
                  background: secret 
                    ? `
                      radial-gradient(circle at 50% 0%, rgba(0,0,0,0.4) 0%, transparent 60%),
                      linear-gradient(135deg, #3d3d3d 0%, #2d2d2d 100%)
                    `
                    : `
                      radial-gradient(circle at 50% 0%, rgba(0,0,0,0.15) 0%, transparent 60%),
                      linear-gradient(135deg, ${achievement.color} 0%, #d4c4a8 100%)
                    `,
                  transform: `rotate(${achievement.rotate}deg)`,
                  borderRadius: '0.5rem',
                  cursor: secret ? 'not-allowed' : 'pointer',
                  boxShadow: `
                    0 8px 20px rgba(0,0,0,0.7),
                    inset 0 1px 3px rgba(255,255,255,0.3)
                  `,
                  border: '2px solid rgba(139,105,20,0.4)',
                  transition: 'all 0.3s',
                  opacity: secret ? 0.6 : 1,
                  fontFamily: 'Georgia, serif'
                }}
              >
                {/* ГВОЗДИК */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '16px',
                  background: `radial-gradient(circle, #3d3d3d 0%, #1a1a1a 70%)`,
                  borderRadius: '50%',
                  boxShadow: `
                    inset 0 1px 2px rgba(255,255,255,0.3),
                    0 3px 6px rgba(0,0,0,0.8)
                  `
                }} />

                {secret ? (
                  <div style={{
                    textAlign: 'center',
                    marginTop: '2rem'
                  }}>
                    <div style={{
                      fontSize: '3rem',
                      marginBottom: '1rem',
                      opacity: 0.5
                    }}>
                      🔒
                    </div>
                    <div style={{
                      color: '#8d8d8d',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      fontStyle: 'italic'
                    }}>
                      ???
                    </div>
                    <div style={{
                      color: '#6d6d6d',
                      fontSize: '0.875rem',
                      marginTop: '0.5rem',
                      fontStyle: 'italic'
                    }}>
                      Секретное достижение
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 style={{
                      color: '#3d2f28',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      marginTop: '1.5rem',
                      textAlign: 'center',
                      borderBottom: '1px solid rgba(61,47,40,0.3)',
                      paddingBottom: '0.5rem'
                    }}>
                      {achievement.title}
                    </h3>
                    
                    <div style={{
                      color: '#5d4e37',
                      fontSize: '0.8125rem',
                      lineHeight: 1.4,
                      textAlign: 'center',
                      marginBottom: '0.75rem'
                    }}>
                      {achievement.description.substring(0, 80)}...
                    </div>

                    {/* ВОСКОВАЯ ПЕЧАТЬ */}
                    {unlocked && (
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        width: '50px',
                        height: '50px',
                        background: `radial-gradient(circle, #8b2020 0%, #6b0000 70%)`,
                        borderRadius: '50%',
                        boxShadow: `
                          0 4px 10px rgba(0,0,0,0.8),
                          inset 0 2px 5px rgba(0,0,0,0.6)
                        `,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(139,32,32,0.5)'
                      }}>
                        <div style={{
                          color: '#d4a574',
                          fontSize: '1.5rem',
                          fontWeight: 900
                        }}>
                          ✓
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ДЕТАЛИ ДОСТИЖЕНИЯ */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '600px',
                width: '100%',
                padding: '3rem',
                background: `
                  radial-gradient(circle at 50% 0%, rgba(0,0,0,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, #f4e4c1 0%, #e8d5b7 50%, #d4c4a8 100%)
                `,
                borderRadius: '1rem',
                border: '4px solid rgba(139,105,20,0.4)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
                position: 'relative',
                fontFamily: 'Georgia, serif'
              }}
            >
              {/* ДЕКОРАТИВНАЯ РАМКА */}
              <div style={{
                position: 'absolute',
                inset: '1.5rem',
                border: '2px solid rgba(139,105,20,0.3)',
                borderRadius: '0.5rem',
                pointerEvents: 'none'
              }} />

              {/* ЗАГОЛОВОК */}
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid rgba(139,105,20,0.4)'
              }}>
                <h2 style={{
                  color: '#3d2f28',
                  fontSize: '2rem',
                  fontWeight: 900,
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  {selectedAchievement.title}
                </h2>
                <div style={{
                  color: '#8b6914',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {selectedAchievement.rarity === 'legendary' ? 'Легендарное' :
                   selectedAchievement.rarity === 'epic' ? 'Эпическое' :
                   selectedAchievement.rarity === 'rare' ? 'Редкое' : 'Обычное'}
                </div>
              </div>

              {/* ОПИСАНИЕ */}
              <p style={{
                color: '#3d2f28',
                fontSize: '1.125rem',
                lineHeight: 1.8,
                textAlign: 'justify',
                marginBottom: '2rem'
              }}>
                {selectedAchievement.description}
              </p>

              {/* ТРЕБОВАНИЕ */}
              <div style={{
                padding: '1.25rem',
                background: 'rgba(139,105,20,0.15)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(139,105,20,0.3)',
                marginBottom: '2rem'
              }}>
                <div style={{
                  color: '#5d4e37',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase'
                }}>
                  Как получить:
                </div>
                <div style={{
                  color: '#3d2f28',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  {selectedAchievement.requirement}
                </div>
              </div>

              {/* ВОСКОВАЯ ПЕЧАТЬ */}
              {isUnlocked(selectedAchievement) && (
                <div style={{
                  position: 'absolute',
                  bottom: '2rem',
                  right: '2rem',
                  width: '80px',
                  height: '80px',
                  background: `radial-gradient(circle, #8b2020 0%, #6b0000 70%)`,
                  borderRadius: '50%',
                  boxShadow: `
                    0 6px 15px rgba(0,0,0,0.8),
                    inset 0 3px 8px rgba(0,0,0,0.6)
                  `,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid rgba(139,32,32,0.5)'
                }}>
                  <div style={{
                    color: '#d4a574',
                    fontSize: '2.5rem',
                    fontWeight: 900
                  }}>
                    ✓
                  </div>
                </div>
              )}

              {/* КНОПКА ЗАКРЫТЬ */}
              <button
                onClick={() => setSelectedAchievement(null)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: `linear-gradient(135deg, rgba(139,105,20,0.5) 0%, rgba(93,74,55,0.5) 100%)`,
                  border: '2px solid rgba(93,74,55,0.6)',
                  borderRadius: '0.5rem',
                  color: '#3d2f28',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
                }}
              >
                Принять
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FinanceAchievements;