// src/components/planets/finance/FinanceStory.jsx
// ТЕАТРАЛЬНАЯ СЦЕНА КАПИТАНА МОНЕТИ

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUser } from '../../../contexts/UserContext';

function FinanceStory({ onClose }) {
  const { user } = useUser();
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useState(() => {
    setTimeout(() => setCurtainOpen(true), 500);
  }, []);

  const chapters = [
    {
      id: 'act-1',
      number: 'I',
      title: 'Юнга на корабле',
      subtitle: 'Начало пути',
      description: 'Молодой Монети впервые ступает на палубу торгового судна. Он ещё не знает, что этот день изменит всю его жизнь.',
      duration: '8 минут',
      unlocked: true
    },
    {
      id: 'act-2',
      number: 'II',
      title: 'Первая монета',
      subtitle: 'Урок о ценности',
      description: 'Старый боцман рассказывает юному Монети историю о том, как он заработал свою первую монету и почему так её ценит.',
      duration: '7 минут',
      unlocked: false
    },
    {
      id: 'act-3',
      number: 'III',
      title: 'Шторм и сокровища',
      subtitle: 'Испытание судьбы',
      description: 'Корабль попадает в страшный шторм. Монети должен сделать выбор между спасением груза или помощью товарищам.',
      duration: '10 минут',
      unlocked: false
    },
    {
      id: 'act-4',
      number: 'IV',
      title: 'Капитан Монети',
      subtitle: 'Путь к богатству',
      description: 'Спустя годы Монети становится капитаном. Он делится своими секретами успеха и рассказывает как разумно управлял деньгами.',
      duration: '9 минут',
      unlocked: false
    },
    {
      id: 'act-5',
      number: 'V',
      title: 'Три пути',
      subtitle: 'Выбор судьбы',
      description: 'Финальная глава. Твой выбор определит какую концовку ты увидишь: путь купца, путь авантюриста или путь мудреца.',
      duration: '12 минут',
      unlocked: false,
      isFinal: true
    }
  ];

  const endings = [
    {
      id: 'merchant',
      title: 'Путь купца',
      description: 'Монети становится богатым торговцем и строит торговую империю',
      icon: '🏛️'
    },
    {
      id: 'adventurer',
      title: 'Путь авантюриста',
      description: 'Монети отправляется на поиски легендарного сокровища',
      icon: '⚔️'
    },
    {
      id: 'sage',
      title: 'Путь мудреца',
      description: 'Монети посвящает жизнь обучению молодых моряков финансовой мудрости',
      icon: '📚'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.98)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      onClick={onClose}
    >
      {/* ТЕАТРАЛЬНАЯ СЦЕНА */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '95vw',
          height: '90vh',
          maxWidth: '1600px',
          position: 'relative',
          perspective: '2000px'
        }}
      >
        {/* КНОПКА ЗАКРЫТЬ */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 3000,
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

        {/* РАМКА СЦЕНЫ */}
        <div style={{
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(135deg, #2d1f18 0%, #1a1410 100%)
          `,
          borderRadius: '2rem',
          padding: '3rem',
          boxShadow: `
            0 0 0 15px #3d2f28,
            0 0 0 20px #8b6914,
            inset 0 0 100px rgba(0,0,0,0.9),
            0 40px 120px rgba(0,0,0,0.95)
          `,
          position: 'relative'
        }}>
          {/* ЗОЛОТЫЕ УКРАШЕНИЯ ПО УГЛАМ */}
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              ...(pos.includes('t') ? { top: '10px' } : { bottom: '10px' }),
              ...(pos.includes('l') ? { left: '10px' } : { right: '10px' }),
              width: '100px',
              height: '100px',
              background: `radial-gradient(circle at ${pos.includes('l') ? 'left' : 'right'} ${pos.includes('t') ? 'top' : 'bottom'}, #c9a961 0%, #8b6914 50%, transparent 100%)`,
              opacity: 0.3
            }} />
          ))}

          {/* ТАБЛИЧКА "ИСТОРИЯ КАПИТАНА МОНЕТИ" */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.75rem 2.5rem',
            background: `linear-gradient(135deg, #8b6914 0%, #5d4e37 100%)`,
            border: '4px solid #3d2f28',
            borderRadius: '1rem',
            boxShadow: `0 10px 30px rgba(0,0,0,0.9), inset 0 2px 5px rgba(201,169,97,0.3)`,
            zIndex: 100
          }}>
            <h1 style={{
              color: '#f4e4c1',
              fontSize: '1.5rem',
              fontWeight: 900,
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontFamily: 'Georgia, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
              История капитана Монети
            </h1>
          </div>

          {/* СЦЕНА */}
          <div style={{
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(ellipse at 50% 100%, rgba(139,105,20,0.2) 0%, transparent 60%),
              linear-gradient(180deg, #1a1410 0%, #2d1f18 50%, #1a1410 100%)
            `,
            borderRadius: '1rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
          }}>
            {/* ДЕРЕВЯННЫЙ ПОЛ СЦЕНЫ */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: `
                repeating-linear-gradient(90deg, 
                  #5d4e37 0px, 
                  #6d5e47 8px, 
                  #5d4e37 16px
                ),
                linear-gradient(180deg, #6d5e47 0%, #5d4e37 100%)
              `,
              boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.6)',
              borderRadius: '0 0 1rem 1rem'
            }} />

            {/* ЗАДНИЙ ФОН - СТЕНА ТАВЕРНЫ */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: `
                linear-gradient(180deg, 
                  rgba(45,31,24,0.8) 0%, 
                  rgba(45,31,24,0.6) 50%, 
                  transparent 100%
                )
              `
            }} />

            {/* ЛЕВЫЙ ЗАНАВЕС */}
            <motion.div
              animate={{
                x: curtainOpen ? '-100%' : 0
              }}
              transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '50%',
                background: `
                  repeating-linear-gradient(90deg,
                    #8b1818 0px,
                    #6b0000 4px,
                    #8b1818 8px,
                    #ab2828 12px,
                    #8b1818 16px
                  ),
                  linear-gradient(90deg, #6b0000 0%, #8b1818 100%)
                `,
                boxShadow: `
                  inset -20px 0 40px rgba(0,0,0,0.8),
                  20px 0 60px rgba(0,0,0,0.9)
                `,
                zIndex: 100,
                borderRight: '3px solid rgba(139,105,20,0.5)'
              }}
            >
              {/* ЗОЛОТАЯ КИСТЬ */}
              <div style={{
                position: 'absolute',
                right: '-30px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '60px',
                height: '150px',
                background: 'linear-gradient(135deg, #c9a961 0%, #8b6914 100%)',
                borderRadius: '0 50% 50% 0',
                boxShadow: '5px 0 15px rgba(0,0,0,0.6)'
              }} />
            </motion.div>

            {/* ПРАВЫЙ ЗАНАВЕС */}
            <motion.div
              animate={{
                x: curtainOpen ? '100%' : 0
              }}
              transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '50%',
                background: `
                  repeating-linear-gradient(90deg,
                    #8b1818 0px,
                    #ab2828 4px,
                    #8b1818 8px,
                    #6b0000 12px,
                    #8b1818 16px
                  ),
                  linear-gradient(90deg, #8b1818 0%, #6b0000 100%)
                `,
                boxShadow: `
                  inset 20px 0 40px rgba(0,0,0,0.8),
                  -20px 0 60px rgba(0,0,0,0.9)
                `,
                zIndex: 100,
                borderLeft: '3px solid rgba(139,105,20,0.5)'
              }}
            >
              {/* ЗОЛОТАЯ КИСТЬ */}
              <div style={{
                position: 'absolute',
                left: '-30px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '60px',
                height: '150px',
                background: 'linear-gradient(135deg, #8b6914 0%, #c9a961 100%)',
                borderRadius: '50% 0 0 50%',
                boxShadow: '-5px 0 15px rgba(0,0,0,0.6)'
              }} />
            </motion.div>

            {/* КОНТЕНТ СЦЕНЫ */}
            <AnimatePresence mode="wait">
              {curtainOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  style={{
                    position: 'absolute',
                    inset: '5%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    zIndex: 50,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingRight: '1rem'
                  }}
                >
                  {/* СТОЛ КАПИТАНА */}
                  <div style={{
                    position: 'relative',
                    width: '80%',
                    maxWidth: '1000px',
                    marginBottom: '3rem'
                  }}>
                    {/* СТОЛЕШНИЦА */}
                    <div style={{
                      width: '100%',
                      height: '120px',
                      background: `
                        repeating-linear-gradient(90deg, #5d4e37 0px, #6d5e47 6px, #5d4e37 12px),
                        linear-gradient(180deg, #6d5e47 0%, #5d4e37 100%)
                      `,
                      borderRadius: '1rem',
                      boxShadow: `
                        0 20px 40px rgba(0,0,0,0.8),
                        inset 0 5px 15px rgba(255,255,255,0.1)
                      `,
                      position: 'relative'
                    }}>
                      {/* СВЕЧИ */}
                      {[-200, -100, 100, 200].map((offset, i) => (
                        <div key={i} style={{
                          position: 'absolute',
                          left: `calc(50% + ${offset}px)`,
                          top: '-40px',
                          width: '20px',
                          height: '80px',
                          background: 'linear-gradient(180deg, #f4e4c1 0%, #d4c4a8 100%)',
                          borderRadius: '3px',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.6)'
                        }}>
                          {/* ПЛАМЯ */}
                          <motion.div
                            animate={{
                              scaleY: [1, 1.1, 1],
                              opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                            style={{
                              position: 'absolute',
                              top: '-25px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '15px',
                              height: '25px',
                              background: `
                                radial-gradient(ellipse at 50% 100%, 
                                  #ff6b00 0%, 
                                  #ffa500 30%, 
                                  #ffff00 60%, 
                                  transparent 100%
                                )
                              `,
                              borderRadius: '50% 50% 20% 20%',
                              filter: 'blur(2px)'
                            }}
                          />
                          {/* БЛИК ПЛАМЕНИ */}
                          <motion.div
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.3, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                            style={{
                              position: 'absolute',
                              top: '-50px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '80px',
                              height: '80px',
                              background: 'radial-gradient(circle, rgba(255,165,0,0.3) 0%, transparent 70%)',
                              borderRadius: '50%',
                              pointerEvents: 'none'
                            }}
                          />
                        </div>
                      ))}

                      {/* КАРТЫ НА СТОЛЕ */}
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '30%',
                        width: '150px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #e8d5b7 0%, #d4c4a8 100%)',
                        borderRadius: '0.5rem',
                        transform: 'rotate(-5deg)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.6)',
                        border: '2px solid rgba(139,105,20,0.3)'
                      }} />

                      {/* БОКАЛ */}
                      <div style={{
                        position: 'absolute',
                        top: '30px',
                        right: '25%',
                        width: '50px',
                        height: '60px',
                        background: `
                          radial-gradient(ellipse at 50% 0%, rgba(139,32,32,0.6) 0%, rgba(139,32,32,0.3) 100%)
                        `,
                        borderRadius: '0 0 50% 50%',
                        border: '2px solid rgba(139,105,20,0.4)',
                        boxShadow: `
                          inset 0 2px 5px rgba(255,255,255,0.3),
                          0 5px 15px rgba(0,0,0,0.6)
                        `
                      }} />
                    </div>
                  </div>

                  {/* НАЗВАНИЕ "ИСТОРИЯ В ПЯТИ АКТАХ" */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{
                      marginBottom: '1.5rem',
                      textAlign: 'center'
                    }}
                  >
                    <h2 style={{
                      color: '#c9a961',
                      fontSize: '2rem',
                      fontWeight: 900,
                      margin: 0,
                      marginBottom: '0.25rem',
                      fontFamily: 'Georgia, serif',
                      textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
                      letterSpacing: '0.1em'
                    }}>
                      История в пяти актах
                    </h2>
                    <div style={{
                      color: '#8b6914',
                      fontSize: '1rem',
                      fontStyle: 'italic',
                      fontFamily: 'Georgia, serif'
                    }}>
                      Путешествие от юнги до капитана
                    </div>
                  </motion.div>

                  {/* АКТЫ (ГЛАВЫ) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '1.5rem',
                    width: '100%',
                    maxWidth: '1400px',
                    marginBottom: '1.5rem'
                  }}>
                    {chapters.map((chapter, index) => {
                      const unlocked = chapter.unlocked;
                      
                      return (
                        <motion.div
                          key={chapter.id}
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.7 + index * 0.15 }}
                          whileHover={unlocked ? { y: -10, scale: 1.05 } : {}}
                          onClick={() => unlocked && setSelectedChapter(chapter)}
                          style={{
                            padding: '1.5rem 1.25rem',
                            minHeight: '180px',
                            background: unlocked
                              ? `
                                radial-gradient(circle at 50% 0%, rgba(201,169,97,0.3) 0%, transparent 60%),
                                linear-gradient(135deg, #f4e4c1 0%, #e8d5b7 100%)
                              `
                              : `
                                radial-gradient(circle at 50% 50%, rgba(93,74,55,0.2) 0%, transparent 70%),
                                linear-gradient(135deg, #3d3d3d 0%, #2d2d2d 100%)
                              `,
                            borderRadius: '1rem',
                            border: unlocked ? '3px solid rgba(139,105,20,0.5)' : '3px solid rgba(139,105,20,0.3)',
                            cursor: unlocked ? 'pointer' : 'not-allowed',
                            opacity: unlocked ? 1 : 0.7,
                            transition: 'all 0.3s',
                            position: 'relative',
                            boxShadow: `0 10px 30px rgba(0,0,0,0.7)`,
                            fontFamily: 'Georgia, serif',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {/* НОМЕР АКТА */}
                          <div style={{
                            fontSize: '3.5rem',
                            fontWeight: 900,
                            color: unlocked ? '#8b6914' : '#8d7856',
                            marginBottom: '0.75rem',
                            textShadow: '3px 3px 6px rgba(0,0,0,0.6)'
                          }}>
                            {unlocked ? chapter.number : '?'}
                          </div>

                          {/* НАЗВАНИЕ */}
                          <h3 style={{
                            color: unlocked ? '#3d2f28' : '#9d8d6d',
                            fontSize: '1rem',
                            fontWeight: 700,
                            margin: 0,
                            marginBottom: '0.5rem',
                            lineHeight: 1.3
                          }}>
                            {unlocked ? chapter.title : 'Заблокировано'}
                          </h3>

                          {/* ПОДЗАГОЛОВОК */}
                          {unlocked && (
                            <div style={{
                              color: '#8b6914',
                              fontSize: '0.8125rem',
                              fontStyle: 'italic',
                              marginBottom: '0.5rem'
                            }}>
                              {chapter.subtitle}
                            </div>
                          )}

                          {/* ДЛИТЕЛЬНОСТЬ */}
                          {unlocked && (
                            <div style={{
                              color: '#5d4e37',
                              fontSize: '0.8125rem',
                              fontWeight: 600
                            }}>
                              {chapter.duration}
                            </div>
                          )}

                          {/* ЗАМОК */}
                          {!unlocked && (
                            <div style={{
                              fontSize: '2rem',
                              marginTop: '0.75rem',
                              opacity: 0.6
                            }}>
                              🔒
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* КОНЦОВКИ */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    style={{
                      marginTop: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <h3 style={{
                      color: '#c9a961',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '1.25rem',
                      fontFamily: 'Georgia, serif',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}>
                      Три возможные концовки
                    </h3>
                    <div style={{
                      display: 'flex',
                      gap: '1.25rem',
                      justifyContent: 'center'
                    }}>
                      {endings.map((ending, index) => (
                        <motion.div
                          key={ending.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 2.7 + index * 0.2, type: 'spring' }}
                          style={{
                            padding: '1.25rem 1.5rem',
                            width: '240px',
                            background: `
                              radial-gradient(circle at 50% 0%, rgba(201,169,97,0.3) 0%, transparent 60%),
                              linear-gradient(135deg, #e8d5b7 0%, #d4c4a8 100%)
                            `,
                            borderRadius: '1rem',
                            border: '3px solid rgba(139,105,20,0.4)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
                            fontFamily: 'Georgia, serif',
                            opacity: 0.8
                          }}
                        >
                          <div style={{
                            fontSize: '2.25rem',
                            marginBottom: '0.5rem'
                          }}>
                            {ending.icon}
                          </div>
                          <div style={{
                            color: '#3d2f28',
                            fontSize: '0.9375rem',
                            fontWeight: 700,
                            marginBottom: '0.5rem'
                          }}>
                            {ending.title}
                          </div>
                          <div style={{
                            color: '#5d4e37',
                            fontSize: '0.75rem',
                            lineHeight: 1.4
                          }}>
                            {ending.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* ЗАГЛУШКА "В РАЗРАБОТКЕ" */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5 }}
                    style={{
                      marginTop: '1.5rem',
                      marginBottom: '2rem',
                      padding: '1.5rem 2.5rem',
                      background: `
                        linear-gradient(135deg, rgba(139,105,20,0.5) 0%, rgba(93,74,55,0.5) 100%)
                      `,
                      borderRadius: '1rem',
                      border: '3px solid rgba(139,105,20,0.6)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                      fontFamily: 'Georgia, serif',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      fontSize: '2.5rem',
                      marginBottom: '0.75rem'
                    }}>
                      🚧
                    </div>
                    <div style={{
                      color: '#f4e4c1',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem'
                    }}>
                      Сюжет в разработке
                    </div>
                    <div style={{
                      color: '#c9a961',
                      fontSize: '1rem',
                      fontStyle: 'italic'
                    }}>
                      Скоро: 5 глав нелинейного сюжета • 3 концовки • 30-40 минут игры
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


      </motion.div>
    </motion.div>
  );
}

export default FinanceStory;