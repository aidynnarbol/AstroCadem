// src/components/planets/finance/FinanceVideos.jsx
// СВИТОК С ВИДЕО

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Lock, CheckCircle } from 'lucide-react';
import { useUser } from '../../../contexts/UserContext';

function FinanceVideos({ onClose }) {
  const { user } = useUser();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 'history-of-money',
      title: 'История денег',
      duration: '8 минут',
      description: 'Удивительное путешествие через века: от первого обмена ракушками до современных цифровых валют. Узнай как человечество изобрело деньги и почему они так важны.',
      icon: '💰',
      unlocked: true,
      requiredMission: null
    },
    {
      id: 'budget-rule',
      title: 'Правило 50/30/20',
      duration: '6 минут',
      description: 'Простой и эффективный способ управления личными финансами. Научись распределять свои деньги так, чтобы хватало на всё необходимое и оставалось на мечты!',
      icon: '📊',
      unlocked: false,
      requiredMission: 'finance-2'
    },
    {
      id: 'needs-vs-wants',
      title: 'Потребности и желания',
      duration: '7 минут',
      description: 'Как отличить то что тебе действительно нужно от того что просто хочется? Этот навык поможет тебе принимать умные финансовые решения каждый день.',
      icon: '🎯',
      unlocked: false,
      requiredMission: 'finance-3'
    },
    {
      id: 'compound-interest',
      title: 'Сила сложного процента',
      duration: '10 минут',
      description: 'Открой для себя восьмое чудо света! Узнай как небольшие накопления могут превратиться в настоящее богатство благодаря магии сложного процента.',
      icon: '📈',
      unlocked: false,
      requiredMission: 'finance-4'
    },
    {
      id: 'investment-basics',
      title: 'Основы инвестирования',
      duration: '15 минут',
      description: 'Первые шаги в мире инвестиций для начинающих. Узнай как заставить свои деньги работать на тебя и приумножать твоё богатство!',
      icon: '📉',
      unlocked: false,
      requiredMission: 'finance-5'
    }
  ];

  const isVideoUnlocked = (video) => {
    if (video.unlocked) return true;
    if (!video.requiredMission) return true;
    return user?.completedMissions?.[video.requiredMission]?.completed || false;
  };

  const isVideoWatched = (videoId) => {
    return user?.financeVideos?.watched?.[videoId] || false;
  };

  const getVideoStatus = (video) => {
    const unlocked = isVideoUnlocked(video);
    const watched = isVideoWatched(video.id);
    
    if (watched) return 'watched';
    if (unlocked) return 'unlocked';
    return 'locked';
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
        initial={{ scale: 0.9, rotateZ: -5 }}
        animate={{ scale: 1, rotateZ: 0 }}
        exit={{ scale: 0.9, rotateZ: 5 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '85vh',
          position: 'relative',
          filter: 'drop-shadow(0 40px 100px rgba(0,0,0,0.9))'
        }}
      >
        {/* КНОПКА ЗАКРЫТЬ */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
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

        {/* СВИТОК */}
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: '600px',
          padding: '4rem 3rem',
          background: `
            radial-gradient(circle at 50% 0%, rgba(0,0,0,0.2) 0%, transparent 30%),
            radial-gradient(circle at 50% 100%, rgba(0,0,0,0.2) 0%, transparent 30%),
            linear-gradient(135deg, #d4a574 0%, #c9a961 20%, #f4e4c1 40%, #e8d5b7 60%, #c9a961 80%, #d4a574 100%)
          `,
          boxShadow: `
            inset 0 30px 60px rgba(0,0,0,0.2),
            inset 0 -30px 60px rgba(0,0,0,0.2),
            0 20px 60px rgba(0,0,0,0.8)
          `,
          borderRadius: '1rem',
          overflow: 'hidden',
          fontFamily: 'Georgia, serif'
        }}>
          {/* РВАНЫЙ КРАЙ СВЕРХУ */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40px',
            background: `
              linear-gradient(90deg, 
                transparent 0%, transparent 3%,
                #d4a574 3%, #d4a574 5%,
                transparent 5%, transparent 8%,
                #c9a961 8%, #c9a961 11%,
                transparent 11%, transparent 15%,
                #d4a574 15%, #d4a574 18%,
                transparent 18%, transparent 22%,
                #c9a961 22%, #c9a961 25%,
                transparent 25%, transparent 28%,
                #d4a574 28%, #d4a574 32%,
                transparent 32%, transparent 36%,
                #c9a961 36%, #c9a961 40%,
                transparent 40%, transparent 44%,
                #d4a574 44%, #d4a574 47%,
                transparent 47%, transparent 51%,
                #c9a961 51%, #c9a961 55%,
                transparent 55%, transparent 59%,
                #d4a574 59%, #d4a574 63%,
                transparent 63%, transparent 67%,
                #c9a961 67%, #c9a961 71%,
                transparent 71%, transparent 75%,
                #d4a574 75%, #d4a574 79%,
                transparent 79%, transparent 83%,
                #c9a961 83%, #c9a961 87%,
                transparent 87%, transparent 91%,
                #d4a574 91%, #d4a574 95%,
                transparent 95%, transparent 100%
              )
            `,
            filter: 'blur(1px)'
          }} />

          {/* РВАНЫЙ КРАЙ СНИЗУ */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40px',
            background: `
              linear-gradient(90deg, 
                transparent 0%, transparent 2%,
                #c9a961 2%, #c9a961 6%,
                transparent 6%, transparent 10%,
                #d4a574 10%, #d4a574 14%,
                transparent 14%, transparent 18%,
                #c9a961 18%, #c9a961 22%,
                transparent 22%, transparent 26%,
                #d4a574 26%, #d4a574 30%,
                transparent 30%, transparent 34%,
                #c9a961 34%, #c9a961 38%,
                transparent 38%, transparent 42%,
                #d4a574 42%, #d4a574 46%,
                transparent 46%, transparent 50%,
                #c9a961 50%, #c9a961 54%,
                transparent 54%, transparent 58%,
                #d4a574 58%, #d4a574 62%,
                transparent 62%, transparent 66%,
                #c9a961 66%, #c9a961 70%,
                transparent 70%, transparent 74%,
                #d4a574 74%, #d4a574 78%,
                transparent 78%, transparent 82%,
                #c9a961 82%, #c9a961 86%,
                transparent 86%, transparent 90%,
                #d4a574 90%, #d4a574 94%,
                transparent 94%, transparent 100%
              )
            `,
            filter: 'blur(1px)'
          }} />

          {/* СКРУЧЕННЫЙ ЛЕВЫЙ КРАЙ */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: '40px',
            bottom: '40px',
            width: '60px',
            background: `linear-gradient(90deg, #a0824e 0%, #c9a961 30%, #d4a574 50%, #c9a961 70%, #8d6e3d 100%)`,
            boxShadow: `
              inset 10px 0 20px rgba(0,0,0,0.4),
              -5px 0 15px rgba(0,0,0,0.6)
            `,
            borderRadius: '0 50% 50% 0'
          }} />

          {/* СКРУЧЕННЫЙ ПРАВЫЙ КРАЙ */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: '40px',
            bottom: '40px',
            width: '60px',
            background: `linear-gradient(90deg, #8d6e3d 0%, #c9a961 30%, #d4a574 50%, #c9a961 70%, #a0824e 100%)`,
            boxShadow: `
              inset -10px 0 20px rgba(0,0,0,0.4),
              5px 0 15px rgba(0,0,0,0.6)
            `,
            borderRadius: '50% 0 0 50%'
          }} />

          {/* ЗАГОЛОВОК */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            paddingBottom: '1.5rem',
            borderBottom: '3px double rgba(139,105,20,0.5)'
          }}>
            <h1 style={{
              color: '#3d2f28',
              fontSize: '2.5rem',
              fontWeight: 900,
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              Видео-материалы
            </h1>
            <div style={{
              color: '#8b6914',
              fontSize: '1rem',
              fontStyle: 'italic',
              marginTop: '0.5rem'
            }}>
              Обучающие свитки капитана Монети
            </div>
          </div>

          {/* СПИСОК ВИДЕО */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            maxHeight: '500px',
            overflowY: 'auto',
            paddingRight: '1rem'
          }}>
            {videos.map((video, index) => {
              const status = getVideoStatus(video);
              const isLocked = status === 'locked';
              const isWatched = status === 'watched';

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!isLocked ? { x: 10, scale: 1.02 } : {}}
                  onClick={() => !isLocked && setSelectedVideo(video)}
                  style={{
                    padding: '1.5rem',
                    background: isWatched 
                      ? 'rgba(16,185,129,0.15)'
                      : isLocked 
                      ? 'rgba(93,74,55,0.2)' 
                      : 'rgba(201,169,97,0.15)',
                    border: isWatched
                      ? '2px solid rgba(16,185,129,0.4)'
                      : isLocked
                      ? '2px solid rgba(93,74,55,0.4)'
                      : '2px solid rgba(139,105,20,0.3)',
                    borderRadius: '0.75rem',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    opacity: isLocked ? 0.6 : 1,
                    transition: 'all 0.3s',
                    position: 'relative',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}>
                    {/* ИКОНКА */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '0.75rem',
                      background: isWatched
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : isLocked
                        ? 'linear-gradient(135deg, #5d4e37 0%, #3d2f28 100%)'
                        : 'linear-gradient(135deg, #c9a961 0%, #8b6914 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      flexShrink: 0,
                      border: '3px solid rgba(255,255,255,0.2)'
                    }}>
                      {isLocked ? '🔒' : video.icon}
                    </div>

                    {/* ИНФОРМАЦИЯ */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        color: '#3d2f28',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        margin: 0
                      }}>
                        {isLocked ? '???' : video.title}
                      </h3>
                      <div style={{
                        color: '#5d4e37',
                        fontSize: '0.9375rem',
                        marginBottom: '0.5rem'
                      }}>
                        {isLocked ? 'Видео заблокировано' : `Длительность: ${video.duration}`}
                      </div>
                      {isLocked && video.requiredMission && (
                        <div style={{
                          color: '#8b6914',
                          fontSize: '0.875rem',
                          fontStyle: 'italic'
                        }}>
                          Завершите миссию {video.requiredMission.replace('finance-', '')} чтобы открыть
                        </div>
                      )}
                    </div>

                    {/* СТАТУС */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: isWatched
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : isLocked
                        ? 'rgba(93,74,55,0.4)'
                        : 'linear-gradient(135deg, #8b6914, #5d4e37)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                      flexShrink: 0
                    }}>
                      {isWatched ? (
                        <CheckCircle size={28} color="#fff" />
                      ) : isLocked ? (
                        <Lock size={28} color="#8d8d8d" />
                      ) : (
                        <Play size={28} color="#f4e4c1" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ПЯТНА И ПОТЁРТОСТИ */}
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(139,105,20,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '25%',
            left: '12%',
            width: '60px',
            height: '60px',
            background: 'radial-gradient(circle, rgba(139,105,20,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />
        </div>
      </motion.div>

      {/* ДЕТАЛИ ВИДЕО */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
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
              {/* ИКОНКА ВИДЕО */}
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #c9a961 0%, #8b6914 100%)',
                  borderRadius: '1rem',
                  fontSize: '4rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                  border: '4px solid rgba(255,255,255,0.2)'
                }}>
                  {selectedVideo.icon}
                </div>
              </div>

              {/* ЗАГОЛОВОК */}
              <h2 style={{
                color: '#3d2f28',
                fontSize: '2rem',
                fontWeight: 900,
                margin: 0,
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {selectedVideo.title}
              </h2>

              {/* ДЛИТЕЛЬНОСТЬ */}
              <div style={{
                color: '#8b6914',
                fontSize: '1.125rem',
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                Длительность: {selectedVideo.duration}
              </div>

              {/* ОПИСАНИЕ */}
              <p style={{
                color: '#3d2f28',
                fontSize: '1.125rem',
                lineHeight: 1.8,
                textAlign: 'justify',
                marginBottom: '2rem'
              }}>
                {selectedVideo.description}
              </p>

              {/* ЗАГЛУШКА */}
              <div style={{
                padding: '2rem',
                background: 'rgba(139,105,20,0.15)',
                borderRadius: '0.75rem',
                border: '2px solid rgba(139,105,20,0.3)',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  🚧
                </div>
                <div style={{
                  color: '#5d4e37',
                  fontSize: '1.25rem',
                  fontWeight: 700
                }}>
                  Видео в разработке
                </div>
                <div style={{
                  color: '#8b6914',
                  fontSize: '0.9375rem',
                  marginTop: '0.5rem',
                  fontStyle: 'italic'
                }}>
                  Скоро будет доступно для просмотра
                </div>
              </div>

              {/* КНОПКА ЗАКРЫТЬ */}
              <button
                onClick={() => setSelectedVideo(null)}
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
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FinanceVideos;