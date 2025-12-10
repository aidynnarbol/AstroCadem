// src/components/ai/AICharacterAvatar.jsx
// Анимированный аватар AI-персонажа

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function AICharacterAvatar({ 
  character, 
  emotion = 'neutral',
  isThinking = false,
  size = 'large' // 'small' | 'medium' | 'large'
}) {
  const [particles, setParticles] = useState([]);

  // Размеры
  const sizes = {
    small: { container: 80, image: 80, emoji: '2rem' },
    medium: { container: 120, image: 120, emoji: '3rem' },
    large: { container: 200, image: 200, emoji: '5rem' }
  };

  const currentSize = sizes[size];

  // Генерируем частицы при загрузке
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 8,
      delay: i * 0.1
    }));
    setParticles(newParticles);
  }, []);

  // Эмоции определяют анимацию
  const emotionAnimations = {
    neutral: {
      scale: [1, 1.02, 1],
      rotate: [0, 2, -2, 0]
    },
    excited: {
      scale: [1, 1.1, 1],
      rotate: [0, -10, 10, 0]
    },
    thinking: {
      scale: [1, 0.98, 1],
      rotate: [0, 5, -5, 0]
    },
    happy: {
      scale: [1, 1.05, 1],
      y: [0, -5, 0]
    },
    serious: {
      scale: [1, 1.01, 1]
    }
  };

  const currentAnimation = isThinking ? 
    emotionAnimations.thinking : 
    emotionAnimations[emotion] || emotionAnimations.neutral;

  return (
    <div 
      style={{
        position: 'relative',
        width: `${currentSize.container}px`,
        height: `${currentSize.container}px`
      }}
    >
      {/* Свечение фона */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          inset: '-30%',
          background: `radial-gradient(circle, ${character.color}60, transparent)`,
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 0
        }}
      />

      {/* Орбитальные частицы */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
            delay: particle.delay
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            transformOrigin: 'center'
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.delay
            }}
            style={{
              position: 'absolute',
              top: '-4px',
              left: '50%',
              width: '8px',
              height: '8px',
              background: character.color,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${character.color}`,
              transform: 'translateX(-50%)'
            }}
          />
        </motion.div>
      ))}

      {/* Пульсирующее кольцо */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
        style={{
          position: 'absolute',
          inset: '-10%',
          border: `3px solid ${character.color}`,
          borderRadius: '50%',
          opacity: 0.3,
          zIndex: 1
        }}
      />

      {/* Главный аватар */}
      <motion.div
        animate={currentAnimation}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'relative',
          width: `${currentSize.image}px`,
          height: `${currentSize.image}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `4px solid ${character.color}`,
          boxShadow: `0 0 30px ${character.color}80, inset 0 0 20px ${character.color}40`,
          zIndex: 2
        }}
      >
        {character.avatar ? (
          <img
            src={character.avatar}
            alt={character.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${character.color}40, ${character.color}20)`,
              fontSize: currentSize.emoji
            }}
          >
            {character.emoji}
          </div>
        )}

        {/* Блики */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            pointerEvents: 'none'
          }}
        />
      </motion.div>

      {/* Индикатор "думает" */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '4px',
            zIndex: 3
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                width: '8px',
                height: '8px',
                background: character.color,
                borderRadius: '50%',
                boxShadow: `0 0 8px ${character.color}`
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Эмодзи реакции (опционально) */}
      {emotion === 'excited' && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            fontSize: '2rem',
            zIndex: 4,
            filter: `drop-shadow(0 0 10px ${character.color})`
          }}
        >
          ✨
        </motion.div>
      )}
    </div>
  );
}

export default AICharacterAvatar;