// src/components/planets/cyber/CyberUI.jsx
// UI КОМПОНЕНТЫ В КИБЕР СТИЛЕ

import { motion } from 'framer-motion';
import { Lock, CheckCircle, Shield, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

// Карточка миссии в кибер стиле
export function CyberMissionCard({ mission, isLocked, isCompleted, onClick, securityLevel }) {
  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.03, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={!isLocked ? onClick : undefined}
      style={{
        position: 'relative',
        background: isCompleted 
          ? 'linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 217, 255, 0.1))' 
          : 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(10, 14, 39, 0.9))',
        backdropFilter: 'blur(10px)',
        border: isCompleted 
          ? '3px solid #00ff41' 
          : '3px solid rgba(0, 217, 255, 0.5)',
        borderRadius: '1.5rem',
        padding: '2rem',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.6 : 1,
        overflow: 'hidden',
        boxShadow: isCompleted
          ? '0 10px 40px rgba(0, 255, 65, 0.3)'
          : '0 10px 40px rgba(0, 217, 255, 0.2)'
      }}
    >
      {/* Голографическая сетка фон */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        opacity: 0.3
      }} />

      {/* Декоративные кибер углы */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        width: '40px',
        height: '40px',
        borderTop: '4px solid #00ff41',
        borderLeft: '4px solid #00ff41',
        borderRadius: '10px 0 0 0'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        width: '40px',
        height: '40px',
        borderBottom: '4px solid #00d9ff',
        borderRight: '4px solid #00d9ff',
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
              background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
            }}
          >
            <CheckCircle size={28} style={{ color: '#000' }} />
          </motion.div>
        )}
        {isLocked && (
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 0, 85, 0.3)',
            border: '2px solid rgba(255, 0, 85, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Lock size={24} style={{ color: '#ff0055' }} />
          </div>
        )}
      </div>

      {/* Номер миссии */}
      <div style={{
        fontSize: '1rem',
        fontWeight: 900,
        color: '#00d9ff',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'monospace'
      }}>
        <Shield size={20} style={{ color: '#00ff41' }} />
        МИССИЯ {mission.number}
      </div>

      {/* Название */}
      <h3 style={{
        fontSize: '1.75rem',
        fontWeight: 900,
        color: '#00ff41',
        marginBottom: '1rem',
        textShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
        fontFamily: 'monospace'
      }}>
        {mission.title}
      </h3>

      {/* Локация */}
      <div style={{
        fontSize: '0.9375rem',
        color: '#00d9ff',
        marginBottom: '1rem',
        fontWeight: 600,
        fontFamily: 'monospace'
      }}>
        📍 {mission.location}
      </div>

      {/* Уровень безопасности */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid rgba(0, 255, 65, 0.2)'
      }}>
        <Zap size={20} style={{ color: '#00ff41' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: '#00d9ff', marginBottom: '0.25rem', fontFamily: 'monospace' }}>
            БЕЗОПАСНОСТЬ
          </div>
          <div style={{
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${parseInt(securityLevel)}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00ff41, #00d9ff)',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
              }}
            />
          </div>
        </div>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 800,
          color: '#00ff41',
          fontFamily: 'monospace'
        }}>
          {securityLevel}%
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
          background: 'rgba(0, 255, 65, 0.1)',
          border: '1px solid rgba(0, 255, 65, 0.3)',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🔒</div>
          <div style={{ fontSize: '0.75rem', color: '#00ff41', fontFamily: 'monospace' }}>+150 монет</div>
        </div>
        <div style={{
          flex: 1,
          padding: '0.75rem',
          background: 'rgba(0, 217, 255, 0.1)',
          border: '1px solid rgba(0, 217, 255, 0.3)',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>⭐</div>
          <div style={{ fontSize: '0.75rem', color: '#00d9ff', fontFamily: 'monospace' }}>+200 XP</div>
        </div>
      </div>

      {/* Анимированные защитные щиты как фон */}
      {!isLocked && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            opacity: 0.05,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            pointerEvents: 'none'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          🛡️
        </motion.div>
      ))}

      {/* Сканирующая линия */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(180deg, transparent, #00ff41, transparent)',
          boxShadow: '0 0 10px #00ff41',
          opacity: 0.3
        }}
      />
    </motion.div>
  );
}

// Прогресс планеты
export function CyberPlanetProgress({ currentMission, totalMissions }) {
  const progress = (currentMission / totalMissions) * 100;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(10, 14, 39, 0.9))',
      backdropFilter: 'blur(10px)',
      border: '3px solid rgba(0, 255, 65, 0.5)',
      borderRadius: '1.5rem',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Голографическая сетка */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
        opacity: 0.3
      }} />

      {/* Заголовок */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            color: '#00ff41',
            marginBottom: '0.5rem',
            textShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
            fontFamily: 'monospace'
          }}>
            🛡️ ЗАЩИТА СИСТЕМЫ
          </h3>
          <p style={{
            fontSize: '0.9375rem',
            color: '#00d9ff',
            fontFamily: 'monospace'
          }}>
            МИССИЯ {currentMission} ИЗ {totalMissions}
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
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.5))'
          }}
        >
          🔐
        </motion.div>
      </div>

      {/* Прогресс бар */}
      <div style={{
        height: '12px',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '2px solid rgba(0, 255, 65, 0.3)',
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #00ff41, #00d9ff, #00ff41)',
            backgroundSize: '200% 100%',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
          }}
        />
      </div>

      {/* Этапы пути */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.5rem',
        position: 'relative',
        zIndex: 1
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
                  ? 'linear-gradient(135deg, #00ff41, #00d9ff)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: step === currentMission ? '3px solid #00ff41' : '2px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                color: step <= currentMission ? '#000' : '#666',
                boxShadow: step <= currentMission ? '0 0 20px rgba(0, 255, 65, 0.5)' : 'none',
                fontFamily: 'monospace'
              }}
            >
              {step < currentMission ? '✓' : step}
            </motion.div>
            <div style={{
              fontSize: '0.6875rem',
              color: step <= currentMission ? '#00ff41' : '#666',
              fontWeight: 700,
              fontFamily: 'monospace'
            }}>
              {step === 1 && 'ВХОД'}
              {step === 2 && 'БАЗИС'}
              {step === 3 && 'ЗАЩИТА'}
              {step === 4 && 'КОНТРОЛЬ'}
              {step === 5 && 'МАСТЕР'}
            </div>
          </div>
        ))}
      </div>

      {/* Предупреждения безопасности */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 0, 85, 0.1)',
          border: '2px solid rgba(255, 0, 85, 0.3)',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        <AlertTriangle size={24} style={{ color: '#ff0055', flexShrink: 0 }} />
        <div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#ff0055',
            marginBottom: '0.25rem',
            fontFamily: 'monospace'
          }}>
            АКТИВНЫХ УГРОЗ: {5 - currentMission}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#fff',
            opacity: 0.8,
            fontFamily: 'monospace'
          }}>
            Завершите миссии для усиления защиты
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Диалоговое окно Киберии
export function CyberiaDialogBox({ text, avatar, onNext, showSkip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(10,14,39,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        borderTop: '4px solid #00ff41',
        zIndex: 1000,
        boxShadow: '0 -10px 100px rgba(0, 255, 65, 0.3)'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-end'
      }}>
        {/* Аватар Киберии */}
        {avatar && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '200px',
              height: '250px',
              borderRadius: '1rem',
              overflow: 'hidden',
              border: '3px solid #00ff41',
              boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)',
              flexShrink: 0,
              position: 'relative'
            }}
          >
            <img
              src={avatar}
              alt="Кибериа"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {/* Сканирующая линия */}
            <motion.div
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
                boxShadow: '0 0 10px #00ff41'
              }}
            />
          </motion.div>
        )}

        {/* Текст диалога */}
        <div style={{ flex: 1 }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(10, 14, 39, 0.9))',
            border: '2px solid rgba(0, 255, 65, 0.5)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            position: 'relative'
          }}>
            {/* Кибер уголки */}
            <div style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              width: '25px',
              height: '25px',
              borderTop: '3px solid #00ff41',
              borderLeft: '3px solid #00ff41'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '0.75rem',
              width: '25px',
              height: '25px',
              borderBottom: '3px solid #00d9ff',
              borderRight: '3px solid #00d9ff'
            }} />

            <div style={{
              fontSize: '1.125rem',
              color: 'white',
              lineHeight: 1.8,
              fontFamily: 'monospace'
            }}>
              {text}
            </div>

            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                fontSize: '1.5rem'
              }}
            >
              🔐
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
                  background: 'rgba(255, 0, 85, 0.3)',
                  border: '2px solid rgba(255, 0, 85, 0.5)',
                  color: '#ff0055',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'monospace'
                }}
              >
                ПРОПУСТИТЬ
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              style={{
                background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                border: '2px solid #00ff41',
                color: '#000',
                padding: '0.75rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'monospace'
              }}
            >
              ДАЛЕЕ
              <span style={{ fontSize: '1.25rem' }}>→</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default {
  CyberMissionCard,
  CyberPlanetProgress,
  CyberiaDialogBox
};