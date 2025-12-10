// src/components/planets/FinanceUI.jsx
// UI КОМПОНЕНТЫ В ФИНАНСОВОМ СТИЛЕ

import { motion } from 'framer-motion';
import { Lock, CheckCircle, Coins, TrendingUp } from 'lucide-react';

// Карточка миссии в финансовом стиле
export function FinanceMissionCard({ mission, isLocked, isCompleted, onClick, distanceToCity }) {
  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.03, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={!isLocked ? onClick : undefined}
      style={{
        position: 'relative',
        background: isCompleted 
          ? 'linear-gradient(135deg, rgba(34, 139, 34, 0.2), rgba(0, 100, 0, 0.1))' 
          : 'linear-gradient(135deg, rgba(139, 69, 19, 0.3), rgba(205, 133, 63, 0.2))',
        backdropFilter: 'blur(10px)',
        border: isCompleted 
          ? '3px solid #22C55E' 
          : '3px solid rgba(255, 215, 0, 0.5)',
        borderRadius: '1.5rem',
        padding: '2rem',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.6 : 1,
        overflow: 'hidden',
        boxShadow: isCompleted
          ? '0 10px 40px rgba(34, 197, 94, 0.3)'
          : '0 10px 40px rgba(255, 215, 0, 0.2)'
      }}
    >
      {/* Декоративные золотые углы */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        width: '40px',
        height: '40px',
        borderTop: '4px solid #FFD700',
        borderLeft: '4px solid #FFD700',
        borderRadius: '10px 0 0 0'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        width: '40px',
        height: '40px',
        borderBottom: '4px solid #FFD700',
        borderRight: '4px solid #FFD700',
        borderRadius: '0 0 10px 0'
      }} />

      {/* Статус */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        zIndex: 10
      }}>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22C55E, #16A34A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)'
            }}
          >
            <CheckCircle size={28} style={{ color: 'white' }} />
          </motion.div>
        )}
        {isLocked && (
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(107, 70, 193, 0.3)',
            border: '2px solid rgba(107, 70, 193, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Lock size={24} style={{ color: '#a78bfa' }} />
          </div>
        )}
      </div>

      {/* Номер миссии */}
      <div style={{
        fontSize: '1rem',
        fontWeight: 900,
        color: '#FFA500',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Coins size={20} style={{ color: '#FFD700' }} />
        Миссия {mission.number}
      </div>

      {/* Название */}
      <h3 style={{
        fontSize: '1.75rem',
        fontWeight: 900,
        color: '#FFD700',
        marginBottom: '1rem',
        textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)'
      }}>
        {mission.title}
      </h3>

      {/* Локация */}
      <div style={{
        fontSize: '0.9375rem',
        color: '#D2691E',
        marginBottom: '1rem',
        fontWeight: 600
      }}>
        📍 {mission.location}
      </div>

      {/* Расстояние до города */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '0.75rem',
        marginBottom: '1rem'
      }}>
        <TrendingUp size={20} style={{ color: '#FFD700' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: '#D2691E', marginBottom: '0.25rem' }}>
            До Золотого Базара
          </div>
          <div style={{
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${100 - parseInt(distanceToCity)}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                borderRadius: '10px'
              }}
            />
          </div>
        </div>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 800,
          color: '#FFD700'
        }}>
          {100 - parseInt(distanceToCity)}%
        </div>
      </div>

      {/* Награды */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'space-between'
      }}>
        <div style={{
          flex: 1,
          padding: '0.75rem',
          background: 'rgba(255, 215, 0, 0.1)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>💰</div>
          <div style={{ fontSize: '0.75rem', color: '#D2691E' }}>+150 монет</div>
        </div>
        <div style={{
          flex: 1,
          padding: '0.75rem',
          background: 'rgba(147, 51, 234, 0.1)',
          border: '1px solid rgba(147, 51, 234, 0.3)',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>⭐</div>
          <div style={{ fontSize: '0.75rem', color: '#a78bfa' }}>+200 XP</div>
        </div>
      </div>

      {/* Анимированные монетки как фон */}
      {!isLocked && [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            opacity: 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            pointerEvents: 'none'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          💰
        </motion.div>
      ))}
    </motion.div>
  );
}

// Прогресс планеты
export function FinancePlanetProgress({ currentMission, totalMissions }) {
  const progress = (currentMission / totalMissions) * 100;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.4), rgba(205, 133, 63, 0.2))',
      backdropFilter: 'blur(10px)',
      border: '3px solid rgba(255, 215, 0, 0.5)',
      borderRadius: '1.5rem',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Заголовок */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            color: '#FFD700',
            marginBottom: '0.5rem',
            textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)'
          }}>
            🏜️ Путь к Золотому Базару
          </h3>
          <p style={{
            fontSize: '0.9375rem',
            color: '#D2691E'
          }}>
            Миссия {currentMission} из {totalMissions}
          </p>
        </div>

        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            fontSize: '4rem',
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
          }}
        >
          💰
        </motion.div>
      </div>

      {/* Прогресс бар */}
      <div style={{
        height: '12px',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        marginBottom: '1rem'
      }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)',
            backgroundSize: '200% 100%',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
          }}
        />
      </div>

      {/* Этапы пути */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.5rem'
      }}>
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            style={{
              textAlign: 'center',
              opacity: step <= currentMission ? 1 : 0.4
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: step <= currentMission ? 1 : 0.7 }}
              transition={{ delay: step * 0.1 }}
              style={{
                width: '40px',
                height: '40px',
                margin: '0 auto 0.5rem',
                borderRadius: '50%',
                background: step <= currentMission
                  ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: step === currentMission ? '3px solid #FFD700' : '2px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                color: step <= currentMission ? '#000' : '#666',
                boxShadow: step <= currentMission ? '0 0 20px rgba(255, 215, 0, 0.5)' : 'none'
              }}
            >
              {step < currentMission ? '✓' : step}
            </motion.div>
            <div style={{
              fontSize: '0.6875rem',
              color: step <= currentMission ? '#FFD700' : '#666',
              fontWeight: 700
            }}>
              {step === 1 && 'Высадка'}
              {step === 2 && 'Оазис'}
              {step === 3 && 'Руины'}
              {step === 4 && 'Караван'}
              {step === 5 && 'Базар'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Диалоговое окно Капитана в финансовом стиле
export function CaptainDialogBox({ text, avatar, onNext, showSkip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        borderTop: '4px solid #FFD700',
        zIndex: 1000
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-end'
      }}>
        {/* Аватар Капитана */}
        {avatar && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '200px',
              height: '250px',
              borderRadius: '1rem',
              overflow: 'hidden',
              border: '3px solid #FFD700',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
              flexShrink: 0
            }}
          >
            <img
              src={avatar}
              alt="Капитан Монети"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        )}

        {/* Текст диалога */}
        <div style={{ flex: 1 }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.5), rgba(205, 133, 63, 0.3))',
            border: '2px solid rgba(255, 215, 0, 0.5)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            position: 'relative'
          }}>
            {/* Золотые уголки */}
            <div style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              width: '25px',
              height: '25px',
              borderTop: '3px solid #FFD700',
              borderLeft: '3px solid #FFD700'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '0.75rem',
              width: '25px',
              height: '25px',
              borderBottom: '3px solid #FFD700',
              borderRight: '3px solid #FFD700'
            }} />

            <div style={{
              fontSize: '1.125rem',
              color: 'white',
              lineHeight: 1.8
            }}>
              {text}
            </div>

            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                fontSize: '1.5rem'
              }}
            >
              💰
            </motion.div>
          </div>

          {/* Кнопки */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
            justifyContent: 'flex-end'
          }}>
            {showSkip && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {}}
                style={{
                  background: 'rgba(107, 70, 193, 0.3)',
                  border: '2px solid rgba(107, 70, 193, 0.5)',
                  color: '#a78bfa',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Пропустить
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                border: '2px solid #FFD700',
                color: '#000',
                padding: '0.75rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Далее
              <span style={{ fontSize: '1.25rem' }}>→</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default {
  FinanceMissionCard,
  FinancePlanetProgress,
  CaptainDialogBox
};