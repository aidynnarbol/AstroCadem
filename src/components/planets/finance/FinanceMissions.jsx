// src/components/planets/finance/FinanceMissions.jsx
// ПРАВИЛЬНАЯ ВЕРСИЯ КНИГИ

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUser } from '../../../contexts/UserContext';

function FinanceMissions({ onClose }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedMission, setSelectedMission] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const missions = [
    {
      id: 'finance-1',
      number: 1,
      title: 'Первая встреча',
      location: 'Таверна "Золотая монета"',
      story: 'Ты входишь в таверну и замечаешь загадочного капитана за дальним столиком. Его взгляд притягивает внимание - в нём мудрость веков. Капитан Монети приглашает тебя присесть и начинает невероятный рассказ о том, что такое деньги на самом деле.',
      task: 'Провести беседу с капитаном',
      objective: 'Понять сущность денег',
      rewards: { xp: 300, coins: 250 },
      route: '/mission/finance-1'
    },
    {
      id: 'finance-2',
      number: 2,
      title: 'Урок профессии',
      location: 'Таверна "Золотая монета"',
      story: 'Капитан заказывает ещё один кувшин эля и продолжает своё обучение. Сегодня он расскажет тебе о том, как люди получают деньги, что такое профессия и почему важно выбрать своё дело.',
      task: 'Изучить способы заработка',
      objective: 'Понять что такое профессия',
      rewards: { xp: 350, coins: 300 },
      route: '/mission/finance-2'
    },
    {
      id: 'finance-3',
      number: 3,
      title: 'Урок на базаре',
      location: 'Городской базар',
      story: 'Капитан ведёт тебя на шумный базар, где торговцы наперебой предлагают свои товары. Среди множества красивых, блестящих вещей он учит тебя главному - как отличить то, что действительно нужно, от того, что просто хочется.',
      task: 'Пройти урок на базаре',
      objective: 'Различать нужное и желаемое',
      rewards: { xp: 400, coins: 350 },
      route: '/mission/finance-3'
    },
    {
      id: 'finance-4',
      number: 4,
      title: 'Путь к банку',
      location: 'Городской банк',
      story: 'По дороге к банку капитан делится теорией о сбережениях и накоплениях. Он рассказывает о силе терпения и дисциплины. В банке вы применяете полученные знания на практике - создаёте свой первый план накоплений.',
      task: 'Теория на пути, практика в банке',
      objective: 'Освоить искусство накопления',
      rewards: { xp: 400, coins: 350 },
      route: '/mission/finance-4'
    },
    {
      id: 'finance-5',
      number: 5,
      title: 'История капитана',
      location: 'Корабль капитана',
      story: 'Капитан Монети приглашает тебя на свой корабль. За чашкой горячего чая он рассказывает историю своей жизни - как он прошёл путь от простого юнги до богатого капитана. Это его последний и самый важный урок.',
      task: 'Выслушать историю капитана',
      objective: 'Получить последний урок',
      rewards: { xp: 700, coins: 600, badge: 'Мастер Финансов' },
      route: '/mission/finance-5',
      isFinal: true
    }
  ];

  useEffect(() => {
    setTimeout(() => setIsReady(true), 100);
  }, []);

  const getMissionStatus = (missionId) => {
    const completed = user?.completedMissions?.[missionId]?.completed || false;
    // Все пять миссий должны быть доступны сразу, без цепочки открытия
    return {
      completed,
      unlocked: true
    };
  };

  const handleMissionClick = (mission) => {
    const status = getMissionStatus(mission.id);
    if (status.unlocked) {
      setSelectedMission(mission);
    }
  };

  const handleStartMission = () => {
    if (selectedMission) {
      navigate(selectedMission.route);
    }
  };

  useEffect(() => {
    if (isReady) {
      const firstIncomplete = missions.find(m => {
        const status = getMissionStatus(m.id);
        return status.unlocked && !status.completed;
      });
      if (firstIncomplete && !selectedMission) {
        setSelectedMission(firstIncomplete);
      }
    }
  }, [isReady]);

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
        transition={{ duration: 0.4 }}
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
          background: `linear-gradient(135deg, #2d1f18 0%, #3d2f28 20%, #2d1f18 40%, #3d2f28 60%, #2d1f18 80%, #3d2f28 100%)`,
          borderRadius: '2rem',
          padding: '25px',
          boxShadow: `0 0 0 10px #1a1410, 0 0 0 15px #5d4e37, 0 0 0 18px #3d2f28, inset 0 8px 30px rgba(0,0,0,0.9), 0 60px 120px rgba(0,0,0,0.95)`
        }}>
          {/* ЗОЛОТЫЕ УГЛЫ */}
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              ...(pos.includes('t') ? { top: '5px' } : { bottom: '5px' }),
              ...(pos.includes('l') ? { left: '5px' } : { right: '5px' }),
              width: '80px',
              height: '80px',
              background: `radial-gradient(circle at ${pos.includes('l') ? 'left' : 'right'} ${pos.includes('t') ? 'top' : 'bottom'}, #c9a961 0%, #8b6914 30%, #5d4e37 100%)`,
              clipPath: pos === 'tl' ? 'polygon(0 0, 100% 0, 0 100%)' : pos === 'tr' ? 'polygon(100% 0, 100% 100%, 0 0)' : pos === 'bl' ? 'polygon(0 0, 0 100%, 100% 100%)' : 'polygon(100% 0, 0 100%, 100% 100%)',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
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

        {/* КНИГА */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
          background: `linear-gradient(90deg, #f4e4c1 0%, #e8d5b7 48%, #3d2f28 49%, #3d2f28 51%, #e8d5b7 52%, #d4c4a8 100%)`,
          borderRadius: '1.5rem',
          overflow: 'hidden',
          boxShadow: `inset 0 0 150px rgba(0,0,0,0.4)`
        }}>
          {/* КОРЕШОК */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            bottom: 0,
            width: '60px',
            background: `linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0.5) 100%)`,
            zIndex: 200,
            pointerEvents: 'none',
            boxShadow: `inset 0 0 30px rgba(0,0,0,0.6), -3px 0 15px rgba(0,0,0,0.4), 3px 0 15px rgba(0,0,0,0.4)`
          }} />

          {/* ЛЕВАЯ СТРАНИЦА */}
          <div style={{
            background: `radial-gradient(ellipse at 120% 50%, rgba(0,0,0,0.15) 0%, transparent 50%), linear-gradient(135deg, #f4e4c1 0%, #e8d5b7 50%, #d4c4a8 100%)`,
            borderRadius: '1.5rem 0 0 1.5rem',
            padding: '4rem 3rem 4rem 4rem',
            overflowY: 'auto',
            boxShadow: `inset -10px 0 30px rgba(0,0,0,0.2)`
          }}>
            {/* ЗАГОЛОВОК */}
            <div style={{
              marginBottom: '3rem',
              padding: '1.25rem',
              background: `linear-gradient(135deg, rgba(139,105,20,0.3) 0%, rgba(201,169,97,0.4) 50%, rgba(139,105,20,0.3) 100%)`,
              borderRadius: '8px',
              boxShadow: `0 4px 12px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,0.3)`,
              border: '2px solid rgba(139,105,20,0.4)',
              textAlign: 'center'
            }}>
              <h2 style={{
                color: '#3d2f28',
                fontSize: '1.75rem',
                fontWeight: 900,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontFamily: 'Georgia, serif',
                textShadow: '1px 1px 2px rgba(255,255,255,0.7)'
              }}>
                ГЛАВНЫЕ КВЕСТЫ
              </h2>
            </div>

            {/* СПИСОК КВЕСТОВ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {missions.map((mission) => {
                const status = getMissionStatus(mission.id);
                const isSelected = selectedMission?.id === mission.id;
                return (
                  <motion.div
                    key={mission.id}
                    whileHover={status.unlocked ? { x: 6 } : {}}
                    onClick={() => handleMissionClick(mission)}
                    style={{
                      padding: '1.25rem',
                      background: isSelected ? 'rgba(201,169,97,0.25)' : 'transparent',
                      borderLeft: isSelected ? '4px solid #8b6914' : '4px solid transparent',
                      cursor: status.unlocked ? 'pointer' : 'not-allowed',
                      opacity: status.unlocked ? 1 : 0.4,
                      transition: 'all 0.3s',
                      fontFamily: 'Georgia, serif',
                      borderRadius: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        background: status.completed ? 'linear-gradient(135deg, #10b981, #059669)' : status.unlocked ? 'transparent' : 'rgba(93,74,55,0.3)',
                        border: status.completed ? '2px solid #10b981' : status.unlocked ? '2px solid rgba(139,105,20,0.5)' : '2px solid rgba(93,74,55,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {status.completed && <div style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 900 }}>✓</div>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: '#3d2f28', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                          {mission.title}
                        </div>
                        <div style={{ color: status.completed ? '#10b981' : '#8b6914', fontSize: '0.875rem', fontWeight: 600 }}>
                          {status.completed ? 'Завершён' : status.unlocked ? mission.location : 'Заблокировано'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ПРАВАЯ СТРАНИЦА */}
          <div style={{
            background: `radial-gradient(ellipse at -20% 50%, rgba(0,0,0,0.15) 0%, transparent 50%), linear-gradient(135deg, #e8d5b7 0%, #d4c4a8 50%, #c9b896 100%)`,
            borderRadius: '0 1.5rem 1.5rem 0',
            padding: '4rem 4rem 4rem 3rem',
            overflowY: 'auto',
            boxShadow: `inset 10px 0 30px rgba(0,0,0,0.2)`
          }}>
            {selectedMission ? (
              <>
                {/* ЗАГОЛОВОК КВЕСТА */}
                <div style={{
                  marginBottom: '3rem',
                  padding: '1.25rem',
                  background: `linear-gradient(135deg, rgba(139,105,20,0.3) 0%, rgba(201,169,97,0.4) 50%, rgba(139,105,20,0.3) 100%)`,
                  borderRadius: '8px',
                  boxShadow: `0 4px 12px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,0.3)`,
                  border: '2px solid rgba(139,105,20,0.4)',
                  textAlign: 'center'
                }}>
                  <h2 style={{
                    color: '#3d2f28',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    margin: 0,
                    fontFamily: 'Georgia, serif',
                    textShadow: '1px 1px 2px rgba(255,255,255,0.7)'
                  }}>
                    {selectedMission.title}
                  </h2>
                </div>

                {/* ИСТОРИЯ */}
                <div style={{
                  marginBottom: '2rem',
                  padding: '1.75rem',
                  background: 'rgba(244,228,193,0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(139,105,20,0.2)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <p style={{
                    color: '#3d2f28',
                    fontSize: '1.0625rem',
                    lineHeight: 1.8,
                    margin: 0,
                    fontFamily: 'Georgia, serif',
                    textAlign: 'justify'
                  }}>
                    {selectedMission.story}
                  </p>
                </div>

                {/* ЗАДАЧА */}
                <div style={{ marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                  <div style={{ color: '#3d2f28', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    {selectedMission.task}
                  </div>
                  <div style={{ color: '#5d4e37', fontSize: '0.9375rem', fontWeight: 600 }}>
                    {selectedMission.objective}
                  </div>
                </div>

                {/* НАГРАДЫ */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{
                    color: '#3d2f28',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    fontFamily: 'Georgia, serif'
                  }}>
                    Награда за квест
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                      flex: 1,
                      padding: '1.25rem',
                      background: `linear-gradient(135deg, rgba(212,165,116,0.4) 0%, rgba(201,169,97,0.3) 100%)`,
                      borderRadius: '8px',
                      border: '2px solid rgba(139,105,20,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3)'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'radial-gradient(circle, #8b6914, #5d4e37)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                        fontSize: '1.75rem'
                      }}>⭐</div>
                      <div>
                        <div style={{ color: '#3d2f28', fontSize: '1.25rem', fontWeight: 900, fontFamily: 'Georgia, serif' }}>
                          {selectedMission.rewards.xp}
                        </div>
                        <div style={{ color: '#5d4e37', fontSize: '0.8125rem', fontFamily: 'Georgia, serif' }}>опыта</div>
                      </div>
                    </div>
                    <div style={{
                      flex: 1,
                      padding: '1.25rem',
                      background: `linear-gradient(135deg, rgba(212,165,116,0.4) 0%, rgba(201,169,97,0.3) 100%)`,
                      borderRadius: '8px',
                      border: '2px solid rgba(139,105,20,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3)'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'radial-gradient(circle, #c9a961, #8b6914)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                        fontSize: '1.75rem'
                      }}>💰</div>
                      <div>
                        <div style={{ color: '#3d2f28', fontSize: '1.25rem', fontWeight: 900, fontFamily: 'Georgia, serif' }}>
                          {selectedMission.rewards.coins}
                        </div>
                        <div style={{ color: '#5d4e37', fontSize: '0.8125rem', fontFamily: 'Georgia, serif' }}>монет</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* КНОПКИ */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartMission}
                    style={{
                      flex: 1,
                      padding: '1rem 1.5rem',
                      background: `linear-gradient(135deg, rgba(139,105,20,0.5) 0%, rgba(93,74,55,0.5) 100%)`,
                      border: '2px solid rgba(93,74,55,0.6)',
                      borderRadius: '8px',
                      color: '#3d2f28',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: `0 3px 10px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)`,
                      fontFamily: 'Georgia, serif'
                    }}
                  >
                    Начать квест
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    style={{
                      padding: '1rem 1.5rem',
                      background: 'rgba(93,74,55,0.3)',
                      border: '2px solid rgba(93,74,55,0.5)',
                      borderRadius: '8px',
                      color: '#5d4e37',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
                      fontFamily: 'Georgia, serif'
                    }}
                  >
                    Отказаться
                  </motion.button>
                </div>
              </>
            ) : (
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8b6d4f',
                fontSize: '1.5rem',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif'
              }}>
                Выбери квест из списка
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FinanceMissions;