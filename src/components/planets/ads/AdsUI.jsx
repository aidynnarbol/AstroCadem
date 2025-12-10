// src/components/planets/ads/AdsUI.jsx
// UI КОМПОНЕНТЫ В КИБЕРПАНК СТИЛЕ

import { motion } from 'framer-motion';
import { Lock, CheckCircle, Shield, AlertTriangle, Eye, Target } from 'lucide-react';

// Карточка миссии в киберпанк стиле
export function AdsMissionCard({ mission, isLocked, isCompleted, onClick, distanceToCity }) {
  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.03, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={!isLocked ? onClick : undefined}
      style={{
        position: 'relative',
        background: isCompleted 
          ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 163, 74, 0.1))' 
          : 'linear-gradient(135deg, rgba(26, 0, 48, 0.5), rgba(15, 0, 26, 0.3))',
        backdropFilter: 'blur(15px)',
        border: isCompleted 
          ? '3px solid #22C55E' 
          : '3px solid rgba(236, 72, 153, 0.6)',
        borderRadius: '1.5rem',
        padding: '2rem',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.5 : 1,
        overflow: 'hidden',
        boxShadow: isCompleted
          ? '0 10px 40px rgba(34, 197, 94, 0.3)'
          : '0 10px 40px rgba(236, 72, 153, 0.3)'
      }}
    >
      {/* Сканирующие линии */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)',
          height: '30%',
          pointerEvents: 'none'
        }}
      />

      {/* Киберпанк углы */}
      {[
        { top: '1rem', left: '1rem', border: 'Top Left' },
        { top: '1rem', right: '1rem', border: 'Top Right' },
        { bottom: '1rem', left: '1rem', border: 'Bottom Left' },
        { bottom: '1rem', right: '1rem', border: 'Bottom Right' }
      ].map((pos, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.4, 1, 0.4],
            boxShadow: [
              `0 0 5px #EC4899`,
              `0 0 15px #00FFFF`,
              `0 0 5px #EC4899`
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3
          }}
          style={{
            position: 'absolute',
            ...pos,
            width: '30px',
            height: '30px',
            [`border${pos.border.split(' ')[0]}`]: '3px solid #EC4899',
            [`border${pos.border.split(' ')[1]}`]: '3px solid #EC4899',
            borderRadius: '6px'
          }}
        />
      ))}

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
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)'
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
        color: '#00FFFF',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'monospace'
      }}>
        <Shield size={20} style={{ color: '#EC4899' }} />
        МИССИЯ {mission.number}
      </div>

      {/* Название */}
      <h3 style={{
        fontSize: '1.75rem',
        fontWeight: 900,
        color: '#EC4899',
        marginBottom: '1rem',
        textShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
        fontFamily: 'monospace'
      }}>
        {mission.title}
      </h3>

      {/* Локация */}
      <div style={{
        fontSize: '0.9375rem',
        color: '#F9A8D4',
        marginBottom: '1rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Eye size={18} />
        {mission.location}
      </div>

      {/* Расстояние до города */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid rgba(236, 72, 153, 0.3)'
      }}>
        <Target size={20} style={{ color: '#00FFFF' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: '#F9A8D4', marginBottom: '0.25rem' }}>
            До Города Иллюзий
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
                background: 'linear-gradient(90deg, #EC4899, #00FFFF)',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)'
              }}
            />
          </div>
        </div>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 800,
          color: '#00FFFF',
          fontFamily: 'monospace'
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
          background: 'rgba(236, 72, 153, 0.1)',
          border: '1px solid rgba(236, 72, 153, 0.4)',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🛡️</div>
          <div style={{ fontSize: '0.75rem', color: '#F9A8D4', fontFamily: 'monospace' }}>+200 монет</div>
        </div>
        <div style={{
          flex: 1,
          padding: '0.75rem',
          background: 'rgba(0, 255, 255, 0.1)',
          border: '1px solid rgba(0, 255, 255, 0.4)',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>⭐</div>
          <div style={{ fontSize: '0.75rem', color: '#67E8F9', fontFamily: 'monospace' }}>+250 XP</div>
        </div>
      </div>

      {/* Цифровой дождь фон */}
      {!isLocked && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: '0.875rem',
            opacity: 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            pointerEvents: 'none',
            color: i % 2 === 0 ? '#EC4899' : '#00FFFF',
            fontFamily: 'monospace',
            fontWeight: 700
          }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          {['0', '1', '$', '%'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Прогресс планеты
export function AdsPlanetProgress({ currentMission, totalMissions }) {
  const progress = (currentMission / totalMissions) * 100;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(26, 0, 48, 0.6), rgba(15, 0, 26, 0.4))',
      backdropFilter: 'blur(15px)',
      border: '3px solid rgba(236, 72, 153, 0.6)',
      borderRadius: '1.5rem',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Сканирующая линия */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.3), transparent)',
          pointerEvents: 'none'
        }}
      />

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
            color: '#EC4899',
            marginBottom: '0.5rem',
            textShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
            fontFamily: 'monospace',
            textTransform: 'uppercase'
          }}>
            🌃 Путь к Городу Иллюзий
          </h3>
          <p style={{
            fontSize: '0.9375rem',
            color: '#F9A8D4',
            fontFamily: 'monospace'
          }}>
            МИССИЯ {currentMission} ИЗ {totalMissions}
          </p>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            fontSize: '4rem',
            filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))'
          }}
        >
          🎭
        </motion.div>
      </div>

      {/* Прогресс бар */}
      <div style={{
        height: '12px',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '2px solid rgba(236, 72, 153, 0.4)',
        marginBottom: '1rem'
      }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #EC4899, #00FFFF, #A855F7)',
            backgroundSize: '200% 100%',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)'
          }}
        />
      </div>

      {/* Этапы пути */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.5rem'
      }}>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            style={{
              textAlign: 'center',
              opacity: step <= currentMission ? 1 : 0.3
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
                  ? 'linear-gradient(135deg, #EC4899, #00FFFF)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: step === currentMission ? '3px solid #00FFFF' : '2px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                color: step <= currentMission ? '#FFF' : '#666',
                boxShadow: step <= currentMission ? '0 0 20px rgba(236, 72, 153, 0.6)' : 'none',
                fontFamily: 'monospace'
              }}
            >
              {step < currentMission ? '✓' : step}
            </motion.div>
            <div style={{
              fontSize: '0.6875rem',
              color: step <= currentMission ? '#00FFFF' : '#666',
              fontWeight: 700,
              fontFamily: 'monospace',
              textTransform: 'uppercase'
            }}>
              {step === 1 && 'Окраина'}
              {step === 2 && 'Район 2'}
              {step === 3 && 'Район 3'}
              {step === 4 && 'Центр'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default {
  AdsMissionCard,
  AdsPlanetProgress
};